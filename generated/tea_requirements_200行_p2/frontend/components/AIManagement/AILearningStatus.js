import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, BarChart2, AlertTriangle, CheckCircle, Clock, Database } from 'lucide-react';

const AILearningStatus = () => {
  const [learningData, setLearningData] = useState([]);
  const [currentAccuracy, setCurrentAccuracy] = useState(0);
  const [trainingTime, setTrainingTime] = useState(0);
  const [dataProcessed, setDataProcessed] = useState(0);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // モックデータの生成
    const generateMockData = () => {
      const data = [];
      for (let i = 0; i < 30; i++) {
        data.push({
          day: i + 1,
          accuracy: Math.floor(Math.random() * (95 - 70 + 1) + 70),
          loss: Math.random() * (0.5 - 0.1) + 0.1,
        });
      }
      setLearningData(data);
      setCurrentAccuracy(data[data.length - 1].accuracy);
      setTrainingTime(Math.floor(Math.random() * (120 - 60 + 1) + 60));
      setDataProcessed(Math.floor(Math.random() * (1000000 - 500000 + 1) + 500000));
    };

    generateMockData();

    // アラートの生成
    setAlerts([
      { id: 1, type: 'warning', message: '学習率が低下しています。ハイパーパラメータの調整を検討してください。' },
      { id: 2, type: 'success', message: 'モデルの精度が目標値に達しました。' },
    ]);
  }, []);

  const renderAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">AI学習状況</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <Zap className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">現在の精度</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{currentAccuracy}%</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <Clock className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">学習時間</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{trainingTime}分</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <Database className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">処理データ量</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">{dataProcessed.toLocaleString()}件</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">学習進捗グラフ</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={learningData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" label={{ value: '日数', position: 'insideBottomRight', offset: -10 }} />
              <YAxis yAxisId="left" label={{ value: '精度 (%)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: '損失', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#059669" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="loss" stroke="#7c3aed" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">学習パラメータ</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600">学習率</h4>
            <p className="text-lg font-semibold text-gray-800">0.001</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600">バッチサイズ</h4>
            <p className="text-lg font-semibold text-gray-800">64</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600">エポック数</h4>
            <p className="text-lg font-semibold text-gray-800">100</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600">最適化アルゴリズム</h4>
            <p className="text-lg font-semibold text-gray-800">Adam</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">アラートと通知</h3>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`flex items-center p-4 rounded-lg ${
              alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'
            }`}>
              {renderAlertIcon(alert.type)}
              <p className={`ml-3 text-sm ${
                alert.type === 'warning' ? 'text-yellow-700' : 'text-green-700'
              }`}>
                {alert.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AILearningStatus;