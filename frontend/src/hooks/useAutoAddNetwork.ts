'use client';

import { useEffect, useRef } from 'react';
import { useAccount, useConnect } from 'wagmi';

export const useAutoAddNetwork = () => {
  const { connector, isConnected, chainId } = useAccount();
  const { connectors } = useConnect();
  const hasAutoAdded = useRef(false);

  useEffect(() => {
    const addRootstockNetwork = async () => {
      // 只在首次连接时执行，且未执行过
      if (!isConnected || hasAutoAdded.current) return;
      if (typeof window.ethereum === 'undefined') return;

      const rootstockChainId = '0x1e'; // 30 in hex (decimal 30)
      const networkParams = {
        chainId: rootstockChainId,
        chainName: 'Rootstock',
        nativeCurrency: {
          name: 'RBTC',
          symbol: 'RBTC',
          decimals: 18,
        },
        rpcUrls: ['https://public-node.rsk.co'],
        blockExplorerUrls: ['https://rootstock.blockscout.com'],
      };

      try {
        // 检测是否是币安钱包
        const isBinanceWallet =
          window.ethereum.isBinance ||
          window.BinanceChain ||
          connector?.name?.toLowerCase().includes('binance');

        if (isBinanceWallet) {
          console.log('🟡 检测到币安钱包连接，准备添加 Rootstock 网络...');
          hasAutoAdded.current = true; // 标记为已执行

          // 🔥 关键修改：直接添加网络，不切换网络
          // wallet_addEthereumChain 会自动弹窗让用户确认，不会打断其他操作
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [networkParams],
            });
            console.log('✅ 已自动添加 Rootstock 网络！所有字段已自动填充');
          } catch (addError: any) {
            // 错误码 4902 表示网络已存在，这是正常的
            if (addError.code === -32602 || addError.message?.includes('already')) {
              console.log('✅ Rootstock 网络已存在，无需添加');
            } else if (addError.code === 4001) {
              console.log('用户取消了添加网络');
            } else {
              console.warn('⚠️ 添加网络失败:', addError);
            }
          }
        }
      } catch (error) {
        console.warn('⚠️ 网络操作失败:', error);
      }
    };

    // 延迟执行，避免与钱包初始化冲突
    const timer = setTimeout(addRootstockNetwork, 1000);
    return () => clearTimeout(timer);
  }, [isConnected, connector]);
};
