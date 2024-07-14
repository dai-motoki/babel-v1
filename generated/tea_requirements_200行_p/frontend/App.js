import React, { useState } from 'react';
import { Zap, Settings, BarChart2, Code, Server, Activity, Layers, Users, Shield, MessageSquare, Book, Monitor } from 'lucide-react';

// DynamicComponent for lazy loading
const DynamicComponent = React.lazy(() => import('./DynamicComponent'));

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const sidebarComponents = {
    'AIマネジメント': [
      { name: 'AILearningStatus', displayName: 'AI学習状況', icon: <Zap size={18} /> },
      { name: 'CloudInfrastructure', displayName: 'クラウドインフラ', icon: <Settings size={18} /> },
      { name: 'ProgressStatus', displayName: '進捗状況', icon: <BarChart2 size={18} /> }
    ],
    'アプリケーション': [
      { name: 'Development', displayName: '開発環境', icon: <Code size={18} /> },
      { name: 'Production', displayName: '本番環境', icon: <Server size={18} /> },
      { name: 'Staging', displayName: 'ステージング環境', icon: <Layers size={18} /> }
    ],
    '現状分析': [
      { name: 'CompetitiveAnalysis', displayName: '競合分析', icon: <Activity size={18} /> },
      { name: 'DataFlow', displayName: 'データフロー', icon: <Layers size={18} /> },
      { name: 'KPIDashboard', displayName: 'KPIダッシュボード', icon: <BarChart2 size={18} /> },
      { name: 'SalesRevenueTrend', displayName: '売上トレンド', icon: <BarChart2 size={18} /> },
      { name: 'SystemFlow', displayName: 'システムフロー', icon: <Layers size={18} /> }
    ],
    'マーケティング': [
      { name: 'LandingPage', displayName: 'ランディングページ', icon: <Monitor size={18} /> },
      { name: 'MarketingFunnel', displayName: 'マーケティングファネル', icon: <Layers size={18} /> },
      { name: 'Website', displayName: 'ウェブサイト', icon: <Monitor size={18} /> }
    ],
    'チーム': [
      { name: 'ChatMessage', displayName: 'チャットメッセージ', icon: <MessageSquare size={18} /> }
    ],
    '内部システム': [
      { name: 'Chat', displayName: 'チャット', icon: <MessageSquare size={18} /> },
      { name: 'Monitoring', displayName: 'モニタリング', icon: <Activity size={18} /> },
      { name: 'Wiki', displayName: 'Wiki', icon: <Book size={18} /> }
    ],
    'セキュリティ': [
      { name: 'SecurityAudit', displayName: 'セキュリティ監査', icon: <Shield size={18} /> },
      { name: 'SecurityEnforcement', displayName: 'セキュリティ強化', icon: <Shield size={18} /> },
      { name: 'SecurityLogs', displayName: 'セキュリティログ', icon: <Shield size={18} /> },
      { name: 'SecurityMonitor', displayName: 'セキュリティモニタリング', icon: <Shield size={18} /> }
    ]
  };

  const handleComponentSelect = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white overflow-y-auto">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">抹茶カフェ システム</h1>
          {Object.entries(sidebarComponents).map(([category, items]) => (
            <div key={category} className="mb-4">
              <h2 className="text-lg font-semibold mb-2">{category}</h2>
              <ul>
                {items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center cursor-pointer hover:bg-green-700 p-2 rounded"
                    onClick={() => handleComponentSelect(item.name)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.displayName}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <React.Suspense fallback={<div>Loading...</div>}>
          {selectedComponent ? (
            <DynamicComponent componentName={selectedComponent} />
          ) : (
            <div className="text-center text-2xl text-green-800">
              左のメニューからコンポーネントを選択してください
            </div>
          )}
        </React.Suspense>
      </div>
    </div>
  );
};

export default App;