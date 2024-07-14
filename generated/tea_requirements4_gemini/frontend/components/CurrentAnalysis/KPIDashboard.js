import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const kpiData = [
  {
    id: 1,
    title: '本日の売上',
    value: '¥120,000',
    trend: 'up',
    percentage: '15%',
  },
  {
    id: 2,
    title: '新規顧客数',
    value: '50',
    trend: 'down',
    percentage: '5%',
  },
  {
    id: 3,
    title: '顧客満足度',
    value: '4.8',
    trend: 'up',
    percentage: '2%',
  },
  {
    id: 4,
    title: 'ウェブサイト訪問者数',
    value: '2,500',
    trend: 'up',
    percentage: '8%',
  },
];

const KPIDashboard = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">KPI ダッシュボード</h2>
        <button
          onClick={toggleExpand}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          {expanded ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {expanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi) => (
            <div
              key={kpi.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <h3 className="text-lg font-medium text-gray-800">
                {kpi.title}
              </h3>
              <p className="text-3xl font-bold text-green-500 mt-2">
                {kpi.value}
              </p>
              <div className="flex items-center mt-2">
                {kpi.trend === 'up' ? (
                  <ChevronUpIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`ml-2 text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {kpi.percentage}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KPIDashboard;
