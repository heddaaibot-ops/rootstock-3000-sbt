import { defineChain } from 'viem';

// 硬编码地址确保在 Vercel 上也能正常工作
export const CONTRACT_ADDRESS = {
  testnet: '0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D' as `0x${string}`,
  mainnet: '0x60f5e90C2FFc92E1E729a286F03103314C2ac678' as `0x${string}`,
} as const;

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

// 完整的 chain 定義
export const ROOTSTOCK_CHAINS = {
  testnet: defineChain({
    id: 31,
    name: 'Rootstock Testnet',
    network: 'rootstock-testnet',
    nativeCurrency: {
      name: 'Test RBTC',
      symbol: 'tRBTC',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://public-node.testnet.rsk.co'],
      },
      public: {
        http: ['https://public-node.testnet.rsk.co'],
      },
    },
    blockExplorers: {
      default: {
        name: 'RSK Testnet Explorer',
        url: 'https://rootstock-testnet.blockscout.com',
      },
    },
    testnet: true,
  }),
  mainnet: defineChain({
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
  }),
} as const;
