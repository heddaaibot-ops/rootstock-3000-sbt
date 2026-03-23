# Rootstock 3000 Days SBT - 主網上線記錄

## 📅 主網上線 - 2026-03-22

### 🎯 部署信息

**合約地址**: `0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188`
**網絡**: Rootstock Mainnet (Chain ID: 30)
**生產網站**: https://rootstockcn.com
**部署區塊**: #8651316
**部署時間**: 2026-03-22 07:25:24 UTC

### 🔓 鑄造開放

**狀態**: ✅ 已開放
**Unpause 交易**: `0xc6135d0b620328486422610f7f088a5ff20010afc688ba19ee0fb54101dca379`
**Unpause 區塊**: #8652373
**Gas 使用**: 28,151

### 📊 鑄造進度

截至最後更新：**4 個已鑄造** / 10,000 總供應量

## 🔄 NFT Metadata 更新歷程

### 問題發現

用戶鑄造後發現 NFT metadata 存在以下問題：
1. 描述為英文，需要改為中文
2. 描述內容不完整（"比特币侧链" 應為 "Bitcoin's DeFi Layer"）
3. Attributes 日期錯誤：
   - Launch Date: `2018-01-16` → 應為 `2018-01-03`
   - Milestone Date: `2026-04-04` → 應為 `2026-03-22`

### 迭代歷史

#### 版本 1: 初始英文版本
- **CID**: `QmNuMAshJZy8dWZYgrVE3uB4kQ9xDcGBsePBzatZoKR4ej`
- **問題**: 描述為英文
- **時間**: 部署時

#### 版本 2: 第一次中文翻譯
- **CID**: `QmZzUywzyMioGnVqFL4FbBWytWDuCvNkeQq5TrTFtev4WE`
- **更新交易**: `0x2d6a76e970da3f977bae0c84b4775edabf6e4c6a552efc4dd80f28d39d79f5f8`
- **區塊**: #8652434
- **描述**: `纪念 Rootstock 主网稳定运行 3000 天 —— 运行时间最长的比特币侧链。这个灵魂绑定代币庆祝从 2018 年 1 月 16 日到 2026 年 4 月 4 日的旅程...`
- **問題**:
  - "比特币侧链" 應為 "Bitcoin's DeFi Layer"
  - 日期仍然錯誤

#### 版本 3: 修正描述用詞
- **CID**: `QmZD7kf42qWHKXH9FqS3nd4aM4Dgx2Tmjn55gbhBLGwE5L`
- **更新交易**: `0x12ed3ea7c39ce1273942e8e1136a715ad5963db643b775e9e32ba7eeb1179588`
- **區塊**: #8652477
- **描述**: `纪念 Rootstock 主网稳定运行 3000 天。运行时间最长的 Bitcoin's DeFi Layer 。这个灵魂绑定代币庆祝从 2018 年 1 月 3 日到 2026 年 3 月 22 日的旅程...`
- **問題**: Attributes 日期仍然錯誤

#### 版本 4: 最終正確版本 ✅
- **CID**: `QmeN9eFV9TRLTAzGAb2pzgEkjbzinh3DngFUBtngKfozPk`
- **更新交易**: `0x48a2c963a736176f1a9f131e94b0b50b9ca0f22585925c4efb3ad5c4a8d3be85`
- **區塊**: #8652486
- **Gas 使用**: 41,237
- **時間**: 2026-03-22 15:19:55 UTC
- **狀態**: ✅ 完全正確

### 最終 Metadata 內容

```json
{
  "name": "Rootstock 3000 Days",
  "description": "纪念 Rootstock 主网稳定运行 3000 天。运行时间最长的 Bitcoin's DeFi Layer 。这个灵魂绑定代币庆祝从 2018 年 1 月 3 日到 2026 年 3 月 22 日的旅程，见证比特币合并挖矿的安全性和比特币 DeFi 的基石。",
  "image": "ipfs://Qma9saAgCkB8aZfiCBGuXV4Pth7gCJ88qwWVNyhy3oZ73t",
  "external_url": "https://rootstockcn.com/",
  "attributes": [
    {
      "trait_type": "Milestone",
      "value": "3000 Days"
    },
    {
      "trait_type": "Launch Date",
      "value": "2018-01-03"
    },
    {
      "trait_type": "Milestone Date",
      "value": "2026-03-22"
    },
    {
      "trait_type": "Type",
      "value": "Soul Bound Token"
    },
    {
      "trait_type": "Network",
      "value": "Rootstock"
    },
    {
      "display_type": "number",
      "trait_type": "Total Supply",
      "value": 10000
    }
  ]
}
```

### 圖片驗證

- **Image CID**: `ipfs://Qma9saAgCkB8aZfiCBGuXV4Pth7gCJ88qwWVNyhy3oZ73t`
- **文件大小**: 938,580 bytes (917 KB)
- **尺寸**: 2700 x 2700 PNG
- **SHA1**: `f187509f0ad0941420a474e2cc05e6ac5a238b88`
- **狀態**: ✅ 完整圖片（包含 Rootstock logo、"爱你 ♥ 3000"、橙色底部、背景圖案）
- **驗證**: 與本地 `/frontend/public/images/sbt-preview.png` 完全一致

## 🌐 前端更新

### SEO Metadata 更新

**檔案**: `/frontend/src/app/layout.tsx`

**更新內容**:
- ✅ Description 改為與 NFT metadata 一致
- ✅ OpenGraph description 更新
- ✅ Twitter Card description 更新
- ✅ Keywords 新增 "Bitcoin DeFi"

**更新前**:
```typescript
description: '领取纪念 Rootstock 3000 天的灵魂绑定代币 - 由比特币驱动的最安全智能合约平台。'
```

**更新後**:
```typescript
description: '纪念 Rootstock 主网稳定运行 3000 天。运行时间最长的 Bitcoin\'s DeFi Layer 。这个灵魂绑定代币庆祝从 2018 年 1 月 3 日到 2026 年 3 月 22 日的旅程，见证比特币合并挖矿的安全性和比特币 DeFi 的基石。'
```

### Web3Provider 更新

**檔案**: `/frontend/src/components/Web3Provider.tsx`

**更新內容**:
```typescript
appDescription: '纪念 Rootstock 主网稳定运行 3000 天'
appUrl: 'https://rootstockcn.com'
appIcon: 'https://rootstockcn.com/favicon.ico'
```

### 部署記錄

**平台**: Vercel
**域名**: https://rootstockcn.com
**部署時間**: 2026-03-22 (多次)
**狀態**: ✅ 生產環境運行中

## 🔧 使用的腳本

### 1. unpause-v3.js
開啟合約鑄造功能
```bash
npx hardhat run scripts/unpause-v3.js --network rskMainnet
```

### 2. update-metadata-uri.js
更新合約 metadata URI
```bash
npx hardhat run scripts/update-metadata-uri.js --network rskMainnet
```

### 3. verify-metadata.js
驗證合約 metadata 配置
```bash
npx hardhat run scripts/verify-metadata.js --network rskMainnet
```

### 4. check-supply.js
查詢當前鑄造數量
```bash
npx hardhat run scripts/check-supply.js --network rskMainnet
```

## 📝 重要教訓

### 1. Metadata 規劃
- ⚠️ **描述文字要仔細校對**：經過 4 次迭代才完全正確
- ⚠️ **Attributes 日期也要檢查**：不只是描述，Attributes 也會顯示給用戶
- ✅ **先在本地完全確認**後再上傳 IPFS
- ✅ **所有相關數據保持一致**：合約 comments、前端文案、NFT metadata

### 2. 圖片檢查
- ✅ **圖片正確但平台可能有緩存**
- ✅ **下載並驗證 IPFS 圖片**與本地文件一致（用 SHA1）
- ✅ **多個 IPFS Gateway 測試**：Pinata、IPFS.io 等

### 3. 平台緩存問題
- ⚠️ NFT 平台會緩存 metadata（幾小時到1天）
- ✅ 提供 "Refresh Metadata" 按鈕給用戶
- ✅ 新鑄造的 NFT 會立即顯示正確內容
- ✅ 已鑄造的需要平台刷新或等待自動更新

### 4. 合約設計優勢
- ✅ **單一 metadata 模式**讓所有 token 共用同一個 URI
- ✅ **可更新 metadata URI**：發現錯誤可以修正
- ✅ **所有 token 自動同步**：更新一次，全部生效

### 5. 部署流程改進
- ⚠️ **永遠在正確目錄執行 vercel 命令**（見下方部署錯誤說明）
- ✅ **使用完整路徑**：`cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt && vercel ...`
- ✅ **驗證部署目標**：確認是 rootstock-3000-sbt 項目
- ✅ **使用正確 token**：Vercel production token

## ⚠️ 部署常見錯誤

### 問題：為什麼會部署到錯誤的網站（frontend 去）？

**根本原因**：
1. **當前目錄錯誤**
   - 如果在 `/Users/heddaai/clawd/piggyx/frontend/` 執行 `vercel`
   - 會部署 piggyx/frontend 這個項目，而不是 rootstock-3000-sbt

2. **沒有使用完整路徑**
   - ❌ 錯誤做法：直接執行 `vercel --prod`
   - ✅ 正確做法：`cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt && vercel --prod`

3. **Vercel 自動檢測項目**
   - Vercel 會根據當前目錄的 `vercel.json`、`package.json` 判斷項目
   - 如果在錯誤目錄，會部署錯誤的項目

**解決方案**：
```bash
# ✅ 正確的部署命令（完整版）
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt && \
vercel --prod \
  --yes \
  --archive=tgz

# ✅ 部署前驗證
pwd  # 確認當前目錄
ls -la vercel.json  # 確認 vercel.json 存在
```

**檢查清單**：
- [ ] 確認當前目錄：`pwd` 應顯示 `/Users/heddaai/clawd/piggyx/rootstock-3000-sbt`
- [ ] 確認有 `vercel.json` 文件
- [ ] 確認 `package.json` 中的 name 是 `rootstock-3000-frontend`
- [ ] 部署後檢查 Vercel 輸出的項目名稱

## 📊 統計數據

### Gas 消耗
- Unpause 操作: 28,151 gas
- Update Metadata URI: 41,237 gas
- 總 Gas 消耗（4次更新）: ~165,000 gas

### 交易記錄
- 部署合約: 1 筆
- Unpause: 1 筆
- Update Metadata URI: 4 筆
- 總計: 6 筆鏈上交易

### 時間軸
- 07:25 - 部署合約
- 14:50 - 開啟鑄造（unpause）
- 14:57 - 第一次 metadata 更新（中文版）
- 15:16 - 第二次 metadata 更新（修正用詞）
- 15:19 - 第三次 metadata 更新（最終版本）✅
- 15:22 - 前端 SEO 更新並部署

## ✅ 項目狀態

**合約**: ✅ 已部署並運行中
**鑄造**: ✅ 已開放
**Metadata**: ✅ 完全正確
**前端**: ✅ 生產環境運行
**文檔**: ✅ 完整記錄

**下一步**：
- 社群推廣
- 監控鑄造進度
- 收集用戶反饋
- 準備活動獎勵分配

---

**更新時間**: 2026-03-22
**維護者**: Piggyx AI Assistant
**項目狀態**: ✅ 正式上線運行
