# 🎨 Rootstock 3000 Days 网站改版方案 V2.0

> **融合品牌指南 + 专业设计原则**
> 学习自：ui-design-tips + openclaw-ui-design-skill + design-system-skill
>
> 网址：https://rootstock-3000-sbt.vercel.app

---

## 📋 设计方案总览

### 核心设计风格

**🎯 Neo-Brutalist（新粗野主义）+ Bento Grid（卡片网格）**

为什么选择这个风格？
- ✅ **完美匹配** Rootstock 品牌特点（大胆、高对比、荧光色）
- ✅ **解决黑色卡片问题**（改用浅色卡片 + 粗黑边框）
- ✅ **符合专业设计原则**（视觉层次清晰、可访问性好）
- ✅ **现代、独特、充满活力**

---

## 🎨 配色方案（解决黑色卡片问题）

### 主背景（保持）
```css
--bg-primary: #FDF8F0          /* 米色主背景 ✅ 保持 */
--bg-secondary: #FAFAF5        /* Off White 次背景（新增）*/
```

### 卡片配色方案（3 种方案）

#### ⭐ 方案 A：浅色卡片 + 粗边框（推荐）

```css
/* 主卡片样式 - 适用于大部分内容卡片 */
.card-light {
  background: #FAFAF5;           /* Off White */
  border: 4px solid #000000;     /* 粗黑边框 */
  border-radius: 4px;            /* 小圆角 */
  box-shadow: 8px 8px 0px #000000; /* Neo-Brutalist 硬阴影 */
}

/* Hover 效果 */
.card-light:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0px #000000;
  border-color: #FF9100;          /* 橙色边框 */
}
```

**优点**：
- 在米色背景上清晰可见
- 不会产生"黑洞"视觉效果
- 保持高对比度
- 符合 Neo-Brutalist 风格

#### 方案 B：彩色边框卡片

```css
/* 不同主题卡片 */
.card-orange {
  background: #FAFAF5;
  border: 4px solid #FF9100;      /* 橙色边框 */
  box-shadow: 8px 8px 0px #FF9100;
}

.card-pink {
  background: #FAFAF5;
  border: 4px solid #FF70E0;      /* 粉色边框 */
  box-shadow: 8px 8px 0px #FF70E0;
}

.card-lime {
  background: #FAFAF5;
  border: 4px solid #DEFF1A;      /* 荧光绿边框 */
  box-shadow: 8px 8px 0px #DEFF1A;
}
```

**优点**：
- 更加活泼、醒目
- 每个卡片有独特颜色
- 强化品牌色使用

#### 方案 C：保留少量黑色卡片作为对比

```css
/* 深色卡片 - 仅用于 Hero 和重要 CTA 区块 */
.card-dark {
  background: #000000;
  border: 4px solid #FF9100;      /* 有彩色边框 */
  color: #FAFAF5;
  box-shadow: 8px 8px 0px #FF9100;
}
```

**使用场景**：
- Hero Section（英雄区）
- SBT 预览卡片
- 主 CTA 区块
- 不超过页面总卡片的 20%

---

## 📐 布局系统

### Bento Grid 不规则网格

```css
/* 卡片网格 - 不同尺寸组合 */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* 卡片尺寸变体 */
.bento-small  { grid-column: span 3; }   /* 1/4 宽 */
.bento-medium { grid-column: span 6; }   /* 1/2 宽 */
.bento-large  { grid-column: span 9; }   /* 3/4 宽 */
.bento-full   { grid-column: span 12; }  /* 全宽 */
```

**应用到网站**：
- Stats 卡片（4 个小卡片）：各占 3 列
- About 卡片（3 个）：各占 4 列
- Rootstock 介绍：全宽卡片

---

## 🎯 视觉层次系统

### 基于 UI Design Tips 原则

#### 1. 主标题（最高层级）
```css
.heading-primary {
  font-size: 72px;              /* 超大字号 */
  font-weight: 900;             /* 最粗字重 */
  text-transform: uppercase;    /* 全大写 */
  color: #FF9100;               /* 橙色 */
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* 移动端 */
@media (max-width: 768px) {
  .heading-primary {
    font-size: 40px;
  }
}
```

#### 2. 次标题（第二层级）
```css
.heading-secondary {
  font-size: 48px;
  font-weight: 800;
  text-transform: uppercase;
  color: #000000;
  line-height: 1.2;
}
```

#### 3. 卡片标题（第三层级）
```css
.heading-card {
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  color: #000000;
  line-height: 1.3;
}
```

#### 4. 正文（基础层级）
```css
.body-text {
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.7);    /* 70% 透明度 */
  line-height: 1.6;
}
```

---

## 🔘 组件设计系统

### 按钮（Nametag 风格）

#### 主按钮（橙色 Nametag）

```css
.btn-primary {
  /* Neo-Brutalist 风格 */
  background: #FF9100;
  color: #000000;
  border: 4px solid #000000;
  border-radius: 60px;          /* 完全圆润 */
  padding: 20px 48px;

  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;

  box-shadow: 8px 8px 0px #000000;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0px #000000;
}

.btn-primary:active {
  transform: translate(4px, 4px);
  box-shadow: 2px 2px 0px #000000;
}
```

**视觉效果**：
- 圆润的药丸形状
- 粗黑边框
- 硬阴影（像纸片悬浮）
- Hover 时向左上浮起
- Active 时被"按下"

#### 次按钮（荧光绿 Nametag）

```css
.btn-secondary {
  background: #DEFF1A;          /* 荧光绿 */
  color: #000000;
  border: 4px solid #000000;
  border-radius: 60px;
  padding: 20px 48px;
  /* ... 其他同 primary */
}
```

#### Outline 按钮

```css
.btn-outline {
  background: transparent;
  color: #000000;
  border: 4px solid #000000;
  border-radius: 60px;
  padding: 20px 48px;
  /* ... */
}

.btn-outline:hover {
  background: #FF9100;
}
```

---

### 卡片组件

#### 浅色卡片（主要使用）

```tsx
<div className="
  bg-[#FAFAF5]
  border-4 border-black
  rounded
  p-8
  shadow-[8px_8px_0px_#000000]
  hover:shadow-[12px_12px_0px_#000000]
  hover:-translate-x-1 hover:-translate-y-1
  transition-all duration-200
">
  {/* 荧光色标签 */}
  <div className="inline-block bg-[#DEFF1A] border-2 border-black rounded-tag px-4 py-2 mb-4">
    <h3 className="text-sm font-black uppercase">Feature Title</h3>
  </div>

  {/* 内容 */}
  <p className="text-black/70 leading-relaxed">
    Card content here...
  </p>
</div>
```

#### 深色卡片（少量使用）

```tsx
<div className="
  bg-black
  border-4 border-[#FF9100]
  rounded
  p-8
  shadow-[8px_8px_0px_#FF9100]
">
  {/* 白色文字 */}
  <h3 className="text-white font-bold">Dark Card Title</h3>
  <p className="text-white/80">Content...</p>
</div>
```

---

### 标签/徽章（Nametag）

```css
.badge {
  display: inline-block;
  padding: 8px 20px;
  border: 3px solid #000000;
  border-radius: 13.65px;       /* 官方 tag 圆角 */

  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  background: #DEFF1A;
  color: #000000;
}

/* 颜色变体 */
.badge-orange { background: #FF9100; }
.badge-pink { background: #FF70E0; }
.badge-lime { background: #DEFF1A; }
.badge-green { background: #78C700; }
```

---

### Stats 卡片（统计数据）

```tsx
{/* 当前：荧光色大方块 + 圆形角标 */}
{/* 改为：Neo-Brutalist 风格 */}

<div className="relative">
  {/* 主卡片 */}
  <div className="
    bg-[#DEFF1A]
    border-4 border-black
    rounded
    p-8
    shadow-[8px_8px_0px_#000000]
  ">
    {/* 数字 */}
    <div className="text-6xl font-black text-black font-mono leading-none">
      3000
    </div>
  </div>

  {/* 标签 */}
  <div className="inline-block bg-[#DEFF1A] border-3 border-black rounded-tag px-4 py-2 mt-3">
    <div className="text-xs font-black text-black uppercase tracking-wider">
      DAYS
    </div>
  </div>
</div>
```

**改进点**：
- 去掉圆形角标（不符合 Neo-Brutalist）
- 标签放在卡片下方
- 统一使用粗边框和硬阴影
- 更简洁、更一致

---

### 进度条

```tsx
{/* 当前：简单的渐变条 */}
{/* 改为：Neo-Brutalist 风格 */}

<div className="w-full">
  {/* 背景 */}
  <div className="
    w-full h-12
    bg-[#FAFAF5]
    border-4 border-black
    rounded-full
    overflow-hidden
    relative
  ">
    {/* 进度 */}
    <div
      className="
        h-full
        bg-[#FF9100]
        transition-all duration-500
        relative
        overflow-hidden
      "
      style={{ width: '65%' }}
    >
      {/* 动态纹理效果 */}
      <div className="absolute inset-0 bg-black/10
        bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,.1)_10px,rgba(0,0,0,.1)_20px)]
        animate-[slide_1s_linear_infinite]
      "></div>
    </div>

    {/* 分隔线 */}
    <div className="absolute inset-y-0 left-1/2 w-1 bg-black/20"></div>
    <div className="absolute inset-y-0 left-1/4 w-1 bg-black/10"></div>
    <div className="absolute inset-y-0 left-3/4 w-1 bg-black/10"></div>
  </div>

  {/* 文字标签 */}
  <div className="flex justify-between mt-3">
    <span className="text-sm font-bold uppercase">1,247 / 3,000</span>
    <span className="text-sm font-bold uppercase text-[#FF9100]">41.6%</span>
  </div>
</div>
```

---

### 倒计时（Countdown）

```tsx
{/* Neo-Brutalist 风格倒计时 */}

<div className="flex gap-6 justify-center">
  {/* 每个时间块 */}
  <div className="flex flex-col items-center">
    {/* 数字卡片 */}
    <div className="
      bg-[#FAFAF5]
      border-4 border-black
      rounded
      w-28 h-28
      flex items-center justify-center
      shadow-[8px_8px_0px_#000000]
    ">
      <span className="text-5xl font-black text-[#FF9100] font-mono">
        23
      </span>
    </div>

    {/* 标签 */}
    <div className="inline-block bg-[#FF9100] border-3 border-black rounded-tag px-3 py-1 mt-3">
      <span className="text-xs font-black text-black uppercase tracking-wider">
        DAYS
      </span>
    </div>
  </div>

  {/* 分隔符 */}
  <div className="text-5xl font-black text-black self-center -mt-8">
    :
  </div>

  {/* HOURS, MINUTES, SECONDS... */}
</div>
```

---

### FAQ 折叠面板

```tsx
{/* 改进版 FAQ */}

<details className="
  bg-[#FAFAF5]
  border-4 border-black
  rounded
  p-6
  shadow-[4px_4px_0px_#000000]
  hover:shadow-[8px_8px_0px_#000000]
  hover:-translate-x-1 hover:-translate-y-1
  transition-all
  group
">
  <summary className="
    cursor-pointer
    text-lg font-bold text-black
    flex items-center justify-between
  ">
    <span className="flex items-center gap-3">
      {/* Q 图标 - 荧光绿 */}
      <span className="
        inline-flex items-center justify-center
        w-10 h-10
        bg-[#DEFF1A]
        border-3 border-black
        rounded-full
        text-sm font-black text-black
      ">
        Q
      </span>
      What is a Soul Bound Token?
    </span>

    {/* 箭头 */}
    <svg className="w-6 h-6 text-black transform group-open:rotate-180 transition-transform"
      fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </summary>

  {/* 答案 */}
  <p className="mt-4 text-black/70 leading-relaxed text-sm ml-13">
    A Soul Bound Token (SBT) is a non-transferable NFT...
  </p>
</details>
```

---

## 📱 响应式设计

### 断点系统
```css
/* Mobile First */
sm: 640px   /* 手机横屏 */
md: 768px   /* 平板 */
lg: 1024px  /* 笔记本 */
xl: 1280px  /* 桌面 */
```

### 字体响应式
```css
/* 移动端 */
h1: 32px → 48px (md) → 72px (lg)
h2: 24px → 32px (md) → 48px (lg)
body: 14px → 16px (md)
```

### 卡片响应式
```tsx
{/* Bento Grid 响应式 */}
<div className="
  grid
  grid-cols-1          /* 移动端：1 列 */
  md:grid-cols-2       /* 平板：2 列 */
  lg:grid-cols-4       /* 桌面：4 列 */
  gap-6
">
  {/* Cards... */}
</div>
```

---

## 🎬 动画和交互

### 1. 页面加载动画

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* 分层延迟 */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
```

### 2. Hover 交互（Neo-Brutalist 特色）

```css
/* 卡片悬浮效果 */
.card-hover {
  transition: all 0.2s ease;
}

.card-hover:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0px #000000;
}

/* 按钮按压效果 */
.btn-press:active {
  transform: translate(4px, 4px);
  box-shadow: 2px 2px 0px #000000;
}
```

### 3. 进度条动画

```css
@keyframes slideStripes {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 40px 0;
  }
}

.progress-animated {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0,0,0,.1) 10px,
    rgba(0,0,0,.1) 20px
  );
  animation: slideStripes 1s linear infinite;
}
```

---

## 🔍 可访问性优化

### 基于 UI Design Tips 原则

#### 1. 颜色对比度
```css
/* ✅ 好的对比度 */
background: #FAFAF5;
color: #000000;              /* 对比度 > 15:1 */

background: #DEFF1A;
color: #000000;              /* 对比度 > 15:1 */

/* ❌ 避免低对比度 */
background: #FF70E0;
color: #FF9100;              /* 对比度不足 */
```

#### 2. 多属性区分（不只用颜色）

```tsx
{/* ✅ 好：颜色 + 图标 + 文字 */}
<button className="btn-primary">
  <CheckIcon /> {/* 图标 */}
  <span>已铸造</span> {/* 文字 */}
</button>

{/* ❌ 避免：只用颜色区分 */}
<div className="bg-green-500"></div> {/* 色盲用户无法区分 */}
```

#### 3. 焦点指示器

```css
/* 键盘导航焦点 */
*:focus-visible {
  outline: 4px solid #FF9100;
  outline-offset: 4px;
}

button:focus-visible {
  outline: 4px solid #DEFF1A;
}
```

#### 4. ARIA 标签

```tsx
<button
  aria-label="铸造 Rootstock 3000 天纪念 SBT"
  aria-describedby="mint-description"
>
  立即铸造
</button>

<p id="mint-description" className="sr-only">
  连接钱包后免费铸造 Rootstock 3000 天纪念 Soul Bound Token
