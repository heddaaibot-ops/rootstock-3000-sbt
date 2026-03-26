# Rootstock 3000 SBT 自动铸造脚本文档

> **文档创建日期**: 2026-03-26
> **脚本文件**: `/scripts/auto-mint.js`
> **合约地址**: `0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188`

---

## 📋 功能概述

这个脚本用于批量自动化铸造 Rootstock 3000 SBT（灵魂绑定代币），包含以下核心功能：

### 🎯 三大核心功能

1. **生成钱包** - 自动创建 30 个新的以太坊钱包
2. **分发 rBTC** - 从主钱包向生成的钱包分发 gas 费用
3. **自动铸造** - 每 2 分钟自动铸造一个 SBT

---

## ⚙️ 配置参数

```javascript
const CONFIG = {
  // Rootstock RPC
  RPC_URL: 'https://public-node.rsk.co',

  // 合约地址
  CONTRACT_ADDRESS: '0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188',

  // RBTC 价格（USD）- 需要手动更新
  RBTC_PRICE_USD: 69000,  // 当前约 $69,000

  // 每个钱包获得的 rBTC（USD 范围）
  MIN_AMOUNT_USD: 0.335,   // 最小 $0.335
  MAX_AMOUNT_USD: 0.35,    // 最大 $0.35

  // 铸造间隔
  MINT_INTERVAL_MS: 2 * 60 * 1000,  // 2 分钟

  // 钱包数量
  TOTAL_WALLETS: 30,        // 生成总数
  WALLETS_TO_FUND: 26,      // 实际分发数量（适配 $10 预算）

  // 文件路径
  WALLETS_FILE: './generated-wallets.json',  // 钱包信息
  PROGRESS_FILE: './mint-progress.json',     // 进度记录

  // 重试配置
  MAX_RETRIES: 3,           // 最多重试次数
  RETRY_DELAY_MS: 30000,    // 重试延迟 30 秒

  // 最小余额要求
  MIN_BALANCE_REQUIRED: 0.000005,  // ~$0.35
};
```

---

## 🚀 使用方法

### 前置要求

```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/scripts
npm install ethers
```

### 命令格式

```bash
# 1. 生成钱包（不需要私钥）
node auto-mint.js generate

# 2. 分发 rBTC（需要主钱包私钥）
node auto-mint.js distribute <主钱包私钥>

# 3. 自动铸造（不需要私钥）
node auto-mint.js mint

# 4. 一键执行所有步骤（需要主钱包私钥）
node auto-mint.js all <主钱包私钥>
```

---

## 📊 执行流程详解

### 步骤 1: 生成钱包 (`generate`)

**功能**:
- 生成 30 个随机钱包
- 每个钱包包含：地址、私钥、助记词
- 保存到 `generated-wallets.json`

**输出示例**:
```
📝 步骤 1: 生成钱包...

  ✓ 钱包 1: 0x1234...abcd
  ✓ 钱包 2: 0x5678...efgh
  ...

✅ 已生成 30 个钱包
📁 钱包信息已保存到: ./generated-wallets.json
```

**生成的文件结构**:
```json
[
  {
    "index": 0,
    "address": "0x...",
    "privateKey": "0x...",
    "mnemonic": "word1 word2 word3...",
    "funded": false,
    "minted": false
  }
]
```

---

### 步骤 2: 分发 rBTC (`distribute`)

**功能**:
- 从主钱包向前 26 个钱包分发 rBTC
- 每个钱包随机获得 $0.335-$0.35 USD 等值的 rBTC
- 自动计算并扣除 gas 费用

**执行前检查**:
```
📊 主钱包地址: 0x...
💰 主钱包余额: 0.00015000 RBTC

📊 分发计划:
  • 需要分发到 26 个钱包
  • 总 rBTC 需求: 0.00012857 RBTC
  • 估算 gas 费用: 0.00000546 RBTC
```

**分发过程**:
```
🚀 开始分发...

  [1/26] 向 0x1234abcd... 发送 0.00000493 RBTC ($0.340)
      ⏳ 等待确认... (txHash: 0xabc...)
      ✅ 已确认

  [2/26] 向 0x5678efgh... 发送 0.00000505 RBTC ($0.348)
      ⏳ 等待确认... (txHash: 0xdef...)
      ✅ 已确认
  ...
```

