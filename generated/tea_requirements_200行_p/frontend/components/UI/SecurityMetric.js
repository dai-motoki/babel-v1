import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const SecurityMetric = () => {
  const [overallScore, setOverallScore] = useState(0);
  const [threatLevel, setThreatLevel] = useState('低');
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [securityEvents, setSecurityEvents] = useState([]);

  useEffect(() => {
    // 実際のアプリケーションではAPIから取得するデータをシミュレート
    setOverallScore(85);
    setThreatLevel('中');
    setVulnerabilities([
      { name: '未パッチの脆弱性', value: 3 },
      { name: '設定ミス', value: 2 },
      { name: '古いソフトウェア', value: 1 },
    ]);
    setSecurityEvents([
      { date: '2023-05-01', events: 5 },
      { date: '2023-05-02', events: 3 },
      { date: '2023-05-03', events: 7 },
      { date: '2023-05-04', events: 2 },
      { date: '2023-05-05', events: 4 },
    ]);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getThreatLevelIcon = (level) => {
    switch (level) {
      case '低':
        return <CheckCircle className="inline-block mr-2 text-green-600" />;
      case '中':
        return <AlertTriangle className="inline-block mr-2 text-yellow-600" />;
      case '高':
        return <XCircle className="inline-block mr-2 text-red-600" />;
      default:
        return null;
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-green-300 pb-2">セキュリティメトリクス</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">全体的なセキュリティスコア</h3>
          <div className="flex items-center">
            <Shield className="text-green-600 mr-2" size={24} />
            <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</span>
            <span className="text-gray-600 ml-2">/ 100</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            前週比: <ArrowUp className="inline-block text-green-600" size={16} /> 5ポイント
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">現在の脅威レベル</h3>
          <div className="flex items-center">
            {getThreatLevelIcon(threatLevel)}
            <span className="text-2xl font-bold text-gray-800">{threatLevel}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            前週: 低 <ArrowUp className="inline-block text-red-600" size={16} />
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">脆弱性の内訳</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={vulnerabilities}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {vulnerabilities.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">セキュリティイベントの推移</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={securityEvents}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="events" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">推奨アクション</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>全てのシステムに最新のセキュリティパッチを適用してください</li>
          <li>ユーザーのセキュリティ意識向上トレーニングを実施してください</li>
          <li>ファイアウォールの設定を見直し、不要なポートを閉じてください</li>
        </ul>
      </div>

      <div className="mt-8 text-right">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          詳細レポートを表示
        </button>
      </div>
    </div>
  );
};

export default SecurityMetric;