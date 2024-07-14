import React, { useState, useEffect } from 'react';
import { Calendar, Gift, Sun, Leaf, Snowflake, Cherry } from 'lucide-react';

const seasonalData = {
  spring: {
    name: '春',
    icon: <Cherry className="w-6 h-6 text-pink-400" />,
    color: 'bg-pink-100',
    textColor: 'text-pink-800',
    products: [
      { id: 1, name: '桜餅', price: 250, description: '桜の葉の香り豊かな春の定番和菓子' },
      { id: 2, name: '三色団子', price: 300, description: '春の彩りを表現した可愛らしい和菓子' },
      { id: 3, name: '苺大福', price: 350, description: '旬の苺を使った人気の和菓子' },
    ]
  },
  summer: {
    name: '夏',
    icon: <Sun className="w-6 h-6 text-yellow-400" />,
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    products: [
      { id: 4, name: '水まんじゅう', price: 200, description: '涼しげな見た目と食感が人気の夏の和菓子' },
      { id: 5, name: '葛切り', price: 400, description: '喉ごしの良い夏の定番和菓子' },
      { id: 6, name: '金魚すくい', price: 300, description: '夏祭りをイメージした可愛らしい和菓子' },
    ]
  },
  autumn: {
    name: '秋',
    icon: <Leaf className="w-6 h-6 text-orange-400" />,
    color: 'bg-orange-100',
    textColor: 'text-orange-800',
    products: [
      { id: 7, name: '栗きんとん', price: 350, description: '秋の味覚栗を使った贅沢な和菓子' },
      { id: 8, name: 'もみじ饅頭', price: 250, description: '紅葉をかたどった秋らしい和菓子' },
      { id: 9, name: '芋ようかん', price: 300, description: 'さつまいもの甘みを生かした秋の和菓子' },
    ]
  },
  winter: {
    name: '冬',
    icon: <Snowflake className="w-6 h-6 text-blue-400" />,
    color: 'bg-indigo-100',
    textColor: 'text-indigo-800',
    products: [
      { id: 10, name: '雪うさぎ', price: 400, description: '可愛らしい見た目の冬限定和菓子' },
      { id: 11, name: '柚子羊羹', price: 350, description: '柚子の香り豊かな冬の和菓子' },
      { id: 12, name: '福梅', price: 300, description: '新年を祝う縁起の良い和菓子' },
    ]
  }
};

const SeasonalPromotions = () => {
  const [currentSeason, setCurrentSeason] = useState('spring');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) setCurrentSeason('spring');
    else if (month >= 5 && month <= 7) setCurrentSeason('summer');
    else if (month >= 8 && month <= 10) setCurrentSeason('autumn');
    else setCurrentSeason('winter');
  }, []);

  const handleSeasonChange = (season) => {
    setCurrentSeason(season);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 font-yuji">季節の和菓子プロモーション</h2>
      
      <div className="flex justify-center space-x-4 mb-8">
        {Object.entries(seasonalData).map(([key, { name, icon }]) => (
          <button
            key={key}
            onClick={() => handleSeasonChange(key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 ${
              currentSeason === key
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-green-100'
            }`}
          >
            {icon}
            <span>{name}</span>
          </button>
        ))}
      </div>

      <div className={`rounded-lg p-6 ${seasonalData[currentSeason].color}`}>
        <h3 className={`text-2xl font-bold mb-4 ${seasonalData[currentSeason].textColor}`}>
          {seasonalData[currentSeason].name}の和菓子
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seasonalData[currentSeason].products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">¥{product.price}</span>
                  <button
                    onClick={() => openModal(product)}
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300"
                  >
                    詳細を見る
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">{selectedProduct.name}</h3>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <p className="text-xl font-bold text-green-600 mb-4">¥{selectedProduct.price}</p>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 transition-colors duration-300"
              >
                閉じる
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300">
                カートに追加
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">季節のおすすめ</h3>
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-yellow-500 mr-2" />
            <span className="text-lg font-semibold text-yellow-700">期間限定プロモーション</span>
          </div>
          <p className="text-gray-700 mb-4">
            今季の和菓子を3つ以上お買い上げの方に、特製の和菓子ピックをプレゼント！
          </p>
          <div className="flex items-center">
            <Gift className="w-6 h-6 text-red-500 mr-2" />
            <span className="text-lg font-semibold text-red-700">特別セット販売中</span>
          </div>
          <p className="text-gray-700">
            季節の和菓子詰め合わせセットが通常価格より10%オフ！この機会をお見逃しなく。
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeasonalPromotions;