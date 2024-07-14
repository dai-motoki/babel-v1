import React from 'react';
import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowDownCircle, Info } from 'lucide-react';

// マーケティングファネルのデータ
const data = [
  { name: '認知', value: 5000, fill: '#8884d8', description: '潜在顧客に製品やサービスを知ってもらう段階' },
  { name: '興味', value: 3000, fill: '#83a6ed', description: '製品やサービスに興味を持ってもらう段階' },
  { name: '検討', value: 2000, fill: '#8dd1e1', description: '購入を検討してもらう段階' },
  { name: '購入', value: 1000, fill: '#82ca9d', description: '実際に購入してもらう段階' },
  { name: 'リピート', value: 500, fill: '#a4de6c', description: '再購入や継続利用してもらう段階' },
];

const MarketingFunnel = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">マーケティングファネル分析</h2>
      <div className="flex flex-col lg:flex-row items-start justify-between">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <ResponsiveContainer width="100%" height={400}>
            <FunnelChart>
              <Tooltip content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-4 rounded shadow-md">
                      <p className="font-bold">{data.name}</p>
                      <p>数値: {data.value}</p>
                      <p className="text-sm text-gray-600">{data.description}</p>
                    </div>
                  );
                }
                return null;
              }} />
              <Funnel
                dataKey="value"
                data={data}
                isAnimationActive
                labelLine={false}
              >
                <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/2 lg:pl-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">ファネル詳細</h3>
          <ul className="space-y-6">
            {data.map((item, index) => (
              <li key={item.name} className="bg-white p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 rounded-full mr-3" style={{ backgroundColor: item.fill }}></div>
                  <span className="font-bold text-lg">{item.name}</span>
                  <span className="ml-auto text-xl font-semibold">{item.value.toLocaleString()}</span>
                </div>
                <p className="text-gray-600 ml-9">{item.description}</p>
                {index < data.length - 1 && (
                  <ArrowDownCircle className="ml-9 mt-2 text-gray-400" size={20} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 p-4 bg-blue-50 rounded-lg flex items-start">
        <Info className="text-blue-500 mr-3 flex-shrink-0 mt-1" size={24} />
        <p className="text-sm text-gray-700">
          このマーケティングファネルは、顧客獲得プロセスの各段階における潜在顧客の数を視覚化しています。
          上部の「認知」から下部の「リピート」まで、顧客がどのように移動していくかを示しています。
          各段階でのドロップオフを分析し、改善点を見つけることで、全体的な顧客獲得効率を向上させることができます。
        </p>
      </div>
    </div>
  );
};

export default MarketingFunnel;
