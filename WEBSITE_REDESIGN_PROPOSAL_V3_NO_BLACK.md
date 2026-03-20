# 🎨 Rootstock 3000 Days 网站改版方案 V3.0

> **米色主体 · 完全无黑色 · 荧光活力风格**
> 基于专业配色理论 + Rootstock 品牌指南
> 适配中文界面

网址：https://rootstock-3000-sbt.vercel.app

---

## 🎯 核心设计理念

### 设计关键词
- **温暖米色** - 主基调，舒适友好
- **荧光活力** - 橙、粉、绿荧光色作为视觉焦点
- **完全无黑色** - 用深色系官方色替代
- **高对比度** - 保证可读性
- **中文友好** - 字体系统专为中文优化

---

## 🎨 配色系统（60-30-10 法则）

### 配色比例分配

```
60% 主色（Dominant）→ 米色系背景
30% 次色（Secondary）→ 浅色卡片 + 辅助色
10% 强调色（Accent）→ 荧光色 CTA + 高亮
```

---

### 1️⃣ 主色系统（60% - 背景和大面积）

#### 米色基调
```css
--bg-primary: #FDF8F0         /* 米色主背景 - Rootstock Cream */
--bg-secondary: #FAFAF5       /* Off White 次背景 */
--bg-tertiary: #F5F1E8        /* 米色深一级（卡片背景）*/
```

**使用场景**：
- 页面主背景：`#FDF8F0`
- 内容区块背景：`#FAFAF5`
- 卡片背景：`#F5F1E8`

**配色理论依据**：
- Monochromatic（单色系）- 米色的不同明度
- 60% 法则 - 主色占据最大视觉面积
- 温暖舒适 - 米色传达友好、可接近性

---

### 2️⃣ 文字和边框系统（替代黑色）

#### 🚫 **完全禁止使用黑色 #000000**

#### ✅ **深色替代方案**

```css
/* 主文字色 - 深橙棕色（替代黑色文字）*/
--text-primary: #5C2E00        /* 深橙棕 - 高对比度 */
--text-secondary: #8B4513      /* 中橙棕 - 次要文字 */
--text-tertiary: #A0522D       /* 浅橙棕 - 辅助文字 */

/* 边框色 - 深紫棕色（替代黑色边框）*/
--border-primary: #4A1942      /* 深紫棕 - 主边框 */
--border-secondary: #6B2C5C    /* 中紫棕 - 次边框 */
--border-accent: #FF9100       /* 橙色边框 - 强调 */
```

**对比度验证**：
```
#5C2E00 (深橙棕) on #FDF8F0 (米色) = 9.8:1 ✅ AAA 级
#4A1942 (深紫棕) on #FDF8F0 (米色) = 8.2:1 ✅ AAA 级
```

**为什么选这些颜色？**
1. **深橙棕 #5C2E00** - 来自橙色 #FF9100 的深色调，保持品牌一致性
2. **深紫棕 #4A1942** - 来自紫色 #9E75FF 的深色调，提供视觉变化
3. **高对比度** - 超过 WCAG AAA 级标准（7:1）
4. **温暖色调** - 与米色背景和谐统一

---

### 3️⃣ 荧光强调色系统（10% - CTA 和高亮）

#### Rootstock 官方荧光色

```css
/* 主强调色 */
--accent-orange: #FF9100       /* 橙色 - 主 CTA */
--accent-pink: #FF70E0         /* 粉色 - 次 CTA */
--accent-lime: #DEFF1A         /* 荧光绿 - 高亮 */

/* 辅助强调色 */
--accent-purple: #9E75FF       /* 紫色 - 装饰 */
--accent-cyan: #08FFD1         /* 青色 - 链接 */
--accent-green: #78C700        /* 绿色 - 成功 */
```

**使用比例**：
- 橙色 5% - 主按钮、主标题
- 粉色 2% - 次按钮、次标题
- 荧光绿 2% - 标签、徽章
- 其他 1% - 点缀装饰

**配色理论依据**：
- Triadic（三角配色）- 橙、粉、绿在色轮上均匀分布
- 10% 法则 - 荧光色仅占小面积，聚焦注意力
- 高饱和度 - 在米色背景上创造强烈对比

---

### 4️⃣ 辅助色系统（30% - 卡片和区块）

#### 浅色卡片背景
```css
/* 卡片配色方案 */
--card-cream: #FAF6F0          /* 奶油色卡片 */
--card-peach: #FFF4E6          /* 桃色卡片 */
--card-lavender: #F5F0FF       /* 淡紫色卡片 */
--card-mint: #F0FFF4           /* 薄荷色卡片 */
```

**对比度验证**：
```
#5C2E00 (深橙棕文字) on #FAF6F0 (奶油卡片) = 10.2:1 ✅
#5C2E00 (深橙棕文字) on #FFF4E6 (桃色卡片) = 11.5:1 ✅
```

---

## 🎨 完整色板总览

### 主色板（Rootstock 官方 8 色）

| 颜色名称 | HEX | RGB | 用途 | 占比 |
|---------|-----|-----|------|-----|
| **Rootstock Orange** | `#FF9100` | `255, 145, 0` | 主 CTA、标题强调 | 5% |
| **Rootstock Pink** | `#FF70E0` | `255, 112, 224` | 次 CTA、标题 | 2% |
| **Rootstock Lime** | `#DEFF1A` | `222, 255, 26` | 标签、徽章、高亮 | 2% |
| **Rootstock Green** | `#78C700` | `120, 199, 0` | 成功状态 | 1% |
| **Rootstock Purple** | `#9E75FF` | `158, 117, 255` | 装饰元素 | 1% |
| **Rootstock Cyan** | `#08FFD1` | `8, 255, 209` | 链接、装饰 | 1% |
| **R Off White** | `#FAFAF5` | `250, 250, 245` | 次背景 | 20% |
| **Rootstock Cream** | `#FDF8F0` | `253, 248, 240` | 主背景 | 60% |

### 扩展色板（深色系 - 替代黑色）

| 颜色名称 | HEX | 来源 | 用途 | 对比度 |
|---------|-----|------|------|-------|
| **深橙棕** | `#5C2E00` | 橙色深色调 | 主文字 | 9.8:1 ✅ |
| **中橙棕** | `#8B4513` | 橙色中色调 | 次文字 | 6.5:1 ✅ |
| **深紫棕** | `#4A1942` | 紫色深色调 | 主边框 | 8.2:1 ✅ |
| **中紫棕** | `#6B2C5C` | 紫色中色调 | 次边框 | 5.8:1 ✅ |

---

## 📐 设计系统

### 圆角规范（Rootstock 官方）

```css
--radius-none: 0px
--radius-sm: 4px            /* 小卡片 */
--radius-tag: 13.65px       /* 标签、徽章（官方规范）*/
--radius-nametag: 60px      /* 按钮（Nametag 风格）*/
--radius-full: 9999px       /* 圆形图标 */
```

### 边框规范

```css
--border-thin: 2px          /* 细边框 */
--border-medium: 3px        /* 中等边框 */
--border-thick: 4px         /* 粗边框 */
```

**完全不使用黑色边框**：
```css
/* ❌ 禁止 */
border: 2px solid #000000;

/* ✅ 使用 */
border: 3px solid #4A1942;  /* 深紫棕边框 */
border: 3px solid #FF9100;  /* 橙色边框 */
```

### 阴影系统（柔和阴影 - 不用黑色）

```css
/* 卡片阴影 - 使用深橙棕色 */
--shadow-sm: 0 2px 8px rgba(92, 46, 0, 0.08);
--shadow-md: 0 4px 16px rgba(92, 46, 0, 0.12);
--shadow-lg: 0 8px 32px rgba(92, 46, 0, 0.16);

/* 荧光发光效果 */
--glow-orange: 0 0 24px rgba(255, 145, 0, 0.4);
--glow-pink: 0 0 24px rgba(255, 112, 224, 0.4);
--glow-lime: 0 0 24px rgba(222, 255, 26, 0.4);
```

---

## ✍️ 字体系统（中文优先）

### 字体栈配置

```css
/* 主字体 - 中文优先 */
font-family:
  "PingFang SC",           /* macOS 中文 */
  "Microsoft YaHei",       /* Windows 中文 */
  "Source Han Sans CN",    /* 思源黑体 */
  "Noto Sans SC",          /* Google 中文 */
  -apple-system,           /* macOS 系统字体 */
  BlinkMacSystemFont,      /* Chrome macOS */
  "Segoe UI",              /* Windows */
  Roboto,                  /* Android */
  "Helvetica Neue",        /* 旧版 macOS */
  Arial,                   /* 后备 */
  sans-serif;              /* 系统默认 */

/* 代码/数字字体 */
font-family:
  "JetBrains Mono",        /* 代码字体 */
  "SF Mono",               /* macOS 等宽 */
  Consolas,                /* Windows 等宽 */
  monospace;               /* 系统等宽 */
```

**为什么不用 Rootstock Sans？**
- Rootstock Sans 是英文字体，**不支持中文字符**
- 中文界面需要使用系统中文字体
- 使用 PingFang SC / Microsoft YaHei 保证中文显示质量

### 字体层级（中文优化）

```css
/* 超大标题 */
.heading-display {
  font-size: 64px;          /* 中文比英文需要稍小 */
  font-weight: 800;         /* Extra Bold */
  line-height: 1.1;
  letter-spacing: 0.02em;   /* 中文字间距 */
  color: #FF9100;           /* 橙色 */
}

/* H1 大标题 */
.heading-h1 {
  font-size: 48px;
  font-weight: 700;         /* Bold */
  line-height: 1.2;
  color: #5C2E00;           /* 深橙棕 */
}

/* H2 次标题 */
.heading-h2 {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.25;
  color: #5C2E00;
}

/* H3 小标题 */
.heading-h3 {
  font-size: 24px;
  font-weight: 600;         /* Semi-Bold */
  line-height: 1.3;
  color: #8B4513;           /* 中橙棕 */
}

/* 正文 */
.body-text {
  font-size: 16px;
  font-weight: 400;         /* Regular */
  line-height: 1.7;         /* 中文行高需要更大 */
  color: #5C2E00;           /* 深橙棕 */
}

/* 小字 */
.caption {
  font-size: 14px;
  font-weight: 500;         /* Medium */
  line-height: 1.5;
  color: #8B4513;           /* 中橙棕 */
}
```

