import React, { useState, useEffect } from 'react';
import { MessageCircle, Book, Clock, Users, PlusCircle, ChevronDown } from 'lucide-react';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // プロジェクトデータのフェッチ（ダミーデータ）
    setProjects([
      { id: 1, name: '桜プロジェクト', progress: 75 },
      { id: 2, name: '紅葉イベント', progress: 30 },
    ]);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      // タスクデータのフェッチ（ダミーデータ）
      setTasks([
        { id: 1, name: 'デザイン作成', assignee: '田中', status: '進行中' },
        { id: 2, name: 'コーディング', assignee: '鈴木', status: '未着手' },
      ]);
    }
  }, [selectedProject]);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">プロジェクトダッシュボード</h1>
        
        {/* プロジェクト選択 */}
        <div className="mb-8">
          <select
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
            onChange={(e) => handleProjectSelect(projects.find(p => p.id === parseInt(e.target.value)))}
          >
            <option value="">プロジェクトを選択</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>

        {selectedProject && (
          <>
            {/* プロジェクト概要 */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedProject.name}</h2>
              <div className="flex items-center mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${selectedProject.progress}%`}}></div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-700">{selectedProject.progress}%</span>
              </div>
            </div>

            {/* タスク管理 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">タスク</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">タスク名</th>
                      <th scope="col" className="px-6 py-3">担当者</th>
                      <th scope="col" className="px-6 py-3">ステータス</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id} className="bg-white border-b">
                        <td className="px-6 py-4">{task.name}</td>
                        <td className="px-6 py-4">{task.assignee}</td>
                        <td className="px-6 py-4">{task.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-4 flex items-center text-blue-600 hover:text-blue-800">
                <PlusCircle size={20} className="mr-2" />
                新規タスクを追加
              </button>
            </div>

            {/* 簡易ガントチャート */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">ガントチャート</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {/* ガントチャートの実装（省略） */}
                <div className="h-20 flex items-center justify-center text-gray-500">
                  ガントチャートがここに表示されます
                </div>
              </div>
            </div>

            {/* チームメンバーのタイムゾーン */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">チームメンバーのタイムゾーン</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-medium">田中（東京）</p>
                  <p className="text-sm text-gray-600">現地時間: 14:00</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-medium">Smith（ニューヨーク）</p>
                  <p className="text-sm text-gray-600">現地時間: 01:00</p>
                </div>
              </div>
            </div>

            {/* クイックアクセス */}
            <div className="flex space-x-4">
              <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <MessageCircle size={20} className="mr-2" />
                チャットを開く
              </button>
              <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                <Book size={20} className="mr-2" />
                Wikiを表示
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectDashboard;