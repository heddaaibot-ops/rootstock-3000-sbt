'use client';

import React from 'react';
import { useI18n } from '@/i18n/provider';

export const RootstockIntro: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="w-full">
      <div className="bg-rsk-gray/50 border-2 border-rsk-dark rounded-2xl p-8 md:p-12 hover:shadow-lg hover:shadow-rsk-dark/20 transition-all">
        <h2 className="text-3xl md:text-4xl font-bold text-rsk-orange mb-6">
          {t('rootstock.title')}
        </h2>

        <div className="space-y-6 text-rsk-text/70 leading-relaxed">
          <p>{t('rootstock.paragraph1')}</p>
          <p>{t('rootstock.paragraph2')}</p>
          <p>{t('rootstock.paragraph3')}</p>

          <p className="text-rsk-orange font-semibold text-lg">
            {t('rootstock.closing')}
          </p>
        </div>
      </div>
    </div>
  );
};
