import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, MapPin, RefreshCw } from 'lucide-react';

const ThreatDetection = () => {
  const [threats, setThreats] = useState([]);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [mapCoordinates, setMapCoordinates] = useState([]);

  useEffect(() => {
    // 脅威データの初期ロード
    fetchThreats();
    // 5秒ごとにデータを更新
    const interval = setInterval(fetchThreats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchThreats = () => {
    // APIからの脅威データ取得をシミュレート
    const mockThreats = [
      { id: 1, type: 'マルウェア', severity: 'high', location: '東京', timestamp: new Date().toISOString() },
      { id: 2, type: 'フィッシング', severity: 'medium', location: '大阪', timestamp: new Date().toISOString() },
      { id: 3, type: '不正アクセス', severity: 'low', location: '福岡', timestamp: new Date().toISOString() },
    ];
    setThreats(mockThreats);
    updateMapCoordinates(mockThreats);
  };

  const updateMapCoordinates = (threats) => {
    // 実際のアプリケーションでは、位置情報をAPIから取得します
    const coordinates = threats.map(threat => ({
      id: threat.id,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setMapCoordinates(coordinates);
  };

  const handleThreatSelect = (threat) => {
    setSelectedThreat(threat);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-red-500 pb-2">脅威検出ダッシュボード</h1>
      
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-red-500" />
              リアルタイムアラート
            </h2>
            <ul className="space-y-4">
              {threats.map(threat => (
                <li 
                  key={threat.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300"
                  onClick={() => handleThreatSelect(threat)}
                >
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-3 ${getSeverityColor(threat.severity)}`}></span>
                    <span className="font-medium">{threat.type}</span>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(threat.timestamp).toLocaleTimeString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 px-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="mr-2 text-blue-500" />
              脅威マップ
            </h2>
            <div className="relative w-full h-64 bg-gray-200 rounded-md overflow-hidden">
              {/* 脅威マップの表示エリア */}
              {mapCoordinates.map(coord => (
                <div
                  key={coord.id}
                  className="absolute w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedThreat && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2 text-green-500" />
            脅威詳細
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">種類: {selectedThreat.type}</p>
              <p className="font-medium">深刻度: 
                <span className={`ml-2 px-2 py-1 rounded text-white ${getSeverityColor(selectedThreat.severity)}`}>
                  {selectedThreat.severity}
                </span>
              </p>
            </div>
            <div>
              <p className="font-medium">場所: {selectedThreat.location}</p>
              <p className="font-medium">検出時刻: {new Date(selectedThreat.timestamp).toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-medium mb-2">推奨アクション:</h3>
            <ul className="list-disc list-inside">
              <li>影響を受けるシステムを隔離する</li>
              <li>セキュリティパッチを適用する</li>
              <li>ログを分析し、侵入経路を特定する</li>
            </ul>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          onClick={fetchThreats}
        >
          <RefreshCw className="mr-2" />
          データ更新
        </button>
      </div>
    </div>
  );
};

export default ThreatDetection;