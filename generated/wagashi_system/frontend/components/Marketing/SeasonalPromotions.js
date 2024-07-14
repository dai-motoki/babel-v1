import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const seasons = [
  { name: '春', color: 'bg-pink-100', textColor: 'text-pink-700', icon: '🌸' },
  { name: '夏', color: 'bg-blue-100', textColor: 'text-blue-700', icon: '🍉' },
  { name: '秋', color: 'bg-orange-100', textColor: 'text-orange-700', icon: '🍁' },
  { name: '冬', color: 'bg-gray-100', textColor: 'text-gray-700', icon: '❄️' },
];

const promotions = [
  {
    id: 1,
    name: '桜餅詰め合わせ',
    season: '春',
    description: '桜の香りが漂う、春限定の桜餅セット。',
    price: 1200,
    image: '/api/placeholder/300/200',
  },
  {
    id: 2,
    name: '水羊羹セット',
    season: '夏',
    description: '涼しげな見た目と爽やかな味わいの水羊羹。',
    price: 1500,
    image: '/api/placeholder/300/200',
  },
  {
    id: 3,
    name: '栗きんとん',
    season: '秋',
    description: '秋の味覚、栗の風味豊かな和菓子。',
    price: 1800,
    image: '/api/placeholder/300/200',
  },
  {
    id: 4,
    name: '雪見だいふく',
    season: '冬',
    description: '冬の定番、口どけなめらかな大福。',
    price: 1000,
    image: '/api/placeholder/300/200',
  },
];

const SeasonalPromotions = () => {
  const [currentSeason, setCurrentSeason] = useState(0);
  const [currentPromotion, setCurrentPromotion] = useState(null);

  useEffect(() => {
    const season = seasons[currentSeason].name;
    const promotion = promotions.find(p => p.season === season);
    setCurrentPromotion(promotion);
  }, [currentSeason]);

  const handlePrevSeason = () => {
    setCurrentSeason((prev) => (prev === 0 ? seasons.length - 1 : prev - 1));
  };

  const handleNextSeason = () => {
    setCurrentSeason((prev) => (prev === seasons.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">季節限定プロモーション</h2>
      
      <div className="flex justify-center items-center mb-8">
        <button
          onClick={handlePrevSeason}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          <ChevronLeft size={24} />
        </button>
        <div className={`flex items-center justify-center w-48 h-16 rounded-full ${seasons[currentSeason].color} ${seasons[currentSeason].textColor} text-xl font-semibold mx-4`}>
          {seasons[currentSeason].icon} {seasons[currentSeason].name}
        </div>
        <button
          onClick={handleNextSeason}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {currentPromotion && (
        <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-4 md:mb-0 md:mr-6">
              <img
                src={currentPromotion.image}
                alt={currentPromotion.name}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentPromotion.name}</h3>
              <p className="text-gray-600 mb-4">{currentPromotion.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-gray-800">
                  ¥{currentPromotion.price.toLocaleString()}
                </span>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                  注文する
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">その他のおすすめ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.filter(p => p.id !== currentPromotion?.id).map((promotion) => (
            <div key={promotion.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={promotion.image}
                alt={promotion.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{promotion.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{promotion.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-semibold">¥{promotion.price.toLocaleString()}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${seasons.find(s => s.name === promotion.season).color} ${seasons.find(s => s.name === promotion.season).textColor}`}>
                    {promotion.season}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">和菓子作りの予約</h3>
        <p className="text-gray-600 mb-6">季節の和菓子作り体験を予約しませんか？</p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto">
          <Calendar className="mr-2" size={20} />
          体験予約をする
        </button>
      </div>
    </div>
  );
};

export default SeasonalPromotions;