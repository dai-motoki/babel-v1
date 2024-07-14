import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingUp, DollarSign, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const SalesRevenueTrend = () => {
  // モックデータを使用
  const mockData = [
    { month: '1月', revenue: 1000000, profit: 300000 },
    { month: '2月', revenue: 1200000, profit: 350000 },
    { month: '3月', revenue: 1500000, profit: 450000 },
    { month: '4月', revenue: 1300000, profit: 400000 },
    { month: '5月', revenue: 1800000, profit: 550000 },
    { month: '6月', revenue: 2000000, profit: 600000 },
  ];

  const [data, setData] = useState(mockData);

  // 売上と利益の増減率を計算
  const calculateGrowthRate = (data) => {
    if (data.length < 2) return { revenueGrowth: 0, profitGrowth: 0 };
    const firstMonth = data[0];
    const lastMonth = data[data.length - 1];
    const revenueGrowth = ((lastMonth.revenue - firstMonth.revenue) / firstMonth.revenue) * 100;
    const profitGrowth = ((lastMonth.profit - firstMonth.profit) / firstMonth.profit) * 100;
    return { revenueGrowth, profitGrowth };
  };

  const { revenueGrowth, profitGrowth } = calculateGrowthRate(data);

  const formatYAxis = (value) => `¥${value.toLocaleString()}`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-bold text-gray-800">{label}</p>
          <p className="text-blue-600">売上: ¥{payload[0].value.toLocaleString()}</p>
          <p className="text-green-600">利益: ¥{payload[1].value.toLocaleString()}</p>
          <p className="text-gray-600 text-sm mt-2">利益率: {((payload[1].value / payload[0].value) * 100).toFixed(2)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <TrendingUp className="mr-2 h-8 w-8 text-blue-500" />
        売上トレンド分析
      </h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#333' }}
            axisLine={{ stroke: '#333' }}
            tickLine={{ stroke: '#333' }}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fill: '#333' }}
            axisLine={{ stroke: '#333' }}
            tickLine={{ stroke: '#333' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="revenue"
            name="売上"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 6, strokeWidth: 2, fill: '#fff' }}
            activeDot={{ r: 8, strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            name="利益"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 6, strokeWidth: 2, fill: '#fff' }}
            activeDot={{ r: 8, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-2 flex items-center">
            <DollarSign className="mr-2 h-6 w-6" />
            総売上
          </h3>
          <p className="text-2xl font-bold text-blue-900">
            ¥{data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
          </p>
          <div className={`flex items-center mt-2 ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {revenueGrowth >= 0 ? <ArrowUpCircle className="h-5 w-5 mr-1" /> : <ArrowDownCircle className="h-5 w-5 mr-1" />}
            <span className="font-semibold">{Math.abs(revenueGrowth).toFixed(2)}%</span>
            <span className="ml-1 text-sm">前期比</span>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center">
            <DollarSign className="mr-2 h-6 w-6" />
            総利益
          </h3>
          <p className="text-2xl font-bold text-green-900">
            ¥{data.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}
          </p>
          <div className={`flex items-center mt-2 ${profitGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {profitGrowth >= 0 ? <ArrowUpCircle className="h-5 w-5 mr-1" /> : <ArrowDownCircle className="h-5 w-5 mr-1" />}
            <span className="font-semibold">{Math.abs(profitGrowth).toFixed(2)}%</span>
            <span className="ml-1 text-sm">前期比</span>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">分析概要</h3>
        <p className="text-gray-700">
          過去6ヶ月間の売上トレンドを見ると、着実な成長が見られます。特に、6月の売上は2,000,000円に達し、1月と比較して100%の成長を示しています。
          利益も同様に増加傾向にあり、売上の成長に伴って順調に拡大しています。
          今後は、この成長率を維持しつつ、さらなる効率化を図ることで利益率の向上を目指すことが重要です。
        </p>
      </div>
    </div>
  );
};

export default SalesRevenueTrend;
