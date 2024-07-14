import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LucideCheckCircle2, LucideXCircle } from 'lucide-react';

const AILearningStatus = () => {
  const data = [
    { name: '1月', 正解率: 85, 誤答率: 15 },
    { name: '2月', 正解率: 88, 誤答率: 12 },
    { name: '3月', 正解率: 92, 誤答率: 8 },
    { name: '4月', 正解率: 95, 誤答率: 5 },
    { name: '5月', 正解率: 96, 誤答率: 4 },
    { name: '6月', 正解率: 97, 誤答率: 3 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">AI学習状況</h2>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="w-full md:w-1/2">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} unit="%" />
              <CartesianGrid stroke="#f5f5f5" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="正解率" stroke="#006400" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="誤答率" stroke="#FF6347" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center space-x-4">
            <LucideCheckCircle2 className="w-6 h-6 text-green-500" />
            <span className="text-gray-800">正解率</span>
            <LucideXCircle className="w-6 h-6 text-red-500" />
            <span className="text-gray-800">誤答率</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">最新学習結果</h3>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">学習データ数</span>
              <span className="text-gray-800 font-medium">10,000件</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">学習時間</span>
              <span className="text-gray-800 font-medium">2時間30分</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">最終学習日時</span>
              <span className="text-gray-800 font-medium">2023年6月30日 15:00</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">今後の学習計画</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>学習データの拡充（画像データ、テキストデータ）</li>
              <li>AIモデルの精度向上のためのチューニング</li>
              <li>新規AIモデルの開発（例：需要予測モデル）</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AILearningStatus;