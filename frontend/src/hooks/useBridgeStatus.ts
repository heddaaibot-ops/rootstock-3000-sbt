/**
 * useBridgeStatus Hook - WebSocket 状态管理
 *
 * 功能：
 * - 建立 WebSocket 连接
 * - 订阅交易状态
 * - 实时接收状态更新
 * - 支持断点续传
 *
 * 版本：V1.0
 * 日期：2026-03-25
 */

import { useEffect, useState, useRef } from 'react';

interface BridgeStatus {
  status: 'idle' | 'pending' | 'processing' | 'completed' | 'failed';
  rbtcTxHash?: string;
  timestamp?: string;
  resumed?: boolean; // 是否为断点续传
}

interface UseBridgeStatusOptions {
  usdcTxHash: string | null;
  fromAddress?: string;
  chain?: string;
}

/**
 * WebSocket 状态管理 Hook
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

    // 建立 WebSocket 连接
    function connect() {
      try {
        // 根据环境选择 WebSocket URL
        const WS_URL = typeof window !== 'undefined' && window.location.hostname === 'rootstockcn.com'
          ? 'wss://ws.rootstockcn.com'  // 生产环境（WebSocket 子域名）
          : 'ws://localhost:3001';        // 本地开发

        const ws = new WebSocket(WS_URL);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('🔗 WebSocket 已连接');
          setIsConnected(true);
          setError(null);

          // 订阅交易状态
          ws.send(JSON.stringify({
            type: 'subscribe',
            usdcTxHash,
            fromAddress,
            chain,
          }));

          // 启动心跳检测（每 30 秒）
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
              console.log('👋 收到欢迎消息:', data.message);
            }

            if (data.type === 'status_update') {
              console.log('📊 状态更新:', data.status);
              setBridgeStatus({
                status: data.status,
                rbtcTxHash: data.rbtcTxHash,
                timestamp: data.timestamp,
                resumed: data.resumed,
              });

              // 如果完成，保存到 localStorage 便于查看历史
              if (data.status === 'completed') {
                try {
                  const history = JSON.parse(localStorage.getItem('bridgeHistory') || '[]');
                  history.unshift({
                    usdcTxHash,
                    rbtcTxHash: data.rbtcTxHash,
                    timestamp: data.timestamp,
                    chain,
                  });
                  // 只保留最近 10 笔
                  localStorage.setItem('bridgeHistory', JSON.stringify(history.slice(0, 10)));
                } catch (e) {
                  console.error('保存历史失败:', e);
                }
              }
            }

            if (data.type === 'error') {
              console.error('❌ 服务器错误:', data.message);
              setError(data.message);
            }

            if (data.type === 'pong') {
              // 心跳回应
            }

          } catch (error) {
            console.error('❌ 解析消息失败:', error);
          }
        };

        ws.onerror = (error) => {
          console.error('❌ WebSocket 错误:', error);
          setError('连接错误，请检查网络');
        };

        ws.onclose = () => {
          console.log('🔌 WebSocket 已断开');
          setIsConnected(false);

          // 清理心跳
          if (heartbeatIntervalRef.current) {
            clearInterval(heartbeatIntervalRef.current);
            heartbeatIntervalRef.current = null;
          }

          // 如果交易未完成，5 秒后自动重连
          if (bridgeStatus.status !== 'completed' && bridgeStatus.status !== 'failed') {
            reconnectTimeoutRef.current = setTimeout(() => {
              console.log('🔄 尝试重新连接...');
              connect();
            }, 5000);
          }
        };

      } catch (error) {
        console.error('❌ 建立连接失败:', error);
        setError('无法连接到服务器');
      }
    }

    connect();

    // 清理函数
    return () => {
      if (wsRef.current) {
        const ws = wsRef.current;

        // 清理心跳
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
          heartbeatIntervalRef.current = null;
        }

        // 取消订阅
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: 'unsubscribe',
            usdcTxHash,
          }));
        }

        ws.close();
      }

      // 清理重连计时器
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
 * 获取预估时间（秒）
 */
export function getEstimatedTime(status: BridgeStatus['status']): number {
  switch (status) {
    case 'pending':
      return 120; // 1-2 分钟
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
 * 格式化状态文字
 */
export function getStatusText(status: BridgeStatus['status']): string {
  switch (status) {
    case 'idle':
      return '闲置';
    case 'pending':
      return '等待处理中...';
    case 'processing':
      return '正在发送 rBTC...';
    case 'completed':
      return '✅ 完成';
    case 'failed':
      return '❌ 失败';
    default:
      return '';
  }
}
