import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const SalesRevenueTrend = () => {
  const [activeTab, setActiveTab] = useState('売上高推移');
  const [animatedData, setAnimatedData] = useState({
    salesTrend: {
      labels: [],
      datasets: [{
        label: '売上高（百万円）',
        data: [],
        backgroundColor: '#4BC0C0',
        borderColor: '#3DA3A3',
        borderWidth: 1
      }]
    },
    profitMarginTrend: {
      labels: [],
      datasets: [{
        label: '利益率（%）',
        data: [],
        fill: false,
        borderColor: '#FF6384',
        tension: 0.1
      }]
    }
  });

  const salesData = [
    { year: 2019, sales: 100000000, profitMargin: 15 },
    { year: 2020, sales: 120000000, profitMargin: 16 },
    { year: 2021, sales: 150000000, profitMargin: 17 },
    { year: 2022, sales: 180000000, profitMargin: 18 },
    { year: 2023, sales: 200000000, profitMargin: 19 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData({
        salesTrend: {
          labels: salesData.map(d => d.year),
          datasets: [{
            label: '売上高（百万円）',
            data: salesData.map(d => d.sales / 1000000),
            backgroundColor: '#4BC0C0',
            borderColor: '#3DA3A3',
            borderWidth: 1
          }]
        },
        profitMarginTrend: {
          labels: salesData.map(d => d.year),
          datasets: [{
            label: '利益率（%）',
            data: salesData.map(d => d.profitMargin),
            fill: false,
            borderColor: '#FF6384',
            tension: 0.1
          }]
        }
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const annualGrowthRate = () => {
    const firstYear = salesData[0];
    const lastYear = salesData[salesData.length - 1];
    const years = salesData.length - 1;
    return ((Math.pow(lastYear.sales / firstYear.sales, 1 / years) - 1) * 100).toFixed(2);
  };

  const analysisInsights = [
    `過去5年間で売上高は年平均${annualGrowthRate()}%成長しています。`,
    "利益率も着実に向上しており、2023年には19%に達しています。",
    "2020年以降、コロナ禍にもかかわらず成長を続けており、事業の耐性が示されています。",
    "今後は、この成長率を維持しつつ、さらなる利益率の改善が課題となります。"
  ];

  const renderChart = () => {
    switch(activeTab) {
      case '売上高推移':
        return <Bar data={animatedData.salesTrend} options={{responsive: true, maintainAspectRatio: false}} />;
      case '利益率推移':
        return <Line data={animatedData.profitMarginTrend} options={{responsive: true, maintainAspectRatio: false}} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>売上・収益推移</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '60%' }}>
          <div style={{ marginBottom: '20px' }}>
            {['売上高推移', '利益率推移'].map(tab => (
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
          <h2 style={{ color: '#4CAF50' }}>分析洞察</h2>
          <ul style={{ paddingLeft: '20px' }}>
            {analysisInsights.map((insight, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>{insight}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SalesRevenueTrend;
