import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, BarChart2, PieChart, TrendingUp, DollarSign } from 'lucide-react';

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [topSellingItems, setTopSellingItems] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // モックデータの生成
    const generateMockData = () => {
      const periods = {
        weekly: 7,
        monthly: 30,
        yearly: 12
      };

      const data = [];
      const items = ['マグロ', 'サーモン', 'イカ', 'エビ', 'タコ', 'ウニ', 'イクラ'];
      let total = 0;

      for (let i = 0; i < periods[selectedPeriod]; i++) {
        const day = {
          name: `Day ${i + 1}`,
          売上: Math.floor(Math.random() * 50000) + 10000,
        };
        items.forEach(item => {
          day[item] = Math.floor(Math.random() * 100) + 10;
        });
        total += day.売上;
        data.push(day);
      }

      setSalesData(data);
      setTopSellingItems(
        items.map(item => ({
          name: item,
          value: data.reduce((acc, cur) => acc + cur[item], 0)
        })).sort((a, b) => b.value - a.value).slice(0, 5)
      );
      setLoading(false);
    };

    generateMockData();
  }, [selectedPeriod]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value);
  };

  const totalSales = salesData.reduce((acc, cur) => acc + cur.売上, 0);

  const renderPeriodSelector = () => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-indigo-800">期間選択</h3>
      <div className="flex space-x-4">
        {['weekly', 'monthly', 'yearly'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              selectedPeriod === period
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100'
            }`}
          >
            {period === 'weekly' ? '週間' : period === 'monthly' ? '月間' : '年間'}
          </button>
        ))}
      </div>
    </div>
  );

  const renderSalesChart = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-4 text-indigo-800 flex items-center">
        <TrendingUp className="mr-2" /> 売上推移
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" stroke="#4a5568" />
          <YAxis stroke="#4a5568" />
          <Tooltip
            contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
            formatter={(value) => formatCurrency(value)}
          />
          <Legend />
          <Line type="monotone" dataKey="売上" stroke="#4c51bf" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderTopSellingItems = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-4 text-indigo-800 flex items-center">
        <PieChart className="mr-2" /> 人気商品ランキング
      </h3>
      <ul className="space-y-2">
        {topSellingItems.map((item, index) => (
          <li key={item.name} className="flex items-center justify-between">
            <span className="flex items-center">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-300' : index === 2 ? 'bg-orange-400' : 'bg-gray-200'
              }`}>
                {index + 1}
              </span>
              {item.name}
            </span>
            <span className="font-semibold">{item.value}個</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderSalesSummary = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-indigo-800 flex items-center">
          <DollarSign className="mr-2" /> 総売上
        </h3>
        <p className="text-3xl font-bold text-indigo-600">{formatCurrency(totalSales)}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-indigo-800 flex items-center">
          <BarChart2 className="mr-2" /> 平均日次売上
        </h3>
        <p className="text-3xl font-bold text-indigo-600">{formatCurrency(totalSales / salesData.length)}</p>
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-center py-10">読み込み中...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-indigo-900 flex items-center">
        <Calendar className="mr-2" /> 売上分析
      </h2>
      {renderPeriodSelector()}
      {renderSalesSummary()}
      {renderSalesChart()}
      {renderTopSellingItems()}
    </div>
  );
};

export default SalesAnalytics;