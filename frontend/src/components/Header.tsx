'use client';

import React, { useEffect } from 'react';
import { ConnectKitButton } from 'connectkit';
import { useAccount, useDisconnect } from 'wagmi';

export const Header: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  // 🔄 智能验证连接状态（避免误判）
  useEffect(() => {
    let failureCount = 0;
    const MAX_FAILURES = 3; // 连续失败3次才断开（避免临时网络问题导致误判）

    const verifyConnection = async () => {
      if (isConnected && address && typeof window.ethereum !== 'undefined') {
        try {
          // 检查钱包是否真的连接
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });

          // ✅ 验证成功 - 重置失败计数
          if (accounts && accounts.length > 0) {
            if (failureCount > 0) {
              console.log('✅ 连接状态恢复正常');
              failureCount = 0;
            }
            return;
          }

          // ⚠️ 返回空数组 - 钱包真的断开了
          if (accounts && accounts.length === 0) {
            console.log('⚠️ 检测到钱包已断开连接，正在清理并刷新页面...');
            disconnect();
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        } catch (error) {
          failureCount++;
          console.warn(`⚠️ 验证连接状态失败 (${failureCount}/${MAX_FAILURES}):`, error);

          // 🔒 只有连续失败多次才断开（避免因临时问题、广告拦截器等导致误判）
          if (failureCount >= MAX_FAILURES) {
            console.error('❌ 连续多次验证失败，断开连接以确保状态一致');
            disconnect();
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }
      }
    };

    // ⏱️ 延迟首次验证（给钱包2秒时间稳定）
    const initialTimeout = setTimeout(verifyConnection, 2000);

    // 🔄 每30秒定期验证
    const interval = setInterval(verifyConnection, 30000);

    // 👂 监听钱包事件（更可靠的断开检测）
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0 && isConnected) {
        console.log('👂 钱包事件：账户已断开');
        disconnect();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    };

    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [isConnected, address, disconnect]);

  const addRootstockNetwork = async () => {
    console.log('🔘 点击了添加 Rootstock 按钮');

    if (typeof window.ethereum === 'undefined') {
      console.log('❌ 未检测到 MetaMask');
      alert('请先安装 MetaMask 钱包扩展');
      window.open('https://metamask.io/download', '_blank');
      return;
    }

    console.log('✅ 检测到 MetaMask，开始添加网络...');

    const rootstockChainId = '0x1e'; // 30 in hex
    const networkParams = {
      chainId: rootstockChainId,
      chainName: 'Rootstock Mainnet',
      nativeCurrency: {
        name: 'RBTC',
        symbol: 'RBTC',
        decimals: 18,
      },
      rpcUrls: ['https://public-node.rsk.co', 'https://rpc.mainnet.rootstock.io/ZRjBSeG4PpiSLNO4zHgxSLIoAAQ_hIQC'],
      blockExplorerUrls: ['https://rootstock.blockscout.com'],
    };

    try {
      console.log('🔄 尝试切换到 Rootstock 网络...');
      // 先尝试切换到 Rootstock 网络
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: rootstockChainId }],
      });
      console.log('✅ 切换到 Rootstock 网络成功！');
      alert('✅ 已切换到 Rootstock Mainnet 网络！');
    } catch (switchError: any) {
      console.log('切换失败，错误码:', switchError.code);
      // 如果网络不存在 (错误码 4902)，则添加网络
      if (switchError.code === 4902) {
        try {
          console.log('📝 网络不存在，尝试添加...');
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networkParams],
          });
          console.log('✅ 添加 Rootstock 网络成功！');
          alert('✅ Rootstock Mainnet 网络添加成功！');
        } catch (addError: any) {
          console.error('❌ 添加网络失败:', addError);
          // 只有真正的错误才提示
          if (addError.code !== 4001) {
            alert('添加 Rootstock 网络失败，请检查 MetaMask 设置');
            console.error('Error details:', addError);
          } else {
            console.log('用户取消了添加网络');
          }
        }
      } else if (switchError.code === -32002) {
        // 请求已挂起
        console.log('⚠️ 有待处理的请求');
        alert('请先处理 MetaMask 中的待处理请求');
      } else if (switchError.code === 4001) {
        console.log('用户取消了切换网络');
      } else {
        // 非用户取消的错误才记录
        console.error('❌ 切换网络失败:', switchError);
        alert('切换网络失败，请检查 MetaMask 设置');
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-rsk-cream/95 backdrop-blur-lg border-b border-rsk-orange/20 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-start leading-tight">
              <div
                className="h-8 mb-1"
                style={{
                  width: '120px',
                  backgroundColor: '#FF9100',
                  WebkitMaskImage: 'url(/images/figma/rootstock-logo.png)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'left center',
                  maskImage: 'url(/images/figma/rootstock-logo.png)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'left center'
                }}
              />
              <div className="text-lg font-bold text-rsk-text-dark">
                爱你 3000<span className="hidden md:inline"> | 纪念 3000 天</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a
              href="#about"
              className="text-rsk-text-dark hover:text-rsk-orange transition-colors uppercase"
            >
              关于
            </a>
            <a
              href="#mint"
              className="text-rsk-text-dark hover:text-rsk-orange transition-colors uppercase"
            >
              铸造
            </a>
            <a
              href="/rbtc"
              className="text-rsk-text-dark hover:text-rsk-orange transition-colors uppercase"
            >
              获取 rBTC
            </a>
            <a
              href="https://rootstock.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rsk-text-dark hover:text-rsk-orange transition-colors flex items-center gap-1 uppercase"
            >
              <span>Rootstock 官网</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </nav>

          {/* Connect Wallet */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={addRootstockNetwork}
              className="flex items-center gap-1 sm:gap-2 bg-rsk-orange hover:bg-rsk-orange/90 text-white font-bold px-3 sm:px-6 py-2 transition-colors text-sm sm:text-base"
              title="添加 Rootstock 到 MetaMask"
            >
              <span className="text-base">🦊</span>
              <span className="hidden sm:inline">添加 Rootstock</span>
              <span className="sm:hidden">添加</span>
            </button>
            <ConnectKitButton.Custom>
              {({ isConnected, show, truncatedAddress, ensName }) => {
                return (
                  <button
                    onClick={show}
                    className="bg-rsk-text-dark hover:bg-rsk-text-dark/90 text-white font-bold px-3 sm:px-6 py-2 transition-colors text-sm sm:text-base"
                  >
                    {isConnected ? (
                      <>
                        <span className="hidden sm:inline">{ensName ?? truncatedAddress}</span>
                        <span className="sm:hidden">{truncatedAddress}</span>
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:inline">连接钱包</span>
                        <span className="sm:hidden">连接</span>
                      </>
                    )}
                  </button>
                );
              }}
            </ConnectKitButton.Custom>
          </div>
        </div>
      </div>
    </header>
  );
};
