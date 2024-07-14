import React, { useState, useEffect } from 'react';
import { Star, Gift, Calendar, CreditCard, Award, TrendingUp, Users, Coffee } from 'lucide-react';

const LoyaltyProgram = () => {
  const [points, setPoints] = useState(0);
  const [tier, setTier] = useState('銅');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // ポイントに応じてティアを更新
    if (points >= 1000) {
      setTier('金');
    } else if (points >= 500) {
      setTier('銀');
    } else {
      setTier('銅');
    }
  }, [points]);

  useEffect(() => {
    // モックデータの生成
    const mockTransactions = [
      { id: 1, date: '2023-05-01', amount: 1500, points: 15 },
      { id: 2, date: '2023-05-15', amount: 2800, points: 28 },
      { id: 3, date: '2023-06-02', amount: 3200, points: 32 },
    ];
    setTransactions(mockTransactions);
    setPoints(mockTransactions.reduce((sum, t) => sum + t.points, 0));
  }, []);

  const redeemPoints = (cost) => {
    if (points >= cost) {
      setPoints(points - cost);
      alert(`${cost}ポイントを使用しました。特典をお楽しみください。`);
    } else {
      alert('ポイントが足りません。');
    }
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-3xl font-bold text-[#4A2311] mb-8 font-serif">菓匠 鈴乃家 - お客様ロイヤリティプログラム</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[#006400]">現在のステータス</h2>
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-2" />
            <span className="text-lg font-medium">{tier}ティア</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg text-[#4A2311]">保有ポイント</p>
            <p className="text-3xl font-bold text-[#006400]">{points} pt</p>
          </div>
          <div className="text-right">
            <p className="text-lg text-[#4A2311]">次のティアまで</p>
            <p className="text-xl font-semibold text-[#006400]">
              {tier === '銅' ? `${500 - points} pt` : tier === '銀' ? `${1000 - points} pt` : '最高ティアです'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-[#006400] mb-4">特典交換</h3>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex items-center">
                <Gift className="text-[#FFB7C5] mr-2" />
                <span>季節の和菓子セット</span>
              </div>
              <button
                onClick={() => redeemPoints(100)}
                className="bg-[#006400] text-white px-4 py-2 rounded hover:bg-[#007500] transition duration-300"
              >
                100pt交換
              </button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center">
                <Coffee className="text-[#FFB7C5] mr-2" />
                <span>抹茶体験チケット</span>
              </div>
              <button
                onClick={() => redeemPoints(200)}
                className="bg-[#006400] text-white px-4 py-2 rounded hover:bg-[#007500] transition duration-300"
              >
                200pt交換
              </button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="text-[#FFB7C5] mr-2" />
                <span>和菓子作り教室参加券</span>
              </div>
              <button
                onClick={() => redeemPoints(500)}
                className="bg-[#006400] text-white px-4 py-2 rounded hover:bg-[#007500] transition duration-300"
              >
                500pt交換
              </button>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-[#006400] mb-4">ティア特典</h3>
          <ul className="space-y-4">
            <li className="flex items-center">
              <CreditCard className="text-[#FFB7C5] mr-2" />
              <span>銅ティア: 購入金額の1%ポイント還元</span>
            </li>
            <li className="flex items-center">
              <Award className="text-[#FFB7C5] mr-2" />
              <span>銀ティア: 購入金額の2%ポイント還元、誕生日特典</span>
            </li>
            <li className="flex items-center">
              <TrendingUp className="text-[#FFB7C5] mr-2" />
              <span>金ティア: 購入金額の3%ポイント還元、優先予約、限定商品</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-[#006400] mb-4">最近の取引履歴</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2">日付</th>
              <th className="text-right py-2">金額</th>
              <th className="text-right py-2">獲得ポイント</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-200">
                <td className="py-2">{transaction.date}</td>
                <td className="text-right py-2">{transaction.amount}円</td>
                <td className="text-right py-2">{transaction.points}pt</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-[#006400] mb-4">お友達紹介プログラム</h3>
        <p className="text-[#4A2311] mb-4">
          お友達をご紹介いただくと、あなたとお友達それぞれに100ポイントプレゼント！
        </p>
        <button className="bg-[#FFB7C5] text-[#4A2311] px-6 py-3 rounded-full hover:bg-[#FFA5B5] transition duration-300 flex items-center justify-center mx-auto">
          <Users className="mr-2" />
          友達を招待する
        </button>
      </div>
    </div>
  );
};

export default LoyaltyProgram;