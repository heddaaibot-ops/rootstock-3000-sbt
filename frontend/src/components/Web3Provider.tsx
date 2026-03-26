'use client';

import React from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, connectorsForWallets, Wallet } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { injected } from 'wagmi/connectors';
import binanceWallet from '@binance/w3w-rainbow-connector-v2';
import { ROOTSTOCK_MAINNET } from '@/utils/contract';
import '@rainbow-me/rainbowkit/styles.css';

// WalletConnect Project ID
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo';

// 自定义 OKX Wallet（符合 RainbowKit CreateWalletFn 類型）
const okxWallet = (): Wallet => ({
  id: 'okx',
  name: 'OKX Wallet',
  iconUrl: 'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png',
  iconBackground: '#000',
  downloadUrls: {
    browserExtension: 'https://www.okx.com/web3',
  },
  createConnector: () => injected({
    target() {
      return {
        id: 'okx',
        name: 'OKX Wallet',
        provider: typeof window !== 'undefined' ? (window as any).okxwallet : undefined,
      };
    },
  }),
});

// 配置所有錢包連接器（傳入函數本身，不調用）
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Popular',
      wallets: [okxWallet, binanceWallet],
    },
    {
      groupName: 'Others',
      wallets: [metaMaskWallet, coinbaseWallet, walletConnectWallet],
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
        <RainbowKitProvider modalSize="compact">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
