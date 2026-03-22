'use client';

import React from 'react';
import { useI18n } from '@/i18n/provider';

export const RootstockIntro: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="w-full">
      <div className="bg-rsk-offwhite border-3 border-rsk-border-dark rounded-xl p-8 md:p-12 hover:border-rsk-orange transition-all">
        <h2 className="text-3xl md:text-4xl font-bold text-rsk-orange mb-6 uppercase">
          {t('rootstock.title')}
        </h2>

        <div className="space-y-8 text-rsk-text-dark leading-relaxed text-base">
          <p className="text-lg leading-relaxed">
            {t('rootstock.description')}
          </p>

          <div className="pt-4 border-t-2 border-rsk-orange/30">
            <h3 className="text-xl font-bold text-rsk-orange mb-6 uppercase">
              {t('rootstock.links.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href={t('rootstock.links.cnCommunity.url')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-rsk-cream hover:bg-white border-2 border-rsk-border-dark hover:border-rsk-pink px-6 py-4 transition-all font-bold text-rsk-text-dark uppercase"
              >
                <span>💬</span>
                <span>{t('rootstock.links.cnCommunity.label')}</span>
              </a>
              <a
                href={t('rootstock.links.cnTwitter.url')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-rsk-cream hover:bg-white border-2 border-rsk-border-dark hover:border-rsk-cyan px-6 py-4 transition-all font-bold text-rsk-text-dark uppercase"
              >
                <span>🐦</span>
                <span>{t('rootstock.links.cnTwitter.label')}</span>
              </a>
              <a
                href={t('rootstock.links.enTwitter.url')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-rsk-cream hover:bg-white border-2 border-rsk-border-dark hover:border-rsk-purple px-6 py-4 transition-all font-bold text-rsk-text-dark uppercase"
              >
                <span>🌐</span>
                <span>{t('rootstock.links.enTwitter.label')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
