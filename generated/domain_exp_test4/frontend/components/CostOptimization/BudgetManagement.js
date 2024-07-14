import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown, Calendar, DollarSign, TrendingUp, AlertCircle } from 'react-feather';

const BudgetManagement = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('全部門');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // 実際のアプリケーションではAPIからデータを取得します
    const fetchData = async () => {
      // モックデータ
      const mockData = [
        { name: '1月', 予算: 4000, 実績: 3800 },
        { name: '2月', 予算: 3500, 実績: 3200 },
        { name: '3月', 予算: 4200, 実績: 4300 },
        { name: '4月', 予算: 3800, 実績: 3600 },
        { name: '5月', 予算: 4100, 実績: 3900 },
        { name: '6月', 予算: 3900, 実績: 4100 },
        { name: '7月', 予算: 4300, 実績: 4200 },
        { name: '8月', 予算: 4500, 実績: 4400 },
        { name: '9月', 予算: 4200, 実績: 4000 },
        { name: '10月', 予算: 4400, 実績: 4300 },
        { name: '11月', 予算: 4600, 実績: 4500 },
        { name: '12月', 予算: 5000, 実績: 4800 },
      ];
      setBudgetData(mockData);
    };
    fetchData();
  }, [selectedDepartment, selectedYear]);

  const totalBudget = budgetData.reduce((sum, item) => sum + item.予算, 0);
  const totalActual = budgetData.reduce((sum, item) => sum + item.実績, 0);
  const difference = totalBudget - totalActual;
  const differencePercentage = ((difference / totalBudget) * 100).toFixed(2);

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-red-500 pb-2">予算管理ダッシュボード</h1>
      
      <div className="mb-8 flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="relative">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option>全部門</option>
              <option>営業部</option>
              <option>マーケティング部</option>
              <option>開発部</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={16} />
            </div>
          </div>
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {[2021, 2022, 2023, 2024].map(year => (
                <option key={year} value={year}>{year}年</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          レポート出力
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">総予算</h3>
            <Calendar className="text-blue-500" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">¥{totalBudget.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">総実績</h3>
            <DollarSign className="text-green-500" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">¥{totalActual.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">差異</h3>
            <TrendingUp className="text-red-500" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">¥{difference.toLocaleString()} ({differencePercentage}%)</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">予算 vs 実績グラフ</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={budgetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="予算" fill="#3B82F6" />
            <Bar dataKey="実績" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">予算超過アラート</h2>
        <div className="flex items-center space-x-4 text-yellow-600">
          <AlertCircle size={24} />
          <p>マーケティング部門が予算を5%超過しています。確認してください。</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetManagement;