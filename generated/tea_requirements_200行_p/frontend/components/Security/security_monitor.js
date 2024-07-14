import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Check, X, RefreshCw, ExternalLink } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SecurityMonitor = () => {
  const [securityEvents, setSecurityEvents] = useState([]);
  const [threatLevel, setThreatLevel] = useState('低');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [securityScore, setSecurityScore] = useState(85);

  useEffect(() => {
    // モックデータの生成
    const generateMockData = () => {
      const newEvents = [
        { id: 1, type: '不審なログイン試行', severity: '中', timestamp: new Date().toLocaleString() },
        { id: 2, type: 'ファイアウォール警告', severity: '低', timestamp: new Date(Date.now() - 3600000).toLocaleString() },
        { id: 3, type: 'マルウェア検出', severity: '高', timestamp: new Date(Date.now() - 7200000).toLocaleString() },
      ];
      setSecurityEvents(newEvents);
      setLastUpdated(new Date());
      setSecurityScore(Math.floor(Math.random() * (95 - 75 + 1) + 75));
    };

    generateMockData();
    const interval = setInterval(generateMockData, 60000);

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (severity) => {
    switch (severity) {
      case '高':
        return <AlertTriangle className="text-red-500" />;
      case '中':
        return <AlertTriangle className="text-yellow-500" />;
      case '低':
        return <Check className="text-green-500" />;
      default:
        return <X className="text-gray-500" />;
    }
  };

  const mockChartData = [
    { name: '月', value: 80 },
    { name: '火', value: 85 },
    { name: '水', value: 78 },
    { name: '木', value: 82 },
    { name: '金', value: 88 },
    { name: '土', value: 90 },
    { name: '日', value: securityScore },
  ];

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-green-800 mb-6">セキュリティモニタリング</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-green-700 mb-4">セキュリティスコア</h3>
          <div className="flex items-center justify-between">
            <Shield size={64} className={`text-${securityScore >= 80 ? 'green' : 'yellow'}-500`} />
            <span className="text-4xl font-bold text-green-800">{securityScore}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">最終更新: {lastUpdated.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-green-700 mb-4">脅威レベル</h3>
          <div className="flex items-center justify-between">
            <AlertTriangle size={64} className={`text-${threatLevel === '低' ? 'green' : threatLevel === '中' ? 'yellow' : 'red'}-500`} />
            <span className="text-4xl font-bold text-green-800">{threatLevel}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">24時間監視中</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-xl font-semibold text-green-700 mb-4">セキュリティスコア推移</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-green-700 mb-4">最近のセキュリティイベント</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">タイプ</th>
                <th scope="col" className="px-6 py-3">重大度</th>
                <th scope="col" className="px-6 py-3">タイムスタンプ</th>
                <th scope="col" className="px-6 py-3">アクション</th>
              </tr>
            </thead>
            <tbody>
              {securityEvents.map((event) => (
                <tr key={event.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{event.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getEventIcon(event.severity)}
                      <span className="ml-2">{event.severity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{event.timestamp}</td>
                  <td className="px-6 py-4">
                    <button className="text-green-600 hover:text-green-800">
                      詳細を表示
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          <RefreshCw size={18} className="mr-2" />
          データを更新
        </button>
        <a href="#" className="flex items-center text-green-600 hover:text-green-800">
          セキュリティレポートを表示
          <ExternalLink size={18} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default SecurityMonitor;