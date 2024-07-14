import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, DollarSign, Users } from 'lucide-react';

const mockData = [
  { date: '2023-01', マグロ: 120, サーモン: 80, イカ: 60, タコ: 40, ウニ: 30 },
  { date: '2023-02', マグロ: 130, サーモン: 90, イカ: 50, タコ: 45, ウニ: 35 },
  { date: '2023-03', マグロ: 140, サーモン: 85, イカ: 70, タコ: 50, ウニ: 40 },
  { date: '2023-04', マグロ: 150, サーモン: 95, イカ: 65, タコ: 55, ウニ: 45 },
  { date: '2023-05', マグロ: 160, サーモン: 100, イカ: 75, タコ: 60, ウニ: 50 },
  { date: '2023-06', マグロ: 170, サーモン: 110, イカ: 80, タコ: 65, ウニ: 55 },
];

const PopularItemTrends = () => {
  const [selectedItems, setSelectedItems] = useState(['マグロ', 'サーモン']);
  const [timeRange, setTimeRange] = useState('6ヶ月');
  const [animationKey, setAnimationKey] = useState(0);

  const colors = {
    マグロ: '#FF4136',
    サーモン: '#FF851B',
    イカ: '#FFFFFF',
    タコ: '#85144b',
    ウニ: '#FFDC00',
  };

  useEffect(() => {
    setAnimationKey(prevKey => prevKey + 1);
  }, [selectedItems, timeRange]);

  const handleItemToggle = (item) => {
    setSelectedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 p-4 rounded shadow-md">
          <p className="font-semibold text-gray-700">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#F3EAD3] p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#4A2311] font-yuji">人気商品トレンド分析</h2>
      
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Calendar className="text-[#003366]" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003366]"
          >
            <option>1ヶ月</option>
            <option>3ヶ月</option>
            <option>6ヶ月</option>
            <option>1年</option>
          </select>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {Object.keys(colors).map((item) => (
            <button
              key={item}
              onClick={() => handleItemToggle(item)}
              className={`py-2 px-4 rounded-full transition-all duration-300 ${
                selectedItems.includes(item)
                  ? 'bg-[#003366] text-white'
                  : 'bg-white text-[#003366] border border-[#003366]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-inner mb-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={mockData} key={animationKey}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#4A2311" />
            <YAxis stroke="#4A2311" />
            <Tooltip content={renderCustomTooltip} />
            <Legend />
            {selectedItems.map((item) => (
              <Line
                key={item}
                type="monotone"
                dataKey={item}
                stroke={colors[item]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#4A2311]">トレンド予測</h3>
            <TrendingUp className="text-[#003366]" />
          </div>
          <p className="text-gray-600">
            来月のトレンドは「ウニ」の人気が急上昇すると予測されています。季節のメニューに取り入れることをおすすめします。
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#4A2311]">売上貢献度</h3>
            <DollarSign className="text-[#003366]" />
          </div>
          <p className="text-gray-600">
            「マグロ」は全体売上の30%を占め、最も高い売上貢献度を示しています。品質管理と在庫確保に注力しましょう。
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#4A2311]">顧客嗜好分析</h3>
            <Users className="text-[#003366]" />
          </div>
          <p className="text-gray-600">
            20代〜30代の若い世代で「サーモン」の人気が高まっています。SNSでの写真映えを意識したメニュー開発が効果的でしょう。
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularItemTrends;