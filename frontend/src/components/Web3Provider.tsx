'use client';

import React from 'react';
import { WagmiProvider, createConfig, http, createStorage } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { injected, walletConnect } from 'wagmi/connectors';
import { getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2';
import { ROOTSTOCK_MAINNET } from '@/utils/contract';

// WalletConnect Project ID (optional - app will work without it for read-only features)
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo';

// 币安官方 Wagmi v2 连接器
const binanceWalletConnector = getWagmiConnectorV2();

// 配置 Rootstock Mainnet（支持 MetaMask、币安钱包等多种钱包）
const config = createConfig({
  chains: [ROOTSTOCK_MAINNET as any],
  connectors: [
    // Injected 钱包 (MetaMask, Trust Wallet 等)
    injected({
      shimDisconnect: true,
    }),
    // 币安钱包官方连接器
    binanceWalletConnector(),
    // WalletConnect
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      metadata: {
        name: 'Rootstock 3000 Days SBT',
        description: '纪念 Rootstock 主网稳定运行 3000 天',
        url: 'https://rootstockcn.com',
        icons: ['https://rootstockcn.com/favicon.ico'],
      },
      showQrModal: true,
    }),
  ],
  transports: {
    [ROOTSTOCK_MAINNET.id]: http(ROOTSTOCK_MAINNET.rpcUrls.default.http[0], {
      timeout: 30_000, // 30 秒超时
      retryCount: 3, // 重试 3 次
      retryDelay: 1000, // 重试延迟 1 秒
    }),
  },
  // 添加持久化存储
  storage: createStorage({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  }),
  ssr: true,
});

// 配置 QueryClient 以保持更长的缓存时间（避免状态频繁失效）
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 小时垃圾回收
      staleTime: 1_000 * 60 * 5, // 5 分钟内数据视为新鲜
      refetchOnWindowFocus: false, // 禁用窗口聚焦时自动重新获取
      refetchOnMount: false, // 禁用组件挂载时自动重新获取
      refetchOnReconnect: true, // 网络重连时重新获取
      retry: 3, // 失败时重试 3 次
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
        <ConnectKitProvider
          mode="auto"
          theme="soft"
          options={{
            enforceSupportedChains: false,
            walletConnectName: 'WalletConnect',
            disclaimer: (
              <div style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
                连接钱包即表示您同意使用 Rootstock 区块链
              </div>
            ),
          }}
          customTheme={{
            '--ck-font-family': '"Space Grotesk", system-ui, sans-serif',
            '--ck-border-radius': '9999px',
            '--ck-connectbutton-background': '#000000',
            '--ck-connectbutton-color': '#FFFFFF',
            '--ck-connectbutton-border-color': '#FFFFFF',
            '--ck-connectbutton-border-width': '2px',
            '--ck-connectbutton-box-shadow': '3px 3px 0 0 #FFFFFF',
            '--ck-connectbutton-hover-background': '#FF70E0',
            '--ck-connectbutton-hover-color': '#000000',
            '--ck-connectbutton-active-background': '#FF70E0',
            '--ck-primary-button-background': '#FF9100',
            '--ck-primary-button-color': '#FFFFFF',
            '--ck-primary-button-hover-background': '#FFA833',
            '--ck-body-background': '#FDF8F0',
            '--ck-body-background-secondary': '#F5EFE6',
            '--ck-overlay-background': 'rgba(0, 0, 0, 0.3)',
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
