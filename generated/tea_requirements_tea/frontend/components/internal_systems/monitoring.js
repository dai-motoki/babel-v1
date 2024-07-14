import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, Server, Cpu, Memory, HardDrive, Activity, Database, Cloud } from 'lucide-react';

const MonitoringSystem = () => {
  const [systemStatus, setSystemStatus] = useState('normal');
  const [cpuUsage, setCpuUsage] = useState([]);
  const [memoryUsage, setMemoryUsage] = useState([]);
  const [diskUsage, setDiskUsage] = useState([]);
  const [networkTraffic, setNetworkTraffic] = useState([]);
  const [databaseQueries, setDatabaseQueries] = useState([]);
  const [cloudServices, setCloudServices] = useState([]);

  useEffect(() => {
    // リアルタイムデータ取得のシミュレーション
    const fetchData = () => {
      const currentTime = new Date().toLocaleTimeString();
      const newData = {
        time: currentTime,
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        disk: Math.random() * 100,
        network: Math.random() * 1000,
        database: Math.floor(Math.random() * 1000),
        cloud: Math.random() * 100
      };

      setCpuUsage(prev => [...prev.slice(-19), newData]);
      setMemoryUsage(prev => [...prev.slice(-19), newData]);
      setDiskUsage(prev => [...prev.slice(-19), newData]);
      setNetworkTraffic(prev => [...prev.slice(-19), newData]);
      setDatabaseQueries(prev => [...prev.slice(-19), newData]);
      setCloudServices(prev => [...prev.slice(-19), newData]);

      // システムステータスの更新ロジックを改善
      const isAlert = newData.cpu > 90 || newData.memory > 95 || newData.disk > 85;
      setSystemStatus(isAlert ? 'alert' : 'normal');
    };

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const StatusIndicator = ({ status, title, value, icon: Icon }) => (
    <div className="bg-white p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center mb-2">
        <Icon className="mr-2 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className={`text-2xl font-bold ${status === 'normal' ? 'text-green-600' : 'text-red-600'}`}>
        {typeof value === 'number' ? value.toFixed(2) : value}
        {typeof value === 'number' && '%'}
      </p>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">高度システム監視ダッシュボード</h2>

      <div className="mb-6">
        {systemStatus === 'normal' ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-r-lg shadow-md" role="alert">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              <div>
                <p className="font-bold">システム正常稼働中</p>
                <p>全てのシステムが最適なパフォーマンスで動作しています。</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-r-lg shadow-md animate-pulse" role="alert">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 mr-2" />
              <div>
                <p className="font-bold">緊急警告</p>
                <p>システムに重大な問題が検出されました。即時の対応が必要です。</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatusIndicator status={systemStatus} title="サーバー状態" value={systemStatus === 'normal' ? '正常' : '警告'} icon={Server} />
        <StatusIndicator status={systemStatus} title="CPU使用率" value={cpuUsage[cpuUsage.length - 1]?.cpu} icon={Cpu} />
        <StatusIndicator status={systemStatus} title="メモリ使用率" value={memoryUsage[memoryUsage.length - 1]?.memory} icon={Memory} />
        <StatusIndicator status={systemStatus} title="ディスク使用率" value={diskUsage[diskUsage.length - 1]?.disk} icon={HardDrive} />
        <StatusIndicator status={systemStatus} title="ネットワークトラフィック" value={`${(networkTraffic[networkTraffic.length - 1]?.network || 0).toFixed(2)} Mbps`} icon={Activity} />
        <StatusIndicator status={systemStatus} title="DBクエリ/分" value={databaseQueries[databaseQueries.length - 1]?.database} icon={Database} />
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">リアルタイムリソース使用率グラフ</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={cpuUsage}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }} />
            <Legend />
            <Line type="monotone" dataKey="cpu" name="CPU" stroke="#8884d8" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="memory" name="メモリ" stroke="#82ca9d" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="disk" name="ディスク" stroke="#ffc658" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="network" name="ネットワーク" stroke="#ff7300" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="database" name="データベース" stroke="#00C49F" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <Cloud className="mr-2 text-blue-600" />
          <h3 className="text-2xl font-semibold text-gray-800">クラウドサービス利用状況</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['ストレージ', 'コンピューティング', 'ネットワーキング'].map((service, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-2 text-gray-700">{service}</h4>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out" 
                  style={{width: `${cloudServices[cloudServices.length - 1]?.cloud}%`}}
                ></div>
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-600">{cloudServices[cloudServices.length - 1]?.cloud.toFixed(2)}% 使用中</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonitoringSystem;