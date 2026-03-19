# Rootstock 3000 Days SBT - 主網部署檢查清單

## 📅 當前狀態
- ✅ 測試網合約已部署：`0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D`
- ✅ 測試網 mint 已開啟
- ✅ 前端已上線：https://frontend-green-delta-12.vercel.app
- ✅ 中英文切換功能完成

## 🎯 主網部署前需要準備的事項

### 1. 決策性資訊
- [ ] **開放時間決定**
  - 選項 A：部署後立即開放 mint
  - 選項 B：部署後保持暫停，在特定日期開放（如 2026-04-04）
  - 選項 C：其他時間

- [ ] **NFT 視覺設計**
  - 圖片風格：統一圖片 or 動態生成
  - 圖片尺寸：建議 1000x1000px 或更高
  - 特殊元素：是否包含 Rootstock logo、3000 天字樣等

- [ ] **元數據屬性設計**
  ```json
  {
    "name": "Rootstock 3000 Days SBT #1",
    "description": "...",
    "image": "ipfs://...",
    "attributes": [
      { "trait_type": "Mint Timestamp", "value": "..." },
      { "trait_type": "Block Number", "value": "..." },
      { "trait_type": "Minted After Milestone", "value": "Yes/No" },
      // 其他想要的屬性
    ]
  }
  ```

### 2. 技術準備

- [ ] **主網部署錢包**
  - 創建新的乾淨錢包地址
  - 轉入足夠的 RBTC（建議 0.01 RBTC 用於部署和管理）
  - 將私鑰安全保存（不要用測試網的私鑰）

- [ ] **IPFS 託管方案**
  - 選項 A：[Pinata](https://pinata.cloud) - 免費 1GB，適合小項目
  - 選項 B：[NFT.Storage](https://nft.storage) - 專為 NFT 設計，免費
  - 選項 C：自己的 IPFS 節點

- [ ] **元數據生成**
  - 準備 10,000 個 JSON 文件（0.json 到 9999.json）
  - 上傳到 IPFS
  - 獲取 Base URI（如 `ipfs://Qm.../`）

### 3. 合約部署流程

```bash
# 1. 準備環境變量（主網）
PRIVATE_KEY=<主網部署錢包私鑰>
BASE_URI=<IPFS Base URI>

# 2. 部署合約
npx hardhat run scripts/deploy.js --network rskMainnet

# 3. 記錄部署地址
# Contract Address: 0x...

# 4. 驗證合約（可選）
npx hardhat verify --network rskMainnet <合約地址> <owner地址> <baseURI>

# 5. 決定是否開啟 mint
npx hardhat run scripts/unpause.js --network rskMainnet
```

### 4. 前端更新

- [ ] **更新合約配置**
  - 修改 `frontend/src/lib/contract.ts` 中的合約地址
  - 確保主網 RPC 正確配置

- [ ] **部署前端**
  - 選項 A：繼續使用 Vercel（更新現有部署）
  - 選項 B：部署到自訂域名
  - 選項 C：部署到 ENS/去中心化託管

- [ ] **測試前端連接**
  - 連接 MetaMask 主網
  - 測試 mint 功能
  - 確認元數據顯示正確

### 5. 上線檢查

- [ ] 合約 owner 權限確認
- [ ] 測試 mint 一個 token 確認流程
- [ ] 檢查 OpenSea/NFT 市場顯示（如果支援 Rootstock）
- [ ] 準備公告和社交媒體宣傳

## 📝 重要時間節點

- Rootstock 主網上線：2018-01-16
- 3000 天里程碑：**2026-04-04**
- 當前測試網部署：2025-03（估計）
- 計劃主網部署時間：待定

## 🔗 相關連結

- 測試網合約：https://explorer.testnet.rsk.co/address/0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D
- 測試網前端：https://frontend-green-delta-12.vercel.app
- Rootstock 文檔：https://dev.rootstock.io
- 合約源碼：`/contracts/Rootstock3000SBT.sol`

## 💡 建議

1. **測試網充分測試**：在主網部署前，在測試網上多測試幾次 mint 流程
2. **元數據備份**：確保 IPFS 上的元數據有多個備份
3. **漸進式開放**：可以考慮先部署合約但保持暫停，確認一切正常後再開放
4. **安全審計**：如果預算允許，可以考慮合約安全審計
5. **社群準備**：準備好社交媒體宣傳和 FAQ

## 📞 需要時聯繫

有任何問題隨時問我！我可以幫忙：
- 生成元數據 JSON 文件
- 上傳到 IPFS
- 部署主網合約
- 配置前端
- 測試整個流程
