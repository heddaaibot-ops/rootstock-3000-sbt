'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useStableAccount } from '@/hooks/useStableAccount';
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
  const { isConnected, address, isInitialized } = useStableAccount();
  const { t } = useI18n();
  const [minting, setMinting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFollowModal, setShowFollowModal] = useState(false);

  // 从 localStorage 读取确认状态（绑定到钱包地址）
  const [hasConfirmedFollow, setHasConfirmedFollow] = useState(() => {
    if (typeof window !== 'undefined' && address) {
      const storageKey = `rootstock_twitter_confirmed_${address.toLowerCase()}`;
      const confirmed = localStorage.getItem(storageKey) === 'true';
      // 🔧 调试提示：如需重置当前钱包的Twitter关注确认，在控制台运行：
      // localStorage.removeItem('rootstock_twitter_confirmed_' + 'YOUR_ADDRESS'.toLowerCase()); location.reload();
      if (confirmed) {
        console.log(`✅ Twitter follow confirmation found for wallet: ${address}`);
      }
      return confirmed;
    }
    return false;
  });

  // 铸造函数 - 必须先定义才能被其他函数使用
  const handleMint = useCallback(async () => {
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
  }, [onMint]);

  const handleMintClick = () => {
    // 检查状态是否准备好
    if (!isInitialized) {
      return;
    }

    // 检查是否已铸造
    if (hasUserMinted) {
      return;
    }

    // 检查是否暂停
    if (isPaused) {
      return;
    }

    // 检查是否正在铸造
    if (minting) {
      return;
    }

    // 优先检查 Twitter 关注状态（即使未连接钱包）
    // 这样用户可以先完成关注，再连接钱包
    if (!hasConfirmedFollow) {
      setShowFollowModal(true);
      return;
    }

    // 检查钱包连接状态
    if (!isConnected) {
      // 如果没连接钱包，提示用户刷新页面或点击右上角连接按钮
      const shouldRefresh = confirm(
        '检测到钱包未连接。\n\n' +
        '如果您已经连接了钱包但仍看到此消息，可能是页面状态过期。\n\n' +
        '点击「确定」刷新页面，或点击「取消」然后使用右上角的连接钱包按钮。'
      );
      if (shouldRefresh) {
        window.location.reload();
      }
      return;
    }

    // 所有条件满足，执行铸造
    handleMint();
  };

  const handleConfirmFollow = useCallback(() => {
    setHasConfirmedFollow(true);
    // 保存到 localStorage（绑定到钱包地址）
    if (typeof window !== 'undefined' && address) {
      const storageKey = `rootstock_twitter_confirmed_${address.toLowerCase()}`;
      localStorage.setItem(storageKey, 'true');
      console.log(`✅ Twitter follow confirmed for wallet: ${address}`);
    }
    setShowFollowModal(false);
    // 确认后直接执行铸造
    handleMint();
  }, [handleMint, address]);

  const closeModal = useCallback(() => {
    setShowFollowModal(false);
  }, []);

  // 监听钱包地址变化，重新检查确认状态
  useEffect(() => {
    if (typeof window !== 'undefined' && address) {
      const storageKey = `rootstock_twitter_confirmed_${address.toLowerCase()}`;
      const confirmed = localStorage.getItem(storageKey) === 'true';
      setHasConfirmedFollow(confirmed);
      if (confirmed) {
        console.log(`✅ Twitter follow confirmation loaded for wallet: ${address}`);
      } else {
        console.log(`⚠️ No Twitter follow confirmation for wallet: ${address}`);
      }
    } else {
      // 未连接钱包时重置确认状态
      setHasConfirmedFollow(false);
    }
  }, [address]);

  // ESC 键关闭模态框
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showFollowModal) {
        closeModal();
      }
    };

    if (showFollowModal) {
      document.addEventListener('keydown', handleEscape);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showFollowModal, closeModal]);

  // Twitter 分享函数
  const shareOnTwitter = () => {
    const text = `我刚刚铸造了 Rootstock爱你3000 纪念 SBT！\n\n庆祝 Rootstock 主网运行 3000 天\n\n@RootstockCN @rootstock_io`;
    const url = 'https://rootstockcn.com/';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  // 成功状态 - 米色主题
  if (txHash) {
    return (
      <div className="text-center animate-fade-in">
        <div className="bg-rsk-offwhite border-3 border-rsk-orange rounded-xl p-8 mb-4">
          <div className="text-2xl font-bold text-rsk-orange mb-2 uppercase">
            {t('mint.success.title')}
          </div>
          <div className="text-rsk-text-dark mb-6">
            {t('mint.success.description')}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* View Transaction Button - 橙色主題 */}
            <button
              onClick={() => openInExplorer('tx', txHash, 30)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rsk-orange hover:bg-[#FFA726] text-white font-semibold transition-all uppercase"
            >
              <span>{t('mint.success.viewTx')}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>

            {/* Twitter Share Button - 輪廓按鈕 */}
            <button
              onClick={shareOnTwitter}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-rsk-text-dark hover:bg-rsk-text-dark text-rsk-text-dark hover:text-white font-semibold transition-all uppercase"
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

  // 错误状态 - 米色主题
  if (error) {
    return (
      <div className="text-center animate-fade-in">
        <div className="bg-rsk-offwhite border-3 border-red-500 rounded-xl p-8 mb-4">
          <div className="text-2xl font-bold text-red-500 mb-2 uppercase">
            {t('mint.error.title')}
          </div>
          <div className="text-rsk-text-dark mb-4">{error}</div>
          <button
            onClick={() => setError(null)}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-tag font-semibold transition-all uppercase"
          >
            {t('mint.error.retry')}
          </button>
        </div>
      </div>
    );
  }

  // 网络检查 - 添加切换网络功能
  const isWrongNetwork = isConnected && chainId !== 30;

  const switchToRootstock = async () => {
    if (typeof window.ethereum === 'undefined') return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1e' }], // 30 in hex
      });
    } catch (switchError: any) {
      // 如果网络不存在，添加网络
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x1e',
              chainName: 'Rootstock Mainnet',
              nativeCurrency: {
                name: 'RBTC',
                symbol: 'RBTC',
                decimals: 18,
              },
              rpcUrls: ['https://public-node.rsk.co', 'https://rpc.mainnet.rootstock.io/ZRjBSeG4PpiSLNO4zHgxSLIoAAQ_hIQC'],
              blockExplorerUrls: ['https://rootstock.blockscout.com'],
            }],
          });
        } catch (addError) {
          console.error('添加网络失败:', addError);
        }
      }
    }
  };

  // 如果在错误的网络上，显示切换网络按钮
  if (isWrongNetwork) {
    return (
      <div className="text-center animate-fade-in">
        <div className="bg-rsk-offwhite border-3 border-rsk-orange rounded-xl p-8 mb-4">
          <div className="text-2xl font-bold text-rsk-orange mb-2 uppercase">
            错误的网络
          </div>
          <div className="text-rsk-text-dark mb-6">
            请切换到 Rootstock Mainnet
            <div className="text-sm mt-2 text-rsk-text-dark/60">
              当前网络: Chain ID {chainId}
            </div>
          </div>
          <button
            onClick={switchToRootstock}
            className="px-8 py-3 bg-rsk-orange hover:bg-[#FFA726] text-white rounded-tag font-semibold transition-all uppercase"
          >
            切换到 Rootstock
          </button>
        </div>
      </div>
    );
  }

  // 确定按钮状态和文字
  // 只在真正无法操作时才 disable（已铸造、暂停、正在铸造）
  // 未连接钱包时不 disable，这样可以点击并触发提示逻辑
  const isDisabled = isPaused || hasUserMinted || minting;

  let buttonText = t('mint.button.mint');
  let statusMessage = t('mint.status.free');

  // 🔧 等待状态稳定后再检查连接状态（避免刚加载时的误判）
  if (!isInitialized) {
    buttonText = '加载中...';
    statusMessage = '正在初始化...';
  } else if (!isConnected) {
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

  // 始终显示按钮 - 官方 Nametag 风格
  return (
    <>
      <div className="text-center">
        <button
          onClick={handleMintClick}
          disabled={!isInitialized || isDisabled}
          className={`group relative px-10 py-4 min-w-[200px] h-[56px] ${!isConnected && isInitialized ? 'bg-rsk-pink hover:bg-[#FF85E6]' : 'bg-rsk-orange hover:bg-[#FFA726]'} text-white font-bold text-lg rounded-nametag transition-all duration-300 transform hover:scale-105 hover:shadow-[0_8px_24px_rgba(255,145,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none uppercase tracking-wide`}
        >
          {minting ? (
            <span className="flex items-center gap-3 justify-center">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{buttonText}</span>
            </span>
          ) : (
            <span>{buttonText}</span>
          )}
        </button>

        <div className="text-base text-rsk-text-dark mt-6 font-semibold">
          {statusMessage}
        </div>
      </div>

      {/* Twitter 关注模态框 */}
      {showFollowModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="follow-modal-title"
        >
          <div
            className="bg-rsk-cream rounded-xl max-w-md w-full p-8 animate-fade-in border-4 border-rsk-orange relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-rsk-text-dark hover:text-rsk-orange transition-colors"
              aria-label="关闭"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 id="follow-modal-title" className="text-2xl font-bold text-rsk-text-dark mb-4 uppercase text-center leading-tight">
              🔶 关注 Rootstock 中文<br />得到铸造资格
            </h3>
            <p className="text-rsk-text-dark mb-6 text-center">
              请先关注 RootstockCN 官方账号
            </p>

            <a
              href="https://x.com/rootstockcn"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-rsk-purple hover:bg-[#B088FF] text-white font-bold py-3 px-6 rounded-lg mb-4 text-center transition-colors uppercase"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>前往关注 @RootstockCN</span>
              </span>
            </a>

            <div className="flex gap-3">
              <button
                onClick={handleConfirmFollow}
                className="flex-1 bg-rsk-orange hover:bg-[#FFA726] text-white font-bold py-3 px-6 rounded-lg transition-colors uppercase"
              >
                ✓ 我已经关注
              </button>
              <button
                onClick={() => setShowFollowModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors uppercase"
              >
                稍后
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