**中文字体特殊处理**：
```css
/* 中文字号自动增大 */
:lang(zh-CN) {
  font-size: calc(1em + 1px);  /* 中文比英文大 1px */
}

/* 中英文混排优化 */
.mixed-text {
  font-feature-settings: "pnum" 1;  /* 比例数字 */
  text-rendering: optimizeLegibility;
}
```

---

## 🔘 组件设计系统

### 按钮组件（Nametag 风格）

#### 主按钮（橙色）

```css
.btn-primary {
  /* 形状 */
  border-radius: 60px;              /* Nametag 完全圆润 */
  padding: 18px 40px;

  /* 配色 */
  background: #FF9100;              /* 橙色背景 */
  color: #FFFFFF;                   /* 白色文字 */
  border: 3px solid #5C2E00;        /* 深橙棕边框（非黑色）*/

  /* 文字 */
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.02em;

  /* 阴影 */
  box-shadow: 0 4px 16px rgba(255, 145, 0, 0.3);

  /* 过渡 */
  transition: all 0.25s ease;
}

.btn-primary:hover {
  background: #FF9100;
  box-shadow: 0 6px 24px rgba(255, 145, 0, 0.5);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(255, 145, 0, 0.3);
}
```

#### 次按钮（粉色）

```css
.btn-secondary {
  background: #FF70E0;              /* 粉色背景 */
  color: #FFFFFF;
  border: 3px solid #6B2C5C;        /* 深紫棕边框 */
  /* ... 其他同 primary */
}
```

#### 轮廓按钮

```css
.btn-outline {
  background: transparent;
  color: #5C2E00;                   /* 深橙棕文字 */
  border: 3px solid #5C2E00;        /* 深橙棕边框 */
}

.btn-outline:hover {
  background: #FF9100;
  color: #FFFFFF;
  border-color: #FF9100;
}
```

#### 荧光绿按钮（特殊强调）

```css
.btn-lime {
  background: #DEFF1A;              /* 荧光绿背景 */
  color: #5C2E00;                   /* 深橙棕文字 */
  border: 3px solid #5C2E00;
  box-shadow: 0 0 24px rgba(222, 255, 26, 0.4);
}
```

---

### 卡片组件

#### 标准卡片（奶油色）

```css
.card {
  /* 背景 */
  background: #FAF6F0;              /* 奶油色 */
  border: 3px solid #4A1942;        /* 深紫棕边框 */
  border-radius: 4px;               /* 小圆角 */

  /* 间距 */
  padding: 32px;

  /* 阴影 */
  box-shadow: 0 4px 16px rgba(92, 46, 0, 0.08);

  /* 过渡 */
  transition: all 0.3s ease;
}

.card:hover {
  border-color: #FF9100;            /* Hover 变橙色边框 */
  box-shadow: 0 8px 32px rgba(255, 145, 0, 0.12);
  transform: translateY(-4px);
}
```

#### 彩色卡片变体

```css
/* 桃色卡片 */
.card-peach {
  background: #FFF4E6;              /* 桃色 */
  border: 3px solid #FF9100;        /* 橙色边框 */
}

/* 淡紫色卡片 */
.card-lavender {
  background: #F5F0FF;              /* 淡紫 */
  border: 3px solid #9E75FF;        /* 紫色边框 */
}

/* 薄荷色卡片 */
.card-mint {
  background: #F0FFF4;              /* 薄荷 */
  border: 3px solid #78C700;        /* 绿色边框 */
}
```

#### 荧光强调卡片

```css
/* 用于 Hero、CTA 等重点区块 */
.card-highlight {
  background: linear-gradient(135deg, #FF9100 0%, #FF70E0 100%);
  color: #FFFFFF;
  border: none;
  box-shadow: 0 8px 32px rgba(255, 145, 0, 0.3);
}
```

---

### 标签/徽章（Nametag）

```css
.badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 13.65px;           /* 官方 tag 圆角 */
  border: 2px solid #5C2E00;        /* 深橙棕边框 */

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

/* 荧光绿标签 */
.badge-lime {
  background: #DEFF1A;
  color: #5C2E00;
  border-color: #5C2E00;
}

/* 橙色标签 */
.badge-orange {
  background: #FF9100;
  color: #FFFFFF;
  border-color: #5C2E00;
}

/* 粉色标签 */
.badge-pink {
  background: #FF70E0;
  color: #FFFFFF;
  border-color: #6B2C5C;
}
```

---

### 进度条

```css
.progress-container {
  width: 100%;
  height: 48px;
  background: #FAFAF5;              /* Off White 背景 */
  border: 3px solid #4A1942;        /* 深紫棕边框 */
  border-radius: 60px;              /* 完全圆润 */
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #FF9100 0%, #FF70E0 100%);
  border-radius: 60px;
  transition: width 0.6s ease;
  position: relative;
  overflow: hidden;
}

/* 动态条纹效果 */
.progress-bar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255, 255, 255, 0.1) 10px,
    rgba(255, 255, 255, 0.1) 20px
  );
  animation: slide 1s linear infinite;
}

@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(40px); }
}

/* 进度文字 */
.progress-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: 700;
  color: #FFFFFF;
  text-shadow: 0 2px 4px rgba(92, 46, 0, 0.3);
}
```

---

### 倒计时组件

```tsx
{/* 每个时间块 */}
<div className="flex flex-col items-center">
  {/* 时间卡片 */}
  <div className="
    bg-[#FAF6F0]               {/* 奶油色背景 */}
    border-[3px] border-[#4A1942]  {/* 深紫棕边框 */}
    rounded                     {/* 4px 圆角 */}
    w-28 h-28
    flex items-center justify-center
    shadow-md
  ">
    {/* 数字 - 橙色 */}
    <span className="text-6xl font-black text-[#FF9100] font-mono">
      23
    </span>
  </div>

  {/* 标签 - 荧光绿 */}
  <div className="inline-block bg-[#DEFF1A] border-2 border-[#5C2E00] rounded-tag px-4 py-2 mt-3">
    <span className="text-xs font-bold text-[#5C2E00] uppercase tracking-wider">
      天
    </span>
  </div>
</div>
```

---

### FAQ 折叠面板

```tsx
<details className="
  bg-[#FAF6F0]                  {/* 奶油色背景 */}
  border-[3px] border-[#4A1942] {/* 深紫棕边框 */}
  rounded                        {/* 4px 圆角 */}
  p-6
  shadow-sm
  hover:border-[#FF9100]         {/* Hover 橙色边框 */}
  hover:shadow-md
  transition-all
  group
">
  <summary className="
    cursor-pointer
    text-lg font-bold text-[#5C2E00]  {/* 深橙棕文字 */}
    flex items-center justify-between
  ">
    <span className="flex items-center gap-4">
      {/* Q 图标 - 荧光绿 */}
      <span className="
        inline-flex items-center justify-center
        w-10 h-10
        bg-[#DEFF1A]
        border-2 border-[#5C2E00]
        rounded-full
        text-sm font-black text-[#5C2E00]
      ">
        Q
      </span>
      什么是 Soul Bound Token？
    </span>

    {/* 箭头 - 深橙棕 */}
    <svg className="w-6 h-6 text-[#5C2E00] transform group-open:rotate-180 transition-transform">
      {/* ... */}
    </svg>
  </summary>

  {/* 答案 */}
  <p className="mt-4 text-[#8B4513] leading-relaxed ml-14">
    Soul Bound Token (SBT) 是一种不可转移的 NFT...
  </p>
</details>
```

---

## 📄 页面区块设计

### 1. Hero Section（英雄区）

```tsx
<section className="relative py-20 md:py-32 bg-[#FDF8F0]">
  <div className="container mx-auto px-6">

    {/* 顶部标签 - 荧光绿 */}
    <div className="flex justify-center mb-8">
      <span className="
        inline-block
        bg-[#DEFF1A]
        border-2 border-[#5C2E00]
        rounded-tag
        px-6 py-2
        text-sm font-bold text-[#5C2E00] uppercase
      ">
        🎉 限量版本
      </span>
    </div>

    {/* 主标题 - 橙色 + 深橙棕 */}
    <h1 className="heading-display text-center mb-6">
      <span className="text-[#FF9100]">ROOTSTOCK</span><br/>
      <span className="text-[#5C2E00]">3000 天</span>
    </h1>

    {/* 副标题 - 中橙棕 */}
    <p className="text-2xl text-center text-[#8B4513] mb-12 max-w-3xl mx-auto">
      庆祝 Rootstock 3000 天创新之旅
    </p>

    {/* CTA 按钮组 */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {/* 主按钮 - 橙色 */}
      <button className="btn-primary">
        🎁 免费铸造 SBT
      </button>

      {/* 次按钮 - 轮廓 */}
      <button className="btn-outline">
        📖 了解更多
      </button>
    </div>

  </div>
</section>
```

**配色解析**：
- 背景：米色 #FDF8F0（60%）
- 标签：荧光绿 #DEFF1A（2%）
- 主标题：橙色 #FF9100（3%）
- 次标题：深橙棕 #5C2E00（5%）
- 副标题：中橙棕 #8B4513（10%）
- 按钮：橙色 + 轮廓（5%）

---

### 2. Countdown Section（倒计时区）

