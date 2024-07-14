import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, TrendingUp, Filter } from 'lucide-react';

const SalesRevenueTrend = () => {
  const [salesData, setSalesData] = useState([]);
  const [timeRange, setTimeRange] = useState('monthly');
  const [productFilter, setProductFilter] = useState('all');

  useEffect(() => {
    // 実際のアプリケーションではAPIからデータを取得します
    const fetchData = () => {
      const mockData = [
        { date: '2023-01', revenue: 50000, products: { matcha: 30000, sencha: 15000, gyokuro: 5000 } },
        { date: '2023-02', revenue: 55000, products: { matcha: 32000, sencha: 18000, gyokuro: 5000 } },
        { date: '2023-03', revenue: 60000, products: { matcha: 35000, sencha: 20000, gyokuro: 5000 } },
        { date: '2023-04', revenue: 58000, products: { matcha: 33000, sencha: 19000, gyokuro: 6000 } },
        { date: '2023-05', revenue: 62000, products: { matcha: 36000, sencha: 21000, gyokuro: 5000 } },
        { date: '2023-06', revenue: 65000, products: { matcha: 38000, sencha: 22000, gyokuro: 5000 } },
      ];
      setSalesData(mockData);
    };

    fetchData();
  }, []);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // 実際のアプリケーションでは、選択された範囲に基づいてデータを再取得します
  };

  const handleProductFilterChange = (product) => {
    setProductFilter(product);
  };

  const getFilteredData = () => {
    if (productFilter === 'all') {
      return salesData;
    }
    return salesData.map(item => ({
      ...item,
      revenue: item.products[productFilter]
    }));
  };

  const formatYAxis = (value) => {
    return `¥${value / 1000}k`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <TrendingUp className="mr-2 text-green-600" />
        売上トレンド
      </h2>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => handleTimeRangeChange('monthly')}
            className={`px-3 py-1 rounded-full text-sm ${
              timeRange === 'monthly' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            月次
          </button>
          <button
            onClick={() => handleTimeRangeChange('quarterly')}
            className={`px-3 py-1 rounded-full text-sm ${
              timeRange === 'quarterly' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            四半期
          </button>
          <button
            onClick={() => handleTimeRangeChange('yearly')}
            className={`px-3 py-1 rounded-full text-sm ${
              timeRange === 'yearly' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            年次
          </button>
        </div>
        <div className="relative">
          <select
            onChange={(e) => handleProductFilterChange(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">全商品</option>
            <option value="matcha">抹茶</option>
            <option value="sencha">煎茶</option>
            <option value="gyokuro">玉露</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <Filter className="h-4 w-4" />
          </div>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={getFilteredData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" stroke="#4a5568" />
            <YAxis tickFormatter={formatYAxis} stroke="#4a5568" />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0' }}
              formatter={(value) => [`¥${value.toLocaleString()}`, '売上']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#38a169"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            期間
          </h3>
          <p className="text-green-700">{timeRange === 'monthly' ? '月次' : timeRange === 'quarterly' ? '四半期' : '年次'}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            総売上
          </h3>
          <p className="text-green-700">
            ¥{salesData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            成長率
          </h3>
          <p className="text-green-700">
            {salesData.length > 1
              ? `${(
                  ((salesData[salesData.length - 1].revenue - salesData[0].revenue) / salesData[0].revenue) *
                  100
                ).toFixed(2)}%`
              : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesRevenueTrend;