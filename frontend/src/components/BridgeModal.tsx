/**
 * BridgeModal - 跨鏈橋彈窗組件
 *
 * 功能：
 * - 選擇鏈（Arbitrum/Base/Ethereum）
 * - 發送 0.5 USDC
 * - 實時顯示進度
 * - 支持斷點續傳
 *
 * 版本：V1.0
 * 日期：2026-03-25
 */

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { useBridgeStatus, getStatusText, getEstimatedTime } from '../hooks/useBridgeStatus';
import './BridgeModal.css';

interface BridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAINS = {
  arbitrum: {
    id: '0xa4b1',
    name: 'Arbitrum One',
    usdcAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    estimatedTime: '1-2 分鐘',
    gasToken: 'ETH',
  },
  base: {
    id: '0x2105',
    name: 'Base',
    usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    estimatedTime: '1-2 分鐘',
    gasToken: 'ETH',
  },
  ethereum: {
    id: '0x1',
    name: 'Ethereum',
    usdcAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    estimatedTime: '2-3 分鐘',
    gasToken: 'ETH',
  },
};

const RECEIVER_ADDRESS = '0xaae785ae97cf428088d1fb995cdab194a77039fb';
const USDC_ABI = ['function transfer(address to, uint256 amount) returns (bool)', 'function balanceOf(address) view returns (uint256)'];

export function BridgeModal({ isOpen, onClose }: BridgeModalProps) {
  // 使用網站已有的錢包連接狀態
  const { address: userAddress, isConnected: isWalletConnected } = useAccount();

  const [selectedChain, setSelectedChain] = useState<keyof typeof CHAINS | null>(null);
  const [usdcTxHash, setUsdcTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const { status, rbtcTxHash, isConnected, error: wsError, resumed } = useBridgeStatus({
    usdcTxHash,
    fromAddress: userAddress || undefined,
    chain: selectedChain || undefined,
  });

  // 檢查是否有未完成的交易（斷點續傳）
  useEffect(() => {
    if (isOpen) {
      const savedTxHash = localStorage.getItem('pendingBridgeTx');
      const savedChain = localStorage.getItem('pendingBridgeChain');
      if (savedTxHash && savedChain) {
        setUsdcTxHash(savedTxHash);
        setSelectedChain(savedChain as keyof typeof CHAINS);
      }
    }
  }, [isOpen]);

  // 記錄交易到 localStorage
  useEffect(() => {
    if (usdcTxHash && selectedChain) {
      localStorage.setItem('pendingBridgeTx', usdcTxHash);
      localStorage.setItem('pendingBridgeChain', selectedChain);
    }
  }, [usdcTxHash, selectedChain]);

  // 完成後清除 localStorage
  useEffect(() => {
    if (status === 'completed' || status === 'failed') {
      localStorage.removeItem('pendingBridgeTx');
      localStorage.removeItem('pendingBridgeChain');
    }
  }, [status]);

  /**
   * 切換網絡
   */
  async function switchNetwork(chainId: string): Promise<boolean> {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
      return true;
    } catch (error: any) {
      if (error.code === 4902) {
        setError('此網絡未添加到錢包，請手動添加');
      } else if (error.code === 4001) {
        setError('切換網絡被取消');
      } else {
        setError(`切換網絡失敗：${error.message || '未知錯誤'}`);
      }
      return false;
    }
  }

  /**
   * 檢查 USDC 餘額
   */
  async function checkUSDCBalance(chain: keyof typeof CHAINS): Promise<number> {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    const usdcContract = new ethers.Contract(
      CHAINS[chain].usdcAddress,
      USDC_ABI,
      provider
    );

    const balance = await usdcContract.balanceOf(address);
    const balanceFormatted = ethers.formatUnits(balance, 6);

    return parseFloat(balanceFormatted);
  }

  /**
   * 發送 USDC
   */
  async function handleSendUSDC() {
    if (!selectedChain) return;

    setIsSending(true);
    setError(null);

    try {
      // 1. 切換網絡
      const switched = await switchNetwork(CHAINS[selectedChain].id);
      if (!switched) {
        setIsSending(false);
        return;
      }

      // 2. 檢查餘額
      const balance = await checkUSDCBalance(selectedChain);
      if (balance < 0.5) {
        setError(`請確保在 ${CHAINS[selectedChain].name} 上有至少 0.5 USDC\n當前餘額：${balance.toFixed(2)} USDC`);
        setIsSending(false);
        return;
      }

      // 3. 發送 USDC
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const usdcContract = new ethers.Contract(
        CHAINS[selectedChain].usdcAddress,
        USDC_ABI,
        signer
      );

      const tx = await usdcContract.transfer(
        RECEIVER_ADDRESS,
        500000 // 0.5 USDC (6 decimals)
      );

      setUsdcTxHash(tx.hash);
      console.log('📤 USDC 已發送:', tx.hash);

      // 等待交易確認
      await tx.wait();
      setIsSending(false);

    } catch (error: any) {
      console.error('❌ 發送失敗:', error);
      setIsSending(false);

      if (error.code === 4001) {
        setError('交易被取消');
      } else if (error.code === 'INSUFFICIENT_FUNDS') {
        setError(`${CHAINS[selectedChain!].gasToken} 不足，請充值 Gas 費`);
      } else if (error.message?.includes('insufficient funds')) {
        setError(`${CHAINS[selectedChain!].gasToken} 不足，請充值 Gas 費`);
      } else {
        setError(`發送失敗：${error.message || '未知錯誤'}`);
      }
    }
  }

  /**
   * 渲染狀態
   */
  function renderStatus() {
    if (isSending && !usdcTxHash) {
      return (
        <div className="status sending">
          <div className="spinner"></div>
          <div className="status-text">📤 正在發送 USDC...</div>
          <div className="status-hint">請在錢包中確認交易</div>
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className="status pending">
          <div className="spinner"></div>
          <div className="status-text">⏳ 等待監聽到交易...</div>
          <div className="estimate">預計 {CHAINS[selectedChain!].estimatedTime}</div>
          {resumed && <div className="resumed-badge">🔄 已恢復進度</div>}
        </div>
      );
    }

    if (status === 'processing') {
      return (
        <div className="status processing">
          <div className="spinner"></div>
          <div className="status-text">⚡ 正在發送 rBTC...</div>
          <div className="estimate">預計 30-60 秒</div>
        </div>
      );
    }

    if (status === 'completed') {
      return (
        <div className="status completed">
          <div className="success-icon">✅</div>
          <div className="status-text">已完成！rBTC 已發送</div>
          <div className="amount-info">
            <div>收到約 <strong>$0.42</strong> 等值 rBTC</div>
            <div className="fee-info">（扣除 10% 手續費 + $0.03 Gas）</div>
          </div>
          {rbtcTxHash && (
            <a
              href={`https://rootstock.blockscout.com/tx/${rbtcTxHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="view-tx"
            >
              查看 Rootstock 交易 →
            </a>
          )}
        </div>
      );
    }

    if (status === 'failed') {
      return (
        <div className="status failed">
          <div className="error-icon">❌</div>
          <div className="status-text">處理失敗</div>
          <div className="error-hint">請聯繫客服或稍後重試</div>
        </div>
      );
    }

    return null;
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && status !== 'processing' && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>🌉 跨鏈到 Rootstock</h2>
          {status !== 'processing' && (
            <button className="close-btn" onClick={onClose}>✕</button>
          )}
        </div>

        <div className="modal-body">
          {!isWalletConnected ? (
            <div className="wallet-not-connected">
              <div className="warning-icon">🔌</div>
              <h3>請先連接錢包</h3>
              <p>請使用右上角的「連接錢包」按鈕連接您的錢包</p>
              <button className="close-button" onClick={onClose}>
                知道了
              </button>
            </div>
          ) : !usdcTxHash ? (
            <>
              <div className="chain-selector">
                <p className="selector-label">選擇 USDC 所在的鏈：</p>
                {Object.entries(CHAINS).map(([key, chain]) => (
                  <button
                    key={key}
                    className={`chain-button ${selectedChain === key ? 'selected' : ''}`}
                    onClick={() => setSelectedChain(key as keyof typeof CHAINS)}
                  >
                    <span className="chain-name">{chain.name}</span>
                    <span className="chain-estimate">{chain.estimatedTime}</span>
                  </button>
                ))}
              </div>

              {error && (
                <div className="error-message">
                  ⚠️ {error}
                </div>
              )}

              <button
                className="send-button"
                onClick={handleSendUSDC}
                disabled={!selectedChain || isSending}
              >
                {isSending ? '發送中...' : '發送 0.5 USDC'}
              </button>

              <div className="info-box">
                <div className="info-item">
                  <span className="info-icon">📌</span>
                  <span>發送後將收到約 <strong>$0.42</strong> 等值的 rBTC</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">💰</span>
                  <span>扣除 10% 手續費 + $0.03 Gas</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">⚡</span>
                  <span>Gas 費用：約 $0.03（Economy 模式）</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {renderStatus()}

              {wsError && (
                <div className="error-message">
                  ⚠️ {wsError}
                </div>
              )}

              {!isConnected && status !== 'completed' && status !== 'failed' && (
                <div className="connection-warning">
                  🔌 連接斷開，正在嘗試重連...
                </div>
              )}

              {status === 'completed' && (
                <button className="close-button" onClick={onClose}>
                  關閉
                </button>
              )}

              {status === 'failed' && (
                <button className="retry-button" onClick={() => {
                  setUsdcTxHash(null);
                  setError(null);
                }}>
                  重新嘗試
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
