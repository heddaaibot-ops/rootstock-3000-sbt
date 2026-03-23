const Arweave = require('arweave');
const fs = require('fs');
const path = require('path');

async function uploadToArweave() {
  try {
    console.log('🌐 准备上传到 Arweave（永久存储）...\n');

    // 初始化 Arweave
    const arweave = Arweave.init({
      host: 'arweave.net',
      port: 443,
      protocol: 'https'
    });

    console.log('📁 读取 metadata 文件夹...');
    const metadataDir = path.join(__dirname, '../metadata-identical');

    // 创建文件列表
    const files = {};
    for (let i = 0; i < 10000; i++) {
      const filePath = path.join(metadataDir, `${i}.json`);
      const content = fs.readFileSync(filePath, 'utf8');
      files[`${i}.json`] = content;

      if ((i + 1) % 1000 === 0) {
        console.log(`  已读取 ${i + 1} / 10000 文件...`);
      }
    }

    console.log('\n💰 估算成本...');

    // 计算总大小
    const totalSize = Object.values(files).reduce((sum, content) => sum + content.length, 0);
    console.log(`  总大小: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);

    // 估算价格（需要 AR tokens）
    const price = await arweave.transactions.getPrice(totalSize);
    const arPrice = arweave.ar.winstonToAr(price);

    console.log(`  需要 AR tokens: ${arPrice} AR`);
    console.log(`  （约 $${(parseFloat(arPrice) * 10).toFixed(2)} USD，假设 1 AR = $10）`);
    console.log('\n⚠️  你需要 Arweave 钱包和 AR tokens 才能上传');
    console.log('   访问: https://arweave.app/ 创建钱包');
    console.log('   购买 AR: https://www.binance.com/en/trade/AR_USDT');

    // 如果有钱包密钥文件，可以继续上传
    const walletPath = path.join(__dirname, '../arweave-wallet.json');
    if (!fs.existsSync(walletPath)) {
      console.log('\n📝 下一步：');
      console.log('   1. 创建 Arweave 钱包');
      console.log('   2. 购买少量 AR tokens（约 $0.50 足够）');
      console.log('   3. 保存钱包 JSON 文件为: arweave-wallet.json');
      console.log('   4. 再次运行此脚本进行上传');
      return;
    }

    console.log('\n📤 开始上传...');
    // 上传代码会在提供钱包后添加

  } catch (error) {
    console.error('❌ 错误:', error.message);
  }
}

uploadToArweave();
