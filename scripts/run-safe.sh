#!/bin/bash

# ========================================
# Rootstock 3000 SBT 安全执行包装脚本
# 适用于：AI Bot、自动化流程
# ========================================

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# ========================================
# 1. 环境检查
# ========================================

log_info "步骤1：环境检查"

# 检查Node.js
if ! command -v node &> /dev/null; then
    log_error "Node.js 未安装"
    exit 1
fi

NODE_VERSION=$(node --version | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    log_error "Node.js 版本过低 (当前: v$NODE_VERSION, 需要: v18+)"
    exit 1
fi
log_info "Node.js 版本: $(node --version) ✓"

# 检查npm
if ! command -v npm &> /dev/null; then
    log_error "npm 未安装"
    exit 1
fi
log_info "npm 版本: $(npm --version) ✓"

# 检查ethers.js
if ! node -e "require('ethers')" 2>/dev/null; then
    log_warn "ethers.js 未安装，正在安装..."
    npm install ethers@6
    if [ $? -eq 0 ]; then
        log_info "ethers.js 安装成功 ✓"
    else
        log_error "ethers.js 安装失败"
        exit 1
    fi
else
    log_info "ethers.js 已安装 ✓"
fi

# ========================================
# 2. 切换到脚本目录
# ========================================

log_info "步骤2：切换目录"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"
log_info "当前目录: $(pwd) ✓"

# ========================================
# 3. 检查必要文件
# ========================================

log_info "步骤3：检查文件"

if [ ! -f "auto-mint.js" ]; then
    log_error "auto-mint.js 不存在"
    exit 1
fi
log_info "auto-mint.js 存在 ✓"

# ========================================
# 4. 检查私钥
# ========================================

log_info "步骤4：验证私钥"

if [ -z "$PRIVATE_KEY" ]; then
    log_error "PRIVATE_KEY 环境变量未设置"
    echo ""
    echo "请设置私钥："
    echo "  export PRIVATE_KEY=\"0x你的64位私钥\""
    echo ""
    exit 1
fi

# 检查私钥格式
if [[ ! $PRIVATE_KEY =~ ^0x[0-9a-fA-F]{64}$ ]]; then
    log_error "私钥格式错误"
    echo ""
    echo "正确格式："
    echo "  - 以 0x 开头"
    echo "  - 总长度 66 个字符"
    echo "  - 只包含 0-9 和 a-f"
    echo ""
    exit 1
fi
log_info "私钥格式正确 ✓"

# ========================================
# 5. 运行预检脚本（如果存在）
# ========================================

if [ -f "pre-flight-check.js" ]; then
    log_info "步骤5：运行预检脚本"
    if node pre-flight-check.js; then
        log_info "预检通过 ✓"
    else
        log_error "预检失败，请修复后重试"
        exit 1
    fi
else
    log_warn "pre-flight-check.js 不存在，跳过预检"
fi

# ========================================
# 6. 备份现有文件（如果存在）
# ========================================

log_info "步骤6：备份检查"

if [ -f "generated-wallets.json" ]; then
    BACKUP_FILE="generated-wallets.backup.$(date +%Y%m%d_%H%M%S).json"
    cp generated-wallets.json "$BACKUP_FILE"
    log_info "已备份钱包文件: $BACKUP_FILE ✓"
fi

# ========================================
# 7. 执行脚本
# ========================================

log_info "步骤7：执行主脚本"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 解析命令行参数
COMMAND=${1:-all}

case $COMMAND in
    generate)
        log_info "执行：生成钱包"
        node auto-mint.js generate
        ;;
    distribute)
        log_info "执行：分发RBTC"
        node auto-mint.js distribute
        ;;
    mint)
        log_info "执行：铸造SBT"
        node auto-mint.js mint
        ;;
    all)
        log_info "执行：完整流程"
        node auto-mint.js all
        ;;
    *)
        log_error "未知命令: $COMMAND"
        echo ""
        echo "用法："
        echo "  $0 [generate|distribute|mint|all]"
        echo ""
        echo "示例："
        echo "  $0 all          # 执行完整流程（默认）"
        echo "  $0 generate     # 仅生成钱包"
        echo "  $0 distribute   # 仅分发RBTC"
        echo "  $0 mint         # 仅铸造SBT"
        echo ""
        exit 1
        ;;
esac

EXIT_CODE=$?

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ========================================
# 8. 检查结果
# ========================================

if [ $EXIT_CODE -eq 0 ]; then
    log_info "✅ 执行成功！"

    # 验证结果
    if [ -f "generated-wallets.json" ]; then
        MINTED_COUNT=$(grep -c '"minted": true' generated-wallets.json || echo 0)
        log_info "已铸造钱包数: $MINTED_COUNT"
    fi

    echo ""
    log_info "下一步："
    echo "  1. 查看 generated-wallets.json"
    echo "  2. 访问 https://rootstock.blockscout.com/token/0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188"
    echo ""
else
    log_error "❌ 执行失败（退出码: $EXIT_CODE）"
    echo ""
    log_error "故障排除："
    echo "  1. 查看上方错误信息"
    echo "  2. 参考 ERROR_CODES.md"
    echo "  3. 运行: node pre-flight-check.js"
    echo ""
    exit $EXIT_CODE
fi

# ========================================
# 9. 安全清理
# ========================================

log_info "步骤9：安全清理"

# 提醒清除私钥
log_warn "⚠️  记得清除私钥环境变量："
echo "  unset PRIVATE_KEY"
echo ""

exit 0
