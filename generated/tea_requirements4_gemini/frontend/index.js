// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AILearningStatus, CloudInfrastructure, ProgressStatus } from './components/AIManagement'; // 例: AIManagementコンポーネント
import './styles.css'; // グローバルスタイル

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen">
        {/* ヘッダー */}
        <header className="bg-green-600 py-4 px-6 flex items-center justify-between">
          <a href="/" className="text-white text-2xl font-bold">
            抹茶カフェ
          </a>
          {/* ナビゲーションメニュー（仮） */}
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-white hover:text-green-200">
                  ホーム
                </a>
              </li>
              <li>
                <a href="/products" className="text-white hover:text-green-200">
                  商品一覧
                </a>
              </li>
            </ul>
          </nav>
          {/* ユーザーアカウントアイコン（仮） */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 19.344A7.5 7.5 0 018.894 2.5L11.223 6.677 19.894 2.5A8.121 8.121 0 0121 8.894v6.677a8.121 8.121 0 01-2.106 5.854z"
              />
            </svg>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="container mx-auto py-8 px-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            {/* AIManagementのルート */}
            <Route path="/ai-management/learning-status" element={<AILearningStatus />} />
            <Route path="/ai-management/cloud-infrastructure" element={<CloudInfrastructure />} />
            <Route path="/ai-management/progress-status" element={<ProgressStatus />} />
          </Routes>
        </main>

        {/* フッター */}
        <footer className="bg-gray-800 py-4 px-6 text-center text-white">
          &copy; {new Date().getFullYear()} 抹茶カフェ
        </footer>
      </div>
    </BrowserRouter>
  );
};

// ホームページコンポーネント（仮）
const HomePage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">ようこそ、抹茶カフェへ</h1>
      <p className="text-lg">
        ここでは、最高の抹茶体験を提供します。私たちの厳選された商品は、お客様に喜びと満足をもたらすでしょう。
      </p>
    </div>
  );
};

// 商品一覧ページコンポーネント（仮）
const ProductsPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">商品一覧</h1>
      {/* 商品カードなどをここに配置 */}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// // components/AIManagement/AILearningStatus.js
// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const data = [
//   { name: '1月', 正解率: 0.45, 損失関数: 0.8 },
//   { name: '2月', 正解率: 0.6, 損失関数: 0.6 },
//   { name: '3月', 正解率: 0.75, 損失関数: 0.4 },
//   { name: '4月', 正解率: 0.82, 損失関数: 0.3 },
//   { name: '5月', 正解率: 0.9, 損失関数: 0.2 },
// ];

// const AILearningStatus = () => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h2 className="text-xl font-bold mb-4">AI学習状況</h2>
//       <LineChart width={600} height={300} data={data}>
//         <XAxis dataKey="name" />
//         <YAxis />
//         <CartesianGrid stroke="#f5f5f5" />
//         <Line type="monotone" dataKey="正解率" stroke="#8884d8" />
//         <Line type="monotone" dataKey="損失関数" stroke="#82ca9d" />
//         <Tooltip />
//         <Legend />
//       </LineChart>
//     </div>
//   );
// };

// export default AILearningStatus;