const { createPublicClient, http } = require('viem');

const client = createPublicClient({
  chain: {
    id: 30,
    name: 'Rootstock Mainnet',
    network: 'rootstock',
    nativeCurrency: { name: 'RBTC', symbol: 'RBTC', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://public-node.rsk.co'] },
      public: { http: ['https://public-node.rsk.co'] }
    }
  },
  transport: http('https://public-node.rsk.co')
});

async function verifyContract() {
  const contractAddress = '0x60f5e90C2FFc92E1E729a286F03103314C2ac678';

  console.log('🔍 驗證主網合約...');
  console.log('合約地址:', contractAddress);
  console.log('');

  try {
    // 1. 檢查合約是否存在（獲取 bytecode）
    const bytecode = await client.getBytecode({ address: contractAddress });

    if (!bytecode || bytecode === '0x') {
      console.error('❌ 合約不存在或未部署！');
      console.error('Bytecode:', bytecode);
      process.exit(1);
    }

    console.log('✅ 合約已部署');
    console.log('Bytecode 長度:', bytecode.length, '字符');
    console.log('');

    // 2. 嘗試調用 MAX_SUPPLY
    const abi = [
      {
        inputs: [],
        name: 'MAX_SUPPLY',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      }
    ];

    const maxSupply = await client.readContract({
      address: contractAddress,
      abi: abi,
      functionName: 'MAX_SUPPLY',
    });

    console.log('✅ MAX_SUPPLY 調用成功:', maxSupply.toString());

  } catch (error) {
    console.error('❌ 驗證失敗:');
    console.error('Error:', error.message);
    if (error.data) {
      console.error('Data:', error.data);
    }
  }
}

verifyContract();
