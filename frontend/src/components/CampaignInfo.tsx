'use client';

import React from 'react';
import { useI18n } from '@/i18n/provider';

export const CampaignInfo: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="w-full">
      {/* 活動主題 */}
      <div className="text-center mb-12">
        <div className="inline-block bg-rsk-orange/10 border border-rsk-orange/20 rounded-2xl px-8 py-4">
          <h3 className="text-3xl font-bold text-rsk-orange mb-2">
            {t('campaign.title')}
          </h3>
          <p className="text-rsk-text/70">
            {t('campaign.subtitle')}
          </p>
        </div>
      </div>

      {/* 活動說明 */}
      <div className="bg-rsk-gray/50 border border-rsk-orange/20 rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-rsk-orange mb-6 text-center">
          {t('campaign.howToParticipate')}
        </h3>
        <div className="space-y-4 text-gray-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-rsk-orange rounded-full flex items-center justify-center font-bold text-rsk-dark">
              1
            </div>
            <div>
              <p className="font-semibold text-rsk-dark mb-1">{t('campaign.step1.title')}</p>
              <p className="text-sm text-rsk-text/70">
                {t('campaign.step1.description').split('@RootstockCN')[0]}
                <a
                  href="https://x.com/RootstockCN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rsk-orange hover:underline"
                >
                  @RootstockCN
                </a>
                {t('campaign.step1.description').includes('@RootstockCN') ? '' : t('campaign.step1.description')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-rsk-orange rounded-full flex items-center justify-center font-bold text-rsk-dark">
              2
            </div>
            <div>
              <p className="font-semibold text-rsk-dark mb-1">{t('campaign.step2.title')}</p>
              <p className="text-sm text-rsk-text/70">{t('campaign.step2.description')}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-rsk-orange rounded-full flex items-center justify-center font-bold text-rsk-dark">
              3
            </div>
            <div>
              <p className="font-semibold text-rsk-dark mb-1">{t('campaign.step3.title')}</p>
              <p className="text-sm text-rsk-text/70">{t('campaign.step3.description')}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-rsk-orange rounded-full flex items-center justify-center font-bold text-rsk-dark">
              4
            </div>
            <div>
              <p className="font-semibold text-rsk-dark mb-1">{t('campaign.step4.title')}</p>
              <p className="text-sm text-rsk-text/70">{t('campaign.step4.description')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 獎勵說明 */}
      <div className="bg-gradient-to-r from-rsk-orange/10 to-orange-400/10 border border-rsk-orange/20 rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-rsk-orange mb-6 text-center">
          {t('campaign.rewards.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-rsk-orange mb-2">{t('campaign.rewards.usdt')}</div>
            <div className="text-sm text-rsk-text/70">{t('campaign.rewards.usdtDescription')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-rsk-orange mb-2">{t('campaign.rewards.merch')}</div>
            <div className="text-sm text-rsk-text/70">{t('campaign.rewards.merchDescription')}</div>
          </div>
        </div>
        <div className="text-center mt-6 text-rsk-text/70 text-sm">
          {t('campaign.rewards.announcement')}
        </div>
      </div>

      {/* 活動時間線 */}
      <div className="bg-rsk-gray/50 border border-rsk-orange/20 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-rsk-orange mb-6 text-center">
          {t('campaign.timeline.title')}
        </h3>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-20 text-center">
              <div className="text-2xl font-bold text-rsk-orange">{t('campaign.timeline.launch.date')}</div>
            </div>
            <div className="flex-1 border-l-4 border-rsk-orange/20 pl-6 pb-2">
              <p className="font-semibold text-rsk-dark">{t('campaign.timeline.launch.title')}</p>
              <p className="text-sm text-rsk-text/70">{t('campaign.timeline.launch.description')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-20 text-center">
              <div className="text-2xl font-bold text-rsk-orange">{t('campaign.timeline.milestone.date')}</div>
            </div>
            <div className="flex-1 border-l-4 border-rsk-orange pl-6 pb-2">
              <p className="font-semibold text-rsk-dark">{t('campaign.timeline.milestone.title')}</p>
              <p className="text-sm text-rsk-text/70">{t('campaign.timeline.milestone.description')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-20 text-center">
              <div className="text-2xl font-bold text-rsk-orange">{t('campaign.timeline.deadline.date')}</div>
            </div>
            <div className="flex-1 border-l-4 border-rsk-orange/20 pl-6">
              <p className="font-semibold text-rsk-dark">{t('campaign.timeline.deadline.title')}</p>
              <p className="text-sm text-rsk-text/70">{t('campaign.timeline.deadline.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
