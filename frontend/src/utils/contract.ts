import { defineChain } from 'viem';

// v3 合约地址（Mainnet Only）
export const CONTRACT_ADDRESS = '0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188' as `0x${string}`;

// 使用完整的合约 ABI（从编译产物导出）
export const CONTRACT_ABI = [
  {
    inputs: [],
    name: 'LAUNCH_DATE',
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
    name: 'MILESTONE_DATE',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMintProgressBasisPoints',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'hasUserMinted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
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
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
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
] as const;

// Rootstock Mainnet Chain 定义
export const ROOTSTOCK_MAINNET = defineChain({
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
      http: [
        'https://public-node.rsk.co',
        'https://rpc.mainnet.rootstock.io/ZRjBSeG4PpiSLNO4zHgxSLIoAAQ_hIQC',
        'https://mycrypto.rsk.co',
      ],
    },
    public: {
      http: [
        'https://public-node.rsk.co',
        'https://rpc.mainnet.rootstock.io/ZRjBSeG4PpiSLNO4zHgxSLIoAAQ_hIQC',
        'https://mycrypto.rsk.co',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'RSK Explorer',
      url: 'https://rootstock.blockscout.com',
    },
  },
});
