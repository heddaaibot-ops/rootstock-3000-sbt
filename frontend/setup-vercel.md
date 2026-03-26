# 🔧 Vercel CLI 完整配置指南

## ✅ 已修复的问题

1. **路径问题已修复**
   - 旧配置: `"rootDirectory": "frontend"` ❌
   - 新配置: `"rootDirectory": null` ✅
   - 现在 Vercel 会正确识别项目根目录

## 🔑 设置 Vercel Token（一次性配置）

### 方法 1: 使用 vercel login（推荐）

```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend

# 登录 Vercel（会打开浏览器）
vercel login

# 验证登录状态
vercel whoami
```

这会自动保存 token 到 `~/.vercel/auth.json`

### 方法 2: 手动设置 Token

如果你已经有 Vercel Token：

```bash
# 1. 获取 Token
# 访问: https://vercel.com/account/tokens
# 点击 "Create Token"
# 复制 token（只显示一次！）

# 2. 保存 Token
mkdir -p ~/.vercel
cat > ~/.vercel/auth.json << 'EOFTOKEN'
{
  "token": "YOUR_TOKEN_HERE"
}
EOFTOKEN
chmod 600 ~/.vercel/auth.json

# 3. 验证
vercel whoami
```

## 📋 完整配置检查清单

```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend

# ✅ 检查项目配置
cat .vercel/project.json | grep rootDirectory
# 应该显示: "rootDirectory": null,

# ✅ 检查认证
vercel whoami
# 应该显示你的 Vercel 用户名

# ✅ 检查项目关联
vercel ls
# 应该显示 rootstock-3000-sbt 项目

# ✅ 测试部署
vercel --prod
```

## 🎯 快速部署命令

配置完成后，以后只需要：

```bash
# 部署到生产环境
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend
vercel --prod

# 或者直接 git push，Vercel 会自动部署
git push origin main
```

## 🔍 故障排查

### 问题 1: vercel: command not found

```bash
# 安装 Vercel CLI
npm install -g vercel

# 验证安装
vercel --version
```

### 问题 2: 每次都要登录

```bash
# 检查 auth.json 是否存在
ls -la ~/.vercel/auth.json

# 如果不存在，运行
vercel login
```

### 问题 3: 路径错误（找不到 frontend/frontend）

```bash
# 检查 rootDirectory 配置
cat .vercel/project.json | grep rootDirectory

# 应该是 null，如果不是，运行：
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend
# 重新关联项目
vercel link --yes
```

## 📁 配置文件说明

### 项目配置
```
.vercel/project.json
├── projectId: prj_b8bwU2appN5TtyLzTx92ttrc3bbR
├── orgId: team_BiTVrnbUwYcq3WR49U79s8nf
└── rootDirectory: null ✅ (已修复)
```

### 全局认证
```
~/.vercel/auth.json
└── token: 你的 Vercel Token
```

## 🚀 推荐工作流程

```bash
# 1. 修改代码
# 在 VSCode 或其他编辑器中修改

# 2. 提交到 Git
git add .
git commit -m "your changes"
git push

# 3. Vercel 自动部署 ✅
# 无需手动运行 vercel 命令
# GitHub 推送会触发自动部署

# 4. 查看部署状态
# 访问: https://vercel.com/dashboard
# 或运行: vercel ls
```

## 💡 提示

- ✅ Token 只需要配置一次
- ✅ 项目已关联，无需重复 link
- ✅ Git push 会自动触发部署
- ✅ 路径问题已修复
