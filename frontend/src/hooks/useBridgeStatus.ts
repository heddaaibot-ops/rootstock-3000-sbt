/**
 * useBridgeStatus Hook - WebSocket 狀態管理
 *
 * 功能：
 * - 建立 WebSocket 連接
 * - 訂閱交易狀態
 * - 實時接收狀態更新
 * - 支持斷點續傳
 *
 * 版本：V1.0
 * 日期：2026-03-25
 */

import { useEffect, useState, useRef } from 'react';

interface BridgeStatus {
  status: 'idle' | 'pending' | 'processing' | 'completed' | 'failed';
  rbtcTxHash?: string;
  timestamp?: string;
  resumed?: boolean; // 是否為斷點續傳
}

interface UseBridgeStatusOptions {
  usdcTxHash: string | null;
  fromAddress?: string;
  chain?: string;
}

/**
 * WebSocket 狀態管理 Hook
 */
export function useBridgeStatus({ usdcTxHash, fromAddress, chain }: UseBridgeStatusOptions) {
  const [bridgeStatus, setBridgeStatus] = useState<BridgeStatus>({ status: 'idle' });
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!usdcTxHash) {
      setBridgeStatus({ status: 'idle' });
      return;
    }

    // 建立 WebSocket 連接
    function connect() {
      try {
        // 根據環境選擇 WebSocket URL
        const WS_URL = typeof window !== 'undefined' && window.location.hostname === 'rootstockcn.com'
          ? 'wss://rootstockcn.com/ws'  // 生產環境（通過 Nginx 反向代理）
          : 'ws://localhost:3001';        // 本地開發

        const ws = new WebSocket(WS_URL);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('🔗 WebSocket 已連接');
          setIsConnected(true);
          setError(null);

          // 訂閱交易狀態
          ws.send(JSON.stringify({
            type: 'subscribe',
            usdcTxHash,
            fromAddress,
            chain,
          }));

          // 啟動心跳檢測（每 30 秒）
          heartbeatIntervalRef.current = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'ping' }));
            }
          }, 30000);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.type === 'welcome') {
              console.log('👋 收到歡迎消息:', data.message);
            }

            if (data.type === 'status_update') {
              console.log('📊 狀態更新:', data.status);
              setBridgeStatus({
                status: data.status,
                rbtcTxHash: data.rbtcTxHash,
                timestamp: data.timestamp,
                resumed: data.resumed,
              });

              // 如果完成，保存到 localStorage 便於查看歷史
              if (data.status === 'completed') {
                try {
                  const history = JSON.parse(localStorage.getItem('bridgeHistory') || '[]');
                  history.unshift({
                    usdcTxHash,
                    rbtcTxHash: data.rbtcTxHash,
                    timestamp: data.timestamp,
                    chain,
                  });
                  // 只保留最近 10 筆
                  localStorage.setItem('bridgeHistory', JSON.stringify(history.slice(0, 10)));
                } catch (e) {
                  console.error('保存歷史失敗:', e);
                }
              }
            }

            if (data.type === 'error') {
              console.error('❌ 服務器錯誤:', data.message);
              setError(data.message);
            }

            if (data.type === 'pong') {
              // 心跳回應
            }

          } catch (error) {
            console.error('❌ 解析消息失敗:', error);
          }
        };

        ws.onerror = (error) => {
          console.error('❌ WebSocket 錯誤:', error);
          setError('連接錯誤，請檢查網絡');
        };

        ws.onclose = () => {
          console.log('🔌 WebSocket 已斷開');
          setIsConnected(false);

          // 清理心跳
          if (heartbeatIntervalRef.current) {
            clearInterval(heartbeatIntervalRef.current);
            heartbeatIntervalRef.current = null;
          }

          // 如果交易未完成，5 秒後自動重連
          if (bridgeStatus.status !== 'completed' && bridgeStatus.status !== 'failed') {
            reconnectTimeoutRef.current = setTimeout(() => {
              console.log('🔄 嘗試重新連接...');
              connect();
            }, 5000);
          }
        };

      } catch (error) {
        console.error('❌ 建立連接失敗:', error);
        setError('無法連接到服務器');
      }
    }

    connect();

    // 清理函數
    return () => {
      if (wsRef.current) {
        const ws = wsRef.current;

        // 清理心跳
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
          heartbeatIntervalRef.current = null;
        }

        // 取消訂閱
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: 'unsubscribe',
            usdcTxHash,
          }));
        }

        ws.close();
      }

      // 清理重連計時器
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [usdcTxHash, fromAddress, chain]);

  return {
    ...bridgeStatus,
    isConnected,
    error,
  };
}

/**
 * 獲取預估時間（秒）
 */
export function getEstimatedTime(status: BridgeStatus['status']): number {
  switch (status) {
    case 'pending':
      return 120; // 1-2 分鐘
    case 'processing':
      return 60; // 30-60 秒
    case 'completed':
      return 0;
    case 'failed':
      return 0;
    default:
      return 0;
  }
}

/**
 * 格式化狀態文字
 */
export function getStatusText(status: BridgeStatus['status']): string {
  switch (status) {
    case 'idle':
      return '閒置';
    case 'pending':
      return '等待處理中...';
    case 'processing':
      return '正在發送 rBTC...';
    case 'completed':
      return '✅ 完成';
    case 'failed':
      return '❌ 失敗';
    default:
      return '';
  }
}
