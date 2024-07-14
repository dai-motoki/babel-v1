import { useState, useEffect } from 'react';

// デバイス管理のカスタムフック
export const useDeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        // APIからデバイス情報を取得する想定（ここではモックデータを使用）
        const response = await new Promise(resolve => 
          setTimeout(() => resolve([
            { id: 1, name: 'デスクトップPC', status: 'アクティブ', lastSeen: '2023-05-01' },
            { id: 2, name: 'ノートPC', status: 'オフライン', lastSeen: '2023-04-28' },
            { id: 3, name: 'タブレット', status: 'アクティブ', lastSeen: '2023-05-02' },
          ]), 1000)
        );
        setDevices(response);
        setLoading(false);
      } catch (err) {
        setError('デバイス情報の取得に失敗しました');
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return { devices, loading, error };
};

// SaaS使用状況のカスタムフック
export const useSaaSUsage = () => {
  const [saasUsage, setSaasUsage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSaaSUsage = async () => {
      try {
        // APIからSaaS使用状況を取得する想定（ここではモックデータを使用）
        const response = await new Promise(resolve => 
          setTimeout(() => resolve([
            { id: 1, name: 'Salesforce', users: 50, lastSync: '2023-05-02', status: 'アクティブ' },
            { id: 2, name: 'Office 365', users: 100, lastSync: '2023-05-01', status: 'アクティブ' },
            { id: 3, name: 'Slack', users: 75, lastSync: '2023-05-02', status: 'アクティブ' },
          ]), 1000)
        );
        setSaasUsage(response);
        setLoading(false);
      } catch (err) {
        setError('SaaS使用状況の取得に失敗しました');
        setLoading(false);
      }
    };

    fetchSaaSUsage();
  }, []);

  return { saasUsage, loading, error };
};
import React from 'react';
import { useDeviceManagement, useSaaSUsage } from './hooks';
import { FiMonitor, FiLaptop, FiTablet, FiAlertCircle } from 'react-icons/fi';

const DeviceManagement = () => {
  const { devices, loading: devicesLoading, error: devicesError } = useDeviceManagement();
  const { saasUsage, loading: saasLoading, error: saasError } = useSaaSUsage();

  const getDeviceIcon = (deviceName) => {
    if (deviceName.toLowerCase().includes('デスクトップ')) return <FiMonitor className="text-indigo-600" />;
    if (deviceName.toLowerCase().includes('ノート')) return <FiLaptop className="text-indigo-600" />;
    if (deviceName.toLowerCase().includes('タブレット')) return <FiTablet className="text-indigo-600" />;
    return <FiMonitor className="text-indigo-600" />;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">デバイス管理</h1>
        
        {/* デバイス一覧 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">デバイス一覧</h2>
          {devicesLoading ? (
            <p className="text-gray-600">読み込み中...</p>
          ) : devicesError ? (
            <p className="text-red-500">{devicesError}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devices.map((device) => (
                <div key={device.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-2">
                    {getDeviceIcon(device.name)}
                    <h3 className="text-lg font-medium text-gray-800 ml-2">{device.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">ステータス: {device.status}</p>
                  <p className="text-sm text-gray-600">最終確認: {device.lastSeen}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SaaS使用状況 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">SaaS使用状況</h2>
          {saasLoading ? (
            <p className="text-gray-600">読み込み中...</p>
          ) : saasError ? (
            <p className="text-red-500">{saasError}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-sm font-semibold text-gray-700">サービス名</th>
                    <th className="p-3 text-sm font-semibold text-gray-700">ユーザー数</th>
                    <th className="p-3 text-sm font-semibold text-gray-700">最終同期</th>
                    <th className="p-3 text-sm font-semibold text-gray-700">ステータス</th>
                  </tr>
                </thead>
                <tbody>
                  {saasUsage.map((service) => (
                    <tr key={service.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-700">{service.name}</td>
                      <td className="p-3 text-sm text-gray-700">{service.users}</td>
                      <td className="p-3 text-sm text-gray-700">{service.lastSync}</td>
                      <td className="p-3 text-sm text-gray-700">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          service.status === 'アクティブ' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {service.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;