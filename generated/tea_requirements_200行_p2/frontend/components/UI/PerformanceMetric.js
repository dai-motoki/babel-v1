import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Cpu, Database, Server, Zap } from 'lucide-react';

const PerformanceMetric = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('cpu');

  useEffect(() => {
    // 擬似的なデータ生成
    const generateData = () => {
      const metrics = ['cpu', 'memory', 'disk', 'network', 'response'];
      const newData = [];
      for (let i = 0; i < 24; i++) {
        const hour = i.toString().padStart(2, '0') + ':00';
        const entry = { time: hour };
        metrics.forEach(metric => {
          entry[metric] = Math.floor(Math.random() * 100);
        });
        newData.push(entry);
      }
      setPerformanceData(newData);
    };

    generateData();
    const interval = setInterval(generateData, 60000); // 1分ごとにデータ更新

    return () => clearInterval(interval);
  }, []);

  const metricIcons = {
    cpu: <Cpu className="w-6 h-6 text-green-600" />,
    memory: <Database className="w-6 h-6 text-blue-600" />,
    disk: <Server className="w-6 h-6 text-purple-600" />,
    network: <Activity className="w-6 h-6 text-red-600" />,
    response: <Zap className="w-6 h-6 text-yellow-600" />
  };

  const metricNames = {
    cpu: 'CPU使用率',
    memory: 'メモリ使用率',
    disk: 'ディスク使用率',
    network: 'ネットワーク使用率',
    response: 'レスポンスタイム'
  };

  const metricColors = {
    cpu: '#059669',
    memory: '#2563eb',
    disk: '#7c3aed',
    network: '#dc2626',
    response: '#ca8a04'
  };

  const renderMetricButton = (metric) => (
    <button
      key={metric}
      onClick={() => setSelectedMetric(metric)}
      className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
        selectedMetric === metric
          ? 'bg-green-100 text-green-800'
          : 'hover:bg-gray-100'
      }`}
    >
      {metricIcons[metric]}
      <span className="ml-2 text-sm font-medium">{metricNames[metric]}</span>
    </button>
  );

  const getCurrentValue = () => {
    const latestData = performanceData[performanceData.length - 1];
    return latestData ? latestData[selectedMetric] : 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">パフォーマンスメトリクス</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {Object.keys(metricNames).map(renderMetricButton)}
      </div>
      <div className="bg-green-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {metricIcons[selectedMetric]}
            <span className="ml-2 text-lg font-semibold text-gray-700">
              {metricNames[selectedMetric]}
            </span>
          </div>
          <div className="text-3xl font-bold text-green-600">
            {getCurrentValue()}%
          </div>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={performanceData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
            />
            <YAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke={metricColors[selectedMetric]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">パフォーマンス最適化のヒント</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>定期的なサーバーメンテナンスを行い、不要なプロセスを終了させる</li>
          <li>データベースのインデックスを最適化し、クエリのパフォーマンスを向上させる</li>
          <li>静的アセットにCDNを使用し、レスポンスタイムを短縮する</li>
          <li>アプリケーションコードの非効率な部分を特定し、リファクタリングを行う</li>
          <li>負荷分散を適切に設定し、トラフィックを均等に分散させる</li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceMetric;