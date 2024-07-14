import React, { useState, useEffect } from 'react';
import { Server, Database, Users, ShoppingBag, BarChart2, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Production = () => {
  const [serverStatus, setServerStatus] = useState('正常');
  const [databaseStatus, setDatabaseStatus] = useState('正常');
  const [activeUsers, setActiveUsers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [alerts, setAlerts] = useState([]);

  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // サーバーステータスのシミュレーション
    const serverInterval = setInterval(() => {
      setServerStatus(Math.random() > 0.95 ? '警告' : '正常');
    }, 5000);

    // データベースステータスのシミュレーション
    const dbInterval = setInterval(() => {
      setDatabaseStatus(Math.random() > 0.98 ? '警告' : '正常');
    }, 7000);

    // アクティブユーザー数のシミュレーション
    const userInterval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 1000));
    }, 3000);

    // 注文数のシミュレーション
    const orderInterval = setInterval(() => {
      setOrders(prevOrders => prevOrders + Math.floor(Math.random() * 5));
    }, 10000);

    // 売上のシミュレーション
    const revenueInterval = setInterval(() => {
      setRevenue(prevRevenue => prevRevenue + Math.floor(Math.random() * 10000));
    }, 15000);

    // アラートのシミュレーション
    const alertInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setAlerts(prevAlerts => [
          ...prevAlerts,
          {
            id: Date.now(),
            message: `新しいアラート: ${new Date().toLocaleTimeString()}`,
            type: Math.random() > 0.5 ? 'warning' : 'error'
          }
        ].slice(-5));
      }
    }, 20000);

    // パフォーマンスデータのシミュレーション
    const performanceInterval = setInterval(() => {
      setPerformanceData(prevData => {
        const newData = [...prevData, {
          time: new Date().toLocaleTimeString(),
          cpu: Math.floor(Math.random() * 100),
          memory: Math.floor(Math.random() * 100),
          network: Math.floor(Math.random() * 100)
        }];
        return newData.slice(-10);
      });
    }, 5000);

    return () => {
      clearInterval(serverInterval);
      clearInterval(dbInterval);
      clearInterval(userInterval);
      clearInterval(orderInterval);
      clearInterval(revenueInterval);
      clearInterval(alertInterval);
      clearInterval(performanceInterval);
    };
  }, []);

  const StatusIndicator = ({ status }) => (
    <span className={`inline-block w-3 h-3 rounded-full ${status === '正常' ? 'bg-green-500' : 'bg-red-500'}`}></span>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-green-800 mb-8">本番環境ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* サーバーステータス */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">サーバーステータス</h2>
            <Server className="text-green-600" size={24} />
          </div>
          <div className="flex items-center">
            <StatusIndicator status={serverStatus} />
            <span className="ml-2 text-lg">{serverStatus}</span>
          </div>
        </div>

        {/* データベースステータス */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">データベースステータス</h2>
            <Database className="text-green-600" size={24} />
          </div>
          <div className="flex items-center">
            <StatusIndicator status={databaseStatus} />
            <span className="ml-2 text-lg">{databaseStatus}</span>
          </div>
        </div>

        {/* アクティブユーザー */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">アクティブユーザー</h2>
            <Users className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-700">{activeUsers}</p>
        </div>

        {/* 注文数 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">本日の注文数</h2>
            <ShoppingBag className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-700">{orders}</p>
        </div>

        {/* 売上 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">本日の売上</h2>
            <BarChart2 className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-700">¥{revenue.toLocaleString()}</p>
        </div>

        {/* アラート */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">最新アラート</h2>
            <AlertTriangle className="text-yellow-500" size={24} />
          </div>
          <ul className="space-y-2">
            {alerts.map(alert => (
              <li key={alert.id} className={`p-2 rounded ${alert.type === 'warning' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                {alert.message}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* パフォーマンスグラフ */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">システムパフォーマンス</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU使用率" />
            <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="メモリ使用率" />
            <Line type="monotone" dataKey="network" stroke="#ffc658" name="ネットワーク使用率" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Production;