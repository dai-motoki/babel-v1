// import React, { useState, useEffect } from 'react';
// import { Flowchart } from 'react-flowchart';

// const SystemFlow = () => {
//   const [flowchartData, setFlowchartData] = useState(null);

//   useEffect(() => {
//     // システムフローのデータを定義
//     const data = {
//       nodes: [
//         { id: 'start', type: 'start', text: '開始', x: 50, y: 50 },
//         { id: 'marketAnalysis', type: 'operation', text: '市場分析', x: 50, y: 150 },
//         { id: 'competitorAnalysis', type: 'operation', text: '競合分析', x: 50, y: 250 },
//         { id: 'dataVisualization', type: 'operation', text: 'データ可視化', x: 50, y: 350 },
//         { id: 'insightGeneration', type: 'operation', text: '洞察生成', x: 50, y: 450 },
//         { id: 'strategyFormulation', type: 'operation', text: '戦略立案', x: 50, y: 550 },
//         { id: 'end', type: 'end', text: '終了', x: 50, y: 650 },
//       ],
//       links: [
//         { from: 'start', to: 'marketAnalysis' },
//         { from: 'marketAnalysis', to: 'competitorAnalysis' },
//         { from: 'competitorAnalysis', to: 'dataVisualization' },
//         { from: 'dataVisualization', to: 'insightGeneration' },
//         { from: 'insightGeneration', to: 'strategyFormulation' },
//         { from: 'strategyFormulation', to: 'end' },
//       ],
//     };

//     setFlowchartData(data);
//   }, []);

//   return (
//     <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
//       <h1 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>システムフロー</h1>
//       {flowchartData && (
//         <Flowchart
//           data={flowchartData}
//           options={{
//             width: 800,
//             height: 600,
//             'line-color': '#4CAF50',
//             'element-color': '#333',
//             fill: '#fff',
//           }}
//         />
//       )}
//       <div style={{ marginTop: '20px' }}>
//         <h2 style={{ color: '#4CAF50' }}>フロー説明</h2>
//         <ol style={{ paddingLeft: '20px' }}>
//           <li>市場分析：市場シェア、売上高などのデータを収集・分析</li>
//           <li>競合分析：競合他社の強み・弱みを分析</li>
//           <li>データ可視化：収集したデータをグラフや図表で可視化</li>
//           <li>洞察生成：データから重要な洞察を抽出</li>
//           <li>戦略立案：分析結果に基づいて今後の戦略を立案</li>
//         </ol>
//       </div>
//     </div>
//   );
// };

// export default SystemFlow;
