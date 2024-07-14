import React, { useState, useEffect, useMemo } from 'react';
import { Bar, Line, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, Title, Tooltip, Legend, Filler);

const AILearningStatus = () => {
  const [activeTab, setActiveTab] = useState('学習進捗');
  const [animatedData, setAnimatedData] = useState({
    learningProgress: { labels: [], datasets: [{ data: [] }] },
    accuracyTrend: { labels: [], datasets: [{ data: [] }] },
    modelComparison: { labels: [], datasets: [] }
  });

  const aiModels = useMemo(() => [
    { name: "自然言語処理モデル", progress: 75, accuracy: 88, efficiency: 82, robustness: 79, interpretability: 76 },
    { name: "画像認識モデル", progress: 90, accuracy: 92, efficiency: 88, robustness: 85, interpretability: 80 },
    { name: "音声認識モデル", progress: 60, accuracy: 85, efficiency: 78, robustness: 72, interpretability: 70 },
    { name: "推薦システム", progress: 80, accuracy: 89, efficiency: 85, robustness: 81, interpretability: 78 },
    { name: "異常検知モデル", progress: 70, accuracy: 87, efficiency: 83, robustness: 80, interpretability: 75 }
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData({
        learningProgress: {
          labels: aiModels.map(model => model.name),
          datasets: [{
            label: '学習進捗率（%）',
            data: aiModels.map(model => model.progress),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        accuracyTrend: {
          labels: aiModels.map(model => model.name),
          datasets: [{
            label: '精度（%）',
            data: aiModels.map(model => model.accuracy),
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1
          }]
        },
        modelComparison: {
          labels: ['精度', '効率性', 'ロバスト性', '解釈可能性', '学習進捗'],
          datasets: aiModels.map((model, index) => ({
            label: model.name,
            data: [model.accuracy, model.efficiency, model.robustness, model.interpretability, model.progress],
            backgroundColor: `rgba(${index * 50}, ${255 - index * 30}, ${index * 40}, 0.2)`,
            borderColor: `rgba(${index * 50}, ${255 - index * 30}, ${index * 40}, 1)`,
            pointBackgroundColor: `rgba(${index * 50}, ${255 - index * 30}, ${index * 40}, 1)`,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: `rgba(${index * 50}, ${255 - index * 30}, ${index * 40}, 1)`
          }))
        }
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [aiModels]);

  const renderChart = () => {
    switch(activeTab) {
      case '学習進捗':
        return <Bar data={animatedData.learningProgress} options={{responsive: true, maintainAspectRatio: false, plugins: {title: {display: true, text: 'AIモデル学習進捗状況'}}}} />;
      case '精度推移':
        return <Line data={animatedData.accuracyTrend} options={{responsive: true, maintainAspectRatio: false, plugins: {title: {display: true, text: 'AIモデル精度推移'}}}} />;
      case 'モデル比較':
        return <Radar data={animatedData.modelComparison} options={{responsive: true, maintainAspectRatio: false, plugins: {title: {display: true, text: 'AIモデル総合評価'}}}} />;
      default:
        return null;
    }
  };

  const getModelStatus = (progress) => {
    if (progress >= 90) return { status: '最適化段階', color: '#4CAF50' };
    if (progress >= 75) return { status: '微調整段階', color: '#FFC107' };
    if (progress >= 50) return { status: '発展段階', color: '#FF9800' };
    return { status: '初期段階', color: '#F44336' };
  };

  const analysisInsights = useMemo(() => [
    "画像認識モデルが最も高い学習進捗と精度を示しており、実用段階に到達しています。さらなる最適化により、産業応用の拡大が期待できます。",
    "自然言語処理モデルと推薦システムは良好な進捗を見せていますが、解釈可能性とロバスト性の向上が今後の課題です。これにより、より信頼性の高い意思決定支援が可能になるでしょう。",
    "音声認識モデルの学習進捗が他のモデルに比べて遅れているため、深層学習アーキテクチャの見直しやデータ拡充を検討する必要があります。マルチモーダル学習の導入も効果的かもしれません。",
    "異常検知モデルは全体的にバランスの取れた性能を示していますが、特に効率性とロバスト性の向上に注力することで、リアルタイム監視システムへの適用が加速するでしょう。",
    "全モデルにおいて、説明可能AIの技術を積極的に導入し、モデルの判断根拠を明確化することで、ユーザーの信頼性向上と法規制への対応を強化することが重要です。"
  ], []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px', textAlign: 'center' }}>AI学習ステータス詳細分析</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ width: '65%', minWidth: '300px' }}>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            {['学習進捗', '精度推移', 'モデル比較'].map(tab => (
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
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ height: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
            {renderChart()}
          </div>
        </div>
        <div style={{ width: '30%', minWidth: '300px' }}>
          <h2 style={{ color: '#4CAF50', textAlign: 'center' }}>モデル詳細ステータス</h2>
          {aiModels.map((model, index) => {
            const { status, color } = getModelStatus(model.progress);
            return (
              <div key={index} style={{ marginBottom: '15px', backgroundColor: 'white', padding: '15px', borderRadius: '5px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{model.name}</h3>
                <p style={{ margin: '5px 0' }}><strong>学習進捗:</strong> <span style={{ color }}>{model.progress}%</span></p>
                <p style={{ margin: '5px 0' }}><strong>現在の精度:</strong> {model.accuracy}%</p>
                <p style={{ margin: '5px 0' }}><strong>ステータス:</strong> <span style={{ color }}>{status}</span></p>
                <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', marginTop: '10px' }}>
                  <div style={{ width: `${model.progress}%`, backgroundColor: color, height: '10px', borderRadius: '5px', transition: 'width 0.5s ease-in-out' }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#4CAF50', textAlign: 'center' }}>AI学習状況の深層洞察</h2>
        <ul style={{ paddingLeft: '20px' }}>
          {analysisInsights.map((insight, index) => (
            <li key={index} style={{ marginBottom: '15px', lineHeight: '1.6' }}>{insight}</li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9em', color: '#666' }}>
        <p>最終更新: {new Date().toLocaleString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        <p>※ このダッシュボードは自動更新されます。次回更新まで: 30分</p>
      </div>
    </div>
  );
};

export default AILearningStatus;
