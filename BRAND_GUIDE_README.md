# Rootstock 品牌指南文档集 📚

> **完整的 Rootstock 品牌设计规范和开发实战手册**
> 从 Figma 官方设计文件提取，包含所有设计规范、代码示例和实战应用

---

## 📁 文档目录

### 🎨 1. 官方品牌指南（精华版）

**文件**: `ROOTSTOCK_OFFICIAL_BRAND_GUIDE.md`

**内容概览**:
- ✅ 8 种官方配色（HEX + RGB + CMYK）
- ✅ 字体系统（Rootstock Sans）
- ✅ Logo 使用规范
- ✅ 设计规范（圆角、间距、Padding）
- ✅ 应用建议

**适合**: 快速查看核心配色和基础规范

**来源**: Figma - `p8vSjmXwiR4vyqGQDD8A3u`

---

### 🖼️ 2. 完整品牌指南（全面版）

**文件**: `ROOTSTOCK_COMPLETE_BRAND_GUIDE.md`

**内容概览**:
- ✅ 完整配色系统
- ✅ Logo 系统（各种格式和变体）
- ✅ 字体排版规范
- ✅ 插画系统（3 种类型）
- ✅ Nametags 系统
- ✅ 品牌应用实例（数字媒体、印刷、周边）

**适合**: 深入了解所有品牌元素和应用场景

**来源**: Figma - 官方品牌指南 14 个页面

---

### 🔬 3. 超详细品牌指南（技术版）

**文件**: `ROOTSTOCK_ULTRA_DETAILED_BRAND_GUIDE.md`

**内容概览**:
- ✅ 所有 Figma Node IDs 标记
- ✅ Figma Style Keys（可编程访问）
- ✅ 完整的 CSS 代码示例
- ✅ React/Vue 组件示例
- ✅ 页面布局代码（Hero, Stats, Footer 等）
- ✅ 完整的 Figma 素材索引表

**文件大小**: 2419 行

**适合**:
- 设计师（需要 Figma 节点引用）
- 开发者（需要精确色值和代码）
- 项目经理（需要完整规范）

**来源**: Figma JSON 数据 + 人工分析

---

### ⚡ 4. 实战应用手册（开发者版）

**文件**: `ROOTSTOCK_IMPLEMENTATION_GUIDE.md` ⭐ **NEW!**

**内容概览**:

#### 🎨 完整配置
- ✅ Tailwind CSS 完整配置文件（即用型）
- ✅ CSS 全局样式文件
- ✅ 自定义工具类
- ✅ 动画关键帧定义

#### ⚛️ React 组件库
- ✅ Button（4 种变体 + 3 种尺寸）
- ✅ Card（Hover + 发光效果）
- ✅ Badge（6 种颜色）
- ✅ CountdownTimer（倒计时）
- ✅ ProgressBar（进度条）

#### 🎯 Vue 组件库
- ✅ RButton（Vue 3 Composition API）
- ✅ RCard
- ✅ RCountdownTimer

#### 📱 响应式设计
- ✅ 断点系统
- ✅ 响应式字体规范
- ✅ 响应式间距
- ✅ 移动端优先布局示例

#### ✨ 动画和交互
- ✅ 页面加载动画
- ✅ 滚动触发动画（Intersection Observer）
- ✅ 数字滚动动画
- ✅ Hover 交互效果

#### 🚀 SBT 项目集成
- ✅ 完整的安装步骤
- ✅ 工具函数库
- ✅ 完整页面示例（Rootstock 3000 SBT 首页）

#### ⚡ 性能优化
- ✅ 图片优化
- ✅ 代码分割
- ✅ CSS 优化
- ✅ 字体优化

#### ♿ 可访问性
- ✅ ARIA 标签
- ✅ 键盘导航
- ✅ 颜色对比度
- ✅ Skip to Content

**适合**: 前端开发者、UI 工程师

**文件大小**: 1000+ 行

---

## 🗂️ 素材文件

### 下载的品牌素材

所有素材已下载到 `/tmp/` 目录：

| 素材名称 | 文件路径 | Figma Node ID |
|---------|---------|--------------|
| 封面图 | `/tmp/rootstock-cover.png` | `64:1806` |
| 概览说明 | `/tmp/rootstock-overview.png` | `0:1` |
| Logo 规范 | `/tmp/rootstock-logo.png` | `60:4111` |
| 字体规范 | `/tmp/rootstock-typography.png` | `60:4112` |
| 配色规范 | `/tmp/rootstock-color.png` | `60:4113` |
| 插画规范 | `/tmp/rootstock-illustration.png` | `60:4114` |
| 名牌系统 | `/tmp/rootstock-nametags.png` | `60:4115` |
| 品牌应用 | `/tmp/rootstock-brandinuse.png` | `60:4116` |

---

## 🎯 快速开始指南

### 对于设计师

1. **快速查看配色**: 阅读 `ROOTSTOCK_OFFICIAL_BRAND_GUIDE.md`
2. **查找 Figma 节点**: 使用 `ROOTSTOCK_ULTRA_DETAILED_BRAND_GUIDE.md`
3. **浏览素材**: 查看 `/tmp/` 目录下的截图

