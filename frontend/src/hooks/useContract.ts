import { useEffect, useState } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { Contract } from 'ethers';
import { BrowserProvider } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/utils/contract';

export interface ContractData {
  totalSupply: bigint;
  remainingSupply: bigint;
  maxSupply: bigint;
  isPaused: boolean;
  hasUserMinted: boolean;
  userBalance: bigint;
  progressBasisPoints: bigint;
  launchDate: bigint;
  milestoneDate: bigint;
}

export const useContract = () => {
  const { address, chainId } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contractAddress = chainId === 31
    ? CONTRACT_ADDRESS.testnet
    : CONTRACT_ADDRESS.mainnet;

  // 讀取合約數據
  const fetchContractData = async () => {
    if (!publicClient || !contractAddress) return;

    try {
      setLoading(true);
      setError(null);

      const [
        totalSupply,
        remainingSupply,
        maxSupply,
        isPaused,
        hasUserMinted,
        userBalance,
        progressBasisPoints,
        launchDate,
        milestoneDate,
      ] = await Promise.all([
        publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'totalSupply',
        }),
        publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'remainingSupply',
        }),
        publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'MAX_SUPPLY',
        }),
        publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'paused',
        }),
        address
          ? publicClient.readContract({
              address: contractAddress as `0x${string}`,
              abi: CONTRACT_ABI,
              functionName: 'hasUserMinted',
              args: [address],
            })
          : false,
        address
          ? publicClient.readContract({
              address: contractAddress as `0x${string}`,
              abi: CONTRACT_ABI,
              functionName: 'balanceOf',
              args: [address],
            })
          : 0n,
        publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'getMintProgressBasisPoints',
        }),
        publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'LAUNCH_DATE',
        }),
        publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'MILESTONE_DATE',
        }),
      ]);

      setContractData({
        totalSupply: totalSupply as bigint,
        remainingSupply: remainingSupply as bigint,
        maxSupply: maxSupply as bigint,
        isPaused: isPaused as boolean,
        hasUserMinted: hasUserMinted as boolean,
        userBalance: userBalance as bigint,
        progressBasisPoints: progressBasisPoints as bigint,
        launchDate: launchDate as bigint,
        milestoneDate: milestoneDate as bigint,
      });
    } catch (err) {
      console.error('Failed to fetch contract data:', err);
      setError('Failed to load contract data');
    } finally {
      setLoading(false);
    }
  };

  // 鑄造 SBT
  const mint = async (): Promise<{ success: boolean; txHash?: string; error?: string }> => {
    if (!walletClient || !address || !contractAddress) {
      return { success: false, error: 'Wallet not connected' };
    }

    try {
      const hash = await walletClient.writeContract({
        address: contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'mint',
        args: [],
      });

      // 等待交易確認
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      // 刷新數據
      await fetchContractData();

      return { success: true, txHash: hash };
    } catch (err: any) {
      console.error('Mint failed:', err);
      let errorMessage = 'Transaction failed';

      if (err.message?.includes('Already minted')) {
        errorMessage = 'You have already minted your SBT';
      } else if (err.message?.includes('Max supply reached')) {
        errorMessage = 'Maximum supply has been reached';
      } else if (err.message?.includes('Pausable: paused')) {
        errorMessage = 'Minting is currently paused';
      } else if (err.message?.includes('User rejected')) {
        errorMessage = 'Transaction was rejected';
      }

      return { success: false, error: errorMessage };
    }
  };

  // 查詢用戶的 Token ID
  const getUserTokenId = async (): Promise<bigint | null> => {
    if (!publicClient || !address || !contractAddress) return null;

    try {
      const balance = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'balanceOf',
        args: [address],
      });

      if (balance === 0n) return null;

      // 如果有 token，查詢其詳情（這裡簡化處理）
      // 實際可能需要遍歷或監聽 Transfer 事件
      return 0n; // placeholder
    } catch (err) {
      console.error('Failed to get token ID:', err);
      return null;
    }
  };

  // 初始加載和定期刷新
  useEffect(() => {
    fetchContractData();

    const interval = setInterval(fetchContractData, 10000); // 每 10 秒刷新

    return () => clearInterval(interval);
  }, [publicClient, address, chainId]);

  return {
    contractData,
    loading,
    error,
    mint,
    refresh: fetchContractData,
    getUserTokenId,
  };
};
