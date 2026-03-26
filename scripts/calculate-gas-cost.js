// 计算使用 165,000 gas limit 的成本

const gasLimit = 165000;
const gasPriceWei = 26065600; // 0.0260656 Gwei

const costWei = gasLimit * gasPriceWei;
const costRBTC = costWei / 1e18;

console.log('📊 Gas 成本计算（165,000 gas limit）\n');
console.log(`⛽ Gas Limit: ${gasLimit.toLocaleString()}`);
console.log(`💰 Gas Price: ${(gasPriceWei / 1e9).toFixed(8)} Gwei`);
console.log(`💵 总成本: ${costRBTC.toFixed(15)} RBTC\n`);

// 检查钱包余额
const walletBalances = [
  0.000004855072463768,    // 最低
  0.000004985507246376811, // 最高
  0.000004927536231884,    // 中间值
];

console.log('🔍 余额是否够用：\n');
walletBalances.forEach((balance, i) => {
  const remaining = balance - costRBTC;
  const enough = remaining > 0;
  const label = i === 0 ? '最低余额' : i === 1 ? '最高余额' : '中间值';

  console.log(`${label}: ${balance.toFixed(15)} RBTC`);
  console.log(`  - 成本: ${costRBTC.toFixed(15)} RBTC`);
  console.log(`  - 剩余: ${remaining.toFixed(15)} RBTC`);
  console.log(`  - 结果: ${enough ? '✅ 够用' : '❌ 不够'}\n`);
});
