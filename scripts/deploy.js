const hre = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("🚀 開始部署 Rootstock 3000 Days SBT...\n");

  // 獲取部署者地址
  const [deployer] = await hre.ethers.getSigners();
  console.log("📍 部署地址:", deployer.address);

  // 獲取餘額
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 帳戶餘額:", hre.ethers.formatEther(balance), "RBTC\n");

  // 檢查是否設置了 BASE_URI
  const baseURI = process.env.BASE_URI || "";
  if (!baseURI) {
    console.warn("⚠️  警告：未設置 BASE_URI，合約將使用空字符串");
  } else {
    console.log("🔗 Base URI:", baseURI);
  }

  // 部署合約
  console.log("\n📝 正在編譯和部署合約...");
  const Rootstock3000SBT = await hre.ethers.getContractFactory("Rootstock3000SBT");
  const sbt = await Rootstock3000SBT.deploy(deployer.address, baseURI);

  await sbt.waitForDeployment();

  const contractAddress = await sbt.getAddress();
  console.log("✅ 合約已部署到:", contractAddress);

  // 驗證部署
  console.log("\n🔍 驗證部署狀態...");
  const name = await sbt.name();
  const symbol = await sbt.symbol();
  const maxSupply = await sbt.MAX_SUPPLY();
  const totalSupply = await sbt.totalSupply();
  const paused = await sbt.paused();
  const owner = await sbt.owner();

  console.log("📋 合約資訊:");
  console.log("  - 名稱:", name);
  console.log("  - 符號:", symbol);
  console.log("  - 最大供應量:", maxSupply.toString());
  console.log("  - 當前供應量:", totalSupply.toString());
  console.log("  - 暫停狀態:", paused ? "是 ⏸️" : "否 ▶️");
  console.log("  - Owner:", owner);

  // 重要常量
  const launchDate = await sbt.LAUNCH_DATE();
  const milestoneDate = await sbt.MILESTONE_DATE();
  console.log("\n📅 重要日期:");
  console.log("  - Rootstock 上線:", new Date(Number(launchDate) * 1000).toISOString().split('T')[0]);
  console.log("  - 3000 天里程碑:", new Date(Number(milestoneDate) * 1000).toISOString().split('T')[0]);

  // 計算距離里程碑的時間
  const now = Math.floor(Date.now() / 1000);
  const daysUntilMilestone = Math.floor((Number(milestoneDate) - now) / 86400);
  console.log("  - 距離里程碑:", daysUntilMilestone, "天");

  // 網絡資訊
  const network = await hre.ethers.provider.getNetwork();
  console.log("\n🌐 網絡資訊:");
  console.log("  - 網絡名稱:", hre.network.name);
  console.log("  - Chain ID:", network.chainId.toString());

  // 區塊瀏覽器連結
  let explorerUrl = "";
  if (network.chainId === 30n) {
    explorerUrl = `https://rootstock.blockscout.com/address/${contractAddress}`;
  } else if (network.chainId === 31n) {
    explorerUrl = `https://rootstock-testnet.blockscout.com/address/${contractAddress}`;
  }

  if (explorerUrl) {
    console.log("  - 區塊瀏覽器:", explorerUrl);
  }

  console.log("\n✨ 部署完成！\n");

  // 下一步提示
  console.log("📝 下一步操作:");
  console.log("1. 驗證合約（可選）:");
  console.log(`   npx hardhat verify --network ${hre.network.name} ${contractAddress} "${deployer.address}" "${baseURI}"`);
  console.log("\n2. 開放鑄造（當準備好時）:");
  console.log("   呼叫 unpause() 函數");
  console.log("\n3. 設置 Base URI（如果需要更新）:");
  console.log("   呼叫 setBaseURI(string) 函數");

  // 保存部署資訊
  const deploymentInfo = {
    network: hre.network.name,
    chainId: network.chainId.toString(),
    contractAddress: contractAddress,
    deployer: deployer.address,
    baseURI: baseURI,
    timestamp: new Date().toISOString(),
    explorerUrl: explorerUrl,
  };

  const fs = require("fs");
  const path = require("path");
  const deploymentsDir = path.join(__dirname, "..", "deployments");

  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  const deploymentFile = path.join(
    deploymentsDir,
    `${hre.network.name}-${Date.now()}.json`
  );

  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log("\n💾 部署資訊已保存到:", deploymentFile);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ 部署失敗:", error);
    process.exit(1);
  });
