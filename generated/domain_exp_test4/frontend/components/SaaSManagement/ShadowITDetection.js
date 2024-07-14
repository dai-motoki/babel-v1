import React, { useState, useEffect } from 'react';
import { AlertTriangle, BarChart2, ShieldCheck, Eye } from 'lucide-react';

// シャドーIT検出コンポーネント
const ShadowITDetection = () => {
  // シャドーITデータの状態
  const [shadowITData, setShadowITData] = useState([]);
  // リスクレベルの状態
  const [riskLevel, setRiskLevel] = useState('中');
  // 選択されたアプリの状態
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    // モックデータの取得（実際の環境では、APIからデータを取得する）
    const mockData = [
      { id: 1, name: '未承認クラウドストレージ', risk: 'high', users: 15, dataExposure: '高' },
      { id: 2, name: '個人用メッセンジャーアプリ', risk: 'medium', users: 8, dataExposure: '中' },
      { id: 3, name: '非公式プロジェクト管理ツール', risk: 'low', users: 5, dataExposure: '低' },
      { id: 4, name: '未承認ファイル共有サービス', risk: 'high', users: 12, dataExposure: '高' },
      { id: 5, name: '個人用生産性アプリ', risk: 'medium', users: 7, dataExposure: '中' },
    ];
    setShadowITData(mockData);
  }, []);

  // アプリクリック時のハンドラー
  const handleAppClick = (app) => {
    setSelectedApp(app);
  };

  // リスクレベルに応じた色を取得する関数
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">シャドーIT検出</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          {/* 検出されたシャドーITアプリケーション */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-yellow-500" />
              検出されたシャドーITアプリケーション
            </h2>
            <div className="space-y-4">
              {shadowITData.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleAppClick(app)}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-4 ${getRiskColor(app.risk)}`}></div>
                    <span className="font-medium">{app.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{app.users} ユーザー</span>
                </div>
              ))}
            </div>
          </div>
          {/* リスク評価 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart2 className="mr-2 text-blue-500" />
              リスク評価
            </h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium">全体的なリスクレベル:</span>
              <span className={`px-3 py-1 rounded-full text-white ${getRiskColor(riskLevel)}`}>
                {riskLevel}
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                style={{ width: '60%' }}
              ></div>
            </div>
          </div>
        </div>
        {/* 対策と推奨事項 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <ShieldCheck className="mr-2 text-green-500" />
            対策と推奨事項
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Eye className="mr-2 mt-1 text-blue-500" />
              <span>定期的なネットワークトラフィック監視を実施</span>
            </li>
            <li className="flex items-start">
              <Eye className="mr-2 mt-1 text-blue-500" />
              <span>従業員向けセキュリティ意識向上トレーニングの実施</span>
            </li>
            <li className="flex items-start">
              <Eye className="mr-2 mt-1 text-blue-500" />
              <span>承認済みアプリケーションリストの定期的な更新と共有</span>
            </li>
          </ul>
        </div>
      </div>
      {/* 選択されたアプリの詳細モーダル */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h3 className="text-xl font-semibold mb-4">{selectedApp.name}</h3>
            <p className="mb-2">リスクレベル: <span className={`px-2 py-1 rounded-full text-white ${getRiskColor(selectedApp.risk)}`}>{selectedApp.risk}</span></p>
            <p className="mb-2">使用ユーザー数: {selectedApp.users}</p>
            <p className="mb-4">データ露出リスク: {selectedApp.dataExposure}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={() => setSelectedApp(null)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShadowITDetection;