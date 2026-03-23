# 使用 IPFS Desktop 上传 Metadata

## 方案 F：本地 IPFS 节点（完全免费，无限制）

### 优点
- ✅ 完全免费，无任何限制
- ✅ 完全去中心化，你控制数据
- ✅ 无需注册任何服务
- ✅ 上传后可以选择性迁移到其他服务

### 步骤

#### 1. 安装 IPFS Desktop
```bash
# macOS
brew install --cask ipfs

# 或访问下载页面
# https://docs.ipfs.tech/install/ipfs-desktop/
```

#### 2. 启动 IPFS Desktop
- 打开 IPFS Desktop 应用
- 等待节点启动（绿色圆点）

#### 3. 添加文件夹
方法 A：使用 GUI
- 点击 "Files" 标签
- 点击 "Import" → "Folder"
- 选择 `/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/metadata-identical`
- 等待上传完成
- 复制 CID

方法 B：使用 CLI
```bash
# 添加文件夹
ipfs add -r metadata-identical/

# 会输出：
# added QmXXX... metadata-identical
# 复制最后一行的 CID
```

#### 4. Pin 文件（确保不被删除）
```bash
ipfs pin add QmXXX...
```

#### 5. 验证上传
访问：`https://ipfs.io/ipfs/QmXXX.../0.json`

#### 6. （可选）迁移到 Pinata/NFT.Storage
上传完成后，你可以：
1. 使用 CID 在其他服务 pin 这个文件夹
2. 这样即使你的电脑离线，文件仍然可访问

### 注意事项
- ⚠️ 如果你的电脑离线，文件可能无法访问
- ✅ 解决方案：使用其他服务 pin 这个 CID（remote pinning）

### Remote Pinning（推荐）
上传后，可以让 Pinata/NFT.Storage pin 你的 CID：

```bash
# 使用 Pinata Pin by CID
curl -X POST "https://api.pinata.cloud/pinning/pinByHash" \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "hashToPin": "QmXXX...",
    "pinataMetadata": {
      "name": "Rootstock 3000 Days Metadata"
    }
  }'
```

这样文件就在两个地方 pin 了！
