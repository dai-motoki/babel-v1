import React, { useState } from 'react';
import { Laptop, RefreshCw, HardDrive, Search, Grid, BarChart2, Eye, Users, Shield, FileText, DollarSign, Bell } from 'lucide-react';
import DynamicComponent from './DynamicComponent';

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const sidebarComponents = {
    'デバイス管理': [
      { name: 'DeviceInventory', displayName: 'デバイス一覧', icon: <Laptop size={18} /> },
      { name: 'DeviceLifecycle', displayName: 'ライフサイクル管理', icon: <RefreshCw size={18} /> },
      { name: 'HardwareSoftwareInfo', displayName: 'ハードウェア/ソフトウェア情報', icon: <HardDrive size={18} /> },
      { name: 'AutomaticDeviceDetection', displayName: '自動デバイス検出', icon: <Search size={18} /> }
    ],
    'SaaS管理': [
      { name: 'SaaSInventory', displayName: 'SaaS一覧', icon: <Grid size={18} /> },
      { name: 'UsageAnalytics', displayName: '使用状況分析', icon: <BarChart2 size={18} /> },
      { name: 'ShadowITDetection', displayName: 'シャドーIT検出', icon: <Eye size={18} /> },
      { name: 'AccountLifecycleManagement', displayName: 'アカウントライフサイクル管理', icon: <Users size={18} /> }
    ],
    'セキュリティ': [
      { name: 'SecurityPolicyEnforcement', displayName: 'セキュリティポリシー適用', icon: <Shield size={18} /> },
      { name: 'AccessAudit', displayName: 'アクセス監査', icon: <FileText size={18} /> },
      { name: 'ThreatDetection', displayName: '脅威検出', icon: <Bell size={18} /> },
      { name: 'ComplianceReporting', displayName: 'コンプライアンスレポート', icon: <FileText size={18} /> }
    ],
    'コスト最適化': [
      { name: 'LicenseUsageAnalysis', displayName: 'ライセンス使用分析', icon: <BarChart2 size={18} /> },
      { name: 'UnusedAccountDetection', displayName: '未使用アカウント検出', icon: <Search size={18} /> },
      { name: 'CostReductionSuggestions', displayName: 'コスト削減提案', icon: <DollarSign size={18} /> },
      { name: 'BudgetManagement', displayName: '予算管理', icon: <DollarSign size={18} /> }
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-indigo-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">デジタル職人</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-indigo-200">ダッシュボード</a></li>
              <li><a href="#" className="hover:text-indigo-200">設定</a></li>
              <li><a href="#" className="hover:text-indigo-200">ヘルプ</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="flex flex-1">
        {/* サイドバー */}
        <aside className="w-64 bg-white shadow-md overflow-y-auto">
          <nav className="p-4">
            {Object.entries(sidebarComponents).map(([category, items]) => (
              <div key={category} className="mb-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">{category}</h2>
                <ul>
                  {items.map((item) => (
                    <li key={item.name} className="mb-2">
                      <button
                        onClick={() => setSelectedComponent(item.name)}
                        className="flex items-center w-full p-2 rounded-md hover:bg-indigo-100 transition-colors duration-200"
                      >
                        {item.icon}
                        <span className="ml-2 text-sm">{item.displayName}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* メインコンテンツエリア */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            {selectedComponent ? (
              <DynamicComponent componentName={selectedComponent} />
            ) : (
              <div className="text-center text-gray-500">
                <p className="text-2xl mb-4">コンポーネントを選択してください</p>
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">🖥️</span>
                </div>
                <p>左側のメニューからコンポーネントを選択すると、ここに表示されます。</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* フッター */}
      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 デジタル職人. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;