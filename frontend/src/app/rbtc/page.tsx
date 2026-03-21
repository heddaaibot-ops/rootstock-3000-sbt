'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const platforms = [
  {
    name: 'Sushi Swap',
    tag: 'DEX',
    recommended: true,
    description: '社区驱动的去中心化交易所（DEX），面向交易者和流动性提供者',
    url: 'https://www.sushi.com/rootstock/swap',
  },
  {
    name: 'Jumper',
    tag: '多链聚合器',
    description: '真正的多链交易所。汇集最好的桥接、交换、入金服务',
    url: 'https://jumper.exchange/',
  },
  {
    name: 'Orbiter',
    tag: '跨 Rollup 桥',
    description: '去中心化跨 Rollup 桥，作为 Layer 2 的基础设施',
    url: 'https://www.orbiter.finance/',
  },
  {
    name: 'SmolRefuel',
    tag: 'Gas 加油站',
    description: '快速交换您需要的东西——SmolRefuel 为您提供足够的原生代币以保持运行',
    url: 'https://smolrefuel.com/?outboundChain=30',
  },
  {
    name: 'Gas.Zip',
    tag: '多链 Gas 桥',
    description: '最快的一站式 gas 加油桥，支持 200+ 链',
    url: 'https://www.gas.zip/',
  },
];

const wallets = [
  { name: 'MetaMask', url: 'https://metamask.io/download/', recommended: true },
  { name: 'Ledger', url: 'https://www.ledger.com/' },
  { name: 'Trezor', url: 'https://trezor.io/' },
  { name: 'Rabby', url: 'https://rabby.io/' },
  { name: 'SafePal', url: 'https://www.safepal.com/' },
  { name: 'Gnosis Safe', url: 'https://safe.rootstock.io/' },
];

const faqs = [
  {
    q: '什么是 rBTC？',
    a: 'rBTC（Real Bitcoin）是 Rootstock（RSK）区块链的原生加密货币。它与比特币（BTC）1:1 锚定，意味着每个 rBTC 都由等量的 BTC 支持。rBTC 用于支付交易费、执行智能合约以及与 Rootstock 生态系统中的去中心化应用（dApps）交互。',
  },
  {
    q: '哪些钱包支持 rBTC？',
    a: 'MetaMask、Ledger、Trezor、Rabby、SafePal、Gnosis Safe 等主流钱包都支持 rBTC。我们推荐使用 MetaMask，因为它易于使用且功能强大。',
  },
  {
    q: 'rBTC 如何保证安全？',
    a: '通过合并挖矿，rBTC 由 80% 的比特币算力保护，确保网络安全。同时，rBTC 通过 PowPeg（最安全的比特币桥）与 BTC 保持 1:1 锚定。',
  },
  {
    q: '在哪里可以使用 rBTC？',
    a: '在 Rootstock 上可以访问 200+ DeFi 应用和协议，包括去中心化交易所、借贷平台、稳定币项目等。rBTC 是参与 Rootstock 生态的基础代币。',
  },
];

export default function RBTCGuidePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-rsk-cream">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center bg-rsk-cream pt-24 pb-12">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-rsk-text-dark mb-6">
            轻松获取 <span className="text-rsk-orange">rBTC</span>
          </h1>
          <p className="text-lg md:text-xl text-rsk-pink mb-4 font-bold">
            比特币 DeFi 的钥匙
          </p>
          <p className="text-base text-rsk-text-dark max-w-2xl mx-auto mb-12">
            rBTC 与比特币 1:1 锚定，由比特币算力保护。
            在 Rootstock 上使用 rBTC 参与 DeFi、执行智能合约，享受比特币级别的安全性
          </p>
          <Link
            href="#get-rbtc"
            className="inline-block bg-rsk-orange hover:bg-[#FFA726] text-rsk-cream font-bold px-10 py-3 text-lg transition-colors uppercase rounded-nametag"
          >
            开始获取 rBTC →
          </Link>
        </div>
      </section>

      {/* What is rBTC */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="inline-block bg-rsk-purple text-rsk-cream text-2xl md:text-3xl font-bold px-6 py-3 uppercase">
              什么是 rBTC
            </h2>
          </div>
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-lg text-rsk-text-dark leading-relaxed">
              <strong>rBTC（Real Bitcoin）</strong>是 Rootstock（RSK）区块链的原生加密货币。
              它与比特币（BTC）<strong>1:1 锚定</strong>，意味着每个 rBTC 都由等量的 BTC 支持。
              rBTC 用于支付交易费、执行智能合约以及与 Rootstock 生态系统中的去中心化应用（dApps）交互。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-8 hover:border-rsk-orange transition-all">
              <h3 className="text-lg font-bold text-rsk-text-dark mb-3 uppercase">
                比特币算力保护
              </h3>
              <p className="text-rsk-text-dark">
                通过合并挖矿，由 80% 的比特币算力保护，确保网络安全
              </p>
            </div>
            <div className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-8 hover:border-rsk-orange transition-all">
              <h3 className="text-lg font-bold text-rsk-text-dark mb-3 uppercase">
                PowPeg 1:1 锚定
              </h3>
              <p className="text-rsk-text-dark">
                通过 PowPeg（最安全的比特币桥）与 BTC 保持 1:1 锚定
              </p>
            </div>
            <div className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-8 hover:border-rsk-orange transition-all">
              <h3 className="text-lg font-bold text-rsk-text-dark mb-3 uppercase">
                无需许可访问 DeFi
              </h3>
              <p className="text-rsk-text-dark">
                在 Rootstock 上访问 200+ DeFi 应用和协议
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get rBTC */}
      <section id="get-rbtc" className="py-20 bg-rsk-cream">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="inline-block bg-rsk-pink text-rsk-cream text-2xl md:text-3xl font-bold px-6 py-3 uppercase">
              如何获取 rBTC
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="bg-white border-3 border-rsk-border-dark rounded-xl p-6 hover:border-rsk-orange transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold text-rsk-text-dark uppercase">
                    {platform.name}
                  </h3>
                  {platform.recommended && <span className="text-xl">⭐️</span>}
                </div>
                <span className="inline-block bg-rsk-orange text-rsk-cream text-sm font-semibold px-3 py-1 mb-3 uppercase rounded-tag">
                  {platform.tag}
                </span>
                <p className="text-rsk-text-dark mb-4">{platform.description}</p>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-rsk-orange hover:bg-[#FFA726] text-rsk-cream font-bold py-3 text-center uppercase transition-colors rounded-nametag"
                >
                  访问 {platform.name} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wallets */}
      <section id="wallet" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="inline-block bg-rsk-green text-rsk-cream text-2xl md:text-3xl font-bold px-6 py-3 uppercase">
              钱包设置
            </h2>
          </div>
          <div className="mb-12">
            <h3 className="text-xl font-bold text-rsk-text-dark mb-6 uppercase">
              支持的钱包
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {wallets.map((wallet) => (
                <a
                  key={wallet.name}
                  href={wallet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-4 text-center hover:border-rsk-orange transition-all"
                >
                  <div className="font-bold text-rsk-text-dark">{wallet.name}</div>
                  {wallet.recommended && (
                    <span className="text-xs bg-rsk-orange text-rsk-cream px-2 py-1 uppercase rounded-tag inline-block mt-2">
                      推荐
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-rsk-cream">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="inline-block bg-rsk-cyan text-rsk-text-dark text-2xl md:text-3xl font-bold px-6 py-3 uppercase">
              常见问题 FAQ
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border-3 border-rsk-border-dark rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left font-bold text-base text-rsk-text-dark hover:bg-rsk-offwhite flex justify-between items-center transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-rsk-orange text-2xl">
                    {openFaqIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-4 pt-2 bg-rsk-offwhite">
                    <p className="text-rsk-text-dark">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-base text-rsk-text-dark mb-4 font-semibold">
              还有其他问题？
            </p>
            <a
              href="https://t.me/rootstockCNchat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-rsk-purple text-rsk-cream font-bold px-6 py-3 hover:bg-[#B088FF] transition-colors uppercase rounded-nametag"
            >
              在 RootstockCN 提问 →
            </a>
          </div>
        </div>
      </section>

      {/* Back to SBT */}
      <section className="py-12 bg-white text-center">
        <div className="container mx-auto px-4">
          <p className="text-lg text-rsk-text-dark mb-6 font-semibold">
            已经有 rBTC 了？
          </p>
          <Link
            href="/"
            className="inline-block bg-rsk-orange hover:bg-[#FFA726] text-rsk-cream font-bold px-10 py-3 text-lg transition-colors uppercase rounded-nametag"
          >
            返回铸造 SBT →
          </Link>
        </div>
      </section>
    </div>
  );
}
