const fs = require('fs');
const path = require('path');

const IMAGE_CID = 'Qma9saAgCkB8aZfiCBGuXV4Pth7gCJ88qwWVNyhy3oZ73t';
const MAX_SUPPLY = 10000;

// NFT 元數據模板（所有 NFT 都一樣）
const metadata = {
  name: "Rootstock 3000 Days",
  description: "Commemorating 3000 days of Rootstock Mainnet - the longest-running Bitcoin sidechain. This Soul Bound Token celebrates the journey from January 16, 2018 to April 4, 2026. A testament to Bitcoin's merge-mined security and the foundation of Bitcoin DeFi.",
  image: `ipfs://${IMAGE_CID}`,
  external_url: "https://rootstock.io/",
  attributes: [
    {
      trait_type: "Milestone",
      value: "3000 Days"
    },
    {
      trait_type: "Launch Date",
      value: "2018-01-16"
    },
    {
      trait_type: "Milestone Date",
      value: "2026-04-04"
    },
    {
      trait_type: "Type",
      value: "Soul Bound Token"
    },
    {
      trait_type: "Network",
      value: "Rootstock"
    },
    {
      display_type: "number",
      trait_type: "Total Supply",
      value: MAX_SUPPLY
    }
  ]
};

async function generateMetadata() {
  console.log(`📝 開始生成 ${MAX_SUPPLY} 個元數據文件...`);

  // 創建 metadata 目錄
  const metadataDir = path.join(__dirname, 'metadata');
  if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir);
  }

  // 生成每個 token 的元數據
  for (let i = 0; i < MAX_SUPPLY; i++) {
    const tokenMetadata = {
      ...metadata,
      name: `${metadata.name} #${i}`,
      attributes: [
        ...metadata.attributes,
        {
          display_type: "number",
          trait_type: "Token ID",
          value: i
        }
      ]
    };

    const filepath = path.join(metadataDir, `${i}`);
    fs.writeFileSync(filepath, JSON.stringify(tokenMetadata, null, 2));

    // 每 1000 個顯示進度
    if ((i + 1) % 1000 === 0) {
      console.log(`✅ 已生成 ${i + 1}/${MAX_SUPPLY} 個文件`);
    }
  }

  console.log(`\n✅ 所有元數據生成完成！`);
  console.log(`📂 文件位置: ${metadataDir}`);
  console.log(`📊 總數: ${MAX_SUPPLY} 個文件`);
}

generateMetadata().catch(console.error);
