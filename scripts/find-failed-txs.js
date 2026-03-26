const { ethers } = require('ethers');
const fs = require('fs');

const CONFIG = {
  RPC_URL: 'https://public-node.rsk.co',
  CONTRACT_ADDRESS: '0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188',
};

async function main() {
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  const wallets = JSON.parse(fs.readFileSync('./generated-wallets.json', 'utf8'));

  console.log('🔍 查询余额耗尽钱包的链上交易...\n');

  // 选择几个典型的余额耗尽钱包
  const testWallets = [
    wallets[2],  // index 2
    wallets[6],  // index 6
    wallets[7],  // index 7
    wallets[14], // index 14
    wallets[15], // index 15
  ];

  for (const wallet of testWallets) {
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📍 钱包 #${wallet.index + 1} (Index: ${wallet.index})`);
    console.log(`🔑 地址: ${wallet.address}`);
    console.log(`💰 分发金额: ${wallet.fundedAmount.toFixed(15)} RBTC\n`);

    try {
      // 查询当前余额
      const balance = await provider.getBalance(wallet.address);
      const balanceRBTC = parseFloat(ethers.formatEther(balance));
      console.log(`💵 当前余额: ${balanceRBTC.toFixed(15)} RBTC`);

      const consumed = wallet.fundedAmount - balanceRBTC;
      console.log(`⛽ 已消耗: ${consumed.toFixed(15)} RBTC\n`);

      // 查询交易数量
      const txCount = await provider.getTransactionCount(wallet.address);
      console.log(`📊 交易总数: ${txCount}\n`);

      if (txCount > 0) {
        // 注意：Rootstock 可能不支持直接查询交易历史
        // 我们只能通过区块浏览器 API 或者知道交易哈希才能查询
        console.log(`ℹ️  该钱包有 ${txCount} 笔交易`);
        console.log(`🔗 区块浏览器: https://rootstock.blockscout.com/address/${wallet.address}\n`);
      } else {
        console.log(`⚠️  该钱包没有发送过交易（可能只是接收）\n`);
      }

    } catch (error) {
      console.log(`❌ 查询失败: ${error.message}\n`);
    }

    await new Promise(resolve => setTimeout(resolve, 2000)); // 等待2秒避免请求过快
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n💡 提示：要查看详细交易记录，请访问区块浏览器');
}

main().catch(console.error);
