const { create } = require('ipfs-http-client');
const fs = require('fs');

async function uploadToIPFS() {
  try {
    console.log('📤 連接到公共 IPFS 節點...');

    // 使用 Infura 的免費公共 IPFS 節點
    const client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https'
    });

    console.log('📤 正在上傳圖片...');
    const file = fs.readFileSync('./nft-image.png');

    const result = await client.add(file, {
      progress: (prog) => console.log(`上傳進度: ${prog} bytes`)
    });

    const cid = result.path;
    console.log('\n✅ 圖片上傳成功！');
    console.log('IPFS CID:', cid);
    console.log('公共 Gateway:', `https://ipfs.io/ipfs/${cid}`);
    console.log('Infura Gateway:', `https://infura-ipfs.io/ipfs/${cid}`);

    // 保存 CID
    fs.writeFileSync('./image-cid.txt', cid);
    console.log('\n💾 CID 已保存到 image-cid.txt');

    return cid;
  } catch (error) {
    console.error('❌ 上傳失敗:', error.message);

    // 如果 Infura 失敗，嘗試本地節點
    console.log('\n嘗試使用本地 IPFS 節點...');
    try {
      const localClient = create({ url: 'http://127.0.0.1:5001' });
      const file = fs.readFileSync('./nft-image.png');
      const result = await localClient.add(file);
      const cid = result.path;

      console.log('\n✅ 通過本地節點上傳成功！');
      console.log('IPFS CID:', cid);
      console.log('公共 Gateway:', `https://ipfs.io/ipfs/${cid}`);

      fs.writeFileSync('./image-cid.txt', cid);
      return cid;
    } catch (localError) {
      console.error('❌ 本地節點也失敗了:', localError.message);
      process.exit(1);
    }
  }
}

uploadToIPFS();
