import React, { useState, useEffect } from 'react';
import { Sun, Moon, Cloud, Snowflake } from 'lucide-react';

const seasons = [
  { name: '春', icon: Sun, color: 'text-pink-400', bgColor: 'bg-pink-100' },
  { name: '夏', icon: Moon, color: 'text-blue-400', bgColor: 'bg-blue-100' },
  { name: '秋', icon: Cloud, color: 'text-orange-400', bgColor: 'bg-orange-100' },
  { name: '冬', icon: Snowflake, color: 'text-indigo-400', bgColor: 'bg-indigo-100' }
];

const seasonalColors = {
  春: {
    primary: 'bg-pink-500',
    secondary: 'bg-pink-200',
    text: 'text-pink-900',
    accent: 'bg-green-400'
  },
  夏: {
    primary: 'bg-blue-500',
    secondary: 'bg-blue-200',
    text: 'text-blue-900',
    accent: 'bg-yellow-400'
  },
  秋: {
    primary: 'bg-orange-500',
    secondary: 'bg-orange-200',
    text: 'text-orange-900',
    accent: 'bg-red-400'
  },
  冬: {
    primary: 'bg-indigo-500',
    secondary: 'bg-indigo-200',
    text: 'text-indigo-900',
    accent: 'bg-white'
  }
};

const SeasonalTheme = () => {
  const [currentSeason, setCurrentSeason] = useState('春');
  const [themeColors, setThemeColors] = useState(seasonalColors['春']);

  useEffect(() => {
    const month = new Date().getMonth();
    let season;
    if (month >= 2 && month <= 4) season = '春';
    else if (month >= 5 && month <= 7) season = '夏';
    else if (month >= 8 && month <= 10) season = '秋';
    else season = '冬';
    setCurrentSeason(season);
    setThemeColors(seasonalColors[season]);
  }, []);

  const changeSeason = (season) => {
    setCurrentSeason(season);
    setThemeColors(seasonalColors[season]);
  };

  return (
    <div className={`min-h-screen ${themeColors.secondary} transition-colors duration-500`}>
      <header className={`${themeColors.primary} p-4 shadow-lg`}>
        <h1 className={`text-2xl font-bold ${themeColors.text}`}>季節の和菓子屋さん</h1>
      </header>

      <nav className="flex justify-center my-4">
        {seasons.map((season) => (
          <button
            key={season.name}
            onClick={() => changeSeason(season.name)}
            className={`mx-2 p-2 rounded-full ${
              currentSeason === season.name ? season.bgColor : 'bg-gray-200'
            } transition-colors duration-300`}
          >
            <season.icon
              className={`w-8 h-8 ${
                currentSeason === season.name ? season.color : 'text-gray-500'
              }`}
            />
          </button>
        ))}
      </nav>

      <main className="container mx-auto p-4">
        <h2 className={`text-3xl font-bold mb-4 ${themeColors.text}`}>
          {currentSeason}の和菓子コレクション
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className={`${themeColors.accent} rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105`}
            >
              <div className="h-48 bg-gray-300 animate-pulse"></div>
              <div className="p-4">
                <h3 className={`text-xl font-semibold mb-2 ${themeColors.text}`}>
                  {currentSeason}の和菓子 {item}
                </h3>
                <p className={`${themeColors.text} opacity-75`}>
                  季節の風味が楽しめる特製和菓子です。
                </p>
                <button
                  className={`mt-4 px-4 py-2 rounded ${themeColors.primary} text-white hover:opacity-90 transition-opacity duration-300`}
                >
                  詳細を見る
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className={`${themeColors.primary} p-4 mt-8`}>
        <div className="container mx-auto text-center">
          <p className={`${themeColors.text} opacity-75`}>
            &copy; 2023 季節の和菓子屋さん. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SeasonalTheme;