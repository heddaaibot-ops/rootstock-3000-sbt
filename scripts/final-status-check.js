const fs = require('fs');
const wallets = JSON.parse(fs.readFileSync('./generated-wallets.json', 'utf8'));

console.log('📊 第二批 60 个钱包最终状态\n');

const minted = wallets.filter(w => w.minted);
const notMinted = wallets.filter(w => !w.minted);
const funded = wallets.filter(w => w.funded);

console.log(`✅ 已铸造：${minted.length} 个`);
console.log(`❌ 未铸造：${notMinted.length} 个`);
console.log(`💰 已分发资金：${funded.length} 个\n`);

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('📋 总结：');
console.log(`• 第一批 26 个钱包：❌ 私钥永久丢失`);
console.log(`• 第二批 60 个钱包：✅ 已铸造 ${minted.length} 个\n`);
console.log(`• 总计可访问的 SBT：${minted.length} 个`);
console.log(`• 丢失的 SBT：26 个（第一批）\n`);
