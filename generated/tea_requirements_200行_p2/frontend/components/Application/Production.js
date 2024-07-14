import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Activity, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  XOctagon,
  ArrowUpCircle,
  BarChart2,
  Database
} from 'lucide-react';

const Production = () => {
  const [performanceData, setPerformanceData] = useState({
    uptime: 99.99,
    responseTime: 250,
    activeUsers: 1500,
    cpuUsage: 65,
    memoryUsage: 70,
    diskUsage: 55
  });

  const [deployHistory, setDeployHistory] = useState([
    { id: 1, version: 'v3.2.1', date: '2023-06-15', status: 'success' },
    { id: 2, version: 'v3.2.0', date: '2023-06-01', status: 'success' },
    { id: 3, version: 'v3.1.9', date: '2023-05-15', status: 'warning' },
    { id: 4, version: 'v3.1.8', date: '2023-05-01', status: 'success' },
    { id: 5, version: 'v3.1.7', date: '2023-04-15', status: 'error' },
  ]);

  const [systemStatus, setSystemStatus] = useState([
    { id: 1, name: 'ウェブサーバー', status: 'operational' },
    { id: 2, name: 'データベース', status: 'operational' },
    { id: 3, name: 'キャッシュサーバー', status: 'operational' },
    { id: 4, name: 'バックアップシステム', status: 'degraded' },
    { id: 5, name: '決済システム', status: 'operational' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(prevData => ({
        ...prevData,
        activeUsers: Math.floor(Math.random() * 500) + 1300,
        cpuUsage: Math.floor(Math.random() * 20) + 55,
        memoryUsage: Math.floor(Math.random() * 15) + 65,
        diskUsage: Math.floor(Math.random() * 10) + 50
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
      case 'operational':
        return <CheckCircle className="text-green-500" />;
      case 'warning':
      case 'degraded':
        return <AlertTriangle className="text-yellow-500" />;
      case 'error':
      case 'down':
        return <XOctagon className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">本番環境ダッシュボード</h1>

      {/* パフォーマンス概要 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">パフォーマンス概要</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <Clock className="text-green-600 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-500">稼働時間</p>
              <p className="text-lg font-semibold">{performanceData.uptime}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Activity className="text-blue-600 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-500">応答時間</p>
              <p className="text-lg font-semibold">{performanceData.responseTime}ms</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Users className="text-purple-600 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-500">アクティブユーザー</p>
              <p className="text-lg font-semibold">{performanceData.activeUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* リソース使用率 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">リソース使用率</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">CPU使用率</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full" 
                style={{width: `${performanceData.cpuUsage}%`}}
              ></div>
            </div>
            <p className="text-right text-sm mt-1">{performanceData.cpuUsage}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">メモリ使用率</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-green-600 h-4 rounded-full" 
                style={{width: `${performanceData.memoryUsage}%`}}
              ></div>
            </div>
            <p className="text-right text-sm mt-1">{performanceData.memoryUsage}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">ディスク使用率</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-yellow-600 h-4 rounded-full" 
                style={{width: `${performanceData.diskUsage}%`}}
              ></div>
            </div>
            <p className="text-right text-sm mt-1">{performanceData.diskUsage}%</p>
          </div>
        </div>
      </div>

      {/* デプロイ履歴 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">デプロイ履歴</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="pb-2">バージョン</th>
              <th className="pb-2">日付</th>
              <th className="pb-2">ステータス</th>
            </tr>
          </thead>
          <tbody>
            {deployHistory.map(deploy => (
              <tr key={deploy.id} className="border-b last:border-b-0">
                <td className="py-3">{deploy.version}</td>
                <td className="py-3">{deploy.date}</td>
                <td className="py-3 flex items-center">
                  {getStatusIcon(deploy.status)}
                  <span className="ml-2 capitalize">{deploy.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* システムステータス */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">システムステータス</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemStatus.map(system => (
            <div key={system.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                {system.name === 'ウェブサーバー' && <Server className="text-indigo-600 mr-3" />}
                {system.name === 'データベース' && <Database className="text-indigo-600 mr-3" />}
                {system.name === 'キャッシュサーバー' && <BarChart2 className="text-indigo-600 mr-3" />}
                {system.name === 'バックアップシステム' && <ArrowUpCircle className="text-indigo-600 mr-3" />}
                {system.name === '決済システム' && <Activity className="text-indigo-600 mr-3" />}
                <span className="text-gray-700">{system.name}</span>
              </div>
              {getStatusIcon(system.status)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Production;