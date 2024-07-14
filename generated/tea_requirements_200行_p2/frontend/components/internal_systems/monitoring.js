import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Activity, 
  Server, 
  Database, 
  Cpu, 
  HardDrive,
  Thermometer,
  RefreshCw,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonitoringSystem = () => {
  const [systemStatus, setSystemStatus] = useState('正常');
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // 実際のシステムでは、ここでAPIからデータを取得します
    const fetchData = () => {
      // モックデータの生成
      const newCpuUsage = Math.floor(Math.random() * 100);
      const newMemoryUsage = Math.floor(Math.random() * 100);
      const newDiskUsage = Math.floor(Math.random() * 100);
      const newTemperature = Math.floor(Math.random() * 50) + 20;
      
      setCpuUsage(newCpuUsage);
      setMemoryUsage(newMemoryUsage);
      setDiskUsage(newDiskUsage);
      setTemperature(newTemperature);
      setLastUpdated(new Date());

      // システムステータスの更新
      if (newCpuUsage > 90 || newMemoryUsage > 90 || newDiskUsage > 90 || newTemperature > 80) {
        setSystemStatus('警告');
      } else if (newCpuUsage > 70 || newMemoryUsage > 70 || newDiskUsage > 70 || newTemperature > 60) {
        setSystemStatus('注意');
      } else {
        setSystemStatus('正常');
      }

      // パフォーマンスデータの更新
      setPerformanceData(prevData => [
        ...prevData.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          cpu: newCpuUsage,
          memory: newMemoryUsage,
          disk: newDiskUsage,
        }
      ]);
    };

    fetchData(); // 初回データ取得
    const interval = setInterval(fetchData, 5000); // 5秒ごとにデータを更新

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case '正常':
        return 'text-green-500';
      case '注意':
        return 'text-yellow-500';
      case '警告':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getUsageColor = (usage) => {
    if (usage > 90) return 'text-red-500';
    if (usage > 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">システム監視ダッシュボード</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">システムステータス</h2>
          <div className={`flex items-center ${getStatusColor(systemStatus)}`}>
            {systemStatus === '正常' ? <CheckCircle className="mr-2" /> : <AlertCircle className="mr-2" />}
            <span className="font-bold">{systemStatus}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard icon={<Cpu />} title="CPU使用率" value={`${cpuUsage}%`} color={getUsageColor(cpuUsage)} />
          <StatusCard icon={<Database />} title="メモリ使用率" value={`${memoryUsage}%`} color={getUsageColor(memoryUsage)} />
          <StatusCard icon={<HardDrive />} title="ディスク使用率" value={`${diskUsage}%`} color={getUsageColor(diskUsage)} />
          <StatusCard icon={<Thermometer />} title="システム温度" value={`${temperature}°C`} color={getUsageColor(temperature / 100 * 80)} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">パフォーマンスグラフ</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU" />
            <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="メモリ" />
            <Line type="monotone" dataKey="disk" stroke="#ffc658" name="ディスク" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">システム情報</h2>
          <div className="flex items-center text-gray-500">
            <RefreshCw className="mr-2" size={18} />
            <span className="text-sm">最終更新: {lastUpdated.toLocaleString()}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard icon={<Server />} title="サーバー名" value="抹茶サーバー01" />
          <InfoCard icon={<Cpu />} title="CPU" value="Intel Xeon E5-2680 v4" />
          <InfoCard icon={<Database />} title="メモリ" value="64GB DDR4" />
          <InfoCard icon={<HardDrive />} title="ストレージ" value="2TB NVMe SSD" />
          <InfoCard icon={<Activity />} title="ネットワーク" value="10Gbps Ethernet" />
          <InfoCard icon={<Clock />} title="稼働時間" value="365日 12時間 34分" />
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({ icon, title, value, color }) => (
  <div className="bg-gray-50 rounded-lg p-4 flex items-center">
    <div className={`mr-4 ${color}`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  </div>
);

const InfoCard = ({ icon, title, value }) => (
  <div className="bg-gray-50 rounded-lg p-4 flex items-center">
    <div className="mr-4 text-gray-400">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-lg font-semibold text-gray-700">{value}</p>
    </div>
  </div>
);

export default MonitoringSystem;