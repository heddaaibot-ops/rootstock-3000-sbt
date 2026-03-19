const hre = require("hardhat");

async function main() {
  console.log("🚀 正在開啟測試網 mint 功能...\n");

  // 合約地址
  const contractAddress = "0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D";

  // 獲取合約實例
  const Rootstock3000SBT = await hre.ethers.getContractFactory("Rootstock3000SBT");
  const contract = Rootstock3000SBT.attach(contractAddress);

  // 獲取當前狀態
  console.log("📊 當前合約狀態：");
  const stats = await contract.getContractStats();
  console.log(`   - 已鑄造數量: ${stats._totalSupply}`);
  console.log(`   - 剩餘數量: ${stats._remainingSupply}`);
  console.log(`   - 是否暫停: ${stats._isPaused}`);
  console.log();

  if (!stats._isPaused) {
    console.log("✅ 合約已經是開啟狀態，無需操作！");
    return;
  }

  // 調用 unpause
  console.log("🔓 正在解除暫停...");
  const tx = await contract.unpause();
  console.log(`   - 交易已發送: ${tx.hash}`);

  console.log("⏳ 等待交易確認...");
  await tx.wait();

  // 驗證狀態
  const newStats = await contract.getContractStats();
  console.log("\n✅ Mint 已開啟！");
  console.log(`   - 是否暫停: ${newStats._isPaused}`);
  console.log(`   - 交易哈希: ${tx.hash}`);
  console.log(`   - 區塊鏈瀏覽器: https://explorer.testnet.rsk.co/tx/${tx.hash}`);
  console.log("\n🎉 用戶現在可以開始 mint 了！");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
