'use client';

import { useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';

export const useAutoAddNetwork = () => {
  const { connector, isConnected } = useAccount();
  const { connectors } = useConnect();

  useEffect(() => {
    const addRootstockNetwork = async () => {
      if (typeof window.ethereum === 'undefined') return;

      const rootstockChainId = '0x1e'; // 30 in hex
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

        if (isBinanceWallet && isConnected) {
          console.log('🟡 检测到币安钱包连接，检查 Rootstock 网络...');

          // 先尝试切换到 Rootstock
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: rootstockChainId }],
            });
            console.log('✅ 成功切换到 Rootstock 网络');
          } catch (switchError: any) {
            // 如果网络不存在（错误码 4902），自动添加
            if (switchError.code === 4902) {
              console.log('📝 Rootstock 网络不存在，正在自动添加...');
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [networkParams],
                });
                console.log('✅ 已自动添加 Rootstock 网络！所有字段已自动填充');
              } catch (addError: any) {
                if (addError.code === 4001) {
                  console.log('用户取消了添加网络');
                } else {
                  console.warn('⚠️ 添加网络失败:', addError);
                }
              }
            } else if (switchError.code !== 4001) {
              console.warn('⚠️ 切换网络失败:', switchError);
            }
          }
        }
      } catch (error) {
        console.warn('⚠️ 网络操作失败:', error);
      }
    };

    // 当钱包连接状态改变时执行
    if (isConnected) {
      addRootstockNetwork();
    }
  }, [isConnected, connector]);
};