</p>
```

---

## 📄 页面区块详细设计

### 1. Hero Section（英雄区）

#### 布局结构
```tsx
<section className="section py-20 md:py-32">
  <div className="container mx-auto px-6 md:px-12">
    {/* 顶部标签 */}
    <div className="flex justify-center mb-8">
      <span className="badge badge-lime">
        🎉 LIMITED EDITION
      </span>
    </div>

    {/* 主标题 */}
    <h1 className="heading-primary text-center mb-6 animate-fade-in-up">
      ROOTSTOCK<br/>
      <span className="text-black">3000 DAYS</span>
    </h1>

    {/* 副标题 */}
    <p className="text-2xl text-center text-black/70 mb-12 max-w-3xl mx-auto">
      庆祝 Rootstock 3000 天创新之旅
    </p>

    {/* CTA 按钮组 */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="btn-primary">
        🎁 免费铸造 SBT
      </button>
      <button className="btn-outline">
        📖 了解更多
      </button>
    </div>
  </div>
</section>
```

**关键改进**：
- 标题使用 72px 超大字号
- 副标题降低透明度（70%）建立层次
- 按钮使用 Nametag 风格（圆润、粗边框）
- 一个主 CTA（橙色）+ 一个次 CTA（轮廓）

---

### 2. Countdown Section（倒计时）

```tsx
<section className="section py-16 bg-[#FAFAF5]">
  <div className="container mx-auto px-6">
    <h2 className="heading-secondary text-center mb-12">
      <span className="text-[#FF9100]">距离 3000 天纪念日</span>
    </h2>

    {/* Neo-Brutalist 倒计时 */}
    <div className="flex gap-4 md:gap-8 justify-center flex-wrap">
      {timeUnits.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="
            bg-[#FAFAF5]
            border-4 border-black
            rounded
            w-24 md:w-32
            h-24 md:h-32
            flex items-center justify-center
            shadow-[8px_8px_0px_#000000]
          ">
            <span className="text-4xl md:text-6xl font-black text-[#DEFF1A] font-mono">
              {value}
            </span>
          </div>
          <div className="inline-block bg-[#DEFF1A] border-3 border-black rounded-tag px-3 py-1 mt-3">
            <span className="text-xs font-black uppercase tracking-wider">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### 3. Mint Section（铸造区）

```tsx
<section className="section py-20">
  <div className="container mx-auto px-6">
    <h2 className="heading-secondary text-center mb-16">
      <span className="text-[#FF9100]">免费铸造</span>{' '}
      <span className="text-black">SBT</span>
    </h2>

    {/* Bento Grid 布局 */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">

      {/* SBT 预览 - 占 6 列 */}
      <div className="lg:col-span-6">
        <div className="
          bg-black
          border-4 border-[#FF9100]
          rounded
          p-10
          shadow-[8px_8px_0px_#FF9100]
          hover:shadow-[12px_12px_0px_#FF9100]
          hover:-translate-x-1 hover:-translate-y-1
          transition-all
        ">
          {/* 标签 */}
          <div className="inline-block bg-[#FF9100] border-3 border-black rounded-tag px-6 py-3 mb-6">
            <h3 className="text-xl font-black text-black uppercase">
              SBT 预览
            </h3>
          </div>

          {/* 图片 */}
          <img
            src="/images/sbt-preview.png"
            alt="SBT Preview"
            className="w-full rounded border-4 border-white/20"
          />

          {/* 描述 */}
          <p className="text-white/90 mt-6 text-center">
            独一无二的纪念 NFT，永久绑定你的钱包地址
          </p>
        </div>
      </div>

      {/* 进度 + 按钮 - 占 6 列 */}
      <div className="lg:col-span-6 flex flex-col justify-between">

        {/* 进度条 */}
        <div className="
          bg-[#FAFAF5]
          border-4 border-black
          rounded
          p-8
          shadow-[4px_4px_0px_#000000]
          mb-6
        ">
          <h3 className="heading-card mb-6">
            <span className="text-[#FF9100]">铸造</span>进度
          </h3>

          {/* Neo-Brutalist 进度条 */}
          <ProgressBar current={1247} total={3000} />
        </div>

        {/* 铸造按钮 */}
        <MintButton />

      </div>
    </div>

    {/* Stats Grid - 4 个小卡片 */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <div key={index} className="flex flex-col">
          <div className={`
            bg-[${stat.color}]
            border-4 border-black
            rounded
            p-6
            shadow-[8px_8px_0px_#000000]
            hover:shadow-[12px_12px_0px_#000000]
            hover:-translate-x-1 hover:-translate-y-1
            transition-all
          `}>
            <div className="text-5xl font-black text-black font-mono leading-none">
              {stat.value}
            </div>
          </div>
          <div className={`inline-block bg-[${stat.color}] border-3 border-black rounded-tag px-3 py-2 mt-3 self-start`}>
            <div className="text-xs font-black uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**关键改进**：
- Bento Grid 不规则布局（6:6）
- SBT 预览保留黑色卡片作为视觉焦点
- 进度条使用浅色卡片
- Stats 卡片去掉圆形角标，更简洁

---

### 4. About Section（关于区块）

```tsx
<section className="section py-20 bg-[#FAFAF5]">
  <div className="container mx-auto px-6">

    {/* 3 张特色卡片 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

      {/* Card 1 - Soul Bound */}
      <div className="
        bg-[#FAFAF5]
        border-4 border-black
        rounded
        p-8
        shadow-[8px_8px_0px_#000000]
        hover:shadow-[12px_12px_0px_#DEFF1A]
        hover:border-[#DEFF1A]
        transition-all
        min-h-[400px]
        flex flex-col
      ">
        {/* 标签 */}
        <div className="inline-block bg-[#DEFF1A] border-3 border-black rounded-tag px-4 py-2 mb-6 self-start">
          <span className="text-sm font-black uppercase">01 · Soul Bound</span>
        </div>

        {/* 图标 */}
        <div className="text-6xl mb-4">🔒</div>

        {/* 标题 */}
        <h3 className="heading-card mb-4">
          灵魂绑定
        </h3>

        {/* 内容 */}
        <p className="text-black/70 leading-relaxed flex-grow">
          这是一个不可转移的 Soul Bound Token，永久绑定到你的钱包地址...
        </p>
      </div>

      {/* Card 2 - Free Mint */}
      <div className="... border-[#FF70E0] hover:shadow-[12px_12px_0px_#FF70E0]">
        <div className="bg-[#FF70E0] ...">
          <span>02 · Free Mint</span>
        </div>
        {/* ... */}
      </div>

      {/* Card 3 - Limited */}
      <div className="... border-[#9E75FF] hover:shadow-[12px_12px_0px_#9E75FF]">
        <div className="bg-[#9E75FF] ...">
          <span>03 · Limited</span>
        </div>
        {/* ... */}
      </div>
    </div>

    {/* Rootstock 介绍 - 全宽卡片 */}
    <div className="
      bg-[#FAFAF5]
      border-4 border-black
      rounded
      p-10
      shadow-[8px_8px_0px_#000000]
    ">
      <div className="inline-block bg-[#FF9100] border-3 border-black rounded-tag px-6 py-3 mb-6">
        <h2 className="text-xl font-black uppercase">什么是 Rootstock?</h2>
      </div>
      <div className="space-y-4 text-black/70 leading-relaxed">
        <p>...</p>
        <p>...</p>
      </div>
    </div>
  </div>
</section>
```

**关键改进**：
- 所有卡片改为浅色 (#FAFAF5)
- 每张卡片有独特的边框颜色
- Hover 时阴影变为对应颜色
- 编号放在标签内（01 · Soul Bound）

---

### 5. FAQ Section

```tsx
<section className="section py-20">
  <div className="container mx-auto px-6">
    <h2 className="heading-secondary text-center mb-16">
      <span className="text-[#FF9100]">常见问题</span>
    </h2>

    <div className="max-w-3xl mx-auto space-y-6">

      {faqData.map((item, index) => (
        <details
          key={index}
          className="
            bg-[#FAFAF5]
            border-4 border-black
            rounded
            p-6
            shadow-[4px_4px_0px_#000000]
            hover:shadow-[8px_8px_0px_#000000]
            hover:-translate-x-1 hover:-translate-y-1
            transition-all
            group
          "
        >
          <summary className="
            cursor-pointer
            text-lg font-bold
            flex items-center justify-between
          ">
            <span className="flex items-center gap-4">
              {/* Q 图标 */}
              <span className={`
                inline-flex items-center justify-center
                w-10 h-10
                bg-[${item.color}]
                border-3 border-black
                rounded-full
                text-sm font-black
              `}>
                Q
              </span>
              {item.question}
            </span>

            {/* 箭头 */}
            <svg className="w-6 h-6 transform group-open:rotate-180 transition-transform"
              fill="none" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          <p className="mt-4 text-black/70 leading-relaxed ml-14">
            {item.answer}
          </p>
        </details>
      ))}

    </div>
  </div>
</section>
```

---

## 📦 完整改版清单

### Phase 1: 配置和基础（第一天）

- [ ] 更新 `tailwind.config.js`
  - [ ] 添加完整 Rootstock 官方配色
  - [ ] 添加 Neo-Brutalist 配置（粗边框、硬阴影）
  - [ ] 添加圆角规范
  - [ ] 添加字体层级
  - [ ] 添加动画定义

- [ ] 更新 `globals.css`
  - [ ] 引入 Rootstock Sans 字体
  - [ ] 更新 CSS 变量
  - [ ] 添加 Neo-Brutalist 工具类
  - [ ] 添加动画关键帧

### Phase 2: 组件重构（第二天）

- [ ] 重构按钮组件
  - [ ] `MintButton.tsx` - Nametag 风格
  - [ ] 添加 3 种变体（primary, secondary, outline）
  - [ ] 添加 Hover/Active 动画

- [ ] 重构卡片组件
  - [ ] 创建 `Card.tsx` - Neo-Brutalist 风格
  - [ ] 添加浅色/深色变体
  - [ ] 添加 Hover 悬浮效果

- [ ] 重构 `ProgressBar.tsx`
  - [ ] Neo-Brutalist 风格
  - [ ] 添加条纹动画

- [ ] 重构 `Countdown.tsx`
  - [ ] Neo-Brutalist 时间块
  - [ ] 彩色标签

### Phase 3: 页面区块优化（第三天）

- [ ] Hero Section
  - [ ] 更新标题层级
  - [ ] 优化 CTA 按钮
  - [ ] 添加进场动画

- [ ] Countdown Section
  - [ ] 应用新倒计时组件
  - [ ] 添加浅色背景

- [ ] Mint Section
  - [ ] Bento Grid 布局
  - [ ] SBT 预览卡片（深色）
  - [ ] 进度 + 按钮卡片（浅色）
  - [ ] Stats 卡片重构

- [ ] About Section
  - [ ] 3 张特色卡片（浅色 + 彩色边框）
  - [ ] Rootstock 介绍卡片

- [ ] FAQ Section
  - [ ] Neo-Brutalist 折叠面板

### Phase 4: 细节优化（第四天）

- [ ] 响应式测试
  - [ ] 移动端 (< 640px)
  - [ ] 平板 (768px - 1024px)
  - [ ] 桌面 (> 1024px)

- [ ] 动画优化
  - [ ] 页面加载动画
  - [ ] 滚动触发动画
  - [ ] Hover 交互

- [ ] 可访问性测试
  - [ ] 键盘导航
  - [ ] 焦点指示器
  - [ ] ARIA 标签
  - [ ] 颜色对比度

- [ ] 性能优化
  - [ ] 图片优化
  - [ ] CSS 清理
  - [ ] 动画性能

---

## 🎯 预期效果

### 视觉效果
- **更清晰的视觉层次**（超大标题 → 次标题 → 正文）
- **更强的品牌识别**（100% 使用官方配色）
- **更好的可读性**（浅色卡片在米色背景上）
- **更现代的风格**（Neo-Brutalist + Bento Grid）

### 用户体验
- **更明确的 CTA**（一个主按钮）
- **更流畅的交互**（Hover 悬浮、按钮按压）
- **更好的可访问性**（高对比度、焦点指示器）
- **更快的加载**（优化后的动画和图片）

### 品牌一致性
- **100% 符合品牌指南**（配色、字体、圆角）
- **独特的视觉语言**（Neo-Brutalist 风格）
- **专业的执行**（每个细节都对齐）

---

## ✅ 需要你的确认

### 核心决策：

1. **✅ 设计风格：Neo-Brutalist + Bento Grid**
   - 粗边框（4px）
   - 硬阴影（8px 8px）
   - 高对比色块

2. **✅ 卡片配色：主要用浅色卡片**
   - 主卡片：#FAFAF5 + 黑色边框
   - 特色卡片：#FAFAF5 + 彩色边框
   - 深色卡片：仅用于 Hero 和 SBT 预览（<20%）

3. **✅ 按钮风格：Nametag（完全圆润）**
   - border-radius: 60px
   - 粗边框 + 硬阴影
   - Hover 悬浮 / Active 按压

4. **✅ 字体层级：严格遵循品牌指南**
   - 全大写标题
   - 超大字号（72px → 48px → 24px）
   - 字间距加宽

5. **✅ 动画：微妙但有力**
   - Hover 悬浮（-4px, -4px）
   - 按钮按压（+4px, +4px）
   - 进度条条纹动画

---

**你同意这个方案吗？我会按照这个详细清单一步步执行改版！** 🚀

或者有任何需要调整的地方，请告诉我！
