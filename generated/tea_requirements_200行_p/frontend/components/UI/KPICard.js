import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const KPICard = ({ title, value, unit, target, trend, trendValue, historicalData, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepValue = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setAnimatedValue(prevValue => {
        const newValue = prevValue + stepValue;
        return newValue > value ? value : newValue;
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-6 h-6 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-6 h-6 text-red-500" />;
      default:
        return <Minus className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusIcon = () => {
    if (value >= target) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    } else if (value >= target * 0.8) {
      return <AlertCircle className="w-6 h-6 text-yellow-500" />;
    } else {
      return <AlertCircle className="w-6 h-6 text-red-500" />;
    }
  };

  const formatValue = (val) => {
    return new Intl.NumberFormat('ja-JP').format(Math.round(val));
  };

  const getPercentage = () => {
    return ((value / target) * 100).toFixed(1);
  };

  const getBackgroundColor = () => {
    const percentage = (value / target) * 100;
    if (percentage >= 100) return 'bg-green-50';
    if (percentage >= 80) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out ${getBackgroundColor()} ${isExpanded ? 'h-auto' : 'h-48'}`}>
      <div className="p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {getStatusIcon()}
        </div>
        <div className="flex items-end mb-2">
          <span className="text-3xl font-bold text-gray-900 mr-2">{formatValue(animatedValue)}</span>
          <span className="text-sm text-gray-600">{unit}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {getTrendIcon()}
            <span className={`ml-1 text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
              {trendValue}%
            </span>
          </div>
          <div className="text-sm text-gray-600">
            目標: {formatValue(target)} {unit} ({getPercentage()}%)
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="mb-4">
            <h4 className="text-md font-semibold text-gray-700 mb-2">トレンド</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-md font-semibold text-gray-700 mb-2">説明</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div className="flex justify-end">
            <button
              className="text-sm text-green-600 hover:text-green-700 focus:outline-none focus:underline"
              onClick={() => setIsExpanded(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KPICard;

// 使用例
const ExampleKPICardUsage = () => {
  const sampleData = {
    title: '売上高',
    value: 1250000,
    unit: '円',
    target: 1500000,
    trend: 'up',
    trendValue: 5.2,
    historicalData: [
      { date: '1月', value: 1000000 },
      { date: '2月', value: 1100000 },
      { date: '3月', value: 1200000 },
      { date: '4月', value: 1250000 },
    ],
    description: '当月の総売上高を表示しています。前月比5.2%増加しており、目標達成率は83.3%です。',
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <KPICard {...sampleData} />
    </div>
  );
};

export { ExampleKPICardUsage };