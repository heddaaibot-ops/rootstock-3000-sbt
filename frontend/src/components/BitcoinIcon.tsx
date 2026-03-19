/**
 * BitcoinIcon Component
 * Bitcoin 符号图标 - 淡色主题版本
 */

interface BitcoinIconProps {
  className?: string;
  size?: number;
}

export function BitcoinIcon({ className = '', size = 64 }: BitcoinIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="32" cy="32" r="30" fill="#FF9100" opacity="0.2" />
      <circle cx="32" cy="32" r="28" fill="none" stroke="#FF9100" strokeWidth="2" />
      <path
        d="M38.5 26.5C38.5 24.5 37 23 35 23H29V20H26V23H24V20H21V23H16V26H19V43H16V46H21V49H24V46H26V49H29V46H35C37 46 38.5 44.5 38.5 42.5C38.5 41 37.5 39.5 36 39C37.5 38.5 38.5 37 38.5 35.5V26.5ZM24 26H34C35 26 35.5 26.5 35.5 27.5C35.5 28.5 35 29 34 29H24V26ZM34.5 40C34.5 41 34 41.5 33 41.5H24V38.5H33C34 38.5 34.5 39 34.5 40Z"
        fill="#FF9100"
      />
    </svg>
  );
}

/**
 * BitcoinSymbol Component
 * Bitcoin ₿ 文字符号
 */

interface BitcoinSymbolProps {
  className?: string;
}

export function BitcoinSymbol({ className = '' }: BitcoinSymbolProps) {
  return <span className={`font-bold ${className}`}>₿</span>;
}
