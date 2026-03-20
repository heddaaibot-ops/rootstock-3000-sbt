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
          <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-0 overflow-hidden">
            <img src="/images/figma/group-decoration.png" alt="" className="w-full h-full object-cover" />
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
        <section id="mint" className="relative py-16">
          {/* Figma Group Decoration - 满版横幅 */}
          <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-0 overflow-hidden">
            <img src="/images/figma/group-decoration.png" alt="" className="w-full h-full object-cover transform scale-x-[-1]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-rsk-orange">免费铸造</span>{' '}
              <span className="text-rsk-dark">SBT</span>
            </h2>

            {/* SBT Preview */}
            <div className="mb-16">
              <div className="max-w-2xl mx-auto">
                <div className="bg-rsk-gray/50 border border-rsk-orange/20 rounded-3xl p-8 hover:border-rsk-orange transition-all duration-300 shadow-lg hover:shadow-rsk-orange/20">
                  <h3 className="text-2xl font-bold text-rsk-orange mb-6 text-center">
                    SBT 预览
                  </h3>
                  <div className="relative aspect-square w-full max-w-md mx-auto">
                    <img
                      src="/images/sbt-preview.png"
                      alt="Rootstock 爱你 3000 SBT"
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  </div>
                  <p className="text-center text-rsk-text/70 mt-6 text-sm">
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
              <div className="bg-rsk-gray border border-rsk-orange/20 rounded-xl p-4 text-center hover:border-rsk-orange transition-colors">
                <div className="text-sm text-rsk-text/70 mb-1">{t('mint.stats.launchDate')}</div>
                <div className="text-lg font-bold text-rsk-dark font-mono">
                  2018年1月3日
                </div>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/20 rounded-xl p-4 text-center hover:border-rsk-orange transition-colors">
                <div className="text-sm text-rsk-text/70 mb-1">{t('mint.stats.milestoneDate')}</div>
                <div className="text-lg font-bold text-rsk-orange font-mono">
                  2026年3月22日
                </div>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/20 rounded-xl p-4 text-center hover:border-rsk-orange transition-colors">
                <div className="text-sm text-rsk-text/70 mb-1">{t('mint.stats.chainId')}</div>
                <div className="text-lg font-bold text-rsk-dark font-mono">
                  {chainId || 31}
                </div>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/20 rounded-xl p-4 text-center hover:border-rsk-orange transition-colors">
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
          </div>
        </section>

        {/* Rootstock Introduction Section */}
        <section className="relative py-12">
          {/* Figma Group Decoration - 满版横幅 */}
          <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-0 overflow-hidden">
            <img src="/images/figma/group-decoration.png" alt="" className="w-full h-full object-cover" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <RootstockIntro />
          </div>
        </section>

        {/* Campaign Info Section */}
        <section className="relative py-12">
          {/* Figma Group Decoration - 满版横幅 */}
          <div className="absolute inset-x-0 bottom-0 h-36 pointer-events-none z-0 overflow-hidden">
            <img src="/images/figma/group-decoration.png" alt="" className="w-full h-full object-cover transform scale-x-[-1]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <CampaignInfo />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-16">
          {/* Figma Decoration - 满版横幅 */}
          <div className="absolute inset-x-0 top-0 h-36 pointer-events-none z-0 overflow-hidden">
            <img src="/images/figma/group-decoration.png" alt="" className="w-full h-full object-cover" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
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
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-16">
          {/* Figma Group Decoration - 满版横幅 */}
          <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-0 overflow-hidden">
            <img src="/images/figma/group-decoration.png" alt="" className="w-full h-full object-cover transform scale-x-[-1]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
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
          </div>
        </section>
      </main>

      <Footer />
      </div>
    </div>
  );
}
