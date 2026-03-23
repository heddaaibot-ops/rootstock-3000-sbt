const { createPublicClient, http, formatEther } = require('viem');

const client = createPublicClient({
  chain: {
    id: 30,
    name: 'Rootstock Mainnet',
    network: 'rootstock',
    nativeCurrency: { name: 'Rootstock Bitcoin', symbol: 'RBTC', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://public-node.rsk.co'] },
      public: { http: ['https://public-node.rsk.co'] }
    }
  },
  transport: http('https://public-node.rsk.co')
});

async function checkBalance() {
  const address = '0x22cd1c7b62a9cda1fc1868ae0deab62f6fd57800';
  const balance = await client.getBalance({ address });
  console.log(`Balance: ${formatEther(balance)} RBTC`);

  if (balance < 1000000000000000n) { // 0.001 RBTC
    console.log('⚠️ 余额不足 0.001 RBTC');
    process.exit(1);
  } else {
    console.log('✅ 余额充足，可以开始部署！');
  }
}

checkBalance().catch(console.error);
