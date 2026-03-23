import type { Metadata, Viewport } from 'next';
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
  metadataBase: new URL('https://rootstockcn.com'),
  title: 'Rootstock 爱你 3000 | 纪念灵魂绑定代币',
  description: '纪念 Rootstock 上主网 3000 天。运行时间最长的 Bitcoin\'s DeFi Layer。这个灵魂绑定代币庆祝从 2018 年 1 月 3 日到 2026 年 3 月 22 日的旅程，见证比特币合并挖矿的安全性和比特币 DeFi 的基石。',
  keywords: 'Rootstock, RSK, 比特币, 智能合约, SBT, 灵魂绑定代币, NFT, 区块链, Bitcoin DeFi',
  authors: [{ name: 'Rootstock 社区' }],
  openGraph: {
    title: 'Rootstock 爱你 3000 SBT',
    description: '纪念 Rootstock 上主网 3000 天。运行时间最长的 Bitcoin\'s DeFi Layer。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://rootstockcn.com',
    images: [
      {
        url: '/images/sbt-preview.png',
        width: 2700,
        height: 2700,
        alt: 'Rootstock 爱你 3000 - 纪念灵魂绑定代币',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rootstock 爱你 3000 SBT',
    description: '纪念 Rootstock 上主网 3000 天。运行时间最长的 Bitcoin\'s DeFi Layer。',
    images: ['/images/sbt-preview.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
