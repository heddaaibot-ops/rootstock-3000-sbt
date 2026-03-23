/**
 * 将合约 Ownership 转移到多签钱包
 *
 * 使用方法：
 * 1. 先部署 Gnosis Safe 多签钱包（或使用现有的）
 * 2. 修改下方 MULTISIG_ADDRESS
 * 3. 运行: npx hardhat run scripts/transfer-to-multisig.js --network rskMainnet
 *
 * Gnosis Safe 部署：
 * - Rootstock Mainnet Safe 网址：https://safe.rootstock.io/
 * - 推荐配置：3/5 多签（3 个签名即可执行）
 * - 成员建议：官方团队成员 + 社区信任成员
 */

const hre = require("hardhat");

async function main() {
  // ⚠️ 修改这里：填入你的多签钱包地址
  const MULTISIG_ADDRESS = "0x0000000000000000000000000000000000000000"; // TODO: 替换为实际的 Safe 地址

  const CONTRACT_ADDRESS = "0xc4e7a1FB1bdf370CD187a50E0B6B360BCB4C3BEC";

  console.log("🔐 准备转移合约 Ownership 到多签钱包...");
  console.log("合约地址:", CONTRACT_ADDRESS);
  console.log("多签钱包:", MULTISIG_ADDRESS);
  console.log("");

  // 检查多签地址
  if (MULTISIG_ADDRESS === "0x0000000000000000000000000000000000000000") {
    console.error("❌ 错误：请先设置有效的多签钱包地址");
    console.log("\n部署多签钱包步骤：");
    console.log("1. 访问 https://safe.rootstock.io/");
    console.log("2. 连接钱包并创建新的 Safe");
    console.log("3. 添加签名者地址（建议 3-5 个）");
    console.log("4. 设置阈值（例如 3/5）");
    console.log("5. 部署 Safe 合约");
    console.log("6. 将 Safe 地址填入上方 MULTISIG_ADDRESS");
    process.exit(1);
  }

  // 获取合约实例
  const SBT = await hre.ethers.getContractFactory("Rootstock3000SBT");
  const sbt = SBT.attach(CONTRACT_ADDRESS);

  // 检查当前 owner
  const [signer] = await hre.ethers.getSigners();
  const currentOwner = await sbt.owner();

  console.log("当前钱包:", signer.address);
  console.log("当前 Owner:", currentOwner);

  if (signer.address.toLowerCase() !== currentOwner.toLowerCase()) {
    console.error("❌ 错误：你不是当前的 owner，无法转移 ownership");
    process.exit(1);
  }

  console.log("✅ 确认你是当前 owner\n");

  // ⚠️ 最终确认
  console.log("⚠️⚠️⚠️ 警告 ⚠️⚠️⚠️");
  console.log("此操作将永久转移合约控制权！");
  console.log("转移后，只有多签钱包可以：");
  console.log("  - pause/unpause 合约");
  console.log("  - 更新 baseURI");
  console.log("  - 再次转移 ownership");
  console.log("");
  console.log("请确保：");
  console.log("1. 多签钱包地址正确");
  console.log("2. 你有多签钱包的访问权限");
  console.log("3. 其他签名者已经就绪");
  console.log("");

  // 检查多签地址是否是合约
  const code = await hre.ethers.provider.getCode(MULTISIG_ADDRESS);
  if (code === "0x") {
    console.error("❌ 错误：多签地址不是合约地址（可能是 EOA）");
    console.log("请确保地址是 Gnosis Safe 合约");
    process.exit(1);
  }
  console.log("✅ 确认多签地址是合约\n");

  // 执行转移
  console.log("⏳ 正在提交交易...");
  const tx = await sbt.transferOwnership(MULTISIG_ADDRESS);
  console.log("📤 交易已发送:", tx.hash);
  console.log("⏳ 等待确认...");

  const receipt = await tx.wait();
  console.log("✅ 交易已确认！");
  console.log("Gas 使用:", receipt.gasUsed.toString());
  console.log("");

  // 验证转移
  const newOwner = await sbt.owner();
  console.log("🎉 Ownership 转移成功！");
  console.log("─────────────────────────────────────────────");
  console.log("旧 Owner:", currentOwner);
  console.log("新 Owner:", newOwner);
  console.log("─────────────────────────────────────────────");
  console.log("");

  if (newOwner.toLowerCase() !== MULTISIG_ADDRESS.toLowerCase()) {
    console.error("❌ 警告：新 owner 与预期不符！");
    process.exit(1);
  }

  console.log("✅ 下一步：");
  console.log("1. 访问 https://safe.rootstock.io/");
  console.log("2. 测试通过多签执行合约操作");
  console.log("3. 在官网公布多签钱包信息");
  console.log("4. 公开所有签名者身份（可选）");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
