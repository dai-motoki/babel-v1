import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, Activity, Server, Cpu, Database, Clock } from 'lucide-react';

const Monitoring = () => {
  const [cpuUsage, setCpuUsage] = useState([]);
  const [memoryUsage, setMemoryUsage] = useState([]);
  const [diskUsage, setDiskUsage] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // 擬似的なデータ生成
    const generateData = () => {
      const now = new Date();
      const newData = {
        time: now.toLocaleTimeString(),
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100),
      };

      setCpuUsage(prev => [...prev.slice(-9), newData]);
      setMemoryUsage(prev => [...prev.slice(-9), newData]);
      setDiskUsage(prev => [...prev.slice(-9), newData]);

      // アラートの生成
      if (newData.cpu > 90 || newData.memory > 90 || newData.disk > 90) {
        setAlerts(prev => [...prev, {
          id: Date.now(),
          message: `高負荷検知: ${newData.cpu > 90 ? 'CPU' : newData.memory > 90 ? 'メモリ' : 'ディスク'}使用率が90%を超えています`,
          time: now.toLocaleTimeString(),
          severity: 'high'
        }]);
      }
    };

    const interval = setInterval(generateData, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
          <p className="text-sm font-semibold">{`時刻: ${label}`}</p>
          <p className="text-sm text-green-600">{`CPU: ${payload[0].value}%`}</p>
          <p className="text-sm text-blue-600">{`メモリ: ${payload[1].value}%`}</p>
          <p className="text-sm text-red-600">{`ディスク: ${payload[2].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">システム監視ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Cpu className="mr-2 text-green-500" /> CPU使用率
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpuUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip content={renderCustomTooltip} />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Server className="mr-2 text-blue-500" /> メモリ使用率
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={memoryUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip content={renderCustomTooltip} />
                <Legend />
                <Line type="monotone" dataKey="memory" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Database className="mr-2 text-red-500" /> ディスク使用率
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={diskUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip content={renderCustomTooltip} />
                <Legend />
                <Line type="monotone" dataKey="disk" stroke="#EF4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <AlertCircle className="mr-2 text-yellow-500" /> アラート
        </h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">深刻度</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メッセージ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時刻</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.map((alert) => (
                <tr key={alert.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {alert.severity === 'high' ? '高' : '中'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Activity className="mr-2 text-purple-500" /> システムステータス
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">ウェブサーバー</p>
              <p className="mt-1 text-xl font-semibold text-green-600">正常</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">データベース</p>
              <p className="mt-1 text-xl font-semibold text-green-600">正常</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">キャッシュサーバー</p>
              <p className="mt-1 text-xl font-semibold text-green-600">正常</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">バックアップシステム</p>
              <p className="mt-1 text-xl font-semibold text-green-600">正常</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center text-gray-500">
        <p>最終更新: <Clock className="inline mr-1" size={16} /> {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
};

export default Monitoring;