const hre = require("hardhat");
const fs = require('fs');

async function main() {
  console.log("🚀 開始部署 Rootstock 3000 Days SBT 到主網...\n");

  // 部署參數
  const DEPLOYER = "0x22cd1c7b62a9cda1fc1868ae0deab62f6fd57800";
  const BASE_URI = "ipfs://bafybeicto7ndawofhbjfylypipjz72tvs6ljkzypf4dicyciimtbsrlgc4/";

  console.log("📋 部署參數:");
  console.log("  Deployer:", DEPLOYER);
  console.log("  Initial Owner:", DEPLOYER);
  console.log("  BASE_URI:", BASE_URI);
  console.log("  Network:", hre.network.name);
  console.log("  Chain ID: 30 (Rootstock Mainnet)");
  console.log("");

  // 檢查部署者餘額
  const balance = await hre.ethers.provider.getBalance(DEPLOYER);
  console.log(`💰 Deployer 餘額: ${hre.ethers.formatEther(balance)} RBTC`);

  if (balance < hre.ethers.parseEther("0.0003")) {
    console.error("❌ 餘額不足！需要至少 0.0003 RBTC");
    process.exit(1);
  }
  console.log("");

  // 部署合約
  console.log("📤 正在部署合約...");
  const Rootstock3000SBT = await hre.ethers.getContractFactory("Rootstock3000SBT");
  const contract = await Rootstock3000SBT.deploy(
    DEPLOYER,  // initialOwner
    BASE_URI   // baseURI
  );

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("");
  console.log("✅ 合約部署成功！");
  console.log("📍 合約地址:", contractAddress);
  console.log("");

  // 驗證部署
  console.log("🔍 驗證部署...");
  const name = await contract.name();
  const symbol = await contract.symbol();
  const maxSupply = await contract.MAX_SUPPLY();
  const owner = await contract.owner();
  const paused = await contract.paused();

  console.log("  Name:", name);
  console.log("  Symbol:", symbol);
  console.log("  Max Supply:", maxSupply.toString());
  console.log("  Owner:", owner);
  console.log("  Paused:", paused);
  console.log("");

  // 保存部署信息
  const deploymentInfo = {
    network: "rootstock-mainnet",
    chainId: 30,
    contractAddress: contractAddress,
    deployer: DEPLOYER,
    owner: DEPLOYER,
    baseURI: BASE_URI,
    name: name,
    symbol: symbol,
    maxSupply: maxSupply.toString(),
    paused: paused,
    deployedAt: new Date().toISOString(),
    transactionHash: contract.deploymentTransaction().hash
  };

  fs.writeFileSync(
    './deployment-mainnet.json',
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("💾 部署信息已保存到 deployment-mainnet.json");
  console.log("");
  console.log("🎉 部署完成！");
  console.log("");
  console.log("⚠️  重要提示：");
  console.log("  1. 合約當前處於暫停狀態（paused = true）");
  console.log("  2. 需要調用 unpause() 才能開放鑄造");
  console.log("  3. 瀏覽器查看: https://explorer.rsk.co/address/" + contractAddress);
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
