import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataFlow = () => {
  const [animatedData, setAnimatedData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }]
  });

  const [realTimeData, setRealTimeData] = useState([]);
  const canvasRef = useRef(null);

  const dataFlowInfo = [
    { id: 1, name: "原材料調達", value: 100, x: 50, y: 200 },
    { id: 2, name: "製造", value: 95, x: 200, y: 100 },
    { id: 3, name: "品質管理", value: 90, x: 350, y: 50 },
    { id: 4, name: "在庫管理", value: 85, x: 500, y: 100 },
    { id: 5, name: "配送", value: 80, x: 650, y: 200 },
    { id: 6, name: "販売", value: 75, x: 800, y: 300 },
    { id: 7, name: "顧客サポート", value: 70, x: 650, y: 400 },
    { id: 8, name: "フィードバック", value: 65, x: 500, y: 450 },
    { id: 9, name: "製品改善", value: 60, x: 350, y: 400 },
  ];

  const connections = [
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 1]
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData({
        labels: dataFlowInfo.map(d => d.name),
        datasets: [{
          data: dataFlowInfo.map(d => d.value),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#4D5360', '#C9CBCF', '#7AC142'],
          borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#4D5360', '#C9CBCF', '#7AC142'],
          borderWidth: 1
        }]
      });
    }, 500);

    // リアルタイムデータの更新をシミュレート
    const realTimeTimer = setInterval(() => {
      setRealTimeData(prevData => {
        const newData = [...prevData];
        if (newData.length >= 10) newData.shift();
        newData.push({
          timestamp: new Date().toLocaleTimeString(),
          value: Math.floor(Math.random() * 100)
        });
        return newData;
      });
    }, 1000);

    // サプライチェーン図のアニメーション
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const drawSupplyChain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 背景を白に設定
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ノードの描画
      dataFlowInfo.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 30, 0, 2 * Math.PI);
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 30);
        gradient.addColorStop(0, '#4CAF50');
        gradient.addColorStop(1, '#45a049');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name, node.x, node.y);

        ctx.fillStyle = '#333333';
        ctx.font = '10px Arial';
        ctx.fillText(node.value, node.x, node.y + 20);
      });

      // エッジの描画
      connections.forEach(([fromId, toId]) => {
        const fromNode = dataFlowInfo.find(n => n.id === fromId);
        const toNode = dataFlowInfo.find(n => n.id === toId);

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 2;
        ctx.stroke();

        // データフローのアニメーション
        const progress = (Date.now() % 2000) / 2000;
        const flowX = fromNode.x + (toNode.x - fromNode.x) * progress;
        const flowY = fromNode.y + (toNode.y - fromNode.y) * progress;

        ctx.beginPath();
        ctx.arc(flowX, flowY, 5, 0, 2 * Math.PI);
        const flowGradient = ctx.createRadialGradient(flowX, flowY, 0, flowX, flowY, 5);
        flowGradient.addColorStop(0, 'rgba(76, 175, 80, 1)');
        flowGradient.addColorStop(1, 'rgba(76, 175, 80, 0)');
        ctx.fillStyle = flowGradient;
        ctx.fill();
      });

      // パフォーマンス指標を表示
      ctx.fillStyle = '#333333';
      ctx.font = '14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`FPS: ${Math.round(1000 / (performance.now() - lastFrameTime))}`, 10, 20);
      lastFrameTime = performance.now();

      animationFrameId = requestAnimationFrame(drawSupplyChain);
    };

    let lastFrameTime = performance.now();
    drawSupplyChain();

    return () => {
      clearTimeout(timer);
      clearInterval(realTimeTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const analysisInsights = [
    "原材料調達から製品改善までの一連のプロセスで、各段階でのデータの流れと損失を可視化しています。",
    "製造から品質管理、在庫管理を経て配送に至るまでの過程で、データの損失が徐々に発生していることが分かります。",
    "顧客サポートからフィードバック、製品改善へのデータフローが比較的小さいため、この部分の強化が必要かもしれません。",
    "製品改善から原材料調達へのフィードバックループが存在し、継続的な改善サイクルが機能していることが示唆されています。",
    "各プロセス間でのデータ損失を最小限に抑えることで、全体的な効率と品質の向上が期待できます。"
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px', backgroundColor: '#FFFFFF' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>データフロー分析</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '60%', height: '400px' }}>
          <Bar data={animatedData} options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }} />
        </div>
        <div style={{ width: '35%' }}>
          <h2 style={{ color: '#4CAF50' }}>プロセス概要</h2>
          {dataFlowInfo.map((flow, index) => (
            <div key={index} style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
              <p style={{ margin: '0' }}><strong>{flow.name}:</strong> {flow.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#4CAF50' }}>サプライチェーン図（リアルタイム）</h2>
        <canvas ref={canvasRef} width={900} height={500} style={{ border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#4CAF50' }}>リアルタイムデータ可視化</h2>
        <div style={{ display: 'flex', overflowX: 'auto', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '10px' }}>
          {realTimeData.map((data, index) => (
            <div key={index} style={{ 
              minWidth: '80px', 
              height: `${data.value}px`, 
              backgroundColor: '#4CAF50', 
              margin: '0 5px', 
              display: 'flex', 
              alignItems: 'flex-end', 
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              borderRadius: '5px 5px 0 0',
              transition: 'all 0.3s ease'
            }}>
              {data.value}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', overflowX: 'auto', marginTop: '5px', backgroundColor: '#f0f0f0', padding: '5px 10px', borderRadius: '0 0 10px 10px' }}>
          {realTimeData.map((data, index) => (
            <div key={index} style={{ minWidth: '80px', textAlign: 'center', fontSize: '12px' }}>
              {data.timestamp}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 style={{ color: '#4CAF50' }}>分析洞察</h2>
        <ul style={{ paddingLeft: '20px' }}>
          {analysisInsights.map((insight, index) => (
            <li key={index} style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataFlow;
