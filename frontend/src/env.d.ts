// 环境变量类型定义
declare namespace NodeJS {
  interface ProcessEnv {
    // 合约地址
    NEXT_PUBLIC_CONTRACT_ADDRESS: string;

    // WalletConnect Project ID（可选）
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?: string;

    // Node 环境
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

// 钱包类型定义
interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    isBinance?: boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on?: (event: string, callback: (...args: any[]) => void) => void;
    removeListener?: (event: string, callback: (...args: any[]) => void) => void;
  };
  BinanceChain?: any;
}
