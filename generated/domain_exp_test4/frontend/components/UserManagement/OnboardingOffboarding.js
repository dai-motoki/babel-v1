import React, { useState, useEffect } from 'react';
import { Check, X, User, UserPlus, UserMinus, Calendar, FileText, Key, Shield } from 'react-feather';

const OnboardingOffboarding = () => {
  const [activeTab, setActiveTab] = useState('onboarding');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // 初期タスクの設定
    const initialTasks = activeTab === 'onboarding' ? [
      { id: 1, title: '人事情報の登録', completed: false },
      { id: 2, title: 'ITアカウントの作成', completed: false },
      { id: 3, title: '必要な機器の準備', completed: false },
      { id: 4, title: 'オリエンテーションの実施', completed: false },
      { id: 5, title: '初日の予定調整', completed: false },
    ] : [
      { id: 1, title: '退職届の受理', completed: false },
      { id: 2, title: 'ITアカウントの無効化', completed: false },
      { id: 3, title: '機器の回収', completed: false },
      { id: 4, title: '最終日の予定調整', completed: false },
      { id: 5, title: '退職金の計算', completed: false },
    ];
    setTasks(initialTasks);
  }, [activeTab]);

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getCompletionPercentage = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">入退社プロセス管理</h2>
      
      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-2 rounded-l-lg ${activeTab === 'onboarding' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} transition duration-300 ease-in-out`}
          onClick={() => setActiveTab('onboarding')}
        >
          <UserPlus className="inline-block mr-2" size={18} />
          入社プロセス
        </button>
        <button
          className={`px-6 py-2 rounded-r-lg ${activeTab === 'offboarding' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} transition duration-300 ease-in-out`}
          onClick={() => setActiveTab('offboarding')}
        >
          <UserMinus className="inline-block mr-2" size={18} />
          退社プロセス
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-inner">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-gray-800">
            {activeTab === 'onboarding' ? '入社' : '退社'}チェックリスト
          </h3>
          <div className="text-sm text-gray-600">
            進捗状況: {getCompletionPercentage()}%
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center p-4 rounded-lg transition duration-300 ease-in-out ${
                task.completed ? 'bg-green-100' : 'bg-gray-100'
              }`}
            >
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${
                  task.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-400'
                } mr-4 flex items-center justify-center transition duration-300 ease-in-out`}
              >
                {task.completed && <Check size={16} className="text-white" />}
              </button>
              <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
              </span>
              {getTaskIcon(task.title)}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-indigo-100 rounded-lg">
        <h4 className="text-lg font-medium text-indigo-800 mb-2">ヒント</h4>
        <p className="text-indigo-700">
          {activeTab === 'onboarding'
            ? '新入社員のスムーズな受け入れのため、各タスクを計画的に進めましょう。'
            : '退職者の情報セキュリティに注意しながら、丁寧な送り出しを心がけましょう。'}
        </p>
      </div>
    </div>
  );
};

const getTaskIcon = (title) => {
  const iconClass = "ml-2 text-gray-500";
  if (title.includes('情報') || title.includes('届')) return <FileText className={iconClass} size={18} />;
  if (title.includes('アカウント')) return <Key className={iconClass} size={18} />;
  if (title.includes('機器')) return <Shield className={iconClass} size={18} />;
  if (title.includes('オリエンテーション') || title.includes('予定')) return <Calendar className={iconClass} size={18} />;
  return <User className={iconClass} size={18} />;
};

export default OnboardingOffboarding;