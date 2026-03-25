/**
 * Rootstock 3000 SBT 自动铸造脚本
 *
 * 功能：
 * 1. 生成 30 个新钱包
 * 2. 从主钱包分发 rBTC 到 28 个钱包（随机金额 0.335-0.35 USD）
 * 3. 每 2 分钟自动铸造一个 SBT
 */

const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// ============================================
// 配置
// ============================================

const CONFIG = {
  // Rootstock RPC
  RPC_URL: 'https://public-node.rsk.co',

  // 合约地址
  CONTRACT_ADDRESS: '0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188',

  // RBTC 价格（USD），需要手动更新
  // 当前价格：2026-03-24 约 $69,000
  // 查询最新价格：https://www.coingecko.com/en/coins/rootstock
  RBTC_PRICE_USD: 69000, // 根据实际价格更新

  // 每个钱包获得的 rBTC（USD 范围）
  // 实际铸造需要约 $0.3 USD，设置为 $0.335-$0.35 确保成功（含约 12% 缓冲）
  MIN_AMOUNT_USD: 0.335,
  MAX_AMOUNT_USD: 0.35,

  // 铸造间隔（毫秒）
  MINT_INTERVAL_MS: 2 * 60 * 1000, // 2 分钟

  // 钱包数量
  TOTAL_WALLETS: 30,
  WALLETS_TO_FUND: 26,  // 调整为26个，适配10美元预算

  // 保存钱包信息的文件
  WALLETS_FILE: path.join(__dirname, 'generated-wallets.json'),

  // 进度文件
  PROGRESS_FILE: path.join(__dirname, 'mint-progress.json'),

  // 重试配置
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 30000, // 30秒

  // 最小余额要求（RBTC）
  MIN_BALANCE_REQUIRED: 0.000005, // ~$0.35
};

// 合约 ABI（mint 函数 + balanceOf 检查）
const CONTRACT_ABI = [
  {
    inputs: [],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

// ============================================
// 工具函数
// ============================================

/**
 * 生成随机 USD 金额（在指定范围内）
 */
function getRandomAmountUSD() {
  const min = CONFIG.MIN_AMOUNT_USD;
  const max = CONFIG.MAX_AMOUNT_USD;
  // 生成 3 位小数的随机金额
  return Math.floor((Math.random() * (max - min) + min) * 1000) / 1000;
}

/**
 * USD 转换为 RBTC
 */
function usdToRBTC(usd) {
  return usd / CONFIG.RBTC_PRICE_USD;
}

/**
 * 等待指定时间
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 格式化 RBTC 数量
 */
function formatRBTC(rbtc) {
  return `${rbtc.toFixed(8)} RBTC`;
}

/**
 * 保存进度
 */
function saveProgress(currentIndex, totalCount, phase = 'minting') {
  const progressData = {
    phase,
    lastProcessedIndex: currentIndex,
    total: totalCount,
    timestamp: new Date().toISOString(),
    nextIndex: currentIndex + 1,
  };

  fs.writeFileSync(
    CONFIG.PROGRESS_FILE,
    JSON.stringify(progressData, null, 2),
    'utf8'
  );
}

/**
 * 读取进度
 */
function loadProgress() {
  if (fs.existsSync(CONFIG.PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(CONFIG.PROGRESS_FILE, 'utf8'));
  }
  return null;
}

/**
 * 清除进度
 */
function clearProgress() {
  if (fs.existsSync(CONFIG.PROGRESS_FILE)) {
    fs.unlinkSync(CONFIG.PROGRESS_FILE);
  }
}

/**
 * 批量检查SBT所有权
 */
async function batchCheckSBTOwnership(wallets, provider) {
  console.log(`🔍 批量检查 ${wallets.length} 个钱包的SBT状态...`);

  const contract = new ethers.Contract(
    CONFIG.CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );

  const promises = wallets.map(w =>
    contract.balanceOf(w.address)
      .then(balance => ({ wallet: w, balance, hasSBT: balance > 0 }))
      .catch(error => {
        console.error(`  ⚠️  检查 ${w.address} 失败: ${error.message}`);
        return { wallet: w, balance: 0n, hasSBT: false, error: true };
      })
  );

  const results = await Promise.all(promises);

  const ownedCount = results.filter(r => r.hasSBT).length;
  console.log(`  ✅ 已拥有SBT: ${ownedCount} 个`);
  console.log(`  ⏳ 未拥有SBT: ${results.length - ownedCount} 个\n`);

  return results;
}

/**
 * 检查并显示当前 RBTC 价格
 */
async function checkRBTCPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=rootstock&vs_currencies=usd');
    const data = await response.json();
    const currentPrice = data.rootstock.usd;

    console.log(`\n💱 RBTC 价格检查:`);
    console.log(`  • 脚本配置价格: $${CONFIG.RBTC_PRICE_USD.toLocaleString()}`);
    console.log(`  • 当前市场价格: $${currentPrice.toLocaleString()}`);

    const diff = ((currentPrice - CONFIG.RBTC_PRICE_USD) / CONFIG.RBTC_PRICE_USD * 100).toFixed(1);

    if (Math.abs(parseFloat(diff)) > 10) {
      console.log(`  ⚠️  警告：价格差异 ${diff}%，建议更新配置中的 RBTC_PRICE_USD`);
    } else {
      console.log(`  ✓ 价格差异 ${diff}%，在合理范围内`);
    }

    return currentPrice;
  } catch (error) {
    console.log(`\n💱 无法获取实时价格，使用配置价格: $${CONFIG.RBTC_PRICE_USD.toLocaleString()}`);
    return CONFIG.RBTC_PRICE_USD;
  }
}

/**
 * 显示执行计划预估
 */
async function showEstimate(walletCount = CONFIG.WALLETS_TO_FUND) {
  console.log('\n📊 执行计划预估:\n');

  const currentPrice = await checkRBTCPrice();

  // 计算总需要的 USD
  let totalUSD = 0;
  for (let i = 0; i < walletCount; i++) {
    totalUSD += getRandomAmountUSD();
  }

  // 估算 gas 费用
  const estimatedGasUSD = 0.000021 * 28 * currentPrice; // 21000 gas per transfer
  totalUSD += estimatedGasUSD;

  const totalRBTC = totalUSD / currentPrice;

  console.log(`  分发目标:`);
  console.log(`    • 钱包数量: ${walletCount}`);
  console.log(`    • 每个钱包: ${CONFIG.MIN_AMOUNT_USD}-${CONFIG.MAX_AMOUNT_USD} USD`);
  console.log(`    • 分发总额: ~${totalUSD.toFixed(2)} USD (${formatRBTC(totalRBTC)})`);
  console.log(`    • Gas 费用: ~${estimatedGasUSD.toFixed(2)} USD`);
  console.log(`\n  铸造计划:`);
  console.log(`    • 铸造数量: ${walletCount}`);
  console.log(`    • 铸造间隔: ${CONFIG.MINT_INTERVAL_MS / 1000} 秒`);
  console.log(`    • 预计时长: ${(walletCount * CONFIG.MINT_INTERVAL_MS / 60000).toFixed(0)} 分钟`);
  console.log(`\n  建议准备: ${formatRBTC(totalRBTC * 1.2)} (含 20% 缓冲)\n`);
}

// ============================================
// 主要功能
// ============================================

/**
 * 步骤 1: 生成钱包
 */
async function generateWallets() {
  console.log('\n📝 步骤 1: 生成钱包...\n');

  const wallets = [];

  for (let i = 0; i < CONFIG.TOTAL_WALLETS; i++) {
    const wallet = ethers.Wallet.createRandom();
    wallets.push({
      index: i,
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
      funded: false,
      minted: false,
    });

    console.log(`  ✓ 钱包 ${i + 1}: ${wallet.address}`);
  }

  // 保存钱包信息
  fs.writeFileSync(
    CONFIG.WALLETS_FILE,
    JSON.stringify(wallets, null, 2),
    'utf8'
  );

  console.log(`\n✅ 已生成 ${CONFIG.TOTAL_WALLETS} 个钱包`);
  console.log(`📁 钱包信息已保存到: ${CONFIG.WALLETS_FILE}`);

  return wallets;
}

/**
 * 步骤 2: 分发 rBTC
 */
async function distributeRBTC(masterPrivateKey, wallets) {
  console.log('\n💸 步骤 2: 分发 rBTC...\n');

  // 连接到 Rootstock
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  const masterWallet = new ethers.Wallet(masterPrivateKey, provider);

  console.log(`📊 主钱包地址: ${masterWallet.address}`);

  // 检查主钱包余额
  const balance = await provider.getBalance(masterWallet.address);
  const balanceRBTC = parseFloat(ethers.formatEther(balance));
  console.log(`💰 主钱包余额: ${formatRBTC(balanceRBTC)}`);

  // 计算总需要的 rBTC
  let totalNeeded = 0;
  const distributions = [];

  for (let i = 0; i < CONFIG.WALLETS_TO_FUND; i++) {
    const amountUSD = getRandomAmountUSD();
    const amountRBTC = usdToRBTC(amountUSD);
    totalNeeded += amountRBTC;

    distributions.push({
      wallet: wallets[i],
      amountUSD,
      amountRBTC,
    });
  }

  // 估算 gas 费用（每笔交易约 21000 gas）
  const gasPrice = await provider.getFeeData();
  const estimatedGasCost = parseFloat(
    ethers.formatEther(gasPrice.gasPrice * BigInt(21000) * BigInt(CONFIG.WALLETS_TO_FUND))
  );

  totalNeeded += estimatedGasCost;

  console.log(`\n📊 分发计划:`);
  console.log(`  • 需要分发到 ${CONFIG.WALLETS_TO_FUND} 个钱包`);
  console.log(`  • 总 rBTC 需求: ${formatRBTC(totalNeeded)}`);
  console.log(`  • 估算 gas 费用: ${formatRBTC(estimatedGasCost)}`);

  if (balanceRBTC < totalNeeded) {
    throw new Error(
      `余额不足！需要 ${formatRBTC(totalNeeded)}，但只有 ${formatRBTC(balanceRBTC)}`
    );
  }

  console.log('\n🚀 开始分发...\n');

  // 执行分发
  for (let i = 0; i < distributions.length; i++) {
    const { wallet, amountUSD, amountRBTC } = distributions[i];

    console.log(
      `  [${i + 1}/${CONFIG.WALLETS_TO_FUND}] 向 ${wallet.address.substring(0, 10)}... 发送 ${formatRBTC(amountRBTC)} ($${amountUSD})`
    );

    try {
      // ethers.js 会自动使用网络当前最优 gas price (~0.026 Gwei)
      const tx = await masterWallet.sendTransaction({
        to: wallet.address,
        value: ethers.parseEther(amountRBTC.toFixed(18)),
        gasLimit: 21000,  // 明确设置 gas limit 避免估算开销
      });

      console.log(`      ⏳ 等待确认... (txHash: ${tx.hash})`);
      await tx.wait();

      wallet.funded = true;
      wallet.fundedAmount = amountRBTC;

      console.log(`      ✅ 已确认`);

      // 延迟 1 秒避免 nonce 冲突
      await sleep(1000);
    } catch (error) {
      console.error(`      ❌ 失败: ${error.message}`);
    }
  }

  // 保存更新后的钱包信息
  fs.writeFileSync(
    CONFIG.WALLETS_FILE,
    JSON.stringify(wallets, null, 2),
    'utf8'
  );

  console.log(`\n✅ rBTC 分发完成！`);

  return wallets;
}

/**
 * 带重试的铸造函数
 */
async function mintWithRetry(contract, walletAddress, maxRetries = CONFIG.MAX_RETRIES) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const tx = await contract.mint();
      return { success: true, tx };
    } catch (error) {
      // 已拥有SBT，不重试
      if (error.message.includes('0xddefae28') ||
          error.message.includes('Already minted') ||
          error.data === '0xddefae28') {
        return { success: false, error, alreadyMinted: true };
      }

      // 最后一次尝试失败
      if (attempt === maxRetries) {
        return { success: false, error, alreadyMinted: false };
      }

      console.log(`  ⚠️  尝试 ${attempt}/${maxRetries} 失败: ${error.message}`);
      console.log(`  ⏳ ${CONFIG.RETRY_DELAY_MS / 1000}秒后重试...`);
      await sleep(CONFIG.RETRY_DELAY_MS);
    }
  }
}

/**
 * 生成成本统计报表
 */
async function generateCostReport(wallets, provider) {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`💰 成本统计报表`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  let totalGasUsed = 0n;
  let totalGasCostRBTC = 0;
  let successfulMints = 0;

  for (const w of wallets.filter(w => w.minted)) {
    if (w.mintTxHash && !w.mintTxHash.startsWith('already_') && !w.mintTxHash.startsWith('skipped_')) {
      try {
        const receipt = await provider.getTransactionReceipt(w.mintTxHash);
        if (receipt) {
          const gasUsed = receipt.gasUsed;
          const gasPrice = receipt.gasPrice || 0n;
          const gasCost = gasUsed * gasPrice;

          totalGasUsed += gasUsed;
          totalGasCostRBTC += parseFloat(ethers.formatEther(gasCost));
          successfulMints++;
        }
      } catch (error) {
        console.log(`  ⚠️  无法获取交易 ${w.mintTxHash} 的收据`);
      }
    }
  }

  const totalGasCostUSD = totalGasCostRBTC * CONFIG.RBTC_PRICE_USD;
  const avgGasPerMint = successfulMints > 0 ? totalGasUsed / BigInt(successfulMints) : 0n;
  const avgCostPerMint = successfulMints > 0 ? totalGasCostRBTC / successfulMints : 0;

  console.log(`📊 铸造交易统计:`);
  console.log(`  🎫 成功铸造: ${successfulMints} 个`);
  console.log(`  ⛽ 总Gas消耗: ${totalGasUsed.toString()}`);
  console.log(`  💵 总Gas费用: ${formatRBTC(totalGasCostRBTC)} (~$${totalGasCostUSD.toFixed(2)})`);
  console.log(`  📊 平均Gas/笔: ${avgGasPerMint.toString()}`);
  console.log(`  💰 平均成本/笔: ${formatRBTC(avgCostPerMint)} (~$${(avgCostPerMint * CONFIG.RBTC_PRICE_USD).toFixed(3)})`);

  // 计算分发成本
  const fundedWallets = wallets.filter(w => w.funded && w.fundedAmount);
  const totalDistributed = fundedWallets.reduce((sum, w) => sum + (w.fundedAmount || 0), 0);

  console.log(`\n📊 分发统计:`);
  console.log(`  💸 已分发钱包: ${fundedWallets.length} 个`);
  console.log(`  💵 总分发金额: ${formatRBTC(totalDistributed)} (~$${(totalDistributed * CONFIG.RBTC_PRICE_USD).toFixed(2)})`);

  console.log(`\n📊 总成本:`);
  const grandTotal = totalGasCostRBTC + totalDistributed;
  console.log(`  💰 总花费: ${formatRBTC(grandTotal)} (~$${(grandTotal * CONFIG.RBTC_PRICE_USD).toFixed(2)})`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

/**
 * 步骤 3: 自动铸造 SBT
 */
async function autoMint(wallets) {
  console.log('\n🎨 步骤 3: 自动铸造 SBT...\n');

  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);

  // 筛选出已获得资金的钱包
  let fundedWallets = wallets.filter(w => w.funded && !w.minted);

  // 检查是否有未完成的进度
  const progress = loadProgress();
  let startIndex = 0;

  if (progress && progress.phase === 'minting') {
    console.log(`📍 发现未完成任务，从钱包 ${progress.nextIndex} 继续...\n`);
    startIndex = progress.nextIndex;
    // 过滤掉已处理的钱包
    fundedWallets = fundedWallets.slice(startIndex);
  }

  console.log(`📊 待铸造钱包数量: ${fundedWallets.length}`);
  console.log(`⏱️  铸造间隔: ${CONFIG.MINT_INTERVAL_MS / 1000} 秒`);
  console.log(`🕐 预计完成时间: ${(fundedWallets.length * CONFIG.MINT_INTERVAL_MS / 60000).toFixed(1)} 分钟\n`);

  // 🆕 批量检查SBT状态
  const sbtCheckResults = await batchCheckSBTOwnership(fundedWallets, provider);

  for (let i = 0; i < fundedWallets.length; i++) {
    const wallet = fundedWallets[i];
    const sbtCheckResult = sbtCheckResults[i];

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`🎯 [${i + 1}/${fundedWallets.length}] 钱包 ${wallet.index + 1}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📍 地址: ${wallet.address}`);

    try {
      // 🆕 如果批量检查已显示拥有SBT，直接跳过
      if (sbtCheckResult.hasSBT) {
        console.log(`✅ 该钱包已拥有 ${sbtCheckResult.balance} 个SBT（批量检查），跳过铸造`);

        wallet.minted = true;
        if (!wallet.mintTxHash || wallet.mintTxHash === 'skipped_insufficient_balance') {
          wallet.mintTxHash = 'already_minted_on_chain';
        }
        wallet.mintTime = wallet.mintTime || new Date().toISOString();

        fs.writeFileSync(CONFIG.WALLETS_FILE, JSON.stringify(wallets, null, 2), 'utf8');
        saveProgress(startIndex + i, fundedWallets.length);
        console.log(`📝 已更新本地记录\n`);
        continue;
      }

      // 创建钱包实例
      const walletInstance = new ethers.Wallet(wallet.privateKey, provider);

      // 🆕 余额预检查
      const balance = await provider.getBalance(wallet.address);
      const balanceRBTC = parseFloat(ethers.formatEther(balance));
      console.log(`💰 RBTC余额: ${formatRBTC(balanceRBTC)}`);

      const minRequired = CONFIG.MIN_BALANCE_REQUIRED;
      if (balanceRBTC < minRequired) {
        console.log(`⚠️  余额不足！需要至少 ${formatRBTC(minRequired)}，当前仅 ${formatRBTC(balanceRBTC)}`);
        console.log(`💡 跳过此钱包，继续下一个...\n`);

        wallet.mintTxHash = 'skipped_insufficient_balance';
        fs.writeFileSync(CONFIG.WALLETS_FILE, JSON.stringify(wallets, null, 2), 'utf8');
        saveProgress(startIndex + i, fundedWallets.length);
        continue;
      }

      // 创建合约实例
      const contract = new ethers.Contract(
        CONFIG.CONTRACT_ADDRESS,
        CONTRACT_ABI,
        walletInstance
      );

      console.log(`✅ 余额充足，开始铸造...`);

      // 🆕 使用重试机制铸造
      const result = await mintWithRetry(contract, wallet.address);

      if (!result.success) {
        if (result.alreadyMinted) {
          console.log(`ℹ️  该钱包已经铸造过了（合约拒绝）`);
          wallet.minted = true;
          wallet.mintTxHash = wallet.mintTxHash || 'already_minted_contract_error';
          wallet.mintTime = wallet.mintTime || new Date().toISOString();
        } else {
          console.error(`❌ 铸造失败（已重试${CONFIG.MAX_RETRIES}次）: ${result.error.message}`);
        }

        fs.writeFileSync(CONFIG.WALLETS_FILE, JSON.stringify(wallets, null, 2), 'utf8');
        saveProgress(startIndex + i, fundedWallets.length);
        continue;
      }

      const tx = result.tx;
      console.log(`📝 交易哈希: ${tx.hash}`);
      console.log(`⏳ 等待确认...`);

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        // 🆕 提取Token ID
        let tokenId = null;
        try {
          // ERC-721 Transfer事件: Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
          const transferEvent = receipt.logs.find(log =>
            log.topics[0] === ethers.id('Transfer(address,address,uint256)')
          );

          if (transferEvent && transferEvent.topics.length >= 4) {
            tokenId = ethers.toBigInt(transferEvent.topics[3]).toString();
            console.log(`🎫 获得 Token ID: ${tokenId}`);
          }
        } catch (error) {
          console.log(`⚠️  无法提取Token ID: ${error.message}`);
        }

        wallet.minted = true;
        wallet.mintTxHash = tx.hash;
        wallet.mintTime = new Date().toISOString();
        if (tokenId) {
          wallet.tokenId = tokenId;
        }

        console.log(`✅ 铸造成功！`);
        console.log(`🔗 查看交易: https://rootstock.blockscout.com/tx/${tx.hash}`);

        fs.writeFileSync(CONFIG.WALLETS_FILE, JSON.stringify(wallets, null, 2), 'utf8');
        saveProgress(startIndex + i, fundedWallets.length);
      } else {
        console.log(`❌ 铸造失败 (receipt status = 0)`);
      }

    } catch (error) {
      console.error(`❌ 未预期的错误: ${error.message}`);
      saveProgress(startIndex + i, fundedWallets.length);
    }

    // 如果不是最后一个，等待指定时间
    if (i < fundedWallets.length - 1) {
      const waitSeconds = CONFIG.MINT_INTERVAL_MS / 1000;
      console.log(`\n⏱️  等待 ${waitSeconds} 秒后继续...`);
      await sleep(CONFIG.MINT_INTERVAL_MS);
    }
  }

  // 🆕 清除进度文件
  clearProgress();

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ 所有铸造任务完成！`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  // 统计结果
  const successCount = wallets.filter(w => w.minted).length;
  const totalProcessed = fundedWallets.length;
  const failedCount = totalProcessed - fundedWallets.filter((w, i) => sbtCheckResults[i].hasSBT || w.minted).length;

  console.log(`\n📊 铸造统计:`);
  console.log(`  ✅ 成功: ${successCount} 个`);
  if (failedCount > 0) {
    console.log(`  ❌ 失败: ${failedCount} 个`);
  }
  console.log(`  📈 成功率: ${((successCount / totalProcessed) * 100).toFixed(1)}%`);
  console.log(`\n🔗 查看合约: https://rootstock.blockscout.com/token/${CONFIG.CONTRACT_ADDRESS}\n`);

  // 🆕 生成成本报表
  await generateCostReport(wallets, provider);
}

