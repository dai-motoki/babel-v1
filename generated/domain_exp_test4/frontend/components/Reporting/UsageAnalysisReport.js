import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Download, Filter } from 'react-feather';

const UsageAnalysisReport = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedApps, setSelectedApps] = useState([]);
  const [chartData, setChartData] = useState([]);

  const apps = [
    { id: 1, name: 'Salesforce' },
    { id: 2, name: 'Google Workspace' },
    { id: 3, name: 'Microsoft 365' },
    { id: 4, name: 'Slack' },
    { id: 5, name: 'Zoom' },
  ];

  useEffect(() => {
    // 実際のアプリケーションでは、APIからデータを取得します
    const fetchData = () => {
      const data = generateMockData();
      setChartData(data);
    };

    fetchData();
  }, [timeRange, selectedApps]);

  const generateMockData = () => {
    const data = [];
    const now = new Date();
    const daysInRange = timeRange === 'week' ? 7 : 30;

    for (let i = 0; i < daysInRange; i++) {
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const entry = { date: date.toISOString().split('T')[0] };

      apps.forEach(app => {
        if (selectedApps.includes(app.id) || selectedApps.length === 0) {
          entry[app.name] = Math.floor(Math.random() * 100);
        }
      });

      data.unshift(entry);
    }

    return data;
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const handleAppToggle = (appId) => {
    setSelectedApps(prev =>
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto my-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">使用状況分析レポート</h2>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => handleTimeRangeChange('week')}
            className={`px-4 py-2 rounded-full ${
              timeRange === 'week' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            週間
          </button>
          <button
            onClick={() => handleTimeRangeChange('month')}
            className={`px-4 py-2 rounded-full ${
              timeRange === 'month' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            月間
          </button>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
            <Calendar className="w-4 h-4 mr-2" />
            日付選択
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
            <Download className="w-4 h-4 mr-2" />
            エクスポート
          </button>
        </div>
      </div>

      <div className="flex mb-6">
        <div className="w-1/4 pr-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">アプリケーション</h3>
            {apps.map(app => (
              <div key={app.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`app-${app.id}`}
                  checked={selectedApps.includes(app.id) || selectedApps.length === 0}
                  onChange={() => handleAppToggle(app.id)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <label htmlFor={`app-${app.id}`} className="ml-2 text-gray-700">
                  {app.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-3/4">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {apps.map((app, index) => (
                (selectedApps.includes(app.id) || selectedApps.length === 0) && (
                  <Line
                    key={app.id}
                    type="monotone"
                    dataKey={app.name}
                    stroke={`hsl(${index * 60}, 70%, 50%)`}
                    strokeWidth={2}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">主な洞察</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Salesforceの使用率が先月比20%増加しています。</li>
          <li>Slackの週末の使用率が減少傾向にあります。</li>
          <li>Microsoft 365の使用パターンに大きな変動が見られます。</li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">推奨アクション</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-green-800 font-semibold mb-2">ライセンス最適化</h4>
            <p className="text-green-700">未使用のZoomライセンスを5つ特定しました。解約をご検討ください。</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-blue-800 font-semibold mb-2">トレーニング提案</h4>
            <p className="text-blue-700">Google Workspaceの使用率が低いユーザーに対して、追加トレーニングを実施することをおすすめします。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageAnalysisReport;