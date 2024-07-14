import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, TrendingUp, TrendingDown, FileText, Download } from 'lucide-react';

const FinancialReporting = () => {
  const [financialData, setFinancialData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 実際のAPIコールの代わりにモックデータを使用
    const fetchFinancialData = async () => {
      setLoading(true);
      // APIコールをシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData = generateMockData(selectedYear);
      setFinancialData(mockData);
      setLoading(false);
    };

    fetchFinancialData();
  }, [selectedYear]);

  const generateMockData = (year) => {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    return months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 1000000) + 500000,
      expenses: Math.floor(Math.random() * 800000) + 300000,
      profit: Math.floor(Math.random() * 500000) + 100000,
    }));
  };

  const calculateTotals = () => {
    if (!financialData) return { totalRevenue: 0, totalExpenses: 0, totalProfit: 0 };
    return financialData.reduce((acc, curr) => ({
      totalRevenue: acc.totalRevenue + curr.revenue,
      totalExpenses: acc.totalExpenses + curr.expenses,
      totalProfit: acc.totalProfit + curr.profit,
    }), { totalRevenue: 0, totalExpenses: 0, totalProfit: 0 });
  };

  const { totalRevenue, totalExpenses, totalProfit } = calculateTotals();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const renderSummaryCard = (title, value, icon, trend) => (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{formatCurrency(value)}</p>
      </div>
      <div className={`rounded-full p-3 ${trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
        {icon}
      </div>
    </div>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
    </div>;
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-500 pb-2">財務報告</h2>
      
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <Calendar className="mr-2 text-green-600" />
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {[2021, 2022, 2023, 2024].map(year => (
              <option key={year} value={year}>{year}年</option>
            ))}
          </select>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center">
          <Download className="mr-2" />
          レポートをダウンロード
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {renderSummaryCard("総収入", totalRevenue, <DollarSign className="text-green-500" size={24} />, 'up')}
        {renderSummaryCard("総支出", totalExpenses, <FileText className="text-red-500" size={24} />, 'down')}
        {renderSummaryCard("純利益", totalProfit, <TrendingUp className="text-blue-500" size={24} />, 'up')}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">月次財務概要</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px' }}
              labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
            />
            <Legend />
            <Bar dataKey="revenue" name="収入" fill="#34d399" />
            <Bar dataKey="expenses" name="支出" fill="#f87171" />
            <Bar dataKey="profit" name="利益" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">詳細財務データ</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">月</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">収入</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">支出</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">利益</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financialData.map((data, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(data.revenue)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(data.expenses)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(data.profit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialReporting;