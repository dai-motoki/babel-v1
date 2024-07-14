import React, { useState, useEffect } from 'react';
import { Fish, Star, Gift, Clock, ChevronDown, ChevronUp, Award } from 'lucide-react';

const LoyaltyProgram = () => {
  const [customerPoints, setCustomerPoints] = useState(0);
  const [customerRank, setCustomerRank] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [pointHistory, setPointHistory] = useState([]);

  useEffect(() => {
    // 顧客ポイントのモックデータ
    setCustomerPoints(3750);
    setPointHistory([
      { date: '2023-05-01', points: 150, description: '寿司セットA注文' },
      { date: '2023-05-15', points: 200, description: '季節の特選にぎり注文' },
      { date: '2023-05-30', points: 100, description: 'ドリンク特典利用' },
    ]);
  }, []);

  useEffect(() => {
    // ポイントに基づくランク設定
    if (customerPoints >= 5000) {
      setCustomerRank('大将');
    } else if (customerPoints >= 3000) {
      setCustomerRank('板長');
    } else if (customerPoints >= 1000) {
      setCustomerRank('職人');
    } else {
      setCustomerRank('見習い');
    }
  }, [customerPoints]);

  const rankBenefits = {
    '大将': ['特別な季節限定寿司の先行予約', '年1回の寿司作り体験', 'ポイント2倍デー'],
    '板長': ['月1回のドリンク無料', '誕生日特典', 'VIP席の優先予約'],
    '職人': ['5%割引クーポン', '新メニューの試食会招待', 'ポイント1.5倍デー'],
    '見習い': ['入店時のお茶サービス', 'スタンプカード', '500ポイントで100円割引'],
  };

  const toggleHistory = () => setShowHistory(!showHistory);

  return (
    <div className="bg-cream-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-900 flex items-center">
        <Fish className="mr-2" /> 回転寿司ロイヤリティプログラム
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-inner mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-semibold text-indigo-800">現在のポイント</h3>
            <p className="text-4xl font-bold text-red-600">{customerPoints} pts</p>
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-semibold text-indigo-800">現在のランク</h3>
            <p className="text-4xl font-bold text-green-600 flex items-center justify-end">
              <Award className="mr-2" /> {customerRank}
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(customerPoints % 1000) / 10}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 text-right">
          次のランクまであと {1000 - (customerPoints % 1000)} ポイント
        </p>
      </div>

      <div className="bg-indigo-50 p-6 rounded-lg shadow-inner mb-6">
        <h3 className="text-2xl font-semibold text-indigo-800 mb-4 flex items-center">
          <Star className="mr-2" /> 現在のランク特典
        </h3>
        <ul className="list-disc pl-6">
          {rankBenefits[customerRank].map((benefit, index) => (
            <li key={index} className="text-lg text-indigo-700 mb-2">
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-red-50 p-6 rounded-lg shadow-inner mb-6">
        <h3 className="text-2xl font-semibold text-red-800 mb-4 flex items-center">
          <Gift className="mr-2" /> 特別クーポン
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-red-600">季節の特選にぎり 20% OFF</p>
            <p className="text-sm text-gray-600">有効期限: 2023年6月30日</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-red-600">平日ランチタイム 10% OFF</p>
            <p className="text-sm text-gray-600">有効期限: 2023年7月31日</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg shadow-inner">
        <h3
          className="text-2xl font-semibold text-green-800 mb-4 flex items-center cursor-pointer"
          onClick={toggleHistory}
        >
          <Clock className="mr-2" /> ポイント履歴
          {showHistory ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
        </h3>
        {showHistory && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-green-200">
                  <th className="p-2">日付</th>
                  <th className="p-2">ポイント</th>
                  <th className="p-2">内容</th>
                </tr>
              </thead>
              <tbody>
                {pointHistory.map((entry, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-green-100' : 'bg-white'}>
                    <td className="p-2">{entry.date}</td>
                    <td className="p-2">{entry.points}</td>
                    <td className="p-2">{entry.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyProgram;