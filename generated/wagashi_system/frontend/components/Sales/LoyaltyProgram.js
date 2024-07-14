import React, { useState, useEffect } from 'react';
import { Star, Gift, Calendar, Sparkles, Award, ChevronDown, ChevronUp } from 'lucide-react';

const LoyaltyProgram = () => {
  const [points, setPoints] = useState(0);
  const [tier, setTier] = useState('銅');
  const [rewards, setRewards] = useState([]);
  const [history, setHistory] = useState([]);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    // モックデータの読み込み
    setPoints(1250);
    setTier('銀');
    setRewards([
      { id: 1, name: '季節の和菓子セット', points: 500, icon: <Gift size={20} /> },
      { id: 2, name: '抹茶体験チケット', points: 1000, icon: <Calendar size={20} /> },
      { id: 3, name: '職人による和菓子作り体験', points: 2000, icon: <Sparkles size={20} /> },
    ]);
    setHistory([
      { id: 1, date: '2023-05-01', action: '購入', points: 100 },
      { id: 2, date: '2023-05-15', action: 'リワード交換', points: -500 },
      { id: 3, date: '2023-06-01', action: '購入', points: 150 },
    ]);
  }, []);

  const getTierColor = (tier) => {
    switch (tier) {
      case '銅': return 'text-amber-700';
      case '銀': return 'text-gray-500';
      case '金': return 'text-yellow-500';
      default: return 'text-gray-700';
    }
  };

  const getProgressBarWidth = () => {
    const tierPoints = { '銅': 1000, '銀': 2500, '金': 5000 };
    const nextTier = tier === '銅' ? '銀' : tier === '銀' ? '金' : '金';
    const progress = (points / tierPoints[nextTier]) * 100;
    return `${Math.min(progress, 100)}%`;
  };

  return (
    <div className="bg-[#F3EAD3] p-6 rounded-lg shadow-md max-w-2xl mx-auto font-sans">
      <h2 className="text-3xl font-bold text-[#4A2311] mb-6 text-center font-serif">和菓子ロイヤリティプログラム</h2>

      <div className="bg-white p-6 rounded-md shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-lg font-medium text-[#4A2311]">現在のポイント</p>
            <p className="text-3xl font-bold text-[#006400]">{points} ポイント</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium text-[#4A2311]">会員ランク</p>
            <p className={`text-3xl font-bold ${getTierColor(tier)}`}>{tier}</p>
          </div>
        </div>

        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#006400] bg-green-200">
                進捗
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-[#006400]">
                {getProgressBarWidth()}
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
            <div style={{ width: getProgressBarWidth() }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#006400]"></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-md shadow-sm mb-6">
        <button
          onClick={() => setIsRewardsOpen(!isRewardsOpen)}
          className="flex justify-between items-center w-full text-left text-lg font-medium text-[#4A2311] mb-2"
        >
          <span className="flex items-center">
            <Award className="mr-2" size={24} />
            リワード交換
          </span>
          {isRewardsOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
        {isRewardsOpen && (
          <div className="mt-4 space-y-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="flex justify-between items-center p-3 bg-[#F3EAD3] rounded-md">
                <div className="flex items-center">
                  {reward.icon}
                  <span className="ml-2 text-[#4A2311]">{reward.name}</span>
                </div>
                <button
                  className="px-4 py-2 bg-[#006400] text-white rounded-md hover:bg-[#007500] transition duration-300"
                  onClick={() => alert(`${reward.name}と交換しました！`)}
                >
                  {reward.points}ポイントで交換
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-md shadow-sm">
        <button
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className="flex justify-between items-center w-full text-left text-lg font-medium text-[#4A2311] mb-2"
        >
          <span className="flex items-center">
            <Calendar className="mr-2" size={24} />
            ポイント履歴
          </span>
          {isHistoryOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
        {isHistoryOpen && (
          <div className="mt-4 space-y-4">
            {history.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-[#F3EAD3] rounded-md">
                <div>
                  <p className="text-sm text-gray-600">{item.date}</p>
                  <p className="text-[#4A2311]">{item.action}</p>
                </div>
                <p className={`font-medium ${item.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.points > 0 ? '+' : ''}{item.points}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#4A2311]">
          和菓子を愛する皆様へ、感謝の気持ちを込めて。<br />
          より多くのポイントを貯めて、特別な和菓子体験をお楽しみください。
        </p>
      </div>
    </div>
  );
};

export default LoyaltyProgram;