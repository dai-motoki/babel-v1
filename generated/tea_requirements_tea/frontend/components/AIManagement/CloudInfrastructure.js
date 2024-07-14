import React, { useState, useEffect } from 'react';
import { Cloud, Server, Database, Globe, Laptop, Network, Lock, Cog, Zap, DollarSign, AlertCircle, BarChart2, Cpu, HardDrive, Wifi, Shield, Users, Clock, Maximize, Minimize, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// モックデータ - 実際の環境では API からデータを取得します
const mockUsageData = [
  { name: '1月', cpu: 65, memory: 70, storage: 55, network: 60 },
  { name: '2月', cpu: 70, memory: 75, storage: 58, network: 65 },
  { name: '3月', cpu: 80, memory: 85, storage: 62, network: 75 },
  { name: '4月', cpu: 75, memory: 80, storage: 60, network: 70 },
  { name: '5月', cpu: 85, memory: 90, storage: 65, network: 80 },
  { name: '6月', cpu: 90, memory: 95, storage: 70, network: 85 },
];

const CloudInfrastructure = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isExpanded, setIsExpanded] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // コンポーネントマウント時やリフレッシュ時にデータを再取得
    fetchInfrastructureData();
  }, [refreshKey]);

  const fetchInfrastructureData = () => {
    // 実際の環境では、ここで API からデータを取得します
    console.log('インフラストラクチャデータを取得中...');
  };

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const OverviewCard = ({ icon, title, value, trend }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-sm font-medium text-gray-500">{title}</span>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        <span className="ml-2 text-sm text-gray-500">{trend}</span>
      </div>
    </div>
  );

  const PerformanceMetric = ({ title, value, trend, trendDirection }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm ${trendDirection === 'up' ? 'text-green-600' : trendDirection === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
        {trend}
      </p>
    </div>
  );

  const SecurityMetric = ({ title, value, severity }) => (
    <div className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${severity === 'high' ? 'border-red-500' : severity === 'medium' ? 'border-yellow-500' : 'border-green-500'}`}>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );

  const SecurityEvent = ({ title, description, time, severity }) => (
    <li className={`p-2 rounded-md ${severity === 'high' ? 'bg-red-100' : severity === 'medium' ? 'bg-yellow-100' : 'bg-green-100'}`}>
      <h5 className="font-semibold">{title}</h5>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-xs text-gray-500 mt-1">{time}</p>
    </li>
  );

  return (
    <div className={`p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg transition-all duration-300 ${isExpanded ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">クラウドインフラストラクチャ</h2>
        <div className="flex space-x-2">
          <button onClick={handleRefresh} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            <RefreshCw size={20} />
          </button>
          <button onClick={toggleExpand} className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors">
            {isExpanded ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-sm">
          <Globe className="text-blue-600" size={48} />
          <span className="text-xl font-semibold text-gray-800">ユーザー</span>
        </div>
        <Zap className="text-yellow-500" size={24} />
        <div className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-sm">
          <Cloud className="text-purple-600" size={48} />
          <span className="text-xl font-semibold text-gray-800">クラウドプラットフォーム</span>
        </div>

        <div className="w-full">
          <div className="flex mb-4 border-b">
            {['overview', 'components', 'monitoring', 'security', 'cost'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <OverviewCard icon={<Cpu className="text-blue-500" size={24} />} title="CPU使用率" value="75%" trend="上昇中" />
              <OverviewCard icon={<HardDrive className="text-green-500" size={24} />} title="ストレージ使用量" value="62%" trend="安定" />
              <OverviewCard icon={<Wifi className="text-purple-500" size={24} />} title="ネットワークトラフィック" value="1.2 TB/日" trend="増加中" />
              <OverviewCard icon={<Users className="text-yellow-500" size={24} />} title="アクティブユーザー" value="15,000" trend="急増中" />
              <OverviewCard icon={<Shield className="text-red-500" size={24} />} title="セキュリティアラート" value="2" trend="対応中" />
              <OverviewCard icon={<Clock className="text-indigo-500" size={24} />} title="平均応答時間" value="120ms" trend="改善中" />
            </div>
          )}

          {activeTab === 'components' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <InfrastructureComponent 
                icon={<Server className="text-green-600" size={36} />} 
                title="Webサーバー" 
                description="高性能な負荷分散" 
                cost="¥50,000/月"
                details="Nginx使用、オートスケーリング設定済み"
                status="正常"
              />
              <InfrastructureComponent 
                icon={<Server className="text-red-600" size={36} />} 
                title="アプリケーションサーバー" 
                description="スケーラブルな処理" 
                cost="¥100,000/月"
                details="Kubernetes使用、マイクロサービスアーキテクチャ"
                status="注意"
              />
              <InfrastructureComponent 
                icon={<Database className="text-yellow-600" size={36} />} 
                title="データベース" 
                description="冗長性と高可用性" 
                cost="¥80,000/月"
                details="Amazon RDS (PostgreSQL)、マルチAZ構成"
                status="正常"
              />
              <InfrastructureComponent 
                icon={<Network className="text-blue-600" size={36} />} 
                title="ネットワーク" 
                description="高速で安全な接続" 
                cost="¥30,000/月"
                details="VPC、CloudFront CDN使用"
                status="正常"
              />
              <InfrastructureComponent 
                icon={<Lock className="text-indigo-600" size={36} />} 
                title="セキュリティ" 
                description="多層防御戦略" 
                cost="¥40,000/月"
                details="WAF、IAM、暗号化、セキュリティグループ設定"
                status="警告"
              />
              <InfrastructureComponent 
                icon={<Cog className="text-gray-600" size={36} />} 
                title="管理ツール" 
                description="効率的な運用管理" 
                cost="¥20,000/月"
                details="CloudWatch、CloudTrail、Terraform使用"
                status="正常"
              />
            </div>
          )}

          {activeTab === 'monitoring' && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">リソース使用率</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU" />
                    <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="メモリ" />
                    <Line type="monotone" dataKey="storage" stroke="#ffc658" name="ストレージ" />
                    <Line type="monotone" dataKey="network" stroke="#ff7300" name="ネットワーク" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PerformanceMetric title="平均応答時間" value="120ms" trend="改善" trendDirection="down" />
                <PerformanceMetric title="エラーレート" value="0.5%" trend="安定" trendDirection="neutral" />
                <PerformanceMetric title="スループット" value="1000 req/s" trend="増加" trendDirection="up" />
                <PerformanceMetric title="CPU使用率" value="75%" trend="上昇" trendDirection="up" />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">セキュリティ概要</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SecurityMetric title="アクティブな脅威" value="2" severity="high" />
                  <SecurityMetric title="パッチ適用状況" value="98%" severity="low" />
                  <SecurityMetric title="最後のセキュリティ監査" value="7日前" severity="medium" />
                  <SecurityMetric title="未解決の脆弱性" value="5" severity="medium" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">最近のセキュリティイベント</h3>
                <ul className="space-y-2">
                  <SecurityEvent 
                    title="不審なログイン試行" 
                    description="複数の失敗したログイン試行が検出されました。" 
                    time="2時間前"
                    severity="high"
                  />
                  <SecurityEvent 
                    title="ファイアウォールルールの更新" 
                    description="新しいセキュリティルールが適用されました。" 
                    time="1日前"
                    severity="low"
                  />
                  <SecurityEvent 
                    title="DDoS攻撃の試み" 
                    description="小規模なDDoS攻撃が検出され、緩和されました。" 
                    time="3日前"
                    severity="medium"
                  />
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'cost' && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">コスト概要</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-800">総コスト: ¥320,000/月</span>
                  <span className="text-sm text-gray-500">前月比: +5%</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  ※ トラフィックや使用量により変動する可能性があります。定期的な最適化を推奨します。
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "コンピューティング", cost: "¥150,000", percentage: 46.9 },
                  { title: "ストレージ", cost: "¥80,000", percentage: 25 },
                  { title: "ネットワーク", cost: "¥50,000", percentage: 15.6 },
                  { title: "データベース", cost: "¥30,000", percentage: 9.4 },
                  { title: "セキュリティ", cost: "¥10,000", percentage: 3.1 }
                ].map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <p className="text-xl font-bold text-green-600">{item.cost}</p>
                    <p className="text-sm text-gray-600">{item.percentage}%</p>
                  </div>
                ))}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">コスト最適化の提案</h3>
                <ul className="space-y-2">
                  {[
                    {
                      title: "リザーブドインスタンスの活用",
                      description: "長期的に使用するインスタンスに対してリザーブドインスタンスを購入することで、最大72%のコスト削減が可能です。",
                      potentialSavings: "¥50,000/月"
                    },
                    {
                      title: "自動スケーリングの最適化",
                      description: "使用率の低い時間帯でのインスタンス数を削減し、必要に応じて自動的にスケールアップするように設定を調整します。",
                      potentialSavings: "¥20,000/月"
                    },
                    {
                      title: "ストレージクラスの見直し",
                      description: "アクセス頻度の低いデータを低コストのストレージクラスに移行することで、ストレージコストを削減できます。",
                      potentialSavings: "¥15,000/月"
                    }
                  ].map((suggestion, index) => (
                    <li key={index} className="bg-yellow-50 p-3 rounded-md">
                      <h4 className="font-semibold">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600">{suggestion.description}</p>
                      <p className="text-sm font-semibold text-green-600 mt-1">潜在的な節約: {suggestion.potentialSavings}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">クラウドインフラストラクチャの概要</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Server className="text-green-600" size={36} />,
                title: "Webサーバー",
                description: "高性能な負荷分散",
                cost: "¥50,000/月",
                details: "Nginx使用、オートスケーリング設定済み"
              },
              {
                icon: <Server className="text-red-600" size={36} />,
                title: "アプリケーションサーバー",
                description: "スケーラブルな処理",
                cost: "¥100,000/月",
                details: "Kubernetes使用、マイクロサービスアーキテクチャ"
              },
              {
                icon: <Database className="text-yellow-600" size={36} />,
                title: "データベース",
                description: "冗長性と高可用性",
                cost: "¥80,000/月",
                details: "Amazon RDS (PostgreSQL)、マルチAZ構成"
              },
              {
                icon: <Network className="text-blue-600" size={36} />,
                title: "ネットワーク",
                description: "高速で安全な接続",
                cost: "¥30,000/月",
                details: "VPC、CloudFront CDN使用"
              },
              {
                icon: <Lock className="text-indigo-600" size={36} />,
                title: "セキュリティ",
                description: "多層防御戦略",
                cost: "¥40,000/月",
                details: "WAF、IAM、暗号化、セキュリティグループ設定"
              },
              {
                icon: <Cog className="text-gray-600" size={36} />,
                title: "管理ツール",
                description: "効率的な運用管理",
                cost: "¥20,000/月",
                details: "CloudWatch、CloudTrail、Terraform使用"
              }
            ].map((component, index) => (
              <InfrastructureComponent key={index} {...component} />
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">総コスト概算</h3>
          <div className="flex items-center space-x-2">
            <DollarSign className="text-green-600" size={24} />
            <span className="text-xl font-semibold text-gray-800">¥320,000/月</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            ※ トラフィックや使用量により変動する可能性があります。定期的な最適化を推奨します。
          </p>
        </div>
      </div>
    </div>
  );
};

const InfrastructureComponent = ({ icon, title, description, cost, details }) => (
  <div className="flex flex-col items-center space-y-2 bg-white p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
    {icon}
    <span className="text-sm font-medium text-gray-800">{title}</span>
    <span className="text-xs text-gray-600 text-center">{description}</span>
    <div className="flex items-center space-x-1 mt-2">
      <DollarSign className="text-green-600" size={16} />
      <span className="text-xs font-semibold text-green-600">{cost}</span>
    </div>
    <span className="text-xs text-gray-500 text-center mt-1">{details}</span>
  </div>
);

export default CloudInfrastructure;


