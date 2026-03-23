const { NFTStorage, File } = require('nft.storage');
const fs = require('fs');

const API_KEY = '38857837.693b733e42074906b0b5cf9d2da6c806';

async function uploadImage() {
  try {
    console.log('📤 使用 NFT.Storage SDK 上傳圖片...');

    const client = new NFTStorage({ token: API_KEY });

    const imageData = fs.readFileSync('./nft-image.png');
    const imageFile = new File([imageData], 'rootstock-3000.png', { type: 'image/png' });

    console.log('📤 正在上傳到 IPFS...');
    const cid = await client.storeBlob(imageFile);

    console.log('\n✅ 圖片上傳成功！');
    console.log('IPFS CID:', cid);
    console.log('IPFS URL:', `https://nftstorage.link/ipfs/${cid}`);
    console.log('公共 Gateway:', `https://ipfs.io/ipfs/${cid}`);

    // 保存 CID
    fs.writeFileSync('./image-cid.txt', cid);
    console.log('\n💾 CID 已保存到 image-cid.txt');

    return cid;
  } catch (error) {
    console.error('❌ 上傳失敗:');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    process.exit(1);
  }
}

uploadImage();
