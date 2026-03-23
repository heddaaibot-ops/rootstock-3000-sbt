'use client';

import React from 'react';
import { WagmiProvider, createConfig, http, createStorage } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { ROOTSTOCK_MAINNET } from '@/utils/contract';

// WalletConnect Project ID (optional - app will work without it for read-only features)
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo';

// 配置 Rootstock Mainnet
const config = createConfig(
  getDefaultConfig({
    chains: [ROOTSTOCK_MAINNET as any],
    transports: {
      [ROOTSTOCK_MAINNET.id]: http(ROOTSTOCK_MAINNET.rpcUrls.default.http[0], {
        timeout: 30_000, // 30 秒超时
        retryCount: 3, // 重试 3 次
        retryDelay: 1000, // 重试延迟 1 秒
      }),
    },
    walletConnectProjectId: WALLETCONNECT_PROJECT_ID,
    appName: 'Rootstock 3000 Days SBT',
    appDescription: '纪念 Rootstock 主网稳定运行 3000 天',
    appUrl: 'https://rootstockcn.com',
    appIcon: 'https://rootstockcn.com/favicon.ico',
    // 添加持久化存储，解决钱包连接状态丢失问题
    storage: createStorage({
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    }),
  })
);

const queryClient = new QueryClient();

interface Web3ProviderProps {
  children: React.ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
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
