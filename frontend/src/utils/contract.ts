import { defineChain, parseAbi } from 'viem';

export const CONTRACT_ADDRESS = {
  testnet: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET || '',
  mainnet: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET || '',
} as const;

export const CONTRACT_ABI = parseAbi([
  // Read functions
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function remainingSupply() view returns (uint256)',
  'function MAX_SUPPLY() view returns (uint256)',
  'function LAUNCH_DATE() view returns (uint256)',
  'function MILESTONE_DATE() view returns (uint256)',
  'function paused() view returns (bool)',
  'function hasUserMinted(address) view returns (bool)',
  'function hasMinted(address) view returns (bool)',
  'function balanceOf(address) view returns (uint256)',
  'function ownerOf(uint256) view returns (address)',
  'function tokenURI(uint256) view returns (string)',
  'function getMintTimestamp(uint256) view returns (uint256)',
  'function getMintBlockNumber(uint256) view returns (uint256)',
  'function getMintProgressBasisPoints() view returns (uint256)',
  'function isMintedAfterMilestone(uint256) view returns (bool)',

  // Write functions
  'function mint()',

  // Events
  'event SBTMinted(address indexed minter, uint256 indexed tokenId, uint256 timestamp, uint256 blockNumber)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
]);

export const ROOTSTOCK_CHAINS = {
  testnet: defineChain({
    id: 31,
    name: 'Rootstock Testnet',
    nativeCurrency: {
      name: 'Test RBTC',
      symbol: 'tRBTC',
      decimals: 18,
    },
    rpcUrls: {
      default: { http: ['https://public-node.testnet.rsk.co'] },
    },
    blockExplorers: {
      default: {
        name: 'RSK Testnet Explorer',
        url: 'https://rootstock-testnet.blockscout.com'
      },
    },
    testnet: true,
  }),
  mainnet: defineChain({
    id: 30,
    name: 'Rootstock',
    nativeCurrency: {
      name: 'RBTC',
      symbol: 'RBTC',
      decimals: 18,
    },
    rpcUrls: {
      default: { http: ['https://public-node.rsk.co'] },
    },
    blockExplorers: {
      default: {
        name: 'RSK Explorer',
        url: 'https://rootstock.blockscout.com'
      },
    },
  }),
} as const;
