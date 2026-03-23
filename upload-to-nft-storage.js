const fs = require('fs');
const axios = require('axios');

const NFT_STORAGE_API_KEY = '38857837.693b733e42074906b0b5cf9d2da6c806';

async function uploadImage() {
  try {
    console.log('📤 正在上傳圖片到 IPFS (NFT.Storage)...');

    const imageData = fs.readFileSync('./nft-image.png');

    // 嘗試使用 Bearer token 格式
    const response = await axios.post(
      'https://api.nft.storage/upload',
      imageData,
      {
        headers: {
          'Authorization': `Bearer ${NFT_STORAGE_API_KEY}`,
          'Content-Type': 'image/png'
        },
        maxBodyLength: Infinity
      }
    );

    const cid = response.data.value.cid;
    console.log('\n✅ 圖片上傳成功！');
    console.log('IPFS CID:', cid);
    console.log('IPFS URL:', `https://nftstorage.link/ipfs/${cid}`);
    console.log('公共 Gateway:', `https://ipfs.io/ipfs/${cid}`);

    // 保存 CID 到文件
    fs.writeFileSync('./image-cid.txt', cid);
    console.log('\n💾 CID 已保存到 image-cid.txt');

    return cid;
  } catch (error) {
    console.error('❌ 上傳失敗:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);
    process.exit(1);
  }
}

uploadImage();
