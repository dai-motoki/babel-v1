import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, BarChart2, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SecurityMonitor = () => {
  const [securityEvents, setSecurityEvents] = useState([]);
  const [securityScore, setSecurityScore] = useState(0);
  const [threatLevel, setThreatLevel] = useState('低');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // モックデータの生成
    const mockSecurityEvents = [
      { id: 1, type: 'warning', message: '不審なログイン試行を検出しました', timestamp: '2023-05-15 10:30:00' },
      { id: 2, type: 'error', message: 'ファイアウォール設定の変更が検出されました', timestamp: '2023-05-15 11:45:00' },
      { id: 3, type: 'info', message: 'システムアップデートが正常に完了しました', timestamp: '2023-05-15 14:20:00' },
    ];
    setSecurityEvents(mockSecurityEvents);

    // セキュリティスコアの計算（モック）
    setSecurityScore(85);

    // 脅威レベルの設定（モック）
    setThreatLevel('中');

    // チャートデータの生成（モック）
    const mockChartData = [
      { name: '5/10', 攻撃数: 20, 防御数: 18 },
      { name: '5/11', 攻撃数: 15, 防御数: 15 },
      { name: '5/12', 攻撃数: 25, 防御数: 23 },
      { name: '5/13', 攻撃数: 30, 防御数: 28 },
      { name: '5/14', 攻撃数: 22, 防御数: 21 },
      { name: '5/15', 攻撃数: 18, 防御数: 17 },
    ];
    setChartData(mockChartData);
  }, []);

  const getEventIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="text-yellow-500" />;
      case 'error':
        return <XCircle className="text-red-500" />;
      case 'info':
        return <CheckCircle className="text-green-500" />;
      default:
        return <Shield className="text-blue-500" />;
    }
  };

  const getThreatLevelColor = (level) => {
    switch (level) {
      case '低':
        return 'text-green-500';
      case '中':
        return 'text-yellow-500';
      case '高':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-800 border-b-2 border-green-300 pb-2">セキュリティモニタリング</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-green-700">セキュリティスコア</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E6E6E6"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4CAF50"
                  strokeWidth="2"
                  strokeDasharray={`${securityScore}, 100`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-green-600">
                {securityScore}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-green-700">現在の脅威レベル</h3>
          <div className="flex items-center justify-center">
            <Shield size={48} className={getThreatLevelColor(threatLevel)} />
            <span className={`text-2xl font-bold ml-4 ${getThreatLevelColor(threatLevel)}`}>{threatLevel}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-green-700">セキュリティイベント</h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-100">
              <tr>
                <th className="p-3 text-left text-green-800">タイプ</th>
                <th className="p-3 text-left text-green-800">メッセージ</th>
                <th className="p-3 text-left text-green-800">タイムスタンプ</th>
              </tr>
            </thead>
            <tbody>
              {securityEvents.map((event) => (
                <tr key={event.id} className="border-b border-green-100">
                  <td className="p-3 flex items-center">
                    {getEventIcon(event.type)}
                    <span className="ml-2 capitalize">{event.type}</span>
                  </td>
                  <td className="p-3">{event.message}</td>
                  <td className="p-3">{event.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-green-700">セキュリティ活動チャート</h3>
        <div className="bg-white p-4 rounded-lg shadow">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="攻撃数" stroke="#FF6B6B" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="防御数" stroke="#4CAF50" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          詳細レポートを表示
        </button>
      </div>
    </div>
  );
};

export default SecurityMonitor;