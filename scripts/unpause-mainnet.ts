import { ethers } from 'hardhat';

async function main() {
  console.log('🚀 开始执行 unpause 操作...\n');

  const contractAddress = '0xc4e7a1FB1bdf370CD187a50E0B6B360BCB4C3BEC';

  // 获取签名者
  const [deployer] = await ethers.getSigners();
  console.log('📝 使用账户:', deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('💰 账户余额:', ethers.formatEther(balance), 'RBTC\n');

  // 连接到已部署的合约
  const SBT = await ethers.getContractFactory('Rootstock3000SBT');
  const sbt = SBT.attach(contractAddress);

  // 检查当前状态
  console.log('📊 当前合约状态:');
  const isPaused = await sbt.paused();
  const totalSupply = await sbt.totalSupply();
  const remainingSupply = await sbt.remainingSupply();

  console.log('  - 暂停状态:', isPaused ? '✋ 已暂停' : '✅ 运行中');
  console.log('  - 已铸造:', totalSupply.toString());
  console.log('  - 剩余:', remainingSupply.toString());
  console.log('  - 合约地址:', contractAddress);
  console.log('');

  if (!isPaused) {
    console.log('✅ 合约已经是运行状态，无需 unpause');
    return;
  }

  // 执行 unpause
  console.log('🔓 正在执行 unpause...');
  const tx = await sbt.unpause();
  console.log('📤 交易已发送:', tx.hash);

  console.log('⏳ 等待确认...');
  const receipt = await tx.wait();

  console.log('✅ Unpause 成功!');
  console.log('📦 区块号:', receipt?.blockNumber);
  console.log('⛽ Gas 使用:', receipt?.gasUsed.toString());
  console.log('');

  // 再次检查状态
  const newPausedState = await sbt.paused();
  console.log('📊 更新后状态:', newPausedState ? '✋ 已暂停' : '✅ 运行中');
  console.log('');
  console.log('🎉 用户现在可以开始铸造 SBT 了！');
  console.log('🌐 网站: https://rootstock-3000-sbt.vercel.app');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ 错误:', error);
    process.exit(1);
  });
