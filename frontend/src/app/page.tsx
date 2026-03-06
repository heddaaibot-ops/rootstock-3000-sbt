'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Countdown } from '@/components/Countdown';
import { ProgressBar } from '@/components/ProgressBar';
import { MintButton } from '@/components/MintButton';
import { useContract } from '@/hooks/useContract';

export default function Home() {
  const { chainId } = useAccount();
  const { contractData, loading, mint } = useContract();

  return (
    <div className="min-h-screen flex flex-col bg-rsk-dark">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-rsk-orange">Rootstock</span>{' '}
              <span className="text-rsk-light">3000 Days</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-4">
              Commemorating 3000 Days of Bitcoin-Powered Smart Contracts
            </p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Claim your Soul Bound Token to be part of this historic milestone.
              This non-transferable NFT marks your participation in Rootstock's journey.
            </p>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="container mx-auto px-4 py-12">
          {contractData && (
            <Countdown milestoneTimestamp={Number(contractData.milestoneDate)} />
          )}
        </section>

        {/* About Section */}
        <section id="about" className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-rsk-gray border border-rsk-orange/30 rounded-2xl p-6 text-center hover:border-rsk-orange transition-colors">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-lg font-bold text-rsk-light mb-2">Soul Bound</h3>
                <p className="text-sm text-gray-400">
                  Non-transferable and permanently bound to your wallet
                </p>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/30 rounded-2xl p-6 text-center hover:border-rsk-orange transition-colors">
                <div className="text-4xl mb-4">🆓</div>
                <h3 className="text-lg font-bold text-rsk-light mb-2">Free Mint</h3>
                <p className="text-sm text-gray-400">
                  Only pay network gas fees, no minting cost
                </p>
              </div>

              <div className="bg-rsk-gray border border-rsk-orange/30 rounded-2xl p-6 text-center hover:border-rsk-orange transition-colors">
                <div className="text-4xl mb-4">🎟️</div>
                <h3 className="text-lg font-bold text-rsk-light mb-2">Limited Supply</h3>
                <p className="text-sm text-gray-400">
                  Only 100,000 tokens available, one per wallet
                </p>
              </div>
            </div>

            <div className="bg-rsk-gray/50 border border-rsk-orange/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-rsk-orange mb-6">What is Rootstock?</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Rootstock (RSK) is the most secure smart contract platform in the world,
                  secured by the Bitcoin network's immense hashpower. Launched on{' '}
                  <span className="text-rsk-orange font-semibold">January 16, 2018</span>,
                  Rootstock has been pioneering Bitcoin DeFi for over 3000 days.
                </p>
                <p>
                  This commemorative Soul Bound Token celebrates this milestone and honors
                  everyone who has been part of this journey. By minting this SBT, you become
                  a permanent part of Rootstock's history.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mint Section */}
        <section id="mint" className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-rsk-orange">Mint</span>{' '}
              <span className="text-rsk-light">Progress</span>
            </h2>

            {/* Progress Bar */}
            <div className="mb-16">
              {loading || !contractData ? (
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
              {contractData && (
                <MintButton
                  isPaused={contractData.isPaused}
                  hasUserMinted={contractData.hasUserMinted}
                  onMint={mint}
                  chainId={chainId}
                />
              )}
            </div>

            {/* Stats Grid */}
            {contractData && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Launch Date</div>
                  <div className="text-lg font-bold text-rsk-light font-mono">
                    Jan 16, 2018
                  </div>
                </div>

                <div className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Milestone Date</div>
                  <div className="text-lg font-bold text-rsk-orange font-mono">
                    Apr 4, 2026
                  </div>
                </div>

                <div className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Chain ID</div>
                  <div className="text-lg font-bold text-rsk-light font-mono">
                    {chainId || 31}
                  </div>
                </div>

                <div className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Status</div>
                  <div className="text-lg font-bold text-rsk-light">
                    {contractData.isPaused ? (
                      <span className="text-yellow-500">⏸️ Paused</span>
                    ) : (
                      <span className="text-green-500">▶️ Live</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-rsk-orange">FAQ</span>
            </h2>

            <div className="space-y-4">
              <details className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-6 hover:border-rsk-orange transition-colors group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-light flex items-center justify-between">
                  <span>What is a Soul Bound Token?</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-400">
                  A Soul Bound Token (SBT) is a non-transferable NFT that is permanently bound to your wallet address.
                  It cannot be sold, transferred, or given away. It serves as a permanent proof of participation.
                </p>
              </details>

              <details className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-6 hover:border-rsk-orange transition-colors group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-light flex items-center justify-between">
                  <span>How much does it cost to mint?</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-400">
                  Minting is completely free! You only need to pay the network gas fee, which is typically very low on Rootstock.
                  The gas fee goes to the network validators, not to us.
                </p>
              </details>

              <details className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-6 hover:border-rsk-orange transition-colors group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-light flex items-center justify-between">
                  <span>Can I mint more than one?</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-400">
                  No, each wallet address can only mint one SBT. This ensures fair distribution and maintains the commemorative nature of the token.
                </p>
              </details>

              <details className="bg-rsk-gray border border-rsk-orange/30 rounded-xl p-6 hover:border-rsk-orange transition-colors group">
                <summary className="cursor-pointer text-lg font-bold text-rsk-light flex items-center justify-between">
                  <span>What network should I use?</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-400">
                  You need to connect to the Rootstock network (Chain ID 30 for mainnet, or 31 for testnet).
                  Make sure your wallet is configured with the correct network before minting.
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
