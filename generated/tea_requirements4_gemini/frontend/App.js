import { useState } from 'react';
import DynamicComponent from './DynamicComponent';

// サイドバーコンポーネントの定義
const sidebarComponents = {
  'AIマネジメント': [
    { name: 'AILearningStatus', displayName: 'AI学習状況' },
    { name: 'CloudInfrastructure', displayName: 'クラウドインフラ' },
    { name: 'ProgressStatus', displayName: '進捗状況' },
  ],
  'アプリケーション': [
    { name: 'Development', displayName: '開発' },
    { name: 'Production', displayName: '本番' },
    { name: 'Staging', displayName: 'ステージング' },
  ],
  '現状分析': [
    { name: 'CompetitiveAnalysis', displayName: '競合分析' },
    { name: 'DataFlow', displayName: 'データフロー' },
    { name: 'KPIDashboard', displayName: 'KPIダッシュボード' },
    { name: 'SalesRevenueTrend', displayName: '売上トレンド' },
    { name: 'SystemFlow', displayName: 'システムフロー' },
  ],
  'マーケティング': [
    { name: 'LandingPage', displayName: 'ランディングページ' },
    { name: 'MarketingFunnel', displayName: 'マーケティングファネル' },
    { name: 'Website', displayName: 'ウェブサイト' },
  ],
  'チーム': [
    { name: 'ChatMessage', displayName: 'チャットメッセージ' },
  ],
  '社内システム': [
    { name: 'chat', displayName: 'チャット' },
    { name: 'monitoring', displayName: '監視' },
    { name: 'wiki', displayName: 'Wiki' },
  ],
  'セキュリティ': [
    { name: 'security_audit', displayName: 'セキュリティ監査' },
    { name: 'security_enforcement', displayName: 'セキュリティ強化' },
    { name: 'security_logs', displayName: 'セキュリティログ' },
    { name: 'security_monitor', displayName: 'セキュリティモニタ' },
  ],
};

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('AILearningStatus');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* サイドバー */}
      <aside className="w-64 bg-green-700 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">抹茶カフェ</h2>
        <ul>
          {Object.entries(sidebarComponents).map(([category, components]) => (
            <li key={category} className="mb-4">
              <h3 className="text-lg font-semibold">{category}</h3>
              <ul className="pl-4">
                {components.map(({ name, displayName }) => (
                  <li
                    key={name}
                    className={`cursor-pointer py-2 hover:bg-green-800 rounded-md flex items-center ${selectedComponent === name ? 'bg-green-800' : ''
                      }`}
                    onClick={() => setSelectedComponent(name)}
                  >
                    <span className="ml-2">{displayName}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 p-6 overflow-y-auto">
        <DynamicComponent componentName={selectedComponent} />
      </main>
    </div>
  );
};

export default App;
