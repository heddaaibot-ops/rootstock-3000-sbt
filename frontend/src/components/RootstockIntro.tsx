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

        <div className="space-y-6 text-rsk-text-dark leading-relaxed text-base">
          <p>{t('rootstock.paragraph1')}</p>
          <p>{t('rootstock.paragraph2')}</p>
          <p>{t('rootstock.paragraph3')}</p>

          <p className="text-rsk-orange font-bold text-lg uppercase">
            {t('rootstock.closing')}
          </p>
        </div>
      </div>
    </div>
  );
};
