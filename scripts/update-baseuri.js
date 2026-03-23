/**
 * 更新主网合约的 BaseURI
 *
 * 使用方法：
 * 1. 先运行 upload-to-pinata.js 获得新的 CID
 * 2. 修改下方 NEW_BASE_URI 为新的 IPFS 链接
 * 3. 运行: npx hardhat run scripts/update-baseuri.js --network rskMainnet
 */

const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // ⚠️ 修改这里：从 pinata-upload-result.json 读取新的 BaseURI
  let NEW_BASE_URI;

  const resultFile = path.join(__dirname, "..", "pinata-upload-result.json");
  if (fs.existsSync(resultFile)) {
    const result = JSON.parse(fs.readFileSync(resultFile, "utf8"));
    NEW_BASE_URI = result.baseURI;
    console.log("✅ 从上传结果文件读取到新的 BaseURI");
  } else {
    console.error("❌ 找不到 pinata-upload-result.json");
    console.log("请先运行: node scripts/upload-to-pinata.js");
    process.exit(1);
  }

  const CONTRACT_ADDRESS = "0xc4e7a1FB1bdf370CD187a50E0B6B360BCB4C3BEC";

  console.log("📝 准备更新合约 BaseURI...");
  console.log("合约地址:", CONTRACT_ADDRESS);
  console.log("新 BaseURI:", NEW_BASE_URI);
  console.log("");

  // 获取合约实例
  const SBT = await hre.ethers.getContractFactory("Rootstock3000SBT");
  const sbt = SBT.attach(CONTRACT_ADDRESS);

  // 获取当前 BaseURI
  try {
    // 尝试调用 tokenURI(0) 来反推 baseURI
    const tokenURI0 = await sbt.tokenURI(0);
    console.log("当前 tokenURI(0):", tokenURI0);
  } catch (error) {
    console.log("⚠️ 无法获取 tokenURI(0)（可能还没有人铸造）");
  }

  // 确认操作
  console.log("\n⚠️ 警告：此操作将永久更改所有 NFT 的元数据链接！");
  console.log("请确保：");
  console.log("1. 新的 IPFS CID 已经成功上传并固定");
  console.log("2. 可以通过公共网关访问（测试链接）：");
  console.log(`   ${NEW_BASE_URI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")}0`);
  console.log("");

  // 检查是否是 owner
  const [signer] = await hre.ethers.getSigners();
  const owner = await sbt.owner();
  console.log("当前钱包:", signer.address);
  console.log("合约 Owner:", owner);

  if (signer.address.toLowerCase() !== owner.toLowerCase()) {
    console.error("❌ 错误：你不是合约的 owner，无法调用 setBaseURI");
    process.exit(1);
  }

  console.log("✅ 确认你是合约 owner\n");

  // 执行更新
  console.log("⏳ 正在提交交易...");
  const tx = await sbt.setBaseURI(NEW_BASE_URI);
  console.log("📤 交易已发送:", tx.hash);
  console.log("⏳ 等待确认...");

  const receipt = await tx.wait();
  console.log("✅ 交易已确认！");
  console.log("Gas 使用:", receipt.gasUsed.toString());
  console.log("");

  console.log("🎉 BaseURI 更新成功！");
  console.log("─────────────────────────────────────────────");
  console.log("新的 BaseURI:", NEW_BASE_URI);
  console.log("测试链接:", `${NEW_BASE_URI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")}0`);
  console.log("─────────────────────────────────────────────");
  console.log("");

  console.log("✅ 下一步：在网站上测试 NFT 显示");

  // 验证更新
  try {
    const newTokenURI0 = await sbt.tokenURI(0);
    console.log("\n✅ 验证成功 - tokenURI(0):", newTokenURI0);
  } catch (error) {
    console.log("⚠️ 无法验证（可能还没有人铸造 #0）");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
