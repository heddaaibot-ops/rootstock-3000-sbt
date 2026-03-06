# Rootstock 3000 Days SBT - Frontend

這是 Rootstock 3000 天紀念 SBT 的前端應用程式。

## 技術棧

- **框架**: Next.js 14 (App Router)
- **UI**: React 18 + TypeScript
- **樣式**: Tailwind CSS
- **Web3**: Wagmi v2 + Viem + ConnectKit
- **狀態管理**: TanStack Query

## 功能

- 🔌 錢包連接（MetaMask、WalletConnect 等）
- 📊 實時鑄造進度顯示
- ⏱️ 倒數計時器
- 🎨 響應式設計
- 🌐 Rootstock 主網和測試網支持
- 🎟️ 一鍵鑄造 SBT
- 📱 移動端友好

## 安裝

```bash
npm install
```

## 配置

1. 複製環境變量範例：
```bash
cp .env.example .env
```

2. 填入配置：
```env
NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET=0x...
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x...
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

### 獲取 WalletConnect Project ID

1. 訪問 https://cloud.walletconnect.com/
2. 註冊並創建新項目
3. 複製 Project ID

## 開發

啟動開發服務器：

```bash
npm run dev
```

打開 http://localhost:3000 查看應用。

## 構建

```bash
npm run build
npm start
```

## 部署

### Vercel（推薦）

1. 將代碼推送到 GitHub
2. 在 Vercel 導入項目
3. 配置環境變量
4. 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### 其他平台

也可以部署到：
- Netlify
- AWS Amplify
- Cloudflare Pages
- 自託管（Docker + Nginx）

## 項目結構

```
frontend/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # 根布局
│   │   └── page.tsx      # 主頁面
│   ├── components/       # React 組件
│   │   ├── Countdown.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── MintButton.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Web3Provider.tsx
│   ├── hooks/           # 自定義 Hooks
│   │   └── useContract.ts
│   ├── utils/           # 工具函數
│   │   ├── contract.ts
│   │   └── helpers.ts
│   └── styles/          # 全局樣式
│       └── globals.css
├── public/              # 靜態資源
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 環境變量

| 變量名 | 描述 | 必需 |
|--------|------|------|
| `NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET` | 測試網合約地址 | 否 |
| `NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET` | 主網合約地址 | 是 |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Project ID | 是 |

## 支持的錢包

- MetaMask
- WalletConnect
- Coinbase Wallet
- Trust Wallet
- 其他 EVM 兼容錢包

## 支持的網絡

- Rootstock Mainnet (Chain ID: 30)
- Rootstock Testnet (Chain ID: 31)

## 故障排除

### 錢包連接失敗

1. 確保錢包已安裝並解鎖
2. 檢查是否在正確的網絡上
3. 清除瀏覽器緩存並重試

### 交易失敗

1. 確保有足夠的 RBTC 支付 gas
2. 檢查合約是否處於暫停狀態
3. 確認地址尚未鑄造

### 數據不更新

1. 等待 10 秒自動刷新
2. 手動刷新頁面
3. 檢查網絡連接

## 性能優化

- ✅ Server Components（預設）
- ✅ 圖片優化（Next.js Image）
- ✅ 字體優化
- ✅ 代碼分割
- ✅ 自動緩存

## 安全性

- ✅ 環境變量不暴露私鑰
- ✅ 所有交易需用戶確認
- ✅ 合約地址硬編碼
- ✅ HTTPS only（生產環境）

## License

MIT
