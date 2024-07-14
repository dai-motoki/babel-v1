import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Download, Printer, FileText, BarChart2, PieChart } from 'lucide-react';

const FinancialReporting = () => {
  const [selectedReport, setSelectedReport] = useState('monthly');
  const [financialData, setFinancialData] = useState([]);

  useEffect(() => {
    // 実際のAPIコールの代わりにモックデータを使用
    const mockData = [
      { month: '1月', revenue: 1000000, expenses: 800000, profit: 200000 },
      { month: '2月', revenue: 1200000, expenses: 900000, profit: 300000 },
      { month: '3月', revenue: 1500000, expenses: 1100000, profit: 400000 },
      { month: '4月', revenue: 1300000, expenses: 1000000, profit: 300000 },
      { month: '5月', revenue: 1600000, expenses: 1200000, profit: 400000 },
      { month: '6月', revenue: 1800000, expenses: 1300000, profit: 500000 },
    ];
    setFinancialData(mockData);
  }, []);

  const handleReportChange = (report) => {
    setSelectedReport(report);
  };

  const renderChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={financialData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" stroke="#4A2311" />
          <YAxis stroke="#4A2311" />
          <Tooltip contentStyle={{ backgroundColor: '#F3EAD3', border: 'none' }} />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#006400" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="expenses" stroke="#FFB7C5" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="profit" stroke="#4A2311" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderSummary = () => {
    const latestData = financialData[financialData.length - 1] || {};
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-green-700">
          <h3 className="text-lg font-semibold text-green-800 mb-2">収益</h3>
          <p className="text-2xl font-bold text-green-900">¥{latestData.revenue?.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-pink-300">
          <h3 className="text-lg font-semibold text-pink-700 mb-2">経費</h3>
          <p className="text-2xl font-bold text-pink-800">¥{latestData.expenses?.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-brown-500">
          <h3 className="text-lg font-semibold text-brown-700 mb-2">利益</h3>
          <p className="text-2xl font-bold text-brown-900">¥{latestData.profit?.toLocaleString()}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-beige-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-brown-900 mb-8">財務報告</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <button
              onClick={() => handleReportChange('monthly')}
              className={`px-4 py-2 rounded-full ${
                selectedReport === 'monthly'
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition duration-300 ease-in-out`}
            >
              月次報告
            </button>
            <button
              onClick={() => handleReportChange('quarterly')}
              className={`px-4 py-2 rounded-full ${
                selectedReport === 'quarterly'
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition duration-300 ease-in-out`}
            >
              四半期報告
            </button>
            <button
              onClick={() => handleReportChange('yearly')}
              className={`px-4 py-2 rounded-full ${
                selectedReport === 'yearly'
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition duration-300 ease-in-out`}
            >
              年次報告
            </button>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 ease-in-out">
              <Download size={18} className="mr-2" />
              ダウンロード
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
              <Printer size={18} className="mr-2" />
              印刷
            </button>
          </div>
        </div>
        {renderChart()}
        {renderSummary()}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-brown-900 mb-4">主要な指標</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <BarChart2 size={24} className="text-green-700 mr-3" />
              <span className="text-lg">売上高成長率: 15%</span>
            </li>
            <li className="flex items-center">
              <PieChart size={24} className="text-pink-500 mr-3" />
              <span className="text-lg">利益率: 22%</span>
            </li>
            <li className="flex items-center">
              <Calendar size={24} className="text-blue-500 mr-3" />
              <span className="text-lg">次回の報告日: 2023年7月15日</span>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-brown-900 mb-4">関連文書</h2>
          <ul className="space-y-4">
            <li>
              <a href="#" className="flex items-center text-green-700 hover:text-green-900 transition duration-300 ease-in-out">
                <FileText size={24} className="mr-3" />
                <span className="text-lg">詳細な財務諸表</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-green-700 hover:text-green-900 transition duration-300 ease-in-out">
                <FileText size={24} className="mr-3" />
                <span className="text-lg">監査報告書</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-green-700 hover:text-green-900 transition duration-300 ease-in-out">
                <FileText size={24} className="mr-3" />
                <span className="text-lg">予算計画</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FinancialReporting;