import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, AlertCircle, Info, Activity, Lock, UserX, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const SecurityMonitor = () => {
  const [securityStatus, setSecurityStatus] = useState('normal');
  const [alerts, setAlerts] = useState([]);
  const [threatData, setThreatData] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [userActivity, setUserActivity] = useState([]);

  useEffect(() => {
    // 実際のアプリケーションでは、ここでセキュリティデータをフェッチします
    // この例では、より詳細なダミーデータを使用しています
    const dummyAlerts = [
      { id: 1, type: 'critical', message: 'ファイアウォールの侵入が検出されました', timestamp: '2023-04-15 14:30:00' },
      { id: 2, type: 'warning', message: '複数の不審なログイン試行が検出されました', timestamp: '2023-04-15 13:45:00' },
      { id: 3, type: 'info', message: 'システムの重要なセキュリティアップデートが利用可能です', timestamp: '2023-04-15 12:00:00' },
    ];
    setAlerts(dummyAlerts);

    const dummyThreatData = [
      { name: '月', threats: 4, prevented: 3 },
      { name: '火', threats: 3, prevented: 2 },
      { name: '水', threats: 2, prevented: 2 },
      { name: '木', threats: 6, prevented: 5 },
      { name: '金', threats: 5, prevented: 4 },
      { name: '土', threats: 3, prevented: 3 },
      { name: '日', threats: 2, prevented: 2 },
    ];
    setThreatData(dummyThreatData);

    const dummyVulnerabilities = [
      { name: '重大', value: 2 },
      { name: '高', value: 5 },
      { name: '中', value: 8 },
      { name: '低', value: 12 },
    ];
    setVulnerabilities(dummyVulnerabilities);

    const dummyUserActivity = [
      { time: '09:00', logins: 20, failedAttempts: 2 },
      { time: '12:00', logins: 35, failedAttempts: 1 },
      { time: '15:00', logins: 28, failedAttempts: 3 },
      { time: '18:00', logins: 40, failedAttempts: 0 },
    ];
    setUserActivity(dummyUserActivity);
  }, []);

  const renderStatusIcon = () => {
    switch (securityStatus) {
      case 'normal':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={24} />;
      case 'critical':
        return <Shield className="text-red-500" size={24} />;
      default:
        return null;
    }
  };

  const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE'];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-black">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        セキュリティモニター {renderStatusIcon()}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <AlertCircle className="mr-2" size={20} />
            セキュリティアラート
          </h3>
          {alerts.map((alert) => (
            <div key={alert.id} className={`flex items-start p-4 mb-2 rounded-md ${
              alert.type === 'critical' ? 'bg-red-100' :
              alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
            }`}>
              {alert.type === 'critical' ? (
                <Shield className="text-red-500 mr-2" size={20} />
              ) : alert.type === 'warning' ? (
                <AlertTriangle className="text-yellow-500 mr-2" size={20} />
              ) : (
                <Info className="text-blue-500 mr-2" size={20} />
              )}
              <div>
                <h4 className="font-semibold">{
                  alert.type === 'critical' ? '緊急' :
                  alert.type === 'warning' ? '警告' : '情報'
                }</h4>
                <p>{alert.message}</p>
                <p className="text-sm text-gray-500">{alert.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Activity className="mr-2" size={20} />
            脅威検出トレンド
          </h3>
          <LineChart width={400} height={200} data={threatData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="threats" stroke="#8884d8" name="検出された脅威" />
            <Line type="monotone" dataKey="prevented" stroke="#82ca9d" name="防止された脅威" />
          </LineChart>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Lock className="mr-2" size={20} />
            脆弱性の概要
          </h3>
          <PieChart width={300} height={200}>
            <Pie
              data={vulnerabilities}
              cx={150}
              cy={100}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {vulnerabilities.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <UserX className="mr-2" size={20} />
            ユーザーアクティビティ
          </h3>
          <BarChart width={400} height={200} data={userActivity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="logins" fill="#8884d8" name="ログイン成功" />
            <Bar dataKey="failedAttempts" fill="#82ca9d" name="ログイン失敗" />
          </BarChart>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          <RefreshCw className="mr-2" size={16} />
          データを更新
        </button>
      </div>
    </div>
  );
};

export default SecurityMonitor;
