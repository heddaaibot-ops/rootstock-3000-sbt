/**
 * 上传 metadata 文件夹到 Pinata IPFS
 *
 * 使用前：
 * 1. 注册 Pinata: https://pinata.cloud
 * 2. 获取 JWT token
 * 3. 在 .env 添加: PINATA_JWT=your_jwt_token
 * 4. npm install --save-dev pinata-web3
 *
 * 运行：
 * node scripts/upload-to-pinata.js
 */

const { PinataSDK } = require("pinata-web3");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function main() {
  // 检查环境变量
  if (!process.env.PINATA_JWT) {
    console.error("❌ 错误：请在 .env 中设置 PINATA_JWT");
    console.log("\n获取步骤：");
    console.log("1. 访问 https://app.pinata.cloud/developers/api-keys");
    console.log("2. 创建新的 API Key");
    console.log("3. 复制 JWT token");
    console.log("4. 添加到 .env: PINATA_JWT=eyJhbGc...");
    process.exit(1);
  }

  const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
  });

  console.log("📁 准备上传 metadata 文件夹到 Pinata...\n");

  const metadataDir = path.join(__dirname, "..", "metadata");

  // 检查文件夹
  if (!fs.existsSync(metadataDir)) {
    console.error("❌ metadata 文件夹不存在！");
    process.exit(1);
  }

  const fileCount = fs.readdirSync(metadataDir).length;
  console.log(`📊 找到 ${fileCount} 个元数据文件`);
  console.log("⏳ 开始上传（这可能需要几分钟）...\n");

  try {
    // 上传整个文件夹
    const result = await pinata.upload.folder(metadataDir, {
      name: "Rootstock 3000 Days Metadata",
      metadata: {
        keyvalues: {
          project: "rootstock-3000-sbt",
          network: "mainnet",
          uploadDate: new Date().toISOString(),
        }
      },
    });

    console.log("✅ 上传成功！\n");
    console.log("📋 详细信息：");
    console.log("─────────────────────────────────────────────");
    console.log(`CID: ${result.IpfsHash}`);
    console.log(`大小: ${(result.PinSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`时间戳: ${result.Timestamp}`);
    console.log("─────────────────────────────────────────────\n");

    console.log("🔗 访问链接（测试）：");
    console.log(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}/0`);
    console.log(`https://ipfs.io/ipfs/${result.IpfsHash}/0`);
    console.log("");

    console.log("📝 新的 BaseURI：");
    console.log(`ipfs://${result.IpfsHash}/`);
    console.log("");

    console.log("⚠️ 下一步：更新合约的 BaseURI");
    console.log(`1. 编辑 scripts/update-baseuri.js`);
    console.log(`2. 设置 NEW_BASE_URI = "ipfs://${result.IpfsHash}/"`);
    console.log(`3. 运行: npx hardhat run scripts/update-baseuri.js --network rskMainnet`);
    console.log("");

    // 保存结果
    const resultFile = path.join(__dirname, "..", "pinata-upload-result.json");
    fs.writeFileSync(
      resultFile,
      JSON.stringify({
        ipfsHash: result.IpfsHash,
        pinSize: result.PinSize,
        timestamp: result.Timestamp,
        baseURI: `ipfs://${result.IpfsHash}/`,
        gatewayUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}/`,
      }, null, 2)
    );
    console.log(`💾 结果已保存到: ${resultFile}`);

  } catch (error) {
    console.error("❌ 上传失败:", error.message);

    if (error.message.includes("401") || error.message.includes("403")) {
      console.log("\n⚠️ 认证错误，请检查：");
      console.log("1. PINATA_JWT 是否正确");
      console.log("2. API Key 是否有效");
      console.log("3. 是否有上传权限");
    }

    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
