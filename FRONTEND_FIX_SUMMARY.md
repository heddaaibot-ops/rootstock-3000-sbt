# Rootstock 3000 Days SBT - 前端修復總結

**日期**: 2026-03-12
**狀態**: ✅ 已完成並部署

---

## 🎯 修復成果

**前端現已完全正常運行！**

- ✅ Mint 按鈕正常顯示
- ✅ 進度條正常顯示
- ✅ 統計數據正常顯示
- ✅ 手機版排版正確
- ✅ 錯誤處理完善

**生產環境**: https://frontend-green-delta-12.vercel.app

---

## 🐛 遇到的問題與解決方案

### 問題 1: Viem ABI 格式錯誤

**錯誤訊息**: `e is not an Object. (evaluating '"name"in e')`

**根本原因**:
- 使用了 Human-readable ABI 格式（string array）
- Viem 在運行時需要遍歷 ABI 對象的 `name` 屬性
- String array 沒有這些屬性，導致類型檢查失敗

**解決方案**:
```typescript
// ❌ 錯誤（Human-readable format）
const ABI = [
  'function totalSupply() view returns (uint256)',
  'function MAX_SUPPLY() view returns (uint256)',
] as const;

// ✅ 正確（Standard JSON ABI）
const ABI = [
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_SUPPLY',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
```

**相關檔案**:
- `src/utils/contract.ts` - 完整改寫為 JSON ABI 格式

---

### 問題 2: 合約地址驗證失敗

**錯誤訊息**: `Address "0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D" is invalid. - Address must be a hex value of 20 bytes (40 hex characters). - Address must match its checksum counterpart.`

**根本原因**:
- Vercel 環境變數未配置
- `process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET` 返回空字串
- Viem 要求地址符合 EIP-55 checksum 格式

**解決方案**:
```typescript
// ❌ 錯誤（依賴環境變數）
export const CONTRACT_ADDRESS = {
  testnet: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET || '',
  mainnet: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET || '',
} as const;

// ✅ 正確（硬編碼地址）
export const CONTRACT_ADDRESS = {
  testnet: '0x3fcD4cf80017bb7d90d9E67cd1E2fe539D985d8D' as `0x${string}`,
  mainnet: '' as `0x${string}`,
} as const;
```

**相關檔案**:
- `src/utils/contract.ts` - 硬編碼合約地址

---

### 問題 3: Mint 按鈕不顯示

**現象**: 用戶看不到 Mint 按鈕

**根本原因**:
- MintButton 組件根據不同狀態 `return` 不同內容
- 在未連接錢包或 paused 狀態下，只返回提示文字，沒有按鈕
- 如果 `contractData` 為 null，按鈕完全不渲染

**解決方案**:
```typescript
// ❌ 錯誤（早期返回，沒有按鈕）
if (!isConnected) {
  return <div>Connect your wallet to mint</div>;
}
if (isPaused) {
  return <div>Minting Paused</div>;
}

// ✅ 正確（始終顯示按鈕）
const isDisabled = !isConnected || isPaused || hasUserMinted || minting;
let buttonText = isConnected ? 'Mint Your SBT' : 'Connect Wallet First';
let statusIcon = isConnected ? '🎟️' : '🔌';

return (
  <button disabled={isDisabled}>
    {statusIcon} {buttonText}
  </button>
);
```

**相關檔案**:
- `src/components/MintButton.tsx` - 重構按鈕邏輯
- `src/app/page.tsx` - 使用 optional chaining (`contractData?.isPaused`)

---

### 問題 4: 手機版排版重疊

**現象**: 進度百分比 "0.000%" 遮住了 "Total Supply" 文字

**根本原因**:
- 百分比標籤使用 `absolute -top-8` 定位在進度條上方
- 手機版螢幕寬度有限，標籤會與統計數字重疊

**解決方案**:
```tsx
// ❌ 錯誤（absolute 定位，可能重疊）
<div className="relative">
  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
    <div className="bg-rsk-dark border border-rsk-orange px-4 py-2 rounded-lg">
      <span className="text-2xl font-bold text-rsk-orange font-mono">
        {formatPercentage(percentage, 3)}
      </span>
    </div>
  </div>
  {/* 進度條 */}
</div>

// ✅ 正確（獨立一行，清晰可讀）
{/* 統計數字 */}
<div className="grid grid-cols-3 gap-4 mb-4">...</div>

{/* 百分比標籤 */}
<div className="text-center mb-6">
  <div className="inline-block bg-rsk-dark border border-rsk-orange px-6 py-3 rounded-lg">
    <span className="text-2xl font-bold text-rsk-orange font-mono">
      {formatPercentage(percentage, 3)}
    </span>
  </div>
</div>

{/* 進度條 */}
<div className="relative">...</div>
```

**相關檔案**:
- `src/components/ProgressBar.tsx` - 調整排版結構

---

### 問題 5: Chain 定義不完整

**根本原因**:
- `defineChain` 缺少 `network` 字段
- Viem 某些功能需要此字段來識別 chain

**解決方案**:
```typescript
// ✅ 完整的 chain 定義
export const ROOTSTOCK_CHAINS = {
  testnet: defineChain({
    id: 31,
    name: 'Rootstock Testnet',
    network: 'rootstock-testnet', // ← 補全此字段
    nativeCurrency: {
      name: 'Test RBTC',
      symbol: 'tRBTC',
      decimals: 18,
    },
    rpcUrls: {
      default: { http: ['https://public-node.testnet.rsk.co'] },
      public: { http: ['https://public-node.testnet.rsk.co'] }, // ← 補全 fallback
    },
    blockExplorers: {
      default: {
        name: 'RSK Testnet Explorer',
        url: 'https://rootstock-testnet.blockscout.com',
      },
    },
    testnet: true,
  }),
};
```

**相關檔案**:
- `src/utils/contract.ts` - 補全 chain 定義

---

## 📊 修復統計

- **總部署次數**: 12 次
- **修復時間**: ~2 小時
- **Git commits**: 12 個
- **修改檔案**: 4 個主要檔案
  - `src/utils/contract.ts` - ABI 和 Chain 定義
  - `src/components/MintButton.tsx` - 按鈕邏輯
  - `src/app/page.tsx` - 頁面邏輯
  - `src/components/ProgressBar.tsx` - 進度條排版

---

## 🎨 最終 UI 結構

```
┌─────────────────────────────────────┐
│     Rootstock 3000 [Connect Wallet] │
├─────────────────────────────────────┤
│                                      │
│         Mint Progress                │
│                                      │
│   0        10,000      10,000        │
│ Minted   Total Supply  Remaining     │
│                                      │
│          [ 0.000% ]                  │
│                                      │
│  ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░       │
│  0    25K    50K    75K    100K     │
│                                      │
│  ┌─────────────────────────────┐   │
│  │   ⏸️ Minting Paused          │   │
│  └─────────────────────────────┘   │
│   Minting will open soon...         │
│                                      │
│  Jan 16, 2018 | Apr 4, 2026 | ...  │
│                                      │
└─────────────────────────────────────┘
```

---

## ✅ 檢查清單

- [x] Viem ABI 格式錯誤已修復
- [x] 合約地址硬編碼
- [x] Chain 定義完整
- [x] Mint 按鈕始終顯示
- [x] 手機版排版正確
- [x] 錯誤處理完善
- [x] 重試功能正常
- [x] Stats Grid 始終顯示
- [x] Countdown 始終顯示
- [x] 代碼已推送到 GitHub
- [x] 已部署到 Vercel 生產環境

---

## 🚀 下一步

1. **測試鑄造流程**（需要 unpause 合約）
2. **準備 IPFS 元數據**
3. **主網部署**（2026-04-04 前）

---

## 📝 技術亮點

### 1. 標準 JSON ABI 格式
使用完整的 JSON 對象格式，確保與 Viem 完全兼容。

### 2. 優雅的降級處理
即使 RPC 連接失敗，UI 仍然完整顯示，用戶體驗良好。

### 3. 響應式排版
手機版和桌面版都有良好的視覺效果。

### 4. 狀態管理清晰
按鈕狀態、錯誤處理、加載狀態都有明確的 UI 反饋。

---

**Generated by Piggyx 🐷**
**2026-03-12 13:13**
