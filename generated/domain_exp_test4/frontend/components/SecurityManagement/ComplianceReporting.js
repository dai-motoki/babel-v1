import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Download, Calendar, FileText, CheckCircle, AlertTriangle } from 'react-feather';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ComplianceReporting = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('overall');
  const [complianceData, setComplianceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 実際のアプリケーションではAPIからデータを取得します
    const fetchComplianceData = async () => {
      setLoading(true);
      // APIコールをシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000));
      setComplianceData({
        overall: 85,
        byCategory: {
          dataProtection: 90,
          accessControl: 80,
          incidentResponse: 85,
          assetManagement: 75,
        },
        recentIncidents: [
          { id: 1, type: 'データ漏洩', date: '2023-05-15', severity: 'high' },
          { id: 2, type: '不正アクセス', date: '2023-05-10', severity: 'medium' },
          { id: 3, type: 'システム障害', date: '2023-05-05', severity: 'low' },
        ],
      });
      setLoading(false);
    };

    fetchComplianceData();
  }, []);

  const renderOverallCompliance = () => {
    const data = {
      labels: ['準拠', '非準拠'],
      datasets: [
        {
          data: [complianceData.overall, 100 - complianceData.overall],
          backgroundColor: ['#4B0082', '#FFD700'],
          borderColor: ['#4B0082', '#FFD700'],
        },
      ],
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">全体コンプライアンス状況</h3>
        <div className="w-64 h-64 mx-auto">
          <Pie data={data} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
        <p className="text-center mt-4 text-lg font-medium text-gray-700">
          全体準拠率: {complianceData.overall}%
        </p>
      </div>
    );
  };

  const renderComplianceByCategory = () => {
    const data = {
      labels: Object.keys(complianceData.byCategory).map(key => key.replace(/([A-Z])/g, ' $1').trim()),
      datasets: [
        {
          label: '準拠率',
          data: Object.values(complianceData.byCategory),
          backgroundColor: '#4B0082',
        },
      ],
    };

    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">カテゴリ別コンプライアンス状況</h3>
        <Bar data={data} options={options} />
      </div>
    );
  };

  const renderRecentIncidents = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">最近のインシデント</h3>
        <ul className="space-y-4">
          {complianceData.recentIncidents.map(incident => (
            <li key={incident.id} className="flex items-center p-3 border border-gray-200 rounded-md">
              <div className={`w-3 h-3 rounded-full mr-3 ${incident.severity === 'high' ? 'bg-red-500' : incident.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
              <div className="flex-grow">
                <p className="font-medium text-gray-800">{incident.type}</p>
                <p className="text-sm text-gray-600">{incident.date}</p>
              </div>
              {incident.severity === 'high' && <AlertTriangle className="text-red-500" />}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const generateReport = () => {
    // レポート生成ロジックをここに実装
    console.log('レポートを生成中...');
    // 実際のアプリケーションでは、選択されたテンプレートに基づいてPDFやExcelファイルを生成します
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-purple-500 pb-2">コンプライアンスレポート</h2>
      
      <div className="mb-8">
        <label htmlFor="template-select" className="block mb-2 text-sm font-medium text-gray-700">レポートテンプレート:</label>
        <select
          id="template-select"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
        >
          <option value="overall">全体概要</option>
          <option value="detailed">詳細レポート</option>
          <option value="incidents">インシデントレポート</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {renderOverallCompliance()}
        {renderComplianceByCategory()}
      </div>

      <div className="mb-8">
        {renderRecentIncidents()}
      </div>

      <div className="flex justify-end">
        <button
          onClick={generateReport}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FileText className="mr-2" />
          レポート生成
        </button>
      </div>
    </div>
  );
};

export default ComplianceReporting;