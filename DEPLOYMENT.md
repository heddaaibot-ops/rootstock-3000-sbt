# Rootstock 3000 SBT - 部署说明

## 正确的部署网址
**生产环境**: https://rootstock-3000-sbt.vercel.app

## 正确的部署命令

### ⚠️ 重要：必须从项目根目录部署
```bash
# 切换到项目根目录（不是 frontend 子目录）
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt

# 使用 token 部署到生产环境（token 保存在 .env.local）
npx vercel --prod --yes
```

### 常见错误
❌ **错误做法**: 从 `frontend` 目录部署
```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend  # 错误！
npx vercel --prod --yes  # 会失败
```

✅ **正确做法**: 从根目录部署
```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt  # 正确！
npx vercel --prod --yes
```

## 完整工作流程

### 1. 修改代码
```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend
# 编辑文件...
```

### 2. 提交到 Git
```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend
git add -A
git commit -m "描述更改"
git push origin main
```

### 3. 部署到 Vercel
```bash
# 必须切换到根目录！
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt
npx vercel --prod --yes
```

## 项目目录结构
```
rootstock-3000-sbt/              ← 从这里部署 Vercel
├── .vercel/
├── vercel.json                  ← Vercel 配置文件位置
├── frontend/                    ← 在这里修改代码
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .git/                    ← Git 仓库位置
└── DEPLOYMENT.md                ← 本文件
```

## 环境变量
Token 已保存在项目根目录的 `.env.local` 文件中。

## 最后部署记录
- **日期**: 2025-03-21
- **Commit**: 58e2140
- **更改**: 本地化 Milestone Date 为里程碑日，修正进度条刻度为 2.5k/5k/7.5k/10k
- **部署URL**: https://rootstock-3000-sbt.vercel.app
