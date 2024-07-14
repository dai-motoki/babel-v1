import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, ChevronDown, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const UsageAnalytics = () => {
  const [timeRange, setTimeRange] = useState('月間');
  const [activeUsers, setActiveUsers] = useState(0);
  const [usageGrowth, setUsageGrowth] = useState(0);

  const mockUsageData = [
    { name: '1月', users: 120, sessions: 1800 },
    { name: '2月', users: 150, sessions: 2200 },
    { name: '3月', users: 200, sessions: 3000 },
    { name: '4月', users: 180, sessions: 2700 },
    { name: '5月', users: 220, sessions: 3300 },
    { name: '6月', users: 250, sessions: 3750 },
  ];

  const mockAppUsage = [
    { name: 'App A', usage: 35 },
    { name: 'App B', usage: 28 },
    { name: 'App C', usage: 22 },
    { name: 'App D', usage: 15 },
    { name: 'その他', usage: 10 },
  ];

  useEffect(() => {
    // 実際のアプリケーションでは、APIからデータを取得します
    setActiveUsers(250);
    setUsageGrowth(12.5);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">使用状況分析</h2>
      
      <div className="flex justify-between items-center mb-8">
        <div className="relative">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
          >
            <option>日間</option>
            <option>週間</option>
            <option>月間</option>
            <option>年間</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={16} />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="bg-indigo-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users size={20} className="text-indigo-600" />
              <span className="text-sm text-gray-600">アクティブユーザー</span>
            </div>
            <p className="text-2xl font-bold text-indigo-600">{activeUsers}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-green-600" />
              <span className="text-sm text-gray-600">使用率成長</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {usageGrowth}%
              {usageGrowth > 0 ? (
                <ArrowUpRight size={20} className="inline ml-1 text-green-600" />
              ) : (
                <ArrowDownRight size={20} className="inline ml-1 text-red-600" />
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">ユーザーとセッション数の推移</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockUsageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="sessions" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">アプリケーション別使用率</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockAppUsage}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="usage" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">利用状況サマリー</h3>
        <p className="text-gray-600">
          直近の{timeRange}では、アクティブユーザー数が{activeUsers}人に達し、
          使用率は前期比{usageGrowth}%{usageGrowth > 0 ? '増加' : '減少'}しました。
          最も利用されているアプリケーションは「App A」で、全体の35%を占めています。
        </p>
      </div>
    </div>
  );
};

export default UsageAnalytics;