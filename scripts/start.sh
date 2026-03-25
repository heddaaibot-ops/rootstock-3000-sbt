#!/bin/bash
# Rootstock 3000 SBT 自动铸造启动脚本

set -e

# 颜色
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║   🎨 Rootstock 3000 SBT 自动铸造脚本                      ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# 检查 node_modules
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 首次运行，正在安装依赖...${NC}"
    npm install
    echo -e "${GREEN}✅ 依赖安装完成${NC}\n"
fi

# 显示菜单
echo -e "${BLUE}请选择操作:${NC}"
echo ""
echo "  1) 一键执行全部流程"
echo "  2) 仅生成钱包"
echo "  3) 仅分发 rBTC"
echo "  4) 仅铸造 SBT"
echo "  5) 查看帮助"
echo "  0) 退出"
echo ""
read -p "请输入选项 [0-5]: " choice

case $choice in
    1)
        echo ""
        read -p "请输入主钱包私钥: " private_key
        echo ""
        echo -e "${GREEN}🚀 开始执行全部流程...${NC}"
        node auto-mint.js all "$private_key"
        ;;
    2)
        echo ""
        echo -e "${GREEN}📝 生成钱包...${NC}"
        node auto-mint.js generate
        ;;
    3)
        echo ""
        read -p "请输入主钱包私钥: " private_key
        echo ""
        echo -e "${GREEN}💸 分发 rBTC...${NC}"
        node auto-mint.js distribute "$private_key"
        ;;
    4)
        echo ""
        echo -e "${GREEN}🎨 开始铸造...${NC}"
        node auto-mint.js mint
        ;;
    5)
        node auto-mint.js
        ;;
    0)
        echo -e "${GREEN}👋 再见！${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}❌ 无效选项${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✨ 完成！${NC}"
