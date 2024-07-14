import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { KPICard } from './UI/KPICard'; // Assuming KPICard component is in a UI directory

const data = [
  {
    subject: 'ブランド力',
    A: 70,
    B: 85,
    fullMark: 100,
  },
  {
    subject: '商品力',
    A: 98,
    B: 88,
    fullMark: 100,
  },
  {
    subject: '価格競争力',
    A: 86,
    B: 65,
    fullMark: 100,
  },
  {
    subject: 'マーケティング力',
    A: 99,
    B: 95,
    fullMark: 100,
  },
  {
    subject: '顧客満足度',
    A: 80,
    B: 90,
    fullMark: 100,
  },
];

const CompetitiveAnalysis = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">競合分析</h2>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="mb-6 md:mb-0 w-full md:w-1/2">
          <RadarChart cx={150} cy={150} outerRadius={100} width={300} height={300} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="自社" dataKey="A" stroke="#006400" fill="#98FB98" fillOpacity={0.6} />
            <Radar name="競合A社" dataKey="B" stroke="#333333" fill="#cccccc" fillOpacity={0.6} />
          </RadarChart>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-1/2">
          <KPICard title="競合比較" value="A社" color="bg-gray-200" />
          {data.map((item, index) => (
            <KPICard
              key={index}
              title={item.subject}
              value={`自社: ${item.A} / 競合A社: ${item.B}`}
              color={item.A > item.B ? 'bg-green-100' : 'bg-red-100'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitiveAnalysis;