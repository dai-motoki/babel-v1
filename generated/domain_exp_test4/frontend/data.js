// data.js

export const devices = [
  { id: 1, name: '松竹梅ノートPC', type: 'ノートPC', status: 'アクティブ', lastSeen: '2023-04-01' },
  { id: 2, name: '桜花タブレット', type: 'タブレット', status: 'アクティブ', lastSeen: '2023-04-02' },
  { id: 3, name: '紅葉スマートフォン', type: 'スマートフォン', status: '非アクティブ', lastSeen: '2023-03-15' },
  { id: 4, name: '菊花デスクトップ', type: 'デスクトップPC', status: 'アクティブ', lastSeen: '2023-04-03' },
];

export const saasApps = [
  { id: 1, name: '和紙クラウド', users: 150, cost: 5000, lastUsed: '2023-04-03' },
  { id: 2, name: '墨絵エディタ', users: 75, cost: 3000, lastUsed: '2023-04-02' },
  { id: 3, name: '障子チャット', users: 200, cost: 7000, lastUsed: '2023-04-03' },
  { id: 4, name: '風鈴CRM', users: 100, cost: 4000, lastUsed: '2023-04-01' },
];

export const users = [
  { id: 1, name: '山田太郎', role: '管理者', lastLogin: '2023-04-03' },
  { id: 2, name: '鈴木花子', role: 'ユーザー', lastLogin: '2023-04-02' },
  { id: 3, name: '佐藤次郎', role: 'ユーザー', lastLogin: '2023-04-03' },
  { id: 4, name: '田中美咲', role: 'マネージャー', lastLogin: '2023-04-01' },
];

export const costData = [
  { month: '1月', cost: 15000 },
  { month: '2月', cost: 17000 },
  { month: '3月', cost: 16000 },
  { month: '4月', cost: 19000 },
];

export const securityAlerts = [
  { id: 1, type: '不審なログイン', device: '紅葉スマートフォン', date: '2023-04-02' },
  { id: 2, type: '未承認アプリ', app: '竹林スプレッドシート', date: '2023-04-01' },
  { id: 3, type: 'ライセンス超過', app: '和紙クラウド', date: '2023-04-03' },
];
// Dashboard.js
import React, { useState } from 'react';
import { devices, saasApps, users, costData, securityAlerts } from './data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, Calendar, DollarSign, Users } from 'react-feather';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('概要');

  const tabs = ['概要', 'デバイス', 'SaaSアプリ', 'ユーザー', 'セキュリティ'];

  const renderTabContent = () => {
    switch (activeTab) {
      case '概要':
        return <OverviewTab />;
      case 'デバイス':
        return <DevicesTab />;
      case 'SaaSアプリ':
        return <SaasAppsTab />;
      case 'ユーザー':
        return <UsersTab />;
      case 'セキュリティ':
        return <SecurityTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">デジタル職人ダッシュボード</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-4">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const OverviewTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <StatCard title="総デバイス数" value={devices.length} icon={<Calendar className="h-6 w-6" />} />
    <StatCard title="総SaaSアプリ数" value={saasApps.length} icon={<DollarSign className="h-6 w-6" />} />
    <StatCard title="総ユーザー数" value={users.length} icon={<Users className="h-6 w-6" />} />
    <StatCard title="セキュリティアラート" value={securityAlerts.length} icon={<Bell className="h-6 w-6" />} />
    <div className="col-span-full">
      <h3 className="text-lg font-medium mb-2">コスト推移</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={costData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cost" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const DevicesTab = () => (
  <div>
    <h3 className="text-lg font-medium mb-2">デバイス一覧</h3>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイプ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終確認</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {devices.map((device) => (
            <tr key={device.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{device.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.lastSeen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SaasAppsTab = () => (
  <div>
    <h3 className="text-lg font-medium mb-2">SaaSアプリケーション一覧</h3>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ユーザー数</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">コスト</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終使用</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {saasApps.map((app) => (
            <tr key={app.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.users}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.cost}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.lastUsed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const UsersTab = () => (
  <div>
    <h3 className="text-lg font-medium mb-2">ユーザー一覧</h3>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">役割</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終ログイン</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SecurityTab = () => (
  <div>
    <h3 className="text-lg font-medium mb-2">セキュリティアラート</h3>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイプ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">デバイス/アプリ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {securityAlerts.map((alert) => (
            <tr key={alert.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.device || alert.app}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-3xl font-semibold text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);