# Rootstock 品牌指南 · 超详细版

> **完整官方品牌规范手册 · 2023年9月版**
> 从 Figma 官方设计文件提取的详尽品牌设计规范
> 包含所有 Figma 节点 ID 和素材来源标记

---

## 📋 文档元数据

| 属性 | 值 |
|------|-----|
| **文件名** | Rootstock • Brand Guidelines and Assets - 28 sep 2023 |
| **Figma URL** | https://www.figma.com/design/p8vSjmXwiR4vyqGQDD8A3u/ |
| **版本** | V1.0 2022 |
| **最后修改** | 2026-03-18 10:09:13 UTC |
| **文件类型** | Figma Design File |
| **权限** | Viewer |
| **总页面数** | 14 个 Canvas |
| **提取时间** | 2026-03-20 |

---

## 📑 文件结构总览

### Figma 页面列表

| Node ID | 页面名称 | 子元素数 | 状态 | 用途 |
|---------|---------|---------|------|------|
| `64:1806` | Cover | - | ✅ | 品牌指南封面 |
| `75:1286` | -------------------- | - | - | 分隔符 |
| `0:1` | 🖼 • Overview | - | ✅ | 指南概览说明 |
| `60:4117` | Guidlines • Introduction | 3 | ✅ | 品牌介绍 |
| `60:4110` | Guidlines • Tone Of Voice | 8 | ✅ | 语气风格 |
| `60:4111` | Guidlines • Logo | 18 | ✅ | Logo 规范 |
| `60:4112` | Guidlines • Typography | 17 | ✅ | 字体规范 |
| `60:4113` | Guidlines • Colour | 9 | ✅ | 配色规范 |
| `60:4114` | Guidlines • Illustration | 37 | ✅ | 插画规范 |
| `60:4115` | Guidlines • Nametags | 13 | ✅ | 名牌系统 |
| `60:4116` | Guidlines • Brand In Use | 13 | ✅ | 品牌应用 |
| `3:19` | 🗂 • Templates | - | ✅ | 模板库 |
| `75:1287` | -------------------- | - | - | 分隔符 |
| `41:1030` | 🎛 • Style Sheet | - | ✅ | 样式表 |

---

## 🎨 配色系统（Colour Guidelines）

**Figma Node:** `60:4113` - Guidlines • Colour
**素材位置:** `/tmp/rootstock-color.png`
**子元素数:** 9 个 Frame

### 完整配色色板

#### 主色板（Primary Colors）

| 颜色名称 | Figma Style ID | HEX | RGB | CMYK | 用途 |
|---------|---------------|-----|-----|------|------|
| **Rootstock Orange** | `12:726` | `#FF9100` | `255, 145, 0` | `0, 43, 100, 0` | 🔥 **主强调色** - CTA、按钮、图标 |
| **Rootstock Pink** | `12:724` | `#FF70E0` | `255, 112, 224` | `0, 56, 12, 0` | 💗 **次强调色** - 标题、高亮、标签 |
| **Rootstock Green** | `12:725` | `#78C700` | `120, 199, 0` | `40, 0, 100, 22` | 💚 **品牌绿** - 成功状态、装饰 |
| **R Black** | `12:719` | `#000000` | `0, 0, 0` | `0, 0, 0, 100` | ⚫ **主背景** - 深色主题背景 |
| **R Off White** | `12:720` | `#FAFAF5` | `250, 250, 245` | `0, 0, 2, 2` | ⚪ **浅色背景** - 明亮主题背景 |

#### 辅助色板（Secondary Colors）

| 颜色名称 | Figma Style ID | HEX | RGB | CMYK | 用途 |
|---------|---------------|-----|-----|------|------|
| **Purple** | `12:721` | `#9E75FF` | `158, 117, 255` | `38, 54, 0, 0` | 🟣 **辅助色1** - 装饰、渐变 |
| **Lime** | `12:723` | `#DEFF1A` | `222, 255, 26` | `13, 0, 90, 0` | 💛 **荧光黄绿** - 醒目标题、高亮 |
| **Cyan** | `12:722` | `#08FFD1` | `8, 255, 209` | `97, 0, 18, 0` | 🔵 **辅助色2** - 装饰、链接 |

### Figma Style Keys（供开发使用）

```json
{
  "12:719": {
    "key": "070048fde9ca3e54b2dacf433494716a873defb4",
    "name": "Rootstock Colour Palette | R Black",
    "styleType": "FILL"
  },
  "12:720": {
    "key": "64baa28e3e89254d7980c193aaaee9875de586ea",
    "name": "Rootstock Colour Palette | R Off White",
    "styleType": "FILL"
  },
  "12:721": {
    "key": "96c1054d7ac08589025db694c8b0b8012d083382",
    "name": "Rootstock Colour Palette | R Purple",
    "styleType": "FILL"
  },
  "12:722": {
    "key": "5312e48a77469126d8a0ce00fadcdc6f4669d577",
    "name": "Rootstock Colour Palette | R Cyan",
    "styleType": "FILL"
  },
  "12:723": {
    "key": "12005c6cf5be2f362dda1ce9c4f8a993640aa0c9",
    "name": "Rootstock Colour Palette | R Lime",
    "styleType": "FILL"
  },
  "12:724": {
    "key": "5c0e8a21792061ab02a085e07c53e6354b69af77",
    "name": "Rootstock Colour Palette | R Pink",
    "styleType": "FILL"
  },
  "12:725": {
    "key": "477eb9ab872078fbbb651cbf56572b8b1ce0166e",
    "name": "Rootstock Colour Palette | R Green",
    "styleType": "FILL"
  },
  "12:726": {
    "key": "b72e10dadb0944c53a2b397d74c666f0af7a1b3d",
    "name": "Rootstock Colour Palette | R Orange",
    "styleType": "FILL"
  }
}
```

### 配色使用规范

#### 1. **配色组合方案（Color Combinations）**

**方案 A - 经典黑底荧光**（最常用）：
- **背景**: `#000000` (R Black)
- **主标题**: `#DEFF1A` (Lime) - 荧光黄绿，醒目
- **副标题**: `#FF9100` (Orange) - 橙色强调
- **正文**: `#FAFAF5` (Off White) - 米白色文字
- **CTA 按钮**: `#FF9100` (Orange) 背景 + `#000000` (Black) 文字
- **装饰元素**: `#FF70E0` (Pink), `#9E75FF` (Purple)

**Figma 参考**: Node `64:1384` (Colour Guidelines 主页面)

**方案 B - 白底深色**：
- **背景**: `#FAFAF5` (Off White)
- **主标题**: `#000000` (Black) 或 `#FF9100` (Orange)
- **正文**: `#000000` (Black)
- **强调**: `#FF9100` (Orange), `#FF70E0` (Pink)
- **装饰**: `#9E75FF` (Purple), `#78C700` (Green)

**Figma 参考**: Node `75:1293` (Logo 页面 Off White 背景部分)

**方案 C - 多色组合**（活力型）：
- **背景**: `#000000` (Black)
- **色块组合**: Orange + Pink + Green + Purple + Cyan + Lime
- **文字**: `#FAFAF5` (Off White) 或 `#000000` (Black)
- **用途**: 海报、社交媒体、活动宣传

**Figma 参考**: 指南中的彩色条纹示例

#### 2. **色彩层级系统（Color Hierarchy）**

```
Level 1（主视觉） -> Rootstock Orange (#FF9100)
    ↓
Level 2（次强调） -> Rootstock Pink (#FF70E0), Lime (#DEFF1A)
    ↓
Level 3（辅助装饰） -> Purple (#9E75FF), Green (#78C700), Cyan (#08FFD1)
    ↓
Level 4（基础） -> Black (#000000), Off White (#FAFAF5)
```

#### 3. **颜色使用禁忌**

❌ **不要做的事**：
- 不要在浅色背景使用 Lime（`#DEFF1A`），对比度不足
- 不要在深色背景使用 Black 文字
- 不要同时使用超过 4 种主要颜色
- 不要使用未经品牌批准的颜色
- 不要改变颜色的透明度超过 20%

✅ **应该做的事**：
- 确保文字和背景对比度至少 4.5:1（WCAG AA 标准）
- 使用 Orange 作为主要 CTA 颜色
- 保持配色一致性
- 在深色背景优先使用荧光色
- 使用官方 Figma Style IDs

#### 4. **色块应用（Color Blocking）**

**大面积色块规则**：
- **橙色色块**: 适用于 Hero Section、大标题背景
  - 颜色: `#FF9100`
  - 文字: `#000000` (Black)
  - 圆角: 0-4px

- **荧光黄绿色块**: 适用于醒目标题、强调信息
  - 颜色: `#DEFF1A`
  - 文字: `#000000` (Black)
  - 圆角: 0px（直角更有力量感）

- **多色条纹**: 适用于装饰、背景、分隔符
  - 颜色组合: Orange / Pink / Green / Purple / Cyan / Lime
  - 宽度: 等宽或按视觉权重调整
  - 排列: 横向或纵向

**Figma 参考**:
- Node `64:1426` - 橙色大色块示例
- Node `64:1428` - 多色组合示例

### CSS 变量定义

```css
:root {
  /* 主色板 */
  --rootstock-orange: #FF9100;
  --rootstock-pink: #FF70E0;
  --rootstock-green: #78C700;
  --rootstock-black: #000000;
  --rootstock-offwhite: #FAFAF5;

  /* 辅助色板 */
  --rootstock-purple: #9E75FF;
  --rootstock-lime: #DEFF1A;
  --rootstock-cyan: #08FFD1;

  /* RGB 格式（用于透明度） */
  --rgb-orange: 255, 145, 0;
  --rgb-pink: 255, 112, 224;
  --rgb-lime: 222, 255, 26;
  --rgb-purple: 158, 117, 255;
  --rgb-green: 120, 199, 0;
  --rgb-cyan: 8, 255, 209;

  /* 语义化颜色 */
  --color-primary: var(--rootstock-orange);
  --color-secondary: var(--rootstock-pink);
  --color-success: var(--rootstock-green);
  --color-accent: var(--rootstock-lime);
  --color-bg-dark: var(--rootstock-black);
  --color-bg-light: var(--rootstock-offwhite);
  --color-text-light: var(--rootstock-offwhite);
  --color-text-dark: var(--rootstock-black);
}
```

---

## 🔤 字体系统（Typography Guidelines）

**Figma Node:** `60:4112` - Guidlines • Typography
**素材位置:** `/tmp/rootstock-typography.png`
**子元素数:** 17 个 Frame

### 主字体家族

#### **Rootstock Sans**

**字体来源**: 品牌专用定制字体
**字符集支持**:
- **大写字母**: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
- **小写字母**: `abcdefghijklmnopqrstuvwxyz`
- **数字**: `0123456789`
- **符号**: `@!*#$%^&*()_+-=[]{}|;:'",.<>?/`

**字重（Font Weights）**:
- Regular (400)
- Semi-Bold (600)
- Bold (700)

**Figma 参考**: Typography 页面展示完整字符集示例

### 字体层级系统

#### **H1 - 大标题**

**Figma Component**: `57:2312` (Size=H1, Colour=Rootstock Pink, Padding=Padding)

```css
.heading-h1 {
  font-family: 'Rootstock Sans', sans-serif;
  font-weight: 700; /* Bold */
  font-size: 48px;
  line-height: 1.2; /* 57.6px */
  letter-spacing: -0.02em; /* -0.96px */
  text-transform: uppercase; /* 全大写 */
  color: var(--rootstock-lime); /* 或 Pink/Orange */
}

/* 移动端 */
@media (max-width: 768px) {
  .heading-h1 {
    font-size: 32px;
    line-height: 1.25; /* 40px */
  }
}
```

**使用场景**:
- 页面主标题
- Hero Section 大标题
- 重要公告标题

**颜色选择**:
- 深色背景: `#DEFF1A` (Lime) 或 `#FF70E0` (Pink)
- 浅色背景: `#000000` (Black) 或 `#FF9100` (Orange)

**Padding**:
- 上下: 8px
- 左右: 8px

#### **H2 - 次标题**

```css
.heading-h2 {
  font-family: 'Rootstock Sans', sans-serif;
  font-weight: 600; /* Semi-Bold */
  font-size: 36px;
  line-height: 1.3; /* 46.8px */
  letter-spacing: -0.01em;
  color: var(--rootstock-orange);
}

/* 移动端 */
@media (max-width: 768px) {
  .heading-h2 {
    font-size: 24px;
    line-height: 1.35; /* 32.4px */
  }
}
```

**使用场景**:
- 页面段落标题
- 内容模块标题
- 卡片主标题

#### **H3 - 三级标题**

**Figma Component**: `57:2335` (Size=H3, Colour=Orange, Padding=Padding)

```css
.heading-h3 {
  font-family: 'Rootstock Sans', sans-serif;
  font-weight: 600; /* Semi-Bold */
  font-size: 24px;
  line-height: 1.4; /* 33.6px */
  letter-spacing: 0;
  color: var(--rootstock-orange);
  padding: 4px;
}

/* 移动端 */
@media (max-width: 768px) {
  .heading-h3 {
    font-size: 20px;
    line-height: 1.4; /* 28px */
  }
}
```

**颜色变体**:
- Orange (`#FF9100`)
- White (`#FAFAF5`)
- Purple (`#9E75FF`)
- Rootstock Green (`#78C700`)
- Rootstock Pink (`#FF70E0`)
- Lime (`#DEFF1A`)
- Cyan (`#08FFD1`)

**Figma Component IDs**:
- `57:2335` - H3 Orange
- `57:2332` - H3 White
- `57:2293` - H3 Purple
- `57:2333` - H3 Rootstock Green
- `57:2337` - H3 Rootstock Pink
- `57:2338` - H3 Lime
- `57:2340` - H3 Cyan

#### **Body Text - 正文**

```css
.body-text {
  font-family: 'Rootstock Sans', sans-serif;
  font-weight: 400; /* Regular */
  font-size: 16px;
  line-height: 1.6; /* 25.6px */
  letter-spacing: 0;
  color: var(--rootstock-offwhite); /* 深色背景 */
  /* 或 */
  color: var(--rootstock-black); /* 浅色背景 */
}

/* 移动端 */
@media (max-width: 768px) {
  .body-text {
    font-size: 14px;
    line-height: 1.6; /* 22.4px */
  }
}
```

**使用场景**:
- 段落文字
- 描述文字
- 列表内容

#### **Caption / Small Text - 小字号**

```css
.caption-text {
  font-family: 'Rootstock Sans', sans-serif;
  font-weight: 400; /* Regular */
  font-size: 12px;
  line-height: 1.5; /* 18px */
  letter-spacing: 0.01em;
  color: rgba(250, 250, 245, 0.7); /* 深色背景 */
  /* 或 */
  color: rgba(0, 0, 0, 0.6); /* 浅色背景 */
}
```

**使用场景**:
- 图片说明
- 辅助信息
- 时间戳
- 版权信息

### 字体应用实例

#### **示例 1: 黑底荧光标题**

**Figma 参考**: Typography 页面 "Spac" 示例

```html
<div style="background: #000000; padding: 40px;">
  <h1 style="
    font-family: 'Rootstock Sans';
    font-size: 120px;
    font-weight: 700;
    color: #FF70E0; /* Pink */
    text-transform: uppercase;
  ">SPAC</h1>
</div>
```

#### **示例 2: 彩色高亮文字**

**Figma 参考**: Typography 页面 "Leading and tracking spe..." 示例

```html
<span style="color: #78C700;">Leading</span>
<span style="color: #FF9100;">and</span>
<span style="color: #FF70E0;">tracking</span>
<span style="color: #9E75FF;">space</span>
```

#### **示例 3: 橙色背景黑字标题**

**Figma 参考**: Brand In Use 页面 "Build together" 示例

```html
<div style="
  background: #FF9100;
  padding: 20px 40px;
  display: inline-block;
">
  <span style="
    font-family: 'Rootstock Sans';
    font-size: 36px;
    font-weight: 700;
    color: #000000;
    text-transform: lowercase;
  ">Build together</span>
</div>
```

### Leading 和 Tracking（行距和字距）

**Figma 参考**: Typography 页面右侧示意图

#### **Leading（行距）**

- **H1**: 1.2 (紧凑)
- **H2**: 1.3 (标准)
- **H3**: 1.4 (舒适)
- **Body**: 1.6 (宽松，提高可读性)
- **Caption**: 1.5 (平衡)

#### **Tracking（字距）**

- **大标题 H1**: -0.02em (略紧，增强力量感)
- **H2/H3**: 0 或 -0.01em (标准)
- **正文**: 0 (标准)
- **小字号**: 0.01em (略宽，提高可读性)

### Typography Modes（字体模式）

#### **Mode 1: Outlined（描边模式）**

适用于深色背景的大标题：

```css
.outlined-text {
  -webkit-text-stroke: 2px #DEFF1A;
  -webkit-text-fill-color: transparent;
  font-size: 72px;
  font-weight: 700;
}
```

#### **Mode 2: Published（发布模式）**

实际应用的标准文字：

```css
.published-text {
  color: #DEFF1A;
  background: none;
  font-weight: 700;
}
```

#### **Mode 3: Highlighted（高亮模式）**

黄色/橙色背景 + 黑色文字：

```css
.highlighted-text {
  background: #DEFF1A; /* 或 #FF9100 */
  color: #000000;
  padding: 4px 12px;
  display: inline-block;
}
```

### 字体回退方案（Font Fallback）

```css
.rootstock-text {
  font-family: 'Rootstock Sans',
               -apple-system,
               BlinkMacSystemFont,
               'Segoe UI',
               Roboto,
               'Helvetica Neue',
               Arial,
               sans-serif;
}
```

---

## 🎨 Logo 系统（Logo Guidelines）

**Figma Node:** `60:4111` - Guidlines • Logo
**素材位置:** `/tmp/rootstock-logo.png`
**子元素数:** 18 个 Frame

### Logo 文件格式

#### **可用格式及 Figma Export Settings**

| 格式 | Figma Node ID | 类型 | 用途 | 导出设置 |
|------|--------------|------|------|---------|
| SVG - Lock-up | `9120:31` | 文字+图标 | 网页、矢量应用 | SVG, Scale: 1x |
| SVG - Logo | - | 仅图标 | Favicon, App图标 | SVG, Scale: 1x |
| PNG - Lock-up | `83:2264` | 文字+图标 | 社交媒体、文档 | PNG, Scale: 4x |
| PNG - Lock-up | `618:310` | 文字+图标 | 标准使用 | PNG, Scale: 1x |
| PNG - Logo | `9457:45` | 仅图标 | 小尺寸应用 | PNG, Scale: 4x |

**导出命令** (从 Figma):
1. 选择对应 Node
2. 右下角 Export 面板
3. 选择格式（SVG/PNG）
4. 点击 Export

### Logo 构成元素

#### **花形图标（Icon）**

**设计特征**:
- **形状**: 8个圆形组成的花形/树根结构
- **主色**: Rootstock Orange (`#FF9100`)
- **黑色版本**: `#000000`
- **尺寸**: 可缩放矢量图形

**象征意义**:
- 树根 = Rootstock 的词义
- 8个节点 = 去中心化、网络连接
- 有机形状 = 生长、发展

**Figma 参考**:
- Node `83:2264` (橙色 PNG 版本)
- Node `9120:31` (SVG 版本)

#### **文字部分（Wordmark）**

**字体**: Rootstock Sans Bold
**大小写**:
- 标准: 首字母大写 "Rootstock"
- 全小写: "rootstock" (某些应用场景)

**颜色变体**:
- 橙色 (`#FF9100`)
- 黑色 (`#000000`)

### Logo 使用规范

#### **最小尺寸（Minimum Size）**

**Lock-up（文字+图标）**:
- 数字媒体: 最小宽度 120px
- 印刷品: 最小宽度 30mm

**仅图标（Icon Only）**:
- 数字媒体: 最小尺寸 32x32px
- 印刷品: 最小尺寸 10x10mm

#### **安全区域（Safe Space）**

Logo 四周必须保持等于图标高度的空白区域：

```
┌─────────────────────────────────┐
│         (Safe Space)            │
│    ┌───────────────────┐       │
│    │                   │       │
│    │   [Rootstock]     │       │
│    │    [Logo]         │       │
│    │                   │       │
│    └───────────────────┘       │
│         (Safe Space)            │
└─────────────────────────────────┘
```

**尺寸**: Safe Space = Icon Height × 1

#### **背景使用规则**

**深色背景 (Dark Backgrounds)**:
- 使用橙色版本 (`#FF9100`)
- 或白色/米白版本 (`#FAFAF5`)
- 背景色范围: `#000000` 至 `#4A4A4A`

**浅色背景 (Light Backgrounds)**:
- 使用黑色版本 (`#000000`)
- 或橙色版本 (`#FF9100`)
- 背景色范围: `#FFFFFF` 至 `#E0E0E0`

**彩色背景**:
- 优先使用黑色或白色版本
- 确保对比度足够（至少 4.5:1）

**Figma 参考**:
- Node `64:1175` - 黑色背景示例
- Node `75:1293` - 浅色背景示例

#### **Logo 禁忌（Don'ts）**

❌ **严禁的操作**:

1. **不要拉伸变形**
   - ❌ 只拉宽或只拉高
   - ✅ 等比例缩放

2. **不要改变颜色**
   - ❌ 使用非官方颜色
   - ❌ 添加渐变效果
   - ✅ 只使用橙色/黑色/白色

3. **不要旋转使用**
   - ❌ 旋转任何角度
   - ✅ 保持水平正立

4. **不要添加效果**
   - ❌ 阴影、发光、描边
   - ✅ 保持简洁原始

5. **不要重新排列**
   - ❌ 改变图标和文字的位置关系
   - ✅ 使用官方 Lock-up

6. **不要在复杂背景使用**
   - ❌ 图片背景、花纹背景
   - ✅ 纯色背景或加半透明遮罩

### Logo 应用场景

#### **数字媒体**

**网站**:
- Header Logo: Lock-up, 高度 40-60px
- Footer Logo: Lock-up 或 Icon Only, 高度 32-48px
- Favicon: Icon Only, 32x32px (建议 SVG)

**移动应用**:
- App Icon: Icon Only, 1024x1024px (iOS), 512x512px (Android)
- Splash Screen: Lock-up, 居中
- 导航栏: Lock-up 或 Icon Only, 高度 32-40px

**社交媒体**:
- Profile Picture: Icon Only, 圆形裁剪, 400x400px
- Cover Image: Lock-up, 1500x500px (Twitter), 820x312px (Facebook)
- Posts: Lock-up, 最小 120px 宽

**Figma 参考**: Node `60:4116` (Brand In Use) 展示社交媒体应用

#### **印刷品**

**名片**:
- 正面: Lock-up, 宽度 30-50mm
- 背面: Icon Only 或 Lock-up, 较小尺寸

**海报/传单**:
- 主视觉: Lock-up, 占页面宽度 20-30%
- 辅助位置: Icon Only, 10-20mm

**T恤/周边**:
- 胸前: Lock-up 或 Icon Only, 宽度 15-25cm
- 袖子: Icon Only, 直径 5-8cm
- 背面: Lock-up, 宽度 20-35cm

**Figma 参考**:
- Node `60:4116` (Brand In Use) 展示 T恤、帆布袋应用
- 帆布袋示例: 白色 Logo 在黑色背景

#### **硬件设备**

**钱包设备**:
- 屏幕显示: Icon Only 或 Lock-up
- 外壳印刷: Icon Only, 激光雕刻或丝印

**包装盒**:
- 正面: Lock-up, 居中
- 侧面: Icon Only 或品牌名

**Figma 参考**: Brand In Use 页面展示硬件钱包应用

### Logo 文件导出指南

#### **从 Figma 导出 Logo**

**步骤**:
1. 打开 Figma 文件
2. 导航到 "Guidlines • Logo" 页面 (Node `60:4111`)
3. 滚动到底部 "Assets" 区域 (Node `75:1293`)
4. 选择对应的 Logo 图层:
   - SVG Lock-up: 选择 "Layer_1-2" (Node `9120:31`)
   - PNG Logo: 选择对应的 Icon (Node `83:2264`, `9457:45`)
5. 右侧面板点击 Export
6. 选择格式和缩放比例
7. 点击 "Export" 下载

**推荐导出设置**:

| 用途 | 格式 | Scale | 文件名 |
|------|------|-------|--------|
| 网页 SVG | SVG | 1x | rootstock-logo.svg |
| 网页 PNG | PNG | 2x | rootstock-logo@2x.png |
| 高清 PNG | PNG | 4x | rootstock-logo@4x.png |
| Favicon | PNG | 1x | rootstock-icon.png |
| Print | PNG | 4x | rootstock-logo-print.png |

---

## 🎨 插画系统（Illustration Guidelines）

**Figma Node:** `60:4114` - Guidlines • Illustration
**素材位置:** `/tmp/rootstock-illustration.png`
**子元素数:** 37 个 Frame

### 插画风格定义

#### **核心视觉特征**

1. **几何抽象风格**
   - 使用简单几何形状（矩形、圆形、线条）
   - 网格系统和模块化设计
   - 等距视角（Isometric）插画

2. **配色方案**
   - 主色: 黑色 (`#000000`) 背景
   - 强调色: 橙色 (`#FF9100`) 为主要视觉元素
   - 辅助色: Purple, Green, Cyan, Lime 点缀

3. **线条和形状**
   - 线条粗细: 2-4px
   - 圆角: 0-4px (保持硬朗)
   - 网格: 规则排列的点、线、面

**Figma 参考**: Illustration 页面展示多种插画样式

### 插画类型

#### **Type 1: 信息图表（Infographics）**

**特征**:
- 柱状图、折线图、饼图
- 橙色数据条 + 黑色/白色背景
- 简洁的数据可视化

**配色**:
- 主数据: `#FF9100` (Orange)
- 次要数据: `#FF70E0` (Pink), `#78C700` (Green)
- 背景: `#000000` (Black) 或 `#FAFAF5` (Off White)
- 网格线: `rgba(255, 255, 255, 0.1)` (深色背景)

**应用场景**:
- 数据报告
- Dashboard
- 统计信息展示

**Figma 参考**: Illustration 页面展示多种图表样式

**代码示例**:

```html
<svg width="400" height="300" viewBox="0 0 400 300">
  <!-- 背景 -->
  <rect width="400" height="300" fill="#000000"/>

  <!-- 橙色柱状图 -->
  <rect x="50" y="150" width="60" height="120" fill="#FF9100" rx="4"/>
  <rect x="130" y="100" width="60" height="170" fill="#FF9100" rx="4"/>
  <rect x="210" y="120" width="60" height="150" fill="#FF9100" rx="4"/>
  <rect x="290" y="80" width="60" height="190" fill="#FF9100" rx="4"/>

  <!-- 网格线 -->
  <line x1="0" y1="270" x2="400" y2="270" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <line x1="0" y1="130" x2="400" y2="130" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
</svg>
```

#### **Type 2: 抽象几何插画（Abstract Geometric）**

**特征**:
- 建筑物的等距视角
- 网格和节点连接
- 抽象的技术感图形

**元素库**:
- 立方体、长方体
- 连接线和节点
- 网格背景
- 数据流动线条

**配色方案**:
- 主结构: `#000000` (Black) 或 `#FAFAF5` (Off White)
- 强调结构: `#FF9100` (Orange)
- 连接线: `#DEFF1A` (Lime), `#08FFD1` (Cyan)
- 节点: `#FF70E0` (Pink)

**应用场景**:
- 英雄区（Hero Section）背景
- 概念说明
- 技术架构图
- 白皮书插图

**Figma 参考**: Illustration 页面中的立体建筑图示

#### **Type 3: 装饰性图案（Decorative Patterns）**

**特征**:
- 重复的几何图案
- 网格点阵
- 抽象线条组合

**元素**:
- 小圆点阵列
- 对角线网格
- 重复的小图形

**配色**:
- 单色或双色
- 使用品牌色

**应用场景**:
- 页面背景
- 分隔符
- 装饰性元素

### 插画使用规范

#### **配色规则**

**规则 1: 主色使用**
- 插画中的主要视觉元素使用 **Orange** (`#FF9100`)
- 最多占插画面积的 30-40%

**规则 2: 辅助色搭配**
- 每个插画使用不超过 3 种辅助色
- 推荐组合:
  - Orange + Pink + Purple
  - Orange + Green + Cyan
  - Orange + Lime + Black

**规则 3: 背景选择**
- 深色背景: `#000000` - 用于荧光色插画
- 浅色背景: `#FAFAF5` - 用于深色插画
- 避免中灰色背景

#### **比例和尺寸**

**插画与文字比例**:
- Hero Section: 插画占 40-60%，文字占 40-60%
- 卡片: 插画占 30-40%，文字占 60-70%
- 图标: 纯插画，16x16px 至 128x128px

**留白规则**:
- 插画四周保持至少 20% 的留白
- 复杂插画留白更多（30-40%）

#### **风格一致性检查清单**

✅ **合格的 Rootstock 插画应该**:
- [ ] 使用官方配色系统
- [ ] 采用几何抽象风格
- [ ] 线条粗细一致（2-4px）
- [ ] 保持简洁，避免过度细节
- [ ] 与品牌调性一致（技术、现代、活力）

❌ **避免的风格**:
- [ ] 写实风格、照片拼贴
- [ ] 手绘风格、涂鸦
- [ ] 渐变色（除非极少量使用）
- [ ] 3D 渲染（光影过于复杂）
- [ ] 卡通人物、角色

### 插画资源和工具

#### **创建工具推荐**

1. **Figma / Adobe Illustrator**
   - 矢量插画创建
   - 保持可编辑性

2. **代码生成 SVG**
   - 简单几何图形用代码生成
   - 性能更好，体积更小

**SVG 插画示例**:

```html
<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <!-- 黑色背景 -->
  <rect width="600" height="400" fill="#000000"/>

  <!-- 网格背景 -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/>
    </pattern>
  </defs>
  <rect width="600" height="400" fill="url(#grid)"/>

  <!-- 橙色立方体 -->
  <g transform="translate(300, 200)">
    <!-- 顶面 -->
    <path d="M 0,-50 L 60,0 L 0,50 L -60,0 Z" fill="#FF9100"/>
    <!-- 左侧面 -->
    <path d="M -60,0 L 0,50 L 0,150 L -60,100 Z" fill="#cc7400"/>
    <!-- 右侧面 -->
    <path d="M 60,0 L 0,50 L 0,150 L 60,100 Z" fill="#ff9d1a"/>
  </g>

  <!-- Lime 连接线 -->
  <line x1="100" y1="100" x2="300" y2="200" stroke="#DEFF1A" stroke-width="2" opacity="0.6"/>
  <line x1="500" y1="100" x2="300" y2="200" stroke="#DEFF1A" stroke-width="2" opacity="0.6"/>

  <!-- Cyan 节点 -->
  <circle cx="100" cy="100" r="8" fill="#08FFD1"/>
  <circle cx="500" cy="100" r="8" fill="#08FFD1"/>
  <circle cx="300" cy="200" r="12" fill="#FF70E0"/>
</svg>
```

#### **插画库（Illustration Library）**

**Figma 参考**: Illustration 页面包含多个可复用的插画组件

建议建立内部插画库：
1. 常用图表类型（柱状图、折线图、饼图）
2. 常用几何元素（立方体、节点、连接线）
3. 装饰性图案（网格、点阵）
4. 图标集合

---

## 🏷️ Nametags 系统（Nametags Guidelines）

**Figma Node:** `60:4115` - Guidlines • Nametags
**素材位置:** `/tmp/rootstock-nametags.png`
**子元素数:** 13 个 Frame

### Nametag 概念

**定义**: Nametags = 用户名标签系统，类似 Web3 身份徽章

**用途**:
- 显示用户名 / 钱包地址
- Discord/Telegram 身份标识
- 活动名牌 / 胸牌
- NFT 持有者徽章
- 社区成员标识

**Figma 参考**: Nametags 页面展示各种样式的用户名标签

### 基础样式规范

#### **标准 Nametag 样式**

**Figma 参考**: 页面中的 "NIRK333" 示例

```css
.nametag {
  /* 形状 */
  display: inline-block;
  border-radius: 60px; /* 胶囊形状 */

  /* 尺寸 */
  padding: 10px 30px; /* 垂直 水平 */
  min-width: 120px;
  height: 40px;

  /* 字体 */
  font-family: 'Rootstock Sans', sans-serif;
  font-weight: 700; /* Bold */
  font-size: 16px;
  text-transform: uppercase; /* 全大写 */
  text-align: center;

  /* 配色 */
  background: #DEFF1A; /* Lime */
  color: #000000; /* Black */

  /* 其他 */
  border: none;
  box-shadow: 0 4px 12px rgba(222, 255, 26, 0.3);
}
```

**尺寸变体**:

```css
/* 小号 */
.nametag-sm {
  padding: 6px 20px;
  height: 28px;
  font-size: 12px;
}

/* 中号（标准） */
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

### 配色方案

#### **官方配色变体**

**Figma 参考**: Nametags 页面展示多种配色

| 颜色名称 | 背景色 | 文字色 | HEX | 用途 |
|---------|-------|--------|-----|------|
| **Lime** | `#DEFF1A` | `#000000` | Lime/Black | ⭐ 主要样式 |
| **Orange** | `#FF9100` | `#000000` | Orange/Black | 次要样式 |
| **Pink** | `#FF70E0` | `#000000` | Pink/Black | 特殊标识 |
| **Purple** | `#9E75FF` | `#000000` | Purple/Black | VIP 标识 |
| **Green** | `#78C700` | `#000000` | Green/Black | 成功/验证 |
| **Cyan** | `#08FFD1` | `#000000` | Cyan/Black | 辅助样式 |
| **Black** | `#000000` | `#DEFF1A` | Black/Lime | 深色主题 |

**CSS 实现**:

```css
/* 配色变体类 */
.nametag-lime { background: #DEFF1A; color: #000000; }
.nametag-orange { background: #FF9100; color: #000000; }
.nametag-pink { background: #FF70E0; color: #000000; }
.nametag-purple { background: #9E75FF; color: #000000; }
.nametag-green { background: #78C700; color: #000000; }
.nametag-cyan { background: #08FFD1; color: #000000; }
.nametag-dark { background: #000000; color: #DEFF1A; }
```

### 应用场景

#### **1. Web3 应用**

**钱包地址显示**:

```html
<div class="nametag nametag-lime">
  0X7F2...A3B9
</div>
```

**样式**:
- 缩短地址: 前6位 + ... + 后4位
- 全大写
- Lime 背景

#### **2. 社交媒体**

**Discord 身份角色**:

```html
<span class="nametag nametag-sm nametag-purple">CORE TEAM</span>
<span class="nametag nametag-sm nametag-orange">CONTRIBUTOR</span>
<span class="nametag nametag-sm nametag-green">MEMBER</span>
```

**Telegram 用户名**:

```html
<div class="nametag nametag-md nametag-lime">
  @ROOTSTOCKER
</div>
```

#### **3. 活动名牌**

**实体胸牌设计**:

```
┌─────────────────────────────┐
│                             │
│  ╔═══════════════════════╗  │
│  ║                       ║  │
│  ║      JOHN DOE        ║  │
│  ║                       ║  │
│  ╚═══════════════════════╝  │
│                             │
│     Rootstock Summit       │
│        2024                │
│                             │
└─────────────────────────────┘
```

- 名字部分: Lime 背景胶囊形
- 字体: Rootstock Sans Bold, 全大写
- 尺寸: 宽度 80-100mm，高度 20-25mm

#### **4. NFT 持有者徽章**

```html
<div class="nametag-holder">
  <div class="nametag nametag-pink">
    NFT #0420
  </div>
  <div class="nametag-detail">
    Rootstock 3000 Days SBT
  </div>
</div>
```

### 使用规则

#### **文字内容规范**

✅ **应该**:
- 使用全大写字母
- 保持简短（4-20 个字符）
- 使用清晰易读的文字
- 英文和数字优先

❌ **不应该**:
- 使用小写字母
- 超过 25 个字符
- 使用特殊符号（@ # 除外）
- 使用表情符号

#### **尺寸和比例**

**最小尺寸**:
- 数字媒体: 宽度 80px，高度 24px
- 印刷品: 宽度 20mm，高度 8mm

**最大尺寸**:
- 数字媒体: 宽度 400px，高度 80px
- 印刷品: 宽度 150mm，高度 30mm

**宽高比**: 保持 3:1 至 5:1 之间

### 交互状态

#### **Hover 状态（悬停）**

```css
.nametag:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(222, 255, 26, 0.4);
  cursor: pointer;
}
```

#### **Active 状态（激活/选中）**

```css
.nametag.active {
  box-shadow: 0 0 0 3px rgba(222, 255, 26, 0.5);
  transform: scale(1.05);
}
```

#### **Disabled 状态（禁用）**

```css
.nametag:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 代码示例

#### **React 组件**

```jsx
import React from 'react';
import './Nametag.css';

const Nametag = ({
  children,
  size = 'md',
  color = 'lime',
  onClick
}) => {
  return (
    <span
      className={`nametag nametag-${size} nametag-${color}`}
      onClick={onClick}
    >
      {children.toUpperCase()}
    </span>
  );
};

// 使用示例
<Nametag size="md" color="lime">
  0x7f2...a3b9
</Nametag>
```

#### **Vue 组件**

```vue
<template>
  <span
    :class="['nametag', `nametag-${size}`, `nametag-${color}`]"
    @click="onClick"
  >
    {{ text.toUpperCase() }}
  </span>
</template>

<script>
export default {
  props: {
    text: String,
    size: { type: String, default: 'md' },
    color: { type: String, default: 'lime' }
  }
}
</script>
```

---

## 🌍 品牌应用实例（Brand In Use）

**Figma Node:** `60:4116` - Guidlines • Brand In Use
**素材位置:** `/tmp/rootstock-brandinuse.png`
**子元素数:** 13 个 Frame

### 应用场景分类

#### **1. 数字媒体应用**

##### **1.1 社交媒体帖子**

**Figma 参考**: Brand In Use 页面展示多种社交媒体设计

**标准尺寸**:
- Twitter/X: 1200x675px
- Instagram Feed: 1080x1080px
- Instagram Story: 1080x1920px
- Facebook Post: 1200x630px

**设计模板 A - 黑底荧光**:

```html
<div style="
  width: 1200px;
  height: 675px;
  background: #000000;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
">
  <!-- 主标题 - Lime -->
  <h1 style="
    font-family: 'Rootstock Sans';
    font-size: 72px;
    font-weight: 700;
    color: #DEFF1A;
    text-transform: uppercase;
    margin: 0 0 20px 0;
  ">
    BUILD FOR
  </h1>

  <!-- 副标题 - Orange 背景 -->
  <div style="
    background: #FF9100;
    padding: 10px 30px;
    display: inline-block;
    align-self: flex-start;
  ">
    <span style="
      font-family: 'Rootstock Sans';
      font-size: 48px;
      font-weight: 700;
      color: #000000;
      text-transform: lowercase;
    ">billions</span>
  </div>

  <!-- Logo -->
  <div style="
    position: absolute;
    bottom: 40px;
    left: 60px;
  ">
    <img src="rootstock-logo-white.svg" height="40"/>
  </div>
</div>
```

**设计模板 B - 多色卡片**:

```html
<div style="
  width: 1080px;
  height: 1080px;
  background: #000000;
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
">
  <!-- 卡片 1 - Orange -->
  <div style="background: #FF9100; padding: 40px;">
    <h2 style="color: #000000; font-size: 32px;">
      Smart Contracts
    </h2>
  </div>

  <!-- 卡片 2 - Pink -->
  <div style="background: #FF70E0; padding: 40px;">
    <h2 style="color: #000000; font-size: 32px;">
      Just got smarter
    </h2>
  </div>

  <!-- 卡片 3 - Green -->
  <div style="background: #78C700; padding: 40px; grid-column: span 2;">
    <p style="color: #000000;">
      Build on Bitcoin's security...
    </p>
  </div>
</div>
```

##### **1.2 网站界面**

**Hero Section 示例**:

**Figma 参考**: Brand In Use 展示 "Meet the dApps" 网站设计

```html
<section style="
  background: #000000;
  min-height: 100vh;
  padding: 100px 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
">
  <!-- 左侧文字 -->
  <div>
    <h1 style="
      font-family: 'Rootstock Sans';
      font-size: 64px;
      font-weight: 700;
      color: #FAFAF5;
      margin: 0 0 20px 0;
    ">
      Meet the dApps<br/>
      <span style="color: #78C700;">built on Bitcoin</span>
    </h1>

    <p style="
      font-size: 18px;
      color: #FAFAF5;
      opacity: 0.8;
      margin: 0 0 40px 0;
    ">
      Discover the ecosystem of decentralized applications...
    </p>

    <button style="
      background: #FF9100;
      color: #000000;
      border: none;
      border-radius: 13.65px;
      padding: 16px 40px;
      font-family: 'Rootstock Sans';
      font-size: 18px;
      font-weight: 700;
      text-transform: uppercase;
      cursor: pointer;
    ">
      Explore dApps
    </button>
  </div>

  <!-- 右侧插画 -->
  <div>
    <!-- 几何插画 SVG -->
    <svg>...</svg>
  </div>
</section>
```

**卡片网格示例**:

```html
<div style="
  background: #FAFAF5;
  padding: 80px 60px;
">
  <div style="
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  ">
    <!-- 卡片 -->
    <div style="
      background: #000000;
      border: 2px solid #FF9100;
      border-radius: 4px;
      padding: 30px;
    ">
      <h3 style="
        color: #DEFF1A;
        font-size: 24px;
        margin: 0 0 15px 0;
      ">
        DeFi
      </h3>
      <p style="color: #FAFAF5; opacity: 0.8;">
        Decentralized finance protocols...
      </p>
    </div>

    <!-- 更多卡片... -->
  </div>
</div>
```

##### **1.3 移动应用**

**App 设计规范**:

**导航栏**:
```css
.app-header {
  background: #000000;
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 145, 0, 0.2);
}

.app-header-logo {
  height: 32px;
}
```

**卡片样式**:
```css
.app-card {
  background: #000000;
  border: 2px solid #FF9100;
  border-radius: 12px;
  padding: 20px;
  margin: 16px;
}

.app-card-title {
  font-family: 'Rootstock Sans', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #DEFF1A;
  margin: 0 0 12px 0;
}

.app-card-body {
  font-size: 14px;
  color: #FAFAF5;
  opacity: 0.9;
  line-height: 1.6;
}
```

**按钮样式**:
```css
.app-button-primary {
  background: #FF9100;
  color: #000000;
  border: none;
  border-radius: 13.65px;
  padding: 14px 28px;
  font-family: 'Rootstock Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
}

.app-button-secondary {
  background: transparent;
  color: #FF9100;
  border: 2px solid #FF9100;
  border-radius: 13.65px;
  padding: 14px 28px;
  font-family: 'Rootstock Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
}
```

#### **2. 印刷品应用**

##### **2.1 海报设计**

**Figma 参考**: Brand In Use 页面 "Harder Better Faster Stronger" 海报

**标准尺寸**:
- A4: 210 x 297mm
- A3: 297 x 420mm
- A2: 420 x 594mm
- A1: 594 x 841mm

**设计规范**:

```
┌─────────────────────────────────┐
│                                 │
│   [Rootstock Logo]             │
│                                 │
│                                 │
│   ████████████████             │
│   █ HARDER      █              │
│   ████████████████             │
│                                 │
│   ████████████████             │
│   █ BETTER      █              │
│   ████████████████             │
│                                 │
│   ████████████████             │
│   █ FASTER      █              │
│   ████████████████             │
│                                 │
│   ████████████████             │
│   █ STRONGER    █              │
│   ████████████████             │
│                                 │
│                                 │
│   小字说明文字                   │
│   rootstock.io                 │
│                                 │
└─────────────────────────────────┘
```

**配色方案**:
- 背景: 黑色 (`#000000`)
- 每个色块: 不同的品牌色
  - Harder: `#FF9100` (Orange)
  - Better: `#FF70E0` (Pink)
  - Faster: `#DEFF1A` (Lime)
  - Stronger: `#08FFD1` (Cyan)
- 文字: 黑色 (`#000000`) 在彩色块上

**出血和安全区域**:
- 出血: 3mm
- 安全区域: 内缩 5mm

##### **2.2 传单/Flyer**

**尺寸**: A5 (148 x 210mm) 或 DL (99 x 210mm)

**双面设计**:

**正面**:
- 大标题: Lime 或 Orange
- 主视觉: 插画或产品图
- Logo: 右上角或底部

**背面**:
- 详细信息
- QR 码
- 联系方式
- Social Media 图标

##### **2.3 名片**

**尺寸**: 90 x 54mm (标准名片尺寸)

**正面设计**:
```
┌───────────────────────────┐
│                           │
│  [Icon]  Rootstock       │
│                           │
│                           │
│  JOHN DOE                │
│  Developer Advocate      │
│                           │
│  john@rootstock.io       │
│  @rootstock              │
│                           │
└───────────────────────────┘
```

**配色**:
- 选项 A: 黑色卡纸 + 橙色/荧光绿印刷
- 选项 B: 白色卡纸 + 黑色/橙色印刷

**特殊工艺**:
- UV 光油: Logo 部分
- 烫金/烫银: 可选
- 圆角: 4mm (可选)

#### **3. 周边产品应用**

##### **3.1 T恤**

**Figma 参考**: Brand In Use 页面展示 T恤和帆布袋应用

**设计位置**:

**胸前**:
- Logo Lock-up 或 Icon Only
- 尺寸: 宽度 15-20cm
- 位置: 居中，胸线下方 8-12cm

**背面**:
- 大 Logo 或标语
- 尺寸: 宽度 25-35cm
- 位置: 居中，肩线下方 5-8cm

**袖子**:
- 小 Icon
- 直径: 5-8cm
- 位置: 左袖或右袖，袖口上方 10cm

**配色方案**:
- 黑色 T恤 + 橙色/荧光绿印刷
- 白色 T恤 + 黑色印刷
- 荧光色 T恤 + 黑色印刷

##### **3.2 帆布袋**

**Figma 参考**: 白色 Logo 在黑色帆布袋

**设计**:
- 单面或双面印刷
- Logo + 标语组合
- 尺寸: 根据袋子大小，一般 20-30cm 宽

**示例**:
```
┌─────────────────────────┐
│                         │
│                         │
│   [Rootstock Logo]     │
│                         │
│   Build on Bitcoin     │
│                         │
│                         │
└─────────────────────────┘
```

##### **3.3 贴纸（Stickers）**

**尺寸**:
- 小号: 5 x 5cm (Icon Only)
- 中号: 8 x 8cm (Logo)
- 大号: 10 x 15cm (Lock-up)

**形状**:
- 圆形: Icon Only
- 正方形/长方形: Lock-up
- Die-cut (异形): Logo 外轮廓

**材质**:
- 防水贴纸
- 哑光或亮光表面

**配色**:
- 全彩印刷
- 单色: 橙色、黑色、白色

##### **3.4 其他周边**

**笔记本**:
- 封面: Logo + 简单图案
- 尺寸: A5 或 A6
- 装订: 线圈或胶装

**马克杯**:
- 设计: Logo + 标语
- 360° 环绕或单面
- 颜色: 黑色杯 + 橙色印刷

**钥匙扣**:
- Icon Only
- 金属或塑料材质
- 橙色、黑色

**徽章（Pins）**:
- Icon 形状
- 金属烤漆
- 直径: 2-4cm

#### **4. 硬件产品应用**

##### **4.1 硬件钱包**

**Figma 参考**: Brand In Use 页面展示硬件设备应用

**屏幕显示**:
- Logo: 开机画面
- 尺寸: 适配屏幕，保持比例
- 颜色: 单色显示（黑白屏）或全彩

**外壳印刷**:
- 背面或侧面: Icon
- 工艺: 激光雕刻、丝印、移印
- 颜色: 白色或金色（金属外壳）

##### **4.2 包装盒**

**设计规范**:
- 正面: Logo + 产品名称
- 侧面: Icon 或品牌名
- 背面: 产品信息、条形码
- 内部: 简洁或品牌图案

**配色**:
- 高端: 黑色盒 + 橙色/金色印刷
- 环保: 牛皮纸 + 黑色/橙色印刷

---

## 🎯 Rootstock 3000 SBT 应用方案

### 基于品牌指南的 SBT DApp 设计

#### **设计系统（Design System）**

##### **1. 颜色变量**

```css
:root {
  /* === 主色板 === */
  --rs-orange: #FF9100;     /* Figma Style: 12:726 */
  --rs-pink: #FF70E0;       /* Figma Style: 12:724 */
  --rs-green: #78C700;      /* Figma Style: 12:725 */
  --rs-black: #000000;      /* Figma Style: 12:719 */
  --rs-offwhite: #FAFAF5;   /* Figma Style: 12:720 */

  /* === 辅助色 === */
  --rs-purple: #9E75FF;     /* Figma Style: 12:721 */
  --rs-lime: #DEFF1A;       /* Figma Style: 12:723 */
  --rs-cyan: #08FFD1;       /* Figma Style: 12:722 */

  /* === 语义化颜色 === */
  --color-bg-primary: var(--rs-black);
  --color-bg-secondary: #1a1a1a;
  --color-bg-tertiary: #2a2a2a;

  --color-text-primary: var(--rs-offwhite);
  --color-text-secondary: rgba(250, 250, 245, 0.7);
  --color-text-inverse: var(--rs-black);

  --color-primary: var(--rs-orange);
  --color-secondary: var(--rs-pink);
  --color-accent: var(--rs-lime);
  --color-success: var(--rs-green);

  /* === 透明度变体 === */
  --rs-orange-10: rgba(255, 145, 0, 0.1);
  --rs-orange-20: rgba(255, 145, 0, 0.2);
  --rs-orange-40: rgba(255, 145, 0, 0.4);

  /* === 圆角 === */
  --radius-sm: 4px;
  --radius-md: 13.65px;
  --radius-lg: 26.20px;
  --radius-full: 9999px;

  /* === 阴影 === */
  --shadow-sm: 0 2px 8px var(--rs-orange-10);
  --shadow-md: 0 4px 16px var(--rs-orange-20);
  --shadow-lg: 0 8px 32px var(--rs-orange-40);
  --shadow-glow: 0 0 20px var(--rs-orange-40);
}
```

##### **2. 字体系统**

```css
/* 字体导入（假设使用 Web Font）*/
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');

/* 字体回退 */
body {
  font-family: 'Space Grotesk', 'Rootstock Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 标题样式 */
.heading-h1 {
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--rs-lime);
}

.heading-h2 {
  font-size: clamp(24px, 4vw, 48px);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--rs-orange);
}

.heading-h3 {
  font-size: clamp(20px, 3vw, 32px);
  font-weight: 600;
  line-height: 1.4;
  color: var(--rs-offwhite);
}

/* 正文样式 */
.body-text {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--rs-offwhite);
}

.caption {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text-secondary);
}
```

##### **3. 组件样式**

**按钮组件**:

```css
/* 主按钮 - Orange */
.btn-primary {
  background: var(--rs-orange);
  color: var(--rs-black);
  border: none;
  border-radius: var(--radius-md);
  padding: 16px 40px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  background: #ff9d1a;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* 次按钮 - Pink */
.btn-secondary {
  background: var(--rs-pink);
  color: var(--rs-black);
  border: none;
  border-radius: var(--radius-md);
  padding: 16px 40px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 描边按钮 */
.btn-outline {
  background: transparent;
  color: var(--rs-orange);
  border: 2px solid var(--rs-orange);
  border-radius: var(--radius-md);
  padding: 14px 38px; /* 减去 border 宽度 */
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: var(--rs-orange);
  color: var(--rs-black);
}
```

**卡片组件**:

```css
.card {
  background: var(--rs-black);
  border: 2px solid var(--rs-orange);
  border-radius: var(--radius-sm);
  padding: 32px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--rs-lime);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--rs-lime);
  margin: 0 0 16px 0;
  text-transform: uppercase;
}

.card-body {
  font-size: 16px;
  color: var(--rs-offwhite);
  line-height: 1.6;
  margin: 0;
}
```

**进度条组件**:

```css
.progress-bar {
  width: 100%;
  height: 12px;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--rs-orange) 0%, var(--rs-lime) 100%);
  transition: width 0.5s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

**Badge/Tag 组件**:

```css
.badge {
  display: inline-block;
  background: var(--rs-pink);
  color: var(--rs-black);
  border-radius: var(--radius-md);
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.badge-lime { background: var(--rs-lime); }
.badge-orange { background: var(--rs-orange); }
.badge-green { background: var(--rs-green); }
.badge-purple { background: var(--rs-purple); }
```

**Nametag 组件**:

```css
.nametag {
  display: inline-block;
  background: var(--rs-lime);
  color: var(--rs-black);
  border-radius: var(--radius-full);
  padding: 10px 30px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(222, 255, 26, 0.3);
  transition: all 0.3s ease;
}

.nametag:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(222, 255, 26, 0.4);
}
```

#### **页面布局建议**

##### **Hero Section - "Mint Your SBT"**

```html
<section class="hero" style="
  background: #000000;
  min-height: 100vh;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
">
  <!-- 背景装饰 - 几何图形 -->
  <div class="hero-bg" style="
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    pointer-events: none;
  ">
    <!-- SVG 几何插画 -->
  </div>

  <!-- 内容 -->
  <div style="max-width: 800px; text-align: center; z-index: 1;">
    <!-- 主标题 -->
    <h1 class="heading-h1" style="
      color: #DEFF1A;
      margin: 0 0 20px 0;
    ">
      ROOTSTOCK<br/>3000 DAYS
    </h1>

    <!-- 副标题 -->
    <p style="
      font-size: 24px;
      color: #FF9100;
      font-weight: 600;
      margin: 0 0 40px 0;
    ">
      Commemorating 3000 Days of Bitcoin DeFi
    </p>

    <!-- 描述 -->
    <p class="body-text" style="
      font-size: 18px;
      color: rgba(250, 250, 245, 0.8);
      margin: 0 0 60px 0;
    ">
      Mint your Soul Bound Token to celebrate this historic milestone.
      Limited to 10,000 NFTs, free to claim, one per address.
    </p>

    <!-- Mint 按钮 -->
    <button class="btn-primary" style="
      font-size: 20px;
      padding: 20px 60px;
    ">
      🔥 MINT NOW
    </button>
  </div>
</section>
```

##### **Stats Section - "Progress & Info"**

```html
<section class="stats" style="
  background: #000000;
  padding: 80px 20px;
">
  <div style="
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  ">
    <!-- Stat Card 1 -->
    <div class="card">
      <div class="card-title">Total Minted</div>
      <div style="
        font-size: 48px;
        font-weight: 700;
        color: #FF9100;
        margin: 16px 0;
      ">
        1,234
      </div>
      <div class="body-text" style="opacity: 0.7;">
        Out of 10,000
      </div>
    </div>

    <!-- Stat Card 2 -->
    <div class="card">
      <div class="card-title">Time Until</div>
      <div style="
        font-size: 48px;
        font-weight: 700;
        color: #DEFF1A;
        margin: 16px 0;
      ">
        23 Days
      </div>
      <div class="body-text" style="opacity: 0.7;">
        Until 3000 Days Milestone
      </div>
    </div>

    <!-- Stat Card 3 -->
    <div class="card">
      <div class="card-title">Your NFTs</div>
      <div style="
        font-size: 48px;
        font-weight: 700;
        color: #FF70E0;
        margin: 16px 0;
      ">
        1
      </div>
      <div class="body-text" style="opacity: 0.7;">
        <span class="nametag" style="font-size: 12px; padding: 4px 12px;">
          0X7F2...A3B9
        </span>
      </div>
    </div>
  </div>

  <!-- Progress Bar -->
  <div style="max-width: 1200px; margin: 60px auto 0;">
    <div style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0 16px 0;
    ">
      <span class="body-text">Minting Progress</span>
      <span class="badge badge-orange">12.34%</span>
    </div>

    <div class="progress-bar">
      <div class="progress-fill" style="width: 12.34%;"></div>
    </div>
  </div>
</section>
```

##### **Countdown Section - "Time Remaining"**

```html
<section class="countdown" style="
  background: #1a1a1a;
  padding: 80px 20px;
">
  <div style="max-width: 900px; margin: 0 auto; text-align: center;">
    <h2 class="heading-h2" style="
      margin: 0 0 60px 0;
    ">
      Countdown to 3000 Days
    </h2>

    <div style="
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    ">
      <!-- Days -->
      <div class="card" style="border-color: #FF9100;">
        <div style="
          font-size: 64px;
          font-weight: 700;
          color: #FF9100;
        ">23</div>
        <div class="caption" style="text-transform: uppercase;">Days</div>
      </div>

      <!-- Hours -->
      <div class="card" style="border-color: #FF70E0;">
        <div style="
          font-size: 64px;
          font-weight: 700;
          color: #FF70E0;
        ">14</div>
        <div class="caption" style="text-transform: uppercase;">Hours</div>
      </div>

      <!-- Minutes -->
      <div class="card" style="border-color: #DEFF1A;">
        <div style="
          font-size: 64px;
          font-weight: 700;
          color: #DEFF1A;
        ">37</div>
        <div class="caption" style="text-transform: uppercase;">Minutes</div>
      </div>

      <!-- Seconds -->
      <div class="card" style="border-color: #08FFD1;">
        <div style="
          font-size: 64px;
          font-weight: 700;
          color: #08FFD1;
        ">52</div>
        <div class="caption" style="text-transform: uppercase;">Seconds</div>
      </div>
    </div>
  </div>
</section>
```

##### **Footer**

```html
<footer style="
  background: #000000;
  border-top: 1px solid rgba(255, 145, 0, 0.2);
  padding: 60px 20px 40px;
">
  <div style="
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
  ">
    <!-- Logo Column -->
    <div>
      <img src="rootstock-logo.svg" height="40" alt="Rootstock" style="margin: 0 0 20px 0;"/>
      <p class="body-text" style="opacity: 0.7; font-size: 14px;">
        The most secure smart contract platform,<br/>secured by Bitcoin.
      </p>
    </div>

    <!-- Links Column -->
    <div>
      <h4 style="
        color: #FAFAF5;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        margin: 0 0 16px 0;
      ">Resources</h4>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li><a href="#" style="color: rgba(250, 250, 245, 0.7);">Documentation</a></li>
        <li><a href="#" style="color: rgba(250, 250, 245, 0.7);">GitHub</a></li>
        <li><a href="#" style="color: rgba(250, 250, 245, 0.7);">Discord</a></li>
      </ul>
    </div>

    <!-- Social Column -->
    <div>
      <h4 style="
        color: #FAFAF5;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        margin: 0 0 16px 0;
      ">Connect</h4>
      <div style="display: flex; gap: 16px;">
        <a href="#" class="badge badge-orange">Twitter</a>
        <a href="#" class="badge badge-pink">Discord</a>
        <a href="#" class="badge badge-lime">Telegram</a>
      </div>
    </div>
  </div>

  <div style="
    max-width: 1200px;
    margin: 40px auto 0;
    padding: 20px 0 0;
    border-top: 1px solid rgba(250, 250, 245, 0.1);
    text-align: center;
  ">
    <p class="caption">
      © 2026 Rootstock. All rights reserved.
    </p>
  </div>
</footer>
```

---

## 📚 Figma 素材索引

### 所有素材的 Figma 来源

| 素材名称 | Figma Node ID | 页面名称 | 本地文件 |
|---------|--------------|---------|---------|
| 封面图 | `64:1806` | Cover | `/tmp/rootstock-cover.png` |
| 概览说明 | `0:1` | Overview | `/tmp/rootstock-overview.png` |
| Logo 规范 | `60:4111` | Guidlines • Logo | `/tmp/rootstock-logo.png` |
| 字体规范 | `60:4112` | Guidlines • Typography | `/tmp/rootstock-typography.png` |
| 配色规范 | `60:4113` | Guidlines • Colour | `/tmp/rootstock-color.png` |
| 插画规范 | `60:4114` | Guidlines • Illustration | `/tmp/rootstock-illustration.png` |
| 名牌系统 | `60:4115` | Guidlines • Nametags | `/tmp/rootstock-nametags.png` |
| 品牌应用 | `60:4116` | Guidlines • Brand In Use | `/tmp/rootstock-brandinuse.png` |

### Logo 文件导出节点

| Logo 类型 | Node ID | 导出格式 | 缩放 |
|----------|---------|---------|-----|
| SVG Lock-up (橙色) | `9120:31` | SVG | 1x |
| PNG Lock-up (橙色) | `618:310` | PNG | 1x |
| PNG Lock-up (高清) | `83:2264` | PNG | 4x |
| PNG Icon (高清) | `9457:45` | PNG | 4x |

### 颜色样式 IDs

| 颜色名称 | Style ID | Style Key |
|---------|---------|-----------|
| R Black | `12:719` | `070048fde9ca3e54b2dacf433494716a873defb4` |
| R Off White | `12:720` | `64baa28e3e89254d7980c193aaaee9875de586ea` |
| R Purple | `12:721` | `96c1054d7ac08589025db694c8b0b8012d083382` |
| R Cyan | `12:722` | `5312e48a77469126d8a0ce00fadcdc6f4669d577` |
| R Lime | `12:723` | `12005c6cf5be2f362dda1ce9c4f8a993640aa0c9` |
| R Pink | `12:724` | `5c0e8a21792061ab02a085e07c53e6354b69af77` |
| R Green | `12:725` | `477eb9ab872078fbbb651cbf56572b8b1ce0166e` |
| R Orange | `12:726` | `b72e10dadb0944c53a2b397d74c666f0af7a1b3d` |

---

## 📝 总结

这份超详细的 Rootstock 品牌指南包含：

✅ **完整的配色系统** - 8 种颜色 + HEX/RGB/CMYK 值 + Figma Style IDs
✅ **字体系统** - Rootstock Sans 完整规范 + 层级定义 + CSS 代码
✅ **Logo 系统** - 所有格式 + 使用规范 + 导出指南 + Figma 节点
✅ **插画系统** - 3 种类型 + 配色规则 + SVG 代码示例
✅ **Nametags 系统** - 完整规范 + 配色变体 + React/Vue 组件
✅ **品牌应用实例** - 数字/印刷/周边 + 实际代码
✅ **SBT 应用方案** - 完整设计系统 + 页面布局 + CSS 变量
✅ **Figma 素材索引** - 所有 Node IDs + 导出设置

**文档特点**:
- 🎯 所有素材都标记了 Figma Node ID
- 📝 包含可直接使用的代码示例
- 🎨 精确的颜色值和样式定义
- 🔗 完整的 Figma Style Keys
- 💡 实际应用场景和设计建议

**适用对象**:
- 前端开发者 → CSS 变量和组件代码
- 设计师 → Figma Node IDs 和设计规范
- 项目经理 → 完整的应用实例参考
- 品牌团队 → 官方规范和使用禁忌

---

**📄 文档版本**: v2.0 Ultra Detailed
**最后更新**: 2026-03-20
**来源**: Rootstock Official Brand Guidelines (Figma)
**整理者**: Piggyx
