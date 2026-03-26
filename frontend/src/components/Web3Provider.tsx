'use client';

import React, { useEffect } from 'react';
import { WagmiProvider, createConfig, http, createStorage, fallback } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  okxWallet,
} from '@rainbow-me/rainbowkit/wallets';
import binanceWallet from '@binance/w3w-rainbow-connector-v2';
import { ROOTSTOCK_MAINNET } from '@/utils/contract';
import { Web3ErrorBoundary } from './Web3ErrorBoundary';
import '@rainbow-me/rainbowkit/styles.css';

// WalletConnect Project ID
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo';

// 配置所有钱包连接器
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Popular',
      wallets: [okxWallet, binanceWallet, metaMaskWallet],
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

// 配置 Rootstock Mainnet（多 RPC 備份，提升穩定性）
const config = createConfig({
  connectors,
  chains: [ROOTSTOCK_MAINNET],
  transports: {
    [ROOTSTOCK_MAINNET.id]: fallback([
      http('https://public-node.rsk.co', {
        timeout: 30_000, // 增加到 30 秒，避免 Rootstock RPC 响应慢
        retryCount: 1, // 减少重试次数，快速切换到备用节点
      }),
      http('https://rpc.mainnet.rootstock.io/ZRjBSeG4PpiSLNO4zHgxSLIoAAQ_hIQC', {
        timeout: 30_000,
        retryCount: 1,
      }),
      http('https://mycrypto.rsk.co', {
        timeout: 30_000,
        retryCount: 1,
      }),
    ]),
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
  // 🚀 Performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        console.log('⚡ 頁面加載性能:', {
          domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
          loadComplete: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
          domInteractive: Math.round(perfData.domInteractive - perfData.fetchStart),
        });
      }
    }
  }, []);

  return (
    <Web3ErrorBoundary>
      <WagmiProvider config={config} reconnectOnMount={false}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            modalSize="compact"
            showRecentTransactions={true}
            locale="zh-CN"
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Web3ErrorBoundary>
  );
};
