import { createPublicClient, http } from 'viem';
import { defineChain } from 'viem';

// 完全複製前端的配置
const ROOTSTOCK_MAINNET = defineChain({
  id: 30,
  name: 'Rootstock',
  network: 'rootstock',
  nativeCurrency: {
    name: 'RBTC',
    symbol: 'RBTC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://public-node.rsk.co'],
    },
    public: {
      http: ['https://public-node.rsk.co'],
    },
  },
  blockExplorers: {
    default: {
      name: 'RSK Explorer',
      url: 'https://rootstock.blockscout.com',
    },
  },
});

const CONTRACT_ADDRESS = '0x60f5e90C2FFc92E1E729a286F03103314C2ac678';

const CONTRACT_ABI = [
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
  {
    inputs: [],
    name: 'remainingSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

console.log('🔧 調試合約調用...\n');
console.log('配置:');
console.log('- 鏈 ID:', ROOTSTOCK_MAINNET.id);
console.log('- RPC:', ROOTSTOCK_MAINNET.rpcUrls.default.http[0]);
console.log('- 合約:', CONTRACT_ADDRESS);
console.log('');

// 創建 client - 完全模擬前端的方式
const client = createPublicClient({
  chain: ROOTSTOCK_MAINNET,
  transport: http(ROOTSTOCK_MAINNET.rpcUrls.default.http[0]),
});

console.log('✅ Client 創建成功');
console.log('');

try {
  console.log('📞 測試 1: 調用 totalSupply...');
  const totalSupply = await client.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'totalSupply',
  });
  console.log('✅ totalSupply =', totalSupply.toString());
  console.log('');

  console.log('📞 測試 2: 調用 MAX_SUPPLY...');
  const maxSupply = await client.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'MAX_SUPPLY',
  });
  console.log('✅ MAX_SUPPLY =', maxSupply.toString());
  console.log('');

  console.log('📞 測試 3: 調用 paused...');
  const paused = await client.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'paused',
  });
  console.log('✅ paused =', paused);
  console.log('');

  console.log('📞 測試 4: 調用 remainingSupply...');
  const remainingSupply = await client.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'remainingSupply',
  });
  console.log('✅ remainingSupply =', remainingSupply.toString());
  console.log('');

  console.log('🎉 所有測試通過！合約調用完全正常。');
  console.log('');
  console.log('結論: 問題不在合約或 RPC，而在前端代碼邏輯中。');
} catch (error) {
  console.error('❌ 錯誤:', error.message);
  console.error('詳細:', error);
}
