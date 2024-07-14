import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain, Clock, Database, AlertCircle, TrendingUp, Award } from 'lucide-react';

const AILearningStatus = () => {
  const [learningData, setLearningData] = useState([]);
  const [currentAccuracy, setCurrentAccuracy] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [dataProcessed, setDataProcessed] = useState(0);
  const [improvementRate, setImprovementRate] = useState(0);
  const [bestPerformance, setBestPerformance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // 実際のアプリケーションではAPIからデータをフェッチします
      const mockData = [
        { day: 1, accuracy: 65, dataVolume: 100000 },
        { day: 2, accuracy: 70, dataVolume: 250000 },
        { day: 3, accuracy: 75, dataVolume: 400000 },
        { day: 4, accuracy: 78, dataVolume: 600000 },
        { day: 5, accuracy: 82, dataVolume: 750000 },
        { day: 6, accuracy: 85, dataVolume: 900000 },
        { day: 7, accuracy: 88, dataVolume: 1000000 },
      ];
      setLearningData(mockData);
      setCurrentAccuracy(88);
      setTimeRemaining(12);
      setDataProcessed(1000000);
      setImprovementRate(3.2);
      setBestPerformance(90);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-black">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">AI学習状況ダッシュボード</h2>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatusCard icon={<Brain className="text-blue-500" />} title="現在の精度" value={`${currentAccuracy}%`} />
        <StatusCard icon={<Clock className="text-green-500" />} title="残り時間" value={`${timeRemaining}時間`} />
        <StatusCard icon={<Database className="text-purple-500" />} title="処理済みデータ" value={`${dataProcessed.toLocaleString()}件`} />
        <StatusCard icon={<TrendingUp className="text-orange-500" />} title="改善率" value={`${improvementRate}%/日`} />
        <StatusCard icon={<Award className="text-yellow-500" />} title="最高精度" value={`${bestPerformance}%`} />
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">学習進捗グラフ</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={learningData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" label={{ value: '学習日数', position: 'insideBottom', offset: -5 }} />
            <YAxis yAxisId="left" label={{ value: '精度 (%)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'データ量', angle: 90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#8884d8" activeDot={{ r: 8 }} name="精度" />
            <Line yAxisId="right" type="monotone" dataKey="dataVolume" stroke="#82ca9d" name="処理データ量" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
        <div className="flex items-center mb-2">
          <AlertCircle className="mr-2" />
          <h3 className="font-bold text-lg">AI学習状況レポート</h3>
        </div>
        <p className="mt-2 text-sm">
          AI学習は予想を上回るペースで進行しています。現在の精度（{currentAccuracy}%）は目標値を5%上回っており、
          日々{improvementRate}%の改善率を維持しています。大規模データセット（{dataProcessed.toLocaleString()}件）の
          処理により、モデルの汎化性能が大幅に向上しました。残り{timeRemaining}時間で更なる精度向上が期待できます。
        </p>
        <p className="mt-2 text-sm font-semibold">
          次のステップ: モデルの解釈可能性の向上とエッジデバイスへの最適化を検討しています。
        </p>
      </div>
    </div>
  );
};

const StatusCard = ({ icon, title, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
    <div className="mr-4">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default AILearningStatus;