**安全机制**:
- ✅ 余额检查：确保主钱包有足够余额
- ✅ Gas 估算：自动计算网络 gas 费用
- ✅ 延迟发送：每笔交易间隔 1 秒，避免 nonce 冲突
- ✅ 明确 gas limit：21000，避免估算开销

---

### 步骤 3: 自动铸造 (`mint`)

**功能**:
- 自动遍历所有已获得资金的钱包
- 每个钱包调用合约 `mint()` 函数
- 每 2 分钟铸造一个 SBT
- 自动提取 Token ID

**铸造流程**:

#### 3.1 初始化
```
🎨 步骤 3: 自动铸造 SBT...

📊 待铸造钱包数量: 26
⏱️  铸造间隔: 120 秒
🕐 预计完成时间: 52.0 分钟
```

#### 3.2 批量检查 SBT 状态
```
🔍 批量检查 26 个钱包的SBT状态...
  ✅ 已拥有SBT: 0 个
  ⏳ 未拥有SBT: 26 个
```

#### 3.3 逐个铸造
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 [1/26] 钱包 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 地址: 0x1234...abcd
💰 RBTC余额: 0.00000493 RBTC
✅ 余额充足，开始铸造...
📝 交易哈希: 0xmint123...
⏳ 等待确认...
🎫 获得 Token ID: 3001
✅ 铸造成功！
🔗 查看交易: https://rootstock.blockscout.com/tx/0xmint123...

⏱️  等待 120 秒后继续...
```

#### 3.4 智能跳过机制

**场景 1: 已拥有 SBT（批量检查发现）**
```
✅ 该钱包已拥有 1 个SBT（批量检查），跳过铸造
📝 已更新本地记录
```

**场景 2: 余额不足**
```
💰 RBTC余额: 0.00000002 RBTC
⚠️  余额不足！需要至少 0.00000500 RBTC，当前仅 0.00000002 RBTC
💡 跳过此钱包，继续下一个...
```

**场景 3: 合约拒绝（已铸造过）**
```
ℹ️  该钱包已经铸造过了（合约拒绝）
```

#### 3.5 重试机制

如果铸造失败，会自动重试最多 3 次：
```
⚠️  尝试 1/3 失败: network error
⏳ 30秒后重试...

⚠️  尝试 2/3 失败: timeout
⏳ 30秒后重试...

✅ 第 3 次尝试成功！
```

#### 3.6 完成统计
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 所有铸造任务完成！
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 铸造统计:
  ✅ 成功: 26 个
  📈 成功率: 100.0%

🔗 查看合约: https://rootstock.blockscout.com/token/0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188
```

---

## 💰 成本统计报表

脚本会自动生成详细的成本报表：

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 成本统计报表
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 铸造交易统计:
  🎫 成功铸造: 26 个
  ⛽ 总Gas消耗: 1234567
  💵 总Gas费用: 0.00001234 RBTC (~$0.85)
  📊 平均Gas/笔: 47483
  💰 平均成本/笔: 0.00000047 RBTC (~$0.033)

📊 分发统计:
  💸 已分发钱包: 26 个
  💵 总分发金额: 0.00012857 RBTC (~$8.87)

📊 总成本:
  💰 总花费: 0.00014091 RBTC (~$9.72)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🛡️ 安全特性

### 1. 余额检查
- ✅ 分发前检查主钱包余额
- ✅ 铸造前检查每个钱包余额
- ✅ 设置最小余额要求 (0.000005 RBTC)

### 2. 错误处理
- ✅ 3 次重试机制
- ✅ 30 秒重试延迟
- ✅ 自动跳过已铸造钱包
- ✅ 自动跳过余额不足钱包

### 3. 进度保存
- ✅ 实时保存进度到 `mint-progress.json`
- ✅ 中断后可从上次位置继续
- ✅ 完成后自动清除进度文件

### 4. 防重复铸造
- ✅ 批量检查链上 SBT 状态
- ✅ 检测合约 `Already minted` 错误 (`0xddefae28`)
- ✅ 本地记录已铸造状态

---

## 📁 生成的文件

### 1. `generated-wallets.json` - 钱包信息

**完整结构**:
```json
[
  {
    "index": 0,
    "address": "0x1234567890abcdef1234567890abcdef12345678",
    "privateKey": "0xabcd...",
    "mnemonic": "word1 word2 word3 ... word12",
    "funded": true,
    "fundedAmount": 0.00000493,
    "minted": true,
    "mintTxHash": "0xmint123...",
    "mintTime": "2026-03-26T10:30:00.000Z",
    "tokenId": "3001"
  }
]
```

**字段说明**:
- `index`: 钱包序号 (0-29)
- `address`: 钱包地址
- `privateKey`: 私钥（⚠️ 敏感信息）
- `mnemonic`: 助记词（⚠️ 敏感信息）
- `funded`: 是否已获得资金
- `fundedAmount`: 获得的 rBTC 数量
- `minted`: 是否已铸造
- `mintTxHash`: 铸造交易哈希（或状态标记）
- `mintTime`: 铸造时间（ISO 8601）
- `tokenId`: SBT Token ID

**特殊 `mintTxHash` 值**:
- `already_minted_on_chain`: 批量检查发现已拥有
- `already_minted_contract_error`: 合约拒绝（已铸造）
- `skipped_insufficient_balance`: 余额不足跳过
- `0xabc...`: 正常交易哈希

---

### 2. `mint-progress.json` - 进度记录

**结构**:
```json
{
  "phase": "minting",
  "lastProcessedIndex": 5,
  "total": 26,
  "timestamp": "2026-03-26T10:35:00.000Z",
  "nextIndex": 6
}
```

**用途**:
- 记录当前执行到哪个钱包
- 中断后自动从 `nextIndex` 继续
- 完成后自动删除

---

## 🔧 高级功能

### 1. RBTC 价格自动检查

脚本会通过 CoinGecko API 获取实时价格并对比配置：

```
💱 RBTC 价格检查:
  • 脚本配置价格: $69,000
  • 当前市场价格: $71,500
  ⚠️  警告：价格差异 3.6%，建议更新配置中的 RBTC_PRICE_USD
```

**如何更新价格**:
编辑 `auto-mint.js` 第 28 行：
```javascript
RBTC_PRICE_USD: 71500,  // 更新为最新价格
```

---

### 2. 批量 SBT 状态检查

在开始铸造前，脚本会并行检查所有钱包是否已拥有 SBT：

```javascript
async function batchCheckSBTOwnership(wallets, provider) {
  const contract = new ethers.Contract(...);

  const promises = wallets.map(w =>
    contract.balanceOf(w.address)
      .then(balance => ({ wallet: w, balance, hasSBT: balance > 0 }))
  );

  return await Promise.all(promises);
}
```

**优势**:
- 🚀 并行查询，速度快
- 💰 节省 gas（跳过已拥有 SBT 的钱包）
- 📊 提前显示统计信息

---

### 3. Token ID 自动提取

铸造成功后，脚本会从交易收据中提取 Token ID：

```javascript
// 查找 Transfer 事件
const transferEvent = receipt.logs.find(log =>
  log.topics[0] === ethers.id('Transfer(address,address,uint256)')
);

if (transferEvent && transferEvent.topics.length >= 4) {
  tokenId = ethers.toBigInt(transferEvent.topics[3]).toString();
  console.log(`🎫 获得 Token ID: ${tokenId}`);
}
```

**Token ID 范围**: 3000-3029 (对应 30 个钱包)

---

## 💡 使用建议

### 1. 预算规划

**26 个钱包的预算示例** (RBTC = $69,000):
```
• 每个钱包: $0.335-$0.35
• 26 个钱包: ~$8.87
• Gas 费用: ~$0.85
• 总计: ~$9.72
• 建议准备: ~$12 (含 20% 缓冲)
```

**如何调整数量**:
修改 `CONFIG.WALLETS_TO_FUND`:
```javascript
WALLETS_TO_FUND: 20,  // 从 26 改为 20
```

