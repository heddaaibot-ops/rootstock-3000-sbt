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
        <div className="h-8 bg-rsk-gray rounded mb-4"></div>
        <div className="h-16 bg-rsk-gray rounded"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 統計數字 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-rsk-orange font-mono">
            {formatNumber(Number(current))}
          </div>
          <div className="text-sm text-gray-400 mt-1">Minted</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-rsk-light font-mono">
            {formatNumber(Number(total))}
          </div>
          <div className="text-sm text-gray-400 mt-1">Total Supply</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-300 font-mono">
            {formatNumber(Number(remaining))}
          </div>
          <div className="text-sm text-gray-400 mt-1">Remaining</div>
        </div>
      </div>

      {/* 進度條 */}
      <div className="relative">
        <div className="h-4 bg-rsk-gray rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rsk-orange to-orange-400 transition-all duration-500 ease-out relative"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          >
            {percentage > 5 && (
              <div className="absolute inset-0 shimmer"></div>
            )}
          </div>
        </div>

        {/* 百分比標籤 */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <div className="bg-rsk-dark border border-rsk-orange px-4 py-2 rounded-lg">
            <span className="text-2xl font-bold text-rsk-orange font-mono">
              {formatPercentage(percentage, 3)}
            </span>
          </div>
        </div>
      </div>

      {/* 刻度線 */}
      <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono">
        <span>0</span>
        <span>25K</span>
        <span>50K</span>
        <span>75K</span>
        <span>100K</span>
      </div>
    </div>
  );
};
