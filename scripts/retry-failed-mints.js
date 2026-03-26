/**
 * 重試失敗的鑄造 - 降低餘額門檻
 *
 * 目標：對餘額在 0.00000450 - 0.00000500 RBTC 的錢包重新鑄造
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

  // 降低餘額門檻（從 0.000005 降到 0.00000450）
  MIN_BALANCE_REQUIRED: 0.0000045, // ~$0.31 (實際平均成本 $0.30)

  MINT_INTERVAL_MS: 2 * 60 * 1000, // 2 分鐘
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 30000,

  WALLETS_FILE: path.join(__dirname, 'generated-wallets.json'),
  FAILED_ADDRESSES_FILE: '/tmp/failed-wallets.txt',
};

// 合約 ABI
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
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];

// ============================================
// 工具函數
// ============================================

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatRBTC(rbtc) {
  return `${rbtc.toFixed(8)} RBTC`;
}

// ============================================
// 主要功能
// ============================================

/**
 * 鑄造單個 SBT
 */
async function mintSBT(wallet, provider, retryCount = 0) {
  try {
    const signer = new ethers.Wallet(wallet.privateKey, provider);
    const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // 檢查餘額
    const balance = await provider.getBalance(wallet.address);
    const balanceRBTC = parseFloat(ethers.formatEther(balance));

    console.log(`💰 RBTC余额: ${formatRBTC(balanceRBTC)}`);

    if (balanceRBTC < CONFIG.MIN_BALANCE_REQUIRED) {
      console.log(`⚠️  余额不足！需要至少 ${formatRBTC(CONFIG.MIN_BALANCE_REQUIRED)}，当前仅 ${formatRBTC(balanceRBTC)}`);
      console.log(`💡 跳过此钱包，继续下一个...\n`);
      return { success: false, reason: 'insufficient_balance' };
    }

    console.log(`✅ 余额充足，开始铸造...`);

    // 估算 Gas（使用保守的固定值，基於歷史平均）
    // 歷史平均: 164680，我們使用 165000 即可
    const gasLimit = 165000n;

    // 獲取當前 Gas Price 並使用最低值
    const currentGasPrice = await provider.getFeeData();
    const minGasPrice = 65164000n; // Rootstock 最低 Gas Price (~0.065 Gwei)
    const gasPrice = currentGasPrice.gasPrice ?
      (currentGasPrice.gasPrice < minGasPrice ? currentGasPrice.gasPrice : minGasPrice) :
      minGasPrice;

    console.log(`⛽ 使用最低 Gas Price: ${ethers.formatUnits(gasPrice, 'gwei')} Gwei`);
    const estimatedCost = gasLimit * gasPrice;
    console.log(`💵 预计费用: ${formatRBTC(parseFloat(ethers.formatEther(estimatedCost)))}`);

    // 執行鑄造（使用最低 Gas Price）
    const tx = await contract.mint({ gasLimit, gasPrice });
    console.log(`📝 交易哈希: ${tx.hash}`);
    console.log(`⏳ 等待确认...`);

    const receipt = await tx.wait();

    // 獲取 Token ID
    const sbtBalance = await contract.balanceOf(wallet.address);
    const tokenId = sbtBalance > 0n ? sbtBalance.toString() : 'Unknown';

    console.log(`🎫 获得 Token ID: ${tokenId}`);
    console.log(`✅ 铸造成功！`);
    console.log(`🔗 查看交易: https://rootstock.blockscout.com/tx/${tx.hash}\n`);

    return {
      success: true,
      txHash: tx.hash,
      tokenId,
      gasUsed: receipt.gasUsed.toString(),
      gasPrice: receipt.gasPrice ? receipt.gasPrice.toString() : 'N/A',
    };

  } catch (error) {
    console.log(`❌ 错误: ${error.message}`);

    // 如果是用戶已鑄造，不重試
    if (error.message.includes('Already minted')) {
      console.log(`💡 该钱包已铸造过，跳过...\n`);
      return { success: false, reason: 'already_minted' };
    }

    // 重試邏輯
    if (retryCount < CONFIG.MAX_RETRIES) {
      console.log(`🔄 ${CONFIG.RETRY_DELAY_MS / 1000} 秒后重试 (${retryCount + 1}/${CONFIG.MAX_RETRIES})...\n`);
      await sleep(CONFIG.RETRY_DELAY_MS);
      return mintSBT(wallet, provider, retryCount + 1);
    }

    console.log(`❌ 已达到最大重试次数，放弃此钱包\n`);
    return { success: false, reason: 'error', error: error.message };
  }
}

