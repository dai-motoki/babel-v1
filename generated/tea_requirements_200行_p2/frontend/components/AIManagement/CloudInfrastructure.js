import React, { useState, useEffect } from 'react';
import { Cloud, Server, Database, Network, Lock, Activity, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CloudInfrastructure = () => {
  const [cpuUsage, setCpuUsage] = useState([]);
  const [memoryUsage, setMemoryUsage] = useState([]);
  const [networkTraffic, setNetworkTraffic] = useState([]);
  const [securityAlerts, setSecurityAlerts] = useState([]);

  useEffect(() => {
    // モックデータの生成
    const generateMockData = () => {
      const newData = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 1000),
      }));
      setCpuUsage(newData);
      setMemoryUsage(newData);
      setNetworkTraffic(newData);
    };

    generateMockData();
    const interval = setInterval(generateMockData, 60000); // 1分ごとに更新

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // セキュリティアラートのモックデータ
    const mockAlerts = [
      { id: 1, type: '不審なアクセス', severity: '高', time: '10:30' },
      { id: 2, type: 'ファイアウォール警告', severity: '中', time: '11:45' },
      { id: 3, type: 'データベース接続エラー', severity: '低', time: '13:15' },
    ];
    setSecurityAlerts(mockAlerts);
  }, []);

  const renderMetric = (icon, title, value, unit) => (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
      {icon}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-green-700">{value}<span className="text-sm text-gray-500 ml-1">{unit}</span></p>
      </div>
    </div>
  );

  const renderChart = (data, dataKey, color) => (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="time" stroke="#4a5568" />
        <YAxis stroke="#4a5568" />
        <Tooltip contentStyle={{ backgroundColor: 'white', borderColor: '#e2e8f0' }} />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="bg-green-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">クラウドインフラ監視</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {renderMetric(<Cloud className="w-12 h-12 text-green-600" />, 'クラウドサーバー', '4', '台')}
        {renderMetric(<Database className="w-12 h-12 text-green-600" />, 'データベース', '2', 'TB')}
        {renderMetric(<Network className="w-12 h-12 text-green-600" />, 'ネットワーク帯域', '10', 'Gbps')}
        {renderMetric(<Lock className="w-12 h-12 text-green-600" />, 'セキュリティスコア', '95', '%')}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">CPU使用率</h2>
          {renderChart(cpuUsage, 'cpu', '#38a169')}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">メモリ使用率</h2>
          {renderChart(memoryUsage, 'memory', '#3182ce')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">ネットワークトラフィック</h2>
          {renderChart(networkTraffic, 'network', '#805ad5')}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">セキュリティアラート</h2>
          <ul className="divide-y divide-gray-200">
            {securityAlerts.map((alert) => (
              <li key={alert.id} className="py-4 flex items-center space-x-4">
                <AlertTriangle className={`w-6 h-6 ${alert.severity === '高' ? 'text-red-500' : alert.severity === '中' ? 'text-yellow-500' : 'text-blue-500'}`} />
                <div>
                  <p className="font-medium text-gray-900">{alert.type}</p>
                  <p className="text-sm text-gray-500">重要度: {alert.severity} | 時間: {alert.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">システム状態</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Web Server', 'App Server', 'Database', 'Load Balancer'].map((service) => (
            <div key={service} className="flex items-center space-x-2 bg-green-100 rounded-md p-3">
              <Server className="w-6 h-6 text-green-600" />
              <span className="text-green-800 font-medium">{service}</span>
              <Activity className="w-5 h-5 text-green-600 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CloudInfrastructure;