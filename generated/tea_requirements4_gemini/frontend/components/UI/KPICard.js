import React from 'react';

const KPICard = ({ icon, title, value, trend, target }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-48 flex flex-col justify-between">
      <div className="flex items-center">
        <div className="bg-green-500 rounded-full p-2 mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-bold text-green-600">{value}</p>
        {trend && (
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold leading-none rounded-full ${
              trend === 'up'
                ? 'bg-green-200 text-green-800'
                : trend === 'down'
                ? 'bg-red-200 text-red-800'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {trend === 'up' && '▲'}
            {trend === 'down' && '▼'}
            {trend === 'flat' && '―'}
            {trend !== 'flat' && ` ${Math.abs(trend)}%`}
          </span>
        )}
      </div>
      {target && (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${(value / target) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default KPICard;