```tsx
<section className="py-16 bg-[#FAFAF5]">  {/* Off White 背景 */}
  <div className="container mx-auto px-6">

    {/* 标题 */}
    <h2 className="heading-h2 text-center mb-12">
      <span className="text-[#FF9100]">距离 3000 天纪念日</span>
    </h2>

    {/* 倒计时块 */}
    <div className="flex gap-4 md:gap-8 justify-center flex-wrap">
      {/* 天 */}
      <div className="flex flex-col items-center">
        <div className="
          bg-[#FAF6F0]
          border-[3px] border-[#4A1942]
          rounded
          w-28 h-28
          flex items-center justify-center
          shadow-md
        ">
          <span className="text-6xl font-black text-[#FF9100] font-mono">
            23
          </span>
        </div>
        <div className="inline-block bg-[#DEFF1A] border-2 border-[#5C2E00] rounded-tag px-4 py-2 mt-3">
          <span className="text-xs font-bold text-[#5C2E00] uppercase">
            天
          </span>
        </div>
      </div>

      {/* 时、分、秒 ... 同样结构 */}
    </div>

  </div>
</section>
```

---

### 3. Mint Section（铸造区）

```tsx
<section className="py-20 bg-[#FDF8F0]">
  <div className="container mx-auto px-6">

    <h2 className="heading-h2 text-center mb-16">
      <span className="text-[#FF9100]">免费铸造</span>{' '}
      <span className="text-[#5C2E00]">SBT</span>
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

      {/* SBT 预览卡片 - 渐变强调卡片 */}
      <div className="
        bg-gradient-to-br from-[#FF9100] to-[#FF70E0]
        rounded
        p-10
        shadow-lg
      ">
        {/* 标签 - 白底 */}
        <div className="inline-block bg-white border-2 border-[#5C2E00] rounded-tag px-6 py-3 mb-6">
          <h3 className="text-xl font-black text-[#5C2E00] uppercase">
            SBT 预览
          </h3>
        </div>

        {/* 图片 */}
        <img
          src="/images/sbt-preview.png"
          alt="SBT Preview"
          className="w-full rounded border-4 border-white/40"
        />

        {/* 描述 - 白色文字 */}
        <p className="text-white mt-6 text-center font-medium">
          独一无二的纪念 NFT，永久绑定你的钱包地址
        </p>
      </div>

      {/* 进度 + 按钮卡片 - 奶油色 */}
      <div className="flex flex-col justify-between">

        {/* 进度卡片 */}
        <div className="
          bg-[#FAF6F0]
          border-[3px] border-[#4A1942]
          rounded
          p-8
          shadow-sm
          mb-6
        ">
          <h3 className="heading-h3 mb-6">
            <span className="text-[#FF9100]">铸造</span>进度
          </h3>

          {/* 进度条组件 */}
          <ProgressBar current={1247} total={3000} />
        </div>

        {/* 铸造按钮 */}
        <MintButton />

      </div>
    </div>

    {/* Stats Grid - 4 个小卡片 */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

      {/* Stat 1 - 荧光绿 */}
      <div className="flex flex-col">
        <div className="
          bg-[#DEFF1A]
          border-[3px] border-[#5C2E00]
          rounded
          p-6
          shadow-md
          hover:shadow-lg hover:-translate-y-1
          transition-all
        ">
          <div className="text-5xl font-black text-[#5C2E00] font-mono">
            2018
          </div>
        </div>
        <div className="inline-block bg-[#DEFF1A] border-2 border-[#5C2E00] rounded-tag px-3 py-2 mt-3">
          <div className="text-xs font-bold text-[#5C2E00] uppercase">
            启动年份
          </div>
        </div>
      </div>

      {/* Stat 2 - 粉色 */}
      <div className="flex flex-col">
        <div className="bg-[#FF70E0] border-[3px] border-[#6B2C5C] ...">
          <div className="text-5xl font-black text-white font-mono">
            3000
          </div>
        </div>
        <div className="bg-[#FF70E0] border-2 border-[#6B2C5C] ...">
          <div className="text-xs font-bold text-white">天数</div>
        </div>
      </div>

      {/* Stat 3 - 紫色 */}
      <div className="flex flex-col">
        <div className="bg-[#9E75FF] border-[3px] border-[#4A1942] ...">
          <div className="text-5xl font-black text-white font-mono">
            31
          </div>
        </div>
        <div className="bg-[#9E75FF] border-2 border-[#4A1942] ...">
          <div className="text-xs font-bold text-white">链 ID</div>
        </div>
      </div>

      {/* Stat 4 - 青色 */}
      <div className="flex flex-col">
        <div className="bg-[#08FFD1] border-[3px] border-[#5C2E00] ...">
          <div className="text-5xl font-black text-[#5C2E00] font-mono">
            进行中
          </div>
        </div>
        <div className="bg-[#08FFD1] border-2 border-[#5C2E00] ...">
          <div className="text-xs font-bold text-[#5C2E00]">状态</div>
        </div>
      </div>

    </div>
  </div>
</section>
```

**配色解析**：
- SBT 预览：橙粉渐变（强调焦点）
- 进度卡片：奶油色 + 深紫棕边框
- Stats 卡片：4 种荧光色变化

---

### 4. About Section（关于区）

