import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronsDown, Users, ShoppingCart, CreditCard, Package } from 'lucide-react';

const MarketingFunnel = () => {
  const [funnelData, setFunnelData] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);

  useEffect(() => {
    // 実際のアプリケーションではAPIからデータを取得します
    const mockData = [
      { stage: '認知', value: 1000, color: '#98FB98' },
      { stage: '興味', value: 750, color: '#7CFC00' },
      { stage: '検討', value: 500, color: '#32CD32' },
      { stage: '購入', value: 250, color: '#228B22' },
      { stage: 'リピート', value: 100, color: '#006400' },
    ];
    setFunnelData(mockData);
  }, []);

  const getStageIcon = (stage) => {
    switch (stage) {
      case '認知':
        return <Users className="w-6 h-6" />;
      case '興味':
        return <ChevronsDown className="w-6 h-6" />;
      case '検討':
        return <ShoppingCart className="w-6 h-6" />;
      case '購入':
        return <CreditCard className="w-6 h-6" />;
      case 'リピート':
        return <Package className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const handleStageClick = (stage) => {
    setSelectedStage(stage);
  };

  const renderFunnelStages = () => {
    return funnelData.map((stage, index) => (
      <div
        key={stage.stage}
        className="relative flex items-center justify-center mb-4 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
        style={{
          width: `${100 - index * 15}%`,
          height: '60px',
          backgroundColor: stage.color,
        }}
        onClick={() => handleStageClick(stage)}
      >
        <div className="flex items-center space-x-2 text-white font-semibold">
          {getStageIcon(stage.stage)}
          <span>{stage.stage}</span>
          <span>({stage.value})</span>
        </div>
        {index < funnelData.length - 1 && (
          <ChevronsDown className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-gray-400" />
        )}
      </div>
    ));
  };

  const renderStageDetails = () => {
    if (!selectedStage) return null;

    const mockChartData = [
      { name: '1月', value: Math.floor(Math.random() * 1000) },
      { name: '2月', value: Math.floor(Math.random() * 1000) },
      { name: '3月', value: Math.floor(Math.random() * 1000) },
      { name: '4月', value: Math.floor(Math.random() * 1000) },
      { name: '5月', value: Math.floor(Math.random() * 1000) },
      { name: '6月', value: Math.floor(Math.random() * 1000) },
    ];

    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{selectedStage.stage}の詳細</h3>
        <div className="mb-6">
          <p className="text-lg text-gray-700">現在の値: <span className="font-semibold">{selectedStage.value}</span></p>
          <p className="text-sm text-gray-500">前月比: <span className="text-green-500">+5%</span></p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#006400" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">マーケティングファネル</h2>
      <div className="flex flex-col items-center space-y-4 mb-8">
        {renderFunnelStages()}
      </div>
      {renderStageDetails()}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">ファネル改善のヒント</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>認知段階: ソーシャルメディア広告とコンテンツマーケティングを強化する</li>
          <li>興味段階: 商品のユニークな価値提案を明確に伝える</li>
          <li>検討段階: カスタマーレビューと商品比較ツールを提供する</li>
          <li>購入段階: チェックアウトプロセスを簡素化し、複数の支払いオプションを提供する</li>
          <li>リピート段階: ロイヤルティプログラムとパーソナライズされたオファーを実装する</li>
        </ul>
      </div>
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="text-lg font-semibold mb-2 text-green-800">和風テイストのマーケティングアイデア</h4>
        <ul className="list-disc list-inside space-y-2 text-green-700">
          <li>季節ごとの限定抹茶フレーバーを導入し、日本の四季を表現</li>
          <li>茶道体験イベントを開催し、伝統文化と商品を結びつける</li>
          <li>和紙をモチーフにしたパッケージデザインで商品の高級感を演出</li>
          <li>日本の庭園をイメージしたインスタ映えするカフェ空間の創出</li>
        </ul>
      </div>
    </div>
  );
};

export default MarketingFunnel;