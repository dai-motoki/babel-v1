import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Camera, Home, ShoppingBag, BarChart2, Settings, Users, Coffee, Zap, Code, Server, GitBranch, TrendingUp, Database, DollarSign, Layout, Filter, Globe, MessageCircle } from 'lucide-react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

// 動的インポートを使用してコンポーネントを遅延ロード
const DynamicComponent = lazy(() => import('./DynamicComponent'));

// DataHandlerのモック（実際の実装ではAPIクライアントを使用）
const DataHandler = {
  fetchData: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { name: '1月', sales: 4000, customers: 2400, profit: 2400 },
          { name: '2月', sales: 3000, customers: 1398, profit: 2210 },
          { name: '3月', sales: 5000, customers: 9800, profit: 2290 },
          { name: '4月', sales: 4500, customers: 3908, profit: 2000 },
          { name: '5月', sales: 6000, customers: 4800, profit: 2181 },
          { name: '6月', sales: 5500, customers: 3800, profit: 2500 },
        ]);
      }, 1000);
    });
  }
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      setIsLoading(true);
      try {
        const data = await DataHandler.fetchData();
        setSalesData(data);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSalesData();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'products':
        return <ProductCatalog />;
      case 'dashboard':
        return <KPIDashboard salesData={salesData} isLoading={isLoading} />;
      default:
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentType={currentPage} />
          </Suspense>
        );
    }
  };

  const sidebarComponents = {
    'AIマネジメント': [
      { name: 'AILearningStatus', displayName: 'AI学習状況', icon: <Zap size={18} /> },
      { name: 'CloudInfrastructure', displayName: 'クラウドインフラ', icon: <Settings size={18} /> },
      { name: 'ProgressStatus', displayName: '進捗状況', icon: <BarChart2 size={18} /> }
    ],
    'アプリケーション': [
      { name: 'Development', displayName: '開発', icon: <Code size={18} /> },
      { name: 'Production', displayName: '本番環境', icon: <Server size={18} /> },
      { name: 'Staging', displayName: 'ステージング', icon: <GitBranch size={18} /> }
    ],
    '現状分析': [
      { name: 'CompetitiveAnalysis', displayName: '競合分析', icon: <TrendingUp size={18} /> },
      { name: 'DataFlow', displayName: 'データフロー', icon: <Database size={18} /> },
      { name: 'KPIDashboard', displayName: 'KPIダッシュボード', icon: <BarChart2 size={18} /> },
      { name: 'SalesRevenueTrend', displayName: '売上トレンド', icon: <DollarSign size={18} /> },
      { name: 'SystemFlow', displayName: 'システムフロー', icon: <GitBranch size={18} /> }
    ],
    'マーケティング': [
      { name: 'LandingPage', displayName: 'ランディングページ', icon: <Layout size={18} /> },
      { name: 'MarketingFunnel', displayName: 'マーケティングファネル', icon: <Filter size={18} /> },
      { name: 'Website', displayName: 'ウェブサイト', icon: <Globe size={18} /> }
    ],
    'チーム': [
      { name: 'ChatMessage', displayName: 'チャットメッセージ', icon: <MessageCircle size={18} /> }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex">
      {/* サイドバー */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white shadow-lg"
      >
        <nav className="p-4">
          {Object.entries(sidebarComponents).map(([category, components]) => (
            <div key={category} className="mb-6">
              <h3 className="font-bold text-gray-700 mb-3 text-lg">{category}</h3>
              <ul className="space-y-2">
                {components.map(({ name, displayName, icon }) => (
                  <li key={name}>
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-100 rounded-lg transition duration-300 ease-in-out flex items-center"
                      onClick={() => setCurrentPage(name)}
                    >
                      {icon}
                      <span className="ml-2">{displayName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </motion.div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-6 py-4">
            <ul className="flex space-x-6">
              <li><NavButton icon={<Home size={18} />} label="ホーム" onClick={() => setCurrentPage('home')} /></li>
              <li><NavButton icon={<ShoppingBag size={18} />} label="商品" onClick={() => setCurrentPage('products')} /></li>
              <li><NavButton icon={<BarChart2 size={18} />} label="ダッシュボード" onClick={() => setCurrentPage('dashboard')} /></li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto px-6 py-8 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
};

const NavButton = ({ icon, label, onClick }) => (
  <button
    className="flex items-center text-gray-600 hover:text-green-600 transition duration-300 ease-in-out"
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

const LandingPage = () => {
  const animationProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.div style={animationProps} className="text-center">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">おちゃのHPv3へようこそ</h1>
      <p className="mb-8 text-xl text-gray-600">最高品質のお茶と革新的なサービスをお届けします</p>
      <div className="mb-8">
        <Coffee color="green" size={64} className="mx-auto animate-bounce" />
      </div>
      <div className="mt-8 bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-lg shadow-lg" role="alert">
        <h2 className="font-bold text-2xl mb-2">新製品発売！</h2>
        <p className="text-lg">究極のリラックスを体験できる最新プレミアムグリーンティーブレンドが登場。</p>
        <button className="mt-4 bg-white text-green-600 font-bold py-2 px-4 rounded-full hover:bg-green-100 transition duration-300">
          詳細を見る
        </button>
      </div>
    </animated.div>
  );
};

const KPIDashboard = ({ salesData, isLoading }) => {
  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">KPIダッシュボード</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <KPICard title="総売上" value={`¥${salesData.reduce((sum, data) => sum + data.sales, 0).toLocaleString()}`} icon={<DollarSign size={24} />} />
        <KPICard title="顧客数" value={salesData.reduce((sum, data) => sum + data.customers, 0).toLocaleString()} icon={<Users size={24} />} />
        <KPICard title="利益" value={`¥${salesData.reduce((sum, data) => sum + data.profit, 0).toLocaleString()}`} icon={<TrendingUp size={24} />} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">売上トレンド</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      {icon}
    </div>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto px-6 text-center">
      <p>&copy; 2023 おちゃのHP. All rights reserved.</p>
    </div>
  </footer>
);

// 新しく追加した商品カタログコンポーネント
const ProductCatalog = () => {
  const products = [
    { id: 1, name: '煎茶', price: 1000, description: '爽やかな香りと深い味わい' },
    { id: 2, name: '玉露', price: 2000, description: '上品な甘みと濃厚な旨味' },
    { id: 3, name: 'ほうじ茶', price: 800, description: '香ばしい香りとまろやかな味わい' },
    { id: 4, name: '抹茶', price: 1500, description: '濃厚な味わいと鮮やかな緑色' },
    { id: 5, name: '玄米茶', price: 700, description: '香ばしさと緑茶のバランスが絶妙' },
    { id: 6, name: '烏龍茶', price: 1200, description: '華やかな香りと爽やかな後味' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">商品カタログ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold text-green-600">¥{product.price.toLocaleString()}</p>
            <button className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300">
              カートに追加
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;