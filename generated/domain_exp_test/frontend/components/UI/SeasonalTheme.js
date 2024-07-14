import React, { useState, useEffect } from 'react';
import { Sun, Cloud, Leaf, Snowflake } from 'lucide-react';

const seasons = [
  { name: '春', icon: Sun, color: 'text-pink-400', bg: 'bg-pink-50' },
  { name: '夏', icon: Cloud, color: 'text-blue-400', bg: 'bg-blue-50' },
  { name: '秋', icon: Leaf, color: 'text-orange-400', bg: 'bg-orange-50' },
  { name: '冬', icon: Snowflake, color: 'text-indigo-400', bg: 'bg-indigo-50' },
];

const SeasonalTheme = () => {
  const [currentSeason, setCurrentSeason] = useState(0);
  const [isAutoChange, setIsAutoChange] = useState(true);

  useEffect(() => {
    if (isAutoChange) {
      const now = new Date();
      const month = now.getMonth();
      let seasonIndex;
      if (month >= 2 && month <= 4) seasonIndex = 0; // 春
      else if (month >= 5 && month <= 7) seasonIndex = 1; // 夏
      else if (month >= 8 && month <= 10) seasonIndex = 2; // 秋
      else seasonIndex = 3; // 冬
      setCurrentSeason(seasonIndex);
    }
  }, [isAutoChange]);

  useEffect(() => {
    if (isAutoChange) {
      const timer = setInterval(() => {
        setCurrentSeason((prevSeason) => (prevSeason + 1) % 4);
      }, 60000); // 1分ごとに季節を自動で切り替え（デモ用）
      return () => clearInterval(timer);
    }
  }, [isAutoChange]);

  const handleSeasonChange = (index) => {
    setCurrentSeason(index);
    setIsAutoChange(false);
  };

  const toggleAutoChange = () => {
    setIsAutoChange(!isAutoChange);
  };

  const SeasonIcon = seasons[currentSeason].icon;

  return (
    <div className="font-sans">
      <div className={`min-h-screen ${seasons[currentSeason].bg} transition-colors duration-1000`}>
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">菓匠 鈴乃家</h1>
            <div className="flex items-center space-x-4">
              <SeasonIcon className={`w-8 h-8 ${seasons[currentSeason].color}`} />
              <span className="text-lg font-medium text-gray-700">{seasons[currentSeason].name}</span>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">季節のお菓子</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">季節の和菓子 {index + 1}</h3>
                    <p className="text-gray-600">旬の素材を使用した季節限定の和菓子です。</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">季節設定</h2>
            <div className="flex flex-wrap gap-4 mb-6">
              {seasons.map((season, index) => (
                <button
                  key={season.name}
                  onClick={() => handleSeasonChange(index)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    currentSeason === index
                      ? `${season.bg} ${season.color} border-2 border-current`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } transition-colors duration-300`}
                >
                  <season.icon className="w-5 h-5" />
                  <span>{season.name}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoChange"
                checked={isAutoChange}
                onChange={toggleAutoChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="autoChange" className="text-gray-700">季節を自動で変更する</label>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">今月のおすすめ</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">季節の主力商品</h3>
                <p className="text-gray-600">職人が丹精込めて作り上げた、この季節ならではの逸品です。</p>
              </div>
              <div className="md:w-1/2">
                <ul className="space-y-4">
                  {[...Array(4)].map((_, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">季節のお菓子 {index + 1}</h4>
                        <p className="text-gray-600">季節の風味を存分に楽しめる和菓子です。</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-semibold mb-2">菓匠 鈴乃家</h3>
                <p className="text-gray-400">伝統と革新が織りなす和菓子の世界</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300 transition-colors duration-300">お問い合わせ</a>
                <a href="#" className="hover:text-gray-300 transition-colors duration-300">プライバシーポリシー</a>
                <a href="#" className="hover:text-gray-300 transition-colors duration-300">特定商取引法に基づく表記</a>
              </div>
            </div>
            <div className="mt-8 text-center text-gray-400">
              &copy; 2023 菓匠 鈴乃家 All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SeasonalTheme;