import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Check, X, AlertTriangle, ThermometerSun, Droplets, Clock, Fish, Utensils } from 'lucide-react';

const QualityControl = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [qualityData, setQualityData] = useState([]);
  const [temperatureAlert, setTemperatureAlert] = useState(false);
  const [humidityAlert, setHumidityAlert] = useState(false);

  useEffect(() => {
    // 品質データの初期化（実際のアプリケーションではAPIから取得）
    const initialData = [
      { name: 'マグロ', quality: 95, freshness: 98, taste: 97 },
      { name: 'サーモン', quality: 92, freshness: 94, taste: 95 },
      { name: 'イカ', quality: 88, freshness: 90, taste: 89 },
      { name: 'エビ', quality: 91, freshness: 93, taste: 92 },
      { name: 'ウニ', quality: 96, freshness: 97, taste: 98 },
    ];
    setQualityData(initialData);

    // 温度・湿度アラートのシミュレーション
    const tempInterval = setInterval(() => {
      setTemperatureAlert(Math.random() > 0.7);
    }, 5000);

    const humidInterval = setInterval(() => {
      setHumidityAlert(Math.random() > 0.8);
    }, 7000);

    return () => {
      clearInterval(tempInterval);
      clearInterval(humidInterval);
    };
  }, []);

  const filteredData = selectedCategory === 'all'
    ? qualityData
    : qualityData.filter(item => item[selectedCategory] > 90);

  const getStatusIcon = (value) => {
    if (value >= 95) return <Check className="text-green-500" />;
    if (value >= 90) return <AlertTriangle className="text-yellow-500" />;
    return <X className="text-red-500" />;
  };

  return (
    <div className="bg-slate-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">寿司品質管理ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`bg-white p-6 rounded-lg shadow-md ${temperatureAlert ? 'animate-pulse bg-red-100' : ''}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">温度</h2>
            <ThermometerSun className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-2">5.2°C</p>
          {temperatureAlert && (
            <p className="text-red-500 mt-2">警告：温度が上昇しています</p>
          )}
        </div>
        
        <div className={`bg-white p-6 rounded-lg shadow-md ${humidityAlert ? 'animate-pulse bg-red-100' : ''}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">湿度</h2>
            <Droplets className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-2">68%</p>
          {humidityAlert && (
            <p className="text-red-500 mt-2">警告：湿度が高すぎます</p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">最終チェック時間</h2>
            <Clock className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-2">14:30</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">品質評価</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            全て
          </button>
          <button
            onClick={() => setSelectedCategory('quality')}
            className={`px-4 py-2 rounded-full ${selectedCategory === 'quality' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            品質
          </button>
          <button
            onClick={() => setSelectedCategory('freshness')}
            className={`px-4 py-2 rounded-full ${selectedCategory === 'freshness' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            鮮度
          </button>
          <button
            onClick={() => setSelectedCategory('taste')}
            className={`px-4 py-2 rounded-full ${selectedCategory === 'taste' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            味
          </button>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quality" fill="#8884d8" />
              <Bar dataKey="freshness" fill="#82ca9d" />
              <Bar dataKey="taste" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">寿司ネタ品質チェックリスト</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">寿司ネタ</th>
                <th className="px-4 py-2 text-center">品質</th>
                <th className="px-4 py-2 text-center">鮮度</th>
                <th className="px-4 py-2 text-center">味</th>
                <th className="px-4 py-2 text-center">状態</th>
              </tr>
            </thead>
            <tbody>
              {qualityData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-2 flex items-center">
                    <Fish className="mr-2 text-blue-500" size={20} />
                    {item.name}
                  </td>
                  <td className="px-4 py-2 text-center">{item.quality}</td>
                  <td className="px-4 py-2 text-center">{item.freshness}</td>
                  <td className="px-4 py-2 text-center">{item.taste}</td>
                  <td className="px-4 py-2 text-center">
                    {getStatusIcon(Math.min(item.quality, item.freshness, item.taste))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 flex items-center justify-center mx-auto">
          <Utensils className="mr-2" size={20} />
          品質チェック開始
        </button>
      </div>
    </div>
  );
};

export default QualityControl;