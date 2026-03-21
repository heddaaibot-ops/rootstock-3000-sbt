'use client';

import React, { useState } from 'react';

// 平台数据 - 完全来自原版
const platforms = [
  // 用 BTC 获取
  {
    name: 'Boltz',
    description: '非托管比特币桥，可在不同比特币层（如 Rootstock 和闪电网络）之间交换',
    url: 'https://boltz.exchange/?sendAsset=LN&receiveAsset=RBTC',
    category: 'btc',
    type: '闪电网络桥',
    featured: true,
  },
  {
    name: 'PowPeg',
    description: '使用 BTC 获取 rBTC 最直接和原生的机制',
    url: 'https://powpeg.rootstock.io/',
    category: 'btc',
    type: '官方双向锚定桥',
    featured: true,
  },
  // 跨链资产获取
  {
    name: 'Jumper',
    description: '真正的多链交易所。汇集最好的桥接、交换、入金服务',
    url: 'https://jumper.exchange/es/',
    category: 'crypto',
    type: '多链聚合器',
    featured: true,
  },
  {
    name: 'Sushi Swap',
    description: '社区驱动的去中心化交易所（DEX），面向交易者和流动性提供者',
    url: 'https://www.sushi.com/rootstock/swap',
    category: 'crypto',
    type: 'DEX',
  },
  {
    name: 'Orbiter',
    description: '去中心化跨 Rollup 桥，作为 Layer 2 的基础设施',
    url: 'https://www.orbiter.finance/',
    category: 'crypto',
    type: '跨 Rollup 桥',
  },
  {
    name: 'OKU',
    description: '在每个 EVM 链上获得所有 DEX 交换的最佳汇率',
    url: 'https://oku.trade/',
    category: 'crypto',
    type: 'DEX 聚合器',
  },
  {
    name: 'Symbiosis',
    description: '跨链 AMM DEX，汇集来自不同网络的流动性：L1 和 L2、EVM 和非 EVM',
    url: 'https://symbiosis.finance/',
    category: 'crypto',
    type: '跨链 DEX',
  },
  {
    name: 'SmolRefuel',
    description: '快速交换您需要的东西——SmolRefuel 为您提供足够的原生代币以保持运行',
    url: 'https://smolrefuel.com/?outboundChain=30',
    category: 'crypto',
    type: 'Gas 加油站',
  },
  {
    name: 'Gas.Zip',
    description: '最快的一站式 gas 加油桥，支持 200+ 链。用户可以通过单个入站交易立即桥接到多个目标区块链',
    url: 'https://www.gas.zip/',
    category: 'crypto',
    type: '多链 Gas 桥',
  },
];

const wallets = [
  { name: 'MetaMask', url: 'https://metamask.io/download/', recommended: true },
  { name: 'Ledger', url: 'https://www.ledger.com/' },
  { name: 'Trezor', url: 'https://trezor.io/' },
  { name: 'Edge', url: 'https://edge.app/' },
  { name: 'Enkrypt', url: 'https://www.enkrypt.com/' },
  { name: 'Exodus', url: 'https://www.exodus.com/' },
  { name: 'Gnosis Safe', url: 'https://safe.rootstock.io/' },
  { name: 'MyCrypto', url: 'https://mycrypto.com/' },
  { name: 'Rabby', url: 'https://rabby.io/' },
  { name: 'SafePal', url: 'https://www.safepal.com/en/' },
  { name: 'Temple', url: 'https://www.templewallet.com/' },
];

const networkConfig = {
  networkName: 'Rootstock Mainnet',
  rpcUrl: 'https://public-node.rsk.co/',
  chainId: '30',
  symbol: 'RBTC',
  blockExplorer: 'https://explorer.rootstock.io/',
};

const faqs = [
  {
    question: '什么是 rBTC？',
    answer: 'rBTC（Real Bitcoin）是 Rootstock（RSK）区块链的原生加密货币。它与比特币（BTC）1:1 锚定，意味着每个 rBTC 都由等量的 BTC 支持。rBTC 用于支付交易费、执行智能合约以及与 Rootstock 生态系统中的去中心化应用（dApps）交互。',
  },
  {
    question: '哪些钱包支持 rBTC？',
    answer: '多个流行钱包支持 rBTC，包括 MetaMask、Ledger、Trezor 和 MyCrypto 等。这些钱包允许您无缝存储、发送和接收 rBTC。要将 rBTC 添加到钱包中，您可能需要手动添加 Rootstock 网络或将 rBTC 作为自定义代币导入。',
  },
  {
    question: 'rBTC 如何保证安全？',
    answer: 'rBTC 通过与比特币的双向锚定机制保护，并由 BTC 1:1 支持。Rootstock 网络通过使用合并挖矿来利用比特币强大的工作量证明安全性，矿工同时保护比特币和 Rootstock。这使 rBTC 成为 DeFi 领域最安全的资产之一，因为它受益于保护比特币网络的巨大算力。',
  },
  {
    question: '双向锚定机制如何工作？',
    answer: '双向锚定机制允许用户将 BTC 转换为 rBTC，反之亦然，保持 1:1 锚定。当您在锚定中锁定 BTC 时，会在 Rootstock 网络上铸造等量的 rBTC。这一机制由比特币的工作量证明保护，确保每个 rBTC 都完全由比特币支持。该过程是去中心化的，由联邦节点系统管理锚定。',
  },
  {
    question: '将 BTC 转换为 rBTC 涉及哪些费用？',
    answer: '将 BTC 转换为 rBTC 涉及比特币和 Rootstock 网络的交易费。这些费用通常包括比特币网络交易费和 Rootstock 端的最低网络费。某些转换方法（如使用 FastBTC）可能还包括少量服务费。请务必检查您使用的具体平台或服务以获取最准确的费用信息。',
  },
  {
    question: 'rBTC 交易速度有多快？',
    answer: '由于 Rootstock 的出块时间比比特币快，Rootstock 网络上的 rBTC 交易通常在 30 秒到 1 分钟内确认。这使 rBTC 非常适合在交易速度至关重要的 DeFi 应用中使用。但是，实际确认时间可能因网络拥堵和支付的费用而异。',
  },
  {
    question: '在哪里可以使用 rBTC？',
    answer: 'rBTC 可在 Rootstock 生态系统内的广泛 DeFi 平台和 dApps 中使用。这包括在 Sovryn、Money on Chain 和 Tropykus 等平台上进行借贷、质押和交易。此外，您可以使用 rBTC 支付交易费并与智能合约交互。',
  },
];

