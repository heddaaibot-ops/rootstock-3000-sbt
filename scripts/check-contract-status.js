const { ethers } = require('ethers');

const CONFIG = {
  RPC_URL: 'https://public-node.rsk.co',
  CONTRACT_ADDRESS: '0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188',
};

const ABI = [
  'function paused() view returns (bool)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
];

async function main() {
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, ABI, provider);

  console.log('🔍 检查合约状态...\n');

  const paused = await contract.paused();
  const totalSupply = await contract.totalSupply();

  console.log(`⏸️  合约是否暂停: ${paused ? '是 ❌' : '否 ✅'}`);
  console.log(`📊 当前总供应量: ${totalSupply}\n`);

  // 检查特定钱包
  const testAddress = '0x826fDbC0ddAb186dD703AF24b4744d5b2113447f';
  const balance = await contract.balanceOf(testAddress);
  console.log(`🔍 测试钱包 ${testAddress}`);
  console.log(`💎 SBT 余额: ${balance}`);
  console.log(`${balance > 0 ? '✅ 已铸造' : '❌ 未铸造'}`);
}

main().catch(console.error);
