import React, { useState, useEffect } from 'react';
import { Pie, Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler);

const CompetitiveAnalysis = () => {
  const [activeTab, setActiveTab] = useState('市場シェア');
  const [animatedData, setAnimatedData] = useState({
    marketShare: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }]
    },
    revenue: {
      labels: [],
      datasets: [{
        label: '売上高（億円）',
        data: [],
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1
      }]
    },
    competitiveIndex: {
      labels: [],
      datasets: []
    }
  });

  const competitors = [
    { name: "当社", marketShare: 15, revenue: 150, customerSatisfaction: 4.5, innovationScore: 8, marketingEfficiency: 7, strengths: ["ニッチ市場での強み", "顧客ロイヤリティ"], weaknesses: ["認知度", "製品ラインナップの狭さ"] },
    { name: "Company A", marketShare: 30, revenue: 300, customerSatisfaction: 4.2, innovationScore: 9, marketingEfficiency: 8, strengths: ["ブランド力", "広範な製品ライン"], weaknesses: ["高価格", "カスタマーサポートの質"] },
    { name: "Company B", marketShare: 25, revenue: 250, customerSatisfaction: 4.0, innovationScore: 7, marketingEfficiency: 9, strengths: ["技術革新", "顧客サービス"], weaknesses: ["限定的な市場範囲", "価格競争力"] },
    { name: "Company C", marketShare: 20, revenue: 200, customerSatisfaction: 3.8, innovationScore: 6, marketingEfficiency: 8, strengths: ["コスト効率", "流通ネットワーク"], weaknesses: ["製品品質", "ブランドイメージ"] },
    { name: "Others", marketShare: 10, revenue: 100, customerSatisfaction: 3.5, innovationScore: 5, marketingEfficiency: 6, strengths: ["多様性", "ニッチ市場対応"], weaknesses: ["規模の経済", "ブランド認知度"] }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData({
        marketShare: {
          labels: competitors.map(c => c.name),
          datasets: [{
            data: competitors.map(c => c.marketShare),
            backgroundColor: ['#4BC0C0', '#FF6384', '#36A2EB', '#FFCE56', '#9966FF'],
            hoverBackgroundColor: ['#3DA3A3', '#FF4F72', '#2F8ED6', '#FFB93E', '#8A4FFF']
          }]
        },
        revenue: {
          labels: competitors.map(c => c.name),
          datasets: [{
            label: '売上高（億円）',
            data: competitors.map(c => c.revenue),
            backgroundColor: '#4BC0C0',
            borderColor: '#3DA3A3',
            borderWidth: 1
          }]
        },
        competitiveIndex: {
          labels: ['顧客満足度', 'イノベーション', 'マーケティング効率', '市場シェア', '売上高'],
          datasets: competitors.map((c, index) => ({
            label: c.name,
            data: [c.customerSatisfaction * 2, c.innovationScore, c.marketingEfficiency, c.marketShare / 3, c.revenue / 30],
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

  const analysisInsights = [
    "当社は現在、市場シェア15%で第4位の位置にありますが、顧客満足度では業界トップを誇っています。",
    "大手3社（Company A, B, C）で市場の75%を占める寡占状態が続いていますが、各社の強みと弱みが明確に分かれています。",
    "当社の強みであるニッチ市場での存在感と高い顧客ロイヤリティを活かし、イノベーションとマーケティング効率の向上によりシェア拡大を目指す戦略が有効です。",
    "認知度の向上が最大の課題であり、デジタルマーケティングの強化とブランディング戦略の見直しが急務です。",
    "競合他社と比較して、当社の製品ラインナップの拡充も検討すべき課題です。ニッチ市場での強みを活かしつつ、隣接市場への展開を模索することで、さらなる成長の可能性があります。"
  ];

  const renderChart = () => {
    switch(activeTab) {
      case '市場シェア':
        return <Pie data={animatedData.marketShare} options={{responsive: true, maintainAspectRatio: false}} />;
      case '売上高比較':
        return <Bar data={animatedData.revenue} options={{responsive: true, maintainAspectRatio: false}} />;
      case '競争力指標':
        return <Radar data={animatedData.competitiveIndex} options={{responsive: true, maintainAspectRatio: false}} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>競合動向分析</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '60%' }}>
          <div style={{ marginBottom: '20px' }}>
            {['市場シェア', '売上高比較', '競争力指標'].map(tab => (
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
          <h2 style={{ color: '#4CAF50' }}>競合分析</h2>
          {competitors.map((competitor, index) => (
            <div key={index} style={{ marginBottom: '15px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{competitor.name}</h3>
              <p style={{ margin: '5px 0' }}><strong>市場シェア:</strong> {competitor.marketShare}%</p>
              <p style={{ margin: '5px 0' }}><strong>強み:</strong> {competitor.strengths.join(', ')}</p>
              <p style={{ margin: '5px 0' }}><strong>弱み:</strong> {competitor.weaknesses.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 style={{ color: '#4CAF50' }}>分析洞察</h2>
        <ul style={{ paddingLeft: '20px' }}>
          {analysisInsights.map((insight, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompetitiveAnalysis;
