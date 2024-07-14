import React, { useState } from 'react';
import { 
  Menu, X, ShoppingBag, Clipboard, BarChart, Users, Calendar, BookOpen, 
  DollarSign, Heart, Settings
} from 'lucide-react';
import DynamicComponent from './DynamicComponent';

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarComponents = {
    '在庫管理': [
      { name: 'StockManagement', displayName: '在庫管理', icon: <ShoppingBag size={18} /> },
      { name: 'IngredientTracking', displayName: '原材料追跡', icon: <Clipboard size={18} /> },
      { name: 'SeasonalPlanning', displayName: '季節計画', icon: <Calendar size={18} /> }
    ],
    '製造': [
      { name: 'RecipeManagement', displayName: 'レシピ管理', icon: <BookOpen size={18} /> },
      { name: 'QualityControl', displayName: '品質管理', icon: <Settings size={18} /> },
      { name: 'ProductionSchedule', displayName: '生産スケジュール', icon: <Calendar size={18} /> }
    ],
    '販売': [
      { name: 'POSSystem', displayName: 'POSシステム', icon: <ShoppingBag size={18} /> },
      { name: 'CustomerManagement', displayName: '顧客管理', icon: <Users size={18} /> },
      { name: 'LoyaltyProgram', displayName: 'ロイヤリティプログラム', icon: <Heart size={18} /> },
      { name: 'SalesAnalytics', displayName: '売上分析', icon: <BarChart size={18} /> }
    ],
    '財務': [
      { name: 'Accounting', displayName: '会計', icon: <DollarSign size={18} /> },
      { name: 'Budgeting', displayName: '予算管理', icon: <BarChart size={18} /> },
      { name: 'FinancialReporting', displayName: '財務報告', icon: <Clipboard size={18} /> }
    ]
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F3EAD3]">
      {/* ヘッダー */}
      <header className="bg-[#006400] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold font-yuji">菓匠 鈴乃家</h1>
          <button onClick={toggleSidebar} className="md:hidden">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="flex-grow flex">
        {/* サイドバー */}
        <aside className={`bg-[#006400] text-white w-64 p-4 shadow-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static h-full md:h-auto z-10`}>
          <nav>
            {Object.entries(sidebarComponents).map(([category, items]) => (
              <div key={category} className="mb-4">
                <h2 className="text-lg font-semibold mb-2 font-yuji">{category}</h2>
                <ul>
                  {items.map((item) => (
                    <li key={item.name} className="mb-2">
                      <button
                        onClick={() => setSelectedComponent(item.name)}
                        className="flex items-center w-full p-2 rounded hover:bg-[#007500] transition-colors duration-200"
                      >
                        {item.icon}
                        <span className="ml-2 font-yuji">{item.displayName}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* メインコンテンツエリア */}
        <main className="flex-grow p-4 md:p-8">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            {selectedComponent ? (
              <DynamicComponent componentName={selectedComponent} />
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 font-yuji text-[#4A2311]">和菓子管理システムへようこそ</h2>
                <p className="text-[#4A2311]">左側のメニューから機能を選択してください。</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* フッター */}
      <footer className="bg-[#006400] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p className="font-yuji">&copy; 2023 菓匠 鈴乃家. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;