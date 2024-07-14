import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, PieChart, BarChart2, TrendingUp, Download } from 'lucide-react';

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    // 実際のアプリケーションではAPIからデータを取得します
    const fetchSalesData = () => {
      const mockData = [
        { name: '1月', 売上: 4000, 利益: 2400 },
        { name: '2月', 売上: 3000, 利益: 1398 },
        { name: '3月', 売上: 2000, 利益: 9800 },
        { name: '4月', 売上: 2780, 利益: 3908 },
        { name: '5月', 売上: 1890, 利益: 4800 },
        { name: '6月', 売上: 2390, 利益: 3800 },
        { name: '7月', 売上: 3490, 利益: 4300 },
      ];
      setSalesData(mockData);

      const mockTopProducts = [
        { name: '桜餅', sales: 1200 },
        { name: '抹茶大福', sales: 980 },
        { name: 'どら焼き', sales: 850 },
        { name: '柏餅', sales: 720 },
        { name: '栗きんとん', sales: 650 },
      ];
      setTopProducts(mockTopProducts);
    };

    fetchSalesData();
  }, []);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    // 実際のアプリケーションでは、選択された期間に基づいてデータを再取得します
  };

  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
          <p className="text-sm font-semibold">{`${label}`}</p>
          <p className="text-sm text-green-600">{`売上: ¥${payload[0].value.toLocaleString()}`}</p>
          <p className="text-sm text-blue-600">{`利益: ¥${payload[1].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#F3EAD3] p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-[#4A2311] font-serif">和菓子売上分析</h2>
      
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => handlePeriodChange('monthly')}
            className={`px-4 py-2 rounded-full ${
              selectedPeriod === 'monthly'
                ? 'bg-[#006400] text-white'
                : 'bg-white text-[#4A2311] hover:bg-[#FFB7C5]'
            } transition duration-300 ease-in-out`}
          >
            月次
          </button>
          <button
            onClick={() => handlePeriodChange('quarterly')}
            className={`px-4 py-2 rounded-full ${
              selectedPeriod === 'quarterly'
                ? 'bg-[#006400] text-white'
                : 'bg-white text-[#4A2311] hover:bg-[#FFB7C5]'
            } transition duration-300 ease-in-out`}
          >
            四半期
          </button>
          <button
            onClick={() => handlePeriodChange('yearly')}
            className={`px-4 py-2 rounded-full ${
              selectedPeriod === 'yearly'
                ? 'bg-[#006400] text-white'
                : 'bg-white text-[#4A2311] hover:bg-[#FFB7C5]'
            } transition duration-300 ease-in-out`}
          >
            年次
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-inner mb-8">
        <h3 className="text-xl font-semibold mb-4 text-[#4A2311] font-serif">売上と利益の推移</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#4A2311" />
            <YAxis stroke="#4A2311" />
            <Tooltip content={renderCustomTooltip} />
            <Legend />
            <Line type="monotone" dataKey="売上" stroke="#006400" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="利益" stroke="#FFB7C5" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-[#4A2311] font-serif">売上トップ5商品</h3>
          <ul>
            {topProducts.map((product, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-[#4A2311]">{product.name}</span>
                <span className="font-semibold text-[#006400]">¥{product.sales.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-[#4A2311] font-serif">概要</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="text-[#006400] mr-2" size={24} />
              <div>
                <p className="text-sm text-gray-600">期間</p>
                <p className="font-semibold text-[#4A2311]">2023年1月 - 7月</p>
              </div>
            </div>
            <div className="flex items-center">
              <PieChart className="text-[#006400] mr-2" size={24} />
              <div>
                <p className="text-sm text-gray-600">総売上</p>
                <p className="font-semibold text-[#4A2311]">¥19,550,000</p>
              </div>
            </div>
            <div className="flex items-center">
              <BarChart2 className="text-[#006400] mr-2" size={24} />
              <div>
                <p className="text-sm text-gray-600">平均月間売上</p>
                <p className="font-semibold text-[#4A2311]">¥2,792,857</p>
              </div>
            </div>
            <div className="flex items-center">
              <TrendingUp className="text-[#006400] mr-2" size={24} />
              <div>
                <p className="text-sm text-gray-600">成長率</p>
                <p className="font-semibold text-[#4A2311]">+15.3%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="bg-[#006400] text-white px-6 py-3 rounded-full hover:bg-[#007500] transition duration-300 ease-in-out flex items-center justify-center mx-auto">
          <Download size={18} className="mr-2" />
          レポートをダウンロード
        </button>
      </div>
    </div>
  );
};

export default SalesAnalytics;