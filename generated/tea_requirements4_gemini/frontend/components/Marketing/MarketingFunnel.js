import { useState } from 'react';
import { Funnel } from 'lucide-react';

const funnelData = [
  { stage: '認知', value: 1000 },
  { stage: '興味', value: 500 },
  { stage: '検討', value: 250 },
  { stage: '購入', value: 100 },
  { stage: 'リピート', value: 50 },
];

const MarketingFunnel = () => {
  const [selectedStage, setSelectedStage] = useState(null);

  const handleStageClick = (stage) => {
    setSelectedStage(stage);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Funnel className="w-6 h-6 mr-2 text-green-500" />
        マーケティングファネル
      </h2>
      <div className="relative h-64 w-full mx-auto">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon
            points="0,0 100,0 50,100"
            fill="url(#funnelGradient)"
          />
          <defs>
            <linearGradient id="funnelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#98FB98" />
              <stop offset="100%" stopColor="#006400" />
            </linearGradient>
          </defs>
        </svg>
        {funnelData.map((stageData, index) => {
          const stageWidth = 100 - index * 20;
          const stageHeight = 100 / funnelData.length;
          const stageY = stageHeight * index;
          const valuePercentage =
            (stageData.value / funnelData[0].value) * 100;

          return (
            <div
              key={stageData.stage}
              className={`absolute w-[${stageWidth}%] h-[${stageHeight}%] top-[${stageY}%] left-[${
                (100 - stageWidth) / 2
              }%] cursor-pointer`}
              onClick={() => handleStageClick(stageData.stage)}
            >
              <div
                className={`relative h-full bg-white bg-opacity-20 rounded-lg transition-all duration-300 ${
                  selectedStage === stageData.stage &&
                  'bg-opacity-40 transform scale-105'
                }`}
              >
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-sm font-bold text-gray-800">
                    {stageData.stage}
                  </p>
                  <p className="text-xs text-gray-600">
                    {stageData.value.toLocaleString()} 人 (
                    {valuePercentage.toFixed(1)}%)
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedStage && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {selectedStage} ステージの詳細
          </h3>
          {/* ここにステージごとの詳細情報を表示 */}
          <p>
            {selectedStage} ステージに関する詳細なデータや分析結果などをここに表示します。
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketingFunnel;