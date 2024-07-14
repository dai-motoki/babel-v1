import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Server, Database, Cloud, Activity, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const Staging = () => {
  const [deployments, setDeployments] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // 擬似的なデータフェッチ
    fetchDeployments();
    fetchPerformanceData();
    fetchErrors();
  }, []);

  const fetchDeployments = () => {
    // 擬似的なデプロイメントデータ
    const mockDeployments = [
      { id: 1, version: 'v1.2.3', status: 'success', timestamp: '2023-05-15 10:30:00' },
      { id: 2, version: 'v1.2.2', status: 'failed', timestamp: '2023-05-14 15:45:00' },
      { id: 3, version: 'v1.2.1', status: 'success', timestamp: '2023-05-13 09:15:00' },
    ];
    setDeployments(mockDeployments);
  };

  const fetchPerformanceData = () => {
    // 擬似的なパフォーマンスデータ
    const mockPerformanceData = [
      { name: '5/10', cpu: 45, memory: 60, network: 30 },
      { name: '5/11', cpu: 50, memory: 65, network: 35 },
      { name: '5/12', cpu: 55, memory: 70, network: 40 },
      { name: '5/13', cpu: 60, memory: 75, network: 45 },
      { name: '5/14', cpu: 65, memory: 80, network: 50 },
      { name: '5/15', cpu: 70, memory: 85, network: 55 },
    ];
    setPerformanceData(mockPerformanceData);
  };

  const fetchErrors = () => {
    // 擬似的なエラーデータ
    const mockErrors = [
      { id: 1, type: 'API Error', message: 'Failed to fetch user data', timestamp: '2023-05-15 11:23:45' },
      { id: 2, type: 'Database Error', message: 'Connection timeout', timestamp: '2023-05-15 10:15:30' },
      { id: 3, type: 'Frontend Error', message: 'Uncaught TypeError', timestamp: '2023-05-14 22:45:10' },
    ];
    setErrors(mockErrors);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-500" />;
      case 'failed':
        return <XCircle className="text-red-500" />;
      default:
        return <AlertTriangle className="text-yellow-500" />;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">ステージング環境</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Server className="mr-2" /> サーバー状態
          </h2>
          <div className="flex items-center justify-between mb-2">
            <span>CPU使用率:</span>
            <span className="font-bold">{performanceData[performanceData.length - 1]?.cpu}%</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span>メモリ使用率:</span>
            <span className="font-bold">{performanceData[performanceData.length - 1]?.memory}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>ネットワーク使用率:</span>
            <span className="font-bold">{performanceData[performanceData.length - 1]?.network}%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Database className="mr-2" /> データベース状態
          </h2>
          <div className="flex items-center justify-between mb-2">
            <span>接続数:</span>
            <span className="font-bold">25</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span>クエリ実行数/秒:</span>
            <span className="font-bold">150</span>
          </div>
          <div className="flex items-center justify-between">
            <span>ディスク使用率:</span>
            <span className="font-bold">65%</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Activity className="mr-2" /> パフォーマンスグラフ
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cpu" fill="#8884d8" name="CPU" />
            <Bar dataKey="memory" fill="#82ca9d" name="メモリ" />
            <Bar dataKey="network" fill="#ffc658" name="ネットワーク" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Cloud className="mr-2" /> 最近のデプロイメント
          </h2>
          <ul>
            {deployments.map((deployment) => (
              <li key={deployment.id} className="flex items-center justify-between mb-2 p-2 bg-gray-50 rounded">
                <div>
                  <span className="font-semibold">{deployment.version}</span>
                  <span className="text-sm text-gray-500 ml-2">{deployment.timestamp}</span>
                </div>
                {getStatusIcon(deployment.status)}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="mr-2" /> 最近のエラー
          </h2>
          <ul>
            {errors.map((error) => (
              <li key={error.id} className="mb-2 p-2 bg-red-50 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-red-700">{error.type}</span>
                  <span className="text-sm text-gray-500">{error.timestamp}</span>
                </div>
                <p className="text-sm text-red-600 mt-1">{error.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">ステージング環境概要</h2>
        <p className="mb-2">
          このステージング環境は、本番環境のミラーとして機能し、新機能のテストや品質保証に使用されます。
          以下の特徴があります：
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>本番環境と同じハードウェア構成</li>
          <li>定期的なデータ同期による最新の本番データの反映</li>
          <li>自動化されたテストスイートの実行</li>
          <li>パフォーマンスモニタリングとログ収集</li>
        </ul>
        <p>
          新しい機能や変更は、まずこの環境でテストされ、問題がないことが確認された後に本番環境へ展開されます。
        </p>
      </div>
    </div>
  );
};

export default Staging;