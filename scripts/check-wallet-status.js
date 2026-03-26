const fs = require('fs');
const wallets = JSON.parse(fs.readFileSync('./generated-wallets.json', 'utf8'));

console.log('📊 第二批 60 个钱包详细统计\n');

const minted = wallets.filter(w => w.minted);
const notMinted = wallets.filter(w => !w.minted);
const funded = wallets.filter(w => w.funded);
const notFunded = wallets.filter(w => !w.funded);

console.log(`✅ 已铸造：${minted.length} 个`);
console.log(`❌ 未铸造：${notMinted.length} 个`);
console.log(`💰 已分发资金：${funded.length} 个`);
console.log(`⚠️  未分发资金：${notFunded.length} 个\n`);

// 分析未铸造的原因
const fundedButNotMinted = wallets.filter(w => w.funded && !w.minted);
const notFundedNotMinted = wallets.filter(w => !w.funded && !w.minted);

console.log('📋 未铸造钱包分类：\n');
console.log(`1️⃣ 已分发但未铸造：${fundedButNotMinted.length} 个`);
if (fundedButNotMinted.length > 0) {
  const amounts = fundedButNotMinted.map(w => w.fundedAmount);
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);
  console.log(`   余额范围：${min.toFixed(15)} - ${max.toFixed(15)} RBTC`);
  console.log(`   原因：余额不足以支付 Gas 费用（需要约 0.00000500 RBTC）\n`);
}

console.log(`2️⃣ 完全未分发：${notFundedNotMinted.length} 个`);
console.log(`   原因：从未获得资金分发\n`);

// 显示前几个未铸造的钱包
console.log('前5个已分发但未铸造的钱包：');
fundedButNotMinted.slice(0, 5).forEach((w, i) => {
  console.log(`   ${i+1}. ${w.address} - ${w.fundedAmount.toFixed(15)} RBTC`);
});
