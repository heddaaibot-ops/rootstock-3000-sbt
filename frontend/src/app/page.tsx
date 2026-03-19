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
import { useContract } from '@/hooks/useContract';
import { useI18n } from '@/i18n/provider';

export default function Home() {
  const { chainId } = useAccount();
  const { contractData, loading, error, refresh, mint } = useContract();
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col bg-rsk-dark">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Countdown Section - 倒数到 3000 天纪念日 */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              <span className="text-rsk-orange">距离 Rootstock 3000 天纪念日</span>
            </h2>
            <Countdown milestoneTimestamp={1774137600} />
          </div>
        </section>

        {/* SBT Preview Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-rsk-gray/50 border border-rsk-orange/30 rounded-3xl p-8 hover:border-rsk-orange transition-all duration-300 shadow-lg hover:shadow-rsk-orange/20">
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
              <p className="text-center text-gray-400 mt-6 text-sm">
                独一无二的纪念 NFT，永久绑定你的钱包地址
              </p>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-rsk-orange">Rootstock</span>{' '}
              <span className="text-rsk-light">{t('hero.title').split('Rootstock ')[1]}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-4">
              {t('hero.subtitle')}
            </p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
          </div>
        </section>

        {/* Mint Section */}
        <section id="mint" className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-rsk-orange">{t('mint.title').split(' ')[0]}</span>{' '}
              <span className="text-rsk-light">{t('mint.title').split(' ')[1]}</span>
            </h2>

            {/* Progress Bar */}
            <div className="mb-16">
              {error ? (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center">
                  <h3 className="text-xl font-bold text-red-500 mb-2">{t('mint.error.failedToLoad')}</h3>
                  <p className="text-gray-400 mb-6">{error}</p>
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
              <div className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">{t('mint.stats.launchDate')}</div>
                <div className="text-lg font-bold text-rsk-light font-mono">
                  2018年1月16日
                </div>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">{t('mint.stats.milestoneDate')}</div>
                <div className="text-lg font-bold text-rsk-orange font-mono">
                  2026年3月22日
                </div>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">{t('mint.stats.chainId')}</div>
                <div className="text-lg font-bold text-rsk-light font-mono">
                  {chainId || 31}
                </div>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">{t('mint.stats.status')}</div>
                <div className="text-lg font-bold text-rsk-light">
                  {!contractData ? (
                    <span className="text-gray-500">{t('mint.stats.loading')}</span>
                  ) : contractData.isPaused ? (
                    <span className="text-yellow-500">{t('mint.stats.paused')}</span>
                  ) : (
                    <span className="text-green-500">{t('mint.stats.live')}</span>
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
              <div className="bg-rsk-gray border border-rsk-orange/30 rounded-2xl p-6 text-center hover:border-rsk-orange transition-colors">
                <h3 className="text-lg font-bold text-rsk-light mb-2">{t('about.soulBound.title')}</h3>
                <p className="text-sm text-gray-400">
                  {t('about.soulBound.description')}
                </p>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/30 rounded-2xl p-6 text-center hover:border-rsk-orange transition-colors">
                <h3 className="text-lg font-bold text-rsk-light mb-2">{t('about.freeMint.title')}</h3>
                <p className="text-sm text-gray-400">
                  {t('about.freeMint.description')}
                </p>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/30 rounded-2xl p-6 text-center hover:border-rsk-orange transition-colors">
                <h3 className="text-lg font-bold text-rsk-light mb-2">{t('about.limitedSupply.title')}</h3>
                <p className="text-sm text-gray-400">
                  {t('about.limitedSupply.description')}
                </p>
              </div>
            </div>

            <div className="bg-rsk-gray/50 border border-rsk-orange/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-rsk-orange mb-6">{t('about.whatIsRootstock.title')}</h2>
              <div className="space-y-4 text-gray-400">
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
              <details className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-6 hover:border-rsk-orange transition-colors group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-light flex items-center justify-between">
                  <span>{t('faq.q1.question')}</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-400">
                  {t('faq.q1.answer')}
                </p>
              </details>

              <details className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-6 hover:border-rsk-orange transition-colors group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-light flex items-center justify-between">
                  <span>{t('faq.q2.question')}</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-400">
                  {t('faq.q2.answer')}
                </p>
              </details>

              <details className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-6 hover:border-rsk-orange transition-colors group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-light flex items-center justify-between">
                  <span>{t('faq.q3.question')}</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-400">
                  {t('faq.q3.answer')}
                </p>
              </details>

              <details className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-6 hover:border-rsk-orange transition-colors group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-light flex items-center justify-between">
                  <span>{t('faq.q4.question')}</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-400">
                  {t('faq.q4.answer')}
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
