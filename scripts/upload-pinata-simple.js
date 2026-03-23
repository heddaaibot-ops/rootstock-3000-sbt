/**
 * 简化版 Pinata 上传 - 压缩后上传
 */

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
require("dotenv").config();

async function createZip() {
  const metadataDir = path.join(__dirname, "..", "metadata");
  const zipPath = path.join(__dirname, "..", "metadata.zip");

  console.log("📦 正在压缩 metadata 文件夹...");

  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on("close", () => {
      console.log(`✅ 压缩完成！大小: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
      resolve(zipPath);
    });

    archive.on("error", reject);
    archive.pipe(output);
    archive.directory(metadataDir, false);
    archive.finalize();
  });
}

async function uploadToPinata(zipPath) {
  const JWT = process.env.PINATA_JWT;

  console.log("\n⏳ 正在上传到 Pinata...");

  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const data = new FormData();

  // 读取 zip 文件
  const fileStream = fs.createReadStream(zipPath);
  data.append("file", fileStream);

  // 设置为文件夹模式
  const pinataOptions = JSON.stringify({
    wrapWithDirectory: false,
  });
  data.append("pinataOptions", pinataOptions);

  const pinataMetadata = JSON.stringify({
    name: "Rootstock 3000 Days Metadata",
  });
  data.append("pinataMetadata", pinataMetadata);

  try {
    const response = await axios.post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        Authorization: `Bearer ${JWT}`,
      },
    });

    console.log("✅ 上传成功！\n");
    console.log("📋 CID:", response.data.IpfsHash);

    // 删除临时 zip
    fs.unlinkSync(zipPath);
    console.log("🗑️  已删除临时 zip 文件\n");

    return response.data.IpfsHash;
  } catch (error) {
    console.error("❌ 上传失败:", error.response?.data || error.message);
    throw error;
  }
}

async function main() {
  try {
    const zipPath = await createZip();
    const cid = await uploadToPinata(zipPath);

    console.log("🔗 测试链接:");
    console.log(`https://gateway.pinata.cloud/ipfs/${cid}/0`);
    console.log("\n📝 新 BaseURI: ipfs://" + cid + "/");

    // 保存结果
    fs.writeFileSync(
      "pinata-upload-result.json",
      JSON.stringify({ ipfsHash: cid, baseURI: `ipfs://${cid}/` }, null, 2)
    );
  } catch (error) {
    console.error("失败:", error.message);
    process.exit(1);
  }
}

main();
