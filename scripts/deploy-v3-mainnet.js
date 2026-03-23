const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 部署 Rootstock3000SBT v3 到主网...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("部署账户:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("账户余额:", hre.ethers.formatEther(balance), "RBTC\n");

  if (balance === 0n) {
    console.error("❌ 错误：账户余额为 0，无法部署");
    process.exit(1);
  }

  // 从上传结果读取 metadata URI
  const uploadResultPath = path.join(__dirname, '../pinata-upload-result.json');
  let metadataURI = "ipfs://QmNuMAshJZy8dWZYgrVE3uB4kQ9xDcGBsePBzatZoKR4ej"; // 默认值

  if (fs.existsSync(uploadResultPath)) {
    const uploadResult = JSON.parse(fs.readFileSync(uploadResultPath, 'utf8'));
    metadataURI = uploadResult.baseURI;
    console.log("✅ 使用已上传的 metadata URI:", metadataURI);
  } else {
    console.log("⚠️  使用默认 metadata URI:", metadataURI);
  }

  // 构造函数参数
  const initialOwner = deployer.address;

  console.log("\n📝 部署参数:");
  console.log("─────────────────────────────────────────────");
  console.log("Initial Owner:", initialOwner);
  console.log("Metadata URI:", metadataURI);
  console.log("─────────────────────────────────────────────\n");

  // 部署合约
  console.log("⏳ 正在部署合约...");

  const Rootstock3000SBT = await hre.ethers.getContractFactory("Rootstock3000SBT");
  const sbt = await Rootstock3000SBT.deploy(initialOwner, metadataURI);

  await sbt.waitForDeployment();

  const contractAddress = await sbt.getAddress();

  console.log("\n✅ 合约部署成功！");
  console.log("─────────────────────────────────────────────");
  console.log("合约地址:", contractAddress);
  console.log("─────────────────────────────────────────────\n");

  // 验证合约状态
  console.log("📊 验证合约状态...");
  const isPaused = await sbt.paused();
  const totalSupply = await sbt.totalSupply();
  const maxSupply = await sbt.MAX_SUPPLY();
  const currentMetadataURI = await sbt.getMetadataURI();

  console.log("─────────────────────────────────────────────");
  console.log("合约状态:", isPaused ? "⏸️  已暂停" : "▶️  运行中");
  console.log("当前供应量:", totalSupply.toString());
  console.log("最大供应量:", maxSupply.toString());
  console.log("Metadata URI:", currentMetadataURI);
  console.log("─────────────────────────────────────────────\n");

  // 保存部署信息
  const deploymentInfo = {
    network: "RSK Mainnet",
    contractAddress: contractAddress,
    deployer: deployer.address,
    owner: initialOwner,
    metadataURI: metadataURI,
    paused: isPaused,
    deployedAt: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber(),
    version: "v3",
    contractType: "单一 metadata（所有 NFT 共用同一个文件）"
  };

  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  const deploymentFilePath = path.join(deploymentsDir, "deployment-v3-mainnet.json");
  fs.writeFileSync(deploymentFilePath, JSON.stringify(deploymentInfo, null, 2));

  console.log("💾 部署信息已保存到:", deploymentFilePath);

  console.log("\n🔗 查看合约:");
  console.log(`https://rootstock.blockscout.com/address/${contractAddress}\n`);

  console.log("⚠️  下一步操作:");
  console.log("1. 验证合约源代码:");
  console.log(`   npx hardhat verify --network rskMainnet ${contractAddress} "${initialOwner}" "${metadataURI}"`);
  console.log("\n2. 测试 metadata 访问:");
  console.log(`   curl https://gateway.pinata.cloud/ipfs/QmNuMAshJZy8dWZYgrVE3uB4kQ9xDcGBsePBzatZoKR4ej`);
  console.log("\n3. 开放铸造:");
  console.log(`   npx hardhat run scripts/unpause-v3.js --network rskMainnet`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
