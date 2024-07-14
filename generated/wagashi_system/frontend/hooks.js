import { useState, useEffect } from 'react';

export const useSeasonalWagashi = () => {
  const [season, setSeason] = useState('春');
  const [wagashi, setWagashi] = useState([]);

  const seasons = ['春', '夏', '秋', '冬'];

  const wagashiData = {
    春: [
      { id: 1, name: '桜餅', description: '桜の葉で包まれた上品な甘さの餅', price: 250 },
      { id: 2, name: '草団子', description: 'よもぎの香り豊かな三色団子', price: 300 },
      { id: 3, name: '花見だんご', description: '桜の季節にぴったりの串団子', price: 350 },
    ],
    夏: [
      { id: 4, name: '水まんじゅう', description: '涼しげな見た目と口どけの良さが特徴', price: 280 },
      { id: 5, name: '葛切り', description: '喉ごしの良い夏の定番和菓子', price: 320 },
      { id: 6, name: '金魚すくい', description: '金魚をモチーフにした可愛らしい和菓子', price: 380 },
    ],
    秋: [
      { id: 7, name: '栗きんとん', description: '栗の風味豊かな秋の味覚', price: 400 },
      { id: 8, name: 'もみじの天ぷら', description: '紅葉の葉を使った珍しい和菓子', price: 350 },
      { id: 9, name: '月見だんご', description: 'お月見にぴったりの上品な甘さ', price: 330 },
    ],
    冬: [
      { id: 10, name: '雪うさぎ', description: '真っ白な雪をイメージした可愛らしい和菓子', price: 300 },
      { id: 11, name: '焼き芋きんつば', description: '冬の定番焼き芋を和菓子で表現', price: 280 },
      { id: 12, name: '柚子まんじゅう', description: '柚子の香り豊かな冬の和菓子', price: 320 },
    ],
  };

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentSeason = seasons[Math.floor(currentMonth / 3) % 4];
    setSeason(currentSeason);
    setWagashi(wagashiData[currentSeason]);
  }, []);

  const changeSeason = (newSeason) => {
    setSeason(newSeason);
    setWagashi(wagashiData[newSeason]);
  };

  return { season, wagashi, changeSeason, seasons };
};
import React from 'react';
import { useSeasonalWagashi } from '../hooks';
import { ChevronDown, ShoppingCart } from 'lucide-react';

const SeasonalWagashi = () => {
  const { season, wagashi, changeSeason, seasons } = useSeasonalWagashi();

  const seasonColors = {
    春: 'bg-pink-100',
    夏: 'bg-blue-100',
    秋: 'bg-orange-100',
    冬: 'bg-gray-100',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 font-serif">季節の和菓子</h1>
      
      <div className="mb-8">
        <label htmlFor="season-select" className="block text-sm font-medium text-gray-700 mb-2">
          季節を選択
        </label>
        <div className="relative">
          <select
            id="season-select"
            value={season}
            onChange={(e) => changeSeason(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {seasons.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wagashi.map((item) => (
          <div
            key={item.id}
            className={`${
              seasonColors[season]
            } rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105`}
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 font-serif">{item.name}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">¥{item.price}</span>
                <button className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition-colors duration-300 flex items-center">
                  <ShoppingCart size={20} className="mr-2" />
                  カートに追加
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">和菓子の魅力</h2>
        <p className="text-gray-600 leading-relaxed">
          和菓子は日本の伝統的な菓子で、四季折々の自然や風物を表現し、見た目も味も楽しめる芸術品です。
          素材の持ち味を生かし、控えめな甘さと繊細な味わいが特徴です。季節ごとに変わる和菓子を楽しむことで、
          日本の文化と自然の移ろいを感じることができます。当店では、熟練の職人が丁寧に作り上げた季節の和菓子を
          ご用意しております。ぜひ、季節の移り変わりを和菓子とともにお楽しみください。
        </p>
      </div>

      <div className="mt-12 bg-green-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">和菓子作りの伝統</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          和菓子作りの技術は、長い歴史の中で磨かれてきました。職人たちは、季節の素材を活かし、
          繊細な技巧を用いて、一つ一つの和菓子を心を込めて作り上げています。
        </p>
        <p className="text-gray-600 leading-relaxed">
          当店の和菓子職人、鈴木清一郎は50年以上の経験を持ち、伝統的な技法と新しいアイデアを
          融合させた独自の和菓子作りを行っています。季節ごとに変わる和菓子は、鈴木の創造性と
          技術の結晶です。
        </p>
      </div>
    </div>
  );
};

export default SeasonalWagashi;