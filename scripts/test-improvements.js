/**
 * 测试脚本改进功能
 */

const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  RPC_URL: 'https://public-node.rsk.co',
  CONTRACT_ADDRESS: '0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188',
  WALLETS_FILE: path.join(__dirname, 'generated-wallets.json'),
  PROGRESS_FILE: path.join(__dirname, 'mint-progress.json'),
};

const CONTRACT_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

async function testBatchCheck() {
  console.log('🧪 测试批量检查功能...\n');

  const wallets = JSON.parse(fs.readFileSync(CONFIG.WALLETS_FILE, 'utf8'));
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  // 取前5个钱包测试
  const testWallets = wallets.slice(0, 5);

  console.log(`检查 ${testWallets.length} 个钱包...\n`);

  const startTime = Date.now();

  // 批量检查
  const promises = testWallets.map(w =>
    contract.balanceOf(w.address)
      .then(balance => ({ address: w.address, balance, hasSBT: balance > 0 }))
      .catch(error => ({ address: w.address, error: error.message }))
  );

  const results = await Promise.all(promises);
  const duration = Date.now() - startTime;

  results.forEach(r => {
    if (r.error) {
      console.log(`❌ ${r.address}: 错误 - ${r.error}`);
    } else {
      console.log(`${r.hasSBT ? '✅' : '⏳'} ${r.address}: ${r.balance} SBT`);
    }
  });

  console.log(`\n⏱️  批量检查耗时: ${duration}ms (平均 ${(duration / testWallets.length).toFixed(0)}ms/个)\n`);
}

async function testProgressFile() {
  console.log('🧪 测试进度文件功能...\n');

  const progressData = {
    phase: 'minting',
    lastProcessedIndex: 5,
    total: 26,
    timestamp: new Date().toISOString(),
    nextIndex: 6,
  };

  console.log('写入进度文件:', progressData);
  fs.writeFileSync(CONFIG.PROGRESS_FILE, JSON.stringify(progressData, null, 2), 'utf8');

  console.log('读取进度文件...');
  const loaded = JSON.parse(fs.readFileSync(CONFIG.PROGRESS_FILE, 'utf8'));
  console.log('读取成功:', loaded);

  console.log('\n✅ 进度文件测试通过\n');
}

async function testTokenIdExtraction() {
  console.log('🧪 测试Token ID提取功能...\n');

  // 使用一个已知的成功交易测试
  const wallets = JSON.parse(fs.readFileSync(CONFIG.WALLETS_FILE, 'utf8'));
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);

  const mintedWallet = wallets.find(w => w.minted && w.mintTxHash && !w.mintTxHash.startsWith('already_'));

  if (!mintedWallet) {
    console.log('⚠️  没有找到可测试的交易\n');
    return;
  }

  console.log(`测试交易: ${mintedWallet.mintTxHash}`);

  try {
    const receipt = await provider.getTransactionReceipt(mintedWallet.mintTxHash);

    console.log(`\n交易状态: ${receipt.status === 1 ? '✅ 成功' : '❌ 失败'}`);
    console.log(`Gas消耗: ${receipt.gasUsed.toString()}`);
    console.log(`日志数量: ${receipt.logs.length}`);

    // 查找Transfer事件
    const transferEvent = receipt.logs.find(log =>
      log.topics[0] === ethers.id('Transfer(address,address,uint256)')
    );

    if (transferEvent) {
      console.log(`\n✅ 找到Transfer事件`);
      console.log(`Topics数量: ${transferEvent.topics.length}`);

      if (transferEvent.topics.length >= 4) {
        const tokenId = ethers.toBigInt(transferEvent.topics[3]).toString();
        console.log(`🎫 Token ID: ${tokenId}`);
      }
    } else {
      console.log(`\n⚠️  未找到Transfer事件`);
    }

  } catch (error) {
    console.error(`❌ 错误: ${error.message}`);
  }

  console.log();
}

async function main() {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🧪 测试脚本改进功能                                      ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);

  try {
    await testBatchCheck();
    await testProgressFile();
    await testTokenIdExtraction();

    console.log('✅ 所有测试完成！\n');
  } catch (error) {
    console.error(`❌ 测试失败: ${error.message}\n`);
  }
}

main();
