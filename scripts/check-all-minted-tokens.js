const { ethers } = require('ethers');

const CONFIG = {
  RPC_URL: 'https://public-node.rsk.co',
  CONTRACT_ADDRESS: '0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188',
};

const CONTRACT_ABI = [
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'function totalSupply() view returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)',
];

async function main() {
  console.log('🔍 正在查询所有已铸造的 Token...\n');

  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    // 获取总供应量
    const totalSupply = await contract.totalSupply();
    console.log(`📊 链上总供应量: ${totalSupply}\n`);

    // 查询所有 Transfer 事件（从 0x0 地址转出的就是 mint）
    console.log('📡 正在查询所有铸造事件...');

    const filter = contract.filters.Transfer(ethers.ZeroAddress, null, null);
    const events = await contract.queryFilter(filter, 0, 'latest');

    console.log(`✅ 找到 ${events.length} 个铸造事件\n`);

    // 按时间排序并显示
    const mints = events.map(event => ({
      blockNumber: event.blockNumber,
      tokenId: event.args.tokenId.toString(),
      to: event.args.to,
      txHash: event.transactionHash,
    }));

    // 按区块号排序
    mints.sort((a, b) => a.blockNumber - b.blockNumber);

    console.log('📋 所有已铸造的 Token（按时间顺序）:\n');

    for (const mint of mints) {
      const tid = mint.tokenId.padStart(4, ' ');
      const tx = mint.txHash.slice(0, 10);
      console.log(`Token ID: ${tid} | 地址: ${mint.to} | 区块: ${mint.blockNumber} | TX: ${tx}...`);
    }

    // 检查我们的钱包文件中有哪些地址已铸造
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 检查 generated-wallets.json 中的地址...\n');

    const fs = require('fs');
    const wallets = JSON.parse(fs.readFileSync('./generated-wallets.json', 'utf8'));
    const walletAddresses = new Set(wallets.map(w => w.address.toLowerCase()));

    const mintedAddresses = mints.map(m => m.to.toLowerCase());
    const ourMints = mints.filter(m => walletAddresses.has(m.to.toLowerCase()));
    const unknownMints = mints.filter(m => !walletAddresses.has(m.to.toLowerCase()));

    console.log(`✅ 我们文件中的地址已铸造: ${ourMints.length} 个`);
    console.log(`❓ 未在文件中的地址已铸造: ${unknownMints.length} 个\n`);

    if (unknownMints.length > 0) {
      console.log('⚠️  这些地址不在 generated-wallets.json 中（可能是第一批 26 个钱包）:\n');
      unknownMints.forEach(mint => {
        const tid = mint.tokenId.padStart(4, ' ');
        console.log(`Token ID: ${tid} | 地址: ${mint.to} | 区块: ${mint.blockNumber}`);
      });

      console.log('\n⚠️  警告：这些地址的私钥已经丢失！');
      console.log('💡 建议：如果这些是第一批 26 个钱包，私钥无法恢复。');
    }

  } catch (error) {
    console.error('❌ 错误:', error.message);
  }
}

main();