/**
 * 主函數
 */
async function main() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║                                                           ║');
  console.log('║   🔄 重試失敗的鑄造（降低餘額門檻）                        ║');
  console.log('║                                                           ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');

  // 初始化 Provider
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);

  // 讀取所有錢包
  const allWallets = JSON.parse(fs.readFileSync(CONFIG.WALLETS_FILE, 'utf8'));
  console.log(`📂 已加载 ${allWallets.length} 个钱包\n`);

  // 讀取失敗地址列表
  const failedAddresses = fs.readFileSync(CONFIG.FAILED_ADDRESSES_FILE, 'utf8')
    .split('\n')
    .filter(addr => addr.trim().length > 0)
    .map(addr => addr.trim().toLowerCase());

  console.log(`📋 失败钱包数量: ${failedAddresses.length}\n`);

  // 過濾出失敗的錢包
  const walletsToRetry = allWallets.filter(w =>
    failedAddresses.includes(w.address.toLowerCase())
  );

  console.log(`🎯 待重试钱包: ${walletsToRetry.length} 个`);
  console.log(`⏱️  铸造间隔: ${CONFIG.MINT_INTERVAL_MS / 1000} 秒`);
  console.log(`🕐 预计完成时间: ${(walletsToRetry.length * CONFIG.MINT_INTERVAL_MS / 1000 / 60).toFixed(1)} 分钟\n`);
  console.log(`💰 最低余额要求: ${formatRBTC(CONFIG.MIN_BALANCE_REQUIRED)} (已降低)\n`);

  // 統計
  let successCount = 0;
  let failedCount = 0;
  let totalGasUsed = 0n;
  let transactions = [];

  // 開始鑄造
  for (let i = 0; i < walletsToRetry.length; i++) {
    const wallet = walletsToRetry[i];

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🎯 [${i + 1}/${walletsToRetry.length}] 钱包 ${i + 1}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📍 地址: ${wallet.address}`);

    const result = await mintSBT(wallet, provider);

    if (result.success) {
      successCount++;
      totalGasUsed += BigInt(result.gasUsed);
      transactions.push({
        address: wallet.address,
        txHash: result.txHash,
        tokenId: result.tokenId,
        gasUsed: result.gasUsed,
      });
    } else {
      failedCount++;
    }

    // 等待間隔（最後一個不等待）
    if (i < walletsToRetry.length - 1) {
      console.log(`⏱️  等待 ${CONFIG.MINT_INTERVAL_MS / 1000} 秒后继续...\n`);
      await sleep(CONFIG.MINT_INTERVAL_MS);
    }
  }

  // 最終報告
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ 所有重试任务完成！');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('📊 铸造统计:');
  console.log(`  ✅ 成功: ${successCount} 个`);
  console.log(`  ❌ 失败: ${failedCount} 个`);
  console.log(`  📈 成功率: ${((successCount / walletsToRetry.length) * 100).toFixed(1)}%\n`);

  if (successCount > 0) {
    const avgGasUsed = Number(totalGasUsed) / successCount;
    console.log('⛽ Gas 统计:');
    console.log(`  • 总Gas消耗: ${totalGasUsed.toString()}`);
    console.log(`  • 平均Gas/笔: ${Math.round(avgGasUsed)}\n`);
  }

  console.log('🔗 查看合约: https://rootstock.blockscout.com/token/0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188\n');
  console.log('🎉 完成！');
}

// 執行
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ 脚本执行失败:', error);
    process.exit(1);
  });
