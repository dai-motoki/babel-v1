import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, Clock, Server, Cpu, HardDrive, Wifi } from 'lucide-react';

const MonitoringSystem = () => {
  const [systemStatus, setSystemStatus] = useState('正常');
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);
  const [networkStatus, setNetworkStatus] = useState('安定');
  const [alerts, setAlerts] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // 監視データのシミュレーション
    const interval = setInterval(() => {
      const newCpuUsage = Math.floor(Math.random() * 100);
      const newMemoryUsage = Math.floor(Math.random() * 100);
      const newDiskUsage = Math.floor(Math.random() * 100);
      
      setCpuUsage(newCpuUsage);
      setMemoryUsage(newMemoryUsage);
      setDiskUsage(newDiskUsage);

      setPerformanceData(prevData => [
        ...prevData.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          cpu: newCpuUsage,
          memory: newMemoryUsage,
          disk: newDiskUsage
        }
      ]);

      // アラートの生成
      if (newCpuUsage > 90 || newMemoryUsage > 90 || newDiskUsage > 90) {
        setAlerts(prevAlerts => [
          ...prevAlerts,
          {
            id: Date.now(),
            message: `リソース使用率が90%を超えています: CPU ${newCpuUsage}%, メモリ ${newMemoryUsage}%, ディスク ${newDiskUsage}%`,
            severity: 'high'
          }
        ]);
        setSystemStatus('警告');
      } else {
        setSystemStatus('正常');
      }

      // ネットワークステータスのランダム変更
      if (Math.random() > 0.9) {
        setNetworkStatus(Math.random() > 0.5 ? '安定' : '不安定');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderStatusIcon = (status) => {
    switch (status) {
      case '正常':
        return <CheckCircle className="inline-block mr-2 text-green-500" />;
      case '警告':
        return <AlertCircle className="inline-block mr-2 text-yellow-500" />;
      default:
        return <Clock className="inline-block mr-2 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">システム監視ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">システムステータス</h2>
          <p className="text-2xl font-bold">
            {renderStatusIcon(systemStatus)}
            {systemStatus}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">CPU使用率</h2>
          <div className="flex items-center">
            <Cpu className="mr-2 text-blue-500" />
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${cpuUsage}%`}}></div>
            </div>
            <span className="ml-2 font-bold">{cpuUsage}%</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">メモリ使用率</h2>
          <div className="flex items-center">
            <Server className="mr-2 text-green-500" />
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{width: `${memoryUsage}%`}}></div>
            </div>
            <span className="ml-2 font-bold">{memoryUsage}%</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">ディスク使用率</h2>
          <div className="flex items-center">
            <HardDrive className="mr-2 text-purple-500" />
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{width: `${diskUsage}%`}}></div>
            </div>
            <span className="ml-2 font-bold">{diskUsage}%</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">パフォーマンスグラフ</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cpu" stroke="#3B82F6" name="CPU" />
              <Line type="monotone" dataKey="memory" stroke="#10B981" name="メモリ" />
              <Line type="monotone" dataKey="disk" stroke="#8B5CF6" name="ディスク" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">アラート</h2>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {alerts.length > 0 ? (
              alerts.map(alert => (
                <div key={alert.id} className={`p-4 rounded-md ${alert.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  <AlertCircle className="inline-block mr-2" />
                  {alert.message}
                </div>
              ))
            ) : (
              <p className="text-gray-500">現在アラートはありません。</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">ネットワークステータス</h2>
        <div className="flex items-center">
          <Wifi className={`mr-2 ${networkStatus === '安定' ? 'text-green-500' : 'text-red-500'}`} />
          <span className={`font-bold ${networkStatus === '安定' ? 'text-green-500' : 'text-red-500'}`}>
            {networkStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MonitoringSystem;