// ============================================
// 主程序
// ============================================

async function main() {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🎨 Rootstock 3000 SBT 自动铸造脚本                      ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);

  // 检查命令行参数
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log('使用方法:');
    console.log('  node auto-mint.js generate              # 生成钱包');
    console.log('  node auto-mint.js distribute <私钥>      # 分发 rBTC');
    console.log('  node auto-mint.js mint                  # 自动铸造');
    console.log('  node auto-mint.js all <私钥>            # 执行所有步骤\n');
    return;
  }

  try {
    let wallets;

    switch (command) {
      case 'generate':
        await showEstimate();
        wallets = await generateWallets();
        break;

      case 'distribute':
        const masterPrivateKey = args[1];
        if (!masterPrivateKey) {
          throw new Error('请提供主钱包私钥: node auto-mint.js distribute <私钥>');
        }

        // 读取钱包文件
        if (!fs.existsSync(CONFIG.WALLETS_FILE)) {
          throw new Error('钱包文件不存在，请先运行 generate 命令');
        }
        wallets = JSON.parse(fs.readFileSync(CONFIG.WALLETS_FILE, 'utf8'));

        await distributeRBTC(masterPrivateKey, wallets);
        break;

      case 'mint':
        // 读取钱包文件
        if (!fs.existsSync(CONFIG.WALLETS_FILE)) {
          throw new Error('钱包文件不存在，请先运行 generate 和 distribute 命令');
        }
        wallets = JSON.parse(fs.readFileSync(CONFIG.WALLETS_FILE, 'utf8'));

        await autoMint(wallets);
        break;

      case 'all':
        const masterKey = args[1];
        if (!masterKey) {
          throw new Error('请提供主钱包私钥: node auto-mint.js all <私钥>');
        }

        // 显示预估
        await showEstimate();
        await sleep(2000);

        // 执行所有步骤
        wallets = await generateWallets();
        await sleep(2000);
        await distributeRBTC(masterKey, wallets);
        await sleep(2000);
        await autoMint(wallets);
        break;

      default:
        console.error(`❌ 未知命令: ${command}`);
    }

    console.log('\n🎉 完成！\n');

  } catch (error) {
    console.error(`\n❌ 错误: ${error.message}\n`);
    process.exit(1);
  }
}

// 运行
main();
