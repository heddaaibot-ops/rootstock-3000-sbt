import { useEffect, useState } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { createPublicClient, http } from 'viem';
import { Contract } from 'ethers';
import { BrowserProvider } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, ROOTSTOCK_CHAINS } from '@/utils/contract';

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
  const { address, chainId: userChainId } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default to Rootstock Mainnet if user hasn't connected wallet
  const chainId = userChainId || 30;

  const contractAddress = chainId === 31
    ? CONTRACT_ADDRESS.testnet
    : CONTRACT_ADDRESS.mainnet;

  // 讀取合約數據
  const fetchContractData = async () => {
    if (!contractAddress) return;

    try {
      setLoading(true);
      setError(null);

      // Create a standalone public client for reading contract data
      // This works even when user hasn't connected their wallet
      const chain = chainId === 31 ? ROOTSTOCK_CHAINS.testnet : ROOTSTOCK_CHAINS.mainnet;
      const client = publicClient || createPublicClient({
        chain,
        transport: http(chain.rpcUrls.default.http[0]),
      });

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
        client.readContract({
          address: contractAddress as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'totalSupply',
        }),
        client.readContract({
          address: contractAddress as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'remainingSupply',
        }),
        client.readContract({
          address: contractAddress as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'MAX_SUPPLY',
        }),
        client.readContract({
          address: contractAddress as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'paused',
        }),
        address
          ? client.readContract({
              address: contractAddress as `0x${string}`,
              abi: CONTRACT_ABI,
              functionName: 'hasUserMinted',
              args: [address],
            })
          : false,
        address
          ? client.readContract({
              address: contractAddress as `0x${string}`,
              abi: CONTRACT_ABI,
              functionName: 'balanceOf',
              args: [address],
            })
          : 0n,
        client.readContract({
          address: contractAddress as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'getMintProgressBasisPoints',
        }),
        client.readContract({
          address: contractAddress as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'LAUNCH_DATE',
        }),
        client.readContract({
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
    } catch (err: any) {
      console.error('Failed to fetch contract data:', err);
      const errorMsg = err.message || err.toString();
      setError(`Failed to load contract data: ${errorMsg.slice(0, 200)}`);
    } finally {
      setLoading(false);
    }
  };

  // 铸造 SBT
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

      // 等待交易确认
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

  // 初始加载和定期刷新
  useEffect(() => {
    fetchContractData();

    const interval = setInterval(fetchContractData, 10000); // 每 10 秒刷新

    return () => clearInterval(interval);
  }, [address, chainId]); // Removed publicClient dependency - we create our own client

  return {
    contractData,
    loading,
    error,
    mint,
    refresh: fetchContractData,
    getUserTokenId,
  };
};
