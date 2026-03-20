import React from 'react';
import { formatNumber, formatPercentage, calculateProgress } from '@/utils/helpers';

interface ProgressBarProps {
  current: bigint;
  total: bigint;
  loading?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, loading }) => {
  const percentage = calculateProgress(current, total);
  const remaining = total - current;

  if (loading) {
    return (
      <div className="w-full animate-pulse">
        <div className="h-8 bg-rsk-offwhite rounded mb-4"></div>
        <div className="h-16 bg-rsk-offwhite rounded"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 統計數字 - 全部橙色主題 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-rsk-orange font-mono">
            {formatNumber(Number(current))}
          </div>
          <div className="text-sm text-rsk-text-dark font-semibold mt-2 uppercase">已铸造</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-rsk-orange font-mono">
            {formatNumber(Number(total))}
          </div>
          <div className="text-sm text-rsk-text-dark font-semibold mt-2 uppercase">总供应量</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-rsk-orange font-mono">
            {formatNumber(Number(remaining))}
          </div>
          <div className="text-sm text-rsk-text-dark font-semibold mt-2 uppercase">剩余</div>
        </div>
      </div>

      {/* 百分比标签 - 橙色背景 */}
      <div className="text-center mb-6">
        <div className="inline-block bg-rsk-orange px-6 py-3 rounded-tag">
          <span className="text-base font-bold text-white font-mono">
            {formatPercentage(percentage, 3)}
          </span>
        </div>
      </div>

      {/* 进度条 - 米色背景轨道 */}
      <div className="relative mb-3">
        <div className="h-5 bg-rsk-offwhite rounded-full overflow-hidden border-2 border-rsk-border-dark">
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

      {/* 刻度线 - 橙色字体 */}
      <div className="flex justify-between mt-3 text-xs text-rsk-orange font-mono font-semibold">
        <span>0</span>
        <span>25K</span>
        <span>50K</span>
        <span>75K</span>
        <span>100K</span>
      </div>
    </div>
  );
};
