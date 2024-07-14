import React, { useState, useEffect } from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle, X } from 'lucide-react';

const SecurityEnforcement = () => {
  const [securityStatus, setSecurityStatus] = useState({
    firewallEnabled: true,
    antivirusUpdated: false,
    twoFactorAuth: true,
    dataEncryption: true,
    passwordStrength: 'medium',
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // 初期通知の設定
    setNotifications([
      { id: 1, message: 'システムスキャンが完了しました', type: 'info' },
      { id: 2, message: 'ファイアウォールルールが更新されました', type: 'success' },
    ]);
  }, []);

  const toggleSecurity = (key) => {
    setSecurityStatus(prevStatus => ({
      ...prevStatus,
      [key]: !prevStatus[key]
    }));
  };

  const updatePasswordStrength = (strength) => {
    setSecurityStatus(prevStatus => ({
      ...prevStatus,
      passwordStrength: strength
    }));
  };

  const addNotification = (message, type) => {
    const newNotification = {
      id: Date.now(),
      message,
      type
    };
    setNotifications(prevNotifications => [...prevNotifications, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  const getStatusColor = (status) => {
    return status ? 'text-green-500' : 'text-red-500';
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 'weak': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'strong': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-3xl font-bold flex items-center">
            <Shield className="mr-4" size={32} />
            セキュリティ強化ダッシュボード
          </h1>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Lock className="mr-2" size={24} />
                セキュリティステータス
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <span>ファイアウォール</span>
                  <button
                    onClick={() => toggleSecurity('firewallEnabled')}
                    className={`px-4 py-2 rounded ${
                      securityStatus.firewallEnabled
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {securityStatus.firewallEnabled ? '有効' : '無効'}
                  </button>
                </li>
                <li className="flex items-center justify-between">
                  <span>アンチウイルス</span>
                  <button
                    onClick={() => toggleSecurity('antivirusUpdated')}
                    className={`px-4 py-2 rounded ${
                      securityStatus.antivirusUpdated
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 text-white'
                    }`}
                  >
                    {securityStatus.antivirusUpdated ? '最新' : '要更新'}
                  </button>
                </li>
                <li className="flex items-center justify-between">
                  <span>二要素認証</span>
                  <button
                    onClick={() => toggleSecurity('twoFactorAuth')}
                    className={`px-4 py-2 rounded ${
                      securityStatus.twoFactorAuth
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {securityStatus.twoFactorAuth ? '有効' : '無効'}
                  </button>
                </li>
                <li className="flex items-center justify-between">
                  <span>データ暗号化</span>
                  <button
                    onClick={() => toggleSecurity('dataEncryption')}
                    className={`px-4 py-2 rounded ${
                      securityStatus.dataEncryption
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {securityStatus.dataEncryption ? '有効' : '無効'}
                  </button>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">パスワード強度</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className={`text-lg font-medium ${getPasswordStrengthColor(securityStatus.passwordStrength)}`}>
                    {securityStatus.passwordStrength.charAt(0).toUpperCase() + securityStatus.passwordStrength.slice(1)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updatePasswordStrength('weak')}
                    className={`px-4 py-2 rounded ${
                      securityStatus.passwordStrength === 'weak'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    弱い
                  </button>
                  <button
                    onClick={() => updatePasswordStrength('medium')}
                    className={`px-4 py-2 rounded ${
                      securityStatus.passwordStrength === 'medium'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    中程度
                  </button>
                  <button
                    onClick={() => updatePasswordStrength('strong')}
                    className={`px-4 py-2 rounded ${
                      securityStatus.passwordStrength === 'strong'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    強い
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2" size={24} />
              セキュリティ通知
            </h2>
            <div className="space-y-4">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    notification.type === 'info'
                      ? 'bg-blue-100 text-blue-800'
                      : notification.type === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  <div className="flex items-center">
                    {notification.type === 'info' && <AlertTriangle className="mr-2" size={20} />}
                    {notification.type === 'success' && <CheckCircle className="mr-2" size={20} />}
                    {notification.type === 'warning' && <AlertTriangle className="mr-2" size={20} />}
                    <span>{notification.message}</span>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityEnforcement;