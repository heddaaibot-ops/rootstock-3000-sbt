import { useEffect, useState } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { createPublicClient, http } from 'viem';
import { Contract } from 'ethers';
import { BrowserProvider } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, ROOTSTOCK_MAINNET } from '@/utils/contract';

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

  // 讀取合約數據
  const fetchContractData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create a standalone public client for Rootstock Mainnet with retry logic
      const client = createPublicClient({
        chain: ROOTSTOCK_MAINNET,
        transport: http(ROOTSTOCK_MAINNET.rpcUrls.default.http[0], {
          timeout: 30_000, // 30 秒超时
          retryCount: 3, // 重试 3 次
          retryDelay: 1000, // 重试延迟 1 秒
        }),
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
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'totalSupply',
        }),
        client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'remainingSupply',
        }),
        client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'MAX_SUPPLY',
        }),
        client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'paused',
        }),
        address
          ? client.readContract({
              address: CONTRACT_ADDRESS,
              abi: CONTRACT_ABI,
              functionName: 'hasUserMinted',
              args: [address],
            })
          : false,
        address
          ? client.readContract({
              address: CONTRACT_ADDRESS,
              abi: CONTRACT_ABI,
              functionName: 'balanceOf',
              args: [address],
            })
          : 0n,
        client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'getMintProgressBasisPoints',
        }),
        client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'LAUNCH_DATE',
        }),
        client.readContract({
          address: CONTRACT_ADDRESS,
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
    if (!walletClient || !address) {
      return { success: false, error: 'Wallet not connected' };
    }

    try {
      // 先估算實際需要的 gas
      let gasEstimate: bigint;
      try {
        gasEstimate = await publicClient?.estimateContractGas({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'mint',
          args: [],
          account: address,
        }) || 100000n;

        // 加 50% 緩衝以確保成功，但最多不超過 200,000
        gasEstimate = (gasEstimate * 150n) / 100n;
        if (gasEstimate > 200000n) {
          gasEstimate = 200000n;
        }
        console.log(`⛽ Estimated gas: ${gasEstimate.toString()}`);
      } catch (estimateErr) {
        console.warn('Gas estimation failed, using default:', estimateErr);
        gasEstimate = 100000n; // 使用較低的默認值
      }

      // 簡單的餘額檢查 - 只記錄信息，不阻止交易
      // 讓錢包自己處理餘額不足的情況，因為只有錢包知道實際費用
      if (publicClient) {
        const balance = await publicClient.getBalance({ address });
        const gasPrice = await publicClient.getGasPrice();
        const estimatedCost = gasEstimate * gasPrice;

        console.log(`💰 Current balance: ${balance.toString()} wei (${Number(balance) / 1e18} RBTC)`);
        console.log(`⛽ Gas price: ${gasPrice.toString()} wei`);
        console.log(`💵 Estimated cost: ${estimatedCost.toString()} wei (${Number(estimatedCost) / 1e18} RBTC)`);

        // 只有在餘額完全為 0 或非常接近 0 時才提前提示
        if (balance < 10000000000000n) { // 小於 0.00001 RBTC
          const currentRBTC = Number(balance) / 1e18;
          return {
            success: false,
            error: `余额不足。您的余额: ${currentRBTC.toFixed(8)} RBTC。铸造需要少量 rBTC 支付 Gas 费（约 0.000005 RBTC），请添加更多 rBTC 后再试。`,
          };
        }
      }

      const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mint',
        args: [],
        gas: gasEstimate,
      });

      // 等待交易确认
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      // 🔧 修复：即使 fetchContractData 失败也要返回成功状态
      // 刷新數據（如果失败也不影响返回结果）
      try {
        await fetchContractData();
      } catch (refreshErr) {
        console.warn('Failed to refresh contract data after mint, but mint was successful:', refreshErr);
      }

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
      } else if (err.message?.includes('User rejected') || err.message?.includes('User denied')) {
        errorMessage = 'Transaction was rejected';
      } else if (err.message?.includes('timeout') || err.message?.includes('timed out')) {
        errorMessage = 'Exception: 当前服务或节点响应异常，暂时无法完成操作，请稍后重试';
      } else if (err.message?.includes('network') || err.message?.includes('fetch')) {
        errorMessage = 'Exception: 当前服务或节点响应异常，暂时无法完成操作，请稍后重试';
      } else if (err.message?.includes('insufficient funds')) {
        errorMessage = 'Exception: 余额不足。铸造 SBT 需要支付少量 Gas 费（约 0.0001 rBTC），请确保钱包中有足够的 rBTC';
      }

      return { success: false, error: errorMessage };
    }
  };

  // 查詢用戶的 Token ID
  const getUserTokenId = async (): Promise<bigint | null> => {
    if (!publicClient || !address) return null;

    try {
      const balance = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
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
  }, [address]); // Mainnet only - no chain switching needed

  return {
    contractData,
    loading,
    error,
    mint,
    refresh: fetchContractData,
    getUserTokenId,
  };
};
