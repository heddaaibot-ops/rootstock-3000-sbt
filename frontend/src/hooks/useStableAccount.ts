'use client';

import { useAccount } from 'wagmi';
import { useState, useEffect, useRef } from 'react';

/**
 * 稳定的账户 hook
 *
 * 解决问题：
 * 1. wagmi 初始化时状态不稳定
 * 2. 多钱包扩展导致状态频繁变化
 * 3. 页面聚焦/失焦时的误判
 *
 * 策略：
 * - 使用防抖机制避免频繁变化
 * - 缓存最后已知的稳定状态
 * - 只在真正变化时更新
 */
export function useStableAccount() {
  const account = useAccount();
  const [stableState, setStableState] = useState({
    isConnected: false,
    address: undefined as string | undefined,
    isInitialized: false,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastKnownGoodState = useRef({
    isConnected: false,
    address: undefined as string | undefined,
  });

  useEffect(() => {
    // 清除之前的定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 防抖：等待状态稳定 200ms 后再更新
    timeoutRef.current = setTimeout(() => {
      const newIsConnected = account.isConnected && !!account.address;
      const newAddress = account.address;

      // 检查状态是否真的变化了
      const hasChanged =
        newIsConnected !== lastKnownGoodState.current.isConnected ||
        newAddress !== lastKnownGoodState.current.address;

      if (hasChanged || !stableState.isInitialized) {
        console.log('📊 钱包状态更新:', {
          isConnected: newIsConnected,
          address: newAddress,
          from: lastKnownGoodState.current,
        });

        lastKnownGoodState.current = {
          isConnected: newIsConnected,
          address: newAddress,
        };

        setStableState({
          isConnected: newIsConnected,
          address: newAddress,
          isInitialized: true,
        });
      }
    }, 200); // 200ms 防抖

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [account.isConnected, account.address, stableState.isInitialized]);

  return stableState;
}
