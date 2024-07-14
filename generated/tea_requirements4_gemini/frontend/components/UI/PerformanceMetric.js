import { useState, useEffect } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';

const PerformanceMetric = ({ metricName, metricValue, targetValue, isIncreasingGood = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  const calculateProgress = () => {
    const progress = (metricValue / targetValue) * 100;
    return Math.min(progress, 100); // 100%を超えないようにする
  };

  const progress = calculateProgress();

  const getTrendIcon = () => {
    if (isIncreasingGood) {
      return progress >= 100 ? (
        <ChevronUpIcon className="text-green-500" />
      ) : (
        <ChevronDownIcon className="text-red-500" />
      );
    } else {
      return progress >= 100 ? (
        <ChevronDownIcon className="text-red-500" />
      ) : (
        <ChevronUpIcon className="text-green-500" />
      );
    }
  };

  const containerClassNames = `
    relative 
    bg-white 
    rounded-lg 
    shadow-md 
    p-6 
    hover:shadow-lg 
    transform 
    transition-transform 
    duration-200 
    ease-in-out 
    ${isHovered ? 'scale-105' : ''}
  `;

  return (
    <div
      className={containerClassNames}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{metricName}</h3>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900 mr-2">{metricValue}</span>
          <span className="text-sm text-gray-600"> / {targetValue}</span>
        </div>
      </div>

      <div className="relative w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full rounded-full ${
            progress >= 100
              ? 'bg-green-500'
              : progress >= 75
              ? 'bg-yellow-400'
              : 'bg-red-500'
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        {getTrendIcon()}
      </div>
    </div>
  );
};

export default PerformanceMetric;
