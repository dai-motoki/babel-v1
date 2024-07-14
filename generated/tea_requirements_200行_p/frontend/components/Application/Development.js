import React, { useState, useEffect } from 'react';
import { Code, Terminal, GitBranch, Package, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Development = () => {
  const [buildStatus, setBuildStatus] = useState('進行中');
  const [testStatus, setTestStatus] = useState('待機中');
  const [deployStatus, setDeployStatus] = useState('未開始');
  const [commitHistory, setCommitHistory] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // 実際のAPIコールの代わりにモックデータを使用
    const mockCommitHistory = [
      { id: 1, message: 'フロントエンドの最適化', author: '山田太郎', date: '2023-05-15' },
      { id: 2, message: 'バックエンドAPIの改善', author: '佐藤花子', date: '2023-05-14' },
      { id: 3, message: 'セキュリティアップデート', author: '鈴木一郎', date: '2023-05-13' },
    ];
    setCommitHistory(mockCommitHistory);

    const mockPerformanceData = [
      { name: '月', 負荷: 4000, レスポンス時間: 2400 },
      { name: '火', 負荷: 3000, レスポンス時間: 1398 },
      { name: '水', 負荷: 2000, レスポンス時間: 9800 },
      { name: '木', 負荷: 2780, レスポンス時間: 3908 },
      { name: '金', 負荷: 1890, レスポンス時間: 4800 },
      { name: '土', 負荷: 2390, レスポンス時間: 3800 },
      { name: '日', 負荷: 3490, レスポンス時間: 4300 },
    ];
    setPerformanceData(mockPerformanceData);

    // ビルド状態のシミュレーション
    const timer = setTimeout(() => {
      setBuildStatus('完了');
      setTestStatus('進行中');
      setTimeout(() => {
        setTestStatus('完了');
        setDeployStatus('進行中');
        setTimeout(() => {
          setDeployStatus('完了');
        }, 2000);
      }, 2000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderStatusIcon = (status) => {
    switch (status) {
      case '完了':
        return <CheckCircle className="text-green-500" />;
      case '進行中':
        return <RefreshCw className="text-blue-500 animate-spin" />;
      case '失敗':
        return <XCircle className="text-red-500" />;
      default:
        return <AlertTriangle className="text-yellow-500" />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">開発環境ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Code className="mr-2" /> ビルドステータス
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>ビルド:</span>
              <div className="flex items-center">
                {renderStatusIcon(buildStatus)}
                <span className="ml-2">{buildStatus}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>テスト:</span>
              <div className="flex items-center">
                {renderStatusIcon(testStatus)}
                <span className="ml-2">{testStatus}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>デプロイ:</span>
              <div className="flex items-center">
                {renderStatusIcon(deployStatus)}
                <span className="ml-2">{deployStatus}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <GitBranch className="mr-2" /> 最近のコミット
          </h2>
          <ul className="space-y-4">
            {commitHistory.map((commit) => (
              <li key={commit.id} className="border-b pb-2">
                <p className="font-medium">{commit.message}</p>
                <p className="text-sm text-gray-600">
                  {commit.author} - {commit.date}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Terminal className="mr-2" /> パフォーマンスメトリクス
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="負荷" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="レスポンス時間" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Package className="mr-2" /> 依存関係
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded p-4">
              <h3 className="font-medium mb-2">フロントエンド</h3>
              <ul className="list-disc list-inside text-sm">
                <li>React: 18.2.0</li>
                <li>Tailwind CSS: 3.3.2</li>
                <li>Recharts: 2.6.2</li>
              </ul>
            </div>
            <div className="border rounded p-4">
              <h3 className="font-medium mb-2">バックエンド</h3>
              <ul className="list-disc list-inside text-sm">
                <li>Node.js: 16.15.1</li>
                <li>Express: 4.18.2</li>
                <li>MongoDB: 5.5.0</li>
              </ul>
            </div>
            <div className="border rounded p-4">
              <h3 className="font-medium mb-2">開発ツール</h3>
              <ul className="list-disc list-inside text-sm">
                <li>ESLint: 8.40.0</li>
                <li>Jest: 29.5.0</li>
                <li>Webpack: 5.83.1</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">開発環境情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">サーバー情報</h3>
            <p className="text-sm">OS: Ubuntu 22.04 LTS</p>
            <p className="text-sm">CPU: 4 cores</p>
            <p className="text-sm">メモリ: 16GB RAM</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">データベース</h3>
            <p className="text-sm">タイプ: MongoDB</p>
            <p className="text-sm">バージョン: 5.0</p>
            <p className="text-sm">接続数: 10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Development;