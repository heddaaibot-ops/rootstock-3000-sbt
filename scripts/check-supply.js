const hre = require("hardhat");

async function main() {
  const contractAddress = "0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188";
  const contract = await hre.ethers.getContractAt("Rootstock3000SBT", contractAddress);

  const totalSupply = await contract.totalSupply();
  console.log("当前已铸造数量:", totalSupply.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
