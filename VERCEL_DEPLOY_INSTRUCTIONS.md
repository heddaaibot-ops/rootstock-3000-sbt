# Vercel 部署說明

## ✅ 代碼已推送到 GitHub

**Repository**: https://github.com/heddaaibot-ops/rootstock-3000-sbt

---

## 🚀 在 Vercel 部署步驟

### 1. 登入 Vercel
前往：https://vercel.com/login

### 2. 導入 GitHub Repository
1. 點擊 "Add New..." → "Project"
2. 選擇 "Import Git Repository"
3. 找到並選擇 `heddaaibot-ops/rootstock-3000-sbt`
4. 點擊 "Import"

### 3. 配置項目設置

#### Framework Preset
- 自動檢測為 **Next.js**（應該已經自動選中）

#### Root Directory
- ⚠️ **重要**：設置為 `frontend`
- 點擊 "Edit" → 輸入 `frontend` → 保存

#### Build and Output Settings
- Build Command: `npm run build`（自動）
- Output Directory: `.next`（自動）
- Install Command: `npm install`（自動）

### 4. 設置環境變數

點擊 "Environment Variables"，添加以下變數：

```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D
```

```
NEXT_PUBLIC_RPC_URL=https://public-node.testnet.rsk.co
```

```
NEXT_PUBLIC_CHAIN_ID=31
```

```
NEXT_PUBLIC_NETWORK_NAME=Rootstock Testnet
```

**注意**：
- 每個變數單獨添加
- Environment 選擇 "Production, Preview, and Development"

### 5. 部署
1. 檢查所有設置
2. 點擊 "Deploy"
3. 等待部署完成（約 2-3 分鐘）

---

## 📋 部署完成後

### 檢查部署
1. 訪問你的 Vercel 域名（例如：`rootstock-3000-sbt.vercel.app`）
2. 確認頁面正常顯示
3. 檢查合約資訊是否正確

### 測試 Agent API
```bash
# 查詢狀態
curl "https://your-domain.vercel.app/api/mint?address=0x4aD829c256294b67E85EdF886Fd5393605eE4C36"
```

### 更新文檔
部署成功後，更新以下文檔中的域名：
- `frontend/AGENT_API.md`
- `DEPLOYMENT_SUMMARY.md`

---

## 🔧 常見問題

### Q: 部署失敗顯示 "No output directory"
**A**: 確認 Root Directory 設置為 `frontend`

### Q: 環境變數不生效
**A**:
1. 確認變數名稱以 `NEXT_PUBLIC_` 開頭
2. 重新部署：Settings → Redeploy

### Q: 如何重新部署？
**A**:
- Vercel 會自動部署每次 push
- 手動重新部署：Deployments → 最新部署 → "..." → "Redeploy"

---

## 📱 自定義域名（可選）

1. 前往 Settings → Domains
2. 添加自定義域名
3. 配置 DNS 記錄（按照 Vercel 指示）

---

## 🎯 下一步

部署成功後：
1. ✅ 測試前端鑄造功能
2. ✅ 測試 Agent API
3. ✅ 製作 SBT 圖片
4. ✅ 上傳 IPFS metadata
5. ✅ 更新合約 BASE_URI
6. ✅ 開放鑄造 (unpause)

---

**準備好了嗎？** 前往 https://vercel.com 開始部署！🚀
