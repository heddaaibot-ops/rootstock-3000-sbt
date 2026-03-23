const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

// 使用臨時測試 API Key（僅用於此次部署）
const PINATA_API_KEY = '34ee66c31c15c3f82b03';
const PINATA_SECRET_KEY = 'c3ac0f8f1f7f27e76e95b10a48e6f05dd22e17fedb3c80f5aadc24c5c0cb5f5a';

async function uploadImage() {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream('./nft-image.png'));

    const metadata = JSON.stringify({
      name: 'Rootstock 3000 Days - Love You 3000'
    });
    formData.append('pinataMetadata', metadata);

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY
        }
      }
    );

    console.log('✅ 圖片上傳成功！');
    console.log('IPFS CID:', response.data.IpfsHash);
    console.log('IPFS URL:', `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`);
    console.log('公共 Gateway:', `https://ipfs.io/ipfs/${response.data.IpfsHash}`);

    // 保存 CID 到文件
    fs.writeFileSync('./image-cid.txt', response.data.IpfsHash);
    console.log('\n💾 CID 已保存到 image-cid.txt');

    return response.data.IpfsHash;
  } catch (error) {
    console.error('❌ 上傳失敗:', error.response?.data || error.message);
    process.exit(1);
  }
}

uploadImage();
