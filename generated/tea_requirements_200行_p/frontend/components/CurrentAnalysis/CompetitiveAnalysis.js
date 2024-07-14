import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Coffee, Users, DollarSign, TrendingUp, Award } from 'lucide-react';

const CompetitiveAnalysis = () => {
  const [selectedMetric, setSelectedMetric] = useState('marketShare');

  const competitors = [
    { name: '自社', color: '#006400' },
    { name: '競合A', color: '#4B0082' },
    { name: '競合B', color: '#8B4513' },
    { name: '競合C', color: '#4682B4' },
  ];

  const metrics = [
    { id: 'marketShare', name: '市場シェア', icon: <TrendingUp size={20} /> },
    { id: 'customerSatisfaction', name: '顧客満足度', icon: <Users size={20} /> },
    { id: 'revenue', name: '売上高', icon: <DollarSign size={20} /> },
    { id: 'productQuality', name: '製品品質', icon: <Coffee size={20} /> },
    { id: 'brandRecognition', name: 'ブランド認知度', icon: <Award size={20} /> },
  ];

  const data = [
    { name: '市場シェア', '自社': 30, '競合A': 25, '競合B': 20, '競合C': 15 },
    { name: '顧客満足度', '自社': 85, '競合A': 80, '競合B': 75, '競合C': 70 },
    { name: '売上高', '自社': 100, '競合A': 90, '競合B': 80, '競合C': 70 },
    { name: '製品品質', '自社': 90, '競合A': 85, '競合B': 80, '競合C': 75 },
    { name: 'ブランド認知度', '自社': 80, '競合A': 85, '競合B': 70, '競合C': 65 },
  ];

  const renderMetricButton = (metric) => (
    <button
      key={metric.id}
      className={`flex items-center p-2 rounded-md transition-colors duration-300 ${
        selectedMetric === metric.id
          ? 'bg-green-700 text-white'
          : 'bg-green-100 text-green-800 hover:bg-green-200'
      }`}
      onClick={() => setSelectedMetric(metric.id)}
    >
      {metric.icon}
      <span className="ml-2 text-sm">{metric.name}</span>
    </button>
  );

  const getMetricData = () => {
    const metricName = metrics.find(m => m.id === selectedMetric).name;
    return data.find(d => d.name === metricName);
  };

  const renderCompetitorCard = (competitor) => {
    const metricData = getMetricData();
    const value = metricData[competitor.name];

    return (
      <div key={competitor.name} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full mb-2" style={{ backgroundColor: competitor.color }}></div>
        <h3 className="text-lg font-semibold mb-2">{competitor.name}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  };

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-800 border-b-2 border-green-300 pb-2">競合分析</h2>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {metrics.map(renderMetricButton)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-green-800">比較グラフ</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[getMetricData()]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {competitors.map(competitor => (
                <Bar key={competitor.name} dataKey={competitor.name} fill={competitor.color} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-800">競合企業の詳細</h3>
          <div className="grid grid-cols-2 gap-4">
            {competitors.map(renderCompetitorCard)}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-green-800">分析結果</h3>
        <p className="text-gray-700 leading-relaxed">
          当社は{getMetricData().name}において、競合他社と比較して優位な位置にあります。
          特に、{competitors[0].name}の{getMetricData()[competitors[0].name]}という数値は業界トップクラスです。
          一方で、{competitors[1].name}も{getMetricData()[competitors[1].name]}と高い数値を示しており、
          今後の動向に注意が必要です。継続的な製品品質の向上と顧客満足度の維持が重要となります。
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-green-800">今後の戦略</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>製品品質のさらなる向上と差別化</li>
          <li>顧客満足度を高めるためのサービス拡充</li>
          <li>ブランド認知度向上のためのマーケティング施策の強化</li>
          <li>新規市場への展開による市場シェアの拡大</li>
          <li>競合他社の動向を継続的に監視し、迅速な対応を行う</li>
        </ul>
      </div>
    </div>
  );
};

export default CompetitiveAnalysis;