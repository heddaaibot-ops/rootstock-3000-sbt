# 🌉 跨鏈橋集成完成

**集成時間**: 2026-03-25
**版本**: V1.0
**狀態**: ✅ 已集成到 SBT 3000

---

## ✅ 已完成的工作

### 1. 文件已複製

```
✅ src/components/BridgeModal.tsx    - 跨鏈橋彈窗組件
✅ src/components/BridgeModal.css    - 樣式文件
✅ src/hooks/useBridgeStatus.ts      - WebSocket 狀態管理 Hook
```

### 2. 主頁面已修改

**文件**: `src/app/page.tsx`

**修改內容**:
- ✅ 引入 BridgeModal 組件
- ✅ 添加 isBridgeModalOpen 狀態
- ✅ 在「獲取 rBTC」區域添加「🌉 快速跨鏈」按鈕
- ✅ 添加 BridgeModal 組件到頁面底部

### 3. WebSocket 配置

**已配置環境自動檢測**:
- 本地開發：`ws://localhost:3001`
- 生產環境：`wss://rootstockcn.com/ws`

---

## 🚀 本地測試

### 啟動開發服務器

```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend
npm run dev
```

### 測試步驟

1. **打開瀏覽器**
   - 訪問：http://localhost:3000

2. **找到跨鏈按鈕**
   - 滾動到「需要 rBTC 來支付 Gas 費？」區域
   - 看到「🌉 快速跨鏈」按鈕

3. **點擊按鈕測試**
   - 點擊「🌉 快速跨鏈」
   - 彈窗應該打開
   - 選擇鏈（Arbitrum/Base/Ethereum）
   - 測試發送 USDC 流程

---

## 🌐 生產環境部署

### 步驟 1：配置 Nginx 反向代理（WebSocket）

在你的服務器上配置 Nginx：

```nginx
# /etc/nginx/sites-available/rootstockcn.com

server {
    listen 443 ssl http2;
    server_name rootstockcn.com;

    # SSL 配置
    ssl_certificate /etc/letsencrypt/live/rootstockcn.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rootstockcn.com/privkey.pem;

    # 前端（Next.js）
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket（跨鏈橋）
    location /ws {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 超時設置
        proxy_connect_timeout 7d;
        proxy_send_timeout 7d;
        proxy_read_timeout 7d;
    }
}
```

### 步驟 2：重啟 Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 步驟 3：部署 WebSocket 服務器到生產環境

```bash
# 在你的服務器上
cd /path/to/rootstock-usdc-bridge

# 確認 PM2 服務運行
pm2 status

# 應該看到：
# bridge-websocket  ✅ online
# rootstock-bridge  ✅ online
```

### 步驟 4：部署前端到 Vercel

```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend

# 提交代碼
git add .
git commit -m "feat: 添加跨鏈橋功能"
git push origin main

# Vercel 會自動部署
```

---

## 🎯 用戶體驗流程

### 完整流程

```
1. 用戶訪問 rootstockcn.com
      ↓
2. 滾動到「需要 rBTC」區域
      ↓
3. 點擊「🌉 快速跨鏈」按鈕
      ↓
4. 彈窗打開，選擇鏈（Arbitrum/Base/Ethereum）
      ↓
5. 點擊「發送 0.5 USDC」
      ↓
6. 錢包自動切換網絡（如需要）
      ↓
7. 確認交易
      ↓
8. 顯示「⏳ 等待處理中...」（1-2分鐘）
      ↓
9. 顯示「⚡ 正在發送 rBTC...」（30-60秒）
      ↓
10. 顯示「✅ 完成」+ Rootstock 交易鏈接
      ↓
11. 用戶現在有 rBTC 可以鑄造 SBT 了！
```

---

## 📊 按鈕位置

**在主頁面上的位置**：
- 鑄造按鈕之後
- FAQ 之前
- 「需要 rBTC 來支付 Gas 費？」區域

**視覺效果**：
- 🌉 快速跨鏈（紫色漸變，左側）
- 獲取 rBTC 指南 →（紫色，右側）

---

## 🔧 故障排除

### 問題 1：彈窗無法打開

**解決方法**：
```bash
# 檢查控制台錯誤
# 打開瀏覽器開發者工具 → Console
```

### 問題 2：WebSocket 連接失敗

**本地開發**：
```bash
# 確認 WebSocket 服務器運行
pm2 status bridge-websocket

# 查看日誌
pm2 logs bridge-websocket
```

**生產環境**：
```bash
# 測試 WebSocket 連接
wscat -c wss://rootstockcn.com/ws

# 檢查 Nginx 配置
sudo nginx -t
```

### 問題 3：樣式不正確

**解決方法**：
```bash
# 清除 Next.js 緩存
cd frontend
rm -rf .next
npm run dev
```

---

## 📝 後續優化建議

### 1. 添加分析追蹤

在 BridgeModal.tsx 中添加分析事件：

```typescript
// 跟蹤按鈕點擊
onClick={() => {
  // Google Analytics 或其他分析工具
  gtag('event', 'bridge_modal_opened');
  setIsBridgeModalOpen(true);
}}

// 跟蹤交易完成
if (status === 'completed') {
  gtag('event', 'bridge_completed', {
    chain: selectedChain,
    txHash: rbtcTxHash
  });
}
```

### 2. 添加 i18n 支持

將按鈕文字移到翻譯文件：

```json
// i18n/locales/zh.json
{
  "bridge": {
    "button": "快速跨鏈",
    "hint": "使用快速跨鏈：發送 0.5 USDC，自動收到 rBTC"
  }
}
```

### 3. 添加成功後自動刷新

在交易完成後，可以自動刷新用戶的 rBTC 餘額：

```typescript
useEffect(() => {
  if (status === 'completed') {
    // 刷新錢包餘額
    refresh();
  }
}, [status]);
```

---

## ✅ 檢查清單

部署前確認：

- [x] 前端文件已複製
- [x] 主頁面已修改
- [x] WebSocket URL 已配置
- [x] ethers.js 依賴已安裝
- [x] 本地測試通過
- [ ] Nginx 配置完成
- [ ] WebSocket 服務器運行在生產環境
- [ ] 前端部署到 Vercel
- [ ] 生產環境測試通過

---

## 🎉 完成！

跨鏈橋已成功集成到 SBT 3000 項目！

**本地測試**：
```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend
npm run dev
```

訪問 http://localhost:3000，找到「🌉 快速跨鏈」按鈕即可測試！

---

**文檔版本**: v1.0
**最後更新**: 2026-03-25 18:00
