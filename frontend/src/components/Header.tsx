'use client';

import React from 'react';
import { ConnectKitButton } from 'connectkit';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-rsk-dark/80 backdrop-blur-lg border-b border-rsk-gray">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">
              <span className="text-rsk-orange">Rootstock</span>
              <span className="text-rsk-light"> 3000</span>
            </div>
            <div className="hidden md:block text-sm text-gray-400">
              Commemorating 3000 Days
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a
              href="#about"
              className="text-gray-400 hover:text-rsk-orange transition-colors"
            >
              About
            </a>
            <a
              href="#mint"
              className="text-gray-400 hover:text-rsk-orange transition-colors"
            >
              Mint
            </a>
            <a
              href="https://rootstock.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-rsk-orange transition-colors flex items-center gap-1"
            >
              <span>Rootstock</span>
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
