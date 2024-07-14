import { useState, useEffect } from 'react';

export const useSeasonalWagashi = () => {
  const [season, setSeason] = useState('spring');
  const [wagashi, setWagashi] = useState([]);

  const seasonalWagashi = {
    spring: [
      { id: 1, name: '桜餅', description: '桜の葉で包まれた春の代表的な和菓子', price: 250 },
      { id: 2, name: '柏餅', description: '柏の葉で包まれた端午の節句の和菓子', price: 300 },
      { id: 3, name: '桃の花', description: '桃の花をモチーフにした上生菓子', price: 400 },
    ],
    summer: [
      { id: 4, name: '水無月', description: '夏越の祓に食べる三角形の和菓子', price: 280 },
      { id: 5, name: '葛切り', description: '涼しげな夏の和菓子', price: 350 },
      { id: 6, name: '金魚', description: '金魚をモチーフにした夏らしい上生菓子', price: 450 },
    ],
    autumn: [
      { id: 7, name: '栗きんとん', description: '栗を使った秋の代表的な和菓子', price: 400 },
      { id: 8, name: '月見団子', description: '十五夜に食べる丸い和菓子', price: 300 },
      { id: 9, name: '紅葉', description: '紅葉をモチーフにした秋らしい上生菓子', price: 450 },
    ],
    winter: [
      { id: 10, name: '雪うさぎ', description: '雪をイメージした冬の和菓子', price: 350 },
      { id: 11, name: '福梅', description: '新年を祝う梅の形の和菓子', price: 300 },
      { id: 12, name: '椿', description: '椿の花をモチーフにした冬の上生菓子', price: 450 },
    ],
  };

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    if (currentMonth >= 2 && currentMonth <= 4) {
      setSeason('spring');
    } else if (currentMonth >= 5 && currentMonth <= 7) {
      setSeason('summer');
    } else if (currentMonth >= 8 && currentMonth <= 10) {
      setSeason('autumn');
    } else {
      setSeason('winter');
    }
  }, []);

  useEffect(() => {
    setWagashi(seasonalWagashi[season]);
  }, [season]);

  return { season, wagashi };
};
import React from 'react';
import { useSeasonalWagashi } from '../hooks';
import { Sun, Cloud, Leaf, Snowflake } from 'lucide-react';

const SeasonalWagashiDisplay = () => {
  const { season, wagashi } = useSeasonalWagashi();

  const seasonIcons = {
    spring: <Sun className="w-8 h-8 text-pink-400" />,
    summer: <Sun className="w-8 h-8 text-yellow-400" />,
    autumn: <Leaf className="w-8 h-8 text-orange-400" />,
    winter: <Snowflake className="w-8 h-8 text-blue-400" />,
  };

  const seasonColors = {
    spring: 'bg-pink-100 border-pink-300',
    summer: 'bg-yellow-100 border-yellow-300',
    autumn: 'bg-orange-100 border-orange-300',
    winter: 'bg-blue-100 border-blue-300',
  };

  const seasonNames = {
    spring: '春',
    summer: '夏',
    autumn: '秋',
    winter: '冬',
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-japanese">季節の和菓子</h1>
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${seasonColors[season]}`}>
          {seasonIcons[season]}
          <span className="text-lg font-semibold text-gray-800 font-japanese">{seasonNames[season]}の和菓子</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wagashi.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 font-japanese">{item.name}</h2>
              <p className="text-gray-600 mb-4 font-japanese">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600 font-japanese">¥{item.price}</span>
                <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 font-japanese">
                  注文する
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonalWagashiDisplay;