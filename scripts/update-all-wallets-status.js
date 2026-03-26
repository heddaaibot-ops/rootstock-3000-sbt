const { ethers } = require('ethers');
const fs = require('fs');

const CONFIG = {
  RPC_URL: 'https://public-node.rsk.co',
  CONTRACT_ADDRESS: '0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188',
};

const CONTRACT_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

async function main() {
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  const wallets = JSON.parse(fs.readFileSync('./generated-wallets.json', 'utf8'));

  console.log('🔄 更新所有钱包的真实链上状态...\n');

  let updated = 0;
  let totalMinted = 0;

  for (let i = 0; i < wallets.length; i++) {
    const wallet = wallets[i];

    try {
      const balance = await contract.balanceOf(wallet.address);
      const hasSBT = balance > 0n;

      if (hasSBT && !wallet.minted) {
        console.log(`✅ 发现钱包 #${i + 1} 实际已铸造，更新记录...`);
        wallet.minted = true;
        wallet.mintTxHash = wallet.mintTxHash || 'success_on_chain';
        wallet.mintTime = wallet.mintTime || new Date().toISOString();
        wallet.tokenId = balance.toString();
        updated++;
      }

      if (hasSBT) {
        totalMinted++;
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.log(`⚠️  钱包 #${i + 1} 查询失败: ${error.message}`);
    }
  }

  // 保存更新后的文件
  fs.writeFileSync('./generated-wallets.json', JSON.stringify(wallets, null, 2));

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ 更新完成！');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log(`📊 统计：`);
  console.log(`  🔄 更新记录: ${updated} 个`);
  console.log(`  ✅ 总已铸造: ${totalMinted} 个`);
  console.log(`  ❌ 总未铸造: ${wallets.length - totalMinted} 个\n`);

  console.log(`💾 已保存到: generated-wallets.json`);
}

main().catch(console.error);
