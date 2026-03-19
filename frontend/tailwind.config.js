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
          orange: '#FF9100',      // Rootstock 品牌橙色
          cream: '#FDF8F0',       // 奶油色背景（主背景）
          beige: '#F5F1E8',       // 米色（次背景）
          dark: '#1A1A1A',        // 深色文字
          gray: '#F0ECE3',        // 浅灰色卡片背景
          border: '#E5DFD0',      // 边框色
          text: '#2D2D2D',        // 主文字色
          light: '#FFFFFF',       // 纯白
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
