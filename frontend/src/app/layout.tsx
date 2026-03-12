import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Web3Provider } from '@/components/Web3Provider';
import { I18nProvider } from '@/i18n/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rootstock 3000 Days | Commemorative Soul Bound Token',
  description: 'Claim your Soul Bound Token celebrating 3000 days of Rootstock - the most secure smart contract platform powered by Bitcoin.',
  keywords: 'Rootstock, RSK, Bitcoin, Smart Contracts, SBT, Soul Bound Token, NFT, Blockchain',
  authors: [{ name: 'Rootstock Community' }],
  openGraph: {
    title: 'Rootstock 3000 Days SBT',
    description: 'Commemorating 3000 days of Bitcoin-powered smart contracts',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rootstock 3000 Days SBT',
    description: 'Commemorating 3000 days of Bitcoin-powered smart contracts',
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
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <Web3Provider>
            {children}
          </Web3Provider>
        </I18nProvider>
      </body>
    </html>
  );
}
