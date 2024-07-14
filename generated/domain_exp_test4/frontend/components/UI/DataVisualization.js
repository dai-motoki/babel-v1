import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1月', value: 400 },
  { name: '2月', value: 300 },
  { name: '3月', value: 600 },
  { name: '4月', value: 800 },
  { name: '5月', value: 500 },
  { name: '6月', value: 700 },
];

const pieData = [
  { name: 'デバイス', value: 400 },
  { name: 'SaaS', value: 300 },
  { name: 'セキュリティ', value: 300 },
  { name: 'コスト', value: 200 },
];

const DataVisualization = () => {
  const [activeChart, setActiveChart] = useState('line');

  const renderChart = () => {
    switch (activeChart) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie dataKey="value" data={pieData} fill="#8884d8" label />
            <Tooltip />
          </PieChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">データ可視化</h2>
      <div className="mb-4 flex space-x-2">
        <button
          className={`px-4 py-2 rounded-md ${
            activeChart === 'line'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveChart('line')}
        >
          折れ線グラフ
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeChart === 'bar'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveChart('bar')}
        >
          棒グラフ
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeChart === 'pie'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveChart('pie')}
        >
          円グラフ
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeChart === 'area'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveChart('area')}
        >
          エリアチャート
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-inner">
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">データサマリー</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-2 text-indigo-600">総デバイス数</h4>
            <p className="text-3xl font-bold text-gray-800">1,234</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-2 text-indigo-600">アクティブユーザー</h4>
            <p className="text-3xl font-bold text-gray-800">789</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-2 text-indigo-600">月間コスト削減</h4>
            <p className="text-3xl font-bold text-gray-800">¥123,456</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-2 text-indigo-600">セキュリティスコア</h4>
            <p className="text-3xl font-bold text-gray-800">92%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;