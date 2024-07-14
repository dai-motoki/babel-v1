import React, { useState } from "react";
import { AlertCircle, Code, Database, GitBranch, Terminal, Settings, Users, ShoppingCart, Activity, CheckCircle, RefreshCw, Package, Calendar } from "lucide-react";

const Staging = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "概要", icon: <AlertCircle className="w-4 h-4" /> },
    { id: "deployments", label: "デプロイ", icon: <RefreshCw className="w-4 h-4" /> },
    { id: "changes", label: "変更履歴", icon: <GitBranch className="w-4 h-4" /> },
    { id: "performance", label: "パフォーマンス", icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-6">ステージング環境ダッシュボード</h1>

      <div className="flex items-center p-4 mb-6 bg-yellow-100 text-yellow-700 rounded-lg">
        <AlertCircle className="h-5 w-5 mr-2" />
        <div>
          <h2 className="font-semibold">ステージングモード</h2>
          <p className="text-sm">現在、ステージング環境で作業中です。本番環境へのデプロイ前の最終確認を行ってください。</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex mb-4 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? "border-b-2 border-yellow-500 text-yellow-500"
                  : "text-gray-500 hover:text-yellow-400"
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
          {activeTab === "deployments" && <DeploymentsTab />}
          {activeTab === "changes" && <ChangesTab />}
          {activeTab === "performance" && <PerformanceTab />}
        </div>
      </div>
    </div>
  );
};

const OverviewTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">ステージング環境概要</h2>
    <p className="mb-4">
      おちゃのHPv3のステージング環境へようこそ。この環境は本番環境と同等の設定で、最終的なテストと確認を行うためのものです。
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-semibold mb-2">環境情報</h3>
        <ul className="list-disc list-inside">
          <li>URL: https://staging.ocha-hp.com</li>
          <li>バージョン: v3.2.1</li>
          <li>最終デプロイ: 2023-06-15 14:30:00</li>
          <li>ステータス: 安定</li>
        </ul>
      </div>
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-semibold mb-2">テスト状況</h3>
        <ul className="list-disc list-inside">
          <li>自動テスト: <span className="text-green-600">パス</span></li>
          <li>手動テスト: 進行中</li>
          <li>セキュリティスキャン: <span className="text-green-600">クリア</span></li>
          <li>パフォーマンステスト: <span className="text-yellow-600">要改善</span></li>
        </ul>
      </div>
    </div>
  </div>
);

const DeploymentsTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">デプロイ履歴</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b">デプロイID</th>
            <th className="px-4 py-2 border-b">日時</th>
            <th className="px-4 py-2 border-b">バージョン</th>
            <th className="px-4 py-2 border-b">ステータス</th>
            <th className="px-4 py-2 border-b">デプロイ担当者</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border-b">DEP-001</td>
            <td className="px-4 py-2 border-b">2023-06-15 14:30:00</td>
            <td className="px-4 py-2 border-b">v3.2.1</td>
            <td className="px-4 py-2 border-b"><span className="text-green-600">成功</span></td>
            <td className="px-4 py-2 border-b">山田太郎</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b">DEP-002</td>
            <td className="px-4 py-2 border-b">2023-06-14 10:15:00</td>
            <td className="px-4 py-2 border-b">v3.2.0</td>
            <td className="px-4 py-2 border-b"><span className="text-red-600">失敗</span></td>
            <td className="px-4 py-2 border-b">佐藤花子</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const ChangesTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">変更履歴</h2>
    <ul className="space-y-4">
      <li className="flex items-center bg-green-100 p-3 rounded-md">
        <Package className="w-5 h-5 mr-2 text-green-600" />
        <div>
          <span className="font-medium">商品カタログの更新</span>
          <p className="text-sm text-gray-600">作成者: 山田太郎 / 2023-06-15 13:45:00</p>
        </div>
      </li>
      <li className="flex items-center bg-blue-50 p-3 rounded-md">
        <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
        <div>
          <span className="font-medium">ナビゲーションメニューの修正</span>
          <p className="text-sm text-gray-600">作成者: 佐藤花子 / 2023-06-15 11:20:00</p>
        </div>
      </li>
      <li className="flex items-center bg-yellow-50 p-3 rounded-md">
        <Package className="w-5 h-5 mr-2 text-yellow-600" />
        <div>
          <span className="font-medium">新しいお茶コレクションの追加</span>
          <p className="text-sm text-gray-600">作成者: 鈴木一郎 / 2023-06-14 16:55:00</p>
        </div>
      </li>
    </ul>
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

export default Staging;
