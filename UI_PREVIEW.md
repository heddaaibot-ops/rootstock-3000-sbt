# 🎨 Rootstock 3000 Days SBT - UI 预览

## 📱 页面截图预览

由于 GitHub 无法直接显示运行的网站，这里提供详细的 UI 设计说明和组件预览。

---

## 🏠 主页面设计

### 配色方案
- **主色调**: Rootstock 橙色 `#FF6B00`
- **背景色**: 深黑色 `#0A0A0A`
- **卡片背景**: 深灰色 `#1A1A1A`
- **文字颜色**: 浅灰色 `#F5F5F5`

---

## 🎯 核心组件展示

### 1. Header（页头）
```
┌────────────────────────────────────────────────────────────┐
│  🧡 Rootstock 3000   Commemorating 3000 Days              │
│                                                            │
│  About  Mint  Rootstock ↗                [Connect Wallet] │
└────────────────────────────────────────────────────────────┘
```
- 固定顶部，毛玻璃效果
- Logo + 导航链接
- ConnectKit 钱包按钮（橙色）

---

### 2. Hero Section（英雄区）
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║           🧡 Rootstock 3000 Days                        ║
║                                                          ║
║    Commemorating 3000 Days of Bitcoin-Powered           ║
║              Smart Contracts                             ║
║                                                          ║
║   Claim your Soul Bound Token to be part of this        ║
║              historic milestone.                         ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```
- 大标题，橙色 + 白色搭配
- 副标题灰色
- 淡入动画效果

---

### 3. Countdown Timer（倒数计时器）
```
┌─────────────────────────────────────────────────────────┐
│      Time Until 3000 Days Milestone                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐             │
│   │  29  │  │  15  │  │  42  │  │  08  │             │
│   │ DAYS │  │HOURS │  │ MINS │  │ SECS │             │
│   └──────┘  └──────┘  └──────┘  └──────┘             │
│                                                         │
│      Milestone Date: April 4, 2026                      │
└─────────────────────────────────────────────────────────┘
```
**特点**:
- 4 个独立卡片，深灰背景
- 橙色边框（第一个）+ 白色数字
- 每秒实时更新
- Hover 时边框变亮

---

### 4. Progress Bar（进度条）
```
┌─────────────────────────────────────────────────────────┐
│              Mint Progress                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐         │
│     │  1,234  │    │ 10,000  │    │  8,766  │         │
│     │  Minted │    │  Total  │    │Remaining│         │
│     └─────────┘    └─────────┘    └─────────┘         │
│                                                         │
│              ┌──────────────┐                          │
│              │   1.234%     │  (百分比标签)            │
│              └──────────────┘                          │
│                                                         │
│   ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░           │
│   |     |     |     |     |                            │
│   0    25K   50K   75K  100K                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
**特点**:
- 3 栏统计（橙色/白色/灰色）
- 进度条：橙色渐变 + 闪光效果
- 精确到 3 位小数的百分比
- 刻度线标记

---

### 5. Mint Button（铸造按钮）

#### 状态 1: 可铸造
```
┌─────────────────────────────────────────┐
│                                         │
│    🎟️  Mint Your SBT                   │
│         (发光橙色大按钮)                 │
│                                         │
│  Free mint • Only gas fee • One per wallet │
└─────────────────────────────────────────┘
```
- 橙色渐变背景
- Hover 时放大 + 外发光
- 脉冲动画

#### 状态 2: 铸造中
```
┌─────────────────────────────────────────┐
│                                         │
│    ⏳  Minting...                       │
│      (旋转加载动画)                      │
│                                         │
└─────────────────────────────────────────┘
```

#### 状态 3: 成功
```
┌─────────────────────────────────────────┐
│              🎉                         │
│     Successfully Minted!                │
│                                         │
│  Your Soul Bound Token has been minted │
│                                         │
│     [View Transaction ↗]               │
└─────────────────────────────────────────┘
```
- 绿色边框
- 庆祝动画
- 交易链接按钮

#### 状态 4: 已铸造
```
┌─────────────────────────────────────────┐
│              ✅                         │
│        Already Minted                   │
│                                         │
│  You have already claimed your          │
│      Soul Bound Token                   │
└─────────────────────────────────────────┘
```

#### 状态 5: 暂停中
```
┌─────────────────────────────────────────┐
│              ⏸️                         │
│        Minting Paused                   │
│                                         │
│  Minting will open soon.                │
│    Please check back later.             │
└─────────────────────────────────────────┘
```
- 黄色边框

---

