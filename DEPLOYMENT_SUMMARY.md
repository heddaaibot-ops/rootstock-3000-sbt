# Rootstock 3000 Days SBT - 部署總結

**部署時間**: 2026-03-11 17:01 (UTC+8)

---

## ✅ 合約資訊

### 網絡
- **網絡**: Rootstock Testnet
- **Chain ID**: 31
- **RPC**: https://public-node.testnet.rsk.co

### 合約地址
```
0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D
```

### 區塊瀏覽器
https://rootstock-testnet.blockscout.com/address/0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D

### 部署者
```
0x4aD829c256294b67E85EdF886Fd5393605eE4C36
```

### 合約參數
- **名稱**: Rootstock 3000 Days
- **符號**: RSK3K
- **最大供應量**: 10,000
- **當前狀態**: 暫停 (需手動 unpause 開放鑄造)
- **BASE_URI**: 空字串（稍後更新）

---

## 📋 下一步操作

### 1. 驗證合約（可選）
```bash
npx hardhat verify --network rskTestnet \
  0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D \
  "0x4aD829c256294b67E85EdF886Fd5393605eE4C36" \
  ""
```

### 2. 部署前端到 Vercel

**方式 A: 使用 Vercel CLI**
```bash
cd frontend
npm install -g vercel
vercel --prod
```

**方式 B: 通過 GitHub + Vercel**
1. Push 到 GitHub
2. 在 Vercel 連接 repository
3. 設置環境變數（見下方）
4. 部署

**Vercel 環境變數**:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D
NEXT_PUBLIC_RPC_URL=https://public-node.testnet.rsk.co
NEXT_PUBLIC_CHAIN_ID=31
NEXT_PUBLIC_NETWORK_NAME=Rootstock Testnet
```

### 3. 製作 SBT 圖片和 Metadata

**需要創建**:
- 1 張 SBT 圖片（所有人同一張，靜態）
- Metadata JSON 模板

**推薦尺寸**: 1000x1000 px

**Metadata 格式** (`metadata/{tokenId}.json`):
```json
{
  "name": "Rootstock 3000 Days SBT #{{tokenId}}",
  "description": "Commemorating 3000 Days of Bitcoin-Powered Smart Contracts on Rootstock. This Soul Bound Token marks your participation in this historic milestone.",
  "image": "ipfs://{{CID}}/image.png",
  "attributes": [
    {
      "trait_type": "Milestone",
      "value": "3000 Days"
    },
    {
      "trait_type": "Launch Date",
      "value": "2018-01-16"
    },
    {
      "trait_type": "Milestone Date",
      "value": "2026-04-04"
    },
    {
      "trait_type": "Token Type",
      "value": "Soul Bound"
    },
    {
      "trait_type": "Network",
      "value": "Rootstock"
    }
  ]
}
```

### 4. 上傳到 IPFS

**選項**:
- Pinata (https://pinata.cloud)
- NFT.Storage (https://nft.storage)
- IPFS Desktop

**步驟**:
1. 上傳圖片 → 獲得 image CID
2. 生成 10,000 個 metadata JSON（使用 `scripts/generate-metadata.js`）
3. 上傳 metadata 資料夾 → 獲得 folder CID
4. BASE_URI = `ipfs://{{folder_CID}}/`

### 5. 更新合約 BASE_URI

**使用 Hardhat Console**:
```bash
npx hardhat console --network rskTestnet
```

```javascript
const contract = await ethers.getContractAt("Rootstock3000SBT", "0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D");
await contract.setBaseURI("ipfs://YOUR_FOLDER_CID/");
```

### 6. 開放鑄造

**當準備好時**:
```javascript
await contract.unpause();
```

---

## 🤖 Agent API 使用

### 端點
```
https://your-vercel-domain.vercel.app/api/mint
```

### 查詢狀態 (GET)
```bash
curl "https://your-domain.vercel.app/api/mint?address=0x..."
```

### Agent 鑄造 (POST)
```bash
curl -X POST https://your-domain.vercel.app/api/mint \
  -H "Content-Type: application/json" \
  -d '{"privateKey": "0x..."}'
```

詳細文檔: `frontend/AGENT_API.md`

---

## 📊 測試結果

- ✅ 合約測試: 35/35 通過
- ✅ Gas 消耗: ~166,602 gas/mint
- ✅ 部署成功: Rootstock Testnet
- ✅ Agent API: 已實現

---

## 🔐 安全注意事項

- ⚠️ 私鑰已存在 `.env`（不要提交到 Git）
- ⚠️ `.env` 已在 `.gitignore` 中
- ⚠️ 部署者地址擁有 owner 權限，可以：
  - 暫停/恢復鑄造
  - 更新 BASE_URI
  - 轉移 ownership

---

## 📁 重要檔案

- 合約: `contracts/Rootstock3000SBT.sol`
- 部署腳本: `scripts/deploy.js`
- 部署資訊: `deployments/rskTestnet-*.json`
- 前端: `frontend/`
- Agent API: `frontend/src/app/api/mint/route.ts`
- 文檔:
  - `README.md` - 項目總覽
  - `DEPLOYMENT.md` - 完整部署指南
  - `frontend/AGENT_API.md` - Agent API 文檔
  - `DEPLOYMENT_SUMMARY.md` - 本檔案

---

## 🎯 項目目標

✅ **純紀念性質**
- 紀念 Rootstock 主網運行 3000 天
- Soul Bound Token（不可轉移）
- 免費鑄造（僅 Gas）
- 支援 Human + Agent 領取

---

## 🚀 快速啟動

### 本地測試前端
```bash
cd frontend
npm install
npm run dev
# 訪問 http://localhost:3000
```

### 與合約互動
```bash
npx hardhat console --network rskTestnet
```

```javascript
const contract = await ethers.getContractAt("Rootstock3000SBT", "0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D");

// 查詢狀態
await contract.totalSupply();
await contract.remainingSupply();
await contract.paused();

// 管理功能（owner only）
await contract.unpause();
await contract.setBaseURI("ipfs://...");
```

---

**部署者**: Piggyx for Hedda 姐姐 🩵
**日期**: 2026-03-11
