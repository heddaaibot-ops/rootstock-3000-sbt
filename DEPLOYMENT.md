# Rootstock 3000 Days SBT - 完整部署指南

本指南將引導您完成從合約部署到前端上線的完整流程。

## 📋 前置準備

### 1. 獲取測試網 RBTC

訪問 Rootstock Testnet Faucet：
```
https://faucet.rsk.co
```

1. 連接您的錢包
2. 完成驗證（可能需要 Twitter 或其他社交媒體）
3. 獲取測試 RBTC（通常 0.05 RBTC）

### 2. 準備部署錢包

**重要**：使用專用的部署錢包，不要使用個人主錢包。

```bash
# 生成新的私鑰（可選）
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. 準備 IPFS 元數據

#### 選項 A：使用 Pinata

1. 註冊 https://pinata.cloud
2. 創建免費賬戶（提供 1GB 免費存儲）
3. 上傳 SBT 圖片
4. 生成 10,000 個 JSON 文件（見下方腳本）
5. 上傳 JSON 文件夾
6. 獲取 IPFS CID

#### 選項 B：使用 NFT.Storage

1. 註冊 https://nft.storage
2. 完全免費
3. 上傳文件
4. 獲取 IPFS CID

### 4. 生成元數據 JSON

創建腳本 `scripts/generate-metadata.js`：

```javascript
const fs = require('fs');
const path = require('path');

const TOTAL_SUPPLY = 10000;
const IMAGE_CID = 'QmYourImageCID'; // 替換為您的圖片 CID
const OUTPUT_DIR = './metadata';

// 創建輸出目錄
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 生成元數據
for (let i = 0; i < TOTAL_SUPPLY; i++) {
  const metadata = {
    name: `Rootstock 3000 Days #${i}`,
    description: 'Commemorating 3000 days of Rootstock - A Soul Bound Token marking this historic milestone in Bitcoin-powered smart contracts.',
    image: `ipfs://${IMAGE_CID}`,
    attributes: [
      {
        trait_type: 'Token ID',
        value: i
      },
      {
        trait_type: 'Collection',
        value: 'Rootstock 3000 Days'
      },
      {
        trait_type: 'Type',
        value: 'Soul Bound Token'
      },
      {
        trait_type: 'Milestone',
        value: '3000 Days'
      },
      {
        trait_type: 'Launch Date',
        value: '2018-01-16'
      },
      {
        trait_type: 'Milestone Date',
        value: '2026-04-04'
      }
    ]
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, `${i}.json`),
    JSON.stringify(metadata, null, 2)
  );

  if (i % 1000 === 0) {
    console.log(`Generated ${i}/${TOTAL_SUPPLY}`);
  }
}

console.log('✅ All metadata generated!');
```

運行：
```bash
node scripts/generate-metadata.js
```

---

## 🚀 第一步：部署智能合約到測試網

### 1. 配置環境變量

編輯 `.env`：
```env
PRIVATE_KEY=your_testnet_wallet_private_key
BASE_URI=ipfs://QmYourMetadataCID/
RSK_API_KEY=dummy
```

### 2. 編譯合約

```bash
npm run compile
```

確保沒有錯誤。

### 3. 部署到測試網

```bash
npm run deploy:testnet
```

**預期輸出**：
```
🚀 開始部署 Rootstock 3000 Days SBT...

📍 部署地址: 0x...
💰 帳戶餘額: 0.05 RBTC

🔗 Base URI: ipfs://Qm.../

📝 正在編譯和部署合約...
✅ 合約已部署到: 0x123abc...

🔍 驗證部署狀態...
📋 合約資訊:
  - 名稱: Rootstock 3000 Days
  - 符號: RSK3K
  - 最大供應量: 10000
  - 當前供應量: 0
  - 暫停狀態: 是 ⏸️
  - Owner: 0x...

📅 重要日期:
  - Rootstock 上線: 2018-01-16
  - 3000 天里程碑: 2026-04-04
  - 距離里程碑: 29 天

🌐 網絡資訊:
  - 網絡名稱: rskTestnet
  - Chain ID: 31
  - 區塊瀏覽器: https://rootstock-testnet.blockscout.com/address/0x123abc...

