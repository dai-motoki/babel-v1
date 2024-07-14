import React, { useState } from 'react';
import { 
  Home, ShoppingBag, Clipboard, Users, PieChart, Book, DollarSign, 
  Feather, Menu, X, ChevronDown, ChevronRight
} from 'lucide-react';
import DynamicComponent from './DynamicComponent';

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState({});

  const sidebarComponents = {
    '在庫管理': [
      { name: 'StockManagement', displayName: '在庫管理', icon: <ShoppingBag size={18} /> },
      { name: 'IngredientTracking', displayName: '原材料追跡', icon: <Clipboard size={18} /> },
      { name: 'SeasonalPlanning', displayName: '季節計画', icon: <PieChart size={18} /> },
    ],
    '製造': [
      { name: 'RecipeManagement', displayName: 'レシピ管理', icon: <Book size={18} /> },
      { name: 'QualityControl', displayName: '品質管理', icon: <Clipboard size={18} /> },
      { name: 'ProductionSchedule', displayName: '生産スケジュール', icon: <Clipboard size={18} /> },
    ],
    '販売': [
      { name: 'POSSystem', displayName: 'POSシステム', icon: <DollarSign size={18} /> },
      { name: 'CustomerManagement', displayName: '顧客管理', icon: <Users size={18} /> },
      { name: 'LoyaltyProgram', displayName: 'ロイヤリティプログラム', icon: <Users size={18} /> },
      { name: 'SalesAnalytics', displayName: '売上分析', icon: <PieChart size={18} /> },
    ],
    '伝統': [
      { name: 'CulturalCalendar', displayName: '文化カレンダー', icon: <Feather size={18} /> },
      { name: 'ArtisanTechniques', displayName: '職人技', icon: <Feather size={18} /> },
      { name: 'HistoricalArchive', displayName: '歴史アーカイブ', icon: <Book size={18} /> },
      { name: 'SeasonalCustoms', displayName: '季節の習慣', icon: <PieChart size={18} /> },
    ],
  };

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const renderSidebarItem = (item, category) => (
    <li key={item.name} className="mb-2">
      <button
        onClick={() => setSelectedComponent(item.name)}
        className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 flex items-center
          ${selectedComponent === item.name
            ? 'bg-green-100 text-green-800'
            : 'hover:bg-green-50 text-gray-700 hover:text-green-700'}`}
      >
        {item.icon}
        <span className="ml-2">{item.displayName}</span>
      </button>
    </li>
  );

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* ヘッダー */}
      <header className="bg-green-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">菓匠 鈴乃家</h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* サイドバー */}
        <aside
          className={`bg-white w-64 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static absolute inset-y-0 left-0 z-30 shadow-lg md:shadow-none`}
        >
          <nav className="p-4">
            <ul>
              {Object.entries(sidebarComponents).map(([category, items]) => (
                <li key={category} className="mb-4">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    <span className="font-medium">{category}</span>
                    {openCategories[category] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  {openCategories[category] && (
                    <ul className="mt-2 ml-4">
                      {items.map(item => renderSidebarItem(item, category))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 p-6 overflow-y-auto bg-amber-50">
          <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              {selectedComponent ? (
                <DynamicComponent componentName={selectedComponent} />
              ) : (
                <div className="text-center py-12">
                  <Home size={48} className="mx-auto text-green-800 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">ようこそ、菓匠 鈴乃家へ</h2>
                  <p className="text-gray-600">左側のメニューから項目を選択してください。</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* フッター */}
      <footer className="bg-green-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 菓匠 鈴乃家 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;