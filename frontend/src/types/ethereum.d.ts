// EIP-1193 Provider 類型定義
interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
  isMetaMask?: boolean;
  isConnected?: () => boolean;
}

interface Window {
  // MetaMask 或其他 EVM 錢包（注入到 window.ethereum）
  ethereum?: EthereumProvider;

  // OKX Wallet 專用
  okxwallet?: EthereumProvider & {
    isOkxWallet?: boolean;
  };

  // Binance Wallet 專用
  BinanceChain?: EthereumProvider & {
    isBinance?: boolean;
  };

  // Binance Web3 Wallet
  binancew3w?: {
    ethereum?: EthereumProvider;
  };
}
