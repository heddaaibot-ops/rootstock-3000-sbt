import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rsk-beige border-t border-rsk-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-rsk-orange mb-4">关于此项目</h3>
            <p className="text-rsk-text/70 text-sm leading-relaxed">
              一个纪念 Rootstock 运行 3000 天里程碑的灵魂绑定代币。
              这个不可转移的 NFT 标志着您参与这一历史时刻。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold text-rsk-orange mb-4">资源链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://rootstock.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rsk-text/70 hover:text-rsk-orange transition-colors flex items-center gap-1"
                >
                  <span>Rootstock 官网</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://dev.rootstock.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rsk-text/70 hover:text-rsk-orange transition-colors flex items-center gap-1"
                >
                  <span>开发者文档</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://rootstock.blockscout.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rsk-text/70 hover:text-rsk-orange transition-colors flex items-center gap-1"
                >
                  <span>区块浏览器</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-rsk-text/70 hover:text-rsk-orange transition-colors"
                >
                  条款与条件
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-rsk-text/70 hover:text-rsk-orange transition-colors"
                >
                  隐私政策
                </a>
              </li>
            </ul>
          </div>

          {/* Contract Info */}
          <div>
            <h3 className="text-lg font-bold text-rsk-orange mb-4">合约地址</h3>
            <div className="text-sm space-y-2">
              <div>
                <div className="text-rsk-text/60">测试网：</div>
                <code className="text-rsk-text/70 text-xs font-mono break-all">
                  {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET || '待定'}
                </code>
              </div>
              <div>
                <div className="text-rsk-text/60">主网：</div>
                <code className="text-rsk-text/70 text-xs font-mono break-all">
                  {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET || '待定'}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-rsk-border pt-8">
          <div className="bg-orange-50 border border-rsk-orange/30 rounded-lg p-4 mb-6">
            <h4 className="text-rsk-orange font-bold mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>重要声明</span>
            </h4>
            <p className="text-sm text-rsk-text/70">
              这是一个纪念性的灵魂绑定代币（SBT），没有货币价值。
              它不能被转移或出售。参与需自行承担风险。
              请确保您使用的是正确的网络，并始终验证合约地址。
            </p>
          </div>

          <div className="text-center text-rsk-text/60 text-sm">
            <p>© {currentYear} Rootstock 3000 Days. 为 Rootstock 社区倾情打造。</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