### 6. About Section（关于区块）
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │    🔒    │  │    🆓    │  │    🎟️   │            │
│  │Soul Bound│  │Free Mint │  │  Limited │            │
│  │          │  │          │  │  Supply  │            │
│  │Non-trans │  │Only pay  │  │100K max  │            │
│  │ferable   │  │gas fees  │  │1 per addr│            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
│  ╔══════════════════════════════════════════════╗     │
│  ║  What is Rootstock?                          ║     │
│  ║                                              ║     │
│  ║  Rootstock (RSK) is the most secure smart   ║     │
│  ║  contract platform in the world, secured    ║     │
│  ║  by the Bitcoin network...                  ║     │
│  ╚══════════════════════════════════════════════╝     │
└─────────────────────────────────────────────────────────┘
```
- 3 个特性卡片，橙色边框
- Hover 效果
- 说明文字卡片

---

### 7. Stats Grid（统计网格）
```
┌────────────────────────────────────────────────┐
│  ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │Launch Date│ │Milestone │ │Chain ID  │      │
│  │Jan 16,2018│ │Apr 4,2026│ │   31     │      │
│  └──────────┘ └──────────┘ └──────────┘      │
│                                                │
│  ┌──────────┐                                 │
│  │ Status   │                                 │
│  │ ▶️ Live  │                                 │
│  └──────────┘                                 │
└────────────────────────────────────────────────┘
```

---

### 8. FAQ Section（常见问题）
```
┌─────────────────────────────────────────┐
│  ❓ What is a Soul Bound Token?        │
│     [Click to expand ▼]                │
├─────────────────────────────────────────┤
│  ❓ How much does it cost to mint?     │
│     [Click to expand ▼]                │
├─────────────────────────────────────────┤
│  ❓ Can I mint more than one?          │
│     [Click to expand ▼]                │
└─────────────────────────────────────────┘
```
- 手风琴式折叠
- 橙色边框高亮
- 旋转箭头动画

---

### 9. Footer（页脚）
```
┌──────────────────────────────────────────────────────┐
│  About This Project  |  Resources  |  Contract      │
│                                                      │
│  ⚠️ Important Disclaimer                           │
│  This is a commemorative Soul Bound Token with     │
│  no monetary value...                              │
│                                                      │
│  © 2026 Rootstock 3000 Days. Built with ❤️         │
└──────────────────────────────────────────────────────┘
```
- 3 栏布局
- 免责声明（黄色）
- 社交链接

---

## 🎨 动画效果

### 1. 淡入动画
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### 2. 闪光效果（进度条）
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
```

### 3. 脉冲动画（按钮）
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 📱 响应式设计

### Desktop (> 1024px)
- 3 栏布局
- 大字体
- 完整导航

### Tablet (768px - 1024px)
- 2 栏布局
- 中等字体
- 简化导航

### Mobile (< 768px)
- 1 栏布局
- 小字体
- 汉堡菜单

---

## 🎯 交互状态

### Hover 效果
- 卡片：边框变亮 `border-rsk-orange`
- 按钮：放大 `scale-105` + 外发光
- 链接：颜色变橙色

### Focus 状态
- 输入框：橙色边框
- 按钮：橙色轮廓

### Active 状态
- 按钮：缩小 `scale-95`
- 链接：加粗

---

## 🌈 颜色系统

```
Primary:   #FF6B00 (Rootstock Orange)
Dark:      #0A0A0A (Background)
Gray:      #1A1A1A (Cards)
Light:     #F5F5F5 (Text)

Hover:     #ff8533 (Lighter Orange)
Success:   #10b981 (Green)
Error:     #ef4444 (Red)
Warning:   #f59e0b (Yellow)
```

---

## 📐 间距系统

```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
```

---

## 🔤 字体系统

```
Font Family:
- Sans: 'Inter', system-ui, sans-serif
- Mono: 'JetBrains Mono', monospace

Font Sizes:
- xs:   12px
- sm:   14px
- base: 16px
- lg:   18px
- xl:   20px
- 2xl:  24px
- 3xl:  30px
- 4xl:  36px
- 5xl:  48px
- 7xl:  72px
```

---

## 🚀 查看实际 UI

### 方法 1: 本地运行（推荐）
```bash
cd frontend
npm install
npm run dev
```
然后访问: http://localhost:3000

### 方法 2: 在线预览
访问: https://rootstock-3000-sbt.vercel.app （需要先部署）

---

## 📸 UI 特点总结

✅ **现代化设计** - 暗色主题 + 橙色点缀
✅ **流畅动画** - 淡入、闪光、脉冲效果
✅ **响应式布局** - 完美适配手机/平板/桌面
✅ **Web3 集成** - ConnectKit 钱包连接
✅ **实时数据** - 自动刷新倒数和进度
✅ **多状态处理** - 清晰的视觉反馈
✅ **无障碍设计** - 语义化 HTML

---

**想看实际效果？运行 `npm run dev` 启动本地服务器！** 🚀
