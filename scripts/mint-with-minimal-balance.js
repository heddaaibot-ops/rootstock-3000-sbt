/**
 * 使用最低余额铸造 SBT（已升级：三层链上验证防护）
 *
 * 策略：使用绝对最低的 Gas Price 和优化的 Gas Limit
 * 目标：让余额在 0.000004855 - 0.000004985 RBTC 的钱包也能成功铸造
 *
 * 🔥 三层链上验证防护机制：
 * 1. 第一层：catch 块内也查询链上状态（防止脚本错误导致漏判）
 * 2. 第二层：每次铸造后立即验证链上状态（确保实时准确）
 * 3. 第三层：最终统计前全量对账（100% 保证统计准确）
 *
 * 核心原则：链上数据是唯一真相（Source of Truth）
 */

const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// ============================================
// 配置
// ============================================

const CONFIG = {
  RPC_URL: 'https://public-node.rsk.co',
  CONTRACT_ADDRESS: '0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188',

  // 超低余额门槛（允许 0.0000048 RBTC 以上的钱包尝试铸造）
  MIN_BALANCE_REQUIRED: 0.0000048,

  MINT_INTERVAL_MS: 2 * 60 * 1000, // 2 分钟
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 30000,

  WALLETS_FILE: path.join(__dirname, 'generated-wallets.json'),
};

// 合约 ABI
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatRBTC(rbtc) {
  return `${rbtc.toFixed(11)} RBTC`;
}

function formatUSD(rbtc, price = 69000) {
  return `$${(rbtc * price).toFixed(4)} USD`;
}

// ============================================
// 主要功能
// ============================================

/**
 * 铸造单个 SBT - 使用绝对最低 Gas
 */
async function mintSBT(wallet, provider, retryCount = 0) {
  try {
    const signer = new ethers.Wallet(wallet.privateKey, provider);
    const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // 检查余额
    const balance = await provider.getBalance(wallet.address);
    const balanceRBTC = parseFloat(ethers.formatEther(balance));

    console.log(`💰 当前余额: ${formatRBTC(balanceRBTC)} (${formatUSD(balanceRBTC)})`);

    if (balanceRBTC < CONFIG.MIN_BALANCE_REQUIRED) {
      console.log(`⚠️  余额过低！需要至少 ${formatRBTC(CONFIG.MIN_BALANCE_REQUIRED)}`);
      console.log(`💡 跳过此钱包\n`);
      return { success: false, reason: 'insufficient_balance' };
    }

    console.log(`✅ 开始铸造（超低 Gas 模式）...`);

    // 🔥 关键优化 1: 使用安全的 Gas Limit
    // 历史数据显示平均成功: 164,680 gas
    // 我们使用 165,000 gas（安全值，留有余地）
    const gasLimit = 165000n;

    // 🔥 关键优化 2: 使用 Rootstock 绝对最低 Gas Price
    // Rootstock 最低: 0.06 Gwei = 60,000,000 wei
    // 我们尝试使用网络当前最低价，但不低于 60,000,000
    const feeData = await provider.getFeeData();
    const networkGasPrice = feeData.gasPrice || 0n;

    // Rootstock 绝对最低 Gas Price
    const absoluteMinGasPrice = 60000000n; // 0.06 Gwei

    // 使用网络价格和绝对最低价中的较小值
    const gasPrice = networkGasPrice > 0n && networkGasPrice < absoluteMinGasPrice
      ? networkGasPrice
      : absoluteMinGasPrice;

    const gasPriceGwei = ethers.formatUnits(gasPrice, 'gwei');
    console.log(`⛽ Gas Price: ${gasPriceGwei} Gwei (绝对最低)`);
    console.log(`📊 Gas Limit: ${gasLimit.toString()}`);

    const estimatedCost = gasLimit * gasPrice;
    const estimatedCostRBTC = parseFloat(ethers.formatEther(estimatedCost));

    console.log(`💵 预计成本: ${formatRBTC(estimatedCostRBTC)} (${formatUSD(estimatedCostRBTC)})`);
    console.log(`💰 剩余余额: ${formatRBTC(balanceRBTC - estimatedCostRBTC)}\n`);

    // 🔥 关键优化 3: 确保余额够用（留 1% 缓冲）
    if (balanceRBTC < estimatedCostRBTC * 1.01) {
      console.log(`⚠️  预计成本 ${formatRBTC(estimatedCostRBTC)} 超过余额！`);
      console.log(`💡 跳过此钱包\n`);
      return { success: false, reason: 'estimated_cost_too_high' };
    }

    // 执行铸造
    console.log(`🚀 发送交易...`);
    const tx = await contract.mint({
      gasLimit,
      gasPrice,
      // 不设置 nonce 让 ethers 自动处理
    });

    console.log(`📝 交易哈希: ${tx.hash}`);
    console.log(`⏳ 等待确认...`);

    const receipt = await tx.wait();

    // 获取实际 Gas 消耗
    const actualGasUsed = receipt.gasUsed;
    const actualGasPrice = receipt.gasPrice || gasPrice;
    const actualCost = actualGasUsed * actualGasPrice;
    const actualCostRBTC = parseFloat(ethers.formatEther(actualCost));

    console.log(`✅ 铸造成功！`);
    console.log(`⛽ 实际 Gas 消耗: ${actualGasUsed.toString()}`);
    console.log(`💵 实际成本: ${formatRBTC(actualCostRBTC)} (${formatUSD(actualCostRBTC)})`);

    // 获取 Token ID
    const sbtBalance = await contract.balanceOf(wallet.address);
    const tokenId = sbtBalance > 0n ? sbtBalance.toString() : 'Unknown';
    console.log(`🎫 Token ID: ${tokenId}`);

    console.log(`🔗 查看交易: https://rootstock.blockscout.com/tx/${tx.hash}\n`);

    return {
      success: true,
      txHash: tx.hash,
      tokenId,
      gasUsed: actualGasUsed.toString(),
      gasPrice: actualGasPrice.toString(),
      actualCost: actualCostRBTC,
    };

  } catch (error) {
    console.log(`❌ 发生错误: ${error.message}`);

    // 检查是否已铸造
    if (error.message.includes('Already minted') ||
        error.message.includes('0xddefae28')) {
      console.log(`💡 该钱包已铸造过\n`);
      return { success: false, reason: 'already_minted' };
    }

    // 🔥 第一层防护：无论是否有错误，都要查询链上真实状态
    console.log(`🔍 查询链上真实状态...`);
    try {
      const signer = new ethers.Wallet(wallet.privateKey, provider);
      const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const sbtBalance = await contract.balanceOf(wallet.address);
      const actuallyMinted = sbtBalance > 0n;

      if (actuallyMinted) {
        console.log(`✅ 链上验证：该钱包实际已成功铸造！`);
        console.log(`🎫 Token ID: ${sbtBalance.toString()}\n`);
        return {
          success: true,  // ⬅️ 改为 true！
          txHash: 'verified_on_chain',
          tokenId: sbtBalance.toString(),
          verifiedOnChain: true,
        };
      }
    } catch (verifyError) {
      console.log(`⚠️  链上验证失败: ${verifyError.message}`);
    }

    // 重试逻辑
    if (retryCount < CONFIG.MAX_RETRIES) {
      console.log(`🔄 ${CONFIG.RETRY_DELAY_MS / 1000} 秒后重试 (${retryCount + 1}/${CONFIG.MAX_RETRIES})...\n`);
      await sleep(CONFIG.RETRY_DELAY_MS);
      return mintSBT(wallet, provider, retryCount + 1);
    }

    console.log(`❌ 链上验证：确实未铸造，已达到最大重试次数\n`);
    return { success: false, reason: 'error', error: error.message };
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║                                                           ║');
  console.log('║   🔥 超低余额铸造模式（绝对最低 Gas）                     ║');
  console.log('║                                                           ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');

  // 初始化 Provider
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);

  // 读取所有钱包
  const allWallets = JSON.parse(fs.readFileSync(CONFIG.WALLETS_FILE, 'utf8'));
  console.log(`📂 已加载 ${allWallets.length} 个钱包\n`);

  // 筛选：已分发但未铸造的钱包
  const walletsToMint = allWallets.filter(w =>
    w.funded &&
    !w.minted &&
    w.fundedAmount >= CONFIG.MIN_BALANCE_REQUIRED
  );

  console.log(`🎯 符合条件的钱包: ${walletsToMint.length} 个`);
  console.log(`📊 余额门槛: ≥ ${formatRBTC(CONFIG.MIN_BALANCE_REQUIRED)}`);
  console.log(`⏱️  铸造间隔: ${CONFIG.MINT_INTERVAL_MS / 1000} 秒`);
  console.log(`🕐 预计完成时间: ${(walletsToMint.length * CONFIG.MINT_INTERVAL_MS / 1000 / 60).toFixed(1)} 分钟\n`);

  if (walletsToMint.length === 0) {
    console.log('⚠️  没有符合条件的钱包！');
    return;
  }

  // 显示余额范围
  const amounts = walletsToMint.map(w => w.fundedAmount);
  const minAmount = Math.min(...amounts);
  const maxAmount = Math.max(...amounts);
  console.log(`💰 余额范围: ${formatRBTC(minAmount)} - ${formatRBTC(maxAmount)}\n`);

  // 统计
  let successCount = 0;
  let failedCount = 0;
  let totalGasUsed = 0n;
  let totalCost = 0;
  const transactions = [];

  // 开始铸造
  for (let i = 0; i < walletsToMint.length; i++) {
    const wallet = walletsToMint[i];

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🎯 [${i + 1}/${walletsToMint.length}] 钱包 #${wallet.index + 1}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📍 地址: ${wallet.address}`);
    console.log(`💵 分发金额: ${formatRBTC(wallet.fundedAmount)}\n`);

    const result = await mintSBT(wallet, provider);

    // 🔥 第二层防护：不管 result.success 是什么，都要验证链上状态
    console.log(`🔍 验证钱包 #${wallet.index + 1} 的链上状态...`);
    const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const sbtBalance = await contract.balanceOf(wallet.address);
    const actuallyMinted = sbtBalance > 0n;

    if (actuallyMinted) {
      console.log(`✅ 链上确认：已铸造 (Token ID: ${sbtBalance.toString()})\n`);
      successCount++;
      wallet.minted = true;
      wallet.mintTxHash = result.txHash || 'verified_on_chain';
      wallet.mintTime = new Date().toISOString();
      wallet.tokenId = sbtBalance.toString();

      if (result.gasUsed) {
        totalGasUsed += BigInt(result.gasUsed);
        totalCost += result.actualCost;

        transactions.push({
          address: wallet.address,
          txHash: result.txHash,
          tokenId: result.tokenId,
          gasUsed: result.gasUsed,
          cost: result.actualCost,
        });
      }
    } else {
      console.log(`❌ 链上确认：未铸造\n`);
      failedCount++;
      wallet.minted = false;
      wallet.mintTxHash = `failed_${result.reason}`;
    }

    // 保存进度
    fs.writeFileSync(CONFIG.WALLETS_FILE, JSON.stringify(allWallets, null, 2));

    // 等待间隔（最后一个不需要等待）
    if (i < walletsToMint.length - 1) {
      console.log(`⏱️  等待 ${CONFIG.MINT_INTERVAL_MS / 1000} 秒后继续...\n`);
      await sleep(CONFIG.MINT_INTERVAL_MS);
    }
  }

  // 🔥 第三层防护：最终统计前，全量验证所有钱包的链上状态
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔍 最终验证：查询所有钱包的链上真实状态...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  let correctedCount = 0;

  for (const wallet of walletsToMint) {
    const sbtBalance = await contract.balanceOf(wallet.address);
    const actuallyMinted = sbtBalance > 0n;

    // 发现状态不一致，纠正它
    if (actuallyMinted !== wallet.minted) {
      console.log(`⚠️  钱包 #${wallet.index + 1} (${wallet.address}) 状态不一致，纠正为：${actuallyMinted ? '✅ 已铸造' : '❌ 未铸造'}`);
      wallet.minted = actuallyMinted;
      if (actuallyMinted) {
        wallet.tokenId = sbtBalance.toString();
        wallet.mintTxHash = wallet.mintTxHash || 'verified_on_chain';
        wallet.mintTime = wallet.mintTime || new Date().toISOString();
      }
      correctedCount++;
    }

    await sleep(500); // 避免请求过快
  }

  // 重新统计（基于链上验证后的真实数据）
  const finalMinted = walletsToMint.filter(w => w.minted).length;
  const finalUnminted = walletsToMint.length - finalMinted;

  console.log(`\n✅ 验证完成！纠正了 ${correctedCount} 个钱包的状态\n`);

  // 保存最终验证后的数据
  fs.writeFileSync(CONFIG.WALLETS_FILE, JSON.stringify(allWallets, null, 2));

  // 最终统计
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ 铸造完成！（已链上验证）');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('📊 最终统计（链上真实数据）:');
  console.log(`  ✅ 已铸造: ${finalMinted} 个`);
  console.log(`  ❌ 未铸造: ${finalUnminted} 个`);
  console.log(`  📈 成功率: ${((finalMinted / walletsToMint.length) * 100).toFixed(1)}%\n`);

  if (successCount > 0) {
    const avgGas = Number(totalGasUsed) / successCount;
    const avgCost = totalCost / successCount;

    console.log('💰 成本统计:');
    console.log(`  ⛽ 总 Gas 消耗: ${totalGasUsed.toString()}`);
    console.log(`  💵 总成本: ${formatRBTC(totalCost)} (${formatUSD(totalCost)})`);
    console.log(`  📊 平均 Gas/笔: ${avgGas.toFixed(0)}`);
    console.log(`  💰 平均成本/笔: ${formatRBTC(avgCost)} (${formatUSD(avgCost)})\n`);
  }

  console.log('🔗 查看合约: https://rootstock.blockscout.com/token/0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188\n');
}

// 运行
main().catch(console.error);
