import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, AlertCircle } from 'lucide-react';

const SaaSCard = ({ app }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:scale-105">
    <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
      {/* SaaSロゴの代わりに仮のボックス */}
      <div className="w-12 h-12 bg-indigo-500 rounded-full"></div>
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{app.name}</h3>
    <p className="text-sm text-gray-600 mb-4">{app.category}</p>
    <div className="flex items-center justify-between w-full">
      <span className={`px-2 py-1 rounded-full text-xs ${app.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {app.status}
      </span>
      <button className="text-gray-500 hover:text-gray-700">
        <MoreVertical size={16} />
      </button>
    </div>
  </div>
);

const SaaSInventory = () => {
  const [saasApps, setSaasApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApps, setFilteredApps] = useState([]);

  useEffect(() => {
    // 仮のデータ取得
    const fetchSaaSApps = async () => {
      // APIからデータを取得する代わりに、仮のデータを使用
      const mockData = [
        { id: 1, name: 'Slack', category: 'Communication', status: 'Active' },
        { id: 2, name: 'Zoom', category: 'Video Conferencing', status: 'Active' },
        { id: 3, name: 'Trello', category: 'Project Management', status: 'Inactive' },
        { id: 4, name: 'Salesforce', category: 'CRM', status: 'Active' },
        { id: 5, name: 'Asana', category: 'Project Management', status: 'Active' },
        { id: 6, name: 'Dropbox', category: 'Cloud Storage', status: 'Inactive' },
      ];
      setSaasApps(mockData);
      setFilteredApps(mockData);
    };

    fetchSaaSApps();
  }, []);

  useEffect(() => {
    const results = saasApps.filter(app =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApps(results);
  }, [searchTerm, saasApps]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">SaaS Inventory</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search SaaS apps..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 flex items-center">
            <Plus size={20} className="mr-2" />
            Add SaaS
          </button>
        </div>
      </div>

      {filteredApps.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">No SaaS applications found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredApps.map(app => (
            <SaaSCard key={app.id} app={app} />
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-600">
          Showing {filteredApps.length} of {saasApps.length} SaaS applications
        </p>
      </div>
    </div>
  );
};

export default SaaSInventory;