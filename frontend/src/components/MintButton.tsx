'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { openInExplorer } from '@/utils/helpers';
import { useI18n } from '@/i18n/provider';

interface MintButtonProps {
  isPaused: boolean;
  hasUserMinted: boolean;
  onMint: () => Promise<{ success: boolean; txHash?: string; error?: string }>;
  chainId?: number;
}

export const MintButton: React.FC<MintButtonProps> = ({
  isPaused,
  hasUserMinted,
  onMint,
  chainId,
}) => {
  const { isConnected } = useAccount();
  const { t } = useI18n();
  const [minting, setMinting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMint = async () => {
    setMinting(true);
    setError(null);
    setTxHash(null);

    try {
      const result = await onMint();

      if (result.success && result.txHash) {
        setTxHash(result.txHash);
      } else if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setMinting(false);
    }
  };

  // Twitter 分享函數
  const shareOnTwitter = () => {
    const text = `我剛剛鑄造了 #Rootstock愛你3000 紀念 SBT！\n\n慶祝 Rootstock 主網運行 3000 天\n\n@RootstockCN`;
    const url = 'https://frontend-green-delta-12.vercel.app';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  // 成功狀態
  if (txHash) {
    return (
      <div className="text-center animate-fade-in">
        <div className="bg-green-500/10 border border-green-500 rounded-2xl p-8 mb-4">
          <div className="text-2xl font-bold text-green-500 mb-2">
            {t('mint.success.title')}
          </div>
          <div className="text-rsk-text/70 mb-6">
            {t('mint.success.description')}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* View Transaction Button */}
            <button
              onClick={() => openInExplorer('tx', txHash, chainId || 31)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-lg transition-colors"
            >
              <span>{t('mint.success.viewTx')}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>

            {/* Twitter Share Button */}
            <button
              onClick={shareOnTwitter}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-[#1DA1F2] rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>{t('mint.success.shareTwitter')}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 錯誤狀態
  if (error) {
    return (
      <div className="text-center animate-fade-in">
        <div className="bg-red-500/10 border border-red-500 rounded-2xl p-8 mb-4">
          <div className="text-2xl font-bold text-red-500 mb-2">
            {t('mint.error.title')}
          </div>
          <div className="text-rsk-text/70 mb-4">{error}</div>
          <button
            onClick={() => setError(null)}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors"
          >
            {t('mint.error.retry')}
          </button>
        </div>
      </div>
    );
  }

  // 確定按鈕狀態和文字
  const isDisabled = !isConnected || isPaused || hasUserMinted || minting;

  let buttonText = t('mint.button.mint');
  let statusMessage = t('mint.status.free');

  if (!isConnected) {
    buttonText = t('mint.button.connectWallet');
    statusMessage = t('mint.status.connect');
  } else if (hasUserMinted) {
    buttonText = t('mint.button.alreadyMinted');
    statusMessage = t('mint.status.claimed');
  } else if (isPaused) {
    buttonText = t('mint.button.paused');
    statusMessage = t('mint.status.pausedMessage');
  } else if (minting) {
    buttonText = t('mint.button.minting');
    statusMessage = t('mint.status.inProgress');
  }

  // 始終顯示按鈕
  return (
    <div className="text-center">
      <button
        onClick={handleMint}
        disabled={isDisabled}
        className="group relative px-16 py-6 bg-rsk-pink hover:bg-rsk-pink/90 text-rsk-dark font-black text-2xl rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl uppercase tracking-wide"
      >
        {minting ? (
          <span className="flex items-center gap-3 justify-center">
            <svg className="animate-spin h-7 w-7" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{buttonText}</span>
          </span>
        ) : (
          <span>{buttonText}</span>
        )}
      </button>

      <div className="text-base text-rsk-dark mt-6 font-medium">
        {statusMessage}
      </div>
    </div>
  );
};
