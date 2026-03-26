# ✅ Vercel CLI 配置完成

## 🎯 问题已解决

1. ✅ **路径问题**: `rootDirectory: null` (不再期望 frontend/frontend)
2. ✅ **Token 已保存**: `~/.vercel/auth.json`
3. ✅ **部署脚本**: `deploy.sh` (一键部署)

## 🚀 快速部署

### 方法 1: 使用部署脚本（推荐）

```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend
./deploy.sh
```

这个脚本会：
- 自动从 `~/.vercel/auth.json` 读取 token
- 部署到生产环境
- 无需重复登录

### 方法 2: 使用 Git Push（最简单）

```bash
git add .
git commit -m "your changes"
git push
```

Vercel 会自动检测到 push 并部署！

### 方法 3: 手动部署

```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend

# 读取 token 并部署
VERCEL_TOKEN=$(cat ~/.vercel/auth.json | grep -o '"token": "[^"]*"' | cut -d'"' -f4)
vercel --prod --token "$VERCEL_TOKEN"
```

## 📁 配置文件位置

```
~/.vercel/auth.json          # Token 配置（全局）
.vercel/project.json         # 项目配置（本地）
deploy.sh                    # 部署脚本
```

## 🔑 Token 管理

- **保存位置**: `~/.vercel/auth.json`
- **格式**: `{ "token": "vcp_...", "email": "" }`
- **有效期**: 永久（除非手动撤销）
- **安全**: 已保存到本地，不会提交到 Git

## ✅ 验证配置

```bash
# 查看保存的 token（不显示完整内容）
cat ~/.vercel/auth.json | grep -o '"token": "vcp_[^"]*"'

# 测试 token 是否有效
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend
./deploy.sh --help
```

## 📊 当前部署状态

查看部署列表：
```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend
vercel ls
```

## 🎉 推荐工作流程

```bash
# 1. 修改代码
# 在编辑器中修改文件...

# 2. Git 提交
git add .
git commit -m "描述你的修改"
git push

# 3. 自动部署 ✅
# Vercel 会自动检测 push 并开始部署
# 1-2 分钟后访问 https://rootstockcn.com 查看更新
```

**不需要手动运行 vercel 命令！**

## 🔧 故障排查

### 问题: vercel 命令卡住

**解决方案**: 使用部署脚本

```bash
./deploy.sh
```

脚本会自动读取保存的 token。

### 问题: 每次都要配置

**解决方案**: Token 已保存到 `~/.vercel/auth.json`，使用部署脚本即可。

### 问题: Token 丢失

**解决方案**: 重新登录

```bash
vercel login
# 或手动创建 ~/.vercel/auth.json 并粘贴 token
```

## 💡 提示

- ✅ Token 已永久保存在本地，不会提交到 Git
- ✅ 优先使用 Git push 触发自动部署
- ✅ deploy.sh 脚本会自动读取 token
- ✅ 路径问题已解决（rootDirectory: null）

## 🔒 安全说明

- Token 保存在 `~/.vercel/auth.json`（本地）
- 权限设置为 `600`（仅所有者可读写）
- 不会提交到 Git 仓库
- GitHub 会自动检测并阻止 token 泄露

---

**配置完成时间**: 2026-03-27  
**Token 有效**: ✅ 已验证  
**部署状态**: ✅ 正常
