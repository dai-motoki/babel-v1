import React, { useState, useEffect } from 'react';
import { BarChart2, CheckCircle, Clock, AlertTriangle, X } from 'lucide-react';

const ProgressStatus = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // モックデータの生成
    const mockTasks = [
      { id: 1, title: '新商品の企画', status: 'in_progress', progress: 65, dueDate: '2023-06-30' },
      { id: 2, title: 'ウェブサイトのリニューアル', status: 'completed', progress: 100, dueDate: '2023-05-15' },
      { id: 3, title: '季節限定商品の開発', status: 'not_started', progress: 0, dueDate: '2023-07-31' },
      { id: 4, title: '販売促進キャンペーン', status: 'in_progress', progress: 40, dueDate: '2023-06-15' },
      { id: 5, title: '顧客満足度調査', status: 'delayed', progress: 20, dueDate: '2023-05-31' },
    ];
    setTasks(mockTasks);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" />;
      case 'in_progress':
        return <Clock className="text-blue-500" />;
      case 'delayed':
        return <AlertTriangle className="text-yellow-500" />;
      case 'not_started':
        return <X className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return '完了';
      case 'in_progress':
        return '進行中';
      case 'delayed':
        return '遅延';
      case 'not_started':
        return '未着手';
      default:
        return '';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6">進捗状況</h2>
      <div className="mb-6">
        <label htmlFor="status-filter" className="block text-sm font-medium text-green-700 mb-2">
          ステータスフィルター
        </label>
        <select
          id="status-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="block w-full bg-white border border-green-300 rounded-md py-2 px-3 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">全て</option>
          <option value="completed">完了</option>
          <option value="in_progress">進行中</option>
          <option value="delayed">遅延</option>
          <option value="not_started">未着手</option>
        </select>
      </div>
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded-md shadow-sm border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-green-900">{task.title}</h3>
              <div className="flex items-center space-x-2">
                {getStatusIcon(task.status)}
                <span className="text-sm text-green-700">{getStatusText(task.status)}</span>
              </div>
            </div>
            <div className="mb-2">
              <div className="w-full bg-green-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm text-green-700">
              <span>{task.progress}% 完了</span>
              <span>期限: {task.dueDate}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-green-800 mb-4">進捗状況サマリー</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['completed', 'in_progress', 'delayed', 'not_started'].map((status) => (
            <div key={status} className="bg-white p-4 rounded-md shadow-sm border border-green-200">
              <div className="flex items-center justify-between mb-2">
                {getStatusIcon(status)}
                <span className="text-sm font-medium text-green-700">{getStatusText(status)}</span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {tasks.filter(task => task.status === status).length}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-green-800 mb-4">全体の進捗状況</h3>
        <div className="bg-white p-4 rounded-md shadow-sm border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <BarChart2 className="text-green-600" />
            <span className="text-sm font-medium text-green-700">全タスクの平均進捗</span>
          </div>
          <div className="mb-2">
            <div className="w-full bg-green-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${Math.round(tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length)}%` }}
              ></div>
            </div>
          </div>
          <p className="text-2xl font-bold text-green-900">
            {Math.round(tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressStatus;