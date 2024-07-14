import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'react-feather';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const SecurityPolicyEnforcement = () => {
  const [complianceScore, setComplianceScore] = useState(0);
  const [policyViolations, setPolicyViolations] = useState([]);
  const [riskLevels, setRiskLevels] = useState({});
  const [complianceTrend, setComplianceTrend] = useState([]);

  useEffect(() => {
    // Simulated API calls
    fetchComplianceScore();
    fetchPolicyViolations();
    fetchRiskLevels();
    fetchComplianceTrend();
  }, []);

  const fetchComplianceScore = () => {
    // Simulated API call
    setTimeout(() => {
      setComplianceScore(85);
    }, 1000);
  };

  const fetchPolicyViolations = () => {
    // Simulated API call
    setTimeout(() => {
      setPolicyViolations([
        { id: 1, policy: 'パスワード強度', status: 'High', affected: 15 },
        { id: 2, policy: '2要素認証', status: 'Medium', affected: 30 },
        { id: 3, policy: 'データ暗号化', status: 'Low', affected: 5 },
        { id: 4, policy: 'アクセス制御', status: 'Medium', affected: 20 },
      ]);
    }, 1000);
  };

  const fetchRiskLevels = () => {
    // Simulated API call
    setTimeout(() => {
      setRiskLevels({
        high: 15,
        medium: 30,
        low: 55,
      });
    }, 1000);
  };

  const fetchComplianceTrend = () => {
    // Simulated API call
    setTimeout(() => {
      setComplianceTrend([
        { month: '1月', score: 70 },
        { month: '2月', score: 75 },
        { month: '3月', score: 78 },
        { month: '4月', score: 82 },
        { month: '5月', score: 85 },
      ]);
    }, 1000);
  };

  const pieChartData = {
    labels: ['高リスク', '中リスク', '低リスク'],
    datasets: [
      {
        data: [riskLevels.high, riskLevels.medium, riskLevels.low],
        backgroundColor: ['#F87171', '#FBBF24', '#34D399'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: complianceTrend.map(item => item.month),
    datasets: [
      {
        label: 'コンプライアンススコア',
        data: complianceTrend.map(item => item.score),
        backgroundColor: '#60A5FA',
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">セキュリティポリシーコンプライアンス</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">コンプライアンススコア</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="3"
                  strokeDasharray={`${complianceScore}, 100`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-700">
                {complianceScore}%
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">リスクレベル分布</h2>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">コンプライアンストレンド</h2>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">ポリシー違反</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-sm font-semibold tracking-wide text-left">ポリシー</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">状態</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">影響を受けるユーザー</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">アクション</th>
              </tr>
            </thead>
            <tbody>
              {policyViolations.map((violation) => (
                <tr key={violation.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-700">{violation.policy}</td>
                  <td className="p-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${violation.status === 'High' ? 'bg-red-100 text-red-800' :
                        violation.status === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}`}>
                      {violation.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-700">{violation.affected}</td>
                  <td className="p-3 text-sm">
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-3 rounded text-xs">
                      対処
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityPolicyEnforcement;