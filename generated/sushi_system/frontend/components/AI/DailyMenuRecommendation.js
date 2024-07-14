import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Fish, Leaf, Thermometer, Sun, Cloud } from 'lucide-react';

const DailyMenuRecommendation = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [weatherData, setWeatherData] = useState({ temperature: 25, condition: '晴れ' });

  // モックデータ
  const mockSushiItems = [
    { id: 1, name: '特選大トロ', price: 980, description: '脂がのった極上の大トロ', season: '冬', popularity: 95 },
    { id: 2, name: '旬の桜鯛', price: 680, description: '春の訪れを告げる桜鯛', season: '春', popularity: 88 },
    { id: 3, name: '炙り〆鯖', price: 580, description: '香ばしい薫りが食欲をそそる', season: '秋', popularity: 92 },
    { id: 4, name: '生うに軍艦', price: 880, description: '濃厚な味わいの北海道産生うに', season: '夏', popularity: 97 },
    { id: 5, name: '穴子一本握り', price: 780, description: 'ふっくらと焼き上げた江戸前穴子', season: '夏', popularity: 90 },
  ];

  useEffect(() => {
    // 日替わりメニューの推薦ロジック（実際はAIモデルを使用）
    const recommendItems = () => {
      const season = getSeason(currentDate);
      const dayOfWeek = currentDate.getDay();
      const filteredItems = mockSushiItems.filter(item => 
        item.season === season || item.popularity > 90
      );
      const sortedItems = filteredItems.sort((a, b) => b.popularity - a.popularity);
      setRecommendedItems(sortedItems.slice(0, 3));
    };

    recommendItems();
    // 天気データの取得（実際はAPI呼び出し）
    setWeatherData({ temperature: Math.floor(Math.random() * 15) + 20, condition: '晴れ' });
  }, [currentDate]);

  const getSeason = (date) => {
    const month = date.getMonth() + 1;
    if (month >= 3 && month <= 5) return '春';
    if (month >= 6 && month <= 8) return '夏';
    if (month >= 9 && month <= 11) return '秋';
    return '冬';
  };

  const handlePrevDate = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDate = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };

  const handlePrevItem = () => {
    setCurrentItemIndex(prevIndex => 
      prevIndex === 0 ? recommendedItems.length - 1 : prevIndex - 1
    );
  };

  const handleNextItem = () => {
    setCurrentItemIndex(prevIndex => 
      prevIndex === recommendedItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-cream-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-900 text-center">本日のおすすめメニュー</h2>
      
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePrevDate} className="text-indigo-700 hover:text-indigo-900">
          <ChevronLeft size={24} />
        </button>
        <h3 className="text-2xl font-semibold text-indigo-800">
          {currentDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
        </h3>
        <button onClick={handleNextDate} className="text-indigo-700 hover:text-indigo-900">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-inner mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Thermometer className="text-red-500 mr-2" />
            <span className="text-lg font-medium">{weatherData.temperature}°C</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium mr-2">{weatherData.condition}</span>
            {weatherData.condition === '晴れ' && <Sun className="text-yellow-500" />}
            {weatherData.condition === '雨' && <Cloud className="text-gray-500" />}
          </div>
        </div>
        <p className="text-sm text-gray-600">
          ※ 天候に応じて、おすすめメニューが変更される場合があります。
        </p>
      </div>

      {recommendedItems.length > 0 && (
        <div className="relative overflow-hidden">
          <motion.div
            key={currentItemIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h4 className="text-2xl font-bold mb-2 text-indigo-900">{recommendedItems[currentItemIndex].name}</h4>
            <p className="text-lg font-semibold mb-2 text-indigo-700">¥{recommendedItems[currentItemIndex].price}</p>
            <p className="text-gray-600 mb-4">{recommendedItems[currentItemIndex].description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Leaf className="text-green-500 mr-2" />
                <span className="text-sm font-medium">{recommendedItems[currentItemIndex].season}</span>
              </div>
              <div className="flex items-center">
                <Fish className="text-blue-500 mr-2" />
                <span className="text-sm font-medium">鮮度: 極上</span>
              </div>
              <div className="flex items-center">
                <Fish className="text-red-500 mr-2" />
                <span className="text-sm font-medium">人気度: {recommendedItems[currentItemIndex].popularity}%</span>
              </div>
            </div>
          </motion.div>
          <button onClick={handlePrevItem} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full">
            <ChevronLeft size={24} className="text-indigo-700" />
          </button>
          <button onClick={handleNextItem} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full">
            <ChevronRight size={24} className="text-indigo-700" />
          </button>
        </div>
      )}

      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-4 text-indigo-900">本日のおすすめポイント</h4>
        <ul className="list-disc list-inside text-gray-700">
          <li>季節の旬の味わいをお楽しみください</li>
          <li>熟練の職人が丁寧に仕込んだ極上のネタ</li>
          <li>数量限定のため、お早めのご注文をおすすめします</li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <button className="bg-indigo-700 text-white px-6 py-2 rounded-full hover:bg-indigo-800 transition duration-300">
          注文する
        </button>
      </div>
    </div>
  );
};

export default DailyMenuRecommendation;