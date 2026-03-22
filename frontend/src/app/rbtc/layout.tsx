import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'rBTC 获取指南 | Rootstock',
  description: 'rBTC 与比特币 1:1 锚定，由比特币算力保护。学习如何通过跨链桥、DEX 或 PowPeg 获取 rBTC，参与 Rootstock 上的 DeFi 生态。完整的获取教程和钱包设置指南。',
  keywords: 'rBTC, Rootstock, 比特币, BTC, DeFi, 跨链桥, DEX, PowPeg, 获取指南',
  openGraph: {
    title: 'rBTC 获取指南 | Rootstock',
    description: 'rBTC 与比特币 1:1 锚定，由比特币算力保护。学习如何获取 rBTC，参与 Rootstock DeFi 生态。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://rootstockcn.com/rbtc',
    images: [
      {
        url: '/images/sbt-preview.png',
        width: 1200,
        height: 630,
        alt: 'rBTC 获取指南 | Rootstock',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'rBTC 获取指南 | Rootstock',
    description: 'rBTC 与比特币 1:1 锚定，由比特币算力保护。学习如何获取 rBTC，参与 Rootstock DeFi 生态。',
    images: ['/images/sbt-preview.png'],
  },
};

export default function RbtcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