✨ 部署完成！
```

### 4. 保存合約地址

複製合約地址，稍後需要用到。

### 5. 驗證合約（可選）

```bash
npx hardhat verify --network rskTestnet <CONTRACT_ADDRESS> "<OWNER_ADDRESS>" "<BASE_URI>"
```

例如：
```bash
npx hardhat verify --network rskTestnet 0x123abc... "0xYourAddress" "ipfs://QmYourCID/"
```

### 6. 測試合約功能

使用 Hardhat console：

```bash
npx hardhat console --network rskTestnet
```

```javascript
const contract = await ethers.getContractAt("Rootstock3000SBT", "0x123abc...");

// 檢查狀態
await contract.paused(); // 應該是 true
await contract.totalSupply(); // 應該是 0

// 開放鑄造
await contract.unpause();
await contract.paused(); // 應該是 false

// 測試鑄造
await contract.mint();
await contract.totalSupply(); // 應該是 1
await contract.hasUserMinted(await ethers.provider.getSigner().getAddress()); // 應該是 true
```

---

## 🌐 第二步：部署前端到測試環境

### 1. 配置前端環境變量

進入前端目錄：
```bash
cd frontend
```

創建 `.env`：
```env
NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET=0x123abc...
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

### 2. 安裝依賴

```bash
npm install
```

### 3. 本地測試

```bash
npm run dev
```

訪問 http://localhost:3000

**測試檢查清單**：
- [ ] 頁面正常載入
- [ ] 倒數計時器顯示正確
- [ ] 錢包可以連接
- [ ] 連接後顯示正確網絡（Testnet Chain ID 31）
- [ ] 進度條顯示正確數據
- [ ] 可以成功鑄造 SBT
- [ ] 鑄造後顯示成功訊息
- [ ] 無法重複鑄造
- [ ] 交易連結可以打開區塊瀏覽器

### 4. 修復常見問題

#### 問題：無法讀取合約數據

**解決方案**：
1. 確認 `CONTRACT_ADDRESS_TESTNET` 正確
2. 確認錢包連接到 Rootstock Testnet (Chain ID 31)
3. 檢查瀏覽器控制台錯誤

#### 問題：錢包連接失敗

**解決方案**：
1. 確保 WalletConnect Project ID 正確
2. 清除瀏覽器緩存
3. 嘗試不同錢包

#### 問題：交易失敗

**解決方案**：
1. 確保有足夠 RBTC 支付 gas
2. 檢查合約是否已 unpause
3. 確認地址未鑄造過

### 5. 構建生產版本

```bash
npm run build
```

確保構建成功無錯誤。

### 6. 部署到 Vercel（測試）

1. 推送代碼到 GitHub
2. 訪問 https://vercel.com
3. 導入 GitHub 倉庫
4. 設置 Root Directory 為 `frontend`
5. 配置環境變量：
   - `NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET`
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
6. 部署

---

## 🎯 第三步：主網部署（生產環境）

### ⚠️ 部署前最終檢查

**必須完成所有測試項**：

- [ ] 測試網合約已充分測試（至少 50+ 次鑄造）
- [ ] 所有功能正常運作
- [ ] Soul Bound 特性已驗證（無法轉移）
- [ ] Pause/Unpause 功能正常
- [ ] 前端已在測試網完整測試
- [ ] 元數據 JSON 已生成並上傳到 IPFS
- [ ] IPFS 圖片可以正常訪問
- [ ] 安全審計已完成（如有預算）
- [ ] 團隊成員已 review 代碼
- [ ] 部署計劃已確認
- [ ] 應急方案已準備

### 1. 準備主網錢包

1. 使用全新的部署錢包
2. 確保有足夠 RBTC（建議 0.01 RBTC 以上）
3. 多次確認私鑰安全保存

### 2. 更新環境變量

編輯根目錄 `.env`：
```env
PRIVATE_KEY=your_mainnet_wallet_private_key
BASE_URI=ipfs://QmYourProductionMetadataCID/
```

### 3. 部署到主網

```bash
npm run deploy:mainnet
```

**再次確認**：
- 錢包地址正確
- Base URI 正確
- 網絡是 Rootstock Mainnet (Chain ID 30)

部署後**立即保存**：
- 合約地址
- 部署交易 hash
- 部署時間
- 區塊高度

### 4. 驗證主網合約

```bash
npx hardhat verify --network rskMainnet <CONTRACT_ADDRESS> "<OWNER_ADDRESS>" "<BASE_URI>"
```

### 5. 測試主網合約

**謹慎操作，這是真實的主網！**

使用小號錢包測試：
1. 連接小號錢包
2. Unpause 合約
3. 測試鑄造一個 SBT
4. 驗證功能正常

### 6. 部署生產前端

#### 更新前端環境變量

