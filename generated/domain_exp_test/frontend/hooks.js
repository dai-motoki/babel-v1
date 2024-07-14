// hooks.js
import { useState, useEffect } from 'react';

export const useSeasonalWagashi = () => {
  const [season, setSeason] = useState('春');
  const [wagashi, setWagashi] = useState([]);

  const seasonalWagashi = {
    春: [
      { id: 1, name: '桜餅', description: '桜の葉の香りが楽しめる春の定番和菓子', price: 250 },
      { id: 2, name: '柏餅', description: '柏の葉で包まれた香り豊かな和菓子', price: 230 },
      { id: 3, name: '三色団子', description: '春の彩りを表現した可愛らしい和菓子', price: 200 },
    ],
    夏: [
      { id: 4, name: '水無月', description: '夏越の祓を象徴する三角形の和菓子', price: 280 },
      { id: 5, name: '葛切り', description: '喉ごしの良い涼やかな夏の和菓子', price: 300 },
      { id: 6, name: '金魚すくい', description: '夏祭りをイメージした可愛らしい和菓子', price: 250 },
    ],
    秋: [
      { id: 7, name: '栗きんとん', description: '栗の風味豊かな秋の代表的な和菓子', price: 320 },
      { id: 8, name: '月見団子', description: '中秋の名月に欠かせない和菓子', price: 240 },
      { id: 9, name: '紅葉狩り', description: '秋の紅葉をモチーフにした美しい和菓子', price: 300 },
    ],
    冬: [
      { id: 10, name: '雪うさぎ', description: '冬の景色をイメージした可愛らしい和菓子', price: 270 },
      { id: 11, name: '焼き芋羊羹', description: '冬の味覚を楽しめる温かみのある和菓子', price: 290 },
      { id: 12, name: '初春の梅', description: '新年を祝う縁起の良い和菓子', price: 310 },
    ],
  };

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    let currentSeason;
    if (2 <= currentMonth && currentMonth <= 4) {
      currentSeason = '春';
    } else if (5 <= currentMonth && currentMonth <= 7) {
      currentSeason = '夏';
    } else if (8 <= currentMonth && currentMonth <= 10) {
      currentSeason = '秋';
    } else {
      currentSeason = '冬';
    }
    setSeason(currentSeason);
    setWagashi(seasonalWagashi[currentSeason]);
  }, []);

  const changeSeason = (newSeason) => {
    setSeason(newSeason);
    setWagashi(seasonalWagashi[newSeason]);
  };

  return { season, wagashi, changeSeason };
};

// SeasonalWagashiComponent.js
import React from 'react';
import { useSeasonalWagashi } from './hooks';

const SeasonalWagashiComponent = () => {
  const { season, wagashi, changeSeason } = useSeasonalWagashi();

  const seasonColors = {
    春: 'bg-pink-100',
    夏: 'bg-blue-100',
    秋: 'bg-orange-100',
    冬: 'bg-gray-100',
  };

  const seasonIcons = {
    春: '🌸',
    夏: '🍉',
    秋: '🍁',
    冬: '❄️',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">季節の和菓子</h1>
      <div className="flex justify-center mb-6">
        {Object.keys(seasonColors).map((s) => (
          <button
            key={s}
            onClick={() => changeSeason(s)}
            className={`mx-2 px-4 py-2 rounded-full ${
              season === s ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            } border border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out`}
          >
            {s} {seasonIcons[s]}
          </button>
        ))}
      </div>
      <div className={`p-6 rounded-lg shadow-md ${seasonColors[season]}`}>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          {season}の和菓子 {seasonIcons[season]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wagashi.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out">
              <h3 className="text-xl font-medium mb-2 text-gray-800">{item.name}</h3>
              <p className="text-gray-600 mb-3">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">¥{item.price}</span>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 ease-in-out">
                  注文する
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonalWagashiComponent;