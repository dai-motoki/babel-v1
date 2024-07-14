import React, { Suspense, lazy } from 'react';
import { Zap, Settings, BarChart2, Code, Server, Activity, 
         TrendingUp, GitBranch, Users, Shield, MessageCircle, 
         Monitor, Book, AlertTriangle } from 'lucide-react';

// 動的にインポートするコンポーネント



const AILearningStatus = lazy(() => import('./components/AIManagement/AILearningStatus'));
const CloudInfrastructure = lazy(() => import('./components/AIManagement/CloudInfrastructure'));
const ProgressStatus = lazy(() => import('./components/AIManagement/ProgressStatus'));
const Development = lazy(() => import('./components/Application/Development'));
const Production = lazy(() => import('./components/Application/Production'));
const Staging = lazy(() => import('./components/Application/Staging'));
const CompetitiveAnalysis = lazy(() => import('./components/CurrentAnalysis/CompetitiveAnalysis'));
const DataFlow = lazy(() => import('./components/CurrentAnalysis/DataFlow'));
const KPIDashboard = lazy(() => import('./components/CurrentAnalysis/KPIDashboard'));
const SalesRevenueTrend = lazy(() => import('./components/CurrentAnalysis/SalesRevenueTrend'));
const SystemFlow = lazy(() => import('./components/CurrentAnalysis/SystemFlow'));
const LandingPage = lazy(() => import('./components/Marketing/LandingPage'));
const MarketingFunnel = lazy(() => import('./components/Marketing/MarketingFunnel'));
const Website = lazy(() => import('./components/Marketing/Website'));




const Chat = lazy(() => import('./components/Internal_systems/chat'));
const Monitoring = lazy(() => import('./components/Internal_systems/monitoring'));
const Wiki = lazy(() => import('./components/Internal_systems/wiki'));
const SecurityAudit = lazy(() => import('./components/Security/security_audit'));
const SecurityEnforcement = lazy(() => import('./components/Security/security_enforcement'));
const SecurityLogs = lazy(() => import('./components/Security/security_logs'));
const SecurityMonitor = lazy(() => import('./components/Security/security_monitor'));

const ChatWindow = lazy(() => import('./components/Team/ChatMessage'));

const DynamicComponent = ({ componentName }) => {
  // コンポーネントのマッピングオブジェクトを定義
  // このオブジェクトは、コンポーネント名と実際のコンポーネントを関連付けます
  const components = {
    AILearningStatus,
    CloudInfrastructure,
    ProgressStatus,
    Development,
    Production,
    Staging,
    CompetitiveAnalysis,
    DataFlow,
    KPIDashboard,
    SalesRevenueTrend,
    SystemFlow,
    LandingPage,
    MarketingFunnel,
    Website,
    Chat,
    Monitoring,
    Wiki,
    SecurityAudit,
    SecurityEnforcement,
    SecurityLogs,
    SecurityMonitor,
    ChatWindow,
  };

  // 指定されたコンポーネント名に基づいて、対応するコンポーネントを取得
  const Component = components[componentName];

  // コンポーネントが見つからない場合、エラーメッセージを表示
  if (!Component) {
    return <div className="text-red-600">コンポーネントが見つかりません: {componentName}</div>;
  }

  // コンポーネントが見つかった場合、Suspenseでラップして遅延ロードを実現
  // LoadingSpinnerをフォールバックとして使用し、コンポーネントのロード中に表示
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
};
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-700"></div>
  </div>
);

export const sidebarComponents = {
  'AIマネジメント': [
    { name: 'AILearningStatus', displayName: 'AI学習状況', icon: <Zap size={18} /> },
    { name: 'CloudInfrastructure', displayName: 'クラウドインフラ', icon: <Settings size={18} /> },
    { name: 'ProgressStatus', displayName: '進捗状況', icon: <BarChart2 size={18} /> }
  ],
  'アプリケーション': [
    { name: 'Development', displayName: '開発環境', icon: <Code size={18} /> },
    { name: 'Production', displayName: '本番環境', icon: <Server size={18} /> },
    { name: 'Staging', displayName: 'ステージング環境', icon: <Activity size={18} /> }
  ],
  '現状分析': [
    { name: 'CompetitiveAnalysis', displayName: '競合分析', icon: <TrendingUp size={18} /> },
    { name: 'DataFlow', displayName: 'データフロー', icon: <GitBranch size={18} /> },
    { name: 'KPIDashboard', displayName: 'KPIダッシュボード', icon: <BarChart2 size={18} /> },
    { name: 'SalesRevenueTrend', displayName: '売上トレンド', icon: <TrendingUp size={18} /> },
    { name: 'SystemFlow', displayName: 'システムフロー', icon: <GitBranch size={18} /> }
  ],
  'マーケティング': [
    { name: 'LandingPage', displayName: 'ランディングページ', icon: <Monitor size={18} /> },
    { name: 'MarketingFunnel', displayName: 'マーケティングファネル', icon: <Users size={18} /> },
    { name: 'Website', displayName: 'ウェブサイト', icon: <Monitor size={18} /> }
  ],
  '内部システム': [
    { name: 'Chat', displayName: 'チャット', icon: <MessageCircle size={18} /> },
    { name: 'Monitoring', displayName: '監視', icon: <Activity size={18} /> },
    { name: 'Wiki', displayName: 'Wiki', icon: <Book size={18} /> }
  ],
  'セキュリティ': [
    { name: 'SecurityAudit', displayName: 'セキュリティ監査', icon: <Shield size={18} /> },
    { name: 'SecurityEnforcement', displayName: 'セキュリティ強化', icon: <Shield size={18} /> },
    { name: 'SecurityLogs', displayName: 'セキュリティログ', icon: <AlertTriangle size={18} /> },
    { name: 'SecurityMonitor', displayName: 'セキュリティモニタリング', icon: <Activity size={18} /> },
  ],
  'チャット': [
    { name: 'ChatWindow', displayName: 'チャットウィンドウ', icon: <MessageCircle size={18} /> }
  ]
};

export const Sidebar = ({ onSelectComponent }) => {
  return (
    <div className="bg-green-800 text-white w-64 min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-6">抹茶カフェ管理システム</h1>
      {Object.entries(sidebarComponents).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h2 className="text-lg font-medium mb-2">{category}</h2>
          <ul>
            {items.map((item) => (
              <li key={item.name} className="mb-2">
                <button
                  onClick={() => onSelectComponent(item.name)}
                  className="flex items-center w-full text-left px-2 py-1 rounded hover:bg-green-700 transition-colors duration-200"
                >
                  {item.icon}
                  <span className="ml-2">{item.displayName}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export const MainContent = ({ selectedComponent }) => {
  return (
    <div className="flex-grow p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-green-800">
          {sidebarComponents[Object.keys(sidebarComponents).find(category => 
            sidebarComponents[category].some(item => item.name === selectedComponent)
          )]?.find(item => item.name === selectedComponent)?.displayName || 'コンポーネントを選択してください'}
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <DynamicComponent componentName={selectedComponent} />
        </div>
      </div>
    </div>
  );
};

export default DynamicComponent;