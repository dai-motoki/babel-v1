import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, PlusCircle, Trash2, Edit3, Save } from 'react-feather';

const CampaignPlanner = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    startDate: '',
    endDate: '',
    budget: '',
    target: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // 仮のデータをロード
    const dummyCampaigns = [
      { id: 1, name: '春の入学キャンペーン', startDate: '2023-03-01', endDate: '2023-04-30', budget: 500000, target: '高校生', description: '新学期に向けた特別割引と無料体験レッスン' },
      { id: 2, name: '夏期集中講座', startDate: '2023-07-15', endDate: '2023-08-31', budget: 750000, target: '中学生・高校生', description: '夏休み期間中の集中学習プログラム' },
    ];
    setCampaigns(dummyCampaigns);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setCampaigns(campaigns.map(camp => camp.id === editingId ? { ...newCampaign, id: editingId } : camp));
      setEditingId(null);
    } else {
      setCampaigns([...campaigns, { ...newCampaign, id: Date.now() }]);
    }
    setNewCampaign({ name: '', startDate: '', endDate: '', budget: '', target: '', description: '' });
  };

  const handleEdit = (campaign) => {
    setNewCampaign(campaign);
    setEditingId(campaign.id);
  };

  const handleDelete = (id) => {
    setCampaigns(campaigns.filter(camp => camp.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-indigo-900 border-b-2 border-indigo-500 pb-2">キャンペーンプランナー</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">キャンペーン名</label>
            <input
              type="text"
              name="name"
              value={newCampaign.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">開始日</label>
            <div className="relative">
              <input
                type="date"
                name="startDate"
                value={newCampaign.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <Calendar className="absolute right-3 top-2 text-gray-400" size={20} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">終了日</label>
            <div className="relative">
              <input
                type="date"
                name="endDate"
                value={newCampaign.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <Calendar className="absolute right-3 top-2 text-gray-400" size={20} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">予算</label>
            <input
              type="number"
              name="budget"
              value={newCampaign.budget}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ターゲット</label>
            <input
              type="text"
              name="target"
              value={newCampaign.target}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">説明</label>
            <textarea
              name="description"
              value={newCampaign.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
              required
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {editingId ? '更新' : '追加'}
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-800">キャンペーン一覧</h2>
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="mb-4 p-4 border border-gray-200 rounded-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-medium text-indigo-700 mb-2">{campaign.name}</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <p><span className="font-semibold">期間:</span> {campaign.startDate} 〜 {campaign.endDate}</p>
              <p><span className="font-semibold">予算:</span> ¥{campaign.budget.toLocaleString()}</p>
              <p><span className="font-semibold">ターゲット:</span> {campaign.target}</p>
            </div>
            <p className="mt-2 text-gray-700">{campaign.description}</p>
            <div className="mt-3 flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(campaign)}
                className="text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                <Edit3 size={18} />
              </button>
              <button
                onClick={() => handleDelete(campaign.id)}
                className="text-red-600 hover:text-red-800 focus:outline-none"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignPlanner;