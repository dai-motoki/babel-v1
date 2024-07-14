import React, { useState, useEffect } from 'react';
import { ArrowRight, Database, Server, Smartphone, Laptop, Cloud } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DataFlow = () => {
  const [flowData, setFlowData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    // モックデータの生成
    const generateMockData = () => {
      const nodes = ['データベース', 'サーバー', 'クラウド', 'スマートフォン', 'ラップトップ'];
      return nodes.map(node => ({
        name: node,
        データ量: Math.floor(Math.random() * 1000) + 100,
        処理速度: Math.floor(Math.random() * 100) + 10
      }));
    };

    setFlowData(generateMockData());
  }, []);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const renderFlowChart = () => {
    return (
      <div className="flex justify-center items-center space-x-4 mb-8">
        {flowData.map((node, index) => (
          <React.Fragment key={node.name}>
            <div
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                selectedNode === node.name ? 'scale-110' : 'hover:scale-105'
              }`}
              onClick={() => handleNodeClick(node.name)}
            >
              {renderIcon(node.name)}
              <span className="mt-2 text-sm font-medium text-gray-700">{node.name}</span>
            </div>
            {index < flowData.length - 1 && (
              <ArrowRight className="text-green-600" size={24} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderIcon = (nodeName) => {
    const iconProps = { size: 48, className: "text-green-700" };
    switch (nodeName) {
      case 'データベース':
        return <Database {...iconProps} />;
      case 'サーバー':
        return <Server {...iconProps} />;
      case 'クラウド':
        return <Cloud {...iconProps} />;
      case 'スマートフォン':
        return <Smartphone {...iconProps} />;
      case 'ラップトップ':
        return <Laptop {...iconProps} />;
      default:
        return null;
    }
  };

  const renderNodeDetails = () => {
    if (!selectedNode) return null;

    const nodeData = flowData.find(node => node.name === selectedNode);
    if (!nodeData) return null;

    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-green-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{nodeData.name}の詳細</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-600">データ量</p>
            <p className="text-2xl font-bold text-green-700">{nodeData.データ量} GB</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-600">処理速度</p>
            <p className="text-2xl font-bold text-green-700">{nodeData.処理速度} Mbps</p>
          </div>
        </div>
      </div>
    );
  };

  const renderPerformanceChart = () => {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">パフォーマンスチャート</h3>
        <div className="bg-white p-4 rounded-lg shadow-md border border-green-200" style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={flowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#4a5568" />
              <YAxis yAxisId="left" stroke="#2f855a" />
              <YAxis yAxisId="right" orientation="right" stroke="#4299e1" />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0' }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="データ量" stroke="#2f855a" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="処理速度" stroke="#4299e1" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">データフロー分析</h2>
      <div className="bg-green-50 p-6 rounded-lg shadow-lg border border-green-300 mb-8">
        <p className="text-gray-700 leading-relaxed">
          このデータフロー分析は、システム内でのデータの流れを視覚化し、各ノード間のデータ転送とパフォーマンスを示しています。
          各ノードをクリックすると、詳細情報が表示されます。
        </p>
      </div>
      {renderFlowChart()}
      {renderNodeDetails()}
      {renderPerformanceChart()}
    </div>
  );
};

export default DataFlow;