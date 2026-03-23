/**
 * 创建 10,000 个完全相同的 metadata 文件
 * IPFS 会自动去重，实际只存储一份
 */

const fs = require('fs');
const path = require('path');

// 通用的 metadata（所有 NFT 都一样）
const metadata = {
  "name": "Rootstock 3000 Days",
  "description": "Commemorating 3000 days of Rootstock Mainnet - the longest-running Bitcoin sidechain. This Soul Bound Token celebrates the journey from January 16, 2018 to April 4, 2026. A testament to Bitcoin's merge-mined security and the foundation of Bitcoin DeFi.",
  "image": "ipfs://Qma9saAgCkB8aZfiCBGuXV4Pth7gCJ88qwWVNyhy3oZ73t",
  "external_url": "https://rootstock.io/",
  "attributes": [
    {
      "trait_type": "Milestone",
      "value": "3000 Days"
    },
    {
      "trait_type": "Launch Date",
      "value": "2018-01-16"
    },
    {
      "trait_type": "Milestone Date",
      "value": "2026-04-04"
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
};

const targetDir = path.join(__dirname, '..', 'metadata-identical');

// 创建目标文件夹
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log('📁 创建 10,000 个完全相同的 metadata 文件...');
console.log('💡 因为内容完全一样，IPFS 会自动去重，实际只存储一份！\n');

const metadataString = JSON.stringify(metadata, null, 2);

for (let i = 0; i < 10000; i++) {
  const filePath = path.join(targetDir, `${i}.json`);
  fs.writeFileSync(filePath, metadataString);

  if ((i + 1) % 1000 === 0) {
    console.log(`✓ 已创建 ${i + 1} 个文件...`);
  }
}

console.log(`\n✅ 完成！共创建 10,000 个文件`);
console.log(`📂 文件夹：${targetDir}`);
console.log(`\n💾 文件大小：每个约 ${metadataString.length} 字节`);
console.log(`📊 理论总大小：${(metadataString.length * 10000 / 1024 / 1024).toFixed(2)} MB`);
console.log(`🎯 IPFS 实际存储：约 ${(metadataString.length / 1024).toFixed(2)} KB（去重后）`);
