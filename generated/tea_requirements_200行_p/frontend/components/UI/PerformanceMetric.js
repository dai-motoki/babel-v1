import React, { useState, useEffect } from 'react';
import { Activity, Server, Zap, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PerformanceMetric = ({ title, value, unit, type }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  const getIcon = () => {
    switch (type) {
      case 'cpu':
        return <Server className="w-6 h-6 text-green-700" />;
      case 'memory':
        return <Zap className="w-6 h-6 text-green-700" />;
      case 'latency':
        return <Clock className="w-6 h-6 text-green-700" />;
      default:
        return <Activity className="w-6 h-6 text-green-700" />;
    }
  };

  const getColorBasedOnValue = (value) => {
    if (value < 50) return 'text-green-500';
    if (value < 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  const data = [
    { name: 'Value', value: animatedValue },
    { name: 'Remaining', value: 100 - animatedValue },
  ];

  const COLORS = ['#4CAF50', '#E0E0E0'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        {getIcon()}
        <h3 className="text-lg font-semibold ml-2 text-gray-800">{title}</h3>
      </div>
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height={100}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={40}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 text-right">
          <span className={`text-3xl font-bold ${getColorBasedOnValue(animatedValue)}`}>
            {animatedValue.toFixed(1)}
          </span>
          <span className="text-gray-600 ml-1">{unit}</span>
        </div>
      </div>
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${animatedValue}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const PerformanceMetricsGroup = () => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setCpuUsage(Math.random() * 100);
      setMemoryUsage(Math.random() * 100);
      setLatency(Math.random() * 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-green-700 pb-2">
        システムパフォーマンス
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PerformanceMetric
          title="CPU 使用率"
          value={cpuUsage}
          unit="%"
          type="cpu"
        />
        <PerformanceMetric
          title="メモリ使用率"
          value={memoryUsage}
          unit="%"
          type="memory"
        />
        <PerformanceMetric
          title="レイテンシ"
          value={latency}
          unit="ms"
          type="latency"
        />
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">パフォーマンス概要</h3>
        <p className="text-gray-600 mb-4">
          現在のシステムパフォーマンスは以下の通りです：
        </p>
        <ul className="list-disc list-inside text-gray-600">
          <li>CPU使用率は{cpuUsage.toFixed(1)}%で、{getCpuStatus(cpuUsage)}。</li>
          <li>メモリ使用率は{memoryUsage.toFixed(1)}%で、{getMemoryStatus(memoryUsage)}。</li>
          <li>平均レイテンシは{latency.toFixed(1)}msで、{getLatencyStatus(latency)}。</li>
        </ul>
      </div>
      <div className="mt-8 bg-green-50 border-l-4 border-green-700 p-4 rounded-r-lg">
        <h4 className="text-lg font-semibold text-green-800 mb-2">パフォーマンス改善のヒント</h4>
        <p className="text-green-700">
          システムの負荷が高い場合は、不要なプロセスを終了するか、リソースの割り当てを見直すことをお勧めします。
          定期的なメンテナンスとアップデートもパフォーマンス向上に効果的です。
        </p>
      </div>
    </div>
  );
};

const getCpuStatus = (value) => {
  if (value < 50) return '正常範囲内です';
  if (value < 80) return '注意が必要です';
  return '高負荷状態です';
};

const getMemoryStatus = (value) => {
  if (value < 70) return '十分な空きがあります';
  if (value < 90) return '注意が必要です';
  return '危険な水準です';
};

const getLatencyStatus = (value) => {
  if (value < 100) return '非常に良好です';
  if (value < 500) return '許容範囲内です';
  return '改善が必要です';
};

export default PerformanceMetricsGroup;