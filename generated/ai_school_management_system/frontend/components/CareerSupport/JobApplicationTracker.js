import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, ChevronDown, ChevronUp, Clipboard, Edit, PlusCircle, Trash2, Users } from 'react-feather';

const JobApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [newApplication, setNewApplication] = useState({
    company: '',
    position: '',
    status: 'applied',
    date: '',
    notes: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // 仮のデータをロード
    const dummyData = [
      { id: 1, company: 'テックイノベーション株式会社', position: 'AIエンジニア', status: 'applied', date: '2023-05-01', notes: '最先端のAI技術を扱う企業' },
      { id: 2, company: '未来創造ラボ', position: 'データサイエンティスト', status: 'interview', date: '2023-05-05', notes: '大規模データ解析プロジェクトに携わる' },
      { id: 3, company: 'グローバルAIソリューションズ', position: '機械学習スペシャリスト', status: 'offer', date: '2023-05-10', notes: '国際的なAIプロジェクトに参加できる' },
    ];
    setApplications(dummyData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApplication({ ...newApplication, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = applications.length + 1;
    setApplications([...applications, { ...newApplication, id }]);
    setNewApplication({ company: '', position: '', status: 'applied', date: '', notes: '' });
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const handleEdit = (id) => {
    const appToEdit = applications.find(app => app.id === id);
    setNewApplication(appToEdit);
    setIsFormOpen(true);
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-indigo-900 border-b-2 border-indigo-200 pb-2">就職活動追跡</h1>
      
      <div className="mb-6">
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center"
        >
          <PlusCircle className="mr-2" />
          新規応募を追加
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">企業名</label>
              <input
                type="text"
                name="company"
                value={newApplication.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">職位</label>
              <input
                type="text"
                name="position"
                value={newApplication.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">状態</label>
              <select
                name="status"
                value={newApplication.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="applied">応募済み</option>
                <option value="interview">面接中</option>
                <option value="offer">内定</option>
                <option value="rejected">不採用</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">日付</label>
              <input
                type="date"
                name="date"
                value={newApplication.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
            <textarea
              name="notes"
              value={newApplication.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
            ></textarea>
          </div>
          <div className="mt-6">
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
              保存
            </button>
          </div>
        </form>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">フィルター:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">すべて</option>
          <option value="applied">応募済み</option>
          <option value="interview">面接中</option>
          <option value="offer">内定</option>
          <option value="rejected">不採用</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApplications.map((app) => (
          <div key={app.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-indigo-900">{app.company}</h2>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(app.id)} className="text-indigo-600 hover:text-indigo-800">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(app.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-2 flex items-center">
              <Briefcase className="mr-2" size={16} />
              {app.position}
            </p>
            <p className="text-gray-600 mb-2 flex items-center">
              <Calendar className="mr-2" size={16} />
              {app.date}
            </p>
            <p className="text-gray-600 mb-4 flex items-center">
              <Clipboard className="mr-2" size={16} />
              {app.status === 'applied' && '応募済み'}
              {app.status === 'interview' && '面接中'}
              {app.status === 'offer' && '内定'}
              {app.status === 'rejected' && '不採用'}
            </p>
            <p className="text-gray-700 bg-gray-50 p-3 rounded">{app.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobApplicationTracker;