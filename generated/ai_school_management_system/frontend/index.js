import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiHome, FiUsers, FiBook, FiDollarSign, FiBriefcase, FiPieChart, FiSettings } from 'react-icons/fi';

// コンポーネントのインポート
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import StudentManagement from './components/StudentManagement';
import CourseManagement from './components/CourseManagement';
import FinanceManagement from './components/FinanceManagement';
import CareerSupport from './components/CareerSupport';
import Analytics from './components/Analytics';
import Settings from './components/Settings';

// カスタムテーマの定義
const theme = extendTheme({
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      600: '#0284c7',
    },
    accent: {
      100: '#fef3c7',
      500: '#f59e0b',
    },
  },
  fonts: {
    body: '"Noto Sans JP", sans-serif',
    heading: '"Noto Serif JP", serif',
  },
});

// メインアプリケーションコンポーネント
const App = () => {
  const menuItems = [
    { name: 'ダッシュボード', icon: FiHome },
    { name: '生徒管理', icon: FiUsers },
    { name: 'コース管理', icon: FiBook },
    { name: '財務管理', icon: FiDollarSign },
    { name: 'キャリアサポート', icon: FiBriefcase },
    { name: '分析', icon: FiPieChart },
    { name: '設定', icon: FiSettings },
  ];

  return (
    <ChakraProvider theme={theme}>
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// エラーメッセージに関するコメント
// Sidebarコンポーネントのレンダリングメソッドでエラーが発生しています。
// 考えられる原因：
// 1. Sidebarコンポーネントが正しくエクスポートされていない可能性があります。
// 2. インポート文で名前付きインポートとデフォルトインポートが混同されている可能性があります。
// 3. Sidebarコンポーネント内で未定義の要素が使用されている可能性があります。

// 解決策：
// 1. Sidebarコンポーネントのファイルを確認し、正しくエクスポートされていることを確認してください。
// 2. インポート文を確認し、正しい方法でインポートされていることを確認してください。
// 3. Sidebarコンポーネントの実装を確認し、すべての要素が正しく定義されていることを確認してください。
