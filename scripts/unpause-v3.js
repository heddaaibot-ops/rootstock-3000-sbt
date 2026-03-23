const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 开放 Rootstock3000SBT v3 铸造...\n");

  // 读取部署信息
  const deploymentFile = path.join(__dirname, "../deployments/deployment-v3-mainnet.json");

  if (!fs.existsSync(deploymentFile)) {
    console.error("❌ 错误：找不到部署信息文件");
    console.log("请先部署合约: npx hardhat run scripts/deploy-v3-mainnet.js --network rskMainnet");
    process.exit(1);
  }

  const deployment = JSON.parse(fs.readFileSync(deploymentFile, 'utf8'));
  const contractAddress = deployment.contractAddress;

  console.log("📝 合约信息:");
  console.log("─────────────────────────────────────────────");
  console.log("合约地址:", contractAddress);
  console.log("网络:", deployment.network);
  console.log("版本:", deployment.version);
  console.log("─────────────────────────────────────────────\n");

  const [signer] = await hre.ethers.getSigners();
  console.log("操作账户:", signer.address);

  const balance = await hre.ethers.provider.getBalance(signer.address);
  console.log("账户余额:", hre.ethers.formatEther(balance), "RBTC\n");

  // 连接合约
  const SBT = await hre.ethers.getContractFactory("Rootstock3000SBT");
  const sbt = SBT.attach(contractAddress);

  // 检查当前状态
  const isPaused = await sbt.paused();
  const owner = await sbt.owner();

  console.log("📊 当前状态:");
  console.log("─────────────────────────────────────────────");
  console.log("暂停状态:", isPaused ? "⏸️  已暂停" : "▶️  运行中");
  console.log("合约 Owner:", owner);
  console.log("操作账户:", signer.address);
  console.log("─────────────────────────────────────────────\n");

  // 验证权限
  if (owner.toLowerCase() !== signer.address.toLowerCase()) {
    console.error("❌ 错误：你不是合约 owner，无法执行此操作");
    console.log("合约 owner:", owner);
    console.log("当前账户:", signer.address);
    process.exit(1);
  }

  if (!isPaused) {
    console.log("✅ 合约已经是运行状态，无需操作");
    process.exit(0);
  }

  // 执行 unpause
  console.log("⏳ 正在开放铸造...");
  const tx = await sbt.unpause();
  console.log("交易哈希:", tx.hash);

  console.log("⏳ 等待交易确认...");
  const receipt = await tx.wait();

  console.log("\n✅ 铸造已开放！");
  console.log("─────────────────────────────────────────────");
  console.log("交易哈希:", receipt.hash);
  console.log("区块号:", receipt.blockNumber);
  console.log("Gas 使用:", receipt.gasUsed.toString());
  console.log("─────────────────────────────────────────────\n");

  // 验证状态
  const newPausedState = await sbt.paused();
  const totalSupply = await sbt.totalSupply();
  const remaining = await sbt.remainingSupply();

  console.log("📊 最新状态:");
  console.log("─────────────────────────────────────────────");
  console.log("暂停状态:", newPausedState ? "⏸️  已暂停" : "▶️  运行中");
  console.log("已铸造:", totalSupply.toString());
  console.log("剩余:", remaining.toString());
  console.log("─────────────────────────────────────────────\n");

  console.log("🎉 用户现在可以开始铸造了！");
  console.log("\n🔗 查看合约:");
  console.log(`https://rootstock.blockscout.com/address/${contractAddress}\n`);

  console.log("💡 下一步:");
  console.log("1. 测试铸造:");
  console.log("   访问 Blockscout Write Contract 页面");
  console.log("   调用 mint() 函数");
  console.log("\n2. 发布公告:");
  console.log("   - Twitter/X");
  console.log("   - Discord/Telegram");
  console.log("   - 官网更新");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
