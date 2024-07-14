import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, BarChart2, PieChart, TrendingUp, Download } from 'lucide-react';

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [salesByCategory, setSalesByCategory] = useState([]);

  useEffect(() => {
    // 擬似的なデータ取得
    fetchSalesData();
    fetchTopSellingProducts();
    fetchSalesByCategory();
  }, [selectedPeriod]);

  const fetchSalesData = () => {
    // 擬似的な売上データ
    const data = [
      { name: '1月', 売上: 4000 },
      { name: '2月', 売上: 3000 },
      { name: '3月', 売上: 5000 },
      { name: '4月', 売上: 4500 },
      { name: '5月', 売上: 6000 },
      { name: '6月', 売上: 5500 },
      { name: '7月', 売上: 7000 },
      { name: '8月', 売上: 8000 },
      { name: '9月', 売上: 7500 },
      { name: '10月', 売上: 9000 },
      { name: '11月', 売上: 8500 },
      { name: '12月', 売上: 10000 },
    ];
    setSalesData(data);
  };

  const fetchTopSellingProducts = () => {
    // 擬似的な人気商品データ
    const products = [
      { name: '抹茶どら焼き', sales: 1200 },
      { name: '桜餅', sales: 1000 },
      { name: '柚子羊羹', sales: 800 },
      { name: '栗きんとん', sales: 750 },
      { name: '黒胡麻大福', sales: 700 },
    ];
    setTopSellingProducts(products);
  };

  const fetchSalesByCategory = () => {
    // 擬似的なカテゴリ別売上データ
    const categories = [
      { name: '和菓子', value: 60 },
      { name: '抹茶製品', value: 25 },
      { name: '季節限定品', value: 15 },
    ];
    setSalesByCategory(categories);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="bg-[#F3EAD3] p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-[#4A2311] mb-6">売上分析</h2>
      
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => handlePeriodChange('monthly')}
          className={`px-4 py-2 rounded-full ${
            selectedPeriod === 'monthly'
              ? 'bg-[#006400] text-white'
              : 'bg-white text-[#4A2311] hover:bg-[#FFB7C5]'
          } transition duration-300`}
        >
          月次
        </button>
        <button
          onClick={() => handlePeriodChange('quarterly')}
          className={`px-4 py-2 rounded-full ${
            selectedPeriod === 'quarterly'
              ? 'bg-[#006400] text-white'
              : 'bg-white text-[#4A2311] hover:bg-[#FFB7C5]'
          } transition duration-300`}
        >
          四半期
        </button>
        <button
          onClick={() => handlePeriodChange('yearly')}
          className={`px-4 py-2 rounded-full ${
            selectedPeriod === 'yearly'
              ? 'bg-[#006400] text-white'
              : 'bg-white text-[#4A2311] hover:bg-[#FFB7C5]'
          } transition duration-300`}
        >
          年次
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-inner mb-8">
        <h3 className="text-xl font-semibold text-[#4A2311] mb-4 flex items-center">
          <Calendar className="mr-2" /> 期間別売上推移
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#4A2311" />
            <YAxis stroke="#4A2311" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#F3EAD3',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(74, 35, 17, 0.1)',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="売上" stroke="#006400" strokeWidth={2} dot={{ fill: '#006400' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-[#4A2311] mb-4 flex items-center">
            <BarChart2 className="mr-2" /> 人気商品ランキング
          </h3>
          <ul>
            {topSellingProducts.map((product, index) => (
              <li key={index} className="flex justify-between items-center mb-2 p-2 hover:bg-[#F3EAD3] rounded transition duration-300">
                <span className="text-[#4A2311]">{product.name}</span>
                <span className="font-semibold text-[#006400]">{product.sales}個</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-[#4A2311] mb-4 flex items-center">
            <PieChart className="mr-2" /> カテゴリ別売上比率
          </h3>
          <div className="flex flex-col space-y-2">
            {salesByCategory.map((category, index) => (
              <div key={index} className="flex items-center">
                <div className="w-full bg-[#F3EAD3] rounded-full h-4 mr-2">
                  <div
                    className="bg-[#006400] h-4 rounded-full"
                    style={{ width: `${category.value}%` }}
                  ></div>
                </div>
                <span className="text-sm text-[#4A2311] whitespace-nowrap">{category.name} ({category.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 rounded-full shadow-md">
            <TrendingUp className="text-[#006400]" />
          </div>
          <div>
            <p className="text-sm text-[#4A2311]">総売上</p>
            <p className="text-2xl font-bold text-[#006400]">¥12,345,678</p>
          </div>
        </div>
        <button className="bg-[#006400] text-white px-6 py-2 rounded-full hover:bg-[#007500] transition duration-300 flex items-center">
          <Download className="mr-2" /> レポート出力
        </button>
      </div>
    </div>
  );
};

export default SalesAnalytics;