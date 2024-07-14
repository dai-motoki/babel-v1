import React from 'react';
import { ArrowRight, Database, Server, Smartphone, Laptop, AlertCircle, Cloud, Lock, RefreshCw } from 'lucide-react';

const DataFlow = () => {
  return (
    <div className="p-6 bg-gray-100 text-black">
      <h1 className="text-4xl font-bold mb-8 text-center">高度なデータフロー分析</h1>
      
      <div className="mb-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-r-lg">
        <div className="flex items-center">
          <AlertCircle className="mr-2 text-yellow-500" />
          <h2 className="text-xl font-semibold">重要な注意事項</h2>
        </div>
        <p className="mt-2 text-sm">
          この図は複雑なシステムを簡略化して表現しています。実際の運用では、セキュリティ、スケーラビリティ、冗長性などの要素が追加され、より高度な構成となっています。
        </p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <DataFlowStep
          icon={<Smartphone className="text-blue-600" />}
          title="ユーザーデバイス"
          description="ユーザーがアプリケーションにアクセスし、データを入力または要求します。デバイスの種類に応じて最適化されたUIが提供されます。"
        />

        <ArrowWithDescription description="暗号化されたHTTPS通信" />

        <DataFlowStep
          icon={<Cloud className="text-green-600" />}
          title="ロードバランサー"
          description="トラフィックを複数のサーバーに分散し、システムの負荷を最適化します。DoS攻撃の緩和にも貢献します。"
        />

        <ArrowWithDescription description="内部ネットワーク通信" />

        <DataFlowStep
          icon={<Server className="text-purple-600" />}
          title="アプリケーションサーバー"
          description="ユーザーリクエストを処理し、ビジネスロジックを実行します。キャッシュを活用して応答速度を向上させます。"
        />

        <ArrowWithDescription description="暗号化されたデータベース接続" />

        <DataFlowStep
          icon={<Database className="text-red-600" />}
          title="分散データベースクラスター"
          description="高可用性と耐障害性を備えたデータストレージ。シャーディングとレプリケーションにより、大規模データを効率的に管理します。"
        />

        <ArrowWithDescription description="非同期処理とイベント駆動アーキテクチャ" />

        <DataFlowStep
          icon={<RefreshCw className="text-orange-600" />}
          title="バックグラウンドジョブとキュー"
          description="長時間実行タスクや定期的な処理を管理し、システムの応答性を維持します。"
        />

        <ArrowWithDescription description="処理済みデータの返送" />

        <DataFlowStep
          icon={<Server className="text-indigo-600" />}
          title="APIゲートウェイ"
          description="マイクロサービス間の通信を管理し、認証、レート制限、ログ記録などの横断的関心事を処理します。"
        />

        <ArrowWithDescription description="最適化されたレスポンス" />

        <DataFlowStep
          icon={<Laptop className="text-teal-600" />}
          title="ユーザーインターフェース"
          description="レスポンシブデザインとプログレッシブエンハンスメントを採用し、様々なデバイスで最適な表示を実現します。"
        />
      </div>

      <div className="mt-10 p-4 bg-blue-100 border-l-4 border-blue-500 rounded-r-lg">
        <div className="flex items-center">
          <Lock className="mr-2 text-blue-500" />
          <h2 className="text-xl font-semibold">セキュリティ対策</h2>
        </div>
        <ul className="mt-2 list-disc list-inside text-sm">
          <li>エンドツーエンドの暗号化</li>
          <li>多要素認証の実装</li>
          <li>定期的なセキュリティ監査とペネトレーションテスト</li>
          <li>AIを活用した異常検知システム</li>
        </ul>
      </div>
    </div>
  );
};

const DataFlowStep = ({ icon, title, description }) => (
  <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg border border-gray-200">
    <div className="flex items-center mb-3">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-700">{description}</p>
  </div>
);

const ArrowWithDescription = ({ description }) => (
  <div className="flex flex-col items-center">
    <ArrowRight className="text-blue-500 mb-2" size={32} />
    <p className="text-xs text-center max-w-xs">{description}</p>
  </div>
);

export default DataFlow;
