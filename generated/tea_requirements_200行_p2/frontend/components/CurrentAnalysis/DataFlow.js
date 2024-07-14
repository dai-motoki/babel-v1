import React, { useState, useEffect } from 'react';
import { ArrowRight, Database, Server, Smartphone, Laptop } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DataFlow = () => {
  const [flowData, setFlowData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    // モックデータの生成
    const generateMockData = () => {
      return [
        { name: 'ユーザー端末', value: Math.floor(Math.random() * 1000) },
        { name: 'アプリケーション', value: Math.floor(Math.random() * 1000) },
        { name: 'データベース', value: Math.floor(Math.random() * 1000) },
        { name: 'サーバー', value: Math.floor(Math.random() * 1000) },
      ];
    };

    const interval = setInterval(() => {
      setFlowData(generateMockData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNodeClick = (nodeName) => {
    setSelectedNode(nodeName);
  };

  const renderFlowChart = () => {
    const nodes = [
      { name: 'ユーザー端末', icon: Smartphone },
      { name: 'アプリケーション', icon: Laptop },
      { name: 'データベース', icon: Database },
      { name: 'サーバー', icon: Server },
    ];

    return (
      <div className="flex flex-col md:flex-row justify-around items-center my-8">
        {nodes.map((node, index) => (
          <React.Fragment key={node.name}>
            <div
              className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedNode === node.name ? 'bg-green-100 shadow-lg' : 'hover:bg-green-50'
              }`}
              onClick={() => handleNodeClick(node.name)}
            >
              <node.icon className="w-12 h-12 text-green-700 mb-2" />
              <span className="text-sm font-medium text-gray-700">{node.name}</span>
            </div>
            {index < nodes.length - 1 && (
              <ArrowRight className="w-6 h-6 text-green-500 mx-2 hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderDataChart = () => {
    return (
      <div className="w-full h-64 mt-8">
        <ResponsiveContainer>
          <LineChart data={flowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#38a169" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderNodeDetails = () => {
    if (!selectedNode) return null;

    const nodeData = {
      'ユーザー端末': {
        description: 'ユーザーがアプリケーションにアクセスする端末です。',
        stats: [
          { label: 'アクティブユーザー', value: '1,234' },
          { label: 'デバイスタイプ', value: 'スマートフォン 70%, タブレット 20%, PC 10%' },
        ],
      },
      'アプリケーション': {
        description: 'ユーザーインターフェースとビジネスロジックを含むアプリケーション層です。',
        stats: [
          { label: 'レスポンスタイム', value: '0.5秒' },
          { label: 'エラー率', value: '0.1%' },
        ],
      },
      'データベース': {
        description: 'アプリケーションのデータを永続化するデータベース層です。',
        stats: [
          { label: 'クエリ/秒', value: '500' },
          { label: 'ストレージ使用量', value: '500GB' },
        ],
      },
      'サーバー': {
        description: 'アプリケーションとデータベースをホストするサーバーインフラストラクチャです。',
        stats: [
          { label: 'CPU使用率', value: '60%' },
          { label: 'メモリ使用率', value: '70%' },
        ],
      },
    };

    const data = nodeData[selectedNode];

    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-green-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{selectedNode}の詳細</h3>
        <p className="text-gray-600 mb-4">{data.description}</p>
        <div className="grid grid-cols-2 gap-4">
          {data.stats.map((stat, index) => (
            <div key={index} className="bg-green-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-lg font-semibold text-green-700">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">データフロー分析</h2>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">システムデータフロー</h3>
        {renderFlowChart()}
        {renderDataChart()}
      </div>
      {renderNodeDetails()}
    </div>
  );
};

export default DataFlow;