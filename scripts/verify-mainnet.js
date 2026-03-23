/**
 * 验证主网合约源代码
 *
 * 使用方法：
 * npx hardhat verify --network rskMainnet 0xc4e7a1FB1bdf370CD187a50E0B6B360BCB4C3BEC "ipfs://bafybeicto7ndawofhbjfylypipjz72tvs6ljkzypf4dicyciimtbsrlgc4/" 10000
 */

const hre = require("hardhat");

async function main() {
  const contractAddress = "0xc4e7a1FB1bdf370CD187a50E0B6B360BCB4C3BEC";
  const baseURI = "ipfs://bafybeicto7ndawofhbjfylypipjz72tvs6ljkzypf4dicyciimtbsrlgc4/";
  const maxSupply = 10000;

  console.log("🔍 开始验证主网合约...");
  console.log("合约地址:", contractAddress);
  console.log("BaseURI:", baseURI);
  console.log("Max Supply:", maxSupply);
  console.log("");

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [baseURI, maxSupply],
      contract: "contracts/Rootstock3000SBT.sol:Rootstock3000SBT"
    });

    console.log("✅ 合约验证成功！");
    console.log("📋 现在可以在 Blockscout 查看源代码：");
    console.log(`https://rootstock.blockscout.com/address/${contractAddress}#code`);
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("✅ 合约已经验证过了！");
      console.log(`https://rootstock.blockscout.com/address/${contractAddress}#code`);
    } else {
      console.error("❌ 验证失败:", error.message);
      throw error;
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
