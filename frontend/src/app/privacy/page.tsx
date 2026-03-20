'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-rsk-cream">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-rsk-offwhite border-3 border-rsk-border-dark p-8 md:p-12">
            <div className="mb-4">
              <h1 className="inline-block bg-rsk-purple text-rsk-cream text-4xl font-bold px-8 py-4 uppercase">
                隐私政策
              </h1>
            </div>
            <p className="text-rsk-text-dark/60 mb-8">最后更新：2026年3月16日</p>

            <div className="prose max-w-none space-y-6 text-rsk-text-dark">
              <p>
                本隐私政策描述了 RootstockLabs Limited 如何收集、使用和保护您的个人信息。
              </p>

              <div className="bg-rsk-orange/10 border border-rsk-orange/30 rounded-xl p-6 my-8">
                <p className="text-rsk-orange font-semibold mb-2">
                  📝 内容待更新
                </p>
                <p className="text-rsk-text-dark/60 text-sm">
                  隐私政策的详细内容正在准备中，将很快更新。如有任何疑问，请联系我们。
                </p>
              </div>

              <h2 className="text-2xl font-bold text-rsk-orange mt-8 mb-4">联系我们</h2>
              <p>
                如果您对本隐私政策有任何疑问或顾虑，请通过以下方式联系我们：
              </p>
              <p className="text-rsk-orange">
                RootstockLabs Limited<br />
                地址：5-9 Main Street, Gibraltar, GX 11 1AA
              </p>
            </div>

            <div className="mt-12 pt-8 border-t-3 border-rsk-orange">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-rsk-orange hover:text-rsk-orange/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>返回首页</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
