import React, { useState } from 'react';
import { ArrowRight, Database, Server, Smartphone, Laptop, Cloud, Shield } from 'lucide-react';

const SystemFlow = () => {
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    { id: 'user', label: 'ユーザー', icon: Smartphone, x: 50, y: 50 },
    { id: 'frontend', label: 'フロントエンド', icon: Laptop, x: 200, y: 50 },
    { id: 'backend', label: 'バックエンド', icon: Server, x: 350, y: 50 },
    { id: 'database', label: 'データベース', icon: Database, x: 500, y: 50 },
    { id: 'ai', label: 'AI処理', icon: Cloud, x: 350, y: 200 },
    { id: 'security', label: 'セキュリティ', icon: Shield, x: 200, y: 200 },
  ];

  const edges = [
    { from: 'user', to: 'frontend' },
    { from: 'frontend', to: 'backend' },
    { from: 'backend', to: 'database' },
    { from: 'backend', to: 'ai' },
    { from: 'security', to: 'frontend' },
    { from: 'security', to: 'backend' },
  ];

  const handleNodeClick = (nodeId) => {
    setActiveNode(nodeId === activeNode ? null : nodeId);
  };

  const renderNodes = () => {
    return nodes.map((node) => (
      <div
        key={node.id}
        className={`absolute transition-all duration-300 ease-in-out transform ${
          activeNode === node.id ? 'scale-110 shadow-lg' : ''
        }`}
        style={{ left: node.x, top: node.y }}
        onClick={() => handleNodeClick(node.id)}
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex flex-col items-center justify-center cursor-pointer hover:bg-green-200 transition-colors duration-200">
          <node.icon className="w-8 h-8 text-green-700" />
          <span className="mt-2 text-xs font-semibold text-green-800">{node.label}</span>
        </div>
      </div>
    ));
  };

  const renderEdges = () => {
    return edges.map((edge, index) => {
      const fromNode = nodes.find((n) => n.id === edge.from);
      const toNode = nodes.find((n) => n.id === edge.to);

      const dx = toNode.x - fromNode.x;
      const dy = toNode.y - fromNode.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const length = Math.sqrt(dx * dx + dy * dy);

      return (
        <div
          key={index}
          className="absolute h-0.5 bg-green-500 origin-left transition-all duration-300 ease-in-out"
          style={{
            left: fromNode.x + 48,
            top: fromNode.y + 48,
            width: length - 96,
            transform: `rotate(${angle}deg)`,
          }}
        >
          <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-green-600" size={16} />
        </div>
      );
    });
  };

  const renderNodeDetails = () => {
    if (!activeNode) return null;

    const node = nodes.find((n) => n.id === activeNode);
    let details = '';

    switch (node.id) {
      case 'user':
        details = 'ユーザーはスマートフォンやPCからウェブサイトにアクセスし、サービスを利用します。';
        break;
      case 'frontend':
        details = 'React.jsを使用したSPA（シングルページアプリケーション）で、ユーザーインターフェースを提供します。';
        break;
      case 'backend':
        details = 'Node.jsとExpressを使用したRESTful APIサーバーで、ビジネスロジックを処理します。';
        break;
      case 'database':
        details = 'MongoDBを使用したNoSQLデータベースで、ユーザーデータや商品情報を保存します。';
        break;
      case 'ai':
        details = 'TensorFlow.jsを使用した機械学習モデルで、商品レコメンデーションや需要予測を行います。';
        break;
      case 'security':
        details = 'JWT認証、HTTPS、WAFを使用してシステム全体のセキュリティを確保します。';
        break;
      default:
        details = '';
    }

    return (
      <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-md border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-2">{node.label}の詳細</h3>
        <p className="text-sm text-green-700">{details}</p>
      </div>
    );
  };

  return (
    <div className="relative w-full h-[600px] bg-green-50 rounded-lg overflow-hidden shadow-inner">
      <h2 className="text-2xl font-bold text-green-800 p-4 bg-white bg-opacity-50">システムフロー図</h2>
      {renderEdges()}
      {renderNodes()}
      {renderNodeDetails()}
    </div>
  );
};

export default SystemFlow;