/**
 * 上传 metadata 文件夹到 Pinata IPFS
 * 使用 Pinata API v2
 */

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const recursive = require("recursive-fs");
require("dotenv").config();

async function uploadFolderToPinata() {
  const JWT = process.env.PINATA_JWT;

  if (!JWT) {
    console.error("❌ 错误：请在 .env 中设置 PINATA_JWT");
    process.exit(1);
  }

  console.log("📁 准备上传 metadata 文件夹到 Pinata...\n");

  const metadataDir = path.join(__dirname, "..", "metadata");

  // 检查文件夹
  if (!fs.existsSync(metadataDir)) {
    console.error("❌ metadata 文件夹不存在！");
    process.exit(1);
  }

  try {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    // 读取所有文件
    const { files } = await recursive.read(metadataDir);
    console.log(`📊 找到 ${files.length} 个元数据文件`);
    console.log("⏳ 开始上传（这可能需要几分钟）...\n");

    const data = new FormData();

    // 添加所有文件到 FormData
    for (const file of files) {
      const relativePath = path.relative(metadataDir, file);
      data.append("file", fs.createReadStream(file), {
        filepath: relativePath,
      });
    }

    // 添加 metadata
    const pinataMetadata = JSON.stringify({
      name: "Rootstock 3000 Days Metadata",
      keyvalues: {
        project: "rootstock-3000-sbt",
        network: "mainnet",
        uploadDate: new Date().toISOString(),
      },
    });
    data.append("pinataMetadata", pinataMetadata);

    // 添加 options
    const pinataOptions = JSON.stringify({
      wrapWithDirectory: true,
    });
    data.append("pinataOptions", pinataOptions);

    // 上传
    const response = await axios.post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        Authorization: `Bearer ${JWT}`,
      },
    });

    console.log("✅ 上传成功！\n");
    console.log("📋 详细信息：");
    console.log("─────────────────────────────────────────────");
    console.log(`CID: ${response.data.IpfsHash}`);
    console.log(`大小: ${(response.data.PinSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`时间戳: ${response.data.Timestamp}`);
    console.log("─────────────────────────────────────────────\n");

    console.log("🔗 访问链接（测试）：");
    console.log(`https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}/0`);
    console.log(`https://ipfs.io/ipfs/${response.data.IpfsHash}/0`);
    console.log("");

    console.log("📝 新的 BaseURI：");
    console.log(`ipfs://${response.data.IpfsHash}/`);
    console.log("");

    // 保存结果
    const resultFile = path.join(__dirname, "..", "pinata-upload-result.json");
    fs.writeFileSync(
      resultFile,
      JSON.stringify(
        {
          ipfsHash: response.data.IpfsHash,
          pinSize: response.data.PinSize,
          timestamp: response.data.Timestamp,
          baseURI: `ipfs://${response.data.IpfsHash}/`,
          gatewayUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}/`,
        },
        null,
        2
      )
    );
    console.log(`💾 结果已保存到: ${resultFile}\n`);

    console.log("⚠️ 下一步：更新合约的 BaseURI");
    console.log(`运行: npx hardhat run scripts/update-baseuri.js --network rskMainnet`);

    return response.data;
  } catch (error) {
    console.error("❌ 上传失败:", error.message);

    if (error.response) {
      console.log("\n⚠️ API 响应错误:");
      console.log(JSON.stringify(error.response.data, null, 2));
    }

    if (error.message.includes("401") || error.message.includes("403")) {
      console.log("\n⚠️ 认证错误，请检查：");
      console.log("1. PINATA_JWT 是否正确");
      console.log("2. API Key 是否有效");
      console.log("3. 是否有上传权限");
    }

    process.exit(1);
  }
}

uploadFolderToPinata()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
