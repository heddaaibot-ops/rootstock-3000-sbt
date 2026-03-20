# Rootstock 品牌指南 · 实战应用手册

> **开发者专用 · 完整代码实现指南**
> 配合《超详细版品牌指南》使用
> 包含所有即用代码、配置文件和集成步骤

---

## 📋 目录

- [Tailwind CSS 完整配置](#tailwind-css-完整配置)
- [React 组件库](#react-组件库)
- [Vue 组件库](#vue-组件库)
- [响应式设计规范](#响应式设计规范)
- [动画和交互效果](#动画和交互效果)
- [SBT 项目集成步骤](#sbt-项目集成步骤)
- [性能优化建议](#性能优化建议)
- [可访问性指南](#可访问性指南)

---

## 🎨 Tailwind CSS 完整配置

### `tailwind.config.js`

完整的 Tailwind 配置文件，包含所有 Rootstock 品牌色和设计规范：

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      // Rootstock 品牌配色系统
      colors: {
        rootstock: {
          // 主色板
          orange: {
            DEFAULT: '#FF9100',
            rgb: 'rgb(255, 145, 0)',
            rgba: (opacity) => `rgba(255, 145, 0, ${opacity})`,
          },
          pink: {
            DEFAULT: '#FF70E0',
            rgb: 'rgb(255, 112, 224)',
            rgba: (opacity) => `rgba(255, 112, 224, ${opacity})`,
          },
          green: {
            DEFAULT: '#78C700',
            rgb: 'rgb(120, 199, 0)',
            rgba: (opacity) => `rgba(120, 199, 0, ${opacity})`,
          },
          // 辅助色板
          purple: {
            DEFAULT: '#9E75FF',
            rgb: 'rgb(158, 117, 255)',
            rgba: (opacity) => `rgba(158, 117, 255, ${opacity})`,
          },
          lime: {
            DEFAULT: '#DEFF1A',
            rgb: 'rgb(222, 255, 26)',
            rgba: (opacity) => `rgba(222, 255, 26, ${opacity})`,
          },
          cyan: {
            DEFAULT: '#08FFD1',
            rgb: 'rgb(8, 255, 209)',
            rgba: (opacity) => `rgba(8, 255, 209, ${opacity})`,
          },
          // 基础色
          black: {
            DEFAULT: '#000000',
            light: '#1a1a1a',
            lighter: '#2a2a2a',
          },
          offwhite: {
            DEFAULT: '#FAFAF5',
            dark: '#f0f0eb',
          },
        },
        // 语义化颜色别名
        primary: '#FF9100',
        secondary: '#FF70E0',
        success: '#78C700',
        accent: '#DEFF1A',
      },

      // 字体家族
      fontFamily: {
        sans: ['Rootstock Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        pack: ['Pack', 'Rootstock Sans', 'Impact', 'sans-serif'],
      },

      // 字号系统
      fontSize: {
        'display': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h2': ['36px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h3': ['28px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h4': ['24px', { lineHeight: '1.4', letterSpacing: '0' }],
        'h5': ['20px', { lineHeight: '1.5', letterSpacing: '0' }],
        'h6': ['18px', { lineHeight: '1.5', letterSpacing: '0' }],
        'body-lg': ['18px', { lineHeight: '1.6', letterSpacing: '0' }],
        'body': ['16px', { lineHeight: '1.6', letterSpacing: '0' }],
        'body-sm': ['14px', { lineHeight: '1.5', letterSpacing: '0' }],
        'caption': ['12px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'label': ['10px', { lineHeight: '1.2', letterSpacing: '0.05em' }],
      },

      // 圆角规范
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '8px',
        'tag': '13.65px',
        'nametag': '60px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },

      // 间距系统
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
        '40': '160px',
        '48': '192px',
        '56': '224px',
        '64': '256px',
      },

      // 阴影效果
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
        'md': '0 4px 16px 0 rgba(0, 0, 0, 0.15)',
        'lg': '0 8px 24px 0 rgba(0, 0, 0, 0.2)',
        'xl': '0 16px 48px 0 rgba(0, 0, 0, 0.25)',
        'glow-orange': '0 0 20px rgba(255, 145, 0, 0.5)',
        'glow-pink': '0 0 20px rgba(255, 112, 224, 0.5)',
        'glow-lime': '0 0 20px rgba(222, 255, 26, 0.5)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },

      // 过渡动画
      transitionDuration: {
        'fast': '150ms',
        'DEFAULT': '250ms',
        'slow': '350ms',
      },

      // 动画关键帧
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 145, 0, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 145, 0, 0.8)' },
        },
        'counter-up': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      // 动画类
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'counter-up': 'counter-up 0.6s ease-out forwards',
      },

      // 背景渐变
      backgroundImage: {
        'gradient-orange-pink': 'linear-gradient(135deg, #FF9100 0%, #FF70E0 100%)',
        'gradient-lime-cyan': 'linear-gradient(135deg, #DEFF1A 0%, #08FFD1 100%)',
        'gradient-purple-pink': 'linear-gradient(135deg, #9E75FF 0%, #FF70E0 100%)',
        'gradient-dark': 'linear-gradient(180deg, #000000 0%, #1a1a1a 100%)',
        'radial-glow': 'radial-gradient(circle at center, rgba(255, 145, 0, 0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [
    // 添加自定义 utilities
    function ({ addUtilities, theme }) {
      const newUtilities = {
        // 文字渐变效果
        '.text-gradient-orange': {
          background: 'linear-gradient(135deg, #FF9100 0%, #FF70E0 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-lime': {
          background: 'linear-gradient(135deg, #DEFF1A 0%, #78C700 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        // 毛玻璃效果
        '.backdrop-blur-glass': {
          'backdrop-filter': 'blur(10px) saturate(150%)',
          '-webkit-backdrop-filter': 'blur(10px) saturate(150%)',
          'background-color': 'rgba(0, 0, 0, 0.6)',
        },
        // 按钮发光效果
        '.btn-glow': {
          'box-shadow': '0 0 20px currentColor',
          'transition': 'box-shadow 0.3s ease',
        },
        '.btn-glow:hover': {
          'box-shadow': '0 0 40px currentColor',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
```

### CSS 全局样式文件

`src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS 变量定义（供非 Tailwind 场景使用） */
:root {
  /* 品牌配色 */
  --rs-orange: #FF9100;
  --rs-pink: #FF70E0;
  --rs-green: #78C700;
  --rs-purple: #9E75FF;
  --rs-lime: #DEFF1A;
  --rs-cyan: #08FFD1;
  --rs-black: #000000;
  --rs-offwhite: #FAFAF5;

  /* 语义化颜色 */
  --color-primary: var(--rs-orange);
  --color-secondary: var(--rs-pink);
  --color-success: var(--rs-green);
  --color-accent: var(--rs-lime);

  /* 圆角 */
  --radius-sm: 4px;
  --radius-tag: 13.65px;
  --radius-nametag: 60px;

  /* 过渡时间 */
  --transition-fast: 150ms;
  --transition: 250ms;
  --transition-slow: 350ms;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: var(--rs-orange);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--rs-pink);
}

/* 文本选择高亮 */
::selection {
  background-color: var(--rs-orange);
  color: var(--rs-black);
}

::-moz-selection {
  background-color: var(--rs-orange);
  color: var(--rs-black);
}

/* 基础样式重置 */
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-rootstock-black text-rootstock-offwhite;
    font-family: 'Rootstock Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-bold;
    text-transform: uppercase;
  }

  h1 {
    @apply text-h1 text-rootstock-lime;
  }

  h2 {
    @apply text-h2 text-rootstock-orange;
  }

  h3 {
    @apply text-h3 text-rootstock-pink;
  }

  a {
    @apply transition-colors duration-fast;
  }

  a:hover {
    @apply text-rootstock-orange;
  }
}

/* 组件层 */
@layer components {
  /* 按钮基础样式 */
  .btn {
    @apply inline-flex items-center justify-center;
    @apply px-10 py-4;
    @apply font-bold text-body uppercase tracking-wide;
    @apply rounded-tag;
    @apply transition-all duration-fast;
    @apply cursor-pointer select-none;
    @apply border-2 border-transparent;
  }

  .btn-primary {
    @apply bg-rootstock-orange text-rootstock-black;
    @apply hover:shadow-glow-orange hover:scale-105;
    @apply active:scale-95;
  }

  .btn-secondary {
    @apply bg-rootstock-pink text-rootstock-black;
    @apply hover:shadow-glow-pink hover:scale-105;
    @apply active:scale-95;
  }

  .btn-outline {
    @apply bg-transparent text-rootstock-orange;
    @apply border-rootstock-orange;
    @apply hover:bg-rootstock-orange hover:text-rootstock-black;
  }

  .btn-ghost {
    @apply bg-transparent text-rootstock-offwhite;
    @apply hover:bg-rootstock-black-light;
  }

  /* 卡片样式 */
  .card {
    @apply bg-rootstock-black-light;
    @apply border border-rootstock-orange/20;
    @apply rounded-md;
    @apply p-8;
    @apply transition-all duration-fast;
  }

  .card-hover {
    @apply card;
    @apply hover:border-rootstock-orange;
    @apply hover:shadow-glow-orange;
    @apply hover:-translate-y-1;
  }

  /* 标签样式 */
  .badge {
    @apply inline-flex items-center;
    @apply px-3 py-1;
    @apply text-caption font-bold uppercase;
    @apply rounded-tag;
  }

  .badge-orange {
    @apply bg-rootstock-orange text-rootstock-black;
  }

  .badge-pink {
    @apply bg-rootstock-pink text-rootstock-black;
  }

  .badge-lime {
    @apply bg-rootstock-lime text-rootstock-black;
  }

  .badge-purple {
    @apply bg-rootstock-purple text-rootstock-black;
  }

  /* 输入框样式 */
  .input {
    @apply w-full;
    @apply px-4 py-3;
    @apply bg-rootstock-black-light;
    @apply border-2 border-rootstock-orange/20;
    @apply rounded;
    @apply text-rootstock-offwhite;
    @apply placeholder:text-rootstock-offwhite/40;
    @apply transition-all duration-fast;
    @apply focus:outline-none focus:border-rootstock-orange;
  }

  /* 容器 */
  .container-custom {
    @apply max-w-7xl mx-auto;
    @apply px-6 md:px-12 lg:px-20;
  }

  /* Section */
  .section {
    @apply py-20 md:py-32;
  }
}

/* Utility 层 */
@layer utilities {
  /* 文字渐变 */
  .text-gradient {
    @apply bg-clip-text text-transparent;
  }

  /* 玻璃态效果 */
  .glass {
    @apply backdrop-blur-glass;
  }

  /* 响应式隐藏 */
  .hide-mobile {
    @apply hidden md:block;
  }

  .show-mobile {
    @apply block md:hidden;
  }
}
```

---

## ⚛️ React 组件库

### Button 组件

`components/ui/Button.tsx`:

```tsx
import React, { ButtonHTMLAttributes, FC } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'btn',
  {
    variants: {
      variant: {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
        ghost: 'btn-ghost',
      },
      size: {
        sm: 'px-6 py-2 text-body-sm',
        md: 'px-10 py-4 text-body',
        lg: 'px-12 py-5 text-body-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({
  className,
  variant,
  size,
  fullWidth,
  loading,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
```

### Card 组件

`components/ui/Card.tsx`:

```tsx
import React, { FC, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: 'orange' | 'pink' | 'lime' | 'none';
}

export const Card: FC<CardProps> = ({
  className,
  hover = false,
  glow = 'none',
  children,
  ...props
}) => {
  const glowClass = {
    orange: 'hover:shadow-glow-orange',
    pink: 'hover:shadow-glow-pink',
    lime: 'hover:shadow-glow-lime',
    none: '',
  };

  return (
    <div
      className={cn(
        hover ? 'card-hover' : 'card',
        glow !== 'none' && glowClass[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h3 className={cn('text-h4 text-rootstock-orange', className)} {...props}>
      {children}
    </h3>
  );
};

export const CardContent: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('text-body text-rootstock-offwhite/80', className)} {...props}>
      {children}
    </div>
  );
};
```

### Badge 组件

`components/ui/Badge.tsx`:

```tsx
import React, { FC, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'badge',
  {
    variants: {
      color: {
        orange: 'badge-orange',
        pink: 'badge-pink',
        lime: 'badge-lime',
        purple: 'badge-purple',
        green: 'bg-rootstock-green text-rootstock-black',
        cyan: 'bg-rootstock-cyan text-rootstock-black',
      },
      size: {
        sm: 'px-2 py-0.5 text-label',
        md: 'px-3 py-1 text-caption',
        lg: 'px-4 py-1.5 text-body-sm',
      },
    },
    defaultVariants: {
      color: 'orange',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export const Badge: FC<BadgeProps> = ({
  className,
  color,
  size,
  dot,
  children,
  ...props
}) => {
  return (
    <span className={cn(badgeVariants({ color, size, className }))} {...props}>
      {dot && <span className="inline-block w-2 h-2 rounded-full bg-current mr-1.5" />}
      {children}
    </span>
  );
};
```

### CountdownTimer 组件

`components/CountdownTimer.tsx`:

```tsx
import React, { FC, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: FC<CountdownTimerProps> = ({
  targetDate,
  className,
  onComplete,
}) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className={cn('flex gap-4 md:gap-8', className)}>
      {timeUnits.map(({ label, value }, index) => (
        <div key={label} className="flex flex-col items-center">
          <div className="relative">
            <div className="bg-rootstock-black-light border-2 border-rootstock-orange rounded-md p-4 md:p-6 min-w-[80px] md:min-w-[120px]">
              <div className="text-4xl md:text-6xl font-bold text-rootstock-lime text-center tabular-nums animate-counter-up">
                {String(value).padStart(2, '0')}
              </div>
            </div>
            {index < timeUnits.length - 1 && (
              <div className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 text-2xl md:text-4xl text-rootstock-orange font-bold">
                :
              </div>
            )}
          </div>
          <div className="mt-2 text-caption md:text-body-sm text-rootstock-offwhite/60 uppercase tracking-wider">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};
```

### ProgressBar 组件

`components/ui/ProgressBar.tsx`:

```tsx
import React, { FC } from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'orange' | 'pink' | 'lime' | 'green';
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'orange',
  height = 'md',
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colorClasses = {
    orange: 'bg-rootstock-orange',
    pink: 'bg-rootstock-pink',
    lime: 'bg-rootstock-lime',
    green: 'bg-rootstock-green',
  };

  const heightClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-body-sm text-rootstock-offwhite uppercase font-bold">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-body-sm text-rootstock-lime font-bold tabular-nums">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className={cn(
        'w-full bg-rootstock-black-light rounded-full overflow-hidden',
        heightClasses[height]
      )}>
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out',
            colorClasses[color],
            percentage > 0 && 'shadow-glow-orange'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
```

---

## 🎯 Vue 组件库

### Button 组件

`components/ui/RButton.vue`:

```vue
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot name="left-icon" v-if="!loading" />
    <slot />
    <slot name="right-icon" v-if="!loading" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  fullWidth: false,
  loading: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const buttonClasses = computed(() => {
  const classes = ['btn'];

  // Variant
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };
  classes.push(variantClasses[props.variant]);

  // Size
  const sizeClasses = {
    sm: 'px-6 py-2 text-body-sm',
    md: 'px-10 py-4 text-body',
    lg: 'px-12 py-5 text-body-lg',
  };
  classes.push(sizeClasses[props.size]);

  // Full width
  if (props.fullWidth) {
    classes.push('w-full');
  }

  return classes.join(' ');
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>
```

### Card 组件

`components/ui/RCard.vue`:

```vue
<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  hover?: boolean;
  glow?: 'orange' | 'pink' | 'lime' | 'none';
}

const props = withDefaults(defineProps<Props>(), {
  hover: false,
  glow: 'none',
});

const cardClasses = computed(() => {
  const classes = [props.hover ? 'card-hover' : 'card'];

  const glowClasses = {
    orange: 'hover:shadow-glow-orange',
    pink: 'hover:shadow-glow-pink',
    lime: 'hover:shadow-glow-lime',
    none: '',
  };

  if (props.glow !== 'none') {
    classes.push(glowClasses[props.glow]);
  }

  return classes.join(' ');
});
</script>
```

### CountdownTimer 组件

`components/RCountdownTimer.vue`:

```vue
<template>
  <div class="flex gap-4 md:gap-8">
    <div
      v-for="(unit, index) in timeUnits"
      :key="unit.label"
      class="flex flex-col items-center"
    >
      <div class="relative">
        <div class="bg-rootstock-black-light border-2 border-rootstock-orange rounded-md p-4 md:p-6 min-w-[80px] md:min-w-[120px]">
          <div class="text-4xl md:text-6xl font-bold text-rootstock-lime text-center tabular-nums animate-counter-up">
            {{ String(unit.value).padStart(2, '0') }}
          </div>
        </div>
        <div
          v-if="index < timeUnits.length - 1"
          class="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 text-2xl md:text-4xl text-rootstock-orange font-bold"
        >
          :
        </div>
      </div>
      <div class="mt-2 text-caption md:text-body-sm text-rootstock-offwhite/60 uppercase tracking-wider">
        {{ unit.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Props {
  targetDate: Date;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'complete'): void;
}>();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const timeLeft = ref<TimeLeft>({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

let timer: number | null = null;

const calculateTimeLeft = (): TimeLeft => {
  const difference = +props.targetDate - +new Date();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

const timeUnits = computed(() => [
  { label: 'DAYS', value: timeLeft.value.days },
  { label: 'HOURS', value: timeLeft.value.hours },
  { label: 'MINUTES', value: timeLeft.value.minutes },
  { label: 'SECONDS', value: timeLeft.value.seconds },
]);

onMounted(() => {
  timeLeft.value = calculateTimeLeft();

  timer = window.setInterval(() => {
    const newTimeLeft = calculateTimeLeft();
    timeLeft.value = newTimeLeft;

    if (
      newTimeLeft.days === 0 &&
      newTimeLeft.hours === 0 &&
      newTimeLeft.minutes === 0 &&
      newTimeLeft.seconds === 0
    ) {
      if (timer) clearInterval(timer);
      emit('complete');
    }
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
```

---

## 📱 响应式设计规范

### 断点系统

遵循 Tailwind 默认断点：

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // 手机横屏
      'md': '768px',   // 平板
      'lg': '1024px',  // 笔记本
      'xl': '1280px',  // 桌面
      '2xl': '1536px', // 大屏
    },
  },
}
```

### 响应式字体规范

```css
/* Mobile First 方法 */

/* 基础（移动端） */
.text-display { font-size: 36px; line-height: 1.1; }
.text-h1 { font-size: 28px; line-height: 1.2; }
.text-h2 { font-size: 24px; line-height: 1.25; }
.text-h3 { font-size: 20px; line-height: 1.3; }

/* 平板 (md: 768px+) */
@media (min-width: 768px) {
  .text-display { font-size: 56px; }
  .text-h1 { font-size: 40px; }
  .text-h2 { font-size: 32px; }
  .text-h3 { font-size: 24px; }
}

/* 桌面 (lg: 1024px+) */
@media (min-width: 1024px) {
  .text-display { font-size: 72px; }
  .text-h1 { font-size: 48px; }
  .text-h2 { font-size: 36px; }
  .text-h3 { font-size: 28px; }
}
```

### 响应式间距规范

```css
/* 容器内边距 */
.container-custom {
  padding-left: 1rem;   /* 16px mobile */
  padding-right: 1rem;
}

@media (min-width: 768px) {
  .container-custom {
    padding-left: 3rem;  /* 48px tablet */
    padding-right: 3rem;
  }
}

@media (min-width: 1024px) {
  .container-custom {
    padding-left: 5rem;  /* 80px desktop */
    padding-right: 5rem;
  }
}

/* Section 间距 */
.section {
  padding-top: 3rem;     /* 48px mobile */
  padding-bottom: 3rem;
}

@media (min-width: 768px) {
  .section {
    padding-top: 5rem;   /* 80px tablet */
    padding-bottom: 5rem;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-top: 8rem;   /* 128px desktop */
    padding-bottom: 8rem;
  }
}
```

### 响应式布局示例

```tsx
// Hero Section - 响应式布局
<section className="section">
  <div className="container-custom">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* 文字内容 - 移动端在上，桌面端在左 */}
      <div className="order-2 lg:order-1 text-center lg:text-left">
        <h1 className="text-h1 md:text-display mb-4 md:mb-6">
          Rootstock 3000 Days
        </h1>
        <p className="text-body md:text-body-lg mb-6 md:mb-8">
          Celebrating innovation and community
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button variant="primary" size="lg">
            Claim Your SBT
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>

      {/* 图片 - 移动端在下，桌面端在右 */}
      <div className="order-1 lg:order-2">
        <img
          src="/hero-illustration.svg"
          alt="Hero"
          className="w-full max-w-md mx-auto lg:max-w-full"
        />
      </div>
    </div>
  </div>
</section>
```

---

## ✨ 动画和交互效果

### 页面加载动画

```tsx
// PageTransition.tsx
import { motion } from 'framer-motion';

export const PageTransition: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};
```

### 滚动触发动画

```tsx
// ScrollReveal.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const ScrollReveal: FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// 使用示例
<ScrollReveal delay={0.2}>
  <Card>
    <CardTitle>Feature 1</CardTitle>
    <CardContent>Description here</CardContent>
  </Card>
</ScrollReveal>
```

### 数字滚动动画

```tsx
// CounterAnimation.tsx
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const CounterAnimation: FC<{
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}> = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// 使用示例
<div className="text-6xl font-bold text-rootstock-lime">
  <CounterAnimation end={3000} suffix=" DAYS" />
</div>
```

### Hover 交互效果

```css
/* 卡片 hover 效果 */
.card-interactive {
  @apply transition-all duration-300;
  @apply hover:-translate-y-2;
  @apply hover:shadow-glow-orange;
  @apply hover:border-rootstock-orange;
}

/* 按钮 hover 效果 */
.btn-interactive {
  @apply relative overflow-hidden;
  @apply transition-transform duration-300;
}

.btn-interactive::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-interactive:hover::before {
  width: 300px;
  height: 300px;
}

.btn-interactive:active {
  transform: scale(0.95);
}

/* 图片 zoom 效果 */
.image-zoom-container {
  @apply overflow-hidden rounded-md;
}

.image-zoom {
  @apply transition-transform duration-500 ease-out;
}

.image-zoom-container:hover .image-zoom {
  @apply scale-110;
}
```

---

## 🚀 SBT 项目集成步骤

### Step 1: 安装依赖

```bash
# 基础依赖
npm install tailwindcss postcss autoprefixer

# UI 组件辅助
npm install class-variance-authority clsx tailwind-merge

# 动画库
npm install framer-motion

# 工具库
npm install date-fns

# React 专用
npm install react-intersection-observer

# Vue 专用 (如果使用 Vue)
npm install @vueuse/core
```

### Step 2: 配置 Tailwind

```bash
# 初始化 Tailwind
npx tailwindcss init -p

# 复制上面的 tailwind.config.js 内容到生成的文件
# 复制上面的 globals.css 内容到 src/styles/globals.css
```

### Step 3: 添加工具函数

`lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化数字
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

// 格式化日期
export function formatDate(date: Date, format: string = 'PPP'): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// 截断地址
export function truncateAddress(address: string, start: number = 6, end: number = 4): string {
  if (!address) return '';
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

// 复制到剪贴板
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}
```

### Step 4: 创建完整页面示例

`pages/index.tsx` (Rootstock 3000 SBT 首页):

```tsx
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CountdownTimer } from '@/components/CountdownTimer';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function Home() {
  const targetDate = new Date('2026-12-31');
  const totalSupply = 3000;
  const claimed = 1247;

  return (
    <div className="min-h-screen bg-rootstock-black">
      {/* Hero Section */}
      <section className="section relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-radial-glow opacity-50" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge color="lime" size="lg" className="mb-6">
              Limited Edition
            </Badge>

            <h1 className="text-display mb-6 text-gradient-orange animate-fade-in-up">
              ROOTSTOCK 3000 DAYS
            </h1>

            <p className="text-body-lg text-rootstock-offwhite/80 mb-12">
              Celebrating 3000 days of innovation, security, and community growth on Rootstock.
              Claim your exclusive Soul Bound Token now.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button variant="primary" size="lg">
                🎁 Claim Your SBT
              </Button>
              <Button variant="outline" size="lg">
                📖 Learn More
              </Button>
            </div>

            {/* Countdown */}
            <div className="mb-12">
              <p className="text-body uppercase tracking-wider text-rootstock-offwhite/60 mb-6">
                Time Until Celebration Ends
              </p>
              <CountdownTimer targetDate={targetDate} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-rootstock-black-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0}>
              <Card hover glow="orange" className="text-center">
                <div className="text-6xl font-bold text-rootstock-orange mb-4">
                  3000
                </div>
                <div className="text-body-sm text-rootstock-offwhite/60 uppercase">
                  Days of Innovation
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card hover glow="pink" className="text-center">
                <div className="text-6xl font-bold text-rootstock-pink mb-4">
                  {claimed.toLocaleString()}
                </div>
                <div className="text-body-sm text-rootstock-offwhite/60 uppercase">
                  SBTs Claimed
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <Card hover glow="lime" className="text-center">
                <div className="text-6xl font-bold text-rootstock-lime mb-4">
                  {totalSupply.toLocaleString()}
                </div>
                <div className="text-body-sm text-rootstock-offwhite/60 uppercase">
                  Total Supply
                </div>
              </Card>
            </ScrollReveal>
          </div>

          {/* Progress Bar */}
          <div className="mt-16 max-w-2xl mx-auto">
            <ProgressBar
              value={claimed}
              max={totalSupply}
              label="Claim Progress"
              color="orange"
              height="lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-h2 mb-4">WHY CLAIM YOUR SBT?</h2>
            <p className="text-body text-rootstock-offwhite/60 max-w-2xl mx-auto">
              This Soul Bound Token represents your participation in the Rootstock ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🏆',
                title: 'Exclusive Badge',
                description: 'A non-transferable digital badge proving you were part of this milestone',
                color: 'orange',
              },
              {
                icon: '🎁',
                title: 'Future Benefits',
                description: 'Potential access to future airdrops and exclusive events',
                color: 'pink',
              },
              {
                icon: '🌐',
                title: 'Community Recognition',
                description: 'Show your support and commitment to the Rootstock ecosystem',
                color: 'lime',
              },
              {
                icon: '🔒',
                title: 'Soul Bound',
                description: 'Cannot be transferred or sold - truly yours forever',
                color: 'purple',
              },
              {
                icon: '✨',
                title: 'Limited Edition',
                description: 'Only 3000 tokens will ever exist',
                color: 'green',
              },
              {
                icon: '🚀',
                title: 'On-Chain Proof',
                description: 'Permanent record on the Rootstock blockchain',
                color: 'cyan',
              },
            ].map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <Card hover glow={feature.color as any}>
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {feature.description}
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-orange-pink">
        <div className="container-custom text-center">
          <h2 className="text-h2 text-rootstock-black mb-6">
            READY TO CLAIM YOUR SBT?
          </h2>
          <p className="text-body text-rootstock-black/80 mb-8 max-w-2xl mx-auto">
            Connect your wallet and claim your exclusive Rootstock 3000 Days Soul Bound Token
          </p>
          <Button variant="secondary" size="lg">
            Connect Wallet
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-rootstock-offwhite/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-caption text-rootstock-offwhite/60">
              © 2026 Rootstock. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Badge color="orange">Twitter</Badge>
              <Badge color="pink">Discord</Badge>
              <Badge color="lime">Documentation</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

---

## ⚡ 性能优化建议

### 1. 图片优化

```tsx
// 使用 Next.js Image 组件
import Image from 'next/image';

<Image
  src="/rootstock-logo.svg"
  alt="Rootstock Logo"
  width={200}
  height={60}
  priority // 首屏图片预加载
  className="w-auto h-auto"
/>

// 或使用 lazy loading
<img
  src="/illustration.svg"
  alt="Illustration"
  loading="lazy"
  className="w-full"
/>
```

### 2. 代码分割

```tsx
// 动态导入组件
import dynamic from 'next/dynamic';

const CountdownTimer = dynamic(() => import('@/components/CountdownTimer'), {
  ssr: false, // 禁用服务端渲染（如果组件依赖浏览器 API）
  loading: () => <div>Loading...</div>,
});
```

### 3. CSS 优化

```javascript
// tailwind.config.js
module.exports = {
  // 生产环境移除未使用的 CSS
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  // 启用 JIT 模式（按需生成）
  mode: 'jit',
}
```

### 4. 字体优化

```tsx
// pages/_document.tsx (Next.js)
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* 预加载字体 */}
        <link
          rel="preload"
          href="/fonts/RootstockSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/RootstockSans-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

## ♿ 可访问性指南

### ARIA 标签

```tsx
// 正确的 ARIA 使用
<button
  aria-label="Claim your Rootstock 3000 SBT"
  aria-describedby="claim-description"
  onClick={handleClaim}
>
  Claim SBT
</button>
<p id="claim-description" className="sr-only">
  Connect your wallet to claim your exclusive Soul Bound Token
</p>
```

### 键盘导航

```tsx
// 确保所有交互元素可键盘访问
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  onClick={handleClick}
>
  Click me
</div>
```

### 颜色对比度

```css
/* 确保文字颜色对比度符合 WCAG AA 标准（至少 4.5:1） */

/* ✅ 好的对比度 */
.text-on-dark {
  background: #000000; /* Black */
  color: #FAFAF5;      /* Off White - 对比度约 19:1 */
}

.text-on-lime {
  background: #DEFF1A; /* Lime */
  color: #000000;      /* Black - 对比度约 15:1 */
}

/* ❌ 避免低对比度组合 */
.bad-contrast {
  background: #9E75FF; /* Purple */
  color: #FF70E0;      /* Pink - 对比度不足 */
}
```

### Skip to Content

```tsx
// 添加跳转到主内容的链接
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-rootstock-orange focus:text-rootstock-black"
>
  Skip to main content
</a>

<main id="main-content">
  {/* 主要内容 */}
</main>
```

---

## 📚 总结

这份实战应用手册包含：

✅ **完整的 Tailwind 配置** - 即用型配置文件
✅ **React 组件库** - Button, Card, Badge, Countdown, Progress 等
✅ **Vue 组件库** - 对应的 Vue 3 Composition API 版本
✅ **响应式设计规范** - 断点、字体、间距、布局
✅ **动画和交互效果** - Framer Motion、滚动动画、数字动画
✅ **完整页面示例** - Rootstock 3000 SBT 首页
✅ **性能优化建议** - 图片、代码分割、CSS、字体
✅ **可访问性指南** - ARIA、键盘导航、对比度

**下一步行动**：
1. 复制 `tailwind.config.js` 到项目
2. 复制 `globals.css` 到 `src/styles/`
3. 复制所需组件到 `components/` 目录
4. 开始开发 Rootstock 3000 SBT DApp！

---

**📄 文档版本**: v1.0 Implementation Guide
**最后更新**: 2026-03-20
**配合使用**: ROOTSTOCK_ULTRA_DETAILED_BRAND_GUIDE.md
**整理者**: Piggyx
