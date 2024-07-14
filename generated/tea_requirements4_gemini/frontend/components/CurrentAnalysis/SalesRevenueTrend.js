import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronRightIcon } from '@heroicons/react/24/solid'

const SalesRevenueTrend = () => {

  const data = [
    {
      name: '1月',
      売上: 4000,
      費用: 2400,
      利益: 2400,
    },
    {
      name: '2月',
      売上: 3000,
      費用: 1398,
      利益: 8700,
    },
    {
      name: '3月',
      売上: 2000,
      費用: 9800,
      利益: 2290,
    },
    {
      name: '4月',
      売上: 2780,
      費用: 3908,
      利益: 2000,
    },
    {
      name: '5月',
      売上: 1890,
      費用: 4800,
      利益: 2181,
    },
    {
      name: '6月',
      売上: 2390,
      費用: 3800,
      利益: 2500,
    },
    {
      name: '7月',
      売上: 3490,
      費用: 4300,
      利益: 2100,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">売上トレンド</h2>
        <a href="#" className="text-sm text-green-500 hover:text-green-600 flex items-center">
          詳細を見る
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </a>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
          <XAxis dataKey="name" tickLine={false} />
          <YAxis tickLine={false} />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="売上" stroke="#006400" strokeWidth={3} dot={{ stroke: '#006400', strokeWidth: 2, fill: '#fff' }} />
          <Line type="monotone" dataKey="費用" stroke="#98FB98" strokeWidth={3} dot={{ stroke: '#98FB98', strokeWidth: 2, fill: '#fff' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesRevenueTrend;
