const fs = require('fs');
const path = require('path');

const TOTAL_SUPPLY = 10000;
const IMAGE_CID = process.env.IMAGE_CID || 'QmYourImageCID'; // 從環境變量讀取或使用默認值
const OUTPUT_DIR = './metadata';

console.log('🎨 Rootstock 3000 Days SBT - Metadata Generator\n');

// 創建輸出目錄
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`📁 Created directory: ${OUTPUT_DIR}`);
}

console.log(`📊 Generating ${TOTAL_SUPPLY.toLocaleString()} metadata files...`);
console.log(`🖼️  Image CID: ${IMAGE_CID}\n`);

const startTime = Date.now();

// 生成元數據
for (let i = 0; i < TOTAL_SUPPLY; i++) {
  const metadata = {
    name: `Rootstock 3000 Days #${i}`,
    description: 'Commemorating 3000 days of Rootstock - A Soul Bound Token marking this historic milestone in Bitcoin-powered smart contracts. This non-transferable NFT celebrates your participation in the journey.',
    image: `ipfs://${IMAGE_CID}`,
    external_url: 'https://rootstock3000.com',
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
        trait_type: 'Transferable',
        value: 'No'
      },
      {
        trait_type: 'Milestone',
        value: '3000 Days'
      },
      {
        trait_type: 'Launch Date',
        value: '2018-01-16',
        display_type: 'date'
      },
      {
        trait_type: 'Milestone Date',
        value: '2026-04-04',
        display_type: 'date'
      },
      {
        trait_type: 'Chain',
        value: 'Rootstock'
      },
      {
        trait_type: 'Secured By',
        value: 'Bitcoin'
      }
    ],
    properties: {
      category: 'commemorative',
      soul_bound: true,
      chain_id: 30,
    }
  };

  const filePath = path.join(OUTPUT_DIR, `${i}.json`);
  fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2));

  // 進度顯示
  if ((i + 1) % 1000 === 0) {
    const progress = ((i + 1) / TOTAL_SUPPLY * 100).toFixed(2);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const estimated = (elapsed / (i + 1) * TOTAL_SUPPLY).toFixed(1);
    console.log(`  ⏳ Progress: ${(i + 1).toLocaleString()}/${TOTAL_SUPPLY.toLocaleString()} (${progress}%) - Elapsed: ${elapsed}s / Estimated: ${estimated}s`);
  }
}

const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
const avgTime = (totalTime / TOTAL_SUPPLY * 1000).toFixed(2);

console.log('\n✅ All metadata generated successfully!');
console.log(`📊 Total files: ${TOTAL_SUPPLY.toLocaleString()}`);
console.log(`⏱️  Total time: ${totalTime}s`);
console.log(`📈 Average: ${avgTime}ms per file`);
console.log(`📁 Output directory: ${path.resolve(OUTPUT_DIR)}`);

// 生成摘要信息
const summary = {
  total_files: TOTAL_SUPPLY,
  image_cid: IMAGE_CID,
  generated_at: new Date().toISOString(),
  generation_time_seconds: parseFloat(totalTime),
  average_time_ms: parseFloat(avgTime),
};

fs.writeFileSync(
  path.join(OUTPUT_DIR, '_summary.json'),
  JSON.stringify(summary, null, 2)
);

console.log('\n📝 Next steps:');
console.log('1. Upload the entire metadata folder to IPFS (Pinata or NFT.Storage)');
console.log('2. Get the folder CID');
console.log('3. Set BASE_URI in .env as: ipfs://<FOLDER_CID>/');
console.log('4. Deploy the contract with this BASE_URI');
console.log('\n🚀 Ready to deploy!');
