import React, { useState, useEffect } from 'react';
import { Pie, Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler);

const SecurityAudit = () => {
  const [activeTab, setActiveTab] = useState('脆弱性分布');
  const [animatedData, setAnimatedData] = useState({
    vulnerabilityDistribution: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }]
    },
    riskAssessment: {
      labels: [],
      datasets: [{
        label: 'リスクスコア',
        data: [],
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1
      }]
    },
    securityMeasures: {
      labels: [],
      datasets: []
    }
  });

  const securityAreas = [
    { name: "ネットワークセキュリティ", vulnerabilities: 15, riskScore: 7, implementedMeasures: 8, plannedMeasures: 9, strengths: ["ファイアウォール", "侵入検知システム"], weaknesses: ["古いプロトコルの使用", "定期的な監査の不足"] },
    { name: "アプリケーションセキュリティ", vulnerabilities: 25, riskScore: 8, implementedMeasures: 7, plannedMeasures: 10, strengths: ["セキュアコーディング実践", "定期的な脆弱性スキャン"], weaknesses: ["レガシーコードの存在", "サードパーティライブラリの管理"] },
    { name: "データセキュリティ", vulnerabilities: 20, riskScore: 9, implementedMeasures: 9, plannedMeasures: 8, strengths: ["暗号化", "アクセス制御"], weaknesses: ["データ分類の不完全さ", "バックアップ戦略の改善が必要"] },
    { name: "物理セキュリティ", vulnerabilities: 10, riskScore: 6, implementedMeasures: 8, plannedMeasures: 7, strengths: ["セキュリティカメラ", "アクセス管理システム"], weaknesses: ["災害復旧計画の更新", "従業員教育の強化"] },
    { name: "クラウドセキュリティ", vulnerabilities: 30, riskScore: 8, implementedMeasures: 6, plannedMeasures: 9, strengths: ["マルチファクタ認証", "暗号化されたデータ転送"], weaknesses: ["設定ミス", "シャドーITの管理"] }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData({
        vulnerabilityDistribution: {
          labels: securityAreas.map(area => area.name),
          datasets: [{
            data: securityAreas.map(area => area.vulnerabilities),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverBackgroundColor: ['#FF4F72', '#2F8ED6', '#FFB93E', '#3DA3A3', '#8A4FFF']
          }]
        },
        riskAssessment: {
          labels: securityAreas.map(area => area.name),
          datasets: [{
            label: 'リスクスコア',
            data: securityAreas.map(area => area.riskScore),
            backgroundColor: '#FF6384',
            borderColor: '#FF4F72',
            borderWidth: 1
          }]
        },
        securityMeasures: {
          labels: ['実装済み対策', '計画中の対策'],
          datasets: securityAreas.map((area, index) => ({
            label: area.name,
            data: [area.implementedMeasures, area.plannedMeasures],
            backgroundColor: `rgba(${index * 60}, ${255 - index * 40}, ${index * 40}, 0.2)`,
            borderColor: `rgb(${index * 60}, ${255 - index * 40}, ${index * 40})`,
            borderWidth: 1
          }))
        }
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const auditInsights = [
    "クラウドセキュリティが最も多くの脆弱性を抱えており、優先的な対応が必要です。",
    "データセキュリティは最も高いリスクスコアを示しており、データ保護とプライバシー対策の強化が急務です。",
    "アプリケーションセキュリティでは、レガシーコードの更新とサードパーティライブラリの管理に注力する必要があります。",
    "物理セキュリティは比較的安定していますが、災害復旧計画の更新と従業員教育の強化が推奨されます。",
    "全体的に、計画中の対策数が実装済み対策数を上回っており、セキュリティ強化への積極的な取り組みが見られます。"
  ];

  const renderChart = () => {
    switch(activeTab) {
      case '脆弱性分布':
        return <Pie data={animatedData.vulnerabilityDistribution} options={{responsive: true, maintainAspectRatio: false}} />;
      case 'リスク評価':
        return <Bar data={animatedData.riskAssessment} options={{responsive: true, maintainAspectRatio: false}} />;
      case 'セキュリティ対策':
        return <Bar data={animatedData.securityMeasures} options={{responsive: true, maintainAspectRatio: false, scales: {x: {stacked: true}, y: {stacked: true}}}} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>セキュリティ監査レポート</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '60%' }}>
          <div style={{ marginBottom: '20px' }}>
            {['脆弱性分布', 'リスク評価', 'セキュリティ対策'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 15px',
                  marginRight: '10px',
                  backgroundColor: activeTab === tab ? '#4CAF50' : '#f0f0f0',
                  color: activeTab === tab ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ height: '400px' }}>
            {renderChart()}
          </div>
        </div>
        <div style={{ width: '35%' }}>
          <h2 style={{ color: '#4CAF50' }}>セキュリティ領域分析</h2>
          {securityAreas.map((area, index) => (
            <div key={index} style={{ marginBottom: '15px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{area.name}</h3>
              <p style={{ margin: '5px 0' }}><strong>脆弱性数:</strong> {area.vulnerabilities}</p>
              <p style={{ margin: '5px 0' }}><strong>リスクスコア:</strong> {area.riskScore}/10</p>
              <p style={{ margin: '5px 0' }}><strong>強み:</strong> {area.strengths.join(', ')}</p>
              <p style={{ margin: '5px 0' }}><strong>弱み:</strong> {area.weaknesses.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 style={{ color: '#4CAF50' }}>監査洞察</h2>
        <ul style={{ paddingLeft: '20px' }}>
          {auditInsights.map((insight, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SecurityAudit;
