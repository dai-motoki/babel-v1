import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Waves, Thermometer, Wind, Map } from 'lucide-react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import * as turf from '@turf/turf';

// ローダーコンポーネントの定義
const Loader = () => (
  <div className="flex-col gap-4 w-full flex items-center justify-center">
    <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
      <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="animate-ping">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
      </svg>
    </div>
  </div>
);

const OceanCurrentPrediction = () => {
  const [currentData, setCurrentData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('東日本');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 実際のAPIコールの代わりにモックデータを生成
    const generateMockData = () => {
      const regions = ['東日本', '西日本', '北日本', '南日本'];
      const data = regions.map(region => ({
        region,
        data: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() + i * 86400000).toLocaleDateString(),
          current: Math.random() * 5 + 1,
          temperature: Math.random() * 10 + 15,
          windSpeed: Math.random() * 20 + 5
        }))
      }));
      setCurrentData(data);
      setLoading(false);
    };

    setTimeout(generateMockData, 1000); // APIコールを模擬するための遅延
  }, []);

  const selectedData = currentData.find(d => d.region === selectedRegion)?.data || [];

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-800 border-b-2 border-indigo-200 pb-2">
        海流予測ダッシュボード
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">日本地図</h3>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 1600,
              center: [137, 38]
            }}
            width={400}
            height={400}
            style={{width: "100%", height: "auto"}}
          >
            <ZoomableGroup>
              <Geographies geography="/japan.json">
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={geo.properties.NAME_1 === selectedRegion ? "#3b82f6" : "#EAEAEC"}
                      stroke="#D6D6DA"
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#3b82f6" },
                        pressed: { outline: "none" },
                      }}
                      onClick={() => handleRegionChange(geo.properties.NAME_1)}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">地域情報</h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoCard
              title="平均海流速度"
              value={`${selectedData[selectedData.length - 1]?.current.toFixed(2)} ノット`}
              icon={<Waves className="text-blue-500" size={24} />}
              color="blue"
            />
            <InfoCard
              title="平均水温"
              value={`${selectedData[selectedData.length - 1]?.temperature.toFixed(1)}°C`}
              icon={<Thermometer className="text-red-500" size={24} />}
              color="red"
            />
            <InfoCard
              title="平均風速"
              value={`${selectedData[selectedData.length - 1]?.windSpeed.toFixed(1)} m/s`}
              icon={<Wind className="text-green-500" size={24} />}
              color="green"
            />
            <InfoCard
              title="選択地域"
              value={selectedRegion}
              icon={<Map className="text-purple-500" size={24} />}
              color="purple"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-indigo-700">地域選択</h3>
        <div className="flex space-x-2">
          {currentData.map(({ region }) => (
            <button
              key={region}
              onClick={() => handleRegionChange(region)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedRegion === region
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-indigo-700">海流速度予測グラフ</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={selectedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" stroke="#333" />
            <YAxis stroke="#333" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={2} name="海流速度 (ノット)" />
            <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} name="水温 (°C)" />
            <Line type="monotone" dataKey="windSpeed" stroke="#10b981" strokeWidth={2} name="風速 (m/s)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-indigo-700">予測データ詳細</h3>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2 text-left">日付</th>
                <th className="px-4 py-2 text-left">海流速度 (ノット)</th>
                <th className="px-4 py-2 text-left">水温 (°C)</th>
                <th className="px-4 py-2 text-left">風速 (m/s)</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.map((day, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-2">{day.date}</td>
                  <td className="px-4 py-2">{day.current.toFixed(2)}</td>
                  <td className="px-4 py-2">{day.temperature.toFixed(1)}</td>
                  <td className="px-4 py-2">{day.windSpeed.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-600">
        <p>
          ※ このデータは予測に基づくものであり、実際の海況と異なる場合があります。
          常に最新の気象情報と合わせてご確認ください。
        </p>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, icon, color }) => (
  <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 border-${color}-500`}>
    <div className="flex items-center mb-2">
      {icon}
      <h4 className="ml-2 text-lg font-semibold text-gray-700">{title}</h4>
    </div>
    <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
  </div>
);

export default OceanCurrentPrediction;