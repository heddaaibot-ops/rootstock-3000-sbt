import React from 'react';
import { formatNumber, formatPercentage, calculateProgress } from '@/utils/helpers';

interface ProgressBarProps {
  current: bigint;
  total: bigint;
  loading?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, loading }) => {
  // 前端显示固定为 3000（纪念 3000 天），实际合约是 10000
  const displayTotal = 3000n;
  const percentage = calculateProgress(current, displayTotal);
  const remaining = displayTotal - current;

  return (
    <div className="w-full">
      {/* 統計數字 - 全部橙色主題 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className={`text-4xl font-bold text-rsk-orange font-mono ${loading ? 'animate-pulse' : ''}`}>
            {formatNumber(Number(current))}
          </div>
          <div className="text-sm text-rsk-text-dark font-semibold mt-2 uppercase">已铸造</div>
        </div>
        <div className="text-center">
          <div className={`text-4xl font-bold text-rsk-orange font-mono ${loading ? 'animate-pulse' : ''}`}>
            {formatNumber(Number(displayTotal))}
          </div>
          <div className="text-sm text-rsk-text-dark font-semibold mt-2 uppercase">总供应量</div>
        </div>
        <div className="text-center">
          <div className={`text-4xl font-bold text-rsk-orange font-mono ${loading ? 'animate-pulse' : ''}`}>
            {formatNumber(Number(remaining))}
          </div>
          <div className="text-sm text-rsk-text-dark font-semibold mt-2 uppercase">剩余</div>
        </div>
      </div>

      {/* 百分比标签 - 橙色背景 */}
      <div className="text-center mb-6">
        <div className="inline-block bg-rsk-orange px-6 py-3 rounded-full">
          <span className="text-base font-bold text-white font-mono">
            {formatPercentage(percentage, 1)}
          </span>
        </div>
      </div>

      {/* 进度条 - 米色背景轨道 */}
      <div className="relative mb-3">
        <div className="h-5 bg-rsk-offwhite rounded-full overflow-hidden border-2 border-rsk-pink">
          <div
            className="h-full bg-rsk-orange transition-all duration-500 ease-out relative"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          >
            {percentage > 5 && (
              <div className="absolute inset-0 shimmer"></div>
            )}
          </div>
        </div>
      </div>

      {/* 刻度线 - 粉色字体 */}
      <div className="flex justify-between mt-3 text-xs text-rsk-pink font-mono font-semibold">
        <span>0</span>
        <span>750</span>
        <span>1.5k</span>
        <span>2.25k</span>
        <span>3k</span>
      </div>
    </div>
  );
};
