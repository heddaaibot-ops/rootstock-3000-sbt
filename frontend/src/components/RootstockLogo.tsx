/**
 * RootstockLogo Component
 * Rootstock 品牌 Logo - 淡色主题版本
 */

interface RootstockLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function RootstockLogo({ className = '', width = 120, height = 40 }: RootstockLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Rootstock 文字 */}
      <text
        x="10"
        y="28"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill="#1A1A1A"
      >
        ROOTSTOCK
      </text>

      {/* RSK 图形标志 */}
      <rect x="2" y="8" width="4" height="24" fill="#FF9100" rx="2" />
      <rect x="0" y="12" width="8" height="16" fill="#FF9100" opacity="0.3" rx="2" />
    </svg>
  );
}

/**
 * RootstockIcon Component
 * Rootstock 简化图标（仅图形）
 */

interface RootstockIconProps {
  className?: string;
  size?: number;
}

export function RootstockIcon({ className = '', size = 40 }: RootstockIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 主要方块 */}
      <rect x="8" y="4" width="24" height="32" fill="#FF9100" opacity="0.8" rx="4" />

      {/* 叠加层 */}
      <rect x="12" y="8" width="16" height="24" fill="#DEFF19" opacity="0.4" rx="3" />

      {/* 中心细节 */}
      <rect x="16" y="12" width="8" height="16" fill="#FF9100" rx="2" />
    </svg>
  );
}
