import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rsk-dark border-t border-rsk-gray py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-rsk-orange mb-4">About This Project</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A commemorative Soul Bound Token celebrating Rootstock's 3000-day milestone.
              This non-transferable NFT marks your participation in this historic moment.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold text-rsk-orange mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://rootstock.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-rsk-orange transition-colors flex items-center gap-1"
                >
                  <span>Rootstock Official</span>
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
                  className="text-gray-400 hover:text-rsk-orange transition-colors flex items-center gap-1"
                >
                  <span>Developer Docs</span>
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
                  className="text-gray-400 hover:text-rsk-orange transition-colors flex items-center gap-1"
                >
                  <span>Block Explorer</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Contract Info */}
          <div>
            <h3 className="text-lg font-bold text-rsk-orange mb-4">Contract</h3>
            <div className="text-sm space-y-2">
              <div>
                <div className="text-gray-500">Testnet:</div>
                <code className="text-gray-400 text-xs font-mono break-all">
                  {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET || 'TBD'}
                </code>
              </div>
              <div>
                <div className="text-gray-500">Mainnet:</div>
                <code className="text-gray-400 text-xs font-mono break-all">
                  {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET || 'TBD'}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-rsk-gray pt-8">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <h4 className="text-yellow-500 font-bold mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Important Disclaimer</span>
            </h4>
            <p className="text-sm text-gray-400">
              This is a commemorative Soul Bound Token (SBT) with no monetary value.
              It cannot be transferred or sold. Participation is at your own risk.
              Please ensure you are on the correct network and always verify the contract address.
            </p>
          </div>

          <div className="text-center text-gray-500 text-sm">
            <p>© {currentYear} Rootstock 3000 Days. Built with ❤️ for the Rootstock community.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
