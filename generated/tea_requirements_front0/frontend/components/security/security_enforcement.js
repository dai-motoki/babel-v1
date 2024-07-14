import React, { useState, useEffect } from 'react';
import { Pie, Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler);

const SecurityEnforcement = () => {
  const [activeTab, setActiveTab] = useState('セキュリティ対策の実施状況');
  const [animatedData, setAnimatedData] = useState({
    implementationStatus: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }]
    },
    complianceScore: {
      labels: [],
      datasets: [{
        label: 'コンプライアンススコア',
        data: [],
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1
      }]
    },
    securityMetrics: {
      labels: [],
      datasets: []
    }
  });

  const securityMeasures = [
    { name: "アクセス制御", implementationRate: 85, complianceScore: 9, incidentReduction: 70, costEfficiency: 8, userSatisfaction: 7, strengths: ["多要素認証の導入", "ゼロトラストアーキテクチャの採用"], challenges: ["レガシーシステムとの統合", "ユーザビリティとセキュリティのバランス"] },
    { name: "データ暗号化", implementationRate: 90, complianceScore: 10, incidentReduction: 85, costEfficiency: 7, userSatisfaction: 8, strengths: ["エンドツーエンド暗号化", "鍵管理の自動化"], challenges: ["パフォーマンスへの影響", "レガシーデータの移行"] },
    { name: "脆弱性管理", implementationRate: 75, complianceScore: 8, incidentReduction: 60, costEfficiency: 9, userSatisfaction: 6, strengths: ["自動化されたスキャンと修正", "リスクベースのアプローチ"], challenges: ["パッチ適用の迅速化", "サードパーティ製品の脆弱性"] },
    { name: "インシデント対応", implementationRate: 80, complianceScore: 8, incidentReduction: 75, costEfficiency: 8, userSatisfaction: 7, strengths: ["AIを活用した早期検知", "自動化された対応プロセス"], challenges: ["スキル不足", "複雑な攻撃の対応"] },
    { name: "セキュリティ教育", implementationRate: 70, complianceScore: 7, incidentReduction: 50, costEfficiency: 9, userSatisfaction: 8, strengths: ["インタラクティブなトレーニング", "フィッシング模擬訓練"], challenges: ["継続的な意識向上", "測定可能な効果の実証"] }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData({
        implementationStatus: {
          labels: securityMeasures.map(measure => measure.name),
          datasets: [{
            data: securityMeasures.map(measure => measure.implementationRate),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverBackgroundColor: ['#FF4F72', '#2F8ED6', '#FFB93E', '#3DA3A3', '#8A4FFF']
          }]
        },
        complianceScore: {
          labels: securityMeasures.map(measure => measure.name),
          datasets: [{
            label: 'コンプライアンススコア',
            data: securityMeasures.map(measure => measure.complianceScore),
            backgroundColor: '#4CAF50',
            borderColor: '#45a049',
            borderWidth: 1
          }]
        },
        securityMetrics: {
          labels: ['インシデント削減率', 'コスト効率', 'ユーザー満足度'],
          datasets: securityMeasures.map((measure, index) => ({
            label: measure.name,
            data: [measure.incidentReduction, measure.costEfficiency * 10, measure.userSatisfaction * 10],
            backgroundColor: `rgba(${index * 60}, ${255 - index * 40}, ${index * 40}, 0.2)`,
            borderColor: `rgb(${index * 60}, ${255 - index * 40}, ${index * 40})`,
            borderWidth: 1
          }))
        }
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const enforcementInsights = [
    "アクセス制御とデータ暗号化の実装率が最も高く、基本的なセキュリティ対策が十分に行われています。",
    "脆弱性管理とセキュリティ教育の実装率が比較的低いため、これらの分野に注力する必要があります。",
    "データ暗号化は最高のコンプライアンススコアを示しており、規制要件を満たすのに効果的です。",
    "インシデント対応の自動化により、セキュリティインシデントの削減率が大幅に向上しています。",
    "セキュリティ教育はコスト効率が高く、ユーザー満足度も高いため、さらなる投資が推奨されます。"
  ];

  const renderChart = () => {
    switch(activeTab) {
      case 'セキュリティ対策の実施状況':
        return <Pie data={animatedData.implementationStatus} options={{responsive: true, maintainAspectRatio: false}} />;
      case 'コンプライアンススコア':
        return <Bar data={animatedData.complianceScore} options={{responsive: true, maintainAspectRatio: false}} />;
      case 'セキュリティメトリクス':
        return <Radar data={animatedData.securityMetrics} options={{responsive: true, maintainAspectRatio: false}} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f8ff' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px', textAlign: 'center' }}>セキュリティ対策実施状況レポート</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '65%' }}>
          <div style={{ marginBottom: '20px' }}>
            {['セキュリティ対策の実施状況', 'コンプライアンススコア', 'セキュリティメトリクス'].map(tab => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 15px',
                  marginRight: '10px',
                  backgroundColor: activeTab === tab ? '#4CAF50' : '#f0f0f0',
                  color: activeTab === tab ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {tab}
              </motion.button>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ height: '400px' }}
          >
            {renderChart()}
          </motion.div>
        </div>
        <div style={{ width: '30%' }}>
          <h2 style={{ color: '#4CAF50' }}>セキュリティ対策詳細</h2>
          {securityMeasures.map((measure, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ marginBottom: '15px', backgroundColor: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{measure.name}</h3>
              <p style={{ margin: '5px 0' }}><strong>実装率:</strong> {measure.implementationRate}%</p>
              <p style={{ margin: '5px 0' }}><strong>コンプライアンススコア:</strong> {measure.complianceScore}/10</p>
              <p style={{ margin: '5px 0' }}><strong>強み:</strong> {measure.strengths.join(', ')}</p>
              <p style={{ margin: '5px 0' }}><strong>課題:</strong> {measure.challenges.join(', ')}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <h2 style={{ color: '#4CAF50' }}>セキュリティ対策の洞察</h2>
        <ul style={{ paddingLeft: '20px' }}>
          {enforcementInsights.map((insight, index) => (
            <motion.li 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ marginBottom: '10px' }}
            >
              {insight}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SecurityEnforcement;
