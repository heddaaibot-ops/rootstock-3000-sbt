# 🚀 Rootstock 3000 Days SBT - 快速啟動指南

> 5 分鐘內完成本地開發環境設置

## 📋 前置需求

- Node.js 18+
- npm 或 yarn
- Git

## ⚡ 快速開始

### 1. 克隆項目（如果需要）

```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt
```

### 2. 安裝合約依賴

```bash
npm install
```

### 3. 編譯合約

```bash
npm run compile
```

### 4. 運行測試

```bash
npm test
```

預期輸出：
```
✔ 35 passing (399ms)
```

### 5. 設置前端

```bash
cd frontend
npm install
```

### 6. 配置環境變量

```bash
cd frontend
cp .env.example .env
```

編輯 `.env`：
```env
# 可選 - 用於測試
NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET=
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
```

### 7. 啟動前端開發服務器

```bash
npm run dev
```

訪問 http://localhost:3000

## 🎯 下一步

### 準備部署到測試網

1. **獲取測試網 RBTC**：
   - 訪問 https://faucet.rsk.co
   - 連接錢包獲取測試幣

2. **配置部署環境**：
   ```bash
   cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt
   cp .env.example .env
   ```

3. **編輯 .env**：
   ```env
   PRIVATE_KEY=your_testnet_private_key
   BASE_URI=ipfs://QmTempCID/
   ```

4. **部署到測試網**：
   ```bash
   npm run deploy:testnet
   ```

5. **更新前端配置**：
   ```bash
   cd frontend
   ```

   編輯 `.env`：
   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET=0xYourContractAddress
   ```

6. **測試完整流程**：
   - 啟動前端：`npm run dev`
   - 連接錢包到 Rootstock Testnet
   - 測試鑄造功能

## 📚 文檔參考

- **完整文檔**：[README.md](./README.md)
- **部署指南**：[DEPLOYMENT.md](./DEPLOYMENT.md)
- **項目總結**：[PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md)
- **技術總結**：[SUMMARY.md](./SUMMARY.md)

## 🐛 常見問題

### Q: 編譯失敗 "HH606: Solidity version mismatch"

**A**: 確保使用正確的 Solidity 版本（0.8.24）和 EVM 版本（Cancun）。已在 `hardhat.config.js` 中配置。

### Q: 前端無法連接錢包

**A**:
1. 確保已配置 `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
2. 從 https://cloud.walletconnect.com/ 獲取免費 Project ID
3. 清除瀏覽器緩存並重試

### Q: 測試失敗

**A**:
1. 刪除 `cache` 和 `artifacts` 目錄
2. 重新運行：`npm run compile && npm test`

### Q: 部署到測試網失敗

**A**:
1. 確認錢包有足夠的測試網 RBTC
2. 檢查 RPC 端點是否可訪問
3. 驗證私鑰格式（無 0x 前綴）

## 🛠️ 有用的命令

### 合約開發

```bash
# 編譯合約
npm run compile

# 運行測試
npm test

# 測試覆蓋率
npm run coverage

# 部署到測試網
npm run deploy:testnet

# 部署到主網
npm run deploy:mainnet

# 生成元數據
npm run generate-metadata
```

### 前端開發

```bash
cd frontend

# 開發模式
npm run dev

# 生產構建
npm run build

# 啟動生產服務器
npm start

# 代碼檢查
npm run lint
```

## 📊 項目結構速覽

```
rootstock-3000-sbt/
├── contracts/              # 智能合約
│   └── Rootstock3000SBT.sol
├── test/                   # 測試
│   └── Rootstock3000SBT.test.js
├── scripts/                # 腳本
│   ├── deploy.js
│   └── generate-metadata.js
├── frontend/               # Next.js 前端
│   ├── src/
│   │   ├── app/           # 頁面
│   │   ├── components/    # UI 組件
│   │   ├── hooks/         # Hooks
│   │   └── utils/         # 工具
│   └── package.json
├── hardhat.config.js       # Hardhat 配置
├── package.json
└── README.md
```

## 🎉 成功！

如果所有測試通過且前端可以訪問，恭喜您已成功設置開發環境！

下一步查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解完整的部署流程。

---

**需要幫助？** 查看完整文檔或聯繫開發團隊。
