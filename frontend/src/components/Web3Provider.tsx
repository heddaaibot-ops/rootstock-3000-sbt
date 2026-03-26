'use client';

import React from 'react';
import { WagmiProvider, createConfig, http, createStorage } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, connectorsForWallets, Wallet } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  injectedWallet,
} from '@rainbow-me/rainbowkit/wallets';
import binanceWallet from '@binance/w3w-rainbow-connector-v2';
import { ROOTSTOCK_MAINNET } from '@/utils/contract';
import '@rainbow-me/rainbowkit/styles.css';

// WalletConnect Project ID
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo';

// 配置所有錢包連接器
// injectedWallet 會自動檢測 MetaMask、OKX、Binance 等所有注入式錢包
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Popular',
      wallets: [injectedWallet, binanceWallet, metaMaskWallet],
    },
    {
      groupName: 'Others',
      wallets: [coinbaseWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'Rootstock 3000 Days SBT',
    projectId: WALLETCONNECT_PROJECT_ID,
  }
);

// 配置 Rootstock Mainnet
const config = createConfig({
  connectors,
  chains: [ROOTSTOCK_MAINNET as any],
  transports: {
    [ROOTSTOCK_MAINNET.id]: http(ROOTSTOCK_MAINNET.rpcUrls.default.http[0], {
      timeout: 30_000,
      retryCount: 3,
      retryDelay: 1000,
    }),
  },
  ssr: true, // Next.js SSR 支持
  storage: createStorage({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  }),
});

// 配置 QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24,
      staleTime: 1_000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      retry: 3,
    },
  },
});

interface Web3ProviderProps {
  children: React.ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={config} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          initialChain={ROOTSTOCK_MAINNET}
          showRecentTransactions={true}
          locale="zh-CN"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
