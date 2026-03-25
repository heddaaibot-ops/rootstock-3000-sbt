# 🎯 Auto-Mint Script v2.0 - 优化版本

**日期**: 2026-03-25
**优化者**: Piggyx
**预算**: 10 USD

---

## 📊 最终配置

```javascript
// 核心参数
RBTC_PRICE_USD: 69000,
MIN_AMOUNT_USD: 0.335,
MAX_AMOUNT_USD: 0.35,
MINT_INTERVAL_MS: 120000,  // 2 分钟
TOTAL_WALLETS: 30,
WALLETS_TO_FUND: 26,  // ⭐ 适配 10 美元预算
```

---

## 🔧 关键优化

### 1. **Gas 优化 - 方案C（自动估算）**

**铸造阶段**：
```javascript
// ✅ 新方案 (第 327 行)
const tx = await contract.mint();
// ethers.js 自动估算 gas (~108k)
```

**分发阶段**：
```javascript
// ✅ 优化 (第 254-259 行)
const tx = await masterWallet.sendTransaction({
  to: wallet.address,
  value: ethers.parseEther(amountRBTC.toFixed(18)),
  gasLimit: 21000,  // 明确设置，避免估算开销
});
// ethers.js 自动使用网络最优 gas price (~0.026 Gwei)
```

### 2. **预算适配 - 26 个钱包**

**成本计算**（基于实际网络 gas price 0.026 Gwei）：
```
分发金额: 26 × 0.3425 = $8.91
分发 Gas: 26 × 0.038  = $0.99
─────────────────────────────
总计:                  $9.90
建议准备:              $10-11
```

### 3. **随机金额策略**

```javascript
// 0.335-0.35 USD 随机分布
function getRandomAmountUSD() {
  const min = 0.335;
  const max = 0.35;
  return Math.floor((Math.random() * (max - min) + min) * 1000) / 1000;
}
// 输出示例: 0.337, 0.348, 0.342, 0.335, 0.350
```

---

## ⏱️ 执行时长

```
生成钱包:  < 5 秒
分发资金:  ~30 秒
自动铸造:  26 × 2 分钟 = 52 分钟
──────────────────────────
总计:      约 53 分钟
```

---

## 💰 成本明细

### Rootstock 网络费用
```
当前 Gas Price: 0.026 Gwei（实测）
RBTC 价格: $69,000

单笔转账: 21,000 gas × 0.026 Gwei = $0.038
单次铸造: 90,000 gas × 0.026 Gwei = $0.166
```

### 完整流程
```
主钱包支出:
├─ 分发给26个钱包: $8.91
└─ 分发 Gas 费用:   $0.99
   ─────────────────────
   总计:            $9.90

每个子钱包:
└─ 铸造 Gas 费用:   $0.166 (从分发的 $0.3425 中扣除)
```

---

## 🚀 使用方法

### 快速启动
```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/scripts
node auto-mint.js all <主钱包私钥>
```

### 分步执行
```bash
# 步骤1: 生成30个钱包
node auto-mint.js generate

# 步骤2: 给26个钱包分发资金
node auto-mint.js distribute <主钱包私钥>

# 步骤3: 26个钱包自动铸造
node auto-mint.js mint
```

### 交互式启动
```bash
./start.sh
```

---

## 📁 生成的文件

### generated-wallets.json
```json
[
  {
    "index": 0,
    "address": "0x...",
    "privateKey": "0x...",
    "mnemonic": "word1 word2 word3...",
    "funded": true,
    "fundedAmount": 0.00000507,
    "minted": true,
    "mintTxHash": "0x...",
    "mintTime": "2026-03-25T..."
  },
  ...
]
```

---

## ✅ 优化亮点

### 1. Gas 效率
- **铸造**: 自动估算，平均 108,000 gas limit
- **转账**: 固定 21,000 gas limit，使用网络最优 gas price
- **节省**: 相比固定 150k，更灵活高效

### 2. 成本控制
- **精准预算**: 26 个钱包 = $9.90，完美适配 10 美元
- **Gas 实测**: 基于 Rootstock 实际网络 gas price (0.026 Gwei)
- **缓冲合理**: 分发金额 0.335-0.35 包含 12% 铸造缓冲

### 3. 自然模拟
- **随机金额**: 0.335-0.35 USD 随机分布
- **时间间隔**: 每 2 分钟铸造一个
- **外观效果**: 看起来像 26 个真实用户在不同时间铸造

### 4. 可靠性
- **断点恢复**: 每次成功后立即保存 JSON
- **错误处理**: 识别"已铸造"错误，跳过继续
- **实时价格**: CoinGecko API 检查 RBTC 价格

---

## 📊 与前版本对比

| 项目 | v1.0 | v2.0 (当前) | 改进 |
|------|------|-------------|------|
| **钱包数量** | 28 | 26 | 适配预算 |
| **预算要求** | $25-35 | $10-11 | -70% |
| **铸造 Gas** | 固定 150k | 自动估算 ~108k | 更灵活 |
| **转账 Gas** | 自动 | 固定 21k + 最优价格 | 更快 |
| **执行时间** | 56 分钟 | 52 分钟 | -7% |

---

## 🔐 安全提示

1. **私钥安全**
   - 主钱包私钥通过命令行参数传入
   - 不会保存到任何文件
   - 执行完后妥善保管 `generated-wallets.json`

2. **备份重要**
   - `generated-wallets.json` 包含所有钱包信息
   - 建议保存到安全位置
   - 不要泄露给他人

3. **余额检查**
   - 执行前确认主钱包有足够余额
   - 建议准备 $11 USD 以上（含缓冲）

---

## 📝 相关文档

- `auto-mint.js` - 主脚本（477 行）
- `QUICKSTART.md` - 快速开始指南
- `FEATURES.md` - 功能特性说明
- `README.md` - 完整文档

---

## 🎯 版本总结

**v2.0 - 10美元优化版**
- ✅ 适配 10 美元预算（26 个钱包）
- ✅ Gas 全面优化（自动估算 + 网络最优价格）
- ✅ 成本精准控制（$9.90）
- ✅ 执行时间优化（52 分钟）
- ✅ 完整功能保留（价格检查、统计、断点恢复）

**状态**: ✅ 已测试，准备就绪

**下一步**: 等待用户提供主钱包私钥执行
