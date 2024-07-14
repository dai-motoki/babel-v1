import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Server, Users, Database, Settings } from 'lucide-react';

const data = [
  { name: '抹茶ラテ', '売上': 400, '顧客数': 240, 'リピート率': 60 },
  { name: '抹茶アイス', '売上': 300, '顧客数': 139, 'リピート率': 45 },
  { name: '抹茶パフェ', '売上': 200, '顧客数': 98, 'リピート率': 30 },
  { name: '抹茶プリン', '売上': 278, '顧客数': 390, 'リピート率': 70 },
  { name: '抹茶ぜんざい', '売上': 189, '顧客数': 480, 'リピート率': 80 },
  { name: '抹茶クッキー', '売上': 239, '顧客数': 380, 'リピート率': 55 },
  { name: '抹茶ケーキ', '売上': 349, '顧客数': 450, 'リピート率': 60 },
];

const Production = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">本番環境</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* サーバー稼働状況 */}
        <div className="bg-green-100 rounded-lg p-4">
          <div className="flex items-center">
            <Server className="w-6 h-6 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">サーバー稼働状況</h3>
          </div>
          <p className="text-green-600 font-bold text-xl mt-2">安定稼働中</p>
        </div>

        {/* ユーザーアクセス */}
        <div className="bg-blue-100 rounded-lg p-4">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">ユーザーアクセス</h3>
          </div>
          <p className="text-blue-600 font-bold text-xl mt-2">12,345 / 今日</p>
        </div>
      </div>

      {/* グラフ */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">売上・顧客数・リピート率</h3>
        <BarChart width={700} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="売上" fill="#8884d8" />
          <Bar dataKey="顧客数" fill="#82ca9d" />
          <Bar dataKey="リピート率" fill="#ffc658" />
        </BarChart>
      </div>

      {/* データベース */}
      <div className="mt-8 bg-gray-100 rounded-lg p-4">
        <div className="flex items-center">
          <Database className="w-6 h-6 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">データベース</h3>
        </div>
        <p className="text-gray-700 mt-2">
          データの保存および取得に問題はありません。
        </p>
      </div>

      {/* システム設定 */}
      <div className="mt-4 bg-gray-100 rounded-lg p-4">
        <div className="flex items-center">
          <Settings className="w-6 h-6 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">システム設定</h3>
        </div>
        <p className="text-gray-700 mt-2">
          すべてのシステム設定は最適化されています。
        </p>
      </div>
    </div>
  );
};

export default Production;