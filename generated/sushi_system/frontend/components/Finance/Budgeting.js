import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const Budgeting = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetStatus, setBudgetStatus] = useState('');

  useEffect(() => {
    // 仮のデータを生成
    const generateData = () => {
      const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
      return months.map(month => ({
        name: month,
        予算: Math.floor(Math.random() * 1000000) + 500000,
        実績: Math.floor(Math.random() * 1000000) + 500000,
      }));
    };

    const newData = generateData();
    setBudgetData(newData);

    const total = newData.reduce((acc, curr) => acc + curr.予算, 0);
    setTotalBudget(total);

    const status = total > 10000000 ? '予算超過' : '予算内';
    setBudgetStatus(status);
  }, [selectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-8 text-indigo-900 border-b-2 border-indigo-500 pb-2">
        回転寿司店 予算管理
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
            <Calendar className="mr-2" />
            年度選択
          </h2>
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {[2021, 2022, 2023, 2024, 2025].map(year => (
              <option key={year} value={year}>{year}年度</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
            <DollarSign className="mr-2" />
            総予算
          </h2>
          <p className="text-3xl font-bold text-gray-800">
            ¥{totalBudget.toLocaleString()}
          </p>
        </div>

        <div className={`bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105 ${
          budgetStatus === '予算超過' ? 'bg-red-50' : 'bg-green-50'
        }`}>
          <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
            <AlertCircle className="mr-2" />
            予算状況
          </h2>
          <p className={`text-2xl font-bold ${
            budgetStatus === '予算超過' ? 'text-red-600' : 'text-green-600'
          }`}>
            {budgetStatus}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-800">月別予算と実績</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={budgetData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="予算" stroke="#4299e1" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="実績" stroke="#48bb78" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
            <TrendingUp className="mr-2" />
            予算超過項目
          </h2>
          <ul className="space-y-2">
            {budgetData.filter(item => item.実績 > item.予算).map((item, index) => (
              <li key={index} className="flex justify-between items-center p-2 bg-red-50 rounded-md">
                <span>{item.name}</span>
                <span className="font-semibold text-red-600">
                  +¥{(item.実績 - item.予算).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
            <TrendingDown className="mr-2" />
            予算節約項目
          </h2>
          <ul className="space-y-2">
            {budgetData.filter(item => item.実績 < item.予算).map((item, index) => (
              <li key={index} className="flex justify-between items-center p-2 bg-green-50 rounded-md">
                <span>{item.name}</span>
                <span className="font-semibold text-green-600">
                  -¥{(item.予算 - item.実績).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Budgeting;