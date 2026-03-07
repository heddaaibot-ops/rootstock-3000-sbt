# 🚀 Vercel 部署指南 - 2 分钟完成

## 快速部署步骤

### 1. 访问 Vercel
打开浏览器，访问：**https://vercel.com/new**

### 2. 导入 GitHub 仓库
1. 点击 "Import Git Repository"
2. 如果没登录，选择 "Continue with GitHub" 登录
3. 找到 `heddaaibot-ops/rootstock-3000-sbt`
4. 点击 "Import"

### 3. 配置项目
Vercel 会自动检测到 Next.js 项目，配置如下：

```
Framework Preset: Next.js
Build Command: cd frontend && npm install && npm run build
Output Directory: frontend/.next
Install Command: cd frontend && npm install
Root Directory: ./
```

### 4. 环境变量（可选）
如果要连接真实合约，添加环境变量：
- `NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET` = 你的测试网合约地址
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` = 从 https://cloud.walletconnect.com/ 获取

**注意**：不配置也可以部署，只是无法连接合约。

### 5. 部署
点击 "Deploy" 按钮！

等待 1-2 分钟，Vercel 会：
- ✅ 克隆代码
- ✅ 安装依赖
- ✅ 构建项目
- ✅ 部署到全球 CDN

### 6. 获取 URL
部署完成后，你会得到一个 URL，例如：
```
https://rootstock-3000-sbt.vercel.app
```

## 🎉 完成！

打开上面的 URL 就能看到完整的 UI 了！

---

## 🔄 自动部署

每次你推送代码到 GitHub，Vercel 会自动重新部署！

---

## ⚙️ 高级配置（可选）

如果 Vercel 没有自动检测正确，手动配置：

1. **Root Directory**: 留空或填 `./`
2. **Build Command**:
   ```bash
   cd frontend && npm run build
   ```
3. **Output Directory**:
   ```
   frontend/.next
   ```
4. **Install Command**:
   ```bash
   cd frontend && npm install
   ```

---

## 📱 部署后可以做什么

✅ 在手机/平板上查看
✅ 分享给朋友/团队
✅ 测试钱包连接
✅ 体验完整功能

---

需要帮助？查看 Vercel 官方文档：https://vercel.com/docs
