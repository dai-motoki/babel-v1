import React, { useState, useEffect } from 'react';
import { Pie, Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler);

const CloudInfrastructure = () => {
  const [activeTab, setActiveTab] = useState('リソース使用率');
  const [animatedData, setAnimatedData] = useState({
    resourceUsage: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }]
    },
    costComparison: {
      labels: [],
      datasets: [{
        label: 'コスト（万円/月）',
        data: [],
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1
      }]
    },
    performanceMetrics: {
      labels: [],
      datasets: []
    }
  });

  const cloudServices = [
    { name: "コンピューティング", usage: 40, cost: 150, performance: 8, scalability: 9, reliability: 8 },
    { name: "ストレージ", usage: 30, cost: 100, performance: 7, scalability: 9, reliability: 9 },
    { name: "ネットワーキング", usage: 15, cost: 50, performance: 8, scalability: 8, reliability: 9 },
    { name: "データベース", usage: 10, cost: 80, performance: 9, scalability: 8, reliability: 8 },
    { name: "その他", usage: 5, cost: 20, performance: 7, scalability: 7, reliability: 7 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData({
        resourceUsage: {
          labels: cloudServices.map(s => s.name),
          datasets: [{
            data: cloudServices.map(s => s.usage),
            backgroundColor: ['#4BC0C0', '#FF6384', '#36A2EB', '#FFCE56', '#9966FF'],
            hoverBackgroundColor: ['#3DA3A3', '#FF4F72', '#2F8ED6', '#FFB93E', '#8A4FFF']
          }]
        },
        costComparison: {
          labels: cloudServices.map(s => s.name),
          datasets: [{
            label: 'コスト（万円/月）',
            data: cloudServices.map(s => s.cost),
            backgroundColor: '#4BC0C0',
            borderColor: '#3DA3A3',
            borderWidth: 1
          }]
        },
        performanceMetrics: {
          labels: ['パフォーマンス', 'スケーラビリティ', '信頼性'],
          datasets: cloudServices.map((s, index) => ({
            label: s.name,
            data: [s.performance, s.scalability, s.reliability],
            backgroundColor: `rgba(${index * 60}, ${255 - index * 40}, ${index * 40}, 0.2)`,
            borderColor: `rgb(${index * 60}, ${255 - index * 40}, ${index * 40})`,
            pointBackgroundColor: `rgb(${index * 60}, ${255 - index * 40}, ${index * 40})`,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: `rgb(${index * 60}, ${255 - index * 40}, ${index * 40})`
          }))
        }
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const cloudInsights = [
    "コンピューティングリソースが全体の40%を占めており、最も重要なコンポーネントとなっています。",
    "ストレージとネットワーキングが次に大きなリソース使用率を示しており、データ集約型のワークロードが多いことが示唆されます。",
    "コスト面では、コンピューティングとストレージが最も高額ですが、使用率に比例しています。",
    "パフォーマンス、スケーラビリティ、信頼性の面では、全てのサービスが高いスコアを示していますが、特にストレージの信頼性が際立っています。",
    "リソース最適化の余地があり、特にコンピューティングリソースの効率的な利用方法を検討する必要があります。"
  ];

  const renderChart = () => {
    switch(activeTab) {
      case 'リソース使用率':
        return <Pie data={animatedData.resourceUsage} options={{responsive: true, maintainAspectRatio: false}} />;
      case 'コスト比較':
        return <Bar data={animatedData.costComparison} options={{responsive: true, maintainAspectRatio: false}} />;
      case 'パフォーマンス指標':
        return <Radar data={animatedData.performanceMetrics} options={{responsive: true, maintainAspectRatio: false}} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>クラウドインフラストラクチャ分析</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '60%' }}>
          <div style={{ marginBottom: '20px' }}>
            {['リソース使用率', 'コスト比較', 'パフォーマンス指標'].map(tab => (
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
          <h2 style={{ color: '#4CAF50' }}>クラウドサービス詳細</h2>
          {cloudServices.map((service, index) => (
            <div key={index} style={{ marginBottom: '15px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{service.name}</h3>
              <p style={{ margin: '5px 0' }}><strong>使用率:</strong> {service.usage}%</p>
              <p style={{ margin: '5px 0' }}><strong>コスト:</strong> {service.cost}万円/月</p>
              <p style={{ margin: '5px 0' }}><strong>パフォーマンス:</strong> {service.performance}/10</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 style={{ color: '#4CAF50' }}>クラウド分析洞察</h2>
        <ul style={{ paddingLeft: '20px' }}>
          {cloudInsights.map((insight, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CloudInfrastructure;
