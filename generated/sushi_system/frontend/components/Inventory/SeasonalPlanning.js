import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, ChevronLeft, ChevronRight, Fish, Leaf, Snowflake, Sun } from 'lucide-react';

const SeasonalPlanning = () => {
  const [currentSeason, setCurrentSeason] = useState('春');
  const [selectedFish, setSelectedFish] = useState(null);
  const [chartData, setChartData] = useState([]);

  const seasons = ['春', '夏', '秋', '冬'];
  const seasonalFish = {
    春: ['桜鯛', '真鯛', '鰆', 'ホタルイカ', '新子'],
    夏: ['鱧', '穴子', '鮪', '太刀魚', 'イサキ'],
    秋: ['秋刀魚', '鰹', '秋鮭', 'イナダ', 'ヒラメ'],
    冬: ['寒ブリ', 'フグ', '牡蠣', '真鱈', 'ノドグロ']
  };

  const seasonColors = {
    春: 'bg-pink-100 border-pink-300',
    夏: 'bg-blue-100 border-blue-300',
    秋: 'bg-orange-100 border-orange-300',
    冬: 'bg-indigo-100 border-indigo-300'
  };

  const seasonIcons = {
    春: <Leaf className="w-6 h-6 text-green-500" />,
    夏: <Sun className="w-6 h-6 text-yellow-500" />,
    秋: <Leaf className="w-6 h-6 text-orange-500" />,
    冬: <Snowflake className="w-6 h-6 text-blue-500" />
  };

  useEffect(() => {
    generateChartData();
  }, [selectedFish]);

  const generateChartData = () => {
    if (!selectedFish) return;

    const data = [];
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    months.forEach(month => {
      data.push({
        name: month,
        価格: Math.floor(Math.random() * 1000) + 500,
        品質: Math.floor(Math.random() * 50) + 50
      });
    });
    setChartData(data);
  };

  const handleSeasonChange = (direction) => {
    const currentIndex = seasons.indexOf(currentSeason);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % seasons.length;
    } else {
      newIndex = (currentIndex - 1 + seasons.length) % seasons.length;
    }
    setCurrentSeason(seasons[newIndex]);
    setSelectedFish(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">季節の寿司計画</h1>
      
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => handleSeasonChange('prev')}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className={`flex items-center space-x-2 px-6 py-3 rounded-full ${seasonColors[currentSeason]} transition-all duration-300`}>
          {seasonIcons[currentSeason]}
          <span className="text-2xl font-semibold">{currentSeason}</span>
        </div>
        <button
          onClick={() => handleSeasonChange('next')}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Fish className="w-5 h-5 mr-2 text-blue-500" />
            旬の魚
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {seasonalFish[currentSeason].map((fish, index) => (
              <button
                key={index}
                onClick={() => setSelectedFish(fish)}
                className={`p-3 rounded-md text-left transition-all duration-200 ${
                  selectedFish === fish
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {fish}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-500" />
            仕入れ計画
          </h2>
          {selectedFish ? (
            <div className="space-y-4">
              <p className="text-lg font-medium">{selectedFish}の年間計画</p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="価格" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="品質" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-500 text-center">魚を選択すると、年間の価格と品質の推移が表示されます。</p>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">季節の寿司ネタ提案</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seasonalFish[currentSeason].map((fish, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="font-medium text-lg mb-2">{fish}</h3>
              <p className="text-sm text-gray-600">
                {fish}は{currentSeason}の代表的な寿司ネタです。新鮮な{fish}を使った握りや巻き寿司をお客様に提供しましょう。
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonalPlanning;