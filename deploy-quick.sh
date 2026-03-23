#!/bin/bash
# Rootstock 3000 Days SBT - 快速部署脚本
# 使用方法：./deploy-quick.sh

set -e

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Rootstock 3000 Days SBT - Vercel 部署${NC}"
echo ""

# 1. 检查当前目录
CURRENT_DIR=$(pwd)
EXPECTED_DIR="/Users/heddaai/clawd/piggyx/rootstock-3000-sbt"

if [ "$CURRENT_DIR" != "$EXPECTED_DIR" ]; then
    echo -e "${RED}❌ 错误：必须在正确的目录执行！${NC}"
    echo "当前目录: $CURRENT_DIR"
    echo "应该在: $EXPECTED_DIR"
    echo ""
    echo "正在切换到正确目录..."
    cd "$EXPECTED_DIR"
fi

echo -e "${GREEN}✅ 目录检查通过${NC}"
echo "当前目录: $(pwd)"
echo ""

# 2. 加载环境变量
if [ -f .env ]; then
    source .env
    echo -e "${GREEN}✅ 环境变量已加载${NC}"
else
    echo -e "${RED}❌ 找不到 .env 文件${NC}"
    exit 1
fi

# 3. 验证 Vercel Token
if [ -z "$VERCEL_TOKEN" ]; then
    echo -e "${RED}❌ VERCEL_TOKEN 未设置${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Vercel Token 已验证${NC}"
echo ""

# 4. 开始部署
echo -e "${BLUE}📦 开始部署到生产环境...${NC}"
echo ""

vercel --prod \
  --token "$VERCEL_TOKEN" \
  --yes \
  --archive=tgz

echo ""
echo -e "${GREEN}🎉 部署完成！${NC}"
echo -e "${BLUE}网站地址: https://rootstockcn.com${NC}"
