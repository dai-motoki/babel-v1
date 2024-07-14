import React, { useState, useEffect } from 'react';
import { Calendar, ShoppingBag, Sun, Leaf, Snowflake } from 'lucide-react';

const SeasonalPromotions = () => {
  const [currentSeason, setCurrentSeason] = useState('');
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const determineCurrentSeason = () => {
      const month = new Date().getMonth();
      if (month >= 2 && month <= 4) return '春';
      if (month >= 5 && month <= 7) return '夏';
      if (month >= 8 && month <= 10) return '秋';
      return '冬';
    };

    setCurrentSeason(determineCurrentSeason());
  }, []);

  useEffect(() => {
    // 実際のアプリケーションではAPIから取得するデータをシミュレート
    const fetchPromotions = () => {
      const seasonalPromotions = {
        春: [
          { id: 1, name: '桜餅セット', price: 1200, description: '桜の葉の香りが楽しめる季節限定の桜餅' },
          { id: 2, name: '抹茶ロールケーキ', price: 1500, description: '新茶の季節にぴったりの抹茶スイーツ' },
          { id: 3, name: '春の和菓子アソート', price: 2000, description: '春の彩りを詰め合わせた贅沢セット' },
        ],
        夏: [
          { id: 4, name: '水まんじゅう', price: 800, description: '涼やかな見た目と味わいの夏の定番和菓子' },
          { id: 5, name: '葛餅セット', price: 1300, description: 'つるんとした食感が人気の葛餅' },
          { id: 6, name: '夏の涼菓子セット', price: 1800, description: '暑い夏にぴったりの冷やし和菓子セット' },
        ],
        秋: [
          { id: 7, name: '栗きんとん', price: 1000, description: '秋の味覚を存分に楽しめる伝統和菓子' },
          { id: 8, name: 'もみじ饅頭詰め合わせ', price: 1600, description: '紅葉をイメージした秋限定の饅頭' },
          { id: 9, name: '秋の実りどら焼きセット', price: 1400, description: '栗や芋を使った季節感たっぷりのどら焼き' },
        ],
        冬: [
          { id: 10, name: '雪うさぎ', price: 900, description: '可愛らしい見た目の冬季限定和菓子' },
          { id: 11, name: '柚子羊羹', price: 1100, description: '柚子の香りが楽しめる冬の羊羹' },
          { id: 12, name: '冬の和菓子セット', price: 2200, description: '温かい季節にぴったりの和菓子詰め合わせ' },
        ],
      };

      setPromotions(seasonalPromotions[currentSeason] || []);
    };

    fetchPromotions();
  }, [currentSeason]);

  const getSeasonIcon = () => {
    switch (currentSeason) {
      case '春':
        return <Sun className="w-8 h-8 text-pink-400" />;
      case '夏':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case '秋':
        return <Leaf className="w-8 h-8 text-orange-400" />;
      case '冬':
        return <Snowflake className="w-8 h-8 text-blue-400" />;
      default:
        return <Calendar className="w-8 h-8 text-gray-400" />;
    }
  };

  const getSeasonalBackground = () => {
    switch (currentSeason) {
      case '春':
        return 'bg-gradient-to-br from-pink-100 to-green-100';
      case '夏':
        return 'bg-gradient-to-br from-blue-100 to-green-100';
      case '秋':
        return 'bg-gradient-to-br from-orange-100 to-yellow-100';
      case '冬':
        return 'bg-gradient-to-br from-blue-100 to-gray-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className={`min-h-screen ${getSeasonalBackground()} p-8`}>
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">季節の和菓子プロモーション</h1>
          <div className="flex items-center justify-center space-x-4">
            {getSeasonIcon()}
            <h2 className="text-2xl font-semibold text-gray-700">{currentSeason}の特選和菓子</h2>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{promo.name}</h3>
                <p className="text-gray-600 mb-4">{promo.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">¥{promo.price.toLocaleString()}</span>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5" />
                    <span>購入する</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-16 text-center">
          <p className="text-gray-600">
            ※季節の和菓子は、原材料の都合により予告なく変更になる場合がございます。
          </p>
          <p className="text-gray-600 mt-2">
            お問い合わせ: 0120-000-000（受付時間: 9:00-18:00）
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SeasonalPromotions;