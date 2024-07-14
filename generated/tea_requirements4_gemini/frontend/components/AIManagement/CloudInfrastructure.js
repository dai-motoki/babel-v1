import { useState } from 'react';
import { Cloud, Database, Server } from 'lucide-react';

const CloudInfrastructure = () => {
  const [selectedRegion, setSelectedRegion] = useState('tokyo');

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  const regions = [
    { id: 'tokyo', name: '東京リージョン', active: selectedRegion === 'tokyo' },
    { id: 'osaka', name: '大阪リージョン', active: selectedRegion === 'osaka' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        クラウドインフラ
      </h2>

      <div className="flex items-center mb-6">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => handleRegionChange(region.id)}
            className={`px-4 py-2 rounded-md mr-2 font-medium ${
              region.active
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {region.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <Cloud className="text-green-500 h-6 w-6 mr-2" />
            <h3 className="text-lg font-medium text-gray-800">
              Webサーバー
            </h3>
          </div>
          <p className="text-gray-600">
            東京リージョンで稼働しているWebサーバー群です。
            負荷分散とオートスケーリングにより、安定したサービスを提供します。
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <Database className="text-green-500 h-6 w-6 mr-2" />
            <h3 className="text-lg font-medium text-gray-800">
              データベース
            </h3>
          </div>
          <p className="text-gray-600">
            高可用性とデータ整合性を重視したデータベース構成です。
            レプリケーションやバックアップにより、データの安全性を確保しています。
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <Server className="text-green-500 h-6 w-6 mr-2" />
            <h3 className="text-lg font-medium text-gray-800">
              APIサーバー
            </h3>
          </div>
          <p className="text-gray-600">
            マイクロサービスアーキテクチャを採用し、スケーラブルなAPIサーバーを構築しています。
            API Gatewayにより、セキュアなアクセスを提供します。
          </p>
        </div>
      </div>
    </div>
  );
};

export default CloudInfrastructure;
