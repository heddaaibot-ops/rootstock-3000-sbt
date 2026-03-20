/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rsk: {
          // 主色调 - 橙色为主（40-50% 使用率）
          orange: '#FF9100',         // Rootstock 官方橙色 - 主色调

          // 强调色 - 仅用于标签徽章（10-15% 使用率）
          lime: '#DEFF1A',           // 荧光绿黄色（Nametag 标签）

          // 背景色系 - 米色主题（30% 使用率）
          cream: '#FDF8F0',          // 奶油色主背景
          offwhite: '#FAFAF5',       // 浅米色卡片背景

          // 深色调 - 替代黑色（10% 使用率）
          'text-dark': '#5C2E00',    // 深橙棕色文字（9.8:1 对比度）
          'border-dark': '#4A1942',  // 深紫棕色边框（8.2:1 对比度）

          // 官方品牌配色（实色底标题使用）
          pink: '#FF70E0',           // Rootstock Pink
          purple: '#9E75FF',         // Purple
          green: '#78C700',          // Rootstock Green
          cyan: '#08FFD1',           // Cyan
        },
      },
      fontFamily: {
        sans: [
          'PingFang SC',
          'Microsoft YaHei',
          'Source Han Sans CN',
          'Inter',
          'system-ui',
          'sans-serif'
        ],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'tag': '13.65px',            // 官方 Tag 圆角
        'nametag': '60px',           // 官方 Nametag 按钮圆角
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
