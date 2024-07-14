import React, { useState, useEffect } from 'react';
import { Star, Gift, Calendar, Award, CreditCard, TrendingUp, Users, ShoppingBag } from 'lucide-react';

const LoyaltyProgram = () => {
  const [points, setPoints] = useState(0);
  const [tier, setTier] = useState('銅');
  const [purchases, setPurchases] = useState([]);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    // 仮のデータ取得
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    // APIから実際のデータを取得する代わりに、仮のデータを設定
    setPoints(750);
    setTier('銀');
    setPurchases([
      { id: 1, date: '2023-05-01', amount: 3000, points: 30 },
      { id: 2, date: '2023-05-15', amount: 5000, points: 50 },
      { id: 3, date: '2023-06-01', amount: 2000, points: 20 },
    ]);
    setRewards([
      { id: 1, name: '季節の和菓子セット', points: 500, redeemed: false },
      { id: 2, name: '抹茶体験チケット', points: 1000, redeemed: false },
      { id: 3, name: '職人による和菓子作り教室', points: 2000, redeemed: false },
    ]);
  };

  const redeemReward = (rewardId) => {
    setRewards(rewards.map(reward =>
      reward.id === rewardId ? { ...reward, redeemed: true } : reward
    ));
    // 実際のアプリケーションでは、ここでAPIを呼び出してポイントを減算し、特典を付与します
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case '銅': return 'text-amber-700';
      case '銀': return 'text-gray-400';
      case '金': return 'text-yellow-500';
      case '翡翠': return 'text-emerald-500';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 text-center font-serif">
        菓匠 鈴乃家 会員プログラム
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#4A2311] mb-2">会員ステータス</h2>
            <p className="text-lg">
              現在のポイント: <span className="font-bold text-[#006400]">{points} 点</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg mb-2">会員ランク</p>
            <p className={`text-3xl font-bold ${getTierColor(tier)}`}>{tier}</p>
          </div>
        </div>

        <div className="bg-[#F3EAD3] rounded-lg p-4 mb-6">
          <h3 className="text-xl font-bold text-[#4A2311] mb-4">会員特典</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Star className="text-[#006400] mr-2" size={20} />
              <span>毎月8日は和菓子の日！ポイント2倍進呈</span>
            </li>
            <li className="flex items-center">
              <Gift className="text-[#006400] mr-2" size={20} />
              <span>お誕生日月にプレゼント進呈</span>
            </li>
            <li className="flex items-center">
              <Calendar className="text-[#006400] mr-2" size={20} />
              <span>季節限定商品の先行予約権</span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-[#4A2311] mb-4">ポイント交換特典</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="bg-white border border-[#006400] rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-[#4A2311]">{reward.name}</p>
                  <p className="text-sm text-gray-600">{reward.points} ポイント</p>
                </div>
                <button
                  onClick={() => redeemReward(reward.id)}
                  disabled={reward.redeemed || points < reward.points}
                  className={`px-4 py-2 rounded-full text-white ${
                    reward.redeemed
                      ? 'bg-gray-400 cursor-not-allowed'
                      : points >= reward.points
                      ? 'bg-[#006400] hover:bg-[#007500]'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {reward.redeemed ? '交換済み' : '交換する'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-[#4A2311] mb-4">最近の購入履歴</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F3EAD3]">
                  <th className="p-2">日付</th>
                  <th className="p-2">金額</th>
                  <th className="p-2">獲得ポイント</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr key={purchase.id} className="border-b border-[#F3EAD3]">
                    <td className="p-2">{purchase.date}</td>
                    <td className="p-2">{purchase.amount}円</td>
                    <td className="p-2">{purchase.points}ポイント</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-[#4A2311] mb-6">会員ランクについて</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F3EAD3] rounded-lg p-4">
            <h3 className="text-lg font-bold text-[#4A2311] mb-2 flex items-center">
              <Award className="text-amber-700 mr-2" size={24} />
              銅会員
            </h3>
            <p>年間購入金額: 〜30,000円</p>
            <p>特典: 基本ポイント付与</p>
          </div>
          <div className="bg-[#F3EAD3] rounded-lg p-4">
            <h3 className="text-lg font-bold text-[#4A2311] mb-2 flex items-center">
              <Award className="text-gray-400 mr-2" size={24} />
              銀会員
            </h3>
            <p>年間購入金額: 30,001円〜50,000円</p>
            <p>特典: ポイント1.2倍、季節限定商品先行予約</p>
          </div>
          <div className="bg-[#F3EAD3] rounded-lg p-4">
            <h3 className="text-lg font-bold text-[#4A2311] mb-2 flex items-center">
              <Award className="text-yellow-500 mr-2" size={24} />
              金会員
            </h3>
            <p>年間購入金額: 50,001円〜100,000円</p>
            <p>特典: ポイント1.5倍、誕生日月特別ギフト</p>
          </div>
          <div className="bg-[#F3EAD3] rounded-lg p-4">
            <h3 className="text-lg font-bold text-[#4A2311] mb-2 flex items-center">
              <Award className="text-emerald-500 mr-2" size={24} />
              翡翠会員
            </h3>
            <p>年間購入金額: 100,001円〜</p>
            <p>特典: ポイント2倍、職人による特別和菓子作り体験</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;