import React, { useState, lazy, Suspense } from 'react';
import { 
  Home, 
  Coffee, 
  ShoppingCart, 
  Users, 
  BarChart2, 
  Shield, 
  Settings,
  Menu,
  X,
  AlertTriangle,
  Loader
} from 'lucide-react';

// 動的にインポートするコンポーネントの定義
const componentMap = {
  AIManagement: {
    AILearningStatus: lazy(() => import('./components/AIManagement/AILearningStatus')),
    CloudInfrastructure: lazy(() => import('./components/AIManagement/CloudInfrastructure')),
    ProgressStatus: lazy(() => import('./components/AIManagement/ProgressStatus')),
  },
  Application: {
    Development: lazy(() => import('./components/Application/Development')),
    Production: lazy(() => import('./components/Application/Production')),
    Staging: lazy(() => import('./components/Application/Staging')),
  },
  CurrentAnalysis: {
    CompetitiveAnalysis: lazy(() => import('./components/CurrentAnalysis/CompetitiveAnalysis')),
    DataFlow: lazy(() => import('./components/CurrentAnalysis/DataFlow')),
    KPIDashboard: lazy(() => import('./components/CurrentAnalysis/KPIDashboard')),
    SalesRevenueTrend: lazy(() => import('./components/CurrentAnalysis/SalesRevenueTrend')),
    SystemFlow: lazy(() => import('./components/CurrentAnalysis/SystemFlow')),
  },
  Marketing: {
    LandingPage: lazy(() => import('./components/Marketing/LandingPage')),
    MarketingFunnel: lazy(() => import('./components/Marketing/MarketingFunnel')),
    Website: lazy(() => import('./components/Marketing/Website')),
  },
  Team: {
    ChatMessage: lazy(() => import('./components/Team/ChatMessage')),
  },
  InternalSystems: {
    Chat: lazy(() => import('./components/InternalSystems/Chat')),
    Monitoring: lazy(() => import('./components/InternalSystems/Monitoring')),
    Wiki: lazy(() => import('./components/InternalSystems/Wiki')),
  },
  Security: {
    SecurityAudit: lazy(() => import('./components/Security/SecurityAudit')),
    SecurityEnforcement: lazy(() => import('./components/Security/SecurityEnforcement')),
    SecurityLogs: lazy(() => import('./components/Security/SecurityLogs')),
    SecurityMonitor: lazy(() => import('./components/Security/SecurityMonitor')),
  },
};

const DynamicComponent = ({ category, componentName }) => {
  const Component = componentMap[category]?.[componentName];

  if (!Component) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-600 flex items-center">
          <AlertTriangle className="mr-2" />
          <span>コンポーネントが見つかりません</span>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <Loader className="animate-spin text-green-700" size={48} />
  </div>
);

const DynamicComponentWrapper = ({ category, componentName }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4">
      <h2 className="text-2xl font-bold mb-4 text-green-800 border-b border-green-200 pb-2">
        {componentName}
      </h2>
      <div className="min-h-[400px]">
        <DynamicComponent category={category} componentName={componentName} />
      </div>
    </div>
  );
};

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState({ category: 'Home', name: 'Home' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarComponents = {
    // 'ホーム': [
    //   { category: 'Home', name: 'Home', displayName: 'ホーム', icon: <Home size={18} /> },
    // ],
    'AI管理': [
      { category: 'AIManagement', name: 'AILearningStatus', displayName: 'AI学習状況', icon: <BarChart2 size={18} /> },
      { category: 'AIManagement', name: 'CloudInfrastructure', displayName: 'クラウドインフラ', icon: <Settings size={18} /> },
      { category: 'AIManagement', name: 'ProgressStatus', displayName: '進捗状況', icon: <BarChart2 size={18} /> },
    ],
    'アプリケーション': [
      { category: 'Application', name: 'Development', displayName: '開発環境', icon: <Coffee size={18} /> },
      { category: 'Application', name: 'Production', displayName: '本番環境', icon: <Coffee size={18} /> },
      { category: 'Application', name: 'Staging', displayName: 'ステージング環境', icon: <Coffee size={18} /> },
    ],
    '現状分析': [
      // { category: 'CurrentAnalysis', name: 'CompetitiveAnalysis', displayName: '競合分析', icon: <BarChart2 size={18} /> },
      { category: 'CurrentAnalysis', name: 'DataFlow', displayName: 'データフロー', icon: <BarChart2 size={18} /> },
      { category: 'CurrentAnalysis', name: 'KPIDashboard', displayName: 'KPIダッシュボード', icon: <BarChart2 size={18} /> },
      { category: 'CurrentAnalysis', name: 'SalesRevenueTrend', displayName: '売上トレンド', icon: <BarChart2 size={18} /> },
      { category: 'CurrentAnalysis', name: 'SystemFlow', displayName: 'システムフロー', icon: <BarChart2 size={18} /> },
    ],
    'マーケティング': [
      { category: 'Marketing', name: 'LandingPage', displayName: 'ランディングページ', icon: <Users size={18} /> },
      { category: 'Marketing', name: 'MarketingFunnel', displayName: 'マーケティングファネル', icon: <Users size={18} /> },
      { category: 'Marketing', name: 'Website', displayName: 'ウェブサイト', icon: <Users size={18} /> },
    ],
    'チーム': [
      { category: 'Team', name: 'ChatMessage', displayName: 'チャットメッセージ', icon: <Users size={18} /> },
    ],
    '内部システム': [
      { category: 'InternalSystems', name: 'Chat', displayName: 'チャット', icon: <Users size={18} /> },
      { category: 'InternalSystems', name: 'Monitoring', displayName: 'モニタリング', icon: <Shield size={18} /> },
      { category: 'InternalSystems', name: 'Wiki', displayName: 'Wiki', icon: <Users size={18} /> },
    ],
    'セキュリティ': [
      { category: 'Security', name: 'SecurityAudit', displayName: 'セキュリティ監査', icon: <Shield size={18} /> },
      { category: 'Security', name: 'SecurityEnforcement', displayName: 'セキュリティ強化', icon: <Shield size={18} /> },
      { category: 'Security', name: 'SecurityLogs', displayName: 'セキュリティログ', icon: <Shield size={18} /> },
      { category: 'Security', name: 'SecurityMonitor', displayName: 'セキュリティモニター', icon: <Shield size={18} /> },
    ],
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderSidebarContent = () => {
    return Object.entries(sidebarComponents).map(([category, items]) => (
      <div key={category} className="mb-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">{category}</h3>
        <ul>
          {items.map((item) => (
            <li key={item.name} className="mb-1">
              <button
                onClick={() => setSelectedComponent({ category: item.category, name: item.name })}
                className={`w-full text-left flex items-center px-2 py-1 rounded-md transition-colors duration-150 ease-in-out
                  ${selectedComponent.name === item.name 
                    ? 'bg-green-700 text-white' 
                    : 'text-gray-300 hover:bg-green-800 hover:text-white'}`}
              >
                {item.icon}
                <span className="ml-2">{item.displayName}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-green-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div className="flex items-center justify-between px-4">
          <h2 className="text-2xl font-semibold">抹茶カフェ</h2>
          <button onClick={toggleSidebar} className="md:hidden">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-10">
          {renderSidebarContent()}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button onClick={toggleSidebar} className="md:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">抹茶カフェ管理システム</h1>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">ようこそ、管理者様</span>
              <img
                className="h-8 w-8 rounded-full"
                src="/api/placeholder/32/32"
                alt="User avatar"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <DynamicComponentWrapper category={selectedComponent.category} componentName={selectedComponent.name} />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-md mt-auto">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © 2023 抹茶カフェ株式会社. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;