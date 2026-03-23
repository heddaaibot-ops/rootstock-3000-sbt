/**
 * 使用 NFT.Storage 上传 metadata
 */

const { NFTStorage, File, Blob } = require("nft.storage");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function uploadToNFTStorage() {
  // 使用你提供的 API key
  const API_KEY = "d6e3ebff.7895f129f21844b1a307a1b130e20f72";

  const metadataDir = path.join(__dirname, "..", "metadata-identical");

  console.log("📁 准备上传 metadata-identical 文件夹到 NFT.Storage...\n");

  if (!fs.existsSync(metadataDir)) {
    console.error("❌ metadata-identical 文件夹不存在！");
    process.exit(1);
  }

  try {
    // 创建客户端
    console.log("⏳ 正在初始化 NFT.Storage 客户端...");
    const client = new NFTStorage({ token: API_KEY });

    // 读取所有文件
    console.log("⏳ 正在读取文件...");
    const fileNames = fs.readdirSync(metadataDir);
    console.log(`📊 找到 ${fileNames.length} 个文件\n`);

    // 创建 File 对象数组
    const files = [];
    for (const fileName of fileNames) {
      const filePath = path.join(metadataDir, fileName);
      const content = fs.readFileSync(filePath);
      files.push(
        new File([content], fileName, {
          type: "application/json",
        })
      );
    }

    console.log("⏳ 开始上传（这可能需要几分钟）...\n");

    // 上传目录
    const cid = await client.storeDirectory(files);

    console.log("✅ 上传成功！\n");
    console.log("📋 详细信息：");
    console.log("─────────────────────────────────────────────");
    console.log(`CID: ${cid}`);
    console.log("─────────────────────────────────────────────\n");

    console.log("🔗 测试链接：");
    console.log(`https://nftstorage.link/ipfs/${cid}/0.json`);
    console.log(`https://ipfs.io/ipfs/${cid}/0.json`);
    console.log(`https://gateway.pinata.cloud/ipfs/${cid}/0.json`);
    console.log("");

    console.log("📝 新的 BaseURI：");
    console.log(`ipfs://${cid}/`);
    console.log("");

    // 保存结果
    const resultFile = path.join(__dirname, "..", "pinata-upload-result.json");
    fs.writeFileSync(
      resultFile,
      JSON.stringify(
        {
          ipfsHash: cid,
          baseURI: `ipfs://${cid}/`,
          gatewayUrl: `https://nftstorage.link/ipfs/${cid}/`,
          uploadService: "nft.storage",
          uploadDate: new Date().toISOString(),
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
    console.error("\n❌ 上传失败:", error.message);

    if (error.message.includes("Unauthorized") || error.message.includes("401")) {
      console.log("\n⚠️ API Key 认证失败，请检查：");
      console.log("1. API Key 是否正确");
      console.log("2. API Key 是否有效");
      console.log("3. 账户是否有足够的额度");
    }

    console.error("\n完整错误：", error);
    process.exit(1);
  }
}

uploadToNFTStorage();
