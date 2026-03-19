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
          // Figma 设计新增配色（强调色）
          'neon-green': '#DEFF19', // 绿黄色高亮（来自 Figma）
          pink: '#FF70E0',        // 粉色强调（来自 Figma）

          // 原有配色（保留淡色主题）
          orange: '#FF9100',      // Rootstock 品牌橙色
          cream: '#FDF8F0',       // 奶油色背景（主背景）
          beige: '#F5F1E8',       // 米色（次背景）
          dark: '#1A1A1A',        // 深色文字
          gray: '#F0ECE3',        // 浅灰色卡片背景
          border: '#E5DFD0',      // 边框色
          text: '#2D2D2D',        // 主文字色
          light: '#FFFFFF',       // 纯白
          black: '#141414',       // 深黑色（备用）
        },
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}