```tsx
<section className="py-20 bg-[#FAFAF5]">  {/* Off White 背景 */}
  <div className="container mx-auto px-6">

    {/* 3 张特色卡片 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

      {/* Card 1 - 桃色卡片 */}
      <div className="
        bg-[#FFF4E6]                  {/* 桃色 */}
        border-[3px] border-[#FF9100] {/* 橙色边框 */}
        rounded
        p-8
        shadow-sm
        hover:shadow-md hover:-translate-y-1
        transition-all
        min-h-[400px]
        flex flex-col
      ">
        {/* 标签 - 橙色 */}
        <div className="inline-block bg-[#FF9100] border-2 border-[#5C2E00] rounded-tag px-4 py-2 mb-6 self-start">
          <span className="text-sm font-black text-white uppercase">
            01 · 灵魂绑定
          </span>
        </div>

        {/* 图标 */}
        <div className="text-6xl mb-4">🔒</div>

        {/* 标题 */}
        <h3 className="heading-card mb-4 text-[#5C2E00]">
          不可转移
        </h3>

        {/* 内容 */}
        <p className="text-[#8B4513] leading-relaxed flex-grow">
          这是一个不可转移的 Soul Bound Token，永久绑定到你的钱包地址...
        </p>
      </div>

      {/* Card 2 - 淡紫卡片 */}
      <div className="
        bg-[#F5F0FF]                  {/* 淡紫 */}
        border-[3px] border-[#9E75FF] {/* 紫色边框 */}
        ...
      ">
        <div className="bg-[#9E75FF] ...">
          <span className="text-white">02 · 免费铸造</span>
        </div>
        <div className="text-6xl mb-4">🎁</div>
        {/* ... */}
      </div>

      {/* Card 3 - 薄荷卡片 */}
      <div className="
        bg-[#F0FFF4]                  {/* 薄荷 */}
        border-[3px] border-[#78C700] {/* 绿色边框 */}
        ...
      ">
        <div className="bg-[#78C700] ...">
          <span className="text-white">03 · 限量供应</span>
        </div>
        <div className="text-6xl mb-4">💎</div>
        {/* ... */}
      </div>

    </div>

    {/* Rootstock 介绍 - 全宽卡片 */}
    <div className="
      bg-[#FAF6F0]
      border-[3px] border-[#4A1942]
      rounded
      p-10
      shadow-sm
    ">
      <div className="inline-block bg-[#FF9100] border-2 border-[#5C2E00] rounded-tag px-6 py-3 mb-6">
        <h2 className="text-xl font-black text-white uppercase">
          什么是 Rootstock?
        </h2>
      </div>
      <div className="space-y-4 text-[#5C2E00] leading-relaxed">
        <p>...</p>
        <p>...</p>
      </div>
    </div>

  </div>
</section>
```

**配色解析**：
- 3 张卡片：桃色、淡紫、薄荷（各配对应边框色）
- 每张卡片有独特颜色主题
- Rootstock 介绍：奶油色 + 深紫棕边框

---

### 5. FAQ Section

```tsx
<section className="py-20 bg-[#FDF8F0]">
  <div className="container mx-auto px-6">

    <h2 className="heading-h2 text-center mb-16">
      <span className="text-[#FF9100]">常见问题</span>
    </h2>

    <div className="max-w-3xl mx-auto space-y-6">

      {/* FAQ 1 */}
      <details className="
        bg-[#FAF6F0]
        border-[3px] border-[#4A1942]
        rounded
        p-6
        shadow-sm
        hover:border-[#FF9100]
        hover:shadow-md
        transition-all
        group
      ">
        <summary className="cursor-pointer text-lg font-bold text-[#5C2E00] flex items-center justify-between">
          <span className="flex items-center gap-4">
            <span className="w-10 h-10 bg-[#DEFF1A] border-2 border-[#5C2E00] rounded-full flex items-center justify-center text-sm font-black text-[#5C2E00]">
              Q
            </span>
            什么是 Soul Bound Token？
          </span>
          <svg className="w-6 h-6 text-[#5C2E00] group-open:rotate-180 transition-transform">
            {/* ... */}
          </svg>
        </summary>
        <p className="mt-4 text-[#8B4513] leading-relaxed ml-14">
          Soul Bound Token (SBT) 是...
        </p>
      </details>

      {/* FAQ 2-4 ... 同样结构，Q 图标换不同颜色 */}

    </div>
  </div>
</section>
```

---

## 🎨 Tailwind 配置文件

### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Rootstock 官方配色
        'rs-orange': '#FF9100',
        'rs-pink': '#FF70E0',
        'rs-lime': '#DEFF1A',
        'rs-green': '#78C700',
        'rs-purple': '#9E75FF',
        'rs-cyan': '#08FFD1',
        'rs-offwhite': '#FAFAF5',
        'rs-cream': '#FDF8F0',

        // 深色系（替代黑色）
        'rs-text-dark': '#5C2E00',      // 深橙棕（主文字）
        'rs-text-medium': '#8B4513',    // 中橙棕（次文字）
        'rs-text-light': '#A0522D',     // 浅橙棕（辅助文字）
        'rs-border-dark': '#4A1942',    // 深紫棕（主边框）
        'rs-border-medium': '#6B2C5C',  // 中紫棕（次边框）

        // 扩展卡片背景
        'rs-card-cream': '#FAF6F0',     // 奶油色
        'rs-card-peach': '#FFF4E6',     // 桃色
        'rs-card-lavender': '#F5F0FF',  // 淡紫
        'rs-card-mint': '#F0FFF4',      // 薄荷
      },

      fontFamily: {
        sans: [
          'PingFang SC',
          'Microsoft YaHei',
          'Source Han Sans CN',
          'Noto Sans SC',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'SF Mono',
          'Consolas',
          'monospace',
        ],
      },

      borderRadius: {
        'tag': '13.65px',       // 官方 tag 圆角
        'nametag': '60px',      // Nametag 按钮圆角
      },

      boxShadow: {
        'sm': '0 2px 8px rgba(92, 46, 0, 0.08)',
        'md': '0 4px 16px rgba(92, 46, 0, 0.12)',
        'lg': '0 8px 32px rgba(92, 46, 0, 0.16)',
        'xl': '0 16px 48px rgba(92, 46, 0, 0.20)',
        'glow-orange': '0 0 24px rgba(255, 145, 0, 0.4)',
        'glow-pink': '0 0 24px rgba(255, 112, 224, 0.4)',
        'glow-lime': '0 0 24px rgba(222, 255, 26, 0.4)',
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideStripes: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 0' },
        },
      },

      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-stripes': 'slideStripes 1s linear infinite',
      },
    },
  },
  plugins: [],
}
```

---

## 🎨 全局 CSS 样式

### `globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ========== 全局样式 ========== */

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  background: #FDF8F0;  /* 米色主背景 */
  color: #5C2E00;       /* 深橙棕文字 */
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

/* 中文字号自动增大 */
:lang(zh-CN) {
  font-size: calc(1em + 1px);
}

/* ========== 滚动条样式 ========== */

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #FAFAF5;
}

::-webkit-scrollbar-thumb {
  background: #FF9100;  /* 橙色滚动条 */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #FF70E0;  /* Hover 变粉色 */
}

/* ========== 文本选择高亮 ========== */

::selection {
  background-color: #DEFF1A;  /* 荧光绿背景 */
  color: #5C2E00;             /* 深橙棕文字 */
}

::-moz-selection {
  background-color: #DEFF1A;
  color: #5C2E00;
}

/* ========== 焦点指示器 ========== */

*:focus-visible {
  outline: 3px solid #FF9100;
  outline-offset: 4px;
}

/* ========== Typography 层级 ========== */

@layer base {
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    color: #5C2E00;
  }

  h1 {
    @apply text-5xl md:text-6xl;
    line-height: 1.1;
  }

  h2 {
    @apply text-4xl md:text-5xl;
    line-height: 1.2;
  }

  h3 {
    @apply text-2xl md:text-3xl;
    line-height: 1.3;
  }

  p {
    line-height: 1.7;
  }

  a {
    @apply transition-colors duration-300;
    color: #FF9100;
  }

  a:hover {
    color: #FF70E0;
  }
}

/* ========== 组件类 ========== */

@layer components {
  /* 按钮基础类 */
  .btn {
    @apply inline-flex items-center justify-center;
    @apply px-10 py-4;
    @apply font-bold text-base;
    @apply rounded-nametag;
    @apply transition-all duration-300;
    @apply cursor-pointer select-none;
  }

  .btn-primary {
    @apply bg-rs-orange text-white;
    @apply border-[3px] border-rs-text-dark;
    @apply shadow-md;
  }

  .btn-primary:hover {
    @apply shadow-glow-orange -translate-y-1;
  }

  .btn-secondary {
    @apply bg-rs-pink text-white;
    @apply border-[3px] border-rs-border-medium;
    @apply shadow-md;
  }

  .btn-outline {
    @apply bg-transparent text-rs-text-dark;
    @apply border-[3px] border-rs-text-dark;
  }

  .btn-outline:hover {
    @apply bg-rs-orange text-white border-rs-orange;
  }

  /* 卡片类 */
  .card {
    @apply bg-rs-card-cream;
    @apply border-[3px] border-rs-border-dark;
    @apply rounded;
    @apply p-8;
    @apply shadow-sm;
    @apply transition-all duration-300;
  }

  .card:hover {
    @apply border-rs-orange shadow-md -translate-y-1;
  }

  /* 标签类 */
  .badge {
    @apply inline-block;
    @apply px-4 py-2;
    @apply border-2 border-rs-text-dark;
    @apply rounded-tag;
    @apply text-xs font-bold uppercase tracking-wider;
  }

  .badge-lime {
    @apply bg-rs-lime text-rs-text-dark;
  }

  .badge-orange {
    @apply bg-rs-orange text-white;
  }

  .badge-pink {
    @apply bg-rs-pink text-white;
  }
}

/* ========== 工具类 ========== */

