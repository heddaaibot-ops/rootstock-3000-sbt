import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { openInExplorer } from '@/utils/helpers';

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

  // 成功狀態
  if (txHash) {
    return (
      <div className="text-center animate-fade-in">
        <div className="bg-green-500/10 border border-green-500 rounded-2xl p-8 mb-4">
          <div className="text-6xl mb-4">🎉</div>
          <div className="text-2xl font-bold text-green-500 mb-2">
            Successfully Minted!
          </div>
          <div className="text-gray-400 mb-4">
            Your Soul Bound Token has been minted
          </div>
          <button
            onClick={() => openInExplorer('tx', txHash, chainId || 31)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-lg transition-colors"
          >
            <span>View Transaction</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // 錯誤狀態
  if (error) {
    return (
      <div className="text-center animate-fade-in">
        <div className="bg-red-500/10 border border-red-500 rounded-2xl p-8 mb-4">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-2xl font-bold text-red-500 mb-2">
            Transaction Failed
          </div>
          <div className="text-gray-400 mb-4">{error}</div>
          <button
            onClick={() => setError(null)}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // 未連接錢包
  if (!isConnected) {
    return (
      <div className="text-center">
        <div className="text-gray-400 mb-4">
          Connect your wallet to mint your SBT
        </div>
      </div>
    );
  }

  // 已鑄造
  if (hasUserMinted) {
    return (
      <div className="text-center">
        <div className="bg-rsk-gray border border-rsk-orange/50 rounded-2xl p-8">
          <div className="text-6xl mb-4">✅</div>
          <div className="text-2xl font-bold text-rsk-orange mb-2">
            Already Minted
          </div>
          <div className="text-gray-400">
            You have already claimed your Soul Bound Token
          </div>
        </div>
      </div>
    );
  }

  // 暫停中
  if (isPaused) {
    return (
      <div className="text-center">
        <div className="bg-yellow-500/10 border border-yellow-500 rounded-2xl p-8">
          <div className="text-6xl mb-4">⏸️</div>
          <div className="text-2xl font-bold text-yellow-500 mb-2">
            Minting Paused
          </div>
          <div className="text-gray-400">
            Minting will open soon. Please check back later.
          </div>
        </div>
      </div>
    );
  }

  // 可以鑄造
  return (
    <div className="text-center">
      <button
        onClick={handleMint}
        disabled={minting}
        className="group relative px-12 py-6 bg-gradient-to-r from-rsk-orange to-orange-400 hover:from-orange-400 hover:to-rsk-orange text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-rsk-orange/50"
      >
        {minting ? (
          <span className="flex items-center gap-3">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Minting...</span>
          </span>
        ) : (
          <span className="flex items-center gap-3">
            <span>🎟️</span>
            <span>Mint Your SBT</span>
          </span>
        )}

        {/* Glow effect */}
        {!minting && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rsk-orange to-orange-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10"></div>
        )}
      </button>

      <div className="text-sm text-gray-400 mt-4">
        Free mint • Only gas fee • One per wallet
      </div>
    </div>
  );
};
