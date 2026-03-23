const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiNDk4YjRhNi04YmViLTQyNmMtYjA4ZS0wZTk5MTUxMjViMjUiLCJlbWFpbCI6ImhlZGRhYWlib3RAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjAwNWI0OTQ1ODFiMThmNGJmZmRmIiwic2NvcGVkS2V5U2VjcmV0IjoiMzFjZmM1ZjViYTFkYTQ3YzBhODc5ZTM5MzZhOTg4MmNiZDFmNDFiZGZkZDZiOWE4ODA4OWZhMWE1M2I2ZGNkMiIsImV4cCI6MTgwNTY0NDE5N30.ZZqurrqfshWUmxpo25hs69z00PCTcAyNhPJZlDRnxoc";

async function uploadMetadataFolder() {
  try {
    console.log('📤 正在上傳 metadata 文件夾到 IPFS...');
    console.log('⏳ 10,000 個文件，預計需要 2-3 分鐘...\n');

    const metadataDir = path.join(__dirname, 'metadata');
    const files = fs.readdirSync(metadataDir);

    const formData = new FormData();

    let count = 0;
    for (const file of files) {
      const filepath = path.join(metadataDir, file);
      const fileData = fs.readFileSync(filepath);

      // 添加文件到 FormData，使用相對路徑
      formData.append('file', fileData, {
        filepath: file, // 不包含 'metadata/' 前綴
        contentType: 'application/json'
      });

      count++;
      if (count % 1000 === 0) {
        console.log(`📦 已打包 ${count}/${files.length} 個文件`);
      }
    }

    console.log(`\n📤 開始上傳 ${files.length} 個文件到 IPFS...`);

    const metadata = JSON.stringify({
      name: 'Rootstock 3000 Days - Metadata'
    });
    formData.append('pinataMetadata', metadata);

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`,
          ...formData.getHeaders()
        }
      }
    );

    const cid = response.data.IpfsHash;
    console.log('\n✅ Metadata 文件夾上傳成功！');
    console.log('IPFS CID:', cid);
    console.log('');
    console.log('示例 URL:');
    console.log(`  Token #0: ipfs://${cid}/0`);
    console.log(`  Token #1: ipfs://${cid}/1`);
    console.log(`  Token #9999: ipfs://${cid}/9999`);

    // 保存 CID
    fs.writeFileSync('./metadata-cid.txt', cid);
    console.log('\n💾 CID 已保存到 metadata-cid.txt');

    // 保存 BASE_URI
    const baseURI = `ipfs://${cid}/`;
    fs.writeFileSync('./base-uri.txt', baseURI);
    console.log('💾 BASE_URI 已保存到 base-uri.txt');

    return cid;
  } catch (error) {
    console.error('❌ 上傳失敗:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);
    process.exit(1);
  }
}

uploadMetadataFolder();
