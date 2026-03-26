// 環境變量類型定義
declare namespace NodeJS {
  interface ProcessEnv {
    // 合約地址
    NEXT_PUBLIC_CONTRACT_ADDRESS: string;

    // WalletConnect Project ID（可選）
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?: string;

    // Node 環境
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

// 錢包類型定義
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