### 对于前端开发者

1. **配置项目**:
   ```bash
   # 复制 Tailwind 配置
   cp ROOTSTOCK_IMPLEMENTATION_GUIDE.md > 提取 tailwind.config.js

   # 复制 CSS 变量
   cp ROOTSTOCK_IMPLEMENTATION_GUIDE.md > 提取 globals.css
   ```

2. **使用组件**:
   - React: 从实战手册复制组件代码
   - Vue: 从实战手册复制 Vue 组件

3. **参考示例**: 查看完整页面示例代码

### 对于项目经理

1. **了解品牌**: 阅读 `ROOTSTOCK_COMPLETE_BRAND_GUIDE.md`
2. **查看应用实例**: 第 6-8 节（数字媒体、印刷、周边）
3. **检查规范遵守**: 使用超详细版对照检查

---

## 📊 配色速查表

| 颜色名称 | HEX | RGB | 用途 |
|---------|-----|-----|------|
| **Rootstock Orange** | `#FF9100` | `255, 145, 0` | 主 CTA、按钮 |
| **Rootstock Pink** | `#FF70E0` | `255, 112, 224` | 标题、强调 |
| **Rootstock Green** | `#78C700` | `120, 199, 0` | 成功状态 |
| **Purple** | `#9E75FF` | `158, 117, 255` | 辅助装饰 |
| **Lime** | `#DEFF1A` | `222, 255, 26` | 醒目标题 |
| **Cyan** | `#08FFD1` | `8, 255, 209` | 链接、装饰 |
| **R Black** | `#000000` | `0, 0, 0` | 深色背景 |
| **R Off White** | `#FAFAF5` | `250, 250, 245` | 浅色背景 |

---

## 🔗 Figma 资源

### 官方品牌指南文件

**链接**: https://www.figma.com/design/p8vSjmXwiR4vyqGQDD8A3u/

**文件名**: Rootstock • Brand Guidelines and Assets - 28 sep 2023

**包含页面**:
1. Cover
2. Overview
3. Introduction
4. Tone Of Voice
5. Logo
6. Typography
7. Colour
8. Illustration
9. Nametags
10. Brand In Use
11. Templates
12. Style Sheet

### 设计资源文件

**链接**: https://www.figma.com/design/QUJxW3TltYarukkOcKHW1Q/Rootstock

**Node ID**: `5:3` (Branding Assets)

---

## 💻 代码示例速查

### 使用品牌颜色（Tailwind）

```jsx
// 背景色
<div className="bg-rootstock-orange">Orange BG</div>
<div className="bg-rootstock-pink">Pink BG</div>
<div className="bg-rootstock-lime">Lime BG</div>

// 文字色
<h1 className="text-rootstock-orange">Orange Text</h1>
<p className="text-rootstock-offwhite">White Text</p>

// 边框
<div className="border-2 border-rootstock-orange">Border</div>

// 渐变文字
<h1 className="text-gradient-orange">Gradient Text</h1>
```

### 使用组件

```jsx
// Button
<Button variant="primary" size="lg">
  Claim Your SBT
</Button>

// Card
<Card hover glow="orange">
  <CardTitle>Feature Title</CardTitle>
  <CardContent>Description here</CardContent>
</Card>

// Badge
<Badge color="lime" size="lg">
  Limited Edition
</Badge>

// Countdown
<CountdownTimer targetDate={new Date('2026-12-31')} />
```

---

## 📝 版本历史

| 版本 | 日期 | 更新内容 |
|-----|------|---------|
| v1.0 | 2026-03-20 | 初始版本 - 官方品牌指南 |
| v1.1 | 2026-03-20 | 添加完整品牌指南 |
| v2.0 | 2026-03-20 | 超详细版 - 添加所有 Figma Node IDs |
| v3.0 | 2026-03-20 | 实战应用手册 - 完整代码和组件库 |

---

## 🤝 贡献者

- **提取者**: Piggyx AI Assistant
- **来源**: Rootstock Official Figma Files
- **项目**: Rootstock 3000 Days SBT

---

## 📄 许可说明

品牌资产归 Rootstock 所有。
文档整理仅供 Rootstock 3000 Days SBT 项目内部使用。

---

## 🆘 需要帮助？

### 常见问题

**Q: 我应该用哪个颜色作为主 CTA 按钮？**
A: `#FF9100` (Rootstock Orange) - 这是官方主强调色

**Q: 标签的圆角应该是多少？**
A: `13.65px` (border-radius: 13.65px)

**Q: 哪里可以找到 Logo 的导出节点？**
A: 查看超详细版文档的"Figma 素材索引"部分

**Q: 如何使用 Tailwind 配置？**
A: 复制实战手册中的 `tailwind.config.js` 内容到你的项目

**Q: 有没有现成的 React 组件？**
A: 有！在实战手册中有完整的 Button、Card、Badge 等组件代码

---

## 🎉 下一步

1. ✅ 选择你需要的文档
2. ✅ 复制代码到项目
3. ✅ 开始开发 Rootstock 3000 SBT DApp
4. ✅ 遵循品牌指南，创建精美 UI

**Happy Coding! 🚀**
