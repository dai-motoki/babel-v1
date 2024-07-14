import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, Server, Database, Cpu, BarChart2 } from 'lucide-react';

const AILearningStatus = () => {
  const [learningData, setLearningData] = useState([]);
  const [currentAccuracy, setCurrentAccuracy] = useState(0);
  const [currentLoss, setCurrentLoss] = useState(0);
  const [epochsCompleted, setEpochsCompleted] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [modelSize, setModelSize] = useState('');
  const [dataProcessed, setDataProcessed] = useState(0);

  useEffect(() => {
    // 実際のAPIコールの代わりにモックデータを生成
    const generateMockData = () => {
      const data = [];
      for (let i = 0; i < 20; i++) {
        data.push({
          epoch: i + 1,
          accuracy: Math.random() * 0.3 + 0.7,
          loss: Math.random() * 0.3,
        });
      }
      setLearningData(data);
      setCurrentAccuracy(data[data.length - 1].accuracy);
      setCurrentLoss(data[data.length - 1].loss);
      setEpochsCompleted(data.length);
      setTimeRemaining('2時間30分');
      setModelSize('2.5 GB');
      setDataProcessed(Math.floor(Math.random() * 1000000) + 1000000);
    };

    generateMockData();
    const interval = setInterval(generateMockData, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatPercentage = (value) => `${(value * 100).toFixed(2)}%`;

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-green-800 mb-6">AI学習状況</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-green-700 mb-4">学習進捗</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">現在の精度:</span>
            <span className="text-green-600 font-bold">{formatPercentage(currentAccuracy)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">現在の損失:</span>
            <span className="text-red-600 font-bold">{currentLoss.toFixed(4)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">完了エポック:</span>
            <span className="text-blue-600 font-bold">{epochsCompleted}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">残り時間:</span>
            <span className="text-purple-600 font-bold">{timeRemaining}</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-green-700 mb-4">リソース使用状況</h3>
          <div className="flex items-center mb-2">
            <Cpu className="text-blue-500 mr-2" />
            <span className="text-gray-600">CPU使用率:</span>
            <span className="ml-auto text-blue-600 font-bold">78%</span>
          </div>
          <div className="flex items-center mb-2">
            <Server className="text-green-500 mr-2" />
            <span className="text-gray-600">GPU使用率:</span>
            <span className="ml-auto text-green-600 font-bold">92%</span>
          </div>
          <div className="flex items-center mb-2">
            <Database className="text-yellow-500 mr-2" />
            <span className="text-gray-600">メモリ使用量:</span>
            <span className="ml-auto text-yellow-600 font-bold">16.5 GB</span>
          </div>
          <div className="flex items-center">
            <Zap className="text-red-500 mr-2" />
            <span className="text-gray-600">電力消費:</span>
            <span className="ml-auto text-red-600 font-bold">450 W</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h3 className="text-xl font-semibold text-green-700 mb-4">学習曲線</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={learningData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epoch" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#4CAF50" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="loss" stroke="#F44336" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-green-700 mb-4">モデル情報</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">モデルサイズ:</span>
            <span className="text-blue-600 font-bold">{modelSize}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">アーキテクチャ:</span>
            <span className="text-purple-600 font-bold">Transformer</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-green-700 mb-4">データ処理</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">処理済みデータ:</span>
            <span className="text-green-600 font-bold">{dataProcessed.toLocaleString()} 件</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">バッチサイズ:</span>
            <span className="text-orange-600 font-bold">128</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-green-700 mb-4">最適化設定</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">オプティマイザ:</span>
            <span className="text-indigo-600 font-bold">Adam</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">学習率:</span>
            <span className="text-pink-600 font-bold">0.001</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          学習を一時停止
        </button>
      </div>
    </div>
  );
};

export default AILearningStatus;