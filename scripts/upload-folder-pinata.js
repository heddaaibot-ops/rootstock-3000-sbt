/**
 * 上传 metadata-fixed 文件夹到 Pinata
 * 使用 pinDirectoryToIPFS 方法
 */

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function uploadFolder() {
  const JWT = process.env.PINATA_JWT;

  if (!JWT) {
    console.error("❌ 错误：请在 .env 中设置 PINATA_JWT");
    process.exit(1);
  }

  const metadataDir = path.join(__dirname, "..", "metadata-fixed");

  console.log("📁 准备上传 metadata-fixed 文件夹到 Pinata...");
  console.log("⏳ 正在读取文件（这可能需要一些时间）...\n");

  const data = new FormData();

  // 读取所有文件
  const files = fs.readdirSync(metadataDir);
  console.log(`📊 找到 ${files.length} 个文件`);
  console.log("⏳ 开始上传...\n");

  // 添加所有文件
  for (const file of files) {
    const filePath = path.join(metadataDir, file);
    data.append("file", fs.createReadStream(filePath), {
      filepath: file,
    });
  }

  // 添加 metadata
  const pinataMetadata = JSON.stringify({
    name: "Rootstock 3000 Days Metadata",
  });
  data.append("pinataMetadata", pinataMetadata);

  try {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    const response = await axios.post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        Authorization: `Bearer ${JWT}`,
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        process.stdout.write(`\r⏳ 上传进度: ${percentCompleted}%`);
      },
    });

    const cid = response.data.IpfsHash;

    console.log("\n\n✅ 上传成功！\n");
    console.log("📋 详细信息：");
    console.log("─────────────────────────────────────────────");
    console.log(`CID: ${cid}`);
    console.log(`大小: ${(response.data.PinSize / 1024 / 1024).toFixed(2)} MB`);
    console.log("─────────────────────────────────────────────\n");

    console.log("🔗 测试链接：");
    console.log(`https://gateway.pinata.cloud/ipfs/${cid}/0.json`);
    console.log(`https://ipfs.io/ipfs/${cid}/0.json`);
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
          gatewayUrl: `https://gateway.pinata.cloud/ipfs/${cid}/`,
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

    if (error.response) {
      console.log("\n⚠️ API 响应错误:");
      console.log(JSON.stringify(error.response.data, null, 2));

      if (error.response.data.error && error.response.data.error.includes("pin limit")) {
        console.log("\n💡 Pinata 免费套餐有文件数量限制。");
        console.log("建议：手动在网页上上传");
        console.log("1. 访问 https://app.pinata.cloud/pinmanager");
        console.log("2. 点击 Upload → Folder");
        console.log("3. 选择 metadata-fixed 文件夹");
        console.log("4. 上传完成后复制 CID 给我");
      }
    }

    process.exit(1);
  }
}

uploadFolder();
