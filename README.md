# Rootstock 3000 Days SBT

紀念 Rootstock 主網運行 3000 天的 Soul Bound Token 項目，包含智能合約和前端應用。

## 🔗 快速链接

- **🌐 生产网站**: https://rootstockcn.com
- **📜 合约地址**: `0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188`
- **🔍 Blockscout**: https://rootstock.blockscout.com/address/0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188
- **📋 GitHub**: https://github.com/heddaaibot-ops/rootstock-3000-sbt
- **📖 快速参考**: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) ⭐ - 所有链接和信息

## 🌐 在線演示

**生产环境**: https://rootstockcn.com
**状态**: ✅ 已上线，Rootstock Mainnet
**已铸造**: 6 / 10,000

## 📅 重要日期

- **Rootstock 主網上線**：2018-01-03
- **3000 天里程碑**：2026-03-22
- **狀態**：✅ 已達成里程碑

## ✨ 合約特性

- **總量**：10,000 個
- **限制**：每個地址限鑄 1 個
- **Soul Bound**：完全不可轉移，不可銷毀
- **費用**：免費鑄造（僅支付 Gas）
- **開放性**：完全開放，先到先得
- **記錄**：鑄造時間戳、Rootstock 區塊號

## 🛠️ 技術棧

### 智能合約
- Solidity ^0.8.24
- Hardhat
- OpenZeppelin Contracts v5.0.0
- Ethers.js v6

### 前端
- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Wagmi v2 + Viem
- ConnectKit

## 📂 項目結構

```
rootstock-3000-sbt/
├── contracts/          # 智能合約
├── test/              # 合約測試
├── scripts/           # 部署腳本
├── frontend/          # Next.js 前端應用
│   ├── src/
│   │   ├── app/       # 頁面
│   │   ├── components/# UI 組件
│   │   ├── hooks/     # 自定義 Hooks
│   │   └── utils/     # 工具函數
│   └── public/        # 靜態資源
└── README.md
```

## 📦 安裝

### 合約開發

```bash
# 安裝合約依賴
npm install
```

### 前端開發

```bash
# 安裝前端依賴
cd frontend
npm install
```

## 🔧 配置

### 合約配置

1. 複製環境變量範例：
```bash
cp .env.example .env
```

2. 編輯 `.env` 並填入：
```
PRIVATE_KEY=your_private_key_here
BASE_URI=ipfs://Qm.../
```

### 前端配置

1. 進入前端目錄並複製環境變量：
```bash
cd frontend
cp .env.example .env
```

2. 填入配置：
```
NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET=0x...
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x...
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

**獲取 WalletConnect Project ID**：
- 訪問 https://cloud.walletconnect.com/
- 註冊並創建新項目
- 複製 Project ID

## 🧪 測試

運行所有測試：
```bash
npm test
```

測試覆蓋率：
```bash
npm run coverage
```

## 🚀 部署

### 合約部署

#### Testnet（測試網）

```bash
npm run deploy:testnet
```

#### Mainnet（主網）

```bash
npm run deploy:mainnet
```

### 前端部署

#### 開發模式

```bash
cd frontend
npm run dev
```

訪問 http://localhost:3000

#### 生產構建

```bash
cd frontend
npm run build
npm start
```

#### 部署到 Vercel

1. 將代碼推送到 GitHub
2. 在 Vercel 導入項目
3. 配置環境變量
4. 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 📝 驗證合約

```bash
npx hardhat verify --network rskTestnet <CONTRACT_ADDRESS> "<OWNER_ADDRESS>" "<BASE_URI>"
```

## 🔑 合約函數

### 用戶函數

- `mint()` - 鑄造 SBT（免費，每地址限 1 個）
- `tokenURI(uint256)` - 查詢 Token 元數據 URI
- `totalSupply()` - 查詢已鑄造總量
- `remainingSupply()` - 查詢剩餘可鑄造數量
- `hasUserMinted(address)` - 查詢地址是否已鑄造
- `getMintTimestamp(uint256)` - 查詢 Token 鑄造時間
- `getMintBlockNumber(uint256)` - 查詢 Token 鑄造區塊
- `getMintProgressBasisPoints()` - 查詢鑄造進度（basis points）

### 管理員函數

- `unpause()` - 開放鑄造
- `pause()` - 暫停鑄造
- `setBaseURI(string)` - 設置元數據 Base URI
- `transferOwnership(address)` - 轉移合約所有權

## 🔒 安全特性

- **ReentrancyGuard** - 防止重入攻擊
- **Pausable** - 緊急暫停機制
- **Ownable** - 權限控制
- **Soul Bound** - 通過 `_update` 覆寫實現完全不可轉移

## 📊 測試覆蓋

測試涵蓋：
- ✅ 部署與初始狀態
- ✅ 暫停/恢復功能
- ✅ 鑄造功能（正常流程、邊界情況）
- ✅ Soul Bound 特性（禁止轉移、銷毀）
- ✅ 元數據功能
- ✅ 查詢功能
- ✅ Owner 權限管理
- ✅ Gas 消耗測試

## 🌐 網絡資訊

### Rootstock Mainnet
- Chain ID: 30
- RPC: https://public-node.rsk.co
- Explorer: https://rootstock.blockscout.com

### Rootstock Testnet
- Chain ID: 31
- RPC: https://public-node.testnet.rsk.co
- Explorer: https://rootstock-testnet.blockscout.com
- Faucet: https://faucet.rsk.co

## 📄 License

MIT

## 👥 Author

Hedda

---

**重要提醒**：

1. 部署前確保已設置正確的 `BASE_URI`
2. 合約部署時處於暫停狀態，需要手動呼叫 `unpause()` 開放鑄造
3. 私鑰絕對不要提交到 Git 儲存庫
4. 主網部署前請在測試網充分測試
