import React, { useState, useEffect } from 'react';
import { Cloud, Server, Database, Network, Cpu, HardDrive, AlertTriangle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CloudInfrastructure = () => {
  const [serverStatus, setServerStatus] = useState({});
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // サーバーステータスの初期化（実際のAPIコールに置き換える）
    setServerStatus({
      webServer: 'active',
      database: 'active',
      storage: 'active',
      network: 'warning',
    });

    // パフォーマンスデータの初期化（実際のAPIコールに置き換える）
    const mockData = [
      { name: '00:00', cpu: 65, memory: 55, network: 40 },
      { name: '04:00', cpu: 68, memory: 59, network: 45 },
      { name: '08:00', cpu: 75, memory: 65, network: 52 },
      { name: '12:00', cpu: 85, memory: 70, network: 58 },
      { name: '16:00', cpu: 90, memory: 75, network: 62 },
      { name: '20:00', cpu: 80, memory: 68, network: 55 },
    ];
    setPerformanceData(mockData);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="text-green-500" />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-green-500 pb-2">クラウドインフラ状況</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">サーバーステータス</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Server className="text-green-600" />
                <span className="text-gray-700">Webサーバー</span>
              </div>
              {getStatusIcon(serverStatus.webServer)}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="text-green-600" />
                <span className="text-gray-700">データベース</span>
              </div>
              {getStatusIcon(serverStatus.database)}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HardDrive className="text-green-600" />
                <span className="text-gray-700">ストレージ</span>
              </div>
              {getStatusIcon(serverStatus.storage)}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Network className="text-green-600" />
                <span className="text-gray-700">ネットワーク</span>
              </div>
              {getStatusIcon(serverStatus.network)}
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">リソース使用状況</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="text-green-600" />
                <span className="text-gray-700">CPU使用率</span>
              </div>
              <span className="font-semibold text-gray-800">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <HardDrive className="text-green-600" />
                <span className="text-gray-700">メモリ使用率</span>
              </div>
              <span className="font-semibold text-gray-800">60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Network className="text-green-600" />
                <span className="text-gray-700">ネットワーク使用率</span>
              </div>
              <span className="font-semibold text-gray-800">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">パフォーマンス推移</h3>
        <div className="bg-white p-4 rounded-lg shadow-md" style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cpu" stroke="#059669" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="memory" stroke="#0284c7" />
              <Line type="monotone" dataKey="network" stroke="#7c3aed" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">クラウドサービス概要</h3>
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <div className="flex items-start space-x-4">
            <Cloud className="text-green-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">抹茶クラウド</h4>
              <p className="text-gray-600">
                当社の抹茶カフェシステムは、高性能かつ柔軟なクラウドインフラストラクチャ上で運用されています。
                スケーラビリティと信頼性を重視し、需要の変動に応じて自動的にリソースを調整します。
                また、地理的に分散されたデータセンターを利用することで、災害時のデータ保護と高可用性を実現しています。
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  自動スケーリング機能
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  地理的冗長性
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  24/7監視体制
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  最新のセキュリティ対策
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudInfrastructure;