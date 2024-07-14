import React, { useState, useEffect } from 'react';
import { Trend, ArrowUp, ArrowDown, BarChart, PieChart, LineChart } from 'lucide-react';

const KPICard = ({ title, value, trend, percentage, chartType, chartData, icon }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current > value) {
        clearInterval(timer);
        setAnimatedValue(value);
      } else {
        setAnimatedValue(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  const renderIcon = () => {
    switch (icon) {
      case 'trend':
        return <Trend className="w-6 h-6 text-green-600" />;
      case 'bar':
        return <BarChart className="w-6 h-6 text-blue-600" />;
      case 'pie':
        return <PieChart className="w-6 h-6 text-purple-600" />;
      case 'line':
        return <LineChart className="w-6 h-6 text-red-600" />;
      default:
        return null;
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <BarChartComponent data={chartData} />;
      case 'pie':
        return <PieChartComponent data={chartData} />;
      case 'line':
        return <LineChartComponent data={chartData} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1 border border-green-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {renderIcon()}
        </div>
        <div className="flex items-end space-x-2 mb-4">
          <span className="text-3xl font-bold text-gray-900">
            {animatedValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
          <div className="flex items-center">
            {trend === 'up' ? (
              <ArrowUp className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {percentage}%
            </span>
          </div>
        </div>
        <div className="h-48">
          {renderChart()}
        </div>
      </div>
      <div className="bg-green-50 px-6 py-3">
        <a href="#" className="text-sm text-green-600 hover:text-green-800 transition-colors duration-200">
          詳細を見る →
        </a>
      </div>
    </div>
  );
};

const BarChartComponent = ({ data }) => {
  return (
    <div className="w-full h-full flex items-end justify-between">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className="w-8 bg-green-500 rounded-t"
            style={{ height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
          ></div>
          <span className="text-xs mt-1 text-gray-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const PieChartComponent = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let startAngle = 0;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {data.map((item, index) => {
          const angle = (item.value / total) * 360;
          const endAngle = startAngle + angle;
          const largeArcFlag = angle > 180 ? 1 : 0;
          const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
          const y2 = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);

          const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

          startAngle = endAngle;

          return <path key={index} d={pathData} fill={`hsl(${index * 60}, 70%, 60%)`} />;
        })}
      </svg>
    </div>
  );
};

const LineChartComponent = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const points = data.map((item, index) => `${(index / (data.length - 1)) * 100},${100 - (item.value / maxValue) * 100}`).join(' ');

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polyline
          points={points}
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
        />
        {data.map((item, index) => (
          <circle
            key={index}
            cx={(index / (data.length - 1)) * 100}
            cy={100 - (item.value / maxValue) * 100}
            r="2"
            fill="#10B981"
          />
        ))}
      </svg>
    </div>
  );
};

export default KPICard;
import KPICard from './KPICard';

const MyComponent = () => {
  const chartData = [
    { label: '1月', value: 100 },
    { label: '2月', value: 150 },
    { label: '3月', value: 200 },
    { label: '4月', value: 180 },
    { label: '5月', value: 220 },
  ];

  return (
    <KPICard
      title="月間売上"
      value={1000000}
      trend="up"
      percentage={5.2}
      chartType="line"
      chartData={chartData}
      icon="trend"
    />
  );
};