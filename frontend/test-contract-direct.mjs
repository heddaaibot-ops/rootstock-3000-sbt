import { createPublicClient, http } from 'viem';

const contractAddress = '0x60f5e90C2FFc92E1E729a286F03103314C2ac678';
const rpcUrl = 'https://public-node.rsk.co';

const client = createPublicClient({
  chain: {
    id: 30,
    name: 'Rootstock Mainnet',
    network: 'rootstock',
    nativeCurrency: { name: 'RBTC', symbol: 'RBTC', decimals: 18 },
    rpcUrls: {
      default: { http: [rpcUrl] },
      public: { http: [rpcUrl] }
    }
  },
  transport: http(rpcUrl)
});

const abi = [
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_SUPPLY',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
];

console.log('🔍 測試主網合約...');
console.log('合約地址:', contractAddress);
console.log('RPC:', rpcUrl);
console.log('');

try {
  // 檢查合約代碼
  const bytecode = await client.getBytecode({ address: contractAddress });
  console.log('✅ 合約已部署');
  console.log('Bytecode 長度:', bytecode.length, '字符');
  console.log('');

  // 調用 MAX_SUPPLY
  console.log('📞 調用 MAX_SUPPLY...');
  const maxSupply = await client.readContract({
    address: contractAddress,
    abi: abi,
    functionName: 'MAX_SUPPLY',
  });
  console.log('✅ MAX_SUPPLY =', maxSupply.toString());

  // 調用 totalSupply
  console.log('📞 調用 totalSupply...');
  const totalSupply = await client.readContract({
    address: contractAddress,
    abi: abi,
    functionName: 'totalSupply',
  });
  console.log('✅ totalSupply =', totalSupply.toString());

  // 調用 paused
  console.log('📞 調用 paused...');
  const paused = await client.readContract({
    address: contractAddress,
    abi: abi,
    functionName: 'paused',
  });
  console.log('✅ paused =', paused);

  console.log('');
  console.log('🎉 所有合約調用成功！合約本身沒問題。');
} catch (error) {
  console.error('❌ 錯誤:', error.message);
  if (error.data) {
    console.error('Data:', error.data);
  }
}
