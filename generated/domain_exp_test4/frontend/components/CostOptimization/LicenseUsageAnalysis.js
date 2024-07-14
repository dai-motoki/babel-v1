import React, { useState, useEffect } from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { ResponsiveBar } from '@nivo/bar';
import { format } from 'date-fns';

const LicenseUsageAnalysis = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    // 仮のデータ生成（実際のアプリでは API からデータを取得）
    const generateHeatmapData = () => {
      const apps = ['App A', 'App B', 'App C', 'App D', 'App E'];
      const data = [];
      for (let i = 0; i < 7; i++) {
        const day = format(new Date(2023, 4, i + 1), 'yyyy-MM-dd');
        const row = { day };
        apps.forEach(app => {
          row[app] = Math.floor(Math.random() * 100);
        });
        data.push(row);
      }
      setHeatmapData(data);
    };

    const generateBarChartData = () => {
      const data = [
        { app: 'App A', '使用中': 65, '未使用': 35 },
        { app: 'App B', '使用中': 80, '未使用': 20 },
        { app: 'App C', '使用中': 45, '未使用': 55 },
        { app: 'App D', '使用中': 70, '未使用': 30 },
        { app: 'App E', '使用中': 55, '未使用': 45 },
      ];
      setBarChartData(data);
    };

    generateHeatmapData();
    generateBarChartData();
  }, []);

  const handleAppClick = (app) => {
    setSelectedApp(app);
    // ここで選択されたアプリの詳細データを取得するロジックを実装
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">ライセンス使用状況分析</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-700 mb-4">週間使用率ヒートマップ</h3>
        <div className="h-64 bg-gray-100 rounded-md overflow-hidden">
          {heatmapData.length > 0 && (
            <ResponsiveHeatMap
              data={heatmapData}
              keys={['App A', 'App B', 'App C', 'App D', 'App E']}
              indexBy="day"
              margin={{ top: 20, right: 60, bottom: 60, left: 60 }}
              colors={{
                type: 'sequential',
                scheme: 'reds',
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                legend: '日付',
                legendPosition: 'middle',
                legendOffset: 40
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'アプリケーション',
                legendPosition: 'middle',
                legendOffset: -50
              }}
              cellOpacity={0.8}
              cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.8]] }}
              animate={true}
              motionStiffness={80}
              motionDamping={9}
              hoverTarget="cell"
              cellHoverOtherId={null}
            />
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-700 mb-4">アプリケーション別使用状況</h3>
        <div className="h-64 bg-gray-100 rounded-md overflow-hidden">
          {barChartData.length > 0 && (
            <ResponsiveBar
              data={barChartData}
              keys={['使用中', '未使用']}
              indexBy="app"
              margin={{ top: 20, right: 60, bottom: 60, left: 60 }}
              padding={0.3}
              colors={['#4CAF50', '#FFA000']}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'アプリケーション',
                legendPosition: 'middle',
                legendOffset: 40
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'ライセンス数',
                legendPosition: 'middle',
                legendOffset: -50
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              onClick={(data) => handleAppClick(data.indexValue)}
            />
          )}
        </div>
      </div>

      {selectedApp && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h4 className="text-lg font-medium text-gray-800 mb-2">{selectedApp}の詳細情報</h4>
          <p className="text-gray-600">ここに選択されたアプリケーションの詳細情報を表示します。</p>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-medium text-gray-700 mb-4">最適化提案</h3>
        <ul className="space-y-2">
          <li className="flex items-center text-gray-600">
            <span className="w-4 h-4 mr-2 bg-green-500 rounded-full"></span>
            未使用ライセンスの回収を検討してください。
          </li>
          <li className="flex items-center text-gray-600">
            <span className="w-4 h-4 mr-2 bg-yellow-500 rounded-full"></span>
            使用率の低いアプリケーションの代替案を探してください。
          </li>
          <li className="flex items-center text-gray-600">
            <span className="w-4 h-4 mr-2 bg-red-500 rounded-full"></span>
            ライセンスの追加購入が必要なアプリケーションを確認してください。
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LicenseUsageAnalysis;