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
          {/* Figma Group Decoration - 满版横幅 */}
          <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-0">
            <img src="/images/figma/group-decoration.png" alt="" className="w-full h-full object-cover object-center" style={{display: 'block'}} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              <span className="text-rsk-orange">距离 Rootstock 3000 天纪念日</span>
            </h2>
            <Countdown milestoneTimestamp={1774137600} />
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-16 text-center">
          <div className="container mx-auto px-4 relative z-10">
          {/* Bitcoin Icon - Floating Decorations from Figma */}
          <div className="absolute top-10 left-10 animate-float opacity-20 hidden lg:block">
            <img src="/images/figma/bitcoin.png" alt="Bitcoin" className="w-32 h-auto" />
          </div>
          <div className="absolute bottom-10 right-10 animate-float-delayed opacity-15 hidden lg:block">
            <img src="/images/figma/bitcoin.png" alt="Bitcoin" className="w-24 h-auto" />
          </div>

          {/* Rootstock Logo - Floating Decoration from Figma */}
          <div className="absolute top-1/2 right-20 animate-float opacity-15 hidden xl:block">
            <img src="/images/figma/rootstock-logo.png" alt="Rootstock" className="w-28 h-auto" />
          </div>

          <div className="animate-fade-in">
            {/* Rootstock Icon + Title */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <RootstockIcon size={50} />
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="text-rsk-orange">Rootstock</span>
              </h1>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-rsk-dark">{t('hero.title').split('Rootstock ')[1]}</span>
            </h2>

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
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-rsk-orange">免费铸造</span>{' '}
              <span className="text-rsk-dark">SBT</span>
            </h2>

            {/* SBT Preview */}
            <div className="mb-16">
              <div className="max-w-2xl mx-auto">
                <div className="bg-black/95 border-2 border-white/10 rounded-[32px] p-10 hover:border-rsk-orange transition-all duration-300">
                  <div className="inline-block bg-rsk-orange rounded-2xl px-8 py-4 mb-6 mx-auto">
                    <h3 className="text-2xl font-black text-black text-center">
                      SBT 预览
                    </h3>
                  </div>
                  <div className="relative aspect-square w-full max-w-md mx-auto">
                    <img
                      src="/images/sbt-preview.png"
                      alt="Rootstock 爱你 3000 SBT"
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  </div>
                  <p className="text-center text-white/90 mt-6 text-sm font-semibold">
                    独一无二的纪念 NFT，永久绑定你的钱包地址
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-6">
                <span className="text-rsk-orange">鑄造</span>
                <span className="text-rsk-dark">進度</span>
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/95 border-2 border-white/10 rounded-2xl p-5 text-center hover:border-rsk-neon-green transition-all">
                <div className="inline-block bg-rsk-neon-green rounded-lg px-3 py-1 mb-2">
                  <div className="text-xs font-black text-black uppercase">{t('mint.stats.launchDate')}</div>
                </div>
                <div className="text-lg font-black text-white/90 font-mono">
                  2018年1月3日
                </div>
              </div>

              <div className="bg-black/95 border-2 border-white/10 rounded-2xl p-5 text-center hover:border-rsk-pink transition-all">
                <div className="inline-block bg-rsk-pink rounded-lg px-3 py-1 mb-2">
                  <div className="text-xs font-black text-black uppercase">{t('mint.stats.milestoneDate')}</div>
                </div>
                <div className="text-lg font-black text-white/90 font-mono">
                  2026年3月22日
                </div>
              </div>

              <div className="bg-black/95 border-2 border-white/10 rounded-2xl p-5 text-center hover:border-purple-400 transition-all">
                <div className="inline-block bg-purple-400 rounded-lg px-3 py-1 mb-2">
                  <div className="text-xs font-black text-black uppercase">{t('mint.stats.chainId')}</div>
                </div>
                <div className="text-lg font-black text-white/90 font-mono">
                  {chainId || 31}
                </div>
              </div>

              <div className="bg-black/95 border-2 border-white/10 rounded-2xl p-5 text-center hover:border-rsk-orange transition-all">
                <div className="inline-block bg-rsk-orange rounded-lg px-3 py-1 mb-2">
                  <div className="text-xs font-black text-black uppercase">{t('mint.stats.status')}</div>
                </div>
                <div className="text-lg font-black text-white/90">
                  {!contractData ? (
                    <span className="text-white/60">{t('mint.stats.loading')}</span>
                  ) : contractData.isPaused ? (
                    <span className="text-rsk-orange">{t('mint.stats.paused')}</span>
                  ) : (
                    <span className="text-rsk-neon-green">{t('mint.stats.live')}</span>
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

        {/* About Section */}
        <section id="about" className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Card 01 - Soul Bound */}
              <div className="bg-black/95 border-2 border-white/10 rounded-[32px] p-10 hover:border-rsk-neon-green transition-all duration-300 relative">
                <div className="mb-8">
                  <div className="inline-block bg-rsk-neon-green rounded-2xl px-8 py-4 mb-0">
                    <h3 className="text-2xl font-black text-black leading-tight">{t('about.soulBound.title')}</h3>
                  </div>
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-rsk-neon-green rounded-full ml-4 align-top mt-1">
                    <span className="text-xl font-black text-black">01</span>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed text-base mb-12">
                  {t('about.soulBound.description')}
                </p>
              </div>

              {/* Card 02 - Free Mint */}
              <div className="bg-black/95 border-2 border-white/10 rounded-[32px] p-10 hover:border-rsk-pink transition-all duration-300 relative">
                <div className="mb-8">
                  <div className="inline-block bg-rsk-pink rounded-2xl px-8 py-4 mb-0">
                    <h3 className="text-2xl font-black text-black leading-tight">{t('about.freeMint.title')}</h3>
                  </div>
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-rsk-pink rounded-full ml-4 align-top mt-1">
                    <span className="text-xl font-black text-black">02</span>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed text-base mb-12">
                  {t('about.freeMint.description')}
                </p>
              </div>

              {/* Card 03 - Limited Supply */}
              <div className="bg-black/95 border-2 border-white/10 rounded-[32px] p-10 hover:border-purple-400 transition-all duration-300 relative">
                <div className="mb-8">
                  <div className="inline-block bg-purple-400 rounded-2xl px-8 py-4 mb-0">
                    <h3 className="text-2xl font-black text-black leading-tight">{t('about.limitedSupply.title')}</h3>
                  </div>
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-400 rounded-full ml-4 align-top mt-1">
                    <span className="text-xl font-black text-black">03</span>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed text-base mb-12">
                  {t('about.limitedSupply.description')}
                </p>
              </div>
            </div>

            <div className="bg-black/95 border-2 border-white/10 rounded-[32px] p-10 hover:border-rsk-orange transition-all duration-300">
              <div className="inline-block bg-rsk-orange rounded-2xl px-8 py-4 mb-6">
                <h2 className="text-2xl font-black text-black">{t('about.whatIsRootstock.title')}</h2>
              </div>
              <div className="space-y-4 text-white/90 leading-relaxed">
                <p>{t('about.whatIsRootstock.paragraph1')}</p>
                <p>{t('about.whatIsRootstock.paragraph2')}</p>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-16">
          {/* Figma Group Decoration - 满版横幅 */}
          <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-0">
            <img src="/images/figma/group-decoration.png" alt="" className="w-full h-full object-cover object-center transform scale-x-[-1]" style={{display: 'block'}} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-rsk-orange">{t('faq.title')}</span>
            </h2>

            <div className="space-y-6">
              <details className="bg-rsk-dark/95 border-2 border-rsk-neon-green/50 rounded-2xl p-6 hover:border-rsk-neon-green transition-all group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-cream flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <span className="inline-block bg-rsk-neon-green rounded-full w-8 h-8 flex items-center justify-center text-sm font-black text-rsk-dark">Q</span>
                    {t('faq.q1.question')}
                  </span>
                  <svg className="w-6 h-6 text-rsk-neon-green transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-rsk-cream/80 leading-relaxed ml-11">
                  {t('faq.q1.answer')}
                </p>
              </details>

              <details className="bg-rsk-dark/95 border-2 border-rsk-pink/50 rounded-2xl p-6 hover:border-rsk-pink transition-all group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-cream flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <span className="inline-block bg-rsk-pink rounded-full w-8 h-8 flex items-center justify-center text-sm font-black text-rsk-dark">Q</span>
                    {t('faq.q2.question')}
                  </span>
                  <svg className="w-6 h-6 text-rsk-pink transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-rsk-cream/80 leading-relaxed ml-11">
                  {t('faq.q2.answer')}
                </p>
              </details>

              <details className="bg-rsk-dark/95 border-2 border-purple-400/50 rounded-2xl p-6 hover:border-purple-400 transition-all group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-cream flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <span className="inline-block bg-purple-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-black text-rsk-dark">Q</span>
                    {t('faq.q3.question')}
                  </span>
                  <svg className="w-6 h-6 text-purple-400 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-rsk-cream/80 leading-relaxed ml-11">
                  {t('faq.q3.answer')}
                </p>
              </details>

              <details className="bg-rsk-dark/95 border-2 border-rsk-orange/50 rounded-2xl p-6 hover:border-rsk-orange transition-all group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-cream flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <span className="inline-block bg-rsk-orange rounded-full w-8 h-8 flex items-center justify-center text-sm font-black text-rsk-dark">Q</span>
                    {t('faq.q4.question')}
                  </span>
                  <svg className="w-6 h-6 text-rsk-orange transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-rsk-cream/80 leading-relaxed ml-11">
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
