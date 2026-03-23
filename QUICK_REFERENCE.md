# Rootstock 3000 Days SBT - 快速参考

> 所有关键链接和信息的一站式查询文档

---

## 🌐 在线地址

### 生产环境
- **网站**: https://rootstockcn.com
- **状态**: ✅ 已上线，正在运行

### GitHub
- **仓库**: https://github.com/heddaaibot-ops/rootstock-3000-sbt
- **分支**: main

### Vercel
- **项目**: rootstock-3000-sbt
- **域名**: rootstockcn.com
- **Dashboard**: https://vercel.com/heddaaibot-3797s-projects/rootstock-3000-sbt

---

## 📜 智能合约

### 主网合约（当前使用）
- **地址**: `0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188`
- **网络**: Rootstock Mainnet (Chain ID: 30)
- **版本**: v3
- **部署时间**: 2026-03-22 07:25:24 UTC
- **部署区块**: #8651316
- **状态**: ✅ 已部署，已开放铸造

### Blockscout 浏览器
- **合约查看**: https://rootstock.blockscout.com/address/0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188
- **交易记录**: https://rootstock.blockscout.com/address/0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188/transactions

### 测试网合约（已弃用）
- **地址**: `0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D`
- **网络**: Rootstock Testnet (Chain ID: 31)
- **状态**: ⚠️ 已弃用，仅用于历史参考

---

## 🖼️ NFT Metadata

### 当前 Metadata（最终正确版本）
- **链上 URI**: `ipfs://QmeN9eFV9TRLTAzGAb2pzgEkjbzinh3DngFUBtngKfozPk`
- **Pinata Gateway**: https://gateway.pinata.cloud/ipfs/QmeN9eFV9TRLTAzGAb2pzgEkjbzinh3DngFUBtngKfozPk
- **IPFS Gateway**: https://ipfs.io/ipfs/QmeN9eFV9TRLTAzGAb2pzgEkjbzinh3DngFUBtngKfozPk
- **本地文件**: `/metadata.json`
- **更新时间**: 2026-03-22 15:19:55 (第4次迭代)
- **更新交易**: `0x48a2c963a736176f1a9f131e94b0b50b9ca0f22585925c4efb3ad5c4a8d3be85`

### NFT 图片
- **IPFS CID**: `Qma9saAgCkB8aZfiCBGuXV4Pth7gCJ88qwWVNyhy3oZ73t`
- **完整 URI**: `ipfs://Qma9saAgCkB8aZfiCBGuXV4Pth7gCJ88qwWVNyhy3oZ73t`
- **Pinata Gateway**: https://gateway.pinata.cloud/ipfs/Qma9saAgCkB8aZfiCBGuXV4Pth7gCJ88qwWVNyhy3oZ73t
- **文件大小**: 917 KB (2700 x 2700 PNG)
- **本地存储**: `image-cid.txt`

### Metadata 内容
```json
{
  "name": "Rootstock 3000 Days",
  "description": "纪念 Rootstock 主网稳定运行 3000 天。运行时间最长的 Bitcoin's DeFi Layer 。这个灵魂绑定代币庆祝从 2018 年 1 月 3 日到 2026 年 3 月 22 日的旅程，见证比特币合并挖矿的安全性和比特币 DeFi 的基石。",
  "image": "ipfs://Qma9saAgCkB8aZfiCBGuXV4Pth7gCJ88qwWVNyhy3oZ73t",
  "external_url": "https://rootstockcn.com/",
  "attributes": [
    { "trait_type": "Milestone", "value": "3000 Days" },
    { "trait_type": "Launch Date", "value": "2018-01-03" },
    { "trait_type": "Milestone Date", "value": "2026-03-22" },
    { "trait_type": "Type", "value": "Soul Bound Token" },
    { "trait_type": "Network", "value": "Rootstock" },
    { "display_type": "number", "trait_type": "Total Supply", "value": 10000 }
  ]
}
```

---

## 🔑 重要账户

### 部署者 / 合约所有者
- **地址**: `0x22cd1c7b62a9CDa1fC1868aE0DeaB62f6Fd57800`
- **私钥存储**: `.env` (PRIVATE_KEY)
- **Blockscout**: https://rootstock.blockscout.com/address/0x22cd1c7b62a9CDa1fC1868aE0DeaB62f6Fd57800

---

## 📊 项目数据

### NFT 供应
- **总供应量**: 10,000 个
- **当前已铸造**: 6 个 (2026-03-23)
- **剩余可铸造**: 9,994 个
- **进度**: 0.06%

### 重要日期
- **Rootstock 主网上线**: 2018-01-03
- **3000 天里程碑**: 2026-03-22
- **合约部署**: 2026-03-22 07:25
- **开放铸造**: 2026-03-22 14:50

---

## 🛠️ 常用工具和脚本

### 部署脚本
- **快速部署**: `./deploy-quick.sh`
  - 自动检测目录
  - 自动加载 Vercel token
  - 部署到生产环境

- **通用部署**: `/Users/heddaai/clawd/piggyx/scripts/vercel-deploy.sh`
  - 支持任何 Vercel 项目
  - 详见 `/Users/heddaai/clawd/piggyx/scripts/README.md`

### 查询脚本
- **检查供应量**: `npx hardhat run scripts/check-supply.js --network rskMainnet`
- **检查余额**: `./check-balance.sh`
- **验证 metadata**: `npx hardhat run scripts/verify-metadata.js --network rskMainnet`

### 管理脚本
- **更新 metadata URI**: `npx hardhat run scripts/update-metadata-uri.js --network rskMainnet`
- **暂停铸造**: `npx hardhat run scripts/pause.js --network rskMainnet`
- **恢复铸造**: `npx hardhat run scripts/unpause-v3.js --network rskMainnet`

---

## 🔐 API Keys & Tokens

### Vercel
- **Token**: 已保存在 `.env.local`
- **存储位置**: `.env.local` (VERCEL_TOKEN)
- **状态**: ✅ 永不过期
- **用途**: 生产环境部署

### Pinata (IPFS)
- **JWT**: 存储在 `.env` (PINATA_JWT)
- **免费额度**: 1GB 存储
- **用途**: NFT metadata 和图片托管

### RPC Endpoints
- **Mainnet**: https://public-node.rsk.co
- **Testnet**: https://public-node.testnet.rsk.co

---

## 📝 文档索引

### 核心文档
- **README.md** - 项目总览（待更新）
- **MAINNET_LAUNCH_LOG.md** - 主网上线完整记录 ⭐
- **PROJECT_COMPLETE.md** - 项目完成报告
- **DEPLOYMENT.md** - 部署指南
- **QUICK_REFERENCE.md** - 本文档

### 清理记录
- **CLEANUP_SUMMARY.md** - 第一轮清理
- **FINAL_CLEANUP.md** - 第二轮深度清理

### 品牌资源
- **ROOTSTOCK_ULTRA_DETAILED_BRAND_GUIDE.md** - Figma 品牌指南（57KB）

---

## 🚀 快速操作

### 查询当前铸造数量
```bash
npx hardhat run scripts/check-supply.js --network rskMainnet
```

### 部署前端更新
```bash
./deploy-quick.sh
```

### 查看合约状态
访问: https://rootstock.blockscout.com/address/0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188

### 查看网站
访问: https://rootstockcn.com

---

## ⚠️ 重要提醒

### 合约限制
- ✅ 单一 metadata 模式：所有 token 共用一个 metadata
- ✅ 可更新 metadata URI：发现错误可以修正
- ⚠️ 合约常量无法修改：`MILESTONE_DATE` 值为 1743609600 (2026-04-04)
  - 但不影响 NFT 显示，NFT 显示的日期来自 metadata attributes

### Metadata 更新
- 更新 metadata.json 后需上传到 IPFS
- 调用合约的 `setMetadataURI()` 更新链上 URI
- NFT 平台可能有缓存（几小时到1天）
- 新铸造的 token 会立即显示最新 metadata

### 部署注意事项
- 必须在项目根目录执行部署命令
- 使用 `deploy-quick.sh` 可自动检测目录
- Vercel token 永不过期，放心使用

---

**最后更新**: 2026-03-23
**当前版本**: v3 Mainnet
**项目状态**: ✅ 生产环境稳定运行
**铸造状态**: ✅ 已开放（6/10,000）
