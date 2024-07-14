import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Fish, Calendar, Droplet, Wind } from 'lucide-react';

const FishCatchPrediction = () => {
  const [selectedFish, setSelectedFish] = useState('マグロ');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [predictionData, setPredictionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fishTypes = ['マグロ', 'サーモン', 'タイ', 'イカ', 'エビ'];
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  useEffect(() => {
    setIsLoading(true);
    // 実際のAPIコールをシミュレート
    setTimeout(() => {
      const newData = generateMockData(selectedFish, selectedMonth);
      setPredictionData(newData);
      setIsLoading(false);
    }, 1000);
  }, [selectedFish, selectedMonth]);

  const generateMockData = (fish, month) => {
    const baseValue = Math.random() * 1000 + 500;
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      catch: Math.round(baseValue + Math.sin(i * 0.2) * 200 + Math.random() * 100),
    }));
  };

  const handleFishChange = (fish) => {
    setSelectedFish(fish);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <div className="bg-cream-100 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-indigo-900">漁獲量予測</h2>
      
      <div className="mb-8 flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h3 className="text-xl font-semibold mb-2 text-indigo-800">魚種選択</h3>
          <div className="flex flex-wrap gap-2">
            {fishTypes.map((fish) => (
              <button
                key={fish}
                onClick={() => handleFishChange(fish)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedFish === fish
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                <Fish className="inline-block mr-2" size={18} />
                {fish}
              </button>
            ))}
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-2 text-indigo-800">月選択</h3>
          <div className="flex flex-wrap gap-2">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => handleMonthChange(index)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedMonth === index
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                <Calendar className="inline-block mr-2" size={18} />
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-inner">
          <h3 className="text-2xl font-bold mb-4 text-indigo-900">
            {selectedFish}の{months[selectedMonth]}の漁獲量予測
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="day" label={{ value: '日', position: 'insideBottomRight', offset: -10 }} />
              <YAxis label={{ value: '漁獲量 (kg)', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="catch" stroke="#4338ca" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-800">
            <Droplet className="inline-block mr-2" size={24} />
            水温の影響
          </h3>
          <p className="text-gray-700">
            {selectedFish}の生息に適した水温は20°C前後です。{months[selectedMonth]}の平均水温は22°Cと予測され、
            漁獲量への影響は小さいと考えられます。
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-800">
            <Wind className="inline-block mr-2" size={24} />
            海流の予測
          </h3>
          <p className="text-gray-700">
            {months[selectedMonth]}は黒潮の影響が強まる時期です。これにより{selectedFish}の回遊ルートが
            変化し、漁獲量が例年より10%程度増加する可能性があります。
          </p>
        </div>
      </div>

      <div className="mt-8 bg-indigo-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-indigo-800">漁獲量予測のポイント</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>過去5年間のデータと気象予報を組み合わせたAI分析を実施</li>
          <li>海水温の変動や海流の動きを考慮した精度の高い予測</li>
          <li>漁場ごとの特性を学習し、地域別の予測も可能</li>
          <li>予測精度は継続的に向上し、現在は平均誤差率5%以内を実現</li>
        </ul>
      </div>
    </div>
  );
};

export default FishCatchPrediction;