import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CheckCircle, Clock, AlertTriangle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProgressStatus = ({ tasks = [] }) => {
  // タスクが未定義の場合に空の配列をデフォルト値として使用
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // タスクの優先度に基づいてソート
  const sortedTasks = [...tasks].sort((a, b) => b.priority - a.priority);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">プロジェクト進捗状況</h2>
      <div className="flex items-center justify-between mb-6">
        <div className="w-32 h-32">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: `rgba(62, 152, 199, ${progress / 100})`,
              textColor: '#3e98c7',
              trailColor: '#d6d6d6',
            })}
          />
        </div>
        <div className="ml-6">
          <p className="text-lg font-semibold text-gray-800">{completedTasks} / {totalTasks} タスク完了</p>
          <p className="text-sm text-gray-600">残り {totalTasks - completedTasks} タスク</p>
        </div>
      </div>
      <div className="space-y-4">
        {sortedTasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            {task.status === 'completed' && <CheckCircle className="text-green-500 mr-2" />}
            {task.status === 'in-progress' && <Clock className="text-blue-500 mr-2" />}
            {task.status === 'pending' && <AlertTriangle className="text-yellow-500 mr-2" />}
            <span className={`flex-1 ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.name}
            </span>
            <span className="text-sm text-gray-600 mr-2">{task.dueDate}</span>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              task.priority === 3 ? 'bg-red-100 text-red-800' :
              task.priority === 2 ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {task.priority === 3 ? '高' : task.priority === 2 ? '中' : '低'}
            </span>
            <button className="ml-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </div>
      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-4">タスクがありません。新しいタスクを追加してください。</p>
      )}
    </motion.div>
  );
};

export default ProgressStatus;
