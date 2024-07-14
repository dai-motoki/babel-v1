import React, { useState, useEffect } from 'react';
import { BarChart2, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const ProgressStatus = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // モックデータの生成
    const mockTasks = [
      { id: 1, title: '商品企画', status: 'completed', progress: 100 },
      { id: 2, title: 'パッケージデザイン', status: 'in-progress', progress: 60 },
      { id: 3, title: '原材料調達', status: 'in-progress', progress: 40 },
      { id: 4, title: '製造ライン準備', status: 'not-started', progress: 0 },
      { id: 5, title: '品質管理テスト', status: 'not-started', progress: 0 },
      { id: 6, title: 'マーケティング計画', status: 'in-progress', progress: 80 },
    ];
    setTasks(mockTasks);
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" />;
      case 'in-progress':
        return <Clock className="text-yellow-500" />;
      case 'not-started':
        return <AlertTriangle className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return '完了';
      case 'in-progress':
        return '進行中';
      case 'not-started':
        return '未着手';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <BarChart2 className="mr-2 text-green-600" />
        進捗状況
      </h2>

      <div className="mb-6">
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
          ステータスフィルター
        </label>
        <select
          id="status-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
        >
          <option value="all">すべて</option>
          <option value="completed">完了</option>
          <option value="in-progress">進行中</option>
          <option value="not-started">未着手</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-gray-50 rounded-lg p-4 shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
              <div className="flex items-center">
                {getStatusIcon(task.status)}
                <span className="ml-2 text-sm font-medium text-gray-600">
                  {getStatusText(task.status)}
                </span>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    進捗
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    {task.progress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div
                  style={{ width: `${task.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">進捗サマリー</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-100 rounded-lg p-4">
            <p className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.status === 'completed').length}
            </p>
            <p className="text-sm text-gray-600">完了タスク</p>
          </div>
          <div className="bg-yellow-100 rounded-lg p-4">
            <p className="text-2xl font-bold text-yellow-600">
              {tasks.filter(t => t.status === 'in-progress').length}
            </p>
            <p className="text-sm text-gray-600">進行中タスク</p>
          </div>
          <div className="bg-red-100 rounded-lg p-4">
            <p className="text-2xl font-bold text-red-600">
              {tasks.filter(t => t.status === 'not-started').length}
            </p>
            <p className="text-sm text-gray-600">未着手タスク</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">全体進捗</h3>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                全体進捗
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-green-600">
                {Math.round(tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
            <div
              style={{ width: `${Math.round(tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length)}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStatus;