import React, { useState, useEffect } from 'react';
import { Sun, Moon, Cloud, Snowflake } from 'lucide-react';

const SeasonalTheme = () => {
  const [currentSeason, setCurrentSeason] = useState('spring');
  const [isAnimating, setIsAnimating] = useState(false);

  const seasons = [
    { name: 'spring', icon: Sun, color: 'text-pink-400', bgColor: 'bg-pink-100', label: '春' },
    { name: 'summer', icon: Sun, color: 'text-green-500', bgColor: 'bg-green-100', label: '夏' },
    { name: 'autumn', icon: Cloud, color: 'text-orange-500', bgColor: 'bg-orange-100', label: '秋' },
    { name: 'winter', icon: Snowflake, color: 'text-blue-400', bgColor: 'bg-blue-100', label: '冬' },
  ];

  const seasonStyles = {
    spring: {
      backgroundColor: '#FFF0F5',
      textColor: '#FF69B4',
      accentColor: '#FFB7C5',
    },
    summer: {
      backgroundColor: '#F0FFF0',
      textColor: '#228B22',
      accentColor: '#90EE90',
    },
    autumn: {
      backgroundColor: '#FFF5EE',
      textColor: '#D2691E',
      accentColor: '#DEB887',
    },
    winter: {
      backgroundColor: '#F0F8FF',
      textColor: '#4682B4',
      accentColor: '#B0E0E6',
    },
  };

  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) setCurrentSeason('spring');
    else if (month >= 5 && month <= 7) setCurrentSeason('summer');
    else if (month >= 8 && month <= 10) setCurrentSeason('autumn');
    else setCurrentSeason('winter');
  }, []);

  const handleSeasonChange = (season) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSeason(season);
      setIsAnimating(false);
    }, 300);
  };

  const currentStyle = seasonStyles[currentSeason];

  return (
    <div className="min-h-screen transition-colors duration-300 ease-in-out" style={{ backgroundColor: currentStyle.backgroundColor }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center transition-colors duration-300" style={{ color: currentStyle.textColor }}>
          季節の和菓子テーマ
        </h1>

        <div className="flex justify-center mb-8">
          {seasons.map((season) => (
            <button
              key={season.name}
              onClick={() => handleSeasonChange(season.name)}
              className={`mx-2 p-3 rounded-full transition-all duration-300 ${
                currentSeason === season.name ? season.bgColor : 'bg-gray-200'
              } hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${season.color}`}
            >
              <season.icon size={24} />
            </button>
          ))}
        </div>

        <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: currentStyle.textColor }}>
              {seasons.find(s => s.name === currentSeason).label}の和菓子コレクション
            </h2>
            <p className="text-gray-700 mb-4">
              四季折々の風情を表現した和菓子の数々。職人の技が光る逸品をご堪能ください。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-40">
                  <span className="text-lg font-medium" style={{ color: currentStyle.textColor }}>
                    和菓子 {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: currentStyle.textColor }}>
              季節のおすすめ
            </h2>
            <ul className="space-y-2">
              {[1, 2, 3, 4].map((item) => (
                <li key={item} className="flex items-center">
                  <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: currentStyle.accentColor }}></span>
                  <span className="text-gray-700">季節のおすすめ和菓子 {item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            className="px-6 py-2 rounded-full text-white font-medium transition-colors duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
            style={{ backgroundColor: currentStyle.accentColor }}
          >
            詳細を見る
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeasonalTheme;