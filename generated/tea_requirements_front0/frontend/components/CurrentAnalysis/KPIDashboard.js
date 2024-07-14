import React, { useState, useEffect } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

const KPIDashboard = () => {
  const [activeTab, setActiveTab] = useState('売上');
  const [animatedData, setAnimatedData] = useState({
    revenue: {
      labels: [],
      datasets: [{
        label: '売上高（百万円）',
        data: [],
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1
      }]
    },
    customerSatisfaction: {
      labels: [],
      datasets: [{
        label: '顧客満足度',
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }]
    },
    productivityTrend: {
      labels: [],
      datasets: [{
        label: '生産性指数',
        data: [],
        fill: false,
        borderColor: '',
        tension: 0.1
      }]
    }
  });

  const kpiData = [
    { month: '1月', revenue: 1200, customerSatisfaction: 4.2, productivity: 105 },
    { month: '2月', revenue: 1300, customerSatisfaction: 4.3, productivity: 107 },
    { month: '3月', revenue: 1400, customerSatisfaction: 4.4, productivity: 110 },
    { month: '4月', revenue: 1350, customerSatisfaction: 4.3, productivity: 108 },
    { month: '5月', revenue: 1500, customerSatisfaction: 4.5, productivity: 112 },
    { month: '6月', revenue: 1600, customerSatisfaction: 4.6, productivity: 115 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData({
        revenue: {
          labels: kpiData.map(d => d.month),
          datasets: [{
            label: '売上高（百万円）',
            data: kpiData.map(d => d.revenue),
            backgroundColor: '#4BC0C0',
            borderColor: '#3DA3A3',
            borderWidth: 1
          }]
        },
        customerSatisfaction: {
          labels: ['非常に満足', '満足', '普通', '不満', '非常に不満'],
          datasets: [{
            data: [50, 30, 15, 4, 1],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverBackgroundColor: ['#FF4F72', '#2F8ED6', '#FFB93E', '#3DA3A3', '#8A4FFF']
          }]
        },
        productivityTrend: {
          labels: kpiData.map(d => d.month),
          datasets: [{
            label: '生産性指数',
            data: kpiData.map(d => d.productivity),
            fill: false,
            borderColor: '#FF6384',
            tension: 0.1
          }]
        }
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const renderChart = () => {
    switch(activeTab) {
      case '売上':
        return <Bar data={animatedData.revenue} options={{responsive: true, maintainAspectRatio: false}} />;
      case '顧客満足度':
        return <Pie data={animatedData.customerSatisfaction} options={{responsive: true, maintainAspectRatio: false}} />;
      case '生産性':
        return <Line data={animatedData.productivityTrend} options={{responsive: true, maintainAspectRatio: false}} />;
      default:
        return null;
    }
  };

  const kpiInsights = [
    "売上高は過去6ヶ月間で着実に増加しており、特に直近の6月は前月比6.7%増を記録しました。",
    "顧客満足度は非常に高く、80%以上のお客様が「満足」または「非常に満足」と回答しています。",
    "生産性指数は上昇傾向にあり、効率化施策の効果が表れています。",
    "売上高と生産性の相関関係が強く、生産性向上が売上増加に直結していることが示唆されます。",
    "顧客満足度の高さが継続的な売上増加につながっていると考えられます。今後も顧客中心のアプローチを維持することが重要です。"
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>KPIダッシュボード</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '60%' }}>
          <div style={{ marginBottom: '20px' }}>
            {['売上', '顧客満足度', '生産性'].map(tab => (
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
          <h2 style={{ color: '#4CAF50' }}>KPI概要</h2>
          {kpiData.slice(-1).map((data, index) => (
            <div key={index} style={{ marginBottom: '15px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{data.month}の実績</h3>
              <p style={{ margin: '5px 0' }}><strong>売上高:</strong> {data.revenue}百万円</p>
              <p style={{ margin: '5px 0' }}><strong>顧客満足度:</strong> {data.customerSatisfaction}</p>
              <p style={{ margin: '5px 0' }}><strong>生産性指数:</strong> {data.productivity}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 style={{ color: '#4CAF50' }}>KPI分析洞察</h2>
        <ul style={{ paddingLeft: '20px' }}>
          {kpiInsights.map((insight, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KPIDashboard;
