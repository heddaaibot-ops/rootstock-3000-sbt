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
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

async function main() {
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  const wallets = JSON.parse(fs.readFileSync('./generated-wallets.json', 'utf8'));

  console.log('🔍 重新检查所有钱包的真实链上状态...\n');

  // 检查我们认为失败的那些钱包
  const suspectedFailed = [2, 6, 7, 8, 14, 15, 17, 19, 20, 21, 22, 24];

  let actualMinted = 0;
  let actualNotMinted = 0;

  for (const index of suspectedFailed) {
    const wallet = wallets[index];

    try {
      const balance = await contract.balanceOf(wallet.address);
      const hasSBT = balance > 0n;

      console.log(`钱包 #${index + 1} (${wallet.address.slice(0, 10)}...)`);
      console.log(`  链上 SBT: ${hasSBT ? '✅ 有 (已铸造)' : '❌ 无 (未铸造)'}`);
      console.log(`  本地记录: ${wallet.minted ? '已铸造' : '未铸造'}`);

      if (hasSBT !== wallet.minted) {
        console.log(`  ⚠️  状态不一致！`);
        actualMinted++;
      } else {
        actualNotMinted++;
      }
      console.log('');

      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(`  ❌ 查询失败: ${error.message}\n`);
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📊 检查结果：`);
  console.log(`  ✅ 实际已铸造但记录为失败: ${actualMinted} 个`);
  console.log(`  ❌ 确实未铸造: ${actualNotMinted} 个\n`);

  // 检查总供应量
  const totalSupply = await contract.totalSupply();
  console.log(`📊 链上总供应量: ${totalSupply}`);
}

main().catch(console.error);
