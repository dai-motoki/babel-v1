import React, { useState, useEffect } from 'react';
import { Sun, Cloud, Leaf, Snowflake } from 'lucide-react';

const SeasonalCustoms = () => {
  const [currentSeason, setCurrentSeason] = useState('春');
  const [selectedCustom, setSelectedCustom] = useState(null);

  const seasonalCustoms = {
    春: [
      { name: '花見団子', description: '桜の下で楽しむ三色団子', icon: '🍡' },
      { name: '桜餅', description: '塩漬けの桜の葉で包んだ和菓子', icon: '🌸' },
      { name: '柏餅', description: '新緑の季節に食べる縁起物', icon: '🍃' },
    ],
    夏: [
      { name: '水無月', description: '夏越の祓の日に食べる三角形の和菓子', icon: '🔺' },
      { name: '葛切り', description: '涼を感じる夏の定番和菓子', icon: '🍧' },
      { name: '金魚すくい', description: '夏祭りの風物詩をモチーフにした和菓子', icon: '🐠' },
    ],
    秋: [
      { name: '栗きんとん', description: '秋の味覚を楽しむ上品な和菓子', icon: '🌰' },
      { name: '月見団子', description: '中秋の名月に供える丸い団子', icon: '🥮' },
      { name: '紅葉狩り', description: '秋の紅葉をイメージした色鮮やかな和菓子', icon: '🍁' },
    ],
    冬: [
      { name: '雪うさぎ', description: '冬の風景を表現した可愛らしい和菓子', icon: '🐰' },
      { name: '福餅', description: '新年を祝う縁起の良い和菓子', icon: '🎍' },
      { name: '椿餅', description: '冬に咲く椿をモチーフにした和菓子', icon: '🌺' },
    ],
  };

  const seasonIcons = {
    春: <Sun className="w-8 h-8 text-pink-400" />,
    夏: <Cloud className="w-8 h-8 text-blue-400" />,
    秋: <Leaf className="w-8 h-8 text-orange-400" />,
    冬: <Snowflake className="w-8 h-8 text-blue-200" />,
  };

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const seasons = [
      [2, 3, 4], // 春
      [5, 6, 7], // 夏
      [8, 9, 10], // 秋
      [11, 0, 1], // 冬
    ];
    const currentSeasonIndex = seasons.findIndex(months => months.includes(currentMonth));
    setCurrentSeason(['春', '夏', '秋', '冬'][currentSeasonIndex]);
  }, []);

  const handleCustomClick = (custom) => {
    setSelectedCustom(custom);
  };

  return (
    <div className="bg-cream-100 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-800 text-center">季節の和菓子習慣</h2>
      <div className="flex justify-center space-x-4 mb-8">
        {Object.keys(seasonalCustoms).map((season) => (
          <button
            key={season}
            onClick={() => setCurrentSeason(season)}
            className={`px-4 py-2 rounded-full flex items-center ${
              currentSeason === season
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-600 hover:bg-green-100'
            } transition duration-300 ease-in-out`}
          >
            {seasonIcons[season]}
            <span className="ml-2">{season}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {seasonalCustoms[currentSeason].map((custom) => (
          <div
            key={custom.name}
            onClick={() => handleCustomClick(custom)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
          >
            <div className="text-4xl mb-2">{custom.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-green-700">{custom.name}</h3>
            <p className="text-gray-600">{custom.description}</p>
          </div>
        ))}
      </div>
      {selectedCustom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <div className="text-6xl mb-4 text-center">{selectedCustom.icon}</div>
            <h3 className="text-2xl font-bold mb-4 text-green-800 text-center">{selectedCustom.name}</h3>
            <p className="text-gray-700 mb-6">{selectedCustom.description}</p>
            <div className="bg-cream-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-2 text-green-700">由来と習慣</h4>
              <p className="text-gray-600">
                {selectedCustom.name}は、{currentSeason}の季節を代表する和菓子です。
                この和菓子には長い歴史があり、日本の伝統的な文化や季節の移り変わりを表現しています。
                多くの家庭や茶道の場で楽しまれ、季節の風情を感じる大切な習慣となっています。
              </p>
            </div>
            <button
              onClick={() => setSelectedCustom(null)}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonalCustoms;