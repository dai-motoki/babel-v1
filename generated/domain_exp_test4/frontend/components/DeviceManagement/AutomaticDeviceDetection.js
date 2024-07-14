import React, { useState, useEffect } from 'react';
import { RefreshCw, Monitor, Smartphone, Tablet, Server } from 'react-feather';

const AutomaticDeviceDetection = () => {
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // 初回のデバイス検出を実行
    detectDevices();
  }, []);

  const detectDevices = () => {
    setIsScanning(true);
    // 実際のAPIコールをシミュレート
    setTimeout(() => {
      const newDevices = [
        { id: 1, type: 'laptop', name: 'MacBook Pro', ip: '192.168.1.10', lastSeen: new Date() },
        { id: 2, type: 'smartphone', name: 'iPhone 12', ip: '192.168.1.11', lastSeen: new Date() },
        { id: 3, type: 'tablet', name: 'iPad Air', ip: '192.168.1.12', lastSeen: new Date() },
        { id: 4, type: 'server', name: 'Ubuntu Server', ip: '192.168.1.13', lastSeen: new Date() },
      ];
      setDevices(newDevices);
      setIsScanning(false);
    }, 2000);
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'laptop':
        return <Monitor className="w-6 h-6 text-indigo-600" />;
      case 'smartphone':
        return <Smartphone className="w-6 h-6 text-green-600" />;
      case 'tablet':
        return <Tablet className="w-6 h-6 text-blue-600" />;
      case 'server':
        return <Server className="w-6 h-6 text-red-600" />;
      default:
        return null;
    }
  };

  const filteredDevices = devices.filter(device => 
    filter === 'all' || device.type === filter
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-200 pb-2">
        自動デバイス検出
      </h2>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={detectDevices}
          disabled={isScanning}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
        >
          <RefreshCw className={`mr-2 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'スキャン中...' : 'デバイスをスキャン'}
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="all">すべて</option>
          <option value="laptop">ノートPC</option>
          <option value="smartphone">スマートフォン</option>
          <option value="tablet">タブレット</option>
          <option value="server">サーバー</option>
        </select>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600">
          検出されたデバイス: {filteredDevices.length}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300 ease-in-out"
          >
            <div className="flex items-center mb-2">
              {getDeviceIcon(device.type)}
              <h3 className="text-lg font-semibold ml-2">{device.name}</h3>
            </div>
            <p className="text-sm text-gray-600">IP: {device.ip}</p>
            <p className="text-sm text-gray-600">
              最終検出: {device.lastSeen.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      {filteredDevices.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">デバイスが見つかりません</p>
        </div>
      )}
      <div className="mt-8 bg-indigo-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-indigo-800 mb-2">ヒント</h3>
        <p className="text-sm text-indigo-600">
          定期的にデバイスをスキャンすることで、ネットワーク上の新しいデバイスを素早く検出できます。
          不審なデバイスを見つけた場合は、IT管理者に報告してください。
        </p>
      </div>
    </div>
  );
};

export default AutomaticDeviceDetection;