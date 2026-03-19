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
import { GridBackground } from '@/components/GridBackground';
import { ColorfulRectangles } from '@/components/ColorfulRectangles';
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
      {/* 网格背景系统 */}
      <GridBackground />

      {/* 彩色矩形装饰 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <ColorfulRectangles />
      </div>

      {/* 主要内容 - 提升 z-index */}
      <div className="relative z-10">
        <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Countdown Section - 倒数到 3000 天纪念日 */}
        <section className="container mx-auto px-4 py-12 relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-rsk-orange via-rsk-pink to-rsk-neon-green bg-clip-text text-transparent">
                距离 Rootstock 3000 天纪念日
              </span>
            </h2>
            <Countdown milestoneTimestamp={1774137600} />
          </div>
        </section>

        {/* SBT Preview Section */}
        <section className="container mx-auto px-4 py-12 relative">
          <div className="max-w-2xl mx-auto">
            <div className="bg-rsk-gray/50 border-2 border-rsk-pink/30 rounded-3xl p-8 hover:border-rsk-pink transition-all duration-300 shadow-lg hover:shadow-rsk-pink/20 relative overflow-hidden">
              {/* 装饰性渐变背景 */}
              <div className="absolute inset-0 bg-gradient-to-br from-rsk-neon-green/5 via-transparent to-rsk-pink/5 pointer-events-none" />

              <h3 className="text-2xl font-bold text-rsk-orange mb-6 text-center relative z-10">
                SBT 预览
              </h3>
              <div className="relative aspect-square w-full max-w-md mx-auto z-10">
                <img
                  src="/images/sbt-preview.png"
                  alt="Rootstock 爱你 3000 SBT"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
              <p className="text-center text-rsk-text/70 mt-6 text-sm relative z-10">
                独一无二的纪念 NFT，永久绑定你的钱包地址
              </p>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center relative">
          {/* Bitcoin Icon - Floating Decorations */}
          <div className="absolute top-10 left-10 animate-float opacity-30 hidden lg:block">
            <BitcoinIcon size={100} />
          </div>
          <div className="absolute bottom-10 right-10 animate-float-delayed opacity-25 hidden lg:block">
            <BitcoinIcon size={80} />
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
        </section>

        {/* Mint Section */}
        <section id="mint" className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-rsk-orange">{t('mint.title').split(' ')[0]}</span>{' '}
              <span className="text-rsk-dark">{t('mint.title').split(' ')[1]}</span>
            </h2>

            {/* Progress Bar */}
            <div className="mb-16">
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
              <div className="bg-rsk-gray border border-rsk-orange/20 rounded-xl p-4 text-center">
                <div className="text-sm text-rsk-text/70 mb-1">{t('mint.stats.launchDate')}</div>
                <div className="text-lg font-bold text-rsk-dark font-mono">
                  2018年1月16日
                </div>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/20 rounded-xl p-4 text-center">
                <div className="text-sm text-rsk-text/70 mb-1">{t('mint.stats.milestoneDate')}</div>
                <div className="text-lg font-bold text-rsk-orange font-mono">
                  2026年3月22日
                </div>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/20 rounded-xl p-4 text-center">
                <div className="text-sm text-rsk-text/70 mb-1">{t('mint.stats.chainId')}</div>
                <div className="text-lg font-bold text-rsk-dark font-mono">
                  {chainId || 31}
                </div>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/20 rounded-xl p-4 text-center">
                <div className="text-sm text-rsk-text/70 mb-1">{t('mint.stats.status')}</div>
                <div className="text-lg font-bold text-rsk-dark">
                  {!contractData ? (
                    <span className="text-rsk-text/60">{t('mint.stats.loading')}</span>
                  ) : contractData.isPaused ? (
                    <span className="text-orange-600">{t('mint.stats.paused')}</span>
                  ) : (
                    <span className="text-green-600">{t('mint.stats.live')}</span>
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
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-rsk-gray border border-rsk-orange/20 rounded-2xl p-6 text-center hover:border-rsk-orange transition-colors">
                <h3 className="text-lg font-bold text-rsk-dark mb-2">{t('about.soulBound.title')}</h3>
                <p className="text-sm text-rsk-text/70">
                  {t('about.soulBound.description')}
                </p>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/20 rounded-2xl p-6 text-center hover:border-rsk-orange transition-colors">
                <h3 className="text-lg font-bold text-rsk-dark mb-2">{t('about.freeMint.title')}</h3>
                <p className="text-sm text-rsk-text/70">
                  {t('about.freeMint.description')}
                </p>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/20 rounded-2xl p-6 text-center hover:border-rsk-orange transition-colors">
                <h3 className="text-lg font-bold text-rsk-dark mb-2">{t('about.limitedSupply.title')}</h3>
                <p className="text-sm text-rsk-text/70">
                  {t('about.limitedSupply.description')}
                </p>
              </div>
            </div>

            <div className="bg-rsk-gray/50 border border-rsk-orange/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-rsk-orange mb-6">{t('about.whatIsRootstock.title')}</h2>
              <div className="space-y-4 text-rsk-text/70">
                <p>{t('about.whatIsRootstock.paragraph1')}</p>
                <p>{t('about.whatIsRootstock.paragraph2')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-rsk-orange">{t('faq.title')}</span>
            </h2>

            <div className="space-y-4">
              <details className="bg-rsk-gray border border-rsk-orange/20 rounded-xl p-6 hover:border-rsk-orange transition-colors group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-dark flex items-center justify-between">
                  <span>{t('faq.q1.question')}</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-rsk-text/70">
                  {t('faq.q1.answer')}
                </p>
              </details>

              <details className="bg-rsk-gray border border-rsk-orange/20 rounded-xl p-6 hover:border-rsk-orange transition-colors group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-dark flex items-center justify-between">
                  <span>{t('faq.q2.question')}</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-rsk-text/70">
                  {t('faq.q2.answer')}
                </p>
              </details>

              <details className="bg-rsk-gray border border-rsk-orange/20 rounded-xl p-6 hover:border-rsk-orange transition-colors group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-dark flex items-center justify-between">
                  <span>{t('faq.q3.question')}</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-rsk-text/70">
                  {t('faq.q3.answer')}
                </p>
              </details>

              <details className="bg-rsk-gray border border-rsk-orange/20 rounded-xl p-6 hover:border-rsk-orange transition-colors group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-dark flex items-center justify-between">
                  <span>{t('faq.q4.question')}</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-rsk-text/70">
                  {t('faq.q4.answer')}
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      </div>
    </div>
  );
}
