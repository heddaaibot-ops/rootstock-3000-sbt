const fs = require('fs');
const path = require('path');

const WALLETS_FILE = path.join(__dirname, 'generated-wallets.json');
const OUTPUT_FILE = path.join(__dirname, 'FIRST_26_WALLETS_BACKUP.md');

console.log('📝 正在生成最初 26 个钱包的完整备份...\n');

// 读取钱包数据
const wallets = JSON.parse(fs.readFileSync(WALLETS_FILE, 'utf8'));

// 筛选前 26 个钱包
const first26 = wallets.filter(w => w.index < 26);

// 按铸造状态分类
const minted = first26.filter(w => w.minted);
const notMinted = first26.filter(w => !w.minted);

console.log(`✅ 前 26 个钱包统计：`);
console.log(`   • 已铸造：${minted.length} 个`);
console.log(`   • 未铸造：${notMinted.length} 个`);
console.log(`   • 总计：${first26.length} 个\n`);

// 生成 Markdown 文档
let markdown = `# 🔐 最初 26 个钱包完整备份

**⚠️ 极度重要安全提示**：
- 此文件包含最初配置的 26 个钱包的所有私钥和助记词
- 这是第一个脚本（auto-mint.js）配置的 WALLETS_TO_FUND: 26
- 切勿分享、上传或泄露给任何人
- 建议立即加密存储或离线保存
- 遗失此文件将永久失去钱包访问权限

**生成时间**：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })} (GMT+8)
**文件版本**：First26 v1.0
**脚本配置**：auto-mint.js - WALLETS_TO_FUND: 26

---

## 📊 统计信息

| 项目 | 数量 | 百分比 |
|------|------|--------|
| **总钱包数** | 26 | 100% |
| **已铸造** | ${minted.length} | ${((minted.length / 26) * 100).toFixed(1)}% |
| **未铸造** | ${notMinted.length} | ${((notMinted.length / 26) * 100).toFixed(1)}% |

### 铸造详情
- **成功铸造**：${minted.length} 个（其中部分在第一批，部分在重试批次）
- **未铸造原因**：余额不足（< 0.00000450 RBTC）
- **所有钱包均已分发资金**：是 ✅

---

## ✅ 已成功铸造的钱包 (${minted.length}/${26})

`;

// 添加已铸造的钱包详情
minted.forEach((wallet, idx) => {
  markdown += `
### 钱包 #${wallet.index + 1} (Index: ${wallet.index})

- **地址**：\`${wallet.address}\`
- **私钥**：\`${wallet.privateKey}\`
- **助记词**：\`${wallet.mnemonic}\`
- **分发金额**：${wallet.fundedAmount.toFixed(15)} RBTC
- **Token ID**：${wallet.tokenId || 'Unknown'}
- **铸造时间**：${wallet.mintTime ? new Date(wallet.mintTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }) : 'N/A'}
- **交易哈希**：${wallet.mintTxHash ? `[${wallet.mintTxHash.slice(0, 10)}...](https://rootstock.blockscout.com/tx/${wallet.mintTxHash})` : 'N/A'}
- **状态**：✅ 已铸造

---
`;
});

markdown += `
## ⚠️ 未铸造的钱包 (${notMinted.length}/${26})

**原因**：余额不足以支付 Gas 费用（需要至少 0.00000450 RBTC）

`;

// 添加未铸造的钱包详情
notMinted.forEach((wallet, idx) => {
  markdown += `
### 钱包 #${wallet.index + 1} (Index: ${wallet.index})

- **地址**：\`${wallet.address}\`
- **私钥**：\`${wallet.privateKey}\`
- **助记词**：\`${wallet.mnemonic}\`
- **分发金额**：${wallet.fundedAmount ? wallet.fundedAmount.toFixed(15) : '0'} RBTC
- **当前余额**：可能不足 0.00000450 RBTC
- **状态**：⚠️ 未铸造（余额不足）

---
`;
});

markdown += `
## 🔒 安全建议

### 1. 立即加密存储

**推荐工具**：
- VeraCrypt（开源加密容器）
- 7-Zip（AES-256 加密压缩）
- GPG（PGP 加密）

**示例命令**（7-Zip）：
\`\`\`bash
7z a -p -mhe=on wallets_encrypted.7z FIRST_26_WALLETS_BACKUP.md
\`\`\`

### 2. 多地备份

- 💾 本地加密硬盘
- 💿 离线 USB 存储
- 📄 纸质备份（手写私钥，防火防水保险箱）

### 3. 删除在线副本

- ❌ 从 Telegram 删除消息
- ❌ 从云端删除（Google Drive、iCloud、Dropbox等）
- ❌ 从未加密的本地磁盘删除

### 4. 访问控制

- 🔐 使用强密码加密
- 👤 仅自己知道密码
- ⏰ 定期检查备份完整性

---

## 📝 如何使用这些钱包

### 导入到 MetaMask

1. 打开 MetaMask
2. 点击右上角账户图标 → "导入账户"
3. 选择 "私钥" 或 "助记词"
4. 粘贴对应的私钥或助记词
5. 切换网络到 Rootstock Mainnet

### Rootstock 网络配置

- **网络名称**：Rootstock Mainnet
- **RPC URL**：https://public-node.rsk.co
- **Chain ID**：30
- **货币符号**：RBTC
- **区块浏览器**：https://rootstock.blockscout.com

---

## 📌 重要信息

- **合约地址**：\`0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188\`
- **合约名称**：Rootstock 3000 Days SBT
- **Token 标准**：ERC-721（Soul Bound Token，不可转移）
- **最大供应量**：10,000（前端显示 3,000）

---

## 🔗 相关链接

- **区块浏览器**：https://rootstock.blockscout.com
- **合约地址**：https://rootstock.blockscout.com/token/0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188
- **RPC 节点**：https://public-node.rsk.co
- **官方网站**：https://rootstock.io

---

## 📞 技术说明

### 脚本配置（auto-mint.js）

\`\`\`javascript
const CONFIG = {
  TOTAL_WALLETS: 30,        // 最初生成了 30 个
  WALLETS_TO_FUND: 26,      // 实际分发给前 26 个
  MIN_AMOUNT_USD: 0.335,    // 每个钱包最小金额
  MAX_AMOUNT_USD: 0.35,     // 每个钱包最大金额
  RBTC_PRICE_USD: 69000,    // RBTC 价格（2026-03）
};
\`\`\`

### 分发时间

- 最初分发日期：2026-03-25
- 分发数量：26 个钱包
- 分发金额范围：0.000004869 - 0.000005057 RBTC（约 $0.335-$0.35）

### 铸造情况

- **第一批铸造**：部分成功（2026-03-25）
- **重试批次**：部分成功（2026-03-26）
- **未铸造**：${notMinted.length} 个（余额不足）

---

**⚠️ 请妥善保管此文档！遗失将无法找回钱包！**

**文档结束** 🔐
`;

// 写入文件
fs.writeFileSync(OUTPUT_FILE, markdown, 'utf8');

console.log(`✅ 备份文档已生成：${OUTPUT_FILE}`);
console.log(`📊 文件大小：${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2)} KB\n`);

console.log('🎉 完成！\n');
console.log('⚠️  安全提示：');
console.log('   1. 立即加密此文件');
console.log('   2. 多地备份（本地 + 离线 USB）');
console.log('   3. 切勿上传到云端或 Git');
console.log('   4. 从 Telegram 删除消息\n');

