import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, Filter, MoreVertical, Edit, Trash2, CheckCircle, XCircle } from 'react-feather';

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', status: 'new', notes: '' });

  useEffect(() => {
    // 仮のリードデータをフェッチする
    const fetchLeads = async () => {
      // APIからデータを取得する代わりに、仮のデータを使用
      const mockLeads = [
        { id: 1, name: '山田太郎', email: 'yamada@example.com', status: 'new', notes: '初回問い合わせ' },
        { id: 2, name: '佐藤花子', email: 'sato@example.com', status: 'contacted', notes: '資料送付済み' },
        { id: 3, name: '鈴木一郎', email: 'suzuki@example.com', status: 'qualified', notes: '面談希望' },
        { id: 4, name: '田中みどり', email: 'tanaka@example.com', status: 'lost', notes: '競合他社と契約' },
      ];
      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
    };
    fetchLeads();
  }, []);

  useEffect(() => {
    const results = leads.filter(lead =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'all' || lead.status === filterStatus)
    );
    setFilteredLeads(results);
  }, [searchTerm, filterStatus, leads]);

  const handleAddLead = () => {
    setLeads([...leads, { ...newLead, id: leads.length + 1 }]);
    setShowAddModal(false);
    setNewLead({ name: '', email: '', status: 'new', notes: '' });
  };

  const handleDeleteLead = (id) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  const handleUpdateStatus = (id, newStatus) => {
    setLeads(leads.map(lead => 
      lead.id === id ? { ...lead, status: newStatus } : lead
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">リード管理</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="リードを検索..."
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 transition duration-300">
            <Search size={20} />
          </button>
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">全てのステータス</option>
          <option value="new">新規</option>
          <option value="contacted">連絡済み</option>
          <option value="qualified">適格</option>
          <option value="lost">失注</option>
        </select>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
          onClick={() => setShowAddModal(true)}
        >
          <PlusCircle size={20} className="mr-2" />
          新規リード追加
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メール</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メモ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                    lead.status === 'qualified' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.notes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteLead(lead.id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">新規リード追加</h3>
              <div className="mt-2 px-7 py-3">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                  placeholder="名前"
                  value={newLead.name}
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                />
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                  placeholder="メールアドレス"
                  value={newLead.email}
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                />
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                  value={newLead.status}
                  onChange={(e) => setNewLead({...newLead, status: e.target.value})}
                >
                  <option value="new">新規</option>
                  <option value="contacted">連絡済み</option>
                  <option value="qualified">適格</option>
                  <option value="lost">失注</option>
                </select>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                  placeholder="メモ"
                  value={newLead.notes}
                  onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                ></textarea>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                  onClick={handleAddLead}
                >
                  追加
                </button>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="cancel-btn"
                  className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={() => setShowAddModal(false)}
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;