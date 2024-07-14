import React, { useState, useEffect } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { ArrowUpCircle, ArrowDownCircle, AlertTriangle } from 'react-feather';

ChartJS.register(CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const SecurityComplianceReport = () => {
  const [complianceScore, setComplianceScore] = useState(0);
  const [improvements, setImprovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 実際のアプリケーションではAPIから取得する
    setTimeout(() => {
      setComplianceScore(78);
      setImprovements([
        { id: 1, title: '多要素認証の導入', priority: 'high', impact: 15 },
        { id: 2, title: 'データ暗号化の強化', priority: 'medium', impact: 10 },
        { id: 3, title: 'アクセス制御ポリシーの見直し', priority: 'low', impact: 5 },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const barChartData = {
    labels: ['GDPR', 'SOC 2', 'ISO 27001', 'HIPAA'],
    datasets: [
      {
        label: 'コンプライアンススコア',
        data: [85, 92, 78, 88],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const radarChartData = {
    labels: ['認証', 'データ保護', '監査', 'インシデント対応', 'ネットワークセキュリティ'],
    datasets: [
      {
        label: '現在のスコア',
        data: [65, 59, 90, 81, 56],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '目標スコア',
        data: [80, 75, 95, 85, 70],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-red-500 pb-2">セキュリティコンプライアンスレポート</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">総合コンプライアンススコア</h2>
          <div className="flex items-center justify-center">
            <div className={`text-6xl font-bold ${complianceScore >= 80 ? 'text-green-500' : complianceScore >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
              {complianceScore}%
            </div>
          </div>
          <p className="text-center mt-4 text-gray-600">
            {complianceScore >= 80 ? '良好' : complianceScore >= 60 ? '要改善' : '緊急対応必要'}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">コンプライアンス基準別スコア</h2>
          <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">セキュリティ領域別評価</h2>
          <Radar data={radarChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">改善提案</h2>
          <ul className="space-y-4">
            {improvements.map((item) => (
              <li key={item.id} className="flex items-start">
                {item.priority === 'high' && <ArrowUpCircle className="text-red-500 mr-2 flex-shrink-0" />}
                {item.priority === 'medium' && <ArrowUpCircle className="text-yellow-500 mr-2 flex-shrink-0" />}
                {item.priority === 'low' && <ArrowDownCircle className="text-green-500 mr-2 flex-shrink-0" />}
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">推定改善効果: +{item.impact}%</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">最近のセキュリティアラート</h2>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-yellow-100 rounded-lg">
            <AlertTriangle className="text-yellow-500 mr-4" />
            <div>
              <p className="font-semibold">未使用アカウントの検出</p>
              <p className="text-sm text-gray-600">90日以上ログインのない10件のアカウントが見つかりました。</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-red-100 rounded-lg">
            <AlertTriangle className="text-red-500 mr-4" />
            <div>
              <p className="font-semibold">異常なログイン試行</p>
              <p className="text-sm text-gray-600">過去24時間で5件の不審なログイン試行がありました。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityComplianceReport;