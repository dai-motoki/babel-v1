import { useState } from 'react';
import { CalendarIcon, CheckCircle2Icon } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'ウェブサイトリニューアル',
    dueDate: '2024-03-15',
    status: '進行中',
    progress: 60,
  },
  {
    id: 2,
    title: '新商品開発',
    dueDate: '2024-04-01',
    status: '計画中',
    progress: 20,
  },
  {
    id: 3,
    title: 'マーケティングキャンペーン',
    dueDate: '2024-04-15',
    status: '完了',
    progress: 100,
  },
];

const ProgressStatus = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">進捗状況</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="タスクを検索"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-green-100">
              <th className="px-4 py-2 text-left">タスク</th>
              <th className="px-4 py-2 text-left">期日</th>
              <th className="px-4 py-2 text-left">ステータス</th>
              <th className="px-4 py-2 text-left">進捗率</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="hover:bg-green-50">
                <td className="px-4 py-2 border-t">{task.title}</td>
                <td className="px-4 py-2 border-t">
                  <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                  {task.dueDate}
                </td>
                <td className="px-4 py-2 border-t">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      task.status === '完了'
                        ? 'bg-green-200 text-green-800'
                        : task.status === '進行中'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-t">
                  <div className="relative w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                    {task.progress === 100 && (
                      <div className="absolute top-0 right-0 -mt-2 -mr-2">
                        <CheckCircle2Icon className="w-4 h-4 text-green-500" />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgressStatus;