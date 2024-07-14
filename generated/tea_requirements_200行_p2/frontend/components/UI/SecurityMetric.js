import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Check, X, AlertCircle, BarChart2, PieChart, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SecurityMetric = () => {
  const [securityScore, setSecurityScore] = useState(0);
  const [threatLevel, setThreatLevel] = useState('低');
  const [recentIncidents, setRecentIncidents] = useState(0);
  const [complianceStatus, setComplianceStatus] = useState(true);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [securityTrend, setSecurityTrend] = useState([]);

  useEffect(() => {
    // 実際のアプリケーションでは、ここでAPIから最新のセキュリティデータを取得します
    // このサンプルでは、ダミーデータを使用します
    setSecurityScore(85);
    setThreatLevel('中');
    setRecentIncidents(3);
    setComplianceStatus(true);
    setVulnerabilities([
      { id: 1, name: 'クロスサイトスクリプティング', severity: '高' },
      { id: 2, name: 'SQLインジェクション', severity: '中' },
      { id: 3, name: '古いライブラリの使用', severity: '低' },
    ]);
    setSecurityTrend([
      { name: '1月', score: 70 },
      { name: '2月', score: 75 },
      { name: '3月', score: 78 },
      { name: '4月', score: 82 },
      { name: '5月', score: 85 },
    ]);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getThreatLevelColor = (level) => {
    switch (level) {
      case '低': return 'text-green-600';
      case '中': return 'text-yellow-600';
      case '高': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case '低': return 'bg-green-100 text-green-800';
      case '中': return 'bg-yellow-100 text-yellow-800';
      case '高': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-green-500 pb-2">セキュリティメトリクス</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Shield className="mr-2 text-green-600" />
            セキュリティスコア
          </h3>
          <p className={`text-4xl font-bold ${getScoreColor(securityScore)}`}>
            {securityScore}
          </p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <AlertTriangle className="mr-2 text-yellow-600" />
            脅威レベル
          </h3>
          <p className={`text-4xl font-bold ${getThreatLevelColor(threatLevel)}`}>
            {threatLevel}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <AlertCircle className="mr-2 text-red-600" />
            最近のインシデント
          </h3>
          <p className="text-4xl font-bold text-red-600">{recentIncidents}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Check className="mr-2 text-blue-600" />
            コンプライアンス状況
          </h3>
          <p className="text-4xl font-bold text-blue-600">
            {complianceStatus ? '準拠' : '非準拠'}
          </p>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BarChart2 className="mr-2 text-gray-600" />
          脆弱性一覧
        </h3>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">重要度</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vulnerabilities.map((vuln) => (
                <tr key={vuln.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vuln.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-gray-600" />
          セキュリティスコアの推移
        </h3>
        <div className="bg-white shadow rounded-lg p-4" style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={securityTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#4CAF50" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SecurityMetric;