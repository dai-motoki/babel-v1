import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Smartphone, Tablet, Watch, Monitor } from 'react-feather';

const DeviceInventory = () => {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    // 実際のAPIコールの代わりにモックデータを使用
    const mockDevices = [
      { id: 1, name: 'MacBook Pro', type: 'laptop', status: 'active', lastSeen: '2023-05-01' },
      { id: 2, name: 'iPhone 12', type: 'smartphone', status: 'inactive', lastSeen: '2023-04-28' },
      { id: 3, name: 'iPad Air', type: 'tablet', status: 'active', lastSeen: '2023-05-02' },
      { id: 4, name: 'Apple Watch', type: 'watch', status: 'active', lastSeen: '2023-05-01' },
      // ... 他のデバイス
    ];
    setDevices(mockDevices);
    setFilteredDevices(mockDevices);
  }, []);

  useEffect(() => {
    const filtered = devices.filter(device => 
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType === 'all' || device.type === selectedType)
    );
    setFilteredDevices(filtered);
  }, [searchTerm, selectedType, devices]);

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'laptop': return <Monitor className="w-12 h-12 text-indigo-600" />;
      case 'smartphone': return <Smartphone className="w-12 h-12 text-indigo-600" />;
      case 'tablet': return <Tablet className="w-12 h-12 text-indigo-600" />;
      case 'watch': return <Watch className="w-12 h-12 text-indigo-600" />;
      default: return <Monitor className="w-12 h-12 text-indigo-600" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">デバイス一覧</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="デバイスを検索..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        <div className="flex items-center space-x-4">
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">全てのタイプ</option>
            <option value="laptop">ノートPC</option>
            <option value="smartphone">スマートフォン</option>
            <option value="tablet">タブレット</option>
            <option value="watch">スマートウォッチ</option>
          </select>

          <button
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
            onClick={() => setViewMode('list')}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDevices.map(device => (
            <div key={device.id} className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex justify-center mb-4">
                {getDeviceIcon(device.type)}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{device.name}</h3>
              <p className="text-sm text-gray-600 mb-2">タイプ: {device.type}</p>
              <p className="text-sm text-gray-600 mb-2">ステータス: {device.status}</p>
              <p className="text-sm text-gray-600">最終アクセス: {device.lastSeen}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">デバイス</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイプ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終アクセス</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevices.map(device => (
                <tr key={device.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {getDeviceIcon(device.type)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{device.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{device.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      device.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DeviceInventory;