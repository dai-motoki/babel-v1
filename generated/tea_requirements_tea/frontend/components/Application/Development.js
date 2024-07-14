import React, { useState } from "react";
import { AlertCircle, Code, Database, GitBranch, Terminal, Settings, Users, ShoppingCart, Activity } from "lucide-react";

const Development = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "概要", icon: <AlertCircle className="w-4 h-4" /> },
    { id: "codebase", label: "コードベース", icon: <Code className="w-4 h-4" /> },
    { id: "database", label: "データベース", icon: <Database className="w-4 h-4" /> },
    { id: "branches", label: "ブランチ", icon: <GitBranch className="w-4 h-4" /> },
    { id: "performance", label: "パフォーマンス", icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-6">開発環境ダッシュボード</h1>

      <div className="flex items-center p-4 mb-6 bg-blue-100 text-blue-700 rounded-lg">
        <AlertCircle className="h-5 w-5 mr-2" />
        <div>
          <h2 className="font-semibold">開発モード</h2>
          <p className="text-sm">現在、開発環境で作業中です。変更を加える際は細心の注意を払ってください。</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex mb-4 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-blue-400"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "codebase" && <CodebaseTab />}
          {activeTab === "database" && <DatabaseTab />}
          {activeTab === "branches" && <BranchesTab />}
          {activeTab === "performance" && <PerformanceTab />}
        </div>
      </div>
    </div>
  );
};

const OverviewTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">開発概要</h2>
    <p className="mb-4">
      おちゃのHPv3の開発環境へようこそ。この環境は最先端のテクノロジーを駆使して、効率的な開発とテストを可能にします。
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-semibold mb-2">技術スタック</h3>
        <ul className="list-disc list-inside">
          <li>Node.js: 16.14.2 (LTS)</li>
          <li>React: 18.2.0</li>
          <li>Next.js: 12.3.1</li>
          <li>TypeScript: 4.8.4</li>
        </ul>
      </div>
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-semibold mb-2">インフラストラクチャ</h3>
        <ul className="list-disc list-inside">
          <li>データベース: PostgreSQL 14</li>
          <li>キャッシュ: Redis 6.2</li>
          <li>APIエンドポイント: https://api-dev.ocha-hp.com</li>
          <li>CI/CD: GitHub Actions</li>
        </ul>
      </div>
    </div>
  </div>
);

const CodebaseTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">コードベース情報</h2>
    <div className="bg-gray-100 p-4 rounded-md mb-4">
      <Terminal className="w-6 h-6 mb-2" />
      <pre className="text-sm overflow-x-auto">
        {`
project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── contexts/
│   │   └── utils/
│   ├── public/
│   ├── tests/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── services/
│   ├── tests/
│   └── package.json
├── shared/
│   ├── types/
│   └── constants/
├── docs/
├── scripts/
└── README.md
        `}
      </pre>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="font-semibold mb-2">コード品質</h3>
        <ul className="list-disc list-inside">
          <li>ESLint: 厳格なルールセット</li>
          <li>Prettier: コードフォーマッター</li>
          <li>Jest: ユニットテストフレームワーク</li>
          <li>Cypress: E2Eテストツール</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">開発ガイドライン</h3>
        <ul className="list-disc list-inside">
          <li>コンポーネント設計: Atomic Design</li>
          <li>状態管理: Redux Toolkit</li>
          <li>スタイリング: Tailwind CSS</li>
          <li>API通信: React Query</li>
        </ul>
      </div>
    </div>
  </div>
);

const DatabaseTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">データベース情報</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b">テーブル名</th>
            <th className="px-4 py-2 border-b">行数</th>
            <th className="px-4 py-2 border-b">サイズ</th>
            <th className="px-4 py-2 border-b">最終更新</th>
            <th className="px-4 py-2 border-b">インデックス</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border-b"><Users className="inline w-4 h-4 mr-1" /> users</td>
            <td className="px-4 py-2 border-b">1,234</td>
            <td className="px-4 py-2 border-b">2.3 MB</td>
            <td className="px-4 py-2 border-b">2023-05-15 10:30:00</td>
            <td className="px-4 py-2 border-b">3</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b"><ShoppingCart className="inline w-4 h-4 mr-1" /> products</td>
            <td className="px-4 py-2 border-b">567</td>
            <td className="px-4 py-2 border-b">1.5 MB</td>
            <td className="px-4 py-2 border-b">2023-05-14 15:45:00</td>
            <td className="px-4 py-2 border-b">2</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b"><ShoppingCart className="inline w-4 h-4 mr-1" /> orders</td>
            <td className="px-4 py-2 border-b">8,901</td>
            <td className="px-4 py-2 border-b">5.7 MB</td>
            <td className="px-4 py-2 border-b">2023-05-15 09:15:00</td>
            <td className="px-4 py-2 border-b">4</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="mt-4">
      <h3 className="font-semibold mb-2">データベース最適化</h3>
      <ul className="list-disc list-inside">
        <li>定期的なVACUUM実行</li>
        <li>クエリパフォーマンスモニタリング</li>
        <li>インデックス使用状況の分析</li>
      </ul>
    </div>
  </div>
);

const BranchesTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Gitブランチ管理</h2>
    <ul className="space-y-4">
      <li className="flex items-center bg-green-100 p-3 rounded-md">
        <GitBranch className="w-5 h-5 mr-2 text-green-600" />
        <div>
          <span className="font-medium">main</span>
          <span className="ml-2 text-sm text-gray-500">(現在のブランチ)</span>
          <p className="text-sm text-gray-600">最終コミット: 2時間前</p>
        </div>
      </li>
      <li className="flex items-center bg-blue-50 p-3 rounded-md">
        <GitBranch className="w-5 h-5 mr-2 text-blue-600" />
        <div>
          <span className="font-medium">feature/new-product-page</span>
          <p className="text-sm text-gray-600">作成者: 田中太郎 / 3日前</p>
        </div>
      </li>
      <li className="flex items-center bg-yellow-50 p-3 rounded-md">
        <GitBranch className="w-5 h-5 mr-2 text-yellow-600" />
        <div>
          <span className="font-medium">bugfix/login-issue</span>
          <p className="text-sm text-gray-600">作成者: 鈴木花子 / 1日前</p>
        </div>
      </li>
    </ul>
    <div className="mt-4">
      <h3 className="font-semibold mb-2">ブランチ戦略</h3>
      <p className="text-sm text-gray-700">
        GitFlow戦略を採用し、feature/、bugfix/、release/のプレフィックスを使用しています。
        Pull Requestsは最低1名のレビューを必要とし、CIテストをパスする必要があります。
      </p>
    </div>
  </div>
);

const PerformanceTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">パフォーマンス分析</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">フロントエンド</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>First Contentful Paint</span>
            <span className="font-medium text-green-600">1.2s</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Time to Interactive</span>
            <span className="font-medium text-green-600">2.5s</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Largest Contentful Paint</span>
            <span className="font-medium text-yellow-600">3.8s</span>
          </li>
        </ul>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">バックエンド</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>平均レスポンス時間</span>
            <span className="font-medium text-green-600">120ms</span>
          </li>
          <li className="flex justify-between items-center">
            <span>99パーセンタイル</span>
            <span className="font-medium text-yellow-600">450ms</span>
          </li>
          <li className="flex justify-between items-center">
            <span>エラーレート</span>
            <span className="font-medium text-green-600">0.1%</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="mt-4">
      <h3 className="font-semibold mb-2">最適化推奨事項</h3>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
        <li>画像の最適化とLazy Loading導入</li>
        <li>クリティカルCSSの抽出</li>
        <li>サーバーサイドキャッシングの強化</li>
        <li>データベースクエリの最適化</li>
      </ul>
    </div>
  </div>
);

export default Development;
