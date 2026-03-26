/**
 * 导出所有钱包信息到 Markdown 文档
 */

const fs = require('fs');
const path = require('path');

const WALLETS_FILE = path.join(__dirname, 'generated-wallets.json');
const OUTPUT_FILE = path.join(__dirname, 'WALLETS_BACKUP.md');

// 读取钱包数据
const wallets = JSON.parse(fs.readFileSync(WALLETS_FILE, 'utf8'));

// 按铸造状态分类
const minted = wallets.filter(w => w.minted);
const notMinted = wallets.filter(w => !w.minted);

// 生成 Markdown 内容
let md = `# 🔐 Rootstock 3000 SBT 钱包备份

**⚠️ 重要安全提示**：
- 此文件包含私钥和助记词，请妥善保管
- 切勿分享给任何人
- 建议加密存储或离线保存

**生成时间**：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
**总钱包数**：${wallets.length}
**已铸造**：${minted.length}
**未铸造**：${notMinted.length}

---

## 📊 统计信息

| 类型 | 数量 | 百分比 |
|------|------|--------|
| 已铸造 SBT | ${minted.length} | ${((minted.length / wallets.length) * 100).toFixed(1)}% |
| 未铸造 | ${notMinted.length} | ${((notMinted.length / wallets.length) * 100).toFixed(1)}% |

---

## ✅ 已铸造钱包 (${minted.length} 个)

`;

// 已铸造钱包详情
minted.forEach((wallet, idx) => {
  md += `
### 钱包 #${wallet.index + 1} (Token ID: ${wallet.tokenId})

| 项目 | 信息 |
|------|------|
| **地址** | \`${wallet.address}\` |
| **私钥** | \`${wallet.privateKey}\` |
| **助记词** | \`${wallet.mnemonic}\` |
| **Token ID** | ${wallet.tokenId} |
| **铸造时间** | ${wallet.mintTime ? new Date(wallet.mintTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }) : 'N/A'} |
| **交易哈希** | [\`${wallet.mintTxHash}\`](https://rootstock.blockscout.com/tx/${wallet.mintTxHash}) |
| **分发金额** | ${wallet.fundedAmount ? wallet.fundedAmount.toFixed(8) : '0'} RBTC |

---
`;
});

// 未铸造钱包
if (notMinted.length > 0) {
  md += `
## ⏳ 未铸造钱包 (${notMinted.length} 个)

这些钱包已生成但未铸造 SBT（可能因余额不足或其他原因）

`;

  notMinted.forEach((wallet) => {
    md += `
### 钱包 #${wallet.index + 1}

| 项目 | 信息 |
|------|------|
| **地址** | \`${wallet.address}\` |
| **私钥** | \`${wallet.privateKey}\` |
| **助记词** | \`${wallet.mnemonic}\` |
| **分发金额** | ${wallet.fundedAmount ? wallet.fundedAmount.toFixed(8) : '0'} RBTC |
| **状态** | 未铸造 |

---
`;
  });
}

// 添加导入导出说明
md += `
---

## 📝 使用说明

### 导入钱包到 MetaMask

1. 打开 MetaMask
2. 点击账户图标 → "导入账户"
3. 选择"私钥"方式
4. 粘贴上方钱包的私钥
5. 点击"导入"

### 使用助记词恢复

1. 打开 MetaMask
2. 设置 → 安全与隐私 → 显示私密恢复短语
3. 输入上方的 12 个助记词
4. 钱包将自动恢复

### 查看 NFT

已铸造钱包可以在以下平台查看 SBT：
- Rootstock Explorer: https://rootstock.blockscout.com/token/0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188
- OpenSea (可能需要等待索引)

---

## 🔒 安全建议

1. **加密存储**：建议使用加密软件（如 VeraCrypt）加密此文件
2. **离线备份**：将此文件备份到 U 盘或硬盘，断网保存
3. **多重备份**：至少保留 2-3 份备份在不同位置
4. **定期检查**：定期验证备份文件完整性
5. **销毁旧版**：如果创建新备份，安全销毁旧版本

---

## 📌 合约信息

- **合约地址**：\`0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188\`
- **网络**：Rootstock Mainnet (Chain ID: 30)
- **区块浏览器**：https://rootstock.blockscout.com
- **项目网站**：https://rootstockcn.com

---

**生成于**：${new Date().toISOString()}
**文件版本**：1.0
`;

// 写入文件
fs.writeFileSync(OUTPUT_FILE, md, 'utf8');

console.log('✅ 钱包备份已生成！');
console.log('📁 文件位置:', OUTPUT_FILE);
console.log('📊 总钱包数:', wallets.length);
console.log('✅ 已铸造:', minted.length);
console.log('⏳ 未铸造:', notMinted.length);
console.log('');
console.log('⚠️  请妥善保管此文件，不要泄露给任何人！');
