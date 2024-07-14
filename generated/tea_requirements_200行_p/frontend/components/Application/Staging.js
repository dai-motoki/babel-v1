import React, { useState, useEffect } from 'react';
import { Server, Database, GitBranch, Monitor, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Staging = () => {
  const [deployments, setDeployments] = useState([]);
  const [serverStatus, setServerStatus] = useState('operational');
  const [databaseStatus, setDatabaseStatus] = useState('operational');
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // モックデータの生成
    const mockDeployments = [
      { id: 1, branch: 'feature/new-product-page', status: 'success', timestamp: '2023-06-01 14:30:00' },
      { id: 2, branch: 'hotfix/cart-bug', status: 'failed', timestamp: '2023-06-02 09:15:00' },
      { id: 3, branch: 'develop', status: 'in-progress', timestamp: '2023-06-03 11:45:00' },
    ];
    setDeployments(mockDeployments);

    const mockPerformanceData = [
      { name: '1日前', responseTime: 250, errorRate: 0.5 },
      { name: '2日前', responseTime: 280, errorRate: 0.8 },
      { name: '3日前', responseTime: 220, errorRate: 0.3 },
      { name: '4日前', responseTime: 300, errorRate: 1.2 },
      { name: '5日前', responseTime: 260, errorRate: 0.7 },
    ];
    setPerformanceData(mockPerformanceData);
  }, []);

  const refreshStatus = () => {
    setServerStatus(Math.random() > 0.8 ? 'degraded' : 'operational');
    setDatabaseStatus(Math.random() > 0.9 ? 'down' : 'operational');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="text-yellow-500" />;
      case 'down':
        return <XCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">ステージング環境</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* システムステータス */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">システムステータス</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Server className="mr-2 text-indigo-600" />
              <span className="text-gray-700">サーバー:</span>
            </div>
            <div className="flex items-center">
              {getStatusIcon(serverStatus)}
              <span className="ml-2 text-gray-600">{serverStatus === 'operational' ? '正常' : serverStatus === 'degraded' ? '低下' : '停止'}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Database className="mr-2 text-indigo-600" />
              <span className="text-gray-700">データベース:</span>
            </div>
            <div className="flex items-center">
              {getStatusIcon(databaseStatus)}
              <span className="ml-2 text-gray-600">{databaseStatus === 'operational' ? '正常' : databaseStatus === 'degraded' ? '低下' : '停止'}</span>
            </div>
          </div>
          <button
            onClick={refreshStatus}
            className="mt-4 flex items-center justify-center w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            <RefreshCw className="mr-2" />
            ステータス更新
          </button>
        </div>

        {/* 最近のデプロイメント */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">最近のデプロイメント</h2>
          <ul className="space-y-4">
            {deployments.map((deployment) => (
              <li key={deployment.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <GitBranch className="mr-2 text-indigo-600" />
                  <span className="text-gray-700">{deployment.branch}</span>
                </div>
                <div className="flex items-center">
                  {deployment.status === 'success' && <CheckCircle className="text-green-500 mr-2" />}
                  {deployment.status === 'failed' && <XCircle className="text-red-500 mr-2" />}
                  {deployment.status === 'in-progress' && <RefreshCw className="text-yellow-500 mr-2 animate-spin" />}
                  <span className="text-sm text-gray-500">{deployment.timestamp}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* パフォーマンスグラフ */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">パフォーマンス指標</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="responseTime" stroke="#8884d8" name="応答時間 (ms)" />
              <Line yAxisId="right" type="monotone" dataKey="errorRate" stroke="#82ca9d" name="エラー率 (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* モニタリングダッシュボード */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">モニタリングダッシュボード</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2 text-gray-700">CPU使用率</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-700">70%</span>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2 text-gray-700">メモリ使用率</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-700">55%</span>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2 text-gray-700">ディスク使用率</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-700">40%</span>
            </div>
          </div>
        </div>
      </div>

      {/* アクティブセッション */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">アクティブセッション</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ユーザーID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP アドレス</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終アクティビティ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">user_123</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">192.168.1.100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2分前</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">アクティブ</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">user_456</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">192.168.1.101</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">5分前</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">アイドル</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Staging;