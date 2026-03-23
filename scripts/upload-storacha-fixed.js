/**
 * 使用 Storacha (原 Web3.Storage) 上传 metadata
 * 免费 5GB，无文件数量限制
 */

const { create } = require("@storacha/client");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function uploadToStoracha() {
  const TOKEN = process.env.WEB3_STORAGE_TOKEN;

  if (!TOKEN) {
    console.log("❌ 未找到 WEB3_STORAGE_TOKEN");
    process.exit(1);
  }

  const metadataDir = path.join(__dirname, "..", "metadata-identical");

  console.log("📁 准备上传 metadata-identical 文件夹到 Storacha...\n");

  if (!fs.existsSync(metadataDir)) {
    console.error("❌ metadata-identical 文件夹不存在！");
    process.exit(1);
  }

  try {
    // 创建客户端
    console.log("⏳ 正在初始化 Storacha 客户端...");
    const client = await create();

    // 使用 token 登录
    console.log("⏳ 正在验证 Token...");
    const account = await client.login(TOKEN);
    console.log(`✅ 已登录: ${account.did()}`);

    // 获取或创建 space
    const spaces = await client.spaces();
    if (spaces.length === 0) {
      console.log("⏳ 创建新的 Space...");
      const space = await client.createSpace("rootstock-3000-sbt");
      await client.setCurrentSpace(space.did());
      console.log(`✅ Space 已创建: ${space.did()}`);
    } else {
      await client.setCurrentSpace(spaces[0].did());
      console.log(`✅ 使用 Space: ${spaces[0].did()}`);
    }

    // 手动读取文件
    console.log("\n⏳ 正在读取文件...");
    const fileNames = fs.readdirSync(metadataDir);
    console.log(`📊 找到 ${fileNames.length} 个文件`);

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

    // 上传
    const directoryCid = await client.uploadDirectory(files);

    console.log("✅ 上传成功！\n");
    console.log("📋 详细信息：");
    console.log("─────────────────────────────────────────────");
    console.log(`CID: ${directoryCid}`);
    console.log("─────────────────────────────────────────────\n");

    console.log("🔗 测试链接：");
    console.log(`https://w3s.link/ipfs/${directoryCid}/0.json`);
    console.log(`https://ipfs.io/ipfs/${directoryCid}/0.json`);
    console.log(`https://gateway.pinata.cloud/ipfs/${directoryCid}/0.json`);
    console.log("");

    console.log("📝 新的 BaseURI：");
    console.log(`ipfs://${directoryCid}/`);
    console.log("");

    // 保存结果
    const resultFile = path.join(__dirname, "..", "pinata-upload-result.json");
    fs.writeFileSync(
      resultFile,
      JSON.stringify(
        {
          ipfsHash: directoryCid.toString(),
          baseURI: `ipfs://${directoryCid}/`,
          gatewayUrl: `https://w3s.link/ipfs/${directoryCid}/`,
          uploadService: "storacha",
          uploadDate: new Date().toISOString(),
        },
        null,
        2
      )
    );
    console.log(`💾 结果已保存到: ${resultFile}\n`);

    console.log("⚠️ 下一步：更新合约的 BaseURI");
    console.log(`运行: npx hardhat run scripts/update-baseuri.js --network rskMainnet`);

    return directoryCid.toString();
  } catch (error) {
    console.error("\n❌ 上传失败:", error.message);

    if (error.message.includes("Unauthorized") || error.message.includes("401")) {
      console.log("\n⚠️ Token 认证失败，请检查：");
      console.log("1. Token 是否正确");
      console.log("2. Token 是否已过期");
      console.log("3. 重新创建 Token 并更新 .env");
    }

    console.error("\n完整错误：", error);
    process.exit(1);
  }
}

uploadToStoracha();
