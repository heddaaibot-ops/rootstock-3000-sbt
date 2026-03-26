interface Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    isMetaMask?: boolean;
  };
  BinanceChain?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    isBinance?: boolean;
  };
}
