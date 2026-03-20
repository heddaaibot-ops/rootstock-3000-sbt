# Rootstock 3000 Days 网站改版方案（核准版）

> **橙色主色调 · 简洁专业 · 严格官方规范**
> 100% 符合 Rootstock 品牌指南

网址：https://rootstock-3000-sbt.vercel.app

---

## 🎯 核心原则

### 1. 主色调：橙色
- **Rootstock Orange #FF9100** 作为主色调
- 用于标题、按钮、强调元素
- 占整体配色的 40-50%

### 2. 简洁配色
- 米色背景 + Off White 卡片
- 橙色为主 + 荧光绿为辅
- 完全无 emoji

### 3. 严格官方规范
- Nametag 按钮（胶囊形 60px）
- 标题全大写
- 官方字体层级

---

## 🎨 配色系统

### 主色调（橙色 - 40%）

```css
--primary-orange: #FF9100        /* Rootstock 橙色 - 主色调 */
```

**使用场景**：
- 所有标题（H1/H2/H3）
- 主按钮
- 数字显示
- 进度条
- 边框强调
- 链接

### 辅助色（20%）

```css
--accent-lime: #DEFF1A           /* 荧光绿 - 标签、徽章 */
```

**使用场景**：
- Nametag 标签
- Badge 徽章
- 次要高亮

### 背景色（30%）

```css
--bg-cream: #FDF8F0              /* 米色主背景 */
--bg-offwhite: #FAFAF5           /* Off White 卡片 */
```

### 深色系（10% - 替代黑色）

```css
--text-dark: #5C2E00             /* 深橙棕 - 文字 */
--border-dark: #4A1942           /* 深紫棕 - 边框 */
```

---

## ✍️ 字体系统

### 中文字体栈

```css
font-family:
  "PingFang SC",
  "Microsoft YaHei",
  "Source Han Sans CN",
  -apple-system,
  sans-serif;
```

### 标题层级（橙色主色调）

#### H1 - 大标题

```css
.heading-h1 {
  font-family: "PingFang SC", sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: #FF9100;              /* 橙色主色调 */
  padding: 8px;
}

@media (max-width: 768px) {
  .heading-h1 {
    font-size: 32px;
  }
}
```

#### H2 - 次标题

```css
.heading-h2 {
  font-family: "PingFang SC", sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: #FF9100;              /* 橙色主色调 */
}

@media (max-width: 768px) {
  .heading-h2 {
    font-size: 24px;
  }
}
```

#### H3 - 三级标题

```css
.heading-h3 {
  font-family: "PingFang SC", sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.4;
  color: #FF9100;              /* 橙色主色调 */
  padding: 4px;
}
```

#### 正文

```css
.body-text {
  font-family: "PingFang SC", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: #5C2E00;              /* 深橙棕 */
}
```

---

## 🔘 Nametag 按钮系统

### 主按钮（橙色 Nametag）

```css
.btn-primary {
  /* 官方 Nametag 形状 */
  border-radius: 60px;
  padding: 14px 40px;
  min-width: 140px;
  height: 52px;

  /* 官方字体 */
  font-family: "PingFang SC", sans-serif;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;

  /* 橙色主色调 */
  background: #FF9100;
  color: #FFFFFF;
  border: none;

  box-shadow: 0 4px 16px rgba(255, 145, 0, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(255, 145, 0, 0.5);
}
```

### 次按钮（轮廓）

```css
.btn-outline {
  border-radius: 60px;
  padding: 14px 40px;

  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;

  background: transparent;
  color: #FF9100;              /* 橙色文字 */
  border: 3px solid #FF9100;   /* 橙色边框 */

  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: #FF9100;
  color: #FFFFFF;
}
```

### Nametag 标签（荧光绿）

```css
.nametag {
  border-radius: 60px;
  padding: 10px 30px;
  min-width: 120px;
  height: 40px;

  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  text-align: center;

  background: #DEFF1A;         /* 荧光绿 */
  color: #5C2E00;

  box-shadow: 0 4px 12px rgba(222, 255, 26, 0.3);
}
```

### Badge 徽章（小号）

```css
.badge {
  border-radius: 13.65px;      /* 官方 tag 圆角 */
  padding: 6px 16px;

  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;

  background: #DEFF1A;         /* 荧光绿 */
  color: #5C2E00;
}
```

---

## 📦 组件设计

### 卡片

```css
.card {
  background: #FAFAF5;         /* Off White */
  border: 3px solid #4A1942;   /* 深紫棕边框 */
  border-radius: 4px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(92, 46, 0, 0.08);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: #FF9100;       /* Hover 变橙色边框 */
  box-shadow: 0 8px 24px rgba(255, 145, 0, 0.12);
  transform: translateY(-4px);
}
```

### 进度条

```css
.progress-container {
  width: 100%;
  height: 16px;
  background: #FAFAF5;
  border: 2px solid #4A1942;
  border-radius: 60px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #FF9100;         /* 橙色进度条 */
  border-radius: 60px;
  transition: width 0.6s ease;
}
```

---

## 📄 页面设计

### 1. Hero Section

```tsx
<section className="py-20 md:py-32 bg-[#FDF8F0]">
  <div className="container mx-auto px-6">

    {/* 顶部标签 */}
    <div className="flex justify-center mb-8">
      <span className="nametag">
        限量版本
      </span>
    </div>

    {/* 主标题 - 橙色 */}
    <h1 className="heading-h1 text-center mb-6">
      ROOTSTOCK 3000 天
    </h1>

    {/* 副标题 */}
    <p className="body-text text-center mb-12 max-w-3xl mx-auto opacity-80">
      庆祝 Rootstock 3000 天创新之旅
    </p>

    {/* CTA 按钮组 */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="btn-primary">
        免费铸造 SBT
      </button>
      <button className="btn-outline">
        了解更多
      </button>
    </div>

  </div>
</section>
```

**配色解析**：
- 背景：米色 #FDF8F0
- 标签：荧光绿 #DEFF1A
- 主标题：**橙色 #FF9100**（主色调）
- 正文：深橙棕 #5C2E00
- 主按钮：**橙色 #FF9100**
- 次按钮：橙色轮廓

---

### 2. Countdown Section

```tsx
<section className="py-16 bg-[#FAFAF5]">
  <div className="container mx-auto px-6">

    {/* 标题 - 橙色 */}
    <h2 className="heading-h2 text-center mb-12">
      距离 3000 天纪念日
    </h2>

    <div className="flex gap-4 md:gap-8 justify-center flex-wrap">

      {/* 时间块 */}
      <div className="flex flex-col items-center">
        <div className="
          bg-white
          border-[3px] border-[#4A1942]
          rounded
          w-28 h-28
          flex items-center justify-center
          shadow-md
        ">
          {/* 橙色数字 */}
          <span className="text-6xl font-black text-[#FF9100] font-mono">
            23
          </span>
        </div>

        {/* 荧光绿标签 */}
        <div className="badge mt-3">
          天
        </div>
      </div>

      {/* 时、分、秒 */}
    </div>

  </div>
</section>
```

---

### 3. Mint Section

```tsx
<section className="py-20 bg-[#FDF8F0]">
  <div className="container mx-auto px-6">

    {/* 标题 - 橙色 */}
    <h2 className="heading-h2 text-center mb-16">
      免费铸造 SBT
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

      {/* SBT 预览 */}
      <div className="card">
        {/* 橙色 Nametag */}
        <div className="
          inline-block
          border-radius: 60px
          padding: 10px 30px
          font-weight: 700
          text-transform: uppercase
          background: #FF9100
          color: #FFFFFF
          mb-6
        ">
          SBT 预览
        </div>

        <img
          src="/images/sbt-preview.png"
          alt="SBT Preview"
          className="w-full rounded border-4 border-[#4A1942]/20"
        />

        <p className="body-text mt-6 text-center opacity-80">
          独一无二的纪念 NFT，永久绑定你的钱包地址
        </p>
      </div>

      {/* 进度 + 按钮 */}
      <div className="flex flex-col justify-between">

        {/* 进度卡片 */}
        <div className="card mb-6">
          {/* 橙色标题 */}
          <h3 className="heading-h3 mb-6">
            铸造进度
          </h3>

          {/* 橙色进度条 */}
          <div className="progress-container">
            <div className="progress-bar" style="width: 41.6%"></div>
          </div>

          <div className="flex justify-between mt-3 text-sm">
            <span className="font-bold text-[#5C2E00]">1,247 / 3,000</span>
            <span className="font-bold text-[#FF9100]">41.6%</span>
          </div>
        </div>

        {/* 橙色按钮 */}
        <button className="btn-primary w-full">
          立即铸造
        </button>

      </div>
    </div>

    {/* Stats - 橙色主题 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="card text-center">
        {/* 橙色数字 */}
        <div className="text-6xl font-black text-[#FF9100] font-mono mb-4">
          2018
        </div>
        <div className="badge">启动年份</div>
      </div>

      <div className="card text-center">
        <div className="text-6xl font-black text-[#FF9100] font-mono mb-4">
          3000
        </div>
        <div className="badge">天数</div>
      </div>

      <div className="card text-center">
        <div className="text-6xl font-black text-[#FF9100] font-mono mb-4">
          1247
        </div>
        <div className="badge">已铸造</div>
      </div>

    </div>
  </div>
</section>
```

**配色解析**：
- 标题：**橙色** #FF9100
- SBT 预览标签：**橙色**
- 进度条：**橙色**
- 按钮：**橙色**
- Stats 数字：**橙色**
- Badge 标签：荧光绿

---

### 4. About Section

```tsx
<section className="py-20 bg-[#FAFAF5]">
  <div className="container mx-auto px-6">

    {/* 3 张特色卡片 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

      <div className="card min-h-[400px] flex flex-col">
        {/* 荧光绿标签 */}
        <div className="nametag mb-6 inline-block self-start">
          01 · 灵魂绑定
        </div>

        {/* 橙色标题 */}
        <h3 className="heading-h3 mb-4">
          不可转移
        </h3>

        <p className="body-text opacity-80 flex-grow">
          这是一个不可转移的 Soul Bound Token，永久绑定到你的钱包地址
        </p>
      </div>

      <div className="card min-h-[400px] flex flex-col">
        <div className="nametag mb-6 inline-block self-start">
          02 · 免费铸造
        </div>
        <h3 className="heading-h3 mb-4">完全免费</h3>
        <p className="body-text opacity-80 flex-grow">
          无需支付任何 Gas 费用，完全免费铸造
        </p>
      </div>

      <div className="card min-h-[400px] flex flex-col">
        <div className="nametag mb-6 inline-block self-start">
          03 · 限量供应
        </div>
        <h3 className="heading-h3 mb-4">仅限 3000</h3>
        <p className="body-text opacity-80 flex-grow">
          总供应量仅 3000 个，先到先得
        </p>
      </div>

    </div>

    {/* Rootstock 介绍 */}
    <div className="card">
      {/* 橙色 Nametag */}
      <div className="
        inline-block
        border-radius: 60px
        padding: 10px 30px
        font-weight: 700
        text-transform: uppercase
        background: #FF9100
        color: #FFFFFF
        mb-6
      ">
        什么是 ROOTSTOCK
      </div>

      <div className="space-y-4 body-text opacity-80">
        <p>
          Rootstock (RSK) 是建立在比特币网络上的智能合约平台...
        </p>
        <p>
          通过合并挖矿技术，Rootstock 继承了比特币网络的安全性...
        </p>
      </div>
    </div>

  </div>
</section>
```

---

### 5. FAQ Section

```tsx
<section className="py-20 bg-[#FDF8F0]">
  <div className="container mx-auto px-6">

    {/* 橙色标题 */}
    <h2 className="heading-h2 text-center mb-16">
      常见问题
    </h2>

    <div className="max-w-3xl mx-auto space-y-6">

      <details className="card group hover:border-[#FF9100]">
        <summary className="
          cursor-pointer
          text-lg font-bold text-[#5C2E00]
          flex items-center justify-between
        ">
          <span className="flex items-center gap-4">
            {/* 荧光绿 Q 图标 */}
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
            <path d="M19 9l-7 7-7-7" stroke="currentColor" stroke-width="3" fill="none"/>
          </svg>
        </summary>

        <p className="mt-4 body-text opacity-80 ml-14">
          Soul Bound Token (SBT) 是一种不可转移的 NFT，永久绑定到持有者的钱包地址
        </p>
      </details>

      {/* FAQ 2-4 */}

    </div>
  </div>
</section>
```

---

## 🎨 Tailwind 配置

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // 主色调
        'rs-orange': '#FF9100',       // Rootstock 橙色（主色调）

        // 辅助色
        'rs-lime': '#DEFF1A',         // 荧光绿（标签）

        // 背景色
        'rs-cream': '#FDF8F0',        // 米色主背景
        'rs-offwhite': '#FAFAF5',     // Off White 卡片

        // 深色系
        'rs-text-dark': '#5C2E00',    // 深橙棕（文字）
        'rs-border-dark': '#4A1942',  // 深紫棕（边框）
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
        'tag': '13.65px',
        'nametag': '60px',
      },

      boxShadow: {
        'sm': '0 2px 8px rgba(92, 46, 0, 0.08)',
        'md': '0 4px 16px rgba(92, 46, 0, 0.12)',
        'lg': '0 8px 24px rgba(92, 46, 0, 0.16)',
        'glow-orange': '0 0 24px rgba(255, 145, 0, 0.4)',
        'glow-lime': '0 0 24px rgba(222, 255, 26, 0.4)',
      },
    },
  },
  plugins: [],
}
```

---

## 📊 配色使用统计

### 橙色 #FF9100（主色调 - 40-50%）
- 所有标题（H1/H2/H3）
- 主按钮
- 次按钮轮廓
- 进度条
- Stats 数字
- 链接
- Hover 边框

### 荧光绿 #DEFF1A（辅助色 - 10-15%）
- Nametag 标签
- Badge 徽章
- Q 图标

### 米色系（背景 - 30%）
- 主背景 #FDF8F0
- 卡片背景 #FAFAF5

### 深色系（文字/边框 - 10%）
- 文字 #5C2E00
- 边框 #4A1942

---

## ✅ 改版清单

### Phase 1: 配置
- [ ] 更新 `tailwind.config.js`
- [ ] 更新 `globals.css`
- [ ] 全局替换黑色

### Phase 2: 组件
- [ ] 按钮改为 Nametag 橙色
- [ ] 卡片统一 Off White
- [ ] 进度条改为橙色
- [ ] 标签改为荧光绿

### Phase 3: 页面
- [ ] 所有标题改为橙色 + 全大写
- [ ] 所有按钮改为橙色
- [ ] 所有数字改为橙色
- [ ] 移除所有 emoji

### Phase 4: 测试
- [ ] 响应式测试
- [ ] 中文显示测试
- [ ] 橙色主色调确认

---

## 🎯 最终效果

### 配色主题
```
主色调：橙色 #FF9100（40-50%）
辅助色：荧光绿 #DEFF1A（10-15%）
背景色：米色 + Off White（30%）
深色系：深橙棕 + 深紫棕（10%）
```

### 视觉印象
- 温暖专业（米色 + 橙色）
- 简洁有力（无 emoji）
- 品牌一致（橙色主导）
- 现代规范（Nametag 系统）

---

**方案已优化！核心改进：**
- ✅ 移除所有 emoji
- ✅ 橙色作为主色调（40-50%）
- ✅ 简洁配色（5 种颜色）
- ✅ 100% 遵循官方规范

**请确认是否开始执行改版？**
