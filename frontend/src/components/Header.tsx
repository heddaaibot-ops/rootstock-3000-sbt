'use client';

import React from 'react';
import { ConnectKitButton } from 'connectkit';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-rsk-cream/95 backdrop-blur-lg border-b border-rsk-orange/20 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-start leading-tight">
              <div
                className="h-8 mb-1"
                style={{
                  width: '120px',
                  backgroundColor: '#FF9100',
                  WebkitMaskImage: 'url(/images/figma/rootstock-logo.png)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'left center',
                  maskImage: 'url(/images/figma/rootstock-logo.png)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'left center'
                }}
              />
              <div className="text-lg font-bold text-rsk-text-dark">
                爱你 3000<span className="hidden md:inline"> | 纪念 3000 天</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a
              href="#about"
              className="text-rsk-text-dark hover:text-rsk-orange transition-colors uppercase"
            >
              关于
            </a>
            <a
              href="#mint"
              className="text-rsk-text-dark hover:text-rsk-orange transition-colors uppercase"
            >
              铸造
            </a>
            <a
              href="https://rootstock.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rsk-text-dark hover:text-rsk-orange transition-colors flex items-center gap-1 uppercase"
            >
              <span>Rootstock 官网</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </nav>

          {/* Connect Wallet */}
          <div className="flex items-center gap-4">
            <ConnectKitButton />
          </div>
        </div>
      </div>
    </header>
  );
};
