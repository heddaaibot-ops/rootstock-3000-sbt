import React from 'react';
import { CONTRACT_ADDRESS } from '@/utils/contract';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rsk-offwhite border-t-3 border-rsk-border-dark py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-rsk-orange mb-4 uppercase">关于此项目</h3>
            <p className="text-rsk-text-dark text-sm leading-relaxed">
              一个纪念 Rootstock 运行 3000 天里程碑的灵魂绑定代币。
              这个不可转移的 NFT 标志着您参与这一历史时刻。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold text-rsk-orange mb-4 uppercase">资源链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://rootstock.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rsk-text-dark hover:text-rsk-orange transition-colors flex items-center gap-1 font-medium"
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
                  className="text-rsk-text-dark hover:text-rsk-orange transition-colors flex items-center gap-1 font-medium"
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
                  className="text-rsk-text-dark hover:text-rsk-orange transition-colors flex items-center gap-1 font-medium"
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
                  className="text-rsk-text-dark hover:text-rsk-orange transition-colors font-medium"
                >
                  条款与条件
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-rsk-text-dark hover:text-rsk-orange transition-colors font-medium"
                >
                  隐私政策
                </a>
              </li>
            </ul>
          </div>

          {/* Contract Info */}
          <div>
            <h3 className="text-lg font-bold text-rsk-orange mb-4 uppercase">合约地址</h3>
            <div className="text-sm">
              <a
                href={`https://rootstock.blockscout.com/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rsk-orange hover:underline flex items-center gap-1"
              >
                <code className="text-xs font-mono break-all">
                  {CONTRACT_ADDRESS}
                </code>
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t-2 border-rsk-border-dark pt-8">
          <div className="text-center text-rsk-text-dark text-sm font-medium">
            <p>© {currentYear} Rootstock 3000 Days. 为 Rootstock 社区倾情打造。</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
