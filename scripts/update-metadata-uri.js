const hre = require("hardhat");

async function main() {
  const contractAddress = "0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188";
  const newMetadataURI = "ipfs://QmeN9eFV9TRLTAzGAb2pzgEkjbzinh3DngFUBtngKfozPk";

  console.log("🔧 开始更新 Metadata URI...");
  console.log("合约地址:", contractAddress);
  console.log("新的 Metadata URI:", newMetadataURI);

  const contract = await hre.ethers.getContractAt("Rootstock3000SBT", contractAddress);

  // 获取当前 metadata URI
  const currentURI = await contract.getMetadataURI();
  console.log("\n当前 Metadata URI:", currentURI);

  // 更新 metadata URI
  console.log("\n📝 正在更新...");
  const tx = await contract.setMetadataURI(newMetadataURI);
  console.log("交易已发送:", tx.hash);

  console.log("⏳ 等待确认...");
  const receipt = await tx.wait();
  console.log("✅ 已确认! 区块:", receipt.blockNumber);
  console.log("Gas 使用:", receipt.gasUsed.toString());

  // 验证更新
  const updatedURI = await contract.getMetadataURI();
  console.log("\n✅ 更新后的 Metadata URI:", updatedURI);

  console.log("\n🎉 Metadata URI 更新成功！");
  console.log("查看新 metadata:", `https://gateway.pinata.cloud/ipfs/${newMetadataURI.replace('ipfs://', '')}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
