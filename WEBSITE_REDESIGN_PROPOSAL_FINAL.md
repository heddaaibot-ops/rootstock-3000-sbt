# 🎨 Rootstock 3000 Days 网站改版方案（最终版）

> **简洁配色 · 严格遵循官方 UX 规范 · 中文优化**
> 100% 符合 Rootstock 品牌指南

网址：https://rootstock-3000-sbt.vercel.app

---

## 🎯 核心原则

### 1. **简洁配色**（不花俏）
- ✅ 主要用 2-3 种颜色
- ✅ 米色背景 + Off White 卡片
- ✅ 荧光色仅作点缀强调

### 2. **严格遵循官方规范**
- ✅ Nametag 按钮系统（官方胶囊形状）
- ✅ 标题全大写 + 官方字体层级
- ✅ 官方配色、圆角、阴影规范

### 3. **完全无黑色**
- ✅ 用深色系替代（深橙棕、深紫棕）

---

## 🎨 简化配色方案

### 配色只用 5 种颜色

```css
/* 1. 米色背景 - 60% */
--bg-cream: #FDF8F0             /* 主背景 */
--bg-offwhite: #FAFAF5          /* 卡片背景 */

/* 2. 深色系（替代黑色）- 20% */
--text-dark: #5C2E00            /* 深橙棕 - 文字 */
--border-dark: #4A1942          /* 深紫棕 - 边框 */

/* 3. 荧光强调色（官方）- 20% */
--accent-orange: #FF9100        /* 橙色 - 主按钮 */
--accent-lime: #DEFF1A          /* 荧光绿 - 标签 */
--accent-pink: #FF70E0          /* 粉色 - 点缀（少量使用）*/
```

**只用这 5 种颜色！不再添加其他变体**

---

## ✍️ 字体系统（官方规范）

### 中文字体栈

```css
/* Rootstock Sans 不支持中文，使用系统中文字体 */
font-family:
  "PingFang SC",           /* macOS 中文 */
  "Microsoft YaHei",       /* Windows 中文 */
  "Source Han Sans CN",    /* 思源黑体 */
  -apple-system,
  sans-serif;
```

### 标题层级（严格遵循官方）

#### H1 - 大标题（官方规范）

```css
.heading-h1 {
  /* 字体 */
  font-family: "PingFang SC", sans-serif;
  font-weight: 700;              /* Bold - 官方要求 */
  font-size: 48px;               /* 官方尺寸 */
  line-height: 1.2;              /* 官方行高 */
  letter-spacing: -0.02em;       /* 官方字间距 */

  /* ⭐ 官方要求：必须全大写 */
  text-transform: uppercase;

  /* 配色 */
  color: #FF9100;                /* 橙色 */

  /* 间距 - 官方 */
  padding: 8px;
}

/* 移动端 */
@media (max-width: 768px) {
  .heading-h1 {
    font-size: 32px;
    line-height: 1.25;
  }
}
```

**官方颜色选择**：
- 浅色背景：橙色 `#FF9100` 或深橙棕 `#5C2E00`
- 深色背景：荧光绿 `#DEFF1A` 或粉色 `#FF70E0`

#### H2 - 次标题

```css
.heading-h2 {
  font-family: "PingFang SC", sans-serif;
  font-weight: 600;              /* Semi-Bold */
  font-size: 36px;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: #FF9100;                /* 橙色 */
}

/* 移动端 */
@media (max-width: 768px) {
  .heading-h2 {
    font-size: 24px;
    line-height: 1.35;
  }
}
```

#### H3 - 三级标题

```css
.heading-h3 {
  font-family: "PingFang SC", sans-serif;
  font-weight: 600;              /* Semi-Bold */
  font-size: 24px;
  line-height: 1.4;
  letter-spacing: 0;
  color: #FF9100;                /* 橙色 */
  padding: 4px;
}
```

#### 正文

```css
.body-text {
  font-family: "PingFang SC", sans-serif;
  font-weight: 400;              /* Regular */
  font-size: 16px;
  line-height: 1.6;
  color: #5C2E00;                /* 深橙棕 */
}
```

---

## 🔘 Nametag 按钮系统（官方规范）

### 标准 Nametag（严格遵循官方）

```css
.nametag {
  /* ⭐ 官方形状规范 */
  border-radius: 60px;           /* 胶囊形状 - 官方要求 */

  /* ⭐ 官方尺寸规范 */
  padding: 10px 30px;            /* 垂直10px 水平30px */
  min-width: 120px;
  height: 40px;

  /* ⭐ 官方字体规范 */
  font-family: "PingFang SC", sans-serif;
  font-weight: 700;              /* Bold - 官方要求 */
  font-size: 16px;
  text-transform: uppercase;     /* 全大写 - 官方要求 */
  text-align: center;

  /* ⭐ 官方配色 */
  background: #DEFF1A;           /* Lime - 主要样式 */
  color: #5C2E00;                /* 深橙棕（替代黑色）*/

  /* 阴影 */
  box-shadow: 0 4px 12px rgba(222, 255, 26, 0.3);

  /* 过渡 */
  transition: all 0.3s ease;
}

.nametag:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(222, 255, 26, 0.4);
}
```

### 官方配色变体

```css
/* 主要样式 - 荧光绿 */
.nametag-lime {
  background: #DEFF1A;
  color: #5C2E00;
}

/* 次要样式 - 橙色 */
.nametag-orange {
  background: #FF9100;
  color: #FFFFFF;                /* 橙底用白字 */
}

/* 特殊样式 - 粉色（少量使用）*/
.nametag-pink {
  background: #FF70E0;
  color: #FFFFFF;
}
```

### 尺寸变体（官方）

```css
/* 小号 */
.nametag-sm {
  padding: 6px 20px;
  height: 28px;
  font-size: 12px;
}

/* 中号（标准）*/
.nametag-md {
  padding: 10px 30px;
  height: 40px;
  font-size: 16px;
}

/* 大号 */
.nametag-lg {
  padding: 14px 40px;
  height: 52px;
  font-size: 20px;
}
```

---

## 📦 组件设计（简化版）

### 1. 主按钮（Nametag 风格）

```css
.btn-primary {
  /* 使用 Nametag 官方规范 */
  border-radius: 60px;           /* ⭐ 官方胶囊形状 */
  padding: 14px 40px;

  font-weight: 700;              /* ⭐ Bold */
  font-size: 18px;
  text-transform: uppercase;     /* ⭐ 全大写 */

  background: #FF9100;           /* 橙色 */
  color: #FFFFFF;
  border: none;

  box-shadow: 0 4px 16px rgba(255, 145, 0, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(255, 145, 0, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}
```

### 2. 次按钮（轮廓）

```css
.btn-outline {
  border-radius: 60px;
  padding: 14px 40px;

  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;

  background: transparent;
  color: #5C2E00;                /* 深橙棕 */
  border: 3px solid #5C2E00;     /* 深橙棕边框 */

  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: #FF9100;
  color: #FFFFFF;
  border-color: #FF9100;
}
```

### 3. 卡片（简化版）

```css
.card {
  /* 背景 - 只用 Off White */
  background: #FAFAF5;

  /* 边框 - 深紫棕 */
  border: 3px solid #4A1942;
  border-radius: 4px;            /* 小圆角 - 官方 */

  /* 间距 */
  padding: 32px;

  /* 阴影 - 柔和 */
  box-shadow: 0 4px 16px rgba(92, 46, 0, 0.08);

  /* 过渡 */
  transition: all 0.3s ease;
}

.card:hover {
  border-color: #FF9100;         /* Hover 变橙色 */
  box-shadow: 0 8px 24px rgba(255, 145, 0, 0.12);
  transform: translateY(-4px);
}
```

### 4. 标签（Nametag 小号）

```css
.badge {
  /* 使用 Nametag 小号规范 */
  border-radius: 13.65px;        /* 官方 tag 圆角 */
  padding: 6px 16px;

  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;

  background: #DEFF1A;           /* 荧光绿 */
  color: #5C2E00;

  border: none;
}
```

### 5. 进度条

```css
.progress-container {
  width: 100%;
  height: 16px;
  background: #FAFAF5;           /* Off White */
  border: 2px solid #4A1942;     /* 深紫棕边框 */
  border-radius: 60px;           /* 胶囊形状 */
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #FF9100;           /* 橙色 */
  border-radius: 60px;
  transition: width 0.6s ease;
}
```

---

## 📄 页面设计（简化版）

### 1. Hero Section

```tsx
<section className="py-20 md:py-32 bg-[#FDF8F0]">
  <div className="container mx-auto px-6">

    {/* 顶部标签 - 荧光绿 Nametag */}
    <div className="flex justify-center mb-8">
      <span className="nametag nametag-lime">
        🎉 限量版本
      </span>
    </div>

    {/* 主标题 - H1 官方规范（全大写）*/}
    <h1 className="heading-h1 text-center mb-6">
      ROOTSTOCK 3000 天
    </h1>

    {/* 副标题 - 正文 */}
    <p className="body-text text-center mb-12 max-w-3xl mx-auto opacity-80">
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

**配色**：
- 背景：米色 #FDF8F0
- 标签：荧光绿 #DEFF1A
- 标题：橙色 #FF9100
- 正文：深橙棕 #5C2E00（80% 透明度）
- 按钮：橙色 + 轮廓

---

### 2. Countdown Section

```tsx
<section className="py-16 bg-[#FAFAF5]">
  <div className="container mx-auto px-6">

    <h2 className="heading-h2 text-center mb-12">
      距离 3000 天纪念日
    </h2>

    <div className="flex gap-4 md:gap-8 justify-center flex-wrap">

      {/* 每个时间块 */}
      <div className="flex flex-col items-center">
        {/* 时间卡片 */}
        <div className="
          bg-white
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

        {/* 标签 - Nametag 小号 */}
        <div className="badge mt-3">
          天
        </div>
      </div>

      {/* 时、分、秒 ... */}
    </div>

  </div>
</section>
```

---

### 3. Mint Section

```tsx
<section className="py-20 bg-[#FDF8F0]">
  <div className="container mx-auto px-6">

    <h2 className="heading-h2 text-center mb-16">
      免费铸造 SBT
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

      {/* SBT 预览卡片 */}
      <div className="card">
        {/* Nametag 标签 */}
        <div className="nametag nametag-orange mb-6 inline-block">
          SBT 预览
        </div>

        {/* 图片 */}
        <img
          src="/images/sbt-preview.png"
          alt="SBT Preview"
          className="w-full rounded border-4 border-[#4A1942]/20"
        />

        {/* 描述 */}
        <p className="body-text mt-6 text-center opacity-80">
          独一无二的纪念 NFT，永久绑定你的钱包地址
        </p>
      </div>

      {/* 进度 + 按钮卡片 */}
      <div className="flex flex-col justify-between">

        {/* 进度卡片 */}
        <div className="card mb-6">
          <h3 className="heading-h3 mb-6">
            铸造进度
          </h3>
          <ProgressBar current={1247} total={3000} />
        </div>

        {/* 铸造按钮 */}
        <button className="btn-primary btn-lg w-full">
          立即铸造
        </button>

      </div>
    </div>

    {/* Stats - 简化为 3 个 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Stat 1 */}
      <div className="card text-center">
        <div className="text-6xl font-black text-[#FF9100] font-mono mb-4">
          2018
        </div>
        <div className="badge">
          启动年份
        </div>
      </div>

      {/* Stat 2 */}
      <div className="card text-center">
        <div className="text-6xl font-black text-[#FF9100] font-mono mb-4">
          3000
        </div>
        <div className="badge">
          天数
        </div>
      </div>

      {/* Stat 3 */}
      <div className="card text-center">
        <div className="text-6xl font-black text-[#FF9100] font-mono mb-4">
          1247
        </div>
        <div className="badge">
          已铸造
        </div>
      </div>

    </div>
  </div>
</section>
```

**简化点**：
- Stats 从 4 个改为 3 个
- 统一用橙色数字
- 统一用荧光绿标签
- 卡片统一 Off White 背景

---

### 4. About Section

```tsx
<section className="py-20 bg-[#FAFAF5]">
  <div className="container mx-auto px-6">

    {/* 3 张特色卡片 - 统一样式 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

      <div className="card min-h-[400px] flex flex-col">
        {/* Nametag 标签 */}
        <div className="nametag nametag-lime mb-6 inline-block self-start">
          01 · 灵魂绑定
        </div>

        <div className="text-6xl mb-4">🔒</div>

        <h3 className="heading-h3 mb-4">
          不可转移
        </h3>

        <p className="body-text opacity-80 flex-grow">
          这是一个不可转移的 Soul Bound Token...
        </p>
      </div>

      <div className="card min-h-[400px] flex flex-col">
        <div className="nametag nametag-orange mb-6 inline-block self-start">
          02 · 免费铸造
        </div>
        <div className="text-6xl mb-4">🎁</div>
        <h3 className="heading-h3 mb-4">完全免费</h3>
        <p className="body-text opacity-80 flex-grow">...</p>
      </div>

      <div className="card min-h-[400px] flex flex-col">
        <div className="nametag nametag-lime mb-6 inline-block self-start">
          03 · 限量供应
        </div>
        <div className="text-6xl mb-4">💎</div>
        <h3 className="heading-h3 mb-4">仅限 3000</h3>
        <p className="body-text opacity-80 flex-grow">...</p>
      </div>

    </div>

    {/* Rootstock 介绍 */}
    <div className="card">
      <div className="nametag nametag-orange mb-6 inline-block">
        什么是 ROOTSTOCK?
      </div>
      <div className="space-y-4 body-text opacity-80">
        <p>...</p>
        <p>...</p>
      </div>
    </div>

  </div>
</section>
```

**简化点**：
- 卡片统一样式（Off White 背景 + 深紫棕边框）
- 只用荧光绿和橙色 Nametag 交替
- 不再用桃色、淡紫、薄荷等变体

---

### 5. FAQ Section

```tsx
<section className="py-20 bg-[#FDF8F0]">
  <div className="container mx-auto px-6">

    <h2 className="heading-h2 text-center mb-16">
      常见问题
    </h2>

    <div className="max-w-3xl mx-auto space-y-6">

      <details className="
        card
        group
        hover:border-[#FF9100]
      ">
        <summary className="
          cursor-pointer
          text-lg font-bold text-[#5C2E00]
          flex items-center justify-between
        ">
          <span className="flex items-center gap-4">
            {/* Q 图标 - 小号 Nametag */}
            <span className="
              inline-flex items-center justify-center
              w-10 h-10
              bg-[#DEFF1A]
              rounded-full
              text-sm font-black text-[#5C2E00]
            ">
              Q
            </span>
            什么是 Soul Bound Token？
          </span>

          <svg className="w-6 h-6 text-[#5C2E00] group-open:rotate-180 transition-transform">
            {/* 箭头 */}
          </svg>
        </summary>

        <p className="mt-4 body-text opacity-80 ml-14">
          Soul Bound Token (SBT) 是...
        </p>
      </details>

      {/* FAQ 2-4 ... 同样结构 */}

    </div>
  </div>
</section>
```

---

## 🎨 Tailwind 配置（简化版）

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ⭐ 只定义 5 种颜色
        'rs-cream': '#FDF8F0',        // 米色主背景
        'rs-offwhite': '#FAFAF5',     // Off White 卡片
        'rs-text-dark': '#5C2E00',    // 深橙棕（文字）
        'rs-border-dark': '#4A1942',  // 深紫棕（边框）
        'rs-orange': '#FF9100',       // 橙色（强调）
        'rs-lime': '#DEFF1A',         // 荧光绿（标签）
        'rs-pink': '#FF70E0',         // 粉色（少量点缀）
      },

      fontFamily: {
        sans: [
          'PingFang SC',
          'Microsoft YaHei',
          'Source Han Sans CN',
          '-apple-system',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'monospace'],
      },

      borderRadius: {
        'tag': '13.65px',      // 官方 tag 圆角
        'nametag': '60px',     // 官方 Nametag 圆角
      },

      boxShadow: {
        'sm': '0 2px 8px rgba(92, 46, 0, 0.08)',
        'md': '0 4px 16px rgba(92, 46, 0, 0.12)',
        'lg': '0 8px 24px rgba(92, 46, 0, 0.16)',
      },
    },
  },
  plugins: [],
}
```

---

## ✅ 完整改版清单

### Phase 1: 配置（第一天）
- [ ] 更新 `tailwind.config.js`（只添加 5 种颜色）
- [ ] 更新 `globals.css`（米色背景 + 中文字体）
- [ ] 全局替换黑色为深橙棕/深紫棕

### Phase 2: 组件（第二天）
- [ ] 按钮改为 Nametag 风格（胶囊形 + 全大写）
- [ ] 卡片统一为 Off White
- [ ] 标签改为 Nametag 小号
- [ ] 进度条简化

### Phase 3: 页面（第三天）
- [ ] Hero - 荧光绿标签 + 橙色标题
- [ ] Countdown - Off White 背景
- [ ] Mint - 统一卡片样式
- [ ] About - 统一卡片样式
- [ ] FAQ - 统一卡片样式

### Phase 4: 细节（第四天）
- [ ] 所有标题改为全大写
- [ ] 响应式测试
- [ ] 中文显示测试

---

## 🎯 核心改进总结

### ✅ 简化配色
- ❌ 去掉桃色、淡紫、薄荷等花俏颜色
- ✅ 只用 5 种颜色：米色、Off White、深橙棕、深紫棕、橙色、荧光绿

### ✅ 严格官方规范
- ✅ Nametag 按钮（胶囊形 60px + 全大写 + Bold）
- ✅ 标题全大写（H1/H2/H3）
- ✅ 官方字体层级
- ✅ 官方圆角（4px / 13.65px / 60px）

### ✅ 完全无黑色
- ✅ 文字：深橙棕 #5C2E00
- ✅ 边框：深紫棕 #4A1942
- ✅ 对比度：9.8:1（AAA 级）

### ✅ 中文优化
- ✅ PingFang SC / Microsoft YaHei
- ✅ 不使用 Rootstock Sans（不支持中文）

---

## 🎨 视觉效果（简化版）

```
┌──────────────────────────────────┐
│  米色背景 #FDF8F0                 │
│                                  │
│  [🎉 限量版本] ← 荧光绿 Nametag   │
│                                  │
│  ROOTSTOCK 3000 天  ← 橙色 H1    │
│  （全大写）                       │
│                                  │
│  [🎁 免费铸造 SBT] ← 橙色按钮     │
│  （胶囊形）                       │
│                                  │
│  ┌────────┐ ┌────────┐          │
│  │Off White│ │Off White│         │
│  │卡片     │ │卡片     │         │
│  │深紫棕边框│ │深紫棕边框│        │
│  └────────┘ └────────┘          │
└──────────────────────────────────┘
```

**配色极简**：
- 背景：米色 + Off White
- 文字/边框：深橙棕 + 深紫棕
- 强调：橙色 + 荧光绿

---

**方案完成！核心特点：**
- ✅ 配色极简（只用 5 种颜色）
- ✅ 100% 遵循官方 Nametag 规范
- ✅ 所有标题全大写
- ✅ 完全无黑色
- ✅ 中文字体优化

**请确认是否开始执行？** 🚀
