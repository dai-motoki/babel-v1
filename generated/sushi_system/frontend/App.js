import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Menu, X, User, ShoppingCart, Sun, Moon, ChevronDown, Fish, Zap, Settings, BarChart2, Cloud, Utensils, RefreshCw, GitBranch, TrendingUp, FileText, Users, Share2, Calendar, UserCheck, Award, CheckCircle, Book, Clock, Package, List, DollarSign, PieChart, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicComponent = lazy(() => import('./DynamicComponent'));

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentSeason, setCurrentSeason] = useState('春');
  const [popularItems, setPopularItems] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    // 季節に応じてポピュラーアイテムを更新
    const seasons = ['春', '夏', '秋', '冬'];
    const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];
    setCurrentSeason(randomSeason);

    const seasonalItems = {
      '春': ['桜鯛', '新子', 'たけのこ'],
      '夏': ['穴子', '生しらす', 'うなぎ'],
      '秋': ['秋刀魚', '松茸', '秋鮭'],
      '冬': ['寒ブリ', 'ふぐ', '牡蠣'],
    };
    setPopularItems(seasonalItems[randomSeason]);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const sidebarComponents = {
    'ホーム': [
      { name: 'Home', displayName: 'ホーム', icon: <Home size={18} /> }
    ],
    'AIマネジメント': [
      { name: 'OceanCurrentPrediction', displayName: '海流予測', icon: <Zap size={18} /> },
      { name: 'WeatherDataAnalysis', displayName: '気象データ分析', icon: <Cloud size={18} /> },
      { name: 'DailyMenuRecommendation', displayName: '日替わりメニュー推薦', icon: <Utensils size={18} /> },
      { name: 'ProductUpdateSuggestion', displayName: '商品更新提案', icon: <RefreshCw size={18} /> }
    ],
    '分析': [
      { name: 'FishCatchPrediction', displayName: '漁獲量予測', icon: <Fish size={18} /> },
      { name: 'ConveyorBeltOptimization', displayName: '回転レーン最適化', icon: <GitBranch size={18} /> },
      { name: 'PopularItemTrends', displayName: '人気商品トレンド', icon: <TrendingUp size={18} /> },
      { name: 'MenuOptimization', displayName: 'メニュー最適化', icon: <FileText size={18} /> }
    ],
    'マーケティング': [
      { name: 'CompetitorAnalysis', displayName: '競合分析', icon: <Users size={18} /> },
      { name: 'SocialMediaIntegration', displayName: 'SNS連携', icon: <Share2 size={18} /> },
      { name: 'EventPlanner', displayName: 'イベント企画', icon: <Calendar size={18} /> }
    ],
    '販売': [
      { name: 'POSSystem', displayName: 'POSシステム', icon: <ShoppingCart size={18} /> },
      { name: 'CustomerManagement', displayName: '顧客管理', icon: <UserCheck size={18} /> },
      { name: 'LoyaltyProgram', displayName: 'ポイントプログラム', icon: <Award size={18} /> },
      { name: 'SalesAnalytics', displayName: '売上分析', icon: <BarChart2 size={18} /> }
    ],
    '製造': [
      { name: 'QualityControl', displayName: '品質管理', icon: <CheckCircle size={18} /> },
      { name: 'RecipeManagement', displayName: 'レシピ管理', icon: <Book size={18} /> },
      { name: 'ProductionSchedule', displayName: '製造スケジュール', icon: <Clock size={18} /> }
    ],
    '在庫管理': [
      { name: 'StockManagement', displayName: '在庫管理', icon: <Package size={18} /> },
      { name: 'IngredientTracking', displayName: '食材トラッキング', icon: <List size={18} /> },
      { name: 'SeasonalPlanning', displayName: '季節計画', icon: <Sun size={18} /> }
    ],
    '財務': [
      { name: 'Accounting', displayName: '会計', icon: <DollarSign size={18} /> },
      { name: 'Budgeting', displayName: '予算管理', icon: <PieChart size={18} /> },
      // { name: 'FinancialReporting', displayName: '財務報告', icon: <FileText size={18} /> }
    ]
  };

  return (
    <div className={`min-h-screen bg-gray-100 ${isDarkMode ? 'dark' : ''}`}>
      <header className="bg-indigo-600 text-white shadow-lg">
        {/* ヘッダーの内容 */}
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="md:hidden bg-white text-gray-800 shadow-lg"
          >
            {/* モバイルメニューの内容 */}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-8">
        <div className="flex">
          {/* サイドバー */}
          <div className="w-64 mr-8 overflow-y-auto h-screen sticky top-0 bg-white shadow-lg rounded-lg p-4">
            {Object.entries(sidebarComponents).map(([category, components]) => (
              <div key={category} className="mb-6">
                <h2 className="text-xl font-bold mb-4 text-indigo-600">{category}</h2>
                <ul>
                  {components.map((component) => (
                    <li key={component.name} className="mb-2">
                      <button
                        onClick={() => setSelectedComponent(component.name)}
                        className="flex items-center text-left w-full p-2 rounded hover:bg-indigo-100 hover:text-indigo-600 transition duration-300"
                      >
                        {component.icon}
                        <span className="ml-2">{component.displayName}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 動的コンポーネント表示エリア */}
          <div className="flex-grow bg-white p-6 rounded-lg shadow-lg">
            <Suspense fallback={<div>読み込み中...</div>}>
              {selectedComponent ? (
                <DynamicComponent componentName={selectedComponent} />
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {Object.entries(sidebarComponents).map(([category, components]) => (
                    <div key={category} className="mb-8">
                      <h2 className="text-2xl font-bold mb-4 text-indigo-600">{category}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {components.map((component) => (
                          <div key={component.name} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer" onClick={() => setSelectedComponent(component.name)}>
                            <div className="flex items-center justify-center mb-4 text-indigo-600">
                              {component.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-center text-gray-800">{component.displayName}</h3>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </main>

      <footer className="bg-indigo-600 text-white mt-12">
        {/* フッターの内容 */}
      </footer>
    </div>
  );
};

export default App;
