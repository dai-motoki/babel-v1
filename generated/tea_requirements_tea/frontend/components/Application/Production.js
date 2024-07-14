import React, { useState } from "react";
import { AlertCircle, Server, Users, Database, Activity, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Production = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "概要", icon: <AlertCircle className="w-4 h-4" /> },
    { id: "servers", label: "サーバー", icon: <Server className="w-4 h-4" /> },
    { id: "users", label: "ユーザー", icon: <Users className="w-4 h-4" /> },
    { id: "database", label: "データベース", icon: <Database className="w-4 h-4" /> },
    { id: "performance", label: "パフォーマンス", icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-6">本番環境ダッシュボード</h1>

      <div className="flex items-center p-4 mb-6 bg-green-100 text-green-700 rounded-lg">
        <CheckCircle className="h-5 w-5 mr-2" />
        <div>
          <h2 className="font-semibold">本番モード</h2>
          <p className="text-sm">現在、本番環境で稼働中です。システムの安定性と性能に注意を払ってください。</p>
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
          {activeTab === "servers" && <ServersTab />}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "database" && <DatabaseTab />}
          {activeTab === "performance" && <PerformanceTab />}
        </div>
      </div>
    </div>
  );
};

const OverviewTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">システム概要</h2>
    <p className="mb-4">
      おちゃのHPv3の本番環境へようこそ。このダッシュボードでは、システムの現在の状態と重要な指標を確認できます。
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-semibold mb-2">システム状態</h3>
        <ul className="list-disc list-inside">
          <li>サーバー稼働率: 99.99%</li>
          <li>アクティブユーザー: 1,234</li>
          <li>平均レスポンス時間: 120ms</li>
          <li>CPU使用率: 45%</li>
        </ul>
      </div>
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-semibold mb-2">最近のアラート</h3>
        <ul className="list-disc list-inside">
          <li>データベース接続の遅延 (2時間前)</li>
          <li>高負荷警告 (6時間前)</li>
          <li>ストレージ容量警告 (1日前)</li>
        </ul>
      </div>
    </div>
  </div>
);

const ServersTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">サーバー情報</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b">サーバー名</th>
            <th className="px-4 py-2 border-b">状態</th>
            <th className="px-4 py-2 border-b">CPU使用率</th>
            <th className="px-4 py-2 border-b">メモリ使用率</th>
            <th className="px-4 py-2 border-b">稼働時間</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border-b">Web-01</td>
            <td className="px-4 py-2 border-b"><CheckCircle className="inline w-4 h-4 mr-1 text-green-500" /> 正常</td>
            <td className="px-4 py-2 border-b">45%</td>
            <td className="px-4 py-2 border-b">60%</td>
            <td className="px-4 py-2 border-b">30日</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b">App-01</td>
            <td className="px-4 py-2 border-b"><AlertTriangle className="inline w-4 h-4 mr-1 text-yellow-500" /> 警告</td>
            <td className="px-4 py-2 border-b">80%</td>
            <td className="px-4 py-2 border-b">75%</td>
            <td className="px-4 py-2 border-b">15日</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b">DB-01</td>
            <td className="px-4 py-2 border-b"><CheckCircle className="inline w-4 h-4 mr-1 text-green-500" /> 正常</td>
            <td className="px-4 py-2 border-b">55%</td>
            <td className="px-4 py-2 border-b">70%</td>
            <td className="px-4 py-2 border-b">45日</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const UsersTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">ユーザー統計</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">アクティブユーザー</h3>
        <p className="text-3xl font-bold">1,234</p>
        <p className="text-sm text-gray-600">過去24時間</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">新規登録</h3>
        <p className="text-3xl font-bold">56</p>
        <p className="text-sm text-gray-600">過去24時間</p>
      </div>
    </div>
    <div className="mt-6">
      <h3 className="font-semibold mb-2">ユーザーアクティビティ</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={[
          {name: '00:00', users: 500},
          {name: '04:00', users: 300},
          {name: '08:00', users: 600},
          {name: '12:00', users: 1000},
          {name: '16:00', users: 1200},
          {name: '20:00', users: 900},
        ]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{r: 8}} />
        </LineChart>
      </ResponsiveContainer>
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
            <td className="px-4 py-2 border-b">1,234,567</td>
            <td className="px-4 py-2 border-b">2.3 GB</td>
            <td className="px-4 py-2 border-b">2023-05-15 10:30:00</td>
            <td className="px-4 py-2 border-b">5</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b"><Database className="inline w-4 h-4 mr-1" /> products</td>
            <td className="px-4 py-2 border-b">56,789</td>
            <td className="px-4 py-2 border-b">1.5 GB</td>
            <td className="px-4 py-2 border-b">2023-05-14 15:45:00</td>
            <td className="px-4 py-2 border-b">3</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b"><Database className="inline w-4 h-4 mr-1" /> orders</td>
            <td className="px-4 py-2 border-b">8,901,234</td>
            <td className="px-4 py-2 border-b">5.7 GB</td>
            <td className="px-4 py-2 border-b">2023-05-15 09:15:00</td>
            <td className="px-4 py-2 border-b">4</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="mt-4">
      <h3 className="font-semibold mb-2">データベース最適化</h3>
      <ul className="list-disc list-inside">
        <li>定期的なVACUUM実行中</li>
        <li>クエリパフォーマンスモニタリング実施中</li>
        <li>インデックス使用状況の分析完了</li>
      </ul>
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
            <span className="font-medium text-green-600">0.8s</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Time to Interactive</span>
            <span className="font-medium text-green-600">1.5s</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Largest Contentful Paint</span>
            <span className="font-medium text-green-600">2.1s</span>
          </li>
        </ul>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">バックエンド</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>平均レスポンス時間</span>
            <span className="font-medium text-green-600">80ms</span>
          </li>
          <li className="flex justify-between items-center">
            <span>99パーセンタイル</span>
            <span className="font-medium text-green-600">250ms</span>
          </li>
          <li className="flex justify-between items-center">
            <span>エラーレート</span>
            <span className="font-medium text-green-600">0.05%</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="mt-4">
      <h3 className="font-semibold mb-2">最適化状況</h3>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
        <li>画像の最適化とLazy Loading導入済み</li>
        <li>クリティカルCSSの抽出完了</li>
        <li>サーバーサイドキャッシング強化済み</li>
        <li>データベースクエリの最適化実施済み</li>
      </ul>
    </div>
  </div>
);

export default Production;
