import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowRight, Users, ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';

const MarketingFunnel = () => {
  const [funnelData, setFunnelData] = useState([]);
  const [conversionRates, setConversionRates] = useState({});

  useEffect(() => {
    // モックデータの生成
    const generateMockData = () => {
      const stages = ['認知', '興味', '検討', '購入', 'リピート'];
      const data = stages.map((stage, index) => ({
        stage,
        users: Math.floor(1000 / (index + 1)),
      }));
      setFunnelData(data);

      // 変換率の計算
      const rates = {};
      for (let i = 1; i < data.length; i++) {
        rates[stages[i]] = ((data[i].users / data[i-1].users) * 100).toFixed(2);
      }
      setConversionRates(rates);
    };

    generateMockData();
  }, []);

  const funnelColors = [
    'bg-green-100',
    'bg-green-200',
    'bg-green-300',
    'bg-green-400',
    'bg-green-500',
  ];

  const getIcon = (stage) => {
    switch (stage) {
      case '認知':
        return <Users className="w-6 h-6 text-green-800" />;
      case '興味':
        return <ArrowRight className="w-6 h-6 text-green-800" />;
      case '検討':
        return <ShoppingCart className="w-6 h-6 text-green-800" />;
      case '購入':
        return <CreditCard className="w-6 h-6 text-green-800" />;
      case 'リピート':
        return <CheckCircle className="w-6 h-6 text-green-800" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6">マーケティングファネル</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="relative">
            {funnelData.map((item, index) => (
              <div
                key={item.stage}
                className={`${funnelColors[index]} p-4 mb-2 rounded-lg transition-all duration-300 hover:shadow-lg`}
                style={{
                  width: `${(item.users / funnelData[0].users) * 100}%`,
                  marginLeft: `${(1 - item.users / funnelData[0].users) * 50}%`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getIcon(item.stage)}
                    <span className="ml-2 font-semibold text-green-800">{item.stage}</span>
                  </div>
                  <span className="font-bold text-green-800">{item.users}</span>
                </div>
                {index > 0 && (
                  <div className="text-sm text-green-700 mt-1">
                    変換率: {conversionRates[item.stage]}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={funnelData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#006400" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-green-800 mb-4">ファネル最適化のヒント</h3>
        <ul className="list-disc list-inside space-y-2 text-green-700">
          <li>認知段階: ソーシャルメディア広告やコンテンツマーケティングを強化</li>
          <li>興味段階: 魅力的な製品説明とお茶の効能に関する情報を提供</li>
          <li>検討段階: カスタマーレビューや比較表を活用して製品の価値を強調</li>
          <li>購入段階: チェックアウトプロセスを簡素化し、安全性を強調</li>
          <li>リピート段階: ロイヤルティプログラムや定期購入オプションを提供</li>
        </ul>
      </div>
      <div className="mt-8 bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-2">お茶の知恵袋</h3>
        <p className="text-green-700">
          「一期一会」の精神で、お客様との出会いを大切にしましょう。
          お茶を通じて、心を込めたサービスを提供することで、
          お客様との絆を深め、リピーターを増やすことができます。
        </p>
      </div>
      <div className="mt-8 flex justify-end">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300">
          詳細分析を表示
        </button>
      </div>
    </div>
  );
};

export default MarketingFunnel;