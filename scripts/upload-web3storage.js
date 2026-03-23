/**
 * 使用 Web3.Storage (Storacha) 上传 metadata
 * 免费 5GB，无文件数量限制
 */

const { create } = require("@web3-storage/w3up-client");
const { filesFromPaths } = require("files-from-path");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function uploadToWeb3Storage() {
  const SPACE_DID = process.env.WEB3_STORAGE_SPACE_DID;
  const API_KEY = process.env.WEB3_STORAGE_KEY;

  if (!API_KEY) {
    console.log("❌ 未找到 WEB3_STORAGE_KEY");
    console.log("\n📝 获取步骤：");
    console.log("1. 访问 https://storacha.network/");
    console.log("2. 注册账户（Email 或 GitHub）");
    console.log("3. 进入 Console");
    console.log("4. 创建 Space（存储空间）");
    console.log("5. 创建 API Key");
    console.log("6. 复制 API Key 和 Space DID");
    console.log("7. 添加到 .env:");
    console.log("   WEB3_STORAGE_KEY=your_api_key");
    console.log("   WEB3_STORAGE_SPACE_DID=your_space_did");
    process.exit(1);
  }

  const metadataDir = path.join(__dirname, "..", "metadata-identical");

  console.log("📁 准备上传 metadata-identical 文件夹到 Web3.Storage...\n");

  if (!fs.existsSync(metadataDir)) {
    console.error("❌ metadata-identical 文件夹不存在！");
    process.exit(1);
  }

  try {
    // 创建客户端
    console.log("⏳ 正在初始化 Web3.Storage 客户端...");
    const client = await create();

    // 使用 API key 登录
    await client.login(API_KEY);

    // 设置 space
    if (SPACE_DID) {
      await client.setCurrentSpace(SPACE_DID);
    }

    // 读取文件
    console.log("⏳ 正在读取文件...");
    const files = await filesFromPaths([metadataDir]);
    console.log(`📊 找到 ${files.length} 个文件\n`);

    console.log("⏳ 开始上传（这可能需要几分钟）...");

    // 上传
    const cid = await client.uploadDirectory(files);

    console.log("\n✅ 上传成功！\n");
    console.log("📋 详细信息：");
    console.log("─────────────────────────────────────────────");
    console.log(`CID: ${cid}`);
    console.log("─────────────────────────────────────────────\n");

    console.log("🔗 测试链接：");
    console.log(`https://w3s.link/ipfs/${cid}/0.json`);
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
          ipfsHash: cid.toString(),
          baseURI: `ipfs://${cid}/`,
          gatewayUrl: `https://w3s.link/ipfs/${cid}/`,
          uploadService: "web3.storage",
        },
        null,
        2
      )
    );
    console.log(`💾 结果已保存到: ${resultFile}\n`);

    console.log("⚠️ 下一步：更新合约的 BaseURI");
    console.log(`运行: npx hardhat run scripts/update-baseuri.js --network rskMainnet`);

    return cid.toString();
  } catch (error) {
    console.error("❌ 上传失败:", error.message);
    console.error(error);
    process.exit(1);
  }
}

uploadToWeb3Storage();
