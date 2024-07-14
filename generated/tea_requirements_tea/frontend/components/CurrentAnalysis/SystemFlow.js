import React from 'react';
import { ArrowRight, Database, Server, Users, Monitor, Cloud, Zap, Shield, Smartphone, Globe } from 'lucide-react';

// システムフローコンポーネント
const SystemFlow = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">高度システムフロー分析</h2>
      <div className="flex flex-col items-center space-y-6">
        <FlowCard
          icon={<Users className="text-blue-600" size={32} />}
          title="ユーザー"
          description="多様なデバイスからアクセスするグローバルユーザー"
        />
        <ArrowWithLabel label="HTTPS/WSS" />
        <FlowCard
          icon={<Globe className="text-green-600" size={32} />}
          title="CDN"
          description="グローバルコンテンツデリバリーネットワーク"
        />
        <ArrowWithLabel label="最適化されたコンテンツ配信" />
        <FlowCard
          icon={<Monitor className="text-indigo-600" size={32} />}
          title="フロントエンド"
          description="React.js, Next.js によるSSR/CSR ハイブリッドアプリケーション"
        />
        <ArrowWithLabel label="GraphQL/REST API" />
        <FlowCard
          icon={<Server className="text-purple-600" size={32} />}
          title="バックエンド"
          description="Node.js, Express, GraphQL による高性能APIサーバー"
        />
        <ArrowWithLabel label="ORM/Raw Queries" />
        <FlowCard
          icon={<Database className="text-red-600" size={32} />}
          title="データベース"
          description="PostgreSQL (主データ), Redis (キャッシュ), Elasticsearch (検索)"
        />
        <ArrowWithLabel label="データ同期" />
        <FlowCard
          icon={<Cloud className="text-cyan-600" size={32} />}
          title="クラウドサービス"
          description="AWS/GCP ハイブリッドクラウド、AI分析、レコメンデーション"
        />
        <div className="flex justify-center space-x-6 mt-6">
          <FlowCard
            icon={<Zap className="text-yellow-600" size={32} />}
            title="リアルタイム処理"
            description="Apache Kafka, WebSocket"
          />
          <FlowCard
            icon={<Shield className="text-gray-600" size={32} />}
            title="セキュリティ"
            description="WAF, DDoS保護, データ暗号化"
          />
          <FlowCard
            icon={<Smartphone className="text-orange-600" size={32} />}
            title="モバイルアプリ"
            description="React Native クロスプラットフォーム"
          />
        </div>
      </div>
    </div>
  );
};

// フローカードコンポーネント
const FlowCard = ({ icon, title, description }) => {
  return (
    <div className="w-72 border-2 border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-row items-center space-x-4 p-4">
        <div className="bg-gray-100 rounded-full p-2">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      {description && (
        <div className="px-4 pb-4">
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      )}
    </div>
  );
};

// 矢印とラベルのコンポーネント
const ArrowWithLabel = ({ label }) => (
  <div className="flex flex-col items-center">
    <ArrowRight className="text-gray-400 mb-1" size={24} />
    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{label}</span>
  </div>
);

export default SystemFlow;