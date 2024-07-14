import { useState, useEffect } from 'react';

// 季節ごとの寿司ネタデータ
const seasonalSushiData = {
  spring: [
    { id: 1, name: '桜鯛', price: 300, image: '/images/sakuradai.jpg' },
    { id: 2, name: 'ホタルイカ', price: 250, image: '/images/hotaruika.jpg' },
    { id: 3, name: '新子', price: 200, image: '/images/shinko.jpg' },
  ],
  summer: [
    { id: 4, name: '穴子', price: 350, image: '/images/anago.jpg' },
    { id: 5, name: '生しらす', price: 280, image: '/images/shirasu.jpg' },
    { id: 6, name: 'ホッキ貝', price: 320, image: '/images/hokkigai.jpg' },
  ],
  autumn: [
    { id: 7, name: 'さんま', price: 260, image: '/images/sanma.jpg' },
    { id: 8, name: '秋刀魚', price: 290, image: '/images/matsutake.jpg' },
    { id: 9, name: '秋鮭', price: 310, image: '/images/akizake.jpg' },
  ],
  winter: [
    { id: 10, name: 'ふぐ', price: 400, image: '/images/fugu.jpg' },
    { id: 11, name: '寒ブリ', price: 380, image: '/images/kanburi.jpg' },
    { id: 12, name: '牡蠣', price: 340, image: '/images/kaki.jpg' },
  ],
};

export const useSeasonalSushi = () => {
  const [currentSeason, setCurrentSeason] = useState('spring');
  const [seasonalSushi, setSeasonalSushi] = useState([]);

  useEffect(() => {
    const determineCurrentSeason = () => {
      const month = new Date().getMonth();
      if (month >= 2 && month <= 4) return 'spring';
      if (month >= 5 && month <= 7) return 'summer';
      if (month >= 8 && month <= 10) return 'autumn';
      return 'winter';
    };

    const newSeason = determineCurrentSeason();
    setCurrentSeason(newSeason);
    setSeasonalSushi(seasonalSushiData[newSeason]);
  }, []);

  const changeSeason = (season) => {
    setCurrentSeason(season);
    setSeasonalSushi(seasonalSushiData[season]);
  };

  return { currentSeason, seasonalSushi, changeSeason };
};
import React, { useState } from 'react';
import { useSeasonalSushi } from '../hooks';
import { motion } from 'framer-motion';
import { Cherry, Sun, Leaf, Snowflake } from 'lucide-react';

const SeasonalSushiMenu = () => {
  const { currentSeason, seasonalSushi, changeSeason } = useSeasonalSushi();
  const [selectedSushi, setSelectedSushi] = useState(null);

  const seasonIcons = {
    spring: <Cherry className="w-6 h-6 text-pink-400" />,
    summer: <Sun className="w-6 h-6 text-yellow-400" />,
    autumn: <Leaf className="w-6 h-6 text-orange-400" />,
    winter: <Snowflake className="w-6 h-6 text-blue-400" />,
  };

  const seasonColors = {
    spring: 'bg-pink-100 border-pink-300',
    summer: 'bg-yellow-100 border-yellow-300',
    autumn: 'bg-orange-100 border-orange-300',
    winter: 'bg-blue-100 border-blue-300',
  };

  const handleSushiClick = (sushi) => {
    setSelectedSushi(sushi);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 font-japanese">季節の寿司メニュー</h1>
      <div className="flex justify-center space-x-4 mb-8">
        {Object.keys(seasonIcons).map((season) => (
          <button
            key={season}
            onClick={() => changeSeason(season)}
            className={`p-2 rounded-full ${
              currentSeason === season ? 'bg-gray-200' : 'bg-white'
            } border-2 ${seasonColors[season]} transition-colors duration-300`}
          >
            {seasonIcons[season]}
          </button>
        ))}
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {seasonalSushi.map((sushi) => (
          <motion.div
            key={sushi.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-white rounded-lg shadow-md overflow-hidden border-2 ${
              seasonColors[currentSeason]
            } cursor-pointer`}
            onClick={() => handleSushiClick(sushi)}
          >
            <img
              src={sushi.image}
              alt={sushi.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 font-japanese">{sushi.name}</h2>
              <p className="text-gray-600">¥{sushi.price}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {selectedSushi && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSushi(null)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedSushi.image}
              alt={selectedSushi.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2 font-japanese">{selectedSushi.name}</h2>
            <p className="text-gray-600 mb-4">¥{selectedSushi.price}</p>
            <p className="text-gray-800 mb-4">
              この{selectedSushi.name}は、{currentSeason}の季節限定メニューです。
              新鮮な食材と伝統的な技法で作られた逸品をお楽しみください。
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              onClick={() => setSelectedSushi(null)}
            >
              閉じる
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SeasonalSushiMenu;