const { NFTStorage, File } = require('nft.storage');
const fs = require('fs');
const path = require('path');

const API_KEY = 'd6e3ebff.7895f129f21844b1a307a1b130e20f72';

async function uploadMetadata() {
  try {
    console.log('🚀 开始上传到 NFT.Storage...\n');

    const client = new NFTStorage({ token: API_KEY });

    const metadataDir = path.join(__dirname, '../metadata-identical');

    // 读取所有文件
    console.log('📁 读取文件...');
    const files = [];
    for (let i = 0; i < 10000; i++) {
      const filePath = path.join(metadataDir, `${i}.json`);
      const content = fs.readFileSync(filePath);
      files.push(new File([content], `${i}.json`, { type: 'application/json' }));

      if ((i + 1) % 1000 === 0) {
        console.log(`  已读取 ${i + 1} / 10000 文件...`);
      }
    }

    console.log('\n📤 上传到 NFT.Storage（这可能需要几分钟）...\n');

    // 上传文件夹
    const cid = await client.storeDirectory(files);

    console.log('\n✅ 上传成功！\n');
    console.log('CID:', cid);
    console.log('\n测试链接:');
    console.log(`  https://nftstorage.link/ipfs/${cid}/0.json`);
    console.log(`  https://nftstorage.link/ipfs/${cid}/9999.json`);
    console.log('\n新的 BaseURI:');
    console.log(`  ipfs://${cid}/`);

    // 保存结果
    const result = {
      cid: cid,
      baseURI: `ipfs://${cid}/`,
      uploadedAt: new Date().toISOString(),
      service: 'NFT.Storage',
      fileCount: 10000
    };

    fs.writeFileSync(
      path.join(__dirname, '../nftstorage-upload-result.json'),
      JSON.stringify(result, null, 2)
    );

    console.log('\n结果已保存到: nftstorage-upload-result.json');

  } catch (error) {
    console.error('❌ 上传失败:', error.message);
    console.error('\n完整错误:', error);
  }
}

uploadMetadata();
