import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Laptop, HardDrive, Cpu, Database, Monitor } from 'lucide-react';

const HardwareSoftwareInfo = () => {
  const [devices, setDevices] = useState([]);
  const [expandedDevices, setExpandedDevices] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    // APIからデータを取得する代わりにモックデータを使用
    const mockDevices = [
      {
        id: 1,
        name: 'ワークステーション1',
        type: 'デスクトップPC',
        hardware: {
          cpu: 'Intel Core i7-11700K',
          ram: '32GB DDR4',
          storage: '1TB NVMe SSD',
          gpu: 'NVIDIA GeForce RTX 3080',
        },
        software: {
          os: 'Windows 10 Pro',
          applications: ['Adobe Creative Suite', 'AutoCAD', 'Visual Studio Code'],
        },
      },
      {
        id: 2,
        name: 'ノートPC1',
        type: 'ラップトップ',
        hardware: {
          cpu: 'AMD Ryzen 7 5800H',
          ram: '16GB DDR4',
          storage: '512GB NVMe SSD',
          gpu: 'NVIDIA GeForce RTX 3060 Mobile',
        },
        software: {
          os: 'macOS Big Sur',
          applications: ['Microsoft Office', 'Sketch', 'Docker'],
        },
      },
    ];
    setDevices(mockDevices);
  }, []);

  const toggleDevice = (deviceId) => {
    setExpandedDevices(prev => ({
      ...prev,
      [deviceId]: !prev[deviceId]
    }));
  };

  const toggleCategory = (deviceId, category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [`${deviceId}-${category}`]: !prev[`${deviceId}-${category}`]
    }));
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'デスクトップPC':
        return <Monitor className="w-6 h-6 text-indigo-600" />;
      case 'ラップトップ':
        return <Laptop className="w-6 h-6 text-indigo-600" />;
      default:
        return <HardDrive className="w-6 h-6 text-indigo-600" />;
    }
  };

  const renderCategoryIcon = (category) => {
    switch (category) {
      case 'hardware':
        return <Cpu className="w-5 h-5 text-indigo-500" />;
      case 'software':
        return <Database className="w-5 h-5 text-indigo-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-200 pb-2">
        ハードウェア・ソフトウェア情報
      </h2>
      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleDevice(device.id)}
            >
              {expandedDevices[device.id] ? (
                <ChevronDown className="w-5 h-5 text-indigo-600 mr-2" />
              ) : (
                <ChevronRight className="w-5 h-5 text-indigo-600 mr-2" />
              )}
              {renderIcon(device.type)}
              <span className="ml-2 text-lg font-medium text-gray-700">{device.name}</span>
              <span className="ml-2 text-sm text-gray-500">({device.type})</span>
            </div>
            {expandedDevices[device.id] && (
              <div className="mt-4 ml-6 space-y-4">
                {['hardware', 'software'].map((category) => (
                  <div key={category} className="border-l-2 border-indigo-100 pl-4">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleCategory(device.id, category)}
                    >
                      {expandedCategories[`${device.id}-${category}`] ? (
                        <ChevronDown className="w-4 h-4 text-indigo-500 mr-2" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-indigo-500 mr-2" />
                      )}
                      {renderCategoryIcon(category)}
                      <span className="ml-2 text-md font-medium text-gray-600 capitalize">
                        {category}
                      </span>
                    </div>
                    {expandedCategories[`${device.id}-${category}`] && (
                      <div className="mt-2 ml-6 space-y-2">
                        {Object.entries(device[category]).map(([key, value]) => (
                          <div key={key} className="flex items-start">
                            <span className="text-sm font-medium text-gray-500 min-w-[100px]">
                              {key}:
                            </span>
                            <span className="text-sm text-gray-700 ml-2">
                              {Array.isArray(value) ? value.join(', ') : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HardwareSoftwareInfo;