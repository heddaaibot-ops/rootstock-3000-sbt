/**
 * 使用 NFT.Storage 上传 metadata
 * NFT.Storage 是免费的，专为 NFT 设计，无数量限制
 */

const { NFTStorage, File } = require("nft.storage");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function uploadToNFTStorage() {
  const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;

  if (!NFT_STORAGE_KEY) {
    console.log("❌ 未找到 NFT_STORAGE_KEY");
    console.log("\n📝 获取 NFT.Storage API Key 步骤：");
    console.log("1. 访问 https://nft.storage/");
    console.log("2. 点击右上角 'Login' 并使用 Email 登录");
    console.log("3. 进入 'API Keys' 页面");
    console.log("4. 点击 'New Key' 创建新的 API key");
    console.log("5. 复制 API key");
    console.log("6. 添加到 .env: NFT_STORAGE_KEY=your_api_key");
    console.log("\n⚠️ 优点：完全免费，永久存储，无数量限制");
    process.exit(1);
  }

  const client = new NFTStorage({ token: NFT_STORAGE_KEY });
  const metadataDir = path.join(__dirname, "..", "metadata");

  console.log("📁 准备上传 metadata 文件夹到 NFT.Storage...\n");

  if (!fs.existsSync(metadataDir)) {
    console.error("❌ metadata 文件夹不存在！");
    process.exit(1);
  }

  const files = fs.readdirSync(metadataDir);
  console.log(`📊 找到 ${files.length} 个元数据文件`);
  console.log("⏳ 开始上传（这可能需要几分钟）...\n");

  try {
    // 准备文件数组
    const nftFiles = [];

    for (const filename of files) {
      const filePath = path.join(metadataDir, filename);
      const content = fs.readFileSync(filePath);
      nftFiles.push(new File([content], filename, { type: "application/json" }));
    }

    // 上传到 NFT.Storage
    const cid = await client.storeDirectory(nftFiles);

    console.log("✅ 上传成功！\n");
    console.log("📋 详细信息：");
    console.log("─────────────────────────────────────────────");
    console.log(`CID: ${cid}`);
    console.log("─────────────────────────────────────────────\n");

    console.log("🔗 访问链接（测试）：");
    console.log(`https://${cid}.ipfs.nftstorage.link/0`);
    console.log(`https://ipfs.io/ipfs/${cid}/0`);
    console.log(`https://gateway.pinata.cloud/ipfs/${cid}/0`);
    console.log("");

    console.log("📝 新的 BaseURI：");
    console.log(`ipfs://${cid}/`);
    console.log("");

    // 保存结果
    const resultFile = path.join(__dirname, "..", "nft-storage-upload-result.json");
    fs.writeFileSync(
      resultFile,
      JSON.stringify(
        {
          ipfsHash: cid,
          baseURI: `ipfs://${cid}/`,
          gatewayUrl: `https://${cid}.ipfs.nftstorage.link/`,
          uploadDate: new Date().toISOString(),
        },
        null,
        2
      )
    );

    // 也写入 pinata-upload-result.json 以兼容后续脚本
    const compatFile = path.join(__dirname, "..", "pinata-upload-result.json");
    fs.writeFileSync(
      compatFile,
      JSON.stringify(
        {
          ipfsHash: cid,
          baseURI: `ipfs://${cid}/`,
          gatewayUrl: `https://${cid}.ipfs.nftstorage.link/`,
        },
        null,
        2
      )
    );

    console.log(`💾 结果已保存到: ${resultFile}\n`);
    console.log("⚠️ 下一步：更新合约的 BaseURI");
    console.log(`运行: npx hardhat run scripts/update-baseuri.js --network rskMainnet`);

    return cid;
  } catch (error) {
    console.error("❌ 上传失败:", error.message);
    process.exit(1);
  }
}

uploadToNFTStorage()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
