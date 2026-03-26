#!/bin/bash

#######################################################
# Vercel 部署脚本
# 使用保存的 token 进行部署，避免每次登录
#######################################################

# 从 ~/.vercel/auth.json 读取 token
VERCEL_TOKEN=$(cat ~/.vercel/auth.json 2>/dev/null | grep -o '"token": "[^"]*"' | cut -d'"' -f4)

if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ 未找到 Vercel token"
  echo "请运行: vercel login"
  exit 1
fi

echo "🚀 开始部署到 Vercel..."
echo ""

# 部署到生产环境
vercel --prod --token "$VERCEL_TOKEN"

echo ""
echo "✅ 部署完成！"
echo "🌐 访问: https://rootstockcn.com"
