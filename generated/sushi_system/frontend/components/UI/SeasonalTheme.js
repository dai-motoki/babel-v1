import React, { useState, useEffect } from 'react';
import { Sun, Cloud, Leaf, Snowflake } from 'lucide-react';

const SeasonalTheme = () => {
  const [currentSeason, setCurrentSeason] = useState('spring');
  const [isChanging, setIsChanging] = useState(false);

  const seasons = [
    { name: 'spring', icon: Sun, color: 'text-pink-400', bg: 'bg-pink-100', pattern: 'bg-cherry-blossom' },
    { name: 'summer', icon: Cloud, color: 'text-blue-400', bg: 'bg-blue-100', pattern: 'bg-wave' },
    { name: 'autumn', icon: Leaf, color: 'text-orange-400', bg: 'bg-orange-100', pattern: 'bg-maple-leaf' },
    { name: 'winter', icon: Snowflake, color: 'text-blue-200', bg: 'bg-blue-50', pattern: 'bg-snowflake' },
  ];

  const seasonalItems = {
    spring: ['桜鯛', '菜の花巻き', '筍握り', '桜餅'],
    summer: ['鰻巻き', '冷やし茶碗蒸し', 'トロたく', '梅肉巻き'],
    autumn: ['秋刀魚', '松茸軍艦', '栗巻き', '柿の葉寿司'],
    winter: ['寒ブリ', 'カニ味噌軍艦', '牡蠣', 'フグ刺し'],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentSeason((prevSeason) => {
          const currentIndex = seasons.findIndex((s) => s.name === prevSeason);
          return seasons[(currentIndex + 1) % seasons.length].name;
        });
        setIsChanging(false);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const currentSeasonData = seasons.find((s) => s.name === currentSeason);

  return (
    <div className={`min-h-screen ${currentSeasonData.bg} transition-all duration-500 ease-in-out`}>
      <div className={`container mx-auto px-4 py-8 ${currentSeasonData.pattern} bg-opacity-10`}>
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">季節の回転寿司</h1>
        
        <div className="flex justify-center mb-8">
          {seasons.map((season) => (
            <button
              key={season.name}
              onClick={() => setCurrentSeason(season.name)}
              className={`mx-2 p-2 rounded-full transition-all duration-300 ${
                currentSeason === season.name ? `${season.color} ${season.bg}` : 'text-gray-400 bg-gray-100'
              }`}
            >
              <season.icon size={24} />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {seasonalItems[currentSeason].map((item, index) => (
            <div
              key={item}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 ${
                isChanging ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`h-40 ${currentSeasonData.pattern} bg-opacity-20`}></div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item}</h3>
                <p className="text-gray-600">季節限定</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">季節のおすすめ</h2>
          <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
            <div
              className={`absolute inset-0 ${currentSeasonData.pattern} bg-opacity-20 transition-opacity duration-500 ${
                isChanging ? 'opacity-0' : 'opacity-100'
              }`}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <currentSeasonData.icon size={48} className={`mx-auto mb-4 ${currentSeasonData.color}`} />
                <h3 className={`text-3xl font-bold ${currentSeasonData.color}`}>
                  {currentSeason === 'spring' && '春の彩り御膳'}
                  {currentSeason === 'summer' && '夏の涼味セット'}
                  {currentSeason === 'autumn' && '秋の味覚盛り合わせ'}
                  {currentSeason === 'winter' && '冬の贅沢プレート'}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            ※季節に応じて、メニューや店内の雰囲気が変わります。四季折々の味をお楽しみください。
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeasonalTheme;