import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2, Edit2, AlertCircle } from 'react-feather';

const LIFECYCLE_STAGES = [
  { id: 1, name: '調達', color: 'bg-indigo-500' },
  { id: 2, name: '設定', color: 'bg-blue-500' },
  { id: 3, name: '運用', color: 'bg-green-500' },
  { id: 4, name: 'メンテナンス', color: 'bg-yellow-500' },
  { id: 5, name: '廃棄', color: 'bg-red-500' },
];

const MOCK_DEVICES = [
  { id: 1, name: 'ノートPC A', type: 'ノートPC', stage: 3, purchaseDate: '2022-01-15' },
  { id: 2, name: 'デスクトップ B', type: 'デスクトップPC', stage: 2, purchaseDate: '2022-03-01' },
  { id: 3, name: 'タブレット C', type: 'タブレット', stage: 4, purchaseDate: '2021-11-10' },
];

const DeviceLifecycle = () => {
  const [devices, setDevices] = useState(MOCK_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({ name: '', type: '', stage: 1, purchaseDate: '' });

  useEffect(() => {
    // APIからデバイスデータを取得する処理をここに実装
  }, []);

  const handleDeviceClick = (device) => {
    setSelectedDevice(selectedDevice && selectedDevice.id === device.id ? null : device);
  };

  const handleAddDevice = () => {
    setDevices([...devices, { ...newDevice, id: devices.length + 1 }]);
    setIsAddModalOpen(false);
    setNewDevice({ name: '', type: '', stage: 1, purchaseDate: '' });
  };

  const handleDeleteDevice = (id) => {
    setDevices(devices.filter(device => device.id !== id));
    setSelectedDevice(null);
  };

  const handleUpdateStage = (id, newStage) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, stage: newStage } : device
    ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">デバイスライフサイクル管理</h1>
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center"
        >
          <Plus size={18} className="mr-2" />
          新規デバイス追加
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex mb-4">
          {LIFECYCLE_STAGES.map((stage) => (
            <div key={stage.id} className="flex-1 text-center">
              <div className={`h-2 ${stage.color} rounded-full mb-2`}></div>
              <span className="text-sm font-medium text-gray-700">{stage.name}</span>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="border border-gray-200 rounded-md p-4 hover:shadow-md transition duration-300">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => handleDeviceClick(device)}>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${LIFECYCLE_STAGES[device.stage - 1].color} mr-3`}></div>
                  <span className="font-medium text-gray-800">{device.name}</span>
                </div>
                {selectedDevice && selectedDevice.id === device.id ? (
                  <ChevronUp size={20} className="text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </div>
              {selectedDevice && selectedDevice.id === device.id && (
                <div className="mt-4 pl-6 border-l-2 border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">タイプ: {device.type}</p>
                  <p className="text-sm text-gray-600 mb-2">購入日: {device.purchaseDate}</p>
                  <div className="flex items-center mt-4">
                    <button
                      onClick={() => handleUpdateStage(device.id, Math.min(device.stage + 1, 5))}
                      className="mr-2 bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition duration-300"
                    >
                      次のステージへ
                    </button>
                    <button
                      onClick={() => handleDeleteDevice(device.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition duration-300 flex items-center"
                    >
                      <Trash2 size={14} className="mr-1" />
                      削除
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">新規デバイス追加</h2>
            <input
              type="text"
              placeholder="デバイス名"
              className="w-full mb-3 p-2 border border-gray-300 rounded-md"
              value={newDevice.name}
              onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="デバイスタイプ"
              className="w-full mb-3 p-2 border border-gray-300 rounded-md"
              value={newDevice.type}
              onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
            />
            <input
              type="date"
              className="w-full mb-3 p-2 border border-gray-300 rounded-md"
              value={newDevice.purchaseDate}
              onChange={(e) => setNewDevice({ ...newDevice, purchaseDate: e.target.value })}
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-300"
              >
                キャンセル
              </button>
              <button
                onClick={handleAddDevice}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              >
                追加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceLifecycle;