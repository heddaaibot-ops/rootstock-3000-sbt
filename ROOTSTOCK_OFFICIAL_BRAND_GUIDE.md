# Rootstock 官方品牌指南（完整版）

> 从 Figma 官方品牌指南提取的精确设计规范
> 来源：Rootstock • Brand Guidelines and Assets - V1.0 2022
> 提取时间：2026-03-20
> Figma: https://www.figma.com/design/p8vSjmXwiR4vyqGQDD8A3u/

---

## 🎨 官方配色系统（精确 RGB 值）

### Rootstock Colour Palette

| 颜色名称 | RGB | HEX | 用途 |
|---------|-----|-----|------|
| **Rootstock Orange** | `RGB(255, 145, 0)` | `#FF9100` | 🔥 **主强调色** - CTA、高亮 |
| **Rootstock Pink** | `RGB(255, 112, 224)` | `#FF70E0` | 💗 **次强调色** - 标题、标签 |
| **Purple** | `RGB(158, 117, 255)` | `#9E75FF` | 🟣 品牌紫色 |
| **Rootstock Green** | `RGB(120, 199, 0)` | `#78C700` | 💚 绿色强调 |
| **Lime** | `RGB(222, 255, 26)` | `#DEFF1A` | 💛 荧光黄绿 |
| **Cyan** | `RGB(8, 255, 209)` | `#08FFD1` | 🔵 青色 |
| **R Off White** | `RGB(250, 250, 245)` | `#FAFAF5` | ⚪ 米白色背景 |
| **R Black** | `RGB(0, 0, 0)` | `#000000` | ⚫ 黑色背景 |

---

## 🎯 配色使用规则

### 1. **主色调组合**

**黑色背景 + 亮色元素**（最常用）：
- 背景：`#000000` (R Black)
- 标题：`#DEFF1A` (Lime) 或 `#FF9100` (Orange)
- 文字：`#FAFAF5` (Off White)
- 强调：`#FF70E0` (Pink)

**浅色背景 + 深色元素**：
- 背景：`#FAFAF5` (Off White)
- 标题：`#000000` (Black)
- 强调：`#FF9100` (Orange)
- 次要：`#9E75FF` (Purple)

### 2. **颜色层级**

- **Level 1 - 主视觉**：Rootstock Orange (`#FF9100`)
- **Level 2 - 次强调**：Rootstock Pink (`#FF70E0`), Lime (`#DEFF1A`)
- **Level 3 - 辅助色**：Purple, Green, Cyan
- **Level 4 - 基础色**：Black, Off White

### 3. **标签配色系统**

根据 JSON 数据提取的官方标签颜色：

```css
/* Tag Styles */
.tag-orange {
  background: #FF9100; /* Rootstock Orange */
  border-radius: 13.65px;
  padding: 1px 5px;
}

.tag-pink {
  background: #FF70E0; /* Rootstock Pink */
  border-radius: 13.65px;
  padding: 1px 5px;
}

.tag-purple {
  background: #9E75FF; /* Purple */
  border-radius: 13.65px;
}

.tag-green {
  background: #78C700; /* Rootstock Green */
  border-radius: 13.65px;
}

.tag-lime {
  background: #DEFF1A; /* Lime */
  border-radius: 13.65px;
}

.tag-cyan {
  background: #08FFD1; /* Cyan */
  border-radius: 13.65px;
}

.tag-white {
  background: #FAFAF5; /* Off White */
  border-radius: 13.65px;
}
```

---

## 🔤 字体系统

### 主字体：**Rootstock Sans**

品牌专用字体，支持完整字符集：
- 字母：`AaBbCc...`
- 数字：`123`
- 符号：`@!*#`

### 字体规范

**H1 标题**：
- Font: Rootstock Sans / Pack Hard
- Size: 大字号
- Color: Rootstock Pink (`#FF70E0`)
- Padding: 8px

**H3 标题**：
- Font: Rootstock Sans / Pack Hard
- Size: 中字号
- Color: Orange / White / Purple / Green / Lime / Cyan（根据背景选择）
- Padding: 4px

**正文**：
- Font: Rootstock Sans
- Color: Off White (在黑底上) / Black (在白底上)

**标签 (Tags)**：
- Size: 小字号
- Border Radius: 13.65px
- Padding: 1px 5px (Tag3), 3px 9px (Tag1)

---

## 📐 设计规范

### 圆角 (Border Radius)

- **大模块/卡片**：`4px`
- **按钮/标签**：`13.65px`
- **大标签**：`26.20px` (Tag1)

### 内边距 (Padding)

- **页面级**：80px (左右), 72px (上下)
- **标题 H1**：8px
- **标题 H3**：4px
- **标签 Tag3**：1px (上下), 5px (左右)
- **标签 Tag1**：3px (上下), 9px (左右)

### 间距 (Spacing)

- **模块间距**：139px - 157px
- **元素间距**：10px - 13px

---

## 🎭 品牌视觉风格

### 核心特征

1. **高对比度设计**
   - 黑底 + 亮色文字
   - 或白底 + 深色文字

2. **荧光色强调**
   - 黄绿色 (Lime) 作为醒目标题
   - 橙色 (Orange) 作为 CTA

3. **多彩标签系统**
   - 8 种颜色标签
   - 圆角设计
   - 黑色文字（在亮色标签上）

4. **Typography**
   - 大标题醒目
   - 专用字体 Rootstock Sans
   - 清晰的字体层级

---

## 🚀 应用到 Rootstock 3000 SBT

### 推荐配色方案

基于官方品牌指南，我们的 SBT DApp 应使用：

#### **主题 A：黑色主题**（推荐）
```css
/* 背景 */
--bg-primary: #000000;      /* R Black */
--bg-secondary: #1a1a1a;    /* 深灰 */

/* 文字 */
--text-primary: #FAFAF5;    /* Off White */
--text-secondary: #a0a0a0;  /* 浅灰 */

/* 强调色 */
--accent-primary: #FF9100;  /* Rootstock Orange */
--accent-secondary: #FF70E0; /* Rootstock Pink */
--accent-lime: #DEFF1A;     /* Lime - 标题 */

/* 辅助色 */
--purple: #9E75FF;
--green: #78C700;
--cyan: #08FFD1;
```

#### **主题 B：浅色主题**
```css
/* 背景 */
--bg-primary: #FAFAF5;      /* Off White */
--bg-secondary: #ffffff;    /* 纯白 */

/* 文字 */
--text-primary: #000000;    /* Black */
--text-secondary: #666666;  /* 深灰 */

/* 强调色 */
--accent-primary: #FF9100;  /* Rootstock Orange */
--accent-secondary: #FF70E0; /* Rootstock Pink */
```

### 组件配色建议

```typescript
// Button - Primary CTA
backgroundColor: "#FF9100"  // Rootstock Orange
color: "#000000"           // Black text

// Button - Secondary
backgroundColor: "#FF70E0"  // Rootstock Pink
color: "#000000"

// Card Background
backgroundColor: "#000000"  // Black
border: "1px solid #FF9100"

// Progress Bar
backgroundColor: "#1a1a1a"  // Dark gray
fillColor: "#FF9100"        // Orange

// Tags
backgroundColor: "#DEFF1A"  // Lime
color: "#000000"
borderRadius: "13.65px"

// Title
color: "#DEFF1A"           // Lime (on black)
// OR
color: "#FF9100"           // Orange (on black)
```

---

## 📦 设计元素提取

### 从官方指南学到的要点

1. **配色不要超过 3 种主色**
   - 主色：Orange
   - 次色：Pink 或 Lime
   - 背景：Black 或 Off White

2. **保持高对比度**
   - 确保文字清晰可读
   - 避免低对比度组合

3. **使用官方圆角规范**
   - 卡片：4px
   - 按钮/标签：13.65px

4. **遵循字体层级**
   - H1：大且醒目（Lime/Pink）
   - H3：中等（Orange/Purple）
   - Body：Off White/Black

---

## 🔗 品牌资产

### Figma 文件结构

官方品牌指南包含以下页面：
1. ✅ **Cover** - 品牌封面
2. ✅ **🖼 • Overview** - 概览
3. ✅ **Guidelines • Introduction** - 介绍
4. ✅ **Guidelines • Tone Of Voice** - 语气风格
5. ✅ **Guidelines • Logo** - Logo 规范
6. ✅ **Guidelines • Typography** - 字体规范
7. ✅ **Guidelines • Colour** - 颜色规范（本文档主要来源）
8. ✅ **Guidelines • Illustration** - 插画规范
9. ✅ **Guidelines • Nametags** - 名牌规范
10. ✅ **Guidelines • Brand In Use** - 品牌应用
11. 🗂 **Templates** - 模板
12. 🎛 **Style Sheet** - 样式表

---

## 📊 数据来源

- **官方文档**：Rootstock • Brand Guidelines and Assets
- **版本**：V1.0 2022
- **最后更新**：2026-03-18 10:09:13 UTC
- **Figma 链接**：[查看完整指南](https://www.figma.com/design/p8vSjmXwiR4vyqGQDD8A3u/)

---

## ✨ 下一步行动

1. ✅ **已完成**：提取官方配色系统
2. ✅ **已完成**：记录精确 RGB/HEX 值
3. 📋 **待办**：下载 Rootstock Logo（各种格式）
4. 📋 **待办**：应用配色到 SBT 前端
5. 📋 **待办**：更新 Tailwind 配置
6. 📋 **待办**：设计系统组件化

---

**📝 备注**：
- 所有颜色值已从 Figma JSON 数据精确提取
- RGB 值已转换为标准 0-255 格式
- HEX 值四舍五入到最接近的整数
- 优先使用 Rootstock Orange (`#FF9100`) 作为主强调色
