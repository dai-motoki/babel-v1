import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Code, GitBranch, GitCommit, GitMerge, Server, Terminal, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const Development = () => {
  const [buildStatus, setBuildStatus] = useState('進行中');
  const [testStatus, setTestStatus] = useState('待機中');
  const [deployStatus, setDeployStatus] = useState('未開始');
  const [currentBranch, setCurrentBranch] = useState('feature/new-matcha-product');
  const [commitCount, setCommitCount] = useState(0);

  const performanceData = [
    { name: 'ページロード', value: 2.5 },
    { name: 'API応答', value: 0.8 },
    { name: 'データベースクエリ', value: 0.3 },
    { name: 'レンダリング', value: 0.7 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCommitCount((prevCount) => prevCount + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (commitCount > 5) {
      setBuildStatus('完了');
      setTestStatus('進行中');
    }
    if (commitCount > 10) {
      setTestStatus('完了');
      setDeployStatus('進行中');
    }
    if (commitCount > 15) {
      setDeployStatus('完了');
    }
  }, [commitCount]);

  return (
    <div className="bg-green-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">開発環境ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <GitBranch className="mr-2" /> ブランチ情報
          </h2>
          <p className="text-gray-700 mb-2">現在のブランチ: <span className="font-mono text-green-600">{currentBranch}</span></p>
          <p className="text-gray-700">コミット数: <span className="font-mono text-green-600">{commitCount}</span></p>
          <div className="mt-4">
            <GitCommit className="inline-block mr-2 text-green-500" />
            <GitMerge className="inline-block mr-2 text-green-500" />
            <GitBranch className="inline-block text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <Server className="mr-2" /> 環境ステータス
          </h2>
          <div className="space-y-2">
            <StatusItem label="ビルド" status={buildStatus} />
            <StatusItem label="テスト" status={testStatus} />
            <StatusItem label="デプロイ" status={deployStatus} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <Terminal className="mr-2" /> パフォーマンスメトリクス
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <Code className="mr-2" /> 最近のコミット
          </h2>
          <div className="space-y-4">
            <CommitItem
              message="新しい抹茶フレーバーの追加"
              author="田中 花子"
              time="5分前"
            />
            <CommitItem
              message="商品一覧ページのパフォーマンス最適化"
              author="佐藤 太郎"
              time="2時間前"
            />
            <CommitItem
              message="注文フォームのバリデーション強化"
              author="鈴木 一郎"
              time="昨日"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusItem = ({ label, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case '完了':
        return 'text-green-500';
      case '進行中':
        return 'text-yellow-500';
      case '待機中':
      case '未開始':
        return 'text-gray-500';
      default:
        return 'text-red-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case '完了':
        return <CheckCircle className="inline-block mr-2" />;
      case '進行中':
        return <Clock className="inline-block mr-2" />;
      case '待機中':
      case '未開始':
        return <AlertCircle className="inline-block mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <span className={`font-semibold ${getStatusColor(status)}`}>
        {getStatusIcon(status)}
        {status}
      </span>
    </div>
  );
};

const CommitItem = ({ message, author, time }) => {
  return (
    <div className="border-l-4 border-green-500 pl-4">
      <p className="text-gray-800 font-medium">{message}</p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">{author}</span> が{time}にコミット
      </p>
    </div>
  );
};

export default Development;