export default function RBTCGuidePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'btc' | 'crypto'>('crypto');
  const [showSetup, setShowSetup] = useState(false);
  const [copiedField, setCopiedField] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const btcPlatforms = platforms.filter(p => p.category === 'btc');
  const cryptoPlatforms = platforms.filter(p => p.category === 'crypto');
  const currentPlatforms = activeTab === 'btc' ? btcPlatforms : cryptoPlatforms;

  return (
    <div className="min-h-screen bg-rsk-cream">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-rsk-cream border-b-4 border-rsk-orange">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold text-rsk-orange">Rootstock</div>
              <div className="hidden md:block text-base font-semibold text-rsk-text-dark">
                rBTC 获取指南
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('about')} className="text-rsk-text-dark hover:text-rsk-orange font-medium transition-colors">
                什么是 rBTC
              </button>
              <button onClick={() => scrollToSection('get-rbtc')} className="text-rsk-text-dark hover:text-rsk-orange font-medium transition-colors">
                获取方式
              </button>
              <button onClick={() => scrollToSection('wallet')} className="text-rsk-text-dark hover:text-rsk-orange font-medium transition-colors">
                钱包设置
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-rsk-text-dark hover:text-rsk-orange font-medium transition-colors">
                FAQ
              </button>
            </nav>
            <button onClick={() => scrollToSection('get-rbtc')} className="bg-rsk-orange hover:bg-[#FFA726] text-white font-bold px-6 py-2 transition-colors">
              开始获取
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-rsk-cream pt-16">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-rsk-text-dark mb-6">
              轻松获取 <span className="text-rsk-orange">rBTC</span>
            </h1>
            <p className="text-lg md:text-xl text-rsk-pink mb-4">比特币 DeFi 的钥匙</p>
            <p className="text-base text-rsk-text-dark max-w-2xl mx-auto mb-12">
              rBTC 与比特币 1:1 锚定，由比特币算力保护。
              在 Rootstock 上使用 rBTC 参与 DeFi、执行智能合约，享受比特币级别的安全性
            </p>
            <button onClick={() => scrollToSection('get-rbtc')} className="bg-rsk-orange hover:bg-[#FFA726] text-rsk-cream font-bold px-10 py-3 text-lg transition-colors uppercase">
              开始获取 rBTC →
            </button>
            <div className="mt-16 animate-bounce">
              <svg className="w-6 h-6 mx-auto text-rsk-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
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
              <div className="bg-rsk-cream p-8">
                <h3 className="text-lg font-bold text-rsk-text-dark mb-3 uppercase">比特币算力保护</h3>
                <p className="text-rsk-text-dark">通过合并挖矿，由 80% 的比特币算力保护，确保网络安全</p>
              </div>
              <div className="bg-rsk-cream p-8">
                <h3 className="text-lg font-bold text-rsk-text-dark mb-3 uppercase">PowPeg 1:1 锚定</h3>
                <p className="text-rsk-text-dark">通过 PowPeg（最安全的比特币桥）与 BTC 保持 1:1 锚定</p>
              </div>
              <div className="bg-rsk-cream p-8">
                <h3 className="text-lg font-bold text-rsk-text-dark mb-3 uppercase">无需许可访问 DeFi</h3>
                <p className="text-rsk-text-dark">在 Rootstock 上访问 200+ DeFi 应用和协议</p>
              </div>
            </div>
          </div>
        </section>

        {/* Get rBTC Section */}
        <section id="get-rbtc" className="py-20 bg-rsk-cream">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="inline-block bg-rsk-pink text-rsk-cream text-2xl md:text-3xl font-bold px-6 py-3 uppercase">
                如何获取 rBTC
              </h2>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => setActiveTab('crypto')}
                className={`px-6 py-3 font-bold text-base uppercase transition-colors ${
                  activeTab === 'crypto' ? 'bg-rsk-purple text-rsk-cream' : 'bg-white text-rsk-text-dark'
                }`}
              >
                跨链资产获取
              </button>
              <button
                onClick={() => setActiveTab('btc')}
                className={`px-6 py-3 font-bold text-base uppercase transition-colors ${
                  activeTab === 'btc' ? 'bg-rsk-orange text-rsk-cream' : 'bg-white text-rsk-text-dark'
                }`}
              >
                用 BTC 获取
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPlatforms.map((platform) => (
                <div key={platform.name} className="bg-white p-6 hover:bg-rsk-cream transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-rsk-text-dark uppercase">{platform.name}</h3>
                    {platform.featured && <span className="text-xl">⭐️</span>}
                  </div>
                  <span className="inline-block bg-rsk-green text-rsk-cream text-sm font-semibold px-3 py-1 mb-3 uppercase">
                    {platform.type}
                  </span>
                  <p className="text-rsk-text-dark mb-4">{platform.description}</p>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-rsk-orange hover:bg-[#FFA726] text-rsk-cream font-bold py-3 text-center uppercase transition-colors"
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
              <h3 className="text-xl font-bold text-rsk-text-dark mb-6 uppercase">支持的钱包</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {wallets.map((wallet) => (
                  <a
                    key={wallet.name}
                    href={wallet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-rsk-cream p-4 text-center hover:bg-white transition-colors"
                  >
                    <div className="font-bold">{wallet.name}</div>
                    {wallet.recommended && (
                      <span className="text-xs bg-rsk-orange text-rsk-cream px-2 py-1 uppercase">推荐</span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-rsk-cream p-8">
              <button
                onClick={() => setShowSetup(!showSetup)}
                className="w-full bg-rsk-orange text-rsk-cream font-bold py-3 px-6 text-lg mb-4 uppercase"
              >
                {showSetup ? '隐藏' : '显示'} MetaMask 设置教程 ↓
              </button>

              {showSetup && (
                <div className="mt-6 space-y-6">
                  <div className="bg-white p-6">
                    <h4 className="font-bold text-lg mb-4">网络参数（点击复制）</h4>
                    <div className="space-y-3">
                      {Object.entries(networkConfig).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center bg-gray-50 p-3">
                          <span className="font-semibold">{key}:</span>
                          <button
                            onClick={() => copyToClipboard(value, key)}
                            className="text-rsk-orange hover:underline font-mono"
                          >
                            {value} {copiedField === key && <span className="text-rsk-green font-bold ml-2">已复制</span>}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-6">
                    <p className="text-rsk-text-dark">
                      <strong>截图占位符：</strong>这里将添加 MetaMask 设置步骤的详细截图
                    </p>
                  </div>
                </div>
              )}
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
                <div key={index} className="bg-white">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left font-bold text-base text-rsk-text-dark hover:bg-rsk-cream flex justify-between items-center transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-rsk-orange text-xl">{openFaqIndex === index ? '−' : '+'}</span>
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 py-4 bg-rsk-cream">
                      <p className="text-rsk-text-dark leading-relaxed">{faq.answer}</p>
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
        </section>

        {/* Back to SBT */}
        <section className="py-12 bg-white text-center">
          <div className="container mx-auto px-4">
            <p className="text-lg text-rsk-text-dark mb-6 font-semibold">
              已经有 rBTC 了？
            </p>
            <a
              href="/"
              className="inline-block bg-rsk-orange hover:bg-[#FFA726] text-rsk-cream font-bold px-10 py-3 text-lg transition-colors uppercase"
            >
              返回铸造 SBT →
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
