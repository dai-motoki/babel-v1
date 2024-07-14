import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Coffee, Leaf, ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';

const CompetitiveAnalysis = () => {
  const [competitors, setCompetitors] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('marketShare');

  useEffect(() => {
    // 競合他社のデータをフェッチする代わりに、モックデータを使用
    const mockData = [
      { name: '自社', marketShare: 35, customerSatisfaction: 4.5, productRange: 50, onlinePresence: 80, price: 3, growthRate: 15 },
      { name: '競合A', marketShare: 25, customerSatisfaction: 4.2, productRange: 40, onlinePresence: 70, price: 4, growthRate: 10 },
      { name: '競合B', marketShare: 20, customerSatisfaction: 4.0, productRange: 30, onlinePresence: 60, price: 2, growthRate: 8 },
      { name: '競合C', marketShare: 15, customerSatisfaction: 3.8, productRange: 25, onlinePresence: 50, price: 3, growthRate: 5 },
    ];
    setCompetitors(mockData);
  }, []);

  const metrics = [
    { key: 'marketShare', name: '市場シェア', icon: <ShoppingBag className="w-5 h-5" /> },
    { key: 'customerSatisfaction', name: '顧客満足度', icon: <Users className="w-5 h-5" /> },
    { key: 'productRange', name: '商品種類', icon: <Coffee className="w-5 h-5" /> },
    { key: 'onlinePresence', name: 'オンラインプレゼンス', icon: <Leaf className="w-5 h-5" /> },
    { key: 'price', name: '価格競争力', icon: <DollarSign className="w-5 h-5" /> },
    { key: 'growthRate', name: '成長率', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
  };

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-green-800 mb-6">競合分析</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-green-700 mb-4">分析指標の選択</h3>
        <div className="flex flex-wrap gap-4">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => handleMetricChange(metric.key)}
              className={`flex items-center px-4 py-2 rounded-full transition-colors duration-300 ${
                selectedMetric === metric.key
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-green-700 hover:bg-green-100'
              }`}
            >
              {metric.icon}
              <span className="ml-2">{metric.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold text-green-700 mb-4">
          {metrics.find((m) => m.key === selectedMetric).name}の比較
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={competitors}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
              }}
            />
            <Legend />
            <Bar dataKey={selectedMetric} fill="#48bb78" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-green-700 mb-4">分析結果サマリー</h3>
        <div className="bg-white p-6 rounded-lg shadow-inner">
          <ul className="space-y-4">
            {competitors.map((competitor) => (
              <li key={competitor.name} className="flex items-start">
                <div className={`w-3 h-3 rounded-full mt-1.5 mr-3 ${competitor.name === '自社' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <div>
                  <h4 className="font-semibold text-gray-700">{competitor.name}</h4>
                  <p className="text-sm text-gray-600">
                    {selectedMetric === 'marketShare' && `市場シェア: ${competitor.marketShare}%`}
                    {selectedMetric === 'customerSatisfaction' && `顧客満足度: ${competitor.customerSatisfaction}/5`}
                    {selectedMetric === 'productRange' && `商品種類: ${competitor.productRange}`}
                    {selectedMetric === 'onlinePresence' && `オンラインプレゼンス: ${competitor.onlinePresence}/100`}
                    {selectedMetric === 'price' && `価格競争力: ${competitor.price}/5`}
                    {selectedMetric === 'growthRate' && `成長率: ${competitor.growthRate}%`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-green-700 mb-4">改善点と戦略</h3>
        <div className="bg-white p-6 rounded-lg shadow-inner">
          <p className="text-gray-700 leading-relaxed">
            当社の{metrics.find((m) => m.key === selectedMetric).name}は競合他社と比較して
            {competitors[0][selectedMetric] > competitors.slice(1).reduce((max, comp) => Math.max(max, comp[selectedMetric]), 0)
              ? '優位な'
              : '改善の余地がある'}
            位置にあります。今後は、
            {selectedMetric === 'marketShare' && '新規顧客の獲得とブランド認知度の向上に注力し、'}
            {selectedMetric === 'customerSatisfaction' && 'カスタマーサービスの質を向上させ、'}
            {selectedMetric === 'productRange' && '商品ラインナップの拡充と独自性の強化を図り、'}
            {selectedMetric === 'onlinePresence' && 'デジタルマーケティング戦略を強化し、'}
            {selectedMetric === 'price' && '原価管理と価格戦略の最適化を行い、'}
            {selectedMetric === 'growthRate' && '新規市場の開拓と既存顧客のリピート率向上を目指し、'}
            競争力を高めていく必要があります。
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveAnalysis;