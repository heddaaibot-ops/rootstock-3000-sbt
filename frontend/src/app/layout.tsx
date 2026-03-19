import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';
import { Web3Provider } from '@/components/Web3Provider';
import { I18nProvider } from '@/i18n/provider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rootstock 爱你 3000 | 纪念灵魂绑定代币',
  description: '领取纪念 Rootstock 3000 天的灵魂绑定代币 - 由比特币驱动的最安全智能合约平台。',
  keywords: 'Rootstock, RSK, 比特币, 智能合约, SBT, 灵魂绑定代币, NFT, 区块链',
  authors: [{ name: 'Rootstock 社区' }],
  openGraph: {
    title: 'Rootstock 爱你 3000 SBT',
    description: '纪念比特币智能合约 3000 天',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rootstock 爱你 3000 SBT',
    description: '纪念比特币智能合约 3000 天',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#FF6B00',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <I18nProvider>
          <Web3Provider>
            {children}
          </Web3Provider>
        </I18nProvider>
      </body>
    </html>
  );
}
