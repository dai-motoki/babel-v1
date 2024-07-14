import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, BarChart2, TrendingUp, DollarSign, Package, Users } from 'lucide-react';

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('月間');
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [salesSummary, setSalesSummary] = useState({
    totalRevenue: 0,
    averageOrderValue: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    // モックデータの生成（実際のアプリケーションではAPIから取得）
    const generateMockData = () => {
      const periods = selectedPeriod === '月間' ? 30 : 12;
      const data = [];
      let totalRevenue = 0;
      let totalOrders = 0;

      for (let i = 0; i < periods; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const sales = Math.floor(Math.random() * 50000) + 10000;
        totalRevenue += sales;
        totalOrders += Math.floor(sales / 1000);

        data.push({
          date: date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }),
          sales: sales,
        });
      }

      setSalesData(data.reverse());
      setTopSellingProducts([
        { name: '抹茶どら焼き', sales: Math.floor(Math.random() * 1000) + 500 },
        { name: '桜餅', sales: Math.floor(Math.random() * 1000) + 500 },
        { name: '柚子羊羹', sales: Math.floor(Math.random() * 1000) + 500 },
        { name: '栗きんとん', sales: Math.floor(Math.random() * 1000) + 500 },
        { name: '黒糖まんじゅう', sales: Math.floor(Math.random() * 1000) + 500 },
      ]);
      setSalesSummary({
        totalRevenue: totalRevenue,
        averageOrderValue: Math.floor(totalRevenue / totalOrders),
        totalOrders: totalOrders,
        totalCustomers: Math.floor(totalOrders * 0.8),
      });
    };

    generateMockData();
  }, [selectedPeriod]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="bg-[#F3EAD3] p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-[#4A2311] mb-6">売上分析</h1>
      
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => handlePeriodChange('月間')}
            className={`px-4 py-2 rounded-full ${
              selectedPeriod === '月間'
                ? 'bg-[#006400] text-white'
                : 'bg-white text-[#4A2311] hover:bg-[#FFB7C5]'
            } transition duration-300 ease-in-out`}
          >
            月間
          </button>
          <button
            onClick={() => handlePeriodChange('年間')}
            className={`px-4 py-2 rounded-full ${
              selectedPeriod === '年間'
                ? 'bg-[#006400] text-white'
                : 'bg-white text-[#4A2311] hover:bg-[#FFB7C5]'
            } transition duration-300 ease-in-out`}
          >
            年間
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#4A2311] mb-4">売上推移</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#006400" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#4A2311] mb-4">人気商品ランキング</h2>
          <ul>
            {topSellingProducts.map((product, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-[#4A2311]">{product.name}</span>
                <span className="font-semibold text-[#006400]">{product.sales}個</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <DollarSign className="text-[#006400] mr-2" />
            <h3 className="text-lg font-semibold text-[#4A2311]">総売上</h3>
          </div>
          <p className="text-2xl font-bold text-[#006400]">
            ¥{salesSummary.totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <TrendingUp className="text-[#006400] mr-2" />
            <h3 className="text-lg font-semibold text-[#4A2311]">平均注文額</h3>
          </div>
          <p className="text-2xl font-bold text-[#006400]">
            ¥{salesSummary.averageOrderValue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <Package className="text-[#006400] mr-2" />
            <h3 className="text-lg font-semibold text-[#4A2311]">総注文数</h3>
          </div>
          <p className="text-2xl font-bold text-[#006400]">
            {salesSummary.totalOrders.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <Users className="text-[#006400] mr-2" />
            <h3 className="text-lg font-semibold text-[#4A2311]">総顧客数</h3>
          </div>
          <p className="text-2xl font-bold text-[#006400]">
            {salesSummary.totalCustomers.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;