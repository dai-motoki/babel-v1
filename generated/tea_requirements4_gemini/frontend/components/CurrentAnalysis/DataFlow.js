import React from 'react';
import { ArrowRight } from 'lucide-react';

const dataFlowPoints = [
  { id: 1, name: 'データソース', description: '外部システム、データベース、APIなどからのデータ取得' },
  { id: 2, name: 'データ収集', description: '様々なソースからのデータの統合' },
  { id: 3, name: 'データ前処理', description: 'データのクレンジング、変換、整形' },
  { id: 4, name: 'データ分析', description: '機械学習モデルによる分析、予測、レコメンデーション' },
  { id: 5, name: 'データ可視化', description: 'ダッシュボード、レポート、グラフによる可視化' },
  { id: 6, name: '意思決定', description: '分析結果に基づいたビジネス上の意思決定' },
  { id: 7, name: 'アクション', description: 'マーケティングオートメーション、システム連携など' },
];

const DataFlow = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">データフロー</h2>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="w-full md:w-1/3">
          <ul className="space-y-4">
            {dataFlowPoints.map((point) => (
              <li key={point.id} className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800">{point.name}</h3>
                <p className="text-gray-600 mt-2">{point.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-2/3 mt-8 md:mt-0">
          <div className="relative bg-green-50 rounded-lg p-6">
            <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="gray" />
                </marker>
              </defs>
              <line x1="50" y1="50" x2="150" y2="50" stroke="gray" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="150" y1="50" x2="250" y2="100" stroke="gray" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="250" y1="100" x2="350" y2="150" stroke="gray" strokeWidth="2" markerEnd="url(#arrowhead)" />
              {dataFlowPoints.map((point, index) => (
                <g key={point.id} transform={`translate(${index * 100},${index % 2 === 0 ? 50 : 100})`}>
                  <circle cx="0" cy="0" r="8" fill={index === dataFlowPoints.length - 1 ? 'green' : 'gray'} />
                  <text x="12" y="5" fontSize="12" fill="gray">{point.name}</text>
                </g>
              ))}
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-green-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFlow;