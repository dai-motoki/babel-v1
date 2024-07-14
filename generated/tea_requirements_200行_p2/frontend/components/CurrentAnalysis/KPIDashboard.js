import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, Zap, DollarSign, Users, ShoppingCart } from 'lucide-react';

const mockData = [
  { name: '1月', 売上: 4000, 顧客数: 2400, 注文数: 2400 },
  { name: '2月', 売上: 3000, 顧客数: 1398, 注文数: 2210 },
  { name: '3月', 売上: 2000, 顧客数: 9800, 注文数: 2290 },
  { name: '4月', 売上: 2780, 顧客数: 3908, 注文数: 2000 },
  { name: '5月', 売上: 1890, 顧客数: 4800, 注文数: 2181 },
  { name: '6月', 売上: 2390, 顧客数: 3800, 注文数: 2500 },
];

const KPICard = ({ title, value, change, icon: Icon }) => {
  const isPositive = change >= 0;
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <Icon className="text-green-600" size={24} />
      </div>
      <p className="text-2xl font-bold text-gray-800 mb-2">{value}</p>
      <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        <span className="ml-1 text-sm">{Math.abs(change)}%</span>
      </div>
    </div>
  );
};

const KPIDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('月次');
  const [kpiData, setKpiData] = useState({
    売上: { value: '¥10,234,567', change: 5.2 },
    顧客数: { value: '1,234', change: -2.1 },
    注文数: { value: '3,456', change: 7.8 },
    平均注文額: { value: '¥2,963', change: 3.5 },
  });

  useEffect(() => {
    // 実際のアプリケーションでは、ここでAPIからデータを取得します
    // この例ではモックデータを使用しています
  }, [selectedPeriod]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">KPIダッシュボード</h2>
      
      <div className="mb-6">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="日次">日次</option>
          <option value="週次">週次</option>
          <option value="月次">月次</option>
          <option value="年次">年次</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard title="売上" value={kpiData.売上.value} change={kpiData.売上.change} icon={DollarSign} />
        <KPICard title="顧客数" value={kpiData.顧客数.value} change={kpiData.顧客数.change} icon={Users} />
        <KPICard title="注文数" value={kpiData.注文数.value} change={kpiData.注文数.change} icon={ShoppingCart} />
        <KPICard title="平均注文額" value={kpiData.平均注文額.value} change={kpiData.平均注文額.change} icon={Zap} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">トレンド分析</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#333333" />
            <YAxis stroke="#333333" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #cccccc',
                borderRadius: '4px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="売上" stroke="#006400" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="顧客数" stroke="#98FB98" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="注文数" stroke="#333333" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">人気商品</h3>
          <ul className="space-y-2">
            {['抹茶ラテ', '玄米茶', '煎茶', 'ほうじ茶', '玉露'].map((item, index) => (
              <li key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-gray-700">{item}</span>
                <span className="text-gray-500 text-sm">{Math.floor(Math.random() * 1000) + 100} 注文</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">地域別売上</h3>
          <ul className="space-y-2">
            {['東京', '大阪', '京都', '名古屋', '福岡'].map((item, index) => (
              <li key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-gray-700">{item}</span>
                <span className="text-gray-500 text-sm">¥{(Math.random() * 1000000 + 500000).toFixed(0)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">最近の注文</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-600">注文ID</th>
                <th className="px-4 py-2 text-gray-600">顧客名</th>
                <th className="px-4 py-2 text-gray-600">商品</th>
                <th className="px-4 py-2 text-gray-600">金額</th>
                <th className="px-4 py-2 text-gray-600">状態</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200 last:border-b-0">
                  <td className="px-4 py-2 text-gray-800">#{Math.floor(Math.random() * 10000 + 1000)}</td>
                  <td className="px-4 py-2 text-gray-800">顧客 {index + 1}</td>
                  <td className="px-4 py-2 text-gray-800">抹茶セット</td>
                  <td className="px-4 py-2 text-gray-800">¥{(Math.random() * 10000 + 1000).toFixed(0)}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      完了
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;