import React, { useState, useEffect } from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle, XCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';

const SecurityEnforcement = () => {
  const [securityScore, setSecurityScore] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState('weak');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [firewallStatus, setFirewallStatus] = useState('disabled');
  const [encryptionStatus, setEncryptionStatus] = useState('partial');
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    // 初期データの読み込み（実際のアプリケーションではAPIから取得）
    setSecurityScore(65);
    setPasswordStrength('medium');
    setTwoFactorEnabled(false);
    setFirewallStatus('enabled');
    setEncryptionStatus('partial');
    setVulnerabilities([
      { id: 1, name: 'SQL Injection', severity: 'high' },
      { id: 2, name: 'Cross-Site Scripting (XSS)', severity: 'medium' },
      { id: 3, name: 'Outdated SSL Certificate', severity: 'low' },
    ]);
  }, []);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // パスワード強度の評価（実際のアプリケーションではより複雑なロジックを使用）
    if (newPassword.length < 8) {
      setPasswordStrength('weak');
    } else if (newPassword.length < 12) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const toggleFirewall = () => {
    setFirewallStatus(firewallStatus === 'enabled' ? 'disabled' : 'enabled');
  };

  const upgradeEncryption = () => {
    setEncryptionStatus('full');
  };

  const refreshSecurityScore = () => {
    // 実際のアプリケーションではAPIを呼び出してスコアを更新
    setSecurityScore(Math.floor(Math.random() * 100));
  };

  const getScoreColor = (score) => {
    if (score < 50) return 'text-red-500';
    if (score < 80) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-3xl font-bold flex items-center">
            <Shield className="mr-2" /> セキュリティ強化
          </h1>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Lock className="mr-2" /> セキュリティスコア
            </h2>
            <div className="flex items-center">
              <div className={`text-5xl font-bold ${getScoreColor(securityScore)}`}>
                {securityScore}
              </div>
              <div className="ml-4">
                <button
                  onClick={refreshSecurityScore}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
                >
                  <RefreshCw className="mr-2" /> 更新
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">パスワード強度</h2>
            <div className="mb-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="新しいパスワードを入力"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className={`h-2 flex-grow rounded ${
                passwordStrength === 'weak' ? 'bg-red-500' :
                passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`}></div>
              <span className="ml-2 font-semibold">
                {passwordStrength === 'weak' ? '弱い' :
                 passwordStrength === 'medium' ? '中程度' : '強い'}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2段階認証</h2>
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={toggleTwoFactor}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {twoFactorEnabled ? '有効' : '無効'}
                </span>
              </label>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">ファイアウォール状態</h2>
            <div className="flex items-center">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                firewallStatus === 'enabled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {firewallStatus === 'enabled' ? '有効' : '無効'}
              </span>
              <button
                onClick={toggleFirewall}
                className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                {firewallStatus === 'enabled' ? '無効にする' : '有効にする'}
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">暗号化状態</h2>
            <div className="flex items-center">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                encryptionStatus === 'full' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {encryptionStatus === 'full' ? '完全暗号化' : '部分的暗号化'}
              </span>
              {encryptionStatus !== 'full' && (
                <button
                  onClick={upgradeEncryption}
                  className="ml-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  完全暗号化にアップグレード
                </button>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">検出された脆弱性</h2>
            <ul className="space-y-2">
              {vulnerabilities.map((vuln) => (
                <li key={vuln.id} className="flex items-center p-3 bg-gray-50 rounded">
                  <AlertTriangle className={`mr-2 ${
                    vuln.severity === 'high' ? 'text-red-500' :
                    vuln.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <span>{vuln.name}</span>
                  <span className={`ml-auto px-2 py-1 rounded text-xs font-semibold ${
                    vuln.severity === 'high' ? 'bg-red-100 text-red-800' :
                    vuln.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {vuln.severity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityEnforcement;