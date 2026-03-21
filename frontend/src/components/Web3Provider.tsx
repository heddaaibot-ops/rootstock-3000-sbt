'use client';

import React from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { ROOTSTOCK_CHAINS } from '@/utils/contract';

// WalletConnect Project ID (optional - app will work without it for read-only features)
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo';

// 配置 Rootstock 网络
const config = createConfig(
  getDefaultConfig({
    chains: [ROOTSTOCK_CHAINS.testnet as any, ROOTSTOCK_CHAINS.mainnet as any],
    transports: {
      [ROOTSTOCK_CHAINS.testnet.id]: http(ROOTSTOCK_CHAINS.testnet.rpcUrls.default.http[0]),
      [ROOTSTOCK_CHAINS.mainnet.id]: http(ROOTSTOCK_CHAINS.mainnet.rpcUrls.default.http[0]),
    },
    walletConnectProjectId: WALLETCONNECT_PROJECT_ID,
    appName: 'Rootstock 3000 Days SBT',
    appDescription: 'Commemorating 3000 days of Rootstock',
    appUrl: 'https://frontend-green-delta-12.vercel.app',
    appIcon: 'https://frontend-green-delta-12.vercel.app/favicon.ico',
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