編輯 `frontend/.env`：
```env
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0xYourMainnetAddress
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

#### 部署到 Vercel（生產）

1. 更新 GitHub 代碼
2. 在 Vercel 更新環境變量
3. 觸發重新部署
4. 等待部署完成

### 7. 最終測試

訪問生產網站：

**完整測試流程**：
1. 打開網站
2. 檢查所有數據顯示正確
3. 連接錢包到主網
4. 確認網絡是 Chain ID 30
5. 嘗試鑄造（如果開放）
6. 驗證交易成功
7. 檢查區塊瀏覽器

---

## 📢 第四步：公開發布

### 1. 準備公告

撰寫公告內容，包括：
- 項目介紹
- 如何參與
- 重要日期
- 網站連結
- 合約地址
- 安全提醒

### 2. 社交媒體發布

平台建議：
- Twitter / X
- Discord
- Telegram
- Reddit (r/rootstock)
- Rootstock 官方社群

### 3. 監控和維護

**部署後監控**：
- 合約事件監聽
- 鑄造進度追蹤
- 網站訪問量
- 錯誤日誌
- 用戶反饋

**準備應急方案**：
- 如發現 bug，立即 pause 合約
- 準備備用前端部署
- 保持 owner 錢包訪問

---

## 🛠️ 維護指南

### 暫停鑄造

```bash
npx hardhat console --network rskMainnet
```

```javascript
const contract = await ethers.getContractAt("Rootstock3000SBT", "0xYourAddress");
await contract.pause();
```

### 恢復鑄造

```javascript
await contract.unpause();
```

### 更新 Base URI

```javascript
await contract.setBaseURI("ipfs://QmNewCID/");
```

### 轉移所有權

```javascript
await contract.transferOwnership("0xNewOwnerAddress");
```

---

## 📊 成本估算

### 測試網
- RBTC：免費（從 faucet 獲取）
- 部署：~0.001 RBTC
- 測試：~0.0001 RBTC per mint

### 主網
- RBTC：需要購買或橋接
- 部署：~0.001 RBTC (~$0.05)
- Unpause：~0.0001 RBTC
- 每次鑄造（用戶支付）：~0.0001 RBTC

### 其他成本
- IPFS 存儲：
  - Pinata 免費版：1GB（足夠）
  - NFT.Storage：完全免費
- Vercel：
  - Hobby 免費版（足夠）
- WalletConnect：免費
- 域名（可選）：$10-20/年

**總成本估算**：$0-50（主要是域名，可選）

---

## 🔐 安全檢查清單

部署前必須完成：

### 代碼安全
- [ ] 所有測試通過
- [ ] 代碼已 review
- [ ] 沒有 TODO 或 FIXME
- [ ] 已移除調試代碼
- [ ] OpenZeppelin 版本是最新穩定版

### 配置安全
- [ ] 私鑰未提交到 Git
- [ ] .env 在 .gitignore 中
- [ ] 生產環境變量已隔離
- [ ] Base URI 指向正確 IPFS

### 合約安全
- [ ] Owner 地址正確
- [ ] 合約部署時是 paused
- [ ] MAX_SUPPLY 正確
- [ ] 日期常量正確
- [ ] 無法繞過 Soul Bound 限制

### 運營安全
- [ ] 有應急 pause 計劃
- [ ] Owner 私鑰安全保管
- [ ] 有備份 RPC 節點
- [ ] 監控系統就位

---

## 📞 問題排查

### 合約部署失敗

**原因**：
- 餘額不足
- 網絡連接問題
- 私鑰錯誤

**解決**：
1. 檢查錢包餘額
2. 嘗試不同 RPC
3. 驗證私鑰格式（無 0x 前綴）

### 前端無法連接合約

**原因**：
- 合約地址錯誤
- 網絡不匹配
- ABI 不同步

**解決**：
1. 確認環境變量
2. 切換到正確網絡
3. 重新構建前端

### 用戶無法鑄造

**原因**：
- 合約 paused
- 已經鑄造過
- 餘額不足
- Gas limit 太低

**解決**：
1. 檢查合約狀態
2. 查詢用戶地址
3. 提供 Gas 費用資訊
4. 增加 Gas limit

---

## 🎉 成功部署後

恭喜！您已成功部署 Rootstock 3000 Days SBT 項目！

下一步：
1. 在社交媒體分享
2. 加入 Rootstock 社群
3. 持續監控和優化
4. 收集用戶反饋
5. 準備慶祝 3000 天里程碑！

---

**祝部署順利！** 🚀
