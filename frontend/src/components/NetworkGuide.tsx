'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/utils/helpers';

export const NetworkGuide: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const networkInfo = {
    rpcUrl: 'https://public-node.rsk.co',
    chainName: 'Rootstock',
    chainId: '30',
    symbol: 'RBTC',
    explorer: 'https://rootstock.blockscout.com',
  };

  const handleCopy = async (key: string, value: string) => {
    const success = await copyToClipboard(value);
    if (success) {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <div className="bg-rsk-cream border-3 border-rsk-border-dark rounded-xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">ℹ️</span>
        <div>
          <h3 className="text-lg font-bold text-rsk-text-dark mb-2">
            币安钱包用户必看
          </h3>
          <p className="text-sm text-rsk-text-dark/80 leading-relaxed">
            连接币安钱包时，请按以下信息填写 Rootstock 网络配置：
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {/* RPC URL */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-rsk-text-dark">RPC 网址</span>
            <button
              onClick={() => handleCopy('rpc', networkInfo.rpcUrl)}
              className="text-xs bg-rsk-orange hover:bg-rsk-orange/90 text-white px-3 py-1 rounded transition-colors"
            >
              {copied === 'rpc' ? '✓ 已复制' : '📋 复制'}
            </button>
          </div>
          <code className="text-sm text-rsk-orange break-all font-mono">
            {networkInfo.rpcUrl}
          </code>
        </div>

        {/* Chain Name */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-rsk-text-dark">网络名称</span>
            <button
              onClick={() => handleCopy('name', networkInfo.chainName)}
              className="text-xs bg-rsk-orange hover:bg-rsk-orange/90 text-white px-3 py-1 rounded transition-colors"
            >
              {copied === 'name' ? '✓ 已复制' : '📋 复制'}
            </button>
          </div>
          <code className="text-sm text-rsk-orange font-mono">
            {networkInfo.chainName}
          </code>
        </div>

        {/* Chain ID */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-rsk-text-dark">链 ID</span>
            <span className="text-xs text-green-600 font-semibold">✓ 已自动填入</span>
          </div>
          <code className="text-sm text-rsk-orange font-mono">
            {networkInfo.chainId}
          </code>
        </div>

        {/* Symbol */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-rsk-text-dark">符号</span>
            <button
              onClick={() => handleCopy('symbol', networkInfo.symbol)}
              className="text-xs bg-rsk-orange hover:bg-rsk-orange/90 text-white px-3 py-1 rounded transition-colors"
            >
              {copied === 'symbol' ? '✓ 已复制' : '📋 复制'}
            </button>
          </div>
          <code className="text-sm text-rsk-orange font-mono">
            {networkInfo.symbol}
          </code>
        </div>
      </div>

      <div className="mt-4 p-3 bg-rsk-lime/20 rounded-lg">
        <p className="text-xs text-rsk-text-dark leading-relaxed">
          💡 <strong>提示：</strong>点击"复制"按钮，然后粘贴到币安钱包的对应字段中。区块浏览器 URL 可选填写。
        </p>
      </div>
    </div>
  );
};
