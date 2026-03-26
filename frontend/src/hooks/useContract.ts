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
      // 🔥 使用固定的、经过验证的 Gas Limit
      // 根据实际链上数据：平均消耗 164,680 gas
      // 设置为 165,000 提供安全缓冲，避免钱包过度估算
      const gasEstimate = 165000n;
      console.log(`⛽ Using verified gas limit: ${gasEstimate.toString()}`);

      // 🔥 使用 Rootstock 绝对最低 Gas Price
      // Rootstock 最低: 0.06 Gwei = 60,000,000 wei
      const minGasPrice = 60000000n;

      // 获取当前网络 gas price
      let currentGasPrice = minGasPrice;

      // 🔥 检测是否为币安钱包（需要在作用域外定义）
      const isBinanceWallet =
        typeof window !== 'undefined' &&
        window.ethereum &&
        (window.ethereum.isBinance || window.BinanceChain);

      // 余额检查 - 使用精确的 Gas 计算
      if (publicClient) {
        const balance = await publicClient.getBalance({ address });
        const networkGasPrice = await publicClient.getGasPrice();

        // 使用网络价格和最低价格中的较小值
        currentGasPrice = networkGasPrice > 0n && networkGasPrice < minGasPrice
          ? networkGasPrice
          : minGasPrice;

        const estimatedCost = gasEstimate * currentGasPrice;

        console.log(`💰 Current balance: ${balance.toString()} wei (${Number(balance) / 1e18} RBTC)`);
        console.log(`⛽ Gas price: ${currentGasPrice.toString()} wei (${Number(currentGasPrice) / 1e9} Gwei)`);
        console.log(`📊 Gas limit: ${gasEstimate.toString()}`);
        console.log(`💵 Estimated cost: ${estimatedCost.toString()} wei (${Number(estimatedCost) / 1e18} RBTC)`);

        // 只有在余额不足时才提示
        // 使用实际计算的成本，不额外添加缓冲
        if (balance < estimatedCost) {
          const currentRBTC = Number(balance) / 1e18;
          const neededRBTC = Number(estimatedCost) / 1e18;
          const shortfallRBTC = Number(estimatedCost - balance) / 1e18;

          // 🟡 币安钱包特殊提示：如果实际余额接近需要的金额，可能是钱包估算错误
          if (isBinanceWallet && currentRBTC >= 0.000004) {
            return {
              success: false,
              error: `币安钱包 Gas 估算提示：您的余额 ${currentRBTC.toFixed(8)} RBTC 可能已足够铸造（实际需要约 0.000005 RBTC），但币安钱包可能过度估算了 Gas 费用。建议通过 10 秒跨链桥充值到 0.0001 RBTC 以确保交易成功。`,
            };
          }

          return {
            success: false,
            error: `余额不足。您的余额: ${currentRBTC.toFixed(8)} RBTC，需要: ${neededRBTC.toFixed(8)} RBTC，还差: ${shortfallRBTC.toFixed(8)} RBTC。请添加更多 rBTC 后再试。`,
          };
        }
      }

      let hash: `0x${string}`;

      if (isBinanceWallet) {
        // 🟡 币安钱包：尝试多种策略
        console.log(`🟡 Detected Binance Wallet - trying multiple gas strategies`);

        // 编码 mint() 函数调用（mint 函数没有参数，所以就是函数选择器）
        // mint() 的函数签名哈希（keccak256("mint()")）的前4字节是 0x1249c58b
        const mintFunctionData = '0x1249c58b';

        try {
          // 🔥 策略 1: 尝试 EIP-1559 格式 (maxFeePerGas + maxPriorityFeePerGas)
          // 即使 Rootstock 可能不支持，币安钱包可能会用不同方式处理
          console.log(`   Strategy 1: Trying EIP-1559 format`);
          const maxFeePerGas = currentGasPrice;
          const maxPriorityFeePerGas = minGasPrice; // 最小值作为 tip

          hash = await window.ethereum!.request({
            method: 'eth_sendTransaction',
            params: [
              {
                from: address,
                to: CONTRACT_ADDRESS,
                data: mintFunctionData,
                gas: `0x${gasEstimate.toString(16)}`,
                maxFeePerGas: `0x${maxFeePerGas.toString(16)}`,
                maxPriorityFeePerGas: `0x${maxPriorityFeePerGas.toString(16)}`,
              },
            ],
          }) as `0x${string}`;

          console.log(`✅ Transaction sent via Binance Wallet (EIP-1559): ${hash}`);
        } catch (eip1559Error: any) {
          console.warn(`   EIP-1559 failed, trying legacy format:`, eip1559Error.message);

          // 🔥 策略 2: 使用极小的 gasPrice (0.001 Gwei = 1,000,000 wei)
          // 让币安钱包看到一个非常小的值，可能会触发不同的处理逻辑
          const veryLowGasPrice = 1000000n; // 0.001 Gwei

          try {
            console.log(`   Strategy 2: Using very low gasPrice (0.001 Gwei)`);
            hash = await window.ethereum!.request({
              method: 'eth_sendTransaction',
              params: [
                {
                  from: address,
                  to: CONTRACT_ADDRESS,
                  data: mintFunctionData,
                  gas: `0x${gasEstimate.toString(16)}`,
                  gasPrice: `0x${veryLowGasPrice.toString(16)}`,
                },
              ],
            }) as `0x${string}`;

            console.log(`✅ Transaction sent via Binance Wallet (very low gas): ${hash}`);
          } catch (lowGasError) {
            console.warn(`   Very low gas failed, trying no parameters:`, lowGasError);

            // 🔥 策略 3: 完全不设置任何参数
            console.log(`   Strategy 3: No gas parameters`);
            hash = await window.ethereum!.request({
              method: 'eth_sendTransaction',
              params: [
                {
                  from: address,
                  to: CONTRACT_ADDRESS,
                  data: mintFunctionData,
                },
              ],
            }) as `0x${string}`;

            console.log(`✅ Transaction sent via Binance Wallet (auto): ${hash}`);
          }
        }
      } else {
        // 🔵 其他钱包：完全使用钱包自己的估算
        console.log(`🔵 Using wagmi writeContract for non-Binance wallet`);
        console.log(`   Letting wallet estimate gas automatically`);

        hash = await walletClient.writeContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'mint',
          args: [],
          // 🔥 不设置任何 gas 参数，让钱包完全自己估算
        });
      }

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
