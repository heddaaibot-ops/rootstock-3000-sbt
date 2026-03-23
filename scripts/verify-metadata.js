const hre = require("hardhat");

async function main() {
  const contractAddress = "0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188";

  console.log("🔍 检查合约 Metadata URI...\n");

  const contract = await hre.ethers.getContractAt("Rootstock3000SBT", contractAddress);

  // 获取当前 metadata URI
  const metadataURI = await contract.getMetadataURI();
  console.log("合约中的 Metadata URI:", metadataURI);

  // 获取 Token #0 的 URI（测试 tokenURI 函数）
  try {
    const token0URI = await contract.tokenURI(0);
    console.log("Token #0 的 URI:", token0URI);
  } catch (e) {
    console.log("Token #0 还不存在");
  }

  // 检查总供应量
  const totalSupply = await contract.totalSupply();
  console.log("\n当前已铸造:", totalSupply.toString(), "个");

  // 检查是否暂停
  const paused = await contract.paused();
  console.log("合约状态:", paused ? "已暂停 ❌" : "可铸造 ✅");

  console.log("\n📋 正确的 Metadata URI 应该是:");
  console.log("ipfs://QmeN9eFV9TRLTAzGAb2pzgEkjbzinh3DngFUBtngKfozPk");

  if (metadataURI === "ipfs://QmeN9eFV9TRLTAzGAb2pzgEkjbzinh3DngFUBtngKfozPk") {
    console.log("\n✅ 合约 Metadata URI 正确！");
  } else {
    console.log("\n❌ 合约 Metadata URI 不正确！");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
