import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const SalesRevenueTrend = () => {
  const [salesData, setSalesData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 実際のAPIコールの代わりにモックデータを使用
    const mockData = generateMockData();
    setTimeout(() => {
      setSalesData(mockData);
      setLoading(false);
    }, 1000);
  }, [selectedPeriod]);

  const generateMockData = () => {
    const periods = selectedPeriod === 'monthly' ? 12 : 30;
    return Array.from({ length: periods }, (_, i) => ({
      date: selectedPeriod === 'monthly' ? `2023-${String(i + 1).padStart(2, '0')}` : `2023-06-${String(i + 1).padStart(2, '0')}`,
      revenue: Math.floor(Math.random() * 1000000) + 500000,
    }));
  };

  const calculateTotalRevenue = () => {
    return salesData.reduce((sum, item) => sum + item.revenue, 0);
  };

  const calculateGrowthRate = () => {
    if (salesData.length < 2) return 0;
    const firstRevenue = salesData[0].revenue;
    const lastRevenue = salesData[salesData.length - 1].revenue;
    return ((lastRevenue - firstRevenue) / firstRevenue) * 100;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">売上トレンド分析</h2>
      
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <button
            onClick={() => setSelectedPeriod('monthly')}
            className={`px-4 py-2 rounded-full ${
              selectedPeriod === 'monthly' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            } transition duration-300 ease-in-out`}
          >
            月次
          </button>
          <button
            onClick={() => setSelectedPeriod('daily')}
            className={`px-4 py-2 rounded-full ${
              selectedPeriod === 'daily' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            } transition duration-300 ease-in-out`}
          >
            日次
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="text-green-500" size={20} />
          <span className="text-sm text-gray-600">
            {formatDate(salesData[0]?.date)} - {formatDate(salesData[salesData.length - 1]?.date)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">総売上</h3>
          <div className="flex items-center">
            <DollarSign className="text-green-500 mr-2" size={24} />
            <span className="text-2xl font-bold text-gray-800">{formatCurrency(calculateTotalRevenue())}</span>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">成長率</h3>
          <div className="flex items-center">
            {calculateGrowthRate() >= 0 ? (
              <TrendingUp className="text-green-500 mr-2" size={24} />
            ) : (
              <TrendingDown className="text-red-500 mr-2" size={24} />
            )}
            <span className={`text-2xl font-bold ${calculateGrowthRate() >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {calculateGrowthRate().toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={salesData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
              stroke="#4a5568"
            />
            <YAxis stroke="#4a5568" tickFormatter={(value) => `¥${(value / 1000000).toFixed(1)}M`} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
              labelStyle={{ color: '#2d3748', fontWeight: 'bold' }}
              formatter={(value) => [`${formatCurrency(value)}`, '売上']}
              labelFormatter={(label) => formatDate(label)}
            />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#48bb78" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} name="売上" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">分析概要</h3>
        <p className="text-gray-600 leading-relaxed">
          この期間の売上トレンドを分析すると、全体的に
          {calculateGrowthRate() >= 0 ? '上昇傾向' : '下降傾向'}
          にあります。特に注目すべき点として、
          {salesData.reduce((max, item) => (item.revenue > max.revenue ? item : max), salesData[0]).date}
          に最高売上を記録しています。今後の戦略立案にあたっては、この傾向を考慮し、
          成功要因の分析や改善点の特定を行うことが重要です。
        </p>
      </div>
    </div>
  );
};

export default SalesRevenueTrend;