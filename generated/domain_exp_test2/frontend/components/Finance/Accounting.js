import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calendar, DollarSign, TrendingUp, TrendingDown, BarChart2, Download } from 'lucide-react';

const Accounting = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [financialData, setFinancialData] = useState(null);

  useEffect(() => {
    // 実際のAPIコールの代わりにモックデータを使用
    const mockData = generateMockData(currentMonth, currentYear);
    setFinancialData(mockData);
  }, [currentMonth, currentYear]);

  const generateMockData = (month, year) => {
    // モックデータの生成（実際のアプリケーションではAPIから取得）
    const revenue = Math.floor(Math.random() * 1000000) + 500000;
    const expenses = Math.floor(Math.random() * 500000) + 200000;
    const profit = revenue - expenses;

    return {
      revenue,
      expenses,
      profit,
      salesByCategory: [
        { name: '季節の和菓子', value: Math.floor(Math.random() * 300000) + 100000 },
        { name: '定番和菓子', value: Math.floor(Math.random() * 200000) + 100000 },
        { name: '贈答用和菓子', value: Math.floor(Math.random() * 150000) + 50000 },
        { name: '茶道用菓子', value: Math.floor(Math.random() * 100000) + 50000 },
      ],
    };
  };

  const handleMonthChange = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value);
  };

  const COLORS = ['#8E354A', '#F8C3CD', '#F4A7B9', '#FEDFE1'];

  if (!financialData) {
    return <div className="text-center text-gray-600">読み込み中...</div>;
  }

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-3xl font-bold text-[#4A2311] mb-8 text-center">菓匠 鈴乃家 会計管理</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => handleMonthChange(-1)}
            className="bg-[#006400] text-white px-4 py-2 rounded hover:bg-[#007500] transition-colors"
          >
            前月
          </button>
          <h2 className="text-xl font-semibold text-[#4A2311]">
            {`${currentYear}年 ${currentMonth + 1}月`}
          </h2>
          <button
            onClick={() => handleMonthChange(1)}
            className="bg-[#006400] text-white px-4 py-2 rounded hover:bg-[#007500] transition-colors"
          >
            翌月
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFB7C5] rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#4A2311]">売上高</h3>
              <DollarSign className="text-[#4A2311]" />
            </div>
            <p className="text-2xl font-bold text-[#4A2311] mt-2">
              {formatCurrency(financialData.revenue)}
            </p>
          </div>
          <div className="bg-[#F3EAD3] rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#4A2311]">経費</h3>
              <TrendingDown className="text-[#4A2311]" />
            </div>
            <p className="text-2xl font-bold text-[#4A2311] mt-2">
              {formatCurrency(financialData.expenses)}
            </p>
          </div>
          <div className="bg-[#006400] rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">利益</h3>
              <TrendingUp className="text-white" />
            </div>
            <p className="text-2xl font-bold text-white mt-2">
              {formatCurrency(financialData.profit)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-[#4A2311] mb-4">カテゴリー別売上</h2>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={financialData.salesByCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {financialData.salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <ul>
              {financialData.salesByCategory.map((category, index) => (
                <li key={category.name} className="flex items-center mb-2">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-[#4A2311]">{category.name}:</span>
                  <span className="ml-2 font-semibold text-[#4A2311]">
                    {formatCurrency(category.value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-[#4A2311] mb-4">会計アクション</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-[#006400] text-white px-4 py-2 rounded hover:bg-[#007500] transition-colors flex items-center justify-center">
            <Calendar className="mr-2" />
            月次レポート作成
          </button>
          <button className="bg-[#006400] text-white px-4 py-2 rounded hover:bg-[#007500] transition-colors flex items-center justify-center">
            <BarChart2 className="mr-2" />
            年間予算設定
          </button>
          <button className="bg-[#006400] text-white px-4 py-2 rounded hover:bg-[#007500] transition-colors flex items-center justify-center">
            <Download className="mr-2" />
            データエクスポート
          </button>
          <button className="bg-[#006400] text-white px-4 py-2 rounded hover:bg-[#007500] transition-colors flex items-center justify-center">
            <DollarSign className="mr-2" />
            経費登録
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accounting;