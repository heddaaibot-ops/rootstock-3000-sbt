# 🚀 快速开始 - 改进版脚本

## ✨ 新功能亮点

- ⚡ **批量检查** - 速度提升85%
- 🔄 **失败重试** - 自动重试3次
- 💾 **断点续传** - 中断后继续运行
- 💰 **成本统计** - 详细的费用报表
- 🎫 **Token ID** - 自动提取并保存

---

## 📦 使用方法

### 方法1：一键执行（推荐新用户）

```bash
PRIVATE_KEY=0x你的私钥 node auto-mint.js all
```

### 方法2：分步执行（推荐有经验用户）

```bash
# 步骤1：生成钱包
node auto-mint.js generate

# 步骤2：分发RBTC
PRIVATE_KEY=0x你的私钥 node auto-mint.js distribute

# 步骤3：铸造SBT
PRIVATE_KEY=0x你的私钥 node auto-mint.js mint
```

---

## 🔄 断点续传示例

### 场景：铸造过程中意外中断

```bash
# 运行铸造命令
PRIVATE_KEY=0x... node auto-mint.js mint

# 输出示例（处理到第10个钱包时中断）
🎯 [10/23] 钱包 13
✅ 铸造成功！
^C  # 用户按Ctrl+C中断

# 重新运行，自动从第11个继续
PRIVATE_KEY=0x... node auto-mint.js mint

# 输出示例
📍 发现未完成任务，从钱包 14 继续...
🎯 [11/23] 钱包 14
...
```

---

## 📊 新增输出示例

### 1. 批量检查SBT状态

```
🔍 批量检查 23 个钱包的SBT状态...
  ✅ 已拥有SBT: 3 个
  ⏳ 未拥有SBT: 20 个
```

### 2. 余额预检查

```
💰 RBTC余额: 0.00000066 RBTC
⚠️  余额不足！需要至少 0.00000500 RBTC，当前仅 0.00000066 RBTC
💡 跳过此钱包，继续下一个...
```

### 3. 失败重试

```
⚠️  尝试 1/3 失败: network timeout
⏳ 30秒后重试...
⚠️  尝试 2/3 失败: network timeout
⏳ 30秒后重试...
✅ 铸造成功！
```

### 4. Token ID提取

```
✅ 铸造成功！
🎫 获得 Token ID: 51
🔗 查看交易: https://rootstock.blockscout.com/tx/0x268d...
```

### 5. 成本统计报表

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 成本统计报表
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 铸造交易统计:
  🎫 成功铸造: 22 个
  ⛽ 总Gas消耗: 3622960
  💵 总Gas费用: 0.00009420 RBTC (~$6.50)
  📊 平均Gas/笔: 164680
  💰 平均成本/笔: 0.00000428 RBTC (~$0.295)

📊 分发统计:
  💸 已分发钱包: 26 个
  💵 总分发金额: 0.01300000 RBTC (~$9.00)

📊 总成本:
  💰 总花费: 0.01309420 RBTC (~$9.04)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## ⚙️ 配置调整

### 修改重试次数

编辑 `auto-mint.js`：
```javascript
MAX_RETRIES: 5,          // 改为5次重试
RETRY_DELAY_MS: 60000,   // 改为60秒间隔
```

### 修改最小余额要求

```javascript
MIN_BALANCE_REQUIRED: 0.00001,  // 改为更高的要求
```

### 修改铸造间隔

```javascript
MINT_INTERVAL_MS: 3 * 60 * 1000,  // 改为3分钟
```

---

## 🧪 测试改进功能

运行测试脚本验证新功能：
```bash
node test-improvements.js
```

预期输出：
```
✅ 批量检查: 5个钱包 725ms (平均145ms/个)
✅ 进度文件: 读写正常
✅ Token ID提取: 成功提取Token ID: 51
```

---

## 📁 生成的文件

| 文件 | 说明 | 何时生成 |
|-----|------|---------|
| `generated-wallets.json` | 钱包数据 | generate命令 |
| `mint-progress.json` | 进度记录 | mint过程中 |
| `auto-mint.js.backup` | 脚本备份 | 升级时 |

**注意**：`mint-progress.json` 在铸造完成后会自动删除

---

## ❓ 常见问题

### Q: 如何知道是否有未完成的任务？

A: 运行mint命令时会自动检测并提示：
```
📍 发现未完成任务，从钱包 15 继续...
```

### Q: 如何强制从头开始？

A: 删除进度文件：
```bash
rm -f mint-progress.json
PRIVATE_KEY=0x... node auto-mint.js mint
```

### Q: 重试3次还失败怎么办？

A: 脚本会跳过该钱包继续下一个。完成后可以：
1. 检查该钱包的余额和网络
2. 手动将该钱包的 `minted` 改为 `false`
3. 重新运行 `mint` 命令

### Q: 如何查看某个钱包的Token ID？

A: 查看 `generated-wallets.json`：
```json
{
  "address": "0xA1c6...",
  "minted": true,
  "tokenId": "51"  // 这里
}
```

---

## 🎯 性能对比

| 操作 | v1.0 | v2.0 | 提升 |
|-----|------|------|------|
| 检查26个钱包SBT状态 | 26秒 | 3.8秒 | **85%↑** |
| 失败后处理 | 跳过 | 自动重试 | **成功率↑** |
| 中断恢复 | 从头开始 | 断点续传 | **时间↓** |

---

## 📚 更多文档

- `IMPROVEMENTS.md` - 详细改进说明
- `CHANGELOG.md` - 版本更新日志
- `test-improvements.js` - 测试脚本源码

---

**版本**: v2.0
**最后更新**: 2026-03-25
