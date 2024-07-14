import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AssetManagementReport = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assetTypeData, setAssetTypeData] = useState({});
  const [assetStatusData, setAssetStatusData] = useState({});

  useEffect(() => {
    // Fetch asset data from API (mocked for this example)
    const fetchAssets = async () => {
      const response = await fetch('/api/assets');
      const data = await response.json();
      setAssets(data);
      updateChartData(data);
    };

    fetchAssets();
  }, []);

  const updateChartData = (assetData) => {
    const typeCount = {};
    const statusCount = {};

    assetData.forEach((asset) => {
      typeCount[asset.type] = (typeCount[asset.type] || 0) + 1;
      statusCount[asset.status] = (statusCount[asset.status] || 0) + 1;
    });

    setAssetTypeData({
      labels: Object.keys(typeCount),
      datasets: [
        {
          data: Object.values(typeCount),
          backgroundColor: ['#E88D67', '#88AB75', '#6F69AC', '#AADEA7', '#64C2A6'],
        },
      ],
    });

    setAssetStatusData({
      labels: Object.keys(statusCount),
      datasets: [
        {
          data: Object.values(statusCount),
          backgroundColor: ['#2D3047', '#93B7BE', '#E0CA3C', '#A799B7', '#048BA8'],
        },
      ],
    });
  };

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-indigo-500 pb-2">資産管理レポート</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">資産タイプ分布</h2>
          <Pie data={assetTypeData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">資産ステータス分布</h2>
          <Pie data={assetStatusData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">資産価値推移</h2>
        <Bar
          data={{
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [
              {
                label: '資産価値 (万円)',
                data: [1200, 1350, 1500, 1400, 1600, 1800],
                backgroundColor: '#4A5568',
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">資産一覧</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">ID</th>
                  <th className="px-4 py-2 text-left text-gray-600">名称</th>
                  <th className="px-4 py-2 text-left text-gray-600">タイプ</th>
                  <th className="px-4 py-2 text-left text-gray-600">ステータス</th>
                  <th className="px-4 py-2 text-left text-gray-600">価値 (万円)</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleAssetClick(asset)}
                  >
                    <td className="px-4 py-2 border-t">{asset.id}</td>
                    <td className="px-4 py-2 border-t">{asset.name}</td>
                    <td className="px-4 py-2 border-t">{asset.type}</td>
                    <td className="px-4 py-2 border-t">{asset.status}</td>
                    <td className="px-4 py-2 border-t">{asset.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">資産詳細</h2>
          {selectedAsset ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">{selectedAsset.name}</h3>
              <p className="text-gray-600 mb-1">ID: {selectedAsset.id}</p>
              <p className="text-gray-600 mb-1">タイプ: {selectedAsset.type}</p>
              <p className="text-gray-600 mb-1">ステータス: {selectedAsset.status}</p>
              <p className="text-gray-600 mb-1">価値: {selectedAsset.value}万円</p>
              <p className="text-gray-600 mb-1">購入日: {selectedAsset.purchaseDate}</p>
              <p className="text-gray-600 mb-1">耐用年数: {selectedAsset.lifespan}年</p>
              <div className="mt-4">
                <h4 className="text-md font-medium mb-2">資産画像</h4>
                <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像プレースホルダー</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600">資産を選択してください</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetManagementReport;