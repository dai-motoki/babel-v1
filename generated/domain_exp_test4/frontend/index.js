import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { motion } from 'framer-motion';
import { Menu, X, Bell, User, Settings, LogOut } from 'react-feather';

// コンポーネントのインポート
import Dashboard from './components/Dashboard';
import DeviceManagement from './components/DeviceManagement';
import SaaSManagement from './components/SaaSManagement';
import UserManagement from './components/UserManagement';
import CostOptimization from './components/CostOptimization';
import SecurityManagement from './components/SecurityManagement';
import ReportGeneration from './components/ReportGeneration';

// スタイルのインポート
import './index.css';

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const sidebarItems = [
    { name: 'ダッシュボード', icon: 'home', component: Dashboard },
    { name: 'デバイス管理', icon: 'monitor', component: DeviceManagement },
    { name: 'SaaS管理', icon: 'cloud', component: SaaSManagement },
    { name: 'ユーザー管理', icon: 'users', component: UserManagement },
    { name: 'コスト最適化', icon: 'dollar-sign', component: CostOptimization },
    { name: 'セキュリティ管理', icon: 'shield', component: SecurityManagement },
    { name: 'レポート生成', icon: 'file-text', component: ReportGeneration },
  ];

  return (
    <Router>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {/* サイドバー */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">デジタル職人</h1>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X size={24} />
            </button>
          </div>
          <nav className="mt-5">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.name}`}
                className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </a>
            ))}
          </nav>
        </motion.aside>

        {/* メインコンテンツ */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* ヘッダー */}
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                  >
                    <Menu size={24} />
                  </button>
                  <div className="flex-shrink-0 flex items-center">
                    {/* ロゴ代わりの仮のボックス */}
                    <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {theme === 'light' ? '🌙' : '☀️'}
                  </button>
                  <button className="ml-3 p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Bell size={24} />
                  </button>
                  <div className="ml-3 relative">
                    <div>
                      <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <User size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* メインコンテンツエリア */}
          <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/devices" component={DeviceManagement} />
                <Route path="/saas" component={SaaSManagement} />
                <Route path="/users" component={UserManagement} />
                <Route path="/costs" component={CostOptimization} />
                <Route path="/security" component={SecurityManagement} />
                <Route path="/reports" component={ReportGeneration} />
              </Switch>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);