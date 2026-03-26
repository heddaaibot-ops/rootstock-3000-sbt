'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProgressBar } from '@/components/ProgressBar';
import { MintButton } from '@/components/MintButton';
import { CampaignInfo } from '@/components/CampaignInfo';
import { BridgeModal } from '@/components/BridgeModal';
import { NetworkGuide } from '@/components/NetworkGuide';
import { useContract } from '@/hooks/useContract';
import { useAutoAddNetwork } from '@/hooks/useAutoAddNetwork';
import { useI18n } from '@/i18n/provider';

export default function Home() {
  const { chainId, isConnected, connector } = useAccount();
  const { contractData, loading, error, refresh, mint } = useContract();
  const { t } = useI18n();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isBridgeModalOpen, setIsBridgeModalOpen] = useState(false);
  const [isBinanceWallet, setIsBinanceWallet] = useState(false);

  // 🟡 自动为币安钱包添加 Rootstock 网络
  useAutoAddNetwork();

  // 🔵 检测 URL 参数，自动打开跨链桥弹窗
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('bridge') === 'true') {
        setIsBridgeModalOpen(true);
        // 清除 URL 参数，避免刷新后重复打开
        window.history.replaceState({}, '', '/');
      }
    }
  }, []);

  // 🟡 检测是否为币安钱包
  useEffect(() => {
    if (isConnected && typeof window !== 'undefined') {
      const isBinance =
        window.ethereum?.isBinance ||
        window.BinanceChain ||
        connector?.name?.toLowerCase().includes('binance') ||
        false;
      setIsBinanceWallet(isBinance);
    } else {
      setIsBinanceWallet(false);
    }
  }, [isConnected, connector]);

  return (
    <div className="min-h-screen flex flex-col bg-rsk-cream relative overflow-hidden">

      {/* 主要内容 - 提升 z-index */}
      <div className="relative z-10">
        <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-rsk-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* 左侧：文字内容 */}
                <div className="text-center lg:text-left">
                  {/* Rootstock Logo + Title */}
                  <div className="flex flex-col items-center lg:items-start mb-6 gap-4">
                    <div
                      className="h-20 md:h-28 w-64 md:w-96"
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
                    <h1 className="text-4xl md:text-5xl font-bold uppercase leading-tight">
                      <div className="inline-block bg-rsk-pink text-white px-8 py-4 border-3 border-rsk-border-dark">爱你 3000</div>
                    </h1>
                  </div>

                  <p className="text-xl md:text-2xl text-rsk-text-dark/80 mb-4 leading-relaxed font-bold">
                    {t('hero.subtitle')}
                  </p>

                  <div className="text-sm md:text-base text-rsk-text-dark/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    <p className="mb-2">这个纪念灵魂绑定代币庆祝这一里程碑，并向所有参与这一旅程的人致敬</p>
                    <p>通过铸造此 SBT，你将永久成为 Rootstock 历史的一部分</p>
                  </div>
                </div>

                {/* 右侧：几何插画 */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-md">
                    <img
                      src="/images/geometric-illustration.png"
                      alt="Rootstock Geometric Illustration"
                      className="w-full h-auto animate-float"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mint Section */}
        <section id="mint" className="relative py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* 标题 */}
              <div className="text-center mb-12">
                <h2 className="inline-block bg-rsk-orange text-rsk-cream text-2xl md:text-3xl font-bold px-6 py-3 uppercase">
                  免费铸造 SBT
                </h2>
              </div>

              {/* SBT 预览 */}
              <div className="mb-12">
                <div className="max-w-2xl mx-auto">
                  <div className="bg-rsk-cream border-3 border-rsk-border-dark rounded-xl p-10 hover:border-rsk-orange transition-all">
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

              {/* 铸造进度 */}
              <div className="mb-12">
                <h3 className="inline-block bg-rsk-lime text-rsk-text-dark text-lg md:text-xl font-bold px-5 py-2 uppercase mb-6">
                  铸造进度
                </h3>
                {error ? (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center">
                    <h3 className="text-xl font-bold text-red-500 mb-2">{t('mint.error.failedToLoad')}</h3>
                    <p className="text-rsk-text/70 mb-6">{error}</p>
                    <button
                      onClick={refresh}
                      className="px-6 py-3 bg-rsk-orange hover:bg-[#FFA726] rounded-xl font-bold transition-colors"
                    >
                      {t('mint.error.retryButton')}
                    </button>
                  </div>
                ) : (
                  <ProgressBar
                    current={contractData?.totalSupply ?? 0n}
                    total={contractData?.maxSupply ?? 10000n}
                    loading={loading || !contractData}
                  />
                )}
              </div>

              {/* 铸造按钮 */}
              <div className="mb-6">
                <MintButton
                  isPaused={contractData?.isPaused ?? true}
                  hasUserMinted={contractData?.hasUserMinted ?? false}
                  onMint={mint}
                  chainId={chainId}
                />
              </div>

              {/* 币安钱包用户重要提示 - 只在连接币安钱包时显示 */}
              {isBinanceWallet && (
                <div className="mb-12 bg-yellow-50 border-3 border-yellow-500 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">⚠️</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-yellow-700 mb-3">
                        币安钱包用户必读
                      </h3>
                      <div className="bg-white rounded-lg p-4 mb-3">
                        <p className="text-sm text-rsk-text-dark font-semibold mb-2">
                          ⚠️ <strong>币安钱包移动端 Gas 估算问题</strong>
                        </p>
                        <p className="text-sm text-rsk-text-dark/80 leading-relaxed mb-2">
                          币安钱包移动端会过度估算 Gas 费用，显示需要 <span className="font-mono text-red-600">0.00003+ RBTC</span>，但实际只需 <span className="font-mono text-green-600">0.000005 RBTC</span>。
                        </p>
                        <p className="text-sm text-rsk-text-dark/80 leading-relaxed">
                          如果你的余额 ≥ <strong>0.000005 RBTC</strong> 但仍提示余额不足，这是币安钱包的内部估算机制导致的。
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 border-2 border-green-400">
                        <p className="text-sm font-bold text-green-700 mb-2">
                          ✅ 解决方案：充值更多 RBTC
                        </p>
                        <p className="text-sm text-rsk-text-dark/80 leading-relaxed mb-3">
                          由于币安钱包的估算机制，建议充值至少 <span className="font-mono font-bold text-green-700">0.0001 RBTC</span> 以确保交易顺利进行。
                        </p>
                        <button
                          onClick={() => setIsBridgeModalOpen(true)}
                          className="w-full bg-rsk-pink hover:bg-[#FF85E8] text-white font-bold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 uppercase"
                        >
                          🚀 使用 10 秒跨链桥充值
                        </button>
                        <p className="text-xs text-green-700 mt-3 font-semibold">
                          💡 通过跨链桥充值 1 USDC 可获得约 0.000014 RBTC，足够完成铸造
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 获取 rBTC 链接 */}
              <div className="mb-12 bg-rsk-cream p-8 rounded-xl text-center">
                <p className="text-rsk-text-dark mb-6 text-lg font-semibold">
                  需要 rBTC 来支付 Gas 费？
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => setIsBridgeModalOpen(true)}
                    className="inline-block bg-rsk-pink hover:bg-[#FF85E8] text-white font-bold px-10 py-3 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span className="text-lg uppercase">10 秒跨链</span>
                    <span className="text-sm font-bold text-rsk-text-dark ml-2">⭐️推荐</span>
                  </button>
                  <a
                    href="/rbtc"
                    className="inline-block bg-rsk-purple hover:bg-[#B088FF] text-rsk-cream font-bold px-10 py-3 transition-colors uppercase text-lg"
                  >
                    获取 rBTC 指南 →
                  </a>
                </div>
                <p className="text-sm text-rsk-text-dark/70 mt-4 italic leading-relaxed">
                  💡 使用快速跨链：发送 1 USDC，收到约 0.000014 rBTC<br />
                  * 支持 Arbitrum / Base / Ethereum 链
                </p>
              </div>

              {/* 项目数据 */}
              <div>
                <h3 className="inline-block bg-rsk-lime text-rsk-text-dark text-lg md:text-xl font-bold px-5 py-2 uppercase mb-6">
                  项目数据
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Stat 1 */}
                  <div className="bg-rsk-cream p-6 hover:bg-white transition-colors text-center">
                    <div className="text-sm font-semibold text-rsk-text-dark mb-2 uppercase">
                      {t('mint.stats.launchDate')}
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-rsk-orange font-mono">
                      2018
                    </div>
                    <div className="text-xs text-rsk-text-dark mt-2 font-medium">年</div>
                  </div>

                  {/* Stat 2 */}
                  <div className="bg-rsk-cream p-6 hover:bg-white transition-colors text-center">
                    <div className="text-sm font-semibold text-rsk-text-dark mb-2 uppercase">天数</div>
                    <div className="text-4xl md:text-5xl font-bold text-rsk-orange font-mono">
                      3000
                    </div>
                    <div className="text-xs text-rsk-text-dark mt-2 font-medium">天</div>
                  </div>

                  {/* Stat 3 */}
                  <div className="bg-rsk-cream p-6 hover:bg-white transition-colors text-center">
                    <div className="text-sm font-semibold text-rsk-text-dark mb-2 uppercase">
                      {t('mint.stats.chainId')}
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-rsk-orange font-mono">
                      {chainId || 30}
                    </div>
                    <div className="text-xs text-rsk-text-dark mt-2 font-medium">ID</div>
                  </div>

                  {/* Stat 4 */}
                  <div className="bg-rsk-cream p-6 hover:bg-white transition-colors text-center">
                    <div className="text-sm font-semibold text-rsk-text-dark mb-2 uppercase">
                      {t('mint.stats.status')}
                    </div>
                    <div className="text-4xl font-bold text-rsk-orange font-mono">
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
            </div>
          </div>
        </section>

        {/* Campaign Info Section */}
        <section className="relative pt-20 pb-12 bg-white">
          <div className="container mx-auto px-4">
            <CampaignInfo />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative pt-20 pb-6 bg-rsk-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* 标题 */}
              <div className="text-center mb-6">
                <h2 className="inline-block bg-rsk-lime text-rsk-text-dark text-2xl font-bold px-6 py-3 uppercase">
                  SBT 特性
                </h2>
              </div>

              {/* 三个特性卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 01 - Soul Bound */}
                <div className="bg-white border-3 border-rsk-border-dark p-8 hover:bg-rsk-cream transition-all relative flex flex-col">
                  <div className="mb-6">
                    <div className="inline-block bg-rsk-orange px-6 py-3">
                      <h3 className="text-lg font-bold text-white leading-tight uppercase">{t('about.soulBound.title')}</h3>
                    </div>
                    <div className="inline-block bg-rsk-lime px-4 py-1 ml-2">
                      <span className="text-sm font-bold text-rsk-text-dark">01</span>
                    </div>
                  </div>
                  <p className="text-rsk-text-dark leading-relaxed text-base flex-grow">
                    {t('about.soulBound.description')}
                  </p>
                </div>

                {/* Card 02 - Free Mint */}
                <div className="bg-white border-3 border-rsk-border-dark p-8 hover:bg-rsk-cream transition-all relative flex flex-col">
                  <div className="mb-6">
                    <div className="inline-block bg-rsk-orange px-6 py-3">
                      <h3 className="text-lg font-bold text-white leading-tight uppercase">{t('about.freeMint.title')}</h3>
                    </div>
                    <div className="inline-block bg-rsk-lime px-4 py-1 ml-2">
                      <span className="text-sm font-bold text-rsk-text-dark">02</span>
                    </div>
                  </div>
                  <p className="text-rsk-text-dark leading-relaxed text-base flex-grow">
                    {t('about.freeMint.description')}
                  </p>
                </div>

                {/* Card 03 - Limited Supply */}
                <div className="bg-white border-3 border-rsk-border-dark p-8 hover:bg-rsk-cream transition-all relative flex flex-col">
                  <div className="mb-6">
                    <div className="inline-block bg-rsk-orange px-6 py-3">
                      <h3 className="text-lg font-bold text-white leading-tight uppercase">{t('about.limitedSupply.title')}</h3>
                    </div>
                    <div className="inline-block bg-rsk-lime px-4 py-1 ml-2">
                      <span className="text-sm font-bold text-rsk-text-dark">03</span>
                    </div>
                  </div>
                  <p className="text-rsk-text-dark leading-relaxed text-base flex-grow">
                    {t('about.limitedSupply.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="inline-block bg-rsk-green text-rsk-cream text-2xl font-bold px-6 py-3 uppercase">
                  {t('faq.title')}
                </h2>
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="bg-rsk-cream rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full px-6 py-5 text-left font-bold text-base md:text-lg text-rsk-text-dark hover:bg-white flex justify-between items-center transition-colors uppercase"
                    >
                      <span className="flex items-center gap-3">
                        <span className="inline-block bg-rsk-orange rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">Q</span>
                        {t(`faq.q${index}.question`)}
                      </span>
                      <span className="text-rsk-orange text-3xl font-bold leading-none flex-shrink-0 ml-4">
                        {openFaqIndex === index ? '−' : '+'}
                      </span>
                    </button>
                    {openFaqIndex === index && (
                      <div className="px-6 py-5 bg-white border-t-3 border-rsk-orange">
                        <p className="text-rsk-text-dark leading-relaxed text-base ml-11">
                          {t(`faq.q${index}.answer`)}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <p className="text-base text-rsk-text-dark mb-4 font-semibold">还有其他问题？</p>
                <a
                  href="https://t.me/rootstockCNchat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-rsk-purple text-rsk-cream font-bold px-6 py-2 hover:bg-[#B088FF] transition-colors uppercase"
                >
                  在 RootstockCN 提问 →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      </div>

      {/* 跨链桥彈窗 */}
      <BridgeModal
        isOpen={isBridgeModalOpen}
        onClose={() => setIsBridgeModalOpen(false)}
      />
    </div>
  );
}
