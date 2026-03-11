import React from 'react';

export const RootstockIntro: React.FC = () => {
  return (
    <div className="w-full">
      <div className="bg-rsk-gray/50 border border-rsk-orange/20 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-rsk-orange mb-6">
          關於 Rootstock
        </h2>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            2015 年，當大多數人還在爭論比特幣能否支持智能合約時，Rootstock 選擇了行動。我們相信比特幣不僅是數字黃金，更應該成為完整的金融基礎設施。
          </p>

          <p>
            今天，Rootstock 主網已經運行了 3000 天。3000 天裡，我們沒有重大安全事故，沒有停機，穩定地為用戶提供服務。這份堅持來自於對技術的信仰，也來自於社區的支持。
          </p>

          <p>
            Rootstock 通過與比特幣合併挖礦，讓智能合約擁有與比特幣相同的安全級別。開發者可以在這裡構建 DeFi 協議和去中心化金融應用，用戶則可以在不離開比特幣生態的前提下，體驗 Web3 的全部可能性。
          </p>

          <p className="text-rsk-orange font-semibold text-lg">
            3000 天，只是一個開始。
          </p>
        </div>
      </div>
    </div>
  );
};
