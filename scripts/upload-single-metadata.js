/**
 * 上传单个 metadata 文件到 Pinata
 */

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function uploadSingleMetadata() {
  const JWT = process.env.PINATA_JWT;

  if (!JWT) {
    console.error("❌ 错误：请在 .env 中设置 PINATA_JWT");
    process.exit(1);
  }

  console.log("📁 准备上传单个 metadata 文件到 Pinata...\n");

  const metadataFile = path.join(__dirname, "..", "metadata-single.json");

  if (!fs.existsSync(metadataFile)) {
    console.error("❌ metadata-single.json 不存在！");
    process.exit(1);
  }

  try {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    const data = new FormData();

    // 读取文件
    const fileStream = fs.createReadStream(metadataFile);
    data.append("file", fileStream);

    // 设置 metadata
    const pinataMetadata = JSON.stringify({
      name: "Rootstock 3000 Days Metadata",
    });
    data.append("pinataMetadata", pinataMetadata);

    console.log("⏳ 正在上传...");

    // 上传
    const response = await axios.post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        Authorization: `Bearer ${JWT}`,
      },
    });

    const cid = response.data.IpfsHash;

    console.log("✅ 上传成功！\n");
    console.log("📋 详细信息：");
    console.log("─────────────────────────────────────────────");
    console.log(`CID: ${cid}`);
    console.log(`大小: ${response.data.PinSize} bytes`);
    console.log("─────────────────────────────────────────────\n");

    console.log("🔗 访问链接（测试）：");
    console.log(`https://gateway.pinata.cloud/ipfs/${cid}`);
    console.log(`https://ipfs.io/ipfs/${cid}`);
    console.log("");

    console.log("📝 新的 BaseURI（不带斜杠）：");
    console.log(`ipfs://${cid}`);
    console.log("");

    console.log("⚠️ 重要：");
    console.log("因为是单个文件，baseURI 应该设置为：ipfs://" + cid);
    console.log("这样所有 tokenURI 都会指向同一个 metadata");
    console.log("");

    // 保存结果
    const resultFile = path.join(__dirname, "..", "pinata-upload-result.json");
    fs.writeFileSync(
      resultFile,
      JSON.stringify(
        {
          ipfsHash: cid,
          baseURI: `ipfs://${cid}`,
          gatewayUrl: `https://gateway.pinata.cloud/ipfs/${cid}`,
          uploadType: "single-file",
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

    if (error.response) {
      console.log("\n⚠️ API 响应错误:");
      console.log(JSON.stringify(error.response.data, null, 2));
    }

    process.exit(1);
  }
}

uploadSingleMetadata()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