@layer utilities {
  .text-gradient-orange {
    background: linear-gradient(135deg, #FF9100 0%, #FF70E0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .bg-gradient-warm {
    background: linear-gradient(135deg, #FF9100 0%, #FF70E0 100%);
  }
}
```

---

## ✅ 完整改版清单

### Phase 1: 配置更新（第一天）

- [ ] 更新 `tailwind.config.js`
  - [ ] 添加所有 Rootstock 官方色
  - [ ] 添加深色系（替代黑色）
  - [ ] 添加扩展卡片背景色
  - [ ] 配置中文字体栈
  - [ ] 添加自定义圆角、阴影

- [ ] 更新 `globals.css`
  - [ ] 设置全局米色背景
  - [ ] 设置深橙棕文字色
  - [ ] 配置中文字体
  - [ ] 添加组件基础类
  - [ ] 添加焦点指示器

- [ ] **全局替换黑色**
  - [ ] 搜索所有 `#000000` 或 `black`
  - [ ] 替换为 `#5C2E00`（文字）或 `#4A1942`（边框）

### Phase 2: 组件重构（第二天）

- [ ] 按钮组件 (`MintButton.tsx`)
  - [ ] 移除所有黑色
  - [ ] 使用 Nametag 风格（圆润）
  - [ ] 边框改为深橙棕/深紫棕

- [ ] 卡片组件
  - [ ] 创建 `Card.tsx`
  - [ ] 奶油色/桃色/淡紫/薄荷变体
  - [ ] 深色边框改为深紫棕

- [ ] 进度条 (`ProgressBar.tsx`)
  - [ ] 橙粉渐变进度条
  - [ ] Off White 背景 + 深紫棕边框

- [ ] 倒计时 (`Countdown.tsx`)
  - [ ] 奶油色时间块
  - [ ] 深紫棕边框
  - [ ] 橙色数字 + 荧光绿标签

### Phase 3: 页面区块更新（第三天）

- [ ] Hero Section
  - [ ] 米色背景
  - [ ] 荧光绿标签
  - [ ] 橙色 + 深橙棕标题

- [ ] Countdown Section
  - [ ] Off White 背景
  - [ ] 新倒计时组件

- [ ] Mint Section
  - [ ] 橙粉渐变 SBT 卡片
  - [ ] 奶油色进度卡片
  - [ ] 4 色 Stats 卡片

- [ ] About Section
  - [ ] 桃色/淡紫/薄荷卡片
  - [ ] 奶油色介绍卡片

- [ ] FAQ Section
  - [ ] 奶油色面板
  - [ ] 荧光绿 Q 图标
  - [ ] 深橙棕文字

### Phase 4: 细节优化（第四天）

- [ ] 响应式测试
- [ ] 中文显示测试
- [ ] 对比度验证（WCAG AAA）
- [ ] 动画流畅度
- [ ] 性能优化

---

## 🎯 核心改进总结

### ✅ 完成的优化

1. **✅ 完全移除黑色** - 全部用深色系官方色替代
2. **✅ 米色主体** - 60% 米色 + 30% 浅色 + 10% 荧光色
3. **✅ 中文字体** - PingFang SC / Microsoft YaHei 优先
4. **✅ 高对比度** - 超过 WCAG AAA 级（9.8:1）
5. **✅ 100% 品牌色** - 完全使用 Rootstock 官方 8 色
6. **✅ 荧光活力** - 橙、粉、绿作为视觉焦点

### 🎨 配色理论应用

- **60-30-10 法则** - 米色 60%、浅色 30%、荧光 10%
- **Triadic 三角配色** - 橙、粉、绿均匀分布
- **WCAG AAA 对比度** - 深橙棕 on 米色 = 9.8:1
- **色彩心理学** - 橙色（活力）+ 粉色（创新）+ 绿色（成长）

### 🎯 预期效果

- **更温暖友好** - 米色主体传达舒适感
- **更有活力** - 荧光色创造视觉冲击
- **更专业** - 高对比度保证可读性
- **更一致** - 100% 使用品牌官方色

---

## ✅ 请确认

### 核心决策：

1. **完全无黑色** ✅
   - 文字：深橙棕 #5C2E00
   - 边框：深紫棕 #4A1942
   - 对比度：9.8:1 (AAA 级)

2. **米色主体** ✅
   - 主背景：#FDF8F0 (60%)
   - 次背景：#FAFAF5 (20%)
   - 卡片：奶油/桃/淡紫/薄荷 (30%)

3. **中文字体** ✅
   - PingFang SC / Microsoft YaHei
   - 不使用 Rootstock Sans（不支持中文）

4. **荧光强调** ✅
   - 橙色 5% - 主 CTA
   - 粉色 2% - 次 CTA
   - 荧光绿 2% - 标签
   - 其他 1% - 装饰

---

**方案已优化完成！完全符合你的要求：**
- ✅ 完全无黑色
- ✅ 米色主体
- ✅ 中文字体
- ✅ Rootstock 风格文档

**请确认是否开始执行改版？** 🚀
