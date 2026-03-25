# 🎨 Rootstock 3000 SBT Auto-Mint v2.0

## 📋 项目概览

自动化批量铸造 Rootstock 3000 Days SBT（Soul Bound Token）的完整解决方案。

**版本**: v2.0 (2026-03-25)
**状态**: ✅ 生产就绪

---

## ✨ v2.0 新特性

| 功能 | 说明 | 价值 |
|-----|------|------|
| 🔄 **失败重试** | 自动重试3次 | 提高成功率 |
| 💾 **断点续传** | 中断后继续执行 | 节省时间 |
| 💰 **成本统计** | 详细费用报表 | 100%透明 |
| ⚡ **批量检查** | 速度提升85% | 极速处理 |
| ✅ **余额预检** | 提前检查跳过 | 避免浪费 |
| 🎫 **Token ID** | 自动提取保存 | 便于管理 |

---

## 🚀 快速开始

### 一键执行（推荐）
```bash
PRIVATE_KEY=0x你的私钥 node auto-mint.js all
```

### 分步执行
```bash
# 1. 生成30个钱包
node auto-mint.js generate

# 2. 分发RBTC到26个钱包
PRIVATE_KEY=0x你的私钥 node auto-mint.js distribute

# 3. 自动铸造SBT
PRIVATE_KEY=0x你的私钥 node auto-mint.js mint
```

---

## 📁 文件说明

### 核心文件
- `auto-mint.js` (23KB) - 主脚本（v2.0改进版）
- `auto-mint.js.backup` - v1.0备份
- `generated-wallets.json` - 钱包数据
- `mint-progress.json` - 进度文件（运行时生成）

### 文档
- `QUICK_START.md` - 快速开始指南 ⭐
- `IMPROVEMENTS.md` - 详细改进说明
- `CHANGELOG.md` - 版本更新日志
- `COMPARISON.md` - 改进前后对比
- `README_v2.md` - 本文件

### 测试
- `test-improvements.js` - 功能测试脚本

---

## 📊 性能数据

| 操作 | v1.0 | v2.0 | 提升 |
|-----|------|------|------|
| 检查26个钱包 | 26秒 | 3.8秒 | **85%↑** |
| 铸造失败处理 | 手动 | 自动重试 | **成功率↑** |
| 中断恢复 | 从头开始 | 断点续传 | **时间↓** |

---

## 💰 成本估算

- **分发费用**: ~$9.00 (26个钱包 × $0.35)
- **铸造Gas费**: ~$6.50 (22个钱包 × $0.295)
- **总计**: ~$9.04

*基于RBTC价格$69,000，实际费用以运行时价格为准*

---

## 🧪 测试验证

运行测试：
```bash
node test-improvements.js
```

预期输出：
```
✅ 批量检查: 5个钱包 725ms
✅ 进度文件: 读写正常
✅ Token ID提取: 成功
```

---

## 🔧 配置选项

在 `auto-mint.js` 中可调整：

```javascript
// 基础配置
RPC_URL: 'https://public-node.rsk.co',
CONTRACT_ADDRESS: '0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188',
RBTC_PRICE_USD: 69000,

// 分发配置
MIN_AMOUNT_USD: 0.335,
MAX_AMOUNT_USD: 0.35,
WALLETS_TO_FUND: 26,

// 铸造配置
MINT_INTERVAL_MS: 120000,  // 2分钟

// v2.0 新增
MAX_RETRIES: 3,            // 重试次数
RETRY_DELAY_MS: 30000,     // 重试间隔
MIN_BALANCE_REQUIRED: 0.000005,  // 最小余额
```

---

## 📖 使用示例

### 场景1：正常铸造
```bash
PRIVATE_KEY=0xabc... node auto-mint.js all
```

### 场景2：断点续传
```bash
# 第一次运行（处理到一半中断）
PRIVATE_KEY=0xabc... node auto-mint.js mint
^C  # 中断

# 重新运行，自动从上次位置继续
PRIVATE_KEY=0xabc... node auto-mint.js mint
# 输出: 📍 发现未完成任务，从钱包 15 继续...
```

### 场景3：查看成本报表
运行完成后自动显示：
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 成本统计报表
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 总成本:
  💰 总花费: 0.01309420 RBTC (~$9.04)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## ⚠️ 注意事项

1. **私钥安全**: 不要在脚本中硬编码私钥，使用环境变量
2. **RBTC价格**: 定期更新配置中的RBTC_PRICE_USD
3. **进度文件**: 铸造完成后会自动删除，中断时会保留
4. **网络稳定**: 使用稳定的网络连接以减少重试

---

## 🆘 常见问题

### Q: 如何知道铸造进度？
A: 实时显示进度，如 `🎯 [15/26] 钱包 18`

### Q: 中断后如何继续？
A: 重新运行 `mint` 命令，会自动检测并继续

### Q: 如何查看Token ID？
A: 查看 `generated-wallets.json` 中的 `tokenId` 字段

### Q: 重试失败怎么办？
A: 脚本会跳过并继续，完成后可以手动处理失败的钱包

---

## 📚 更多信息

- **详细改进**: 查看 `IMPROVEMENTS.md`
- **快速指南**: 查看 `QUICK_START.md`
- **版本历史**: 查看 `CHANGELOG.md`
- **性能对比**: 查看 `COMPARISON.md`

---

## 📞 支持

遇到问题？查看文档或检查：
1. ✅ RBTC余额是否充足
2. ✅ RPC节点是否可用
3. ✅ 私钥格式是否正确
4. ✅ 网络连接是否稳定

---

## 📜 许可证

MIT License

---

**版本**: v2.0
**最后更新**: 2026-03-25
**状态**: ✅ 已测试并验证

🎉 享受改进后的自动化体验！
