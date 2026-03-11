import React from 'react';

export const CampaignInfo: React.FC = () => {
  return (
    <div className="w-full">
      {/* 活動主題 */}
      <div className="text-center mb-12">
        <div className="inline-block bg-rsk-orange/10 border border-rsk-orange/30 rounded-2xl px-8 py-4">
          <h3 className="text-3xl font-bold text-rsk-orange mb-2">
            🧡 Rootstock 愛你 3000
          </h3>
          <p className="text-gray-400">
            紀念 Rootstock 主網運行 3000 天
          </p>
        </div>
      </div>

      {/* 活動說明 */}
      <div className="bg-rsk-gray/50 border border-rsk-orange/20 rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-rsk-orange mb-6 text-center">
          🎯 如何參與
        </h3>
        <div className="space-y-4 text-gray-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-rsk-orange rounded-full flex items-center justify-center font-bold text-rsk-dark">
              1
            </div>
            <div>
              <p className="font-semibold text-rsk-light mb-1">關注 @RootstockCN</p>
              <p className="text-sm text-gray-400">
                前往 Twitter 關注{' '}
                <a
                  href="https://x.com/RootstockCN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rsk-orange hover:underline"
                >
                  @RootstockCN
                </a>{' '}
                並轉發活動推文
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-rsk-orange rounded-full flex items-center justify-center font-bold text-rsk-dark">
              2
            </div>
            <div>
              <p className="font-semibold text-rsk-light mb-1">鑄造你的專屬 SBT</p>
              <p className="text-sm text-gray-400">
                連接錢包，免費鑄造你的「愛你 3000」紀念 SBT
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-rsk-orange rounded-full flex items-center justify-center font-bold text-rsk-dark">
              3
            </div>
            <div>
              <p className="font-semibold text-rsk-light mb-1">分享到 Twitter</p>
              <p className="text-sm text-gray-400">
                在 Twitter 上分享你的 NFT，告訴大家你為什麼愛 Rootstock
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-rsk-orange rounded-full flex items-center justify-center font-bold text-rsk-dark">
              4
            </div>
            <div>
              <p className="font-semibold text-rsk-light mb-1">參加抽獎</p>
              <p className="text-sm text-gray-400">
                完成以上步驟，即有機會贏取豐厚獎勵！
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 獎勵說明 */}
      <div className="bg-gradient-to-r from-rsk-orange/10 to-orange-400/10 border border-rsk-orange/30 rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-rsk-orange mb-6 text-center">
          🎁 活動獎勵
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-2">💰</div>
            <div className="text-3xl font-bold text-rsk-orange mb-2">$5,000</div>
            <div className="text-sm text-gray-400">USDT 隨機分配</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🎁</div>
            <div className="text-3xl font-bold text-rsk-orange mb-2">10 份</div>
            <div className="text-sm text-gray-400">Rootstock 限定周邊</div>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-400 text-sm">
          3月31日公布得獎名單
        </div>
      </div>

      {/* 活動時間線 */}
      <div className="bg-rsk-gray/50 border border-rsk-orange/20 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-rsk-orange mb-6 text-center">
          📅 活動時間線
        </h3>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-20 text-center">
              <div className="text-2xl font-bold text-rsk-orange">3/8</div>
            </div>
            <div className="flex-1 border-l-4 border-rsk-orange/30 pl-6 pb-2">
              <p className="font-semibold text-rsk-light">活動啟動</p>
              <p className="text-sm text-gray-400">開放鑄造，KOL 推廣開始</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-20 text-center">
              <div className="text-2xl font-bold text-rsk-orange">3/22</div>
            </div>
            <div className="flex-1 border-l-4 border-rsk-orange pl-6 pb-2">
              <p className="font-semibold text-rsk-light">🎉 3000 天紀念日</p>
              <p className="text-sm text-gray-400">Rootstock 主網運行 3000 天慶祝</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-20 text-center">
              <div className="text-2xl font-bold text-rsk-orange">3/31</div>
            </div>
            <div className="flex-1 border-l-4 border-rsk-orange/30 pl-6">
              <p className="font-semibold text-rsk-light">活動截止</p>
              <p className="text-sm text-gray-400">鑄造結束，公布得獎者</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