---

### 2. 分批执行策略

**推荐流程**:
```bash
# Day 1: 生成钱包并检查预算
node auto-mint.js generate

# Day 1: 确认无误后分发资金
node auto-mint.js distribute 0xYOUR_PRIVATE_KEY

# Day 2: 开始自动铸造（需要 52 分钟）
node auto-mint.js mint
```

**一键执行** (适合测试):
```bash
node auto-mint.js all 0xYOUR_PRIVATE_KEY
```

---

### 3. 中断与恢复

**场景**: 铸造到第 10 个钱包时网络中断

**恢复方法**:
```bash
# 直接重新运行 mint 命令
node auto-mint.js mint

# 脚本会自动检测进度
📍 发现未完成任务，从钱包 11 继续...
```

**进度文件** (`mint-progress.json`):
```json
{
  "phase": "minting",
  "lastProcessedIndex": 9,
  "total": 26,
  "timestamp": "2026-03-26T10:35:00.000Z",
  "nextIndex": 10
}
```

---

### 4. 错误排查

#### 错误 1: "余额不足"
```
❌ 错误: 余额不足！需要 0.00012857 RBTC，但只有 0.00001000 RBTC
```

**解决方法**:
1. 充值主钱包至少 0.00015000 RBTC
2. 或减少 `WALLETS_TO_FUND` 数量

---

#### 错误 2: "钱包文件不存在"
```
❌ 错误: 钱包文件不存在，请先运行 generate 命令
```

**解决方法**:
```bash
node auto-mint.js generate
```

---

#### 错误 3: "Already minted"
```
ℹ️  该钱包已经铸造过了（合约拒绝）
```

**原因**: 该地址已拥有 SBT（SBT 不可转移，每个地址只能拥有一个）

**处理**: 脚本会自动跳过并继续下一个

---

## 🌐 相关链接

- **合约地址**: [`0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188`](https://rootstock.blockscout.com/token/0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188)
- **区块浏览器**: https://rootstock.blockscout.com
- **RPC 节点**: https://public-node.rsk.co
- **RBTC 价格**: https://www.coingecko.com/en/coins/rootstock

---

## 📝 技术细节

### Gas 优化

1. **明确 gas limit**:
```javascript
gasLimit: 21000  // 避免估算开销
```

2. **使用网络最优 gas price**:
```javascript
// ethers.js 自动使用网络当前最优 gas price (~0.026 Gwei)
const tx = await masterWallet.sendTransaction({...});
```

---

### 合约 ABI

```javascript
const CONTRACT_ABI = [
  {
    inputs: [],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];
```

---

### 防重复逻辑

```javascript
// 批量检查
if (sbtCheckResult.hasSBT) {
  wallet.mintTxHash = 'already_minted_on_chain';
  continue;
}

// 合约错误检测
if (error.message.includes('0xddefae28') ||
    error.message.includes('Already minted') ||
    error.data === '0xddefae28') {
  wallet.mintTxHash = 'already_minted_contract_error';
}
```

---

## ⚠️ 安全警告

1. **私钥保护**:
   - ⚠️ `generated-wallets.json` 包含私钥和助记词
   - ⚠️ 不要上传到 Git 或公开分享
   - ⚠️ 使用后建议加密存储

2. **主钱包安全**:
   - ⚠️ 不要在命令行历史中保存私钥
   - ⚠️ 建议使用环境变量:
     ```bash
     export MASTER_KEY="0xYOUR_PRIVATE_KEY"
     node auto-mint.js distribute $MASTER_KEY
     ```

3. **网络安全**:
   - ✅ 使用官方 RPC 节点
   - ✅ 验证合约地址正确

---

## 📞 支持与维护

**脚本位置**: `/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/scripts/auto-mint.js`

**依赖版本**:
- Node.js: >= 16.x
- ethers.js: ^6.13.0

**更新记录**:
- 2026-03-26: 文档创建
- 支持批量 SBT 状态检查
- 支持 Token ID 自动提取
- 支持进度保存与恢复
- 支持成本统计报表

---

**文档结束** 🎉
