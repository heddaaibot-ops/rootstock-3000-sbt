/**
 * 使用 Pinata Pin by CID 功能固定已上传到 IPFS 的内容
 * 这样可以绕过 Pinata 的文件数量限制
 */

const axios = require("axios");
require("dotenv").config();

async function pinByCID() {
  const JWT = process.env.PINATA_JWT;
  const CID = "QmemZzK2juqbjJ6DvhDBekVGmBzcbt6wsnbcADgMU9QCbR";

  console.log("📌 使用 Pinata Pin by CID 功能...\n");
  console.log(`CID: ${CID}`);
  console.log("");

  try {
    const url = "https://api.pinata.cloud/pinning/pinByHash";

    const data = {
      hashToPin: CID,
      pinataMetadata: {
        name: "Rootstock 3000 Days Metadata",
        keyvalues: {
          project: "rootstock-3000-sbt",
          network: "mainnet",
        }
      }
    };

    console.log("⏳ 正在请求 Pinata 固定 CID...");

    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
    });

    console.log("✅ Pin 成功！\n");
    console.log("📋 详细信息：");
    console.log("─────────────────────────────────────────────");
    console.log(`CID: ${response.data.IpfsHash}`);
    console.log(`Status: ${response.data.PinSize ? 'Pinned' : 'Queued'}`);
    console.log("─────────────────────────────────────────────\n");

    console.log("🔗 测试链接：");
    console.log(`https://gateway.pinata.cloud/ipfs/${CID}/0.json`);
    console.log(`https://ipfs.io/ipfs/${CID}/0.json`);
    console.log("");

    console.log("📝 新的 BaseURI：");
    console.log(`ipfs://${CID}/`);
    console.log("");

    // 保存结果
    const fs = require("fs");
    const path = require("path");
    const resultFile = path.join(__dirname, "..", "pinata-upload-result.json");
    fs.writeFileSync(
      resultFile,
      JSON.stringify(
        {
          ipfsHash: CID,
          baseURI: `ipfs://${CID}/`,
          gatewayUrl: `https://gateway.pinata.cloud/ipfs/${CID}/`,
          uploadService: "ipfs-cli + pinata-pin",
          uploadDate: new Date().toISOString(),
        },
        null,
        2
      )
    );
    console.log(`💾 结果已保存到: ${resultFile}\n`);

    console.log("⚠️ 下一步：更新合约的 BaseURI");
    console.log(`运行: npx hardhat run scripts/update-baseuri.js --network rskMainnet`);

    return CID;
  } catch (error) {
    console.error("\n❌ Pin 失败:", error.message);

    if (error.response) {
      console.log("\n⚠️ API 响应错误:");
      console.log(JSON.stringify(error.response.data, null, 2));
    }

    process.exit(1);
  }
}

pinByCID();
