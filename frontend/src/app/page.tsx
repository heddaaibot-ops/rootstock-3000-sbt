'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Countdown } from '@/components/Countdown';
import { ProgressBar } from '@/components/ProgressBar';
import { MintButton } from '@/components/MintButton';
import { CampaignInfo } from '@/components/CampaignInfo';
import { RootstockIntro } from '@/components/RootstockIntro';
import { BitcoinIcon, BitcoinSymbol } from '@/components/BitcoinIcon';
import { RootstockIcon } from '@/components/RootstockLogo';
import { useContract } from '@/hooks/useContract';
import { useI18n } from '@/i18n/provider';

export default function Home() {
  const { chainId } = useAccount();
  const { contractData, loading, error, refresh, mint } = useContract();
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col bg-rsk-cream relative overflow-hidden">

      {/* 主要内容 - 提升 z-index */}
      <div className="relative z-10">
        <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Countdown Section - 倒数到 3000 天纪念日 */}
        <section className="relative py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-start gap-4 mb-8">
              <h2 className="inline-block bg-rsk-pink text-rsk-cream text-3xl md:text-4xl font-bold px-8 py-4 uppercase">
                Rootstock
              </h2>
              <h2 className="bg-rsk-orange text-rsk-cream text-3xl md:text-4xl font-bold px-8 py-4 uppercase w-full">
                距离 3000 天纪念日还有
              </h2>
            </div>
            <Countdown milestoneTimestamp={1774137600} />
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-8 text-center">
          <div className="container mx-auto px-4 relative z-10">
          {/* Bitcoin Icon - Floating Decorations from Figma */}
          <div className="absolute top-10 left-10 animate-float opacity-20 hidden lg:block">
            <img src="/images/figma/bitcoin.png" alt="Bitcoin" className="w-32 h-auto" />
          </div>
          <div className="absolute top-10 right-10 animate-float-delayed opacity-20 hidden lg:block">
            <img src="/images/figma/bitcoin.png" alt="Bitcoin" className="w-32 h-auto" />
          </div>

          {/* Rootstock Logo - Floating Decoration from Figma */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float opacity-25 hidden xl:block">
            <div
              className="w-40 h-10"
              style={{
                backgroundColor: '#FF9100',
                WebkitMaskImage: 'url(/images/figma/rootstock-logo.png)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: 'url(/images/figma/rootstock-logo.png)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center'
              }}
            />
          </div>

          <div className="animate-fade-in">
            {/* Rootstock Logo + Title */}
            <div className="flex flex-col items-center justify-center mb-6 gap-4">
              <div
                className="h-16 md:h-24 w-64 md:w-96"
                style={{
                  backgroundColor: '#FF9100',
                  WebkitMaskImage: 'url(/images/figma/rootstock-logo.png)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskImage: 'url(/images/figma/rootstock-logo.png)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center'
                }}
              />
              <h1 className="text-5xl md:text-7xl font-bold uppercase leading-tight text-center">
                <div className="text-rsk-text-dark">爱你 3000</div>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-rsk-text/70 mb-4">
              {t('hero.subtitle')}
            </p>

            {/* Bitcoin Symbol + Description */}
            <div className="flex items-center justify-center gap-2 text-sm text-rsk-text/60 max-w-2xl mx-auto">
              <BitcoinSymbol className="text-rsk-orange text-2xl" />
              <span>{t('hero.description')}</span>
            </div>
            </div>
          </div>
        </section>

        {/* Mint Section */}
        <section id="mint" className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="inline-block bg-rsk-orange text-rsk-cream text-4xl font-bold px-8 py-4 uppercase">
                免费铸造 SBT
              </h2>
            </div>

            {/* SBT Preview - 米色主题 */}
            <div className="mb-16">
              <div className="max-w-2xl mx-auto">
                <div className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-10 hover:border-rsk-orange transition-all duration-300">
                  <div className="inline-block bg-rsk-orange rounded-tag px-8 py-4 mb-6 mx-auto">
                    <h3 className="text-2xl font-bold text-white text-center uppercase">
                      SBT 预览
                    </h3>
                  </div>
                  <div className="relative aspect-square w-full max-w-md mx-auto">
                    <img
                      src="/images/sbt-preview.png"
                      alt="Rootstock 爱你 3000 SBT"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <p className="text-center text-rsk-text-dark mt-6 text-sm font-semibold">
                    独一无二的纪念 NFT，永久绑定你的钱包地址
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-6 uppercase">
                <span className="text-rsk-orange">铸造进度</span>
              </h3>

              {error ? (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center">
                  <h3 className="text-xl font-bold text-red-500 mb-2">{t('mint.error.failedToLoad')}</h3>
                  <p className="text-rsk-text/70 mb-6">{error}</p>
                  <button
                    onClick={refresh}
                    className="px-6 py-3 bg-rsk-orange hover:bg-rsk-orange/80 rounded-xl font-bold transition-colors"
                  >
                    {t('mint.error.retryButton')}
                  </button>
                </div>
              ) : loading || !contractData ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-rsk-gray rounded mb-4"></div>
                  <div className="h-16 bg-rsk-gray rounded"></div>
                </div>
              ) : (
                <ProgressBar
                  current={contractData.totalSupply}
                  total={contractData.maxSupply}
                />
              )}
            </div>

            {/* Mint Button */}
            <div className="mb-12">
              <MintButton
                isPaused={contractData?.isPaused ?? true}
                hasUserMinted={contractData?.hasUserMinted ?? false}
                onMint={mint}
                chainId={chainId}
              />
            </div>

            {/* Stats Grid - 橙色主题，去除 emoji */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Stat 1 - Launch Date */}
              <div className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-6 hover:border-rsk-orange transition-all">
                <div className="text-sm font-semibold text-rsk-text-dark mb-2 uppercase">
                  {t('mint.stats.launchDate')}
                </div>
                <div className="text-5xl font-bold text-rsk-orange font-mono leading-none">
                  2018
                </div>
                <div className="text-xs text-rsk-text-dark mt-2 font-medium">年</div>
              </div>

              {/* Stat 2 - Milestone Date */}
              <div className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-6 hover:border-rsk-orange transition-all">
                <div className="text-sm font-semibold text-rsk-text-dark mb-2 uppercase">天数</div>
                <div className="text-5xl font-bold text-rsk-orange font-mono leading-none">
                  3000
                </div>
                <div className="text-xs text-rsk-text-dark mt-2 font-medium">天</div>
              </div>

              {/* Stat 3 - Chain ID */}
              <div className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-6 hover:border-rsk-orange transition-all">
                <div className="text-sm font-semibold text-rsk-text-dark mb-2 uppercase">
                  {t('mint.stats.chainId')}
                </div>
                <div className="text-5xl font-bold text-rsk-orange font-mono leading-none">
                  {chainId || 31}
                </div>
                <div className="text-xs text-rsk-text-dark mt-2 font-medium">ID</div>
              </div>

              {/* Stat 4 - Status (去除 emoji ✓) */}
              <div className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-6 hover:border-rsk-orange transition-all">
                <div className="text-sm font-semibold text-rsk-text-dark mb-2 uppercase">
                  {t('mint.stats.status')}
                </div>
                <div className="text-4xl font-bold text-rsk-orange font-mono leading-none">
                  {!contractData ? (
                    <span>...</span>
                  ) : contractData.isPaused ? (
                    <span>暂停</span>
                  ) : (
                    <span>进行中</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rootstock Introduction Section */}
        <section className="container mx-auto px-4 py-12">
          <RootstockIntro />
        </section>

        {/* Campaign Info Section */}
        <section className="container mx-auto px-4 py-12">
          <CampaignInfo />
        </section>

        {/* About Section - 米色主题 */}
        <section id="about" className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {/* Card 01 - Soul Bound */}
              <div className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-8 hover:border-rsk-orange transition-all duration-300 relative min-h-[320px] flex flex-col">
                <div className="mb-6">
                  <div className="inline-block bg-rsk-orange rounded-tag px-6 py-3">
                    <h3 className="text-lg font-bold text-white leading-tight uppercase">{t('about.soulBound.title')}</h3>
                  </div>
                  <div className="inline-block bg-rsk-lime rounded-tag px-4 py-1 ml-2">
                    <span className="text-sm font-bold text-rsk-text-dark">01</span>
                  </div>
                </div>
                <p className="text-rsk-text-dark leading-relaxed text-base flex-grow">
                  {t('about.soulBound.description')}
                </p>
              </div>

              {/* Card 02 - Free Mint */}
              <div className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-8 hover:border-rsk-orange transition-all duration-300 relative min-h-[320px] flex flex-col">
                <div className="mb-6">
                  <div className="inline-block bg-rsk-orange rounded-tag px-6 py-3">
                    <h3 className="text-lg font-bold text-white leading-tight uppercase">{t('about.freeMint.title')}</h3>
                  </div>
                  <div className="inline-block bg-rsk-lime rounded-tag px-4 py-1 ml-2">
                    <span className="text-sm font-bold text-rsk-text-dark">02</span>
                  </div>
                </div>
                <p className="text-rsk-text-dark leading-relaxed text-base flex-grow">
                  {t('about.freeMint.description')}
                </p>
              </div>

              {/* Card 03 - Limited Supply */}
              <div className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-8 hover:border-rsk-orange transition-all duration-300 relative min-h-[320px] flex flex-col">
                <div className="mb-6">
                  <div className="inline-block bg-rsk-orange rounded-tag px-6 py-3">
                    <h3 className="text-lg font-bold text-white leading-tight uppercase">{t('about.limitedSupply.title')}</h3>
                  </div>
                  <div className="inline-block bg-rsk-lime rounded-tag px-4 py-1 ml-2">
                    <span className="text-sm font-bold text-rsk-text-dark">03</span>
                  </div>
                </div>
                <p className="text-rsk-text-dark leading-relaxed text-base flex-grow">
                  {t('about.limitedSupply.description')}
                </p>
              </div>
            </div>

            <div className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-8 hover:border-rsk-orange transition-all duration-300">
              <div className="inline-block bg-rsk-orange rounded-tag px-8 py-4 mb-6">
                <h2 className="text-xl font-bold text-white uppercase">{t('about.whatIsRootstock.title')}</h2>
              </div>
              <div className="space-y-4 text-rsk-text-dark leading-relaxed text-base">
                <p>{t('about.whatIsRootstock.paragraph1')}</p>
                <p>{t('about.whatIsRootstock.paragraph2')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - 米色主题 */}
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 uppercase">
              <span className="text-rsk-orange">{t('faq.title')}</span>
            </h2>

            <div className="space-y-6">
              <details className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-6 hover:border-rsk-orange transition-all group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-text-dark flex items-center justify-between uppercase">
                  <span className="flex items-center gap-3">
                    <span className="inline-block bg-rsk-orange rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-white">Q</span>
                    {t('faq.q1.question')}
                  </span>
                  <svg className="w-6 h-6 text-rsk-orange transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-rsk-text-dark leading-relaxed text-base ml-11">
                  {t('faq.q1.answer')}
                </p>
              </details>

              <details className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-6 hover:border-rsk-orange transition-all group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-text-dark flex items-center justify-between uppercase">
                  <span className="flex items-center gap-3">
                    <span className="inline-block bg-rsk-orange rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-white">Q</span>
                    {t('faq.q2.question')}
                  </span>
                  <svg className="w-6 h-6 text-rsk-orange transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-rsk-text-dark leading-relaxed text-base ml-11">
                  {t('faq.q2.answer')}
                </p>
              </details>

              <details className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-6 hover:border-rsk-orange transition-all group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-text-dark flex items-center justify-between uppercase">
                  <span className="flex items-center gap-3">
                    <span className="inline-block bg-rsk-orange rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-white">Q</span>
                    {t('faq.q3.question')}
                  </span>
                  <svg className="w-6 h-6 text-rsk-orange transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-rsk-text-dark leading-relaxed text-base ml-11">
                  {t('faq.q3.answer')}
                </p>
              </details>

              <details className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-6 hover:border-rsk-orange transition-all group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-text-dark flex items-center justify-between uppercase">
                  <span className="flex items-center gap-3">
                    <span className="inline-block bg-rsk-orange rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-white">Q</span>
                    {t('faq.q4.question')}
                  </span>
                  <svg className="w-6 h-6 text-rsk-orange transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-rsk-text-dark leading-relaxed text-base ml-11">
                  {t('faq.q4.answer')}
                </p>
              </details>
            </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      </div>
    </div>
  );
}
