import React, { useState, useEffect } from 'react';
import { Sun, Moon, Droplet, Leaf } from 'lucide-react';

const seasonalData = {
  spring: {
    icon: <Leaf className="w-6 h-6 text-pink-400" />,
    title: '春の和菓子習慣',
    description: '桜餅や柏餅など、春の訪れを祝う和菓子が登場します。',
    customs: [
      { name: '花見団子', description: '桜の下で楽しむ三色団子' },
      { name: '桜餅', description: '桜の葉で包まれた上品な甘さの餅菓子' },
      { name: '柏餅', description: '新緑の季節を象徴する柏の葉で包まれた餅' },
      { name: '若草餅', description: 'よもぎの香りが春の訪れを感じさせる餅' },
    ],
  },
  summer: {
    icon: <Sun className="w-6 h-6 text-yellow-400" />,
    title: '夏の和菓子習慣',
    description: '涼を感じる水まんじゅうや金魚すくいをモチーフにした和菓子が人気です。',
    customs: [
      { name: '水まんじゅう', description: '透明な寒天で包まれた涼しげな和菓子' },
      { name: '葛切り', description: '喉ごしの良い葛粉を使った夏の定番和菓子' },
      { name: '金魚すくい', description: '夏祭りをイメージした可愛らしい上生菓子' },
      { name: '氷室饅頭', description: '冷やして食べる夏限定の饅頭' },
    ],
  },
  autumn: {
    icon: <Leaf className="w-6 h-6 text-orange-400" />,
    title: '秋の和菓子習慣',
    description: '栗や芋を使った和菓子が登場し、実りの秋を感じさせます。',
    customs: [
      { name: '栗きんとん', description: '栗の風味豊かな秋の代表的な和菓子' },
      { name: '芋ようかん', description: 'さつまいもの甘みを活かした羊羹' },
      { name: '月見団子', description: '中秋の名月を愛でながら楽しむ団子' },
      { name: '紅葉狩り', description: '紅葉をモチーフにした色鮮やかな上生菓子' },
    ],
  },
  winter: {
    icon: <Moon className="w-6 h-6 text-blue-400" />,
    title: '冬の和菓子習慣',
    description: '年末年始の行事に合わせた和菓子や、温かみのある和菓子が好まれます。',
    customs: [
      { name: '雪うさぎ', description: '冬の情景を表現した可愛らしい和菓子' },
      { name: '福餅', description: '新年を祝う縁起の良い餅菓子' },
      { name: '温まんじゅう', description: '冬に温めて食べる優しい甘さの饅頭' },
      { name: '干支菓子', description: 'その年の干支をモチーフにした縁起菓子' },
    ],
  },
};

const SeasonalCustoms = () => {
  const [currentSeason, setCurrentSeason] = useState('spring');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth();
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

  return (
    <div className="bg-cream-100 min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">季節の和菓子習慣</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-700 text-white p-4 flex justify-between items-center">
          <button
            onClick={() => handleSeasonChange('spring')}
            className={`p-2 rounded-full transition-colors duration-300 ${
              currentSeason === 'spring' ? 'bg-pink-400' : 'hover:bg-green-600'
            }`}
          >
            <Leaf className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleSeasonChange('summer')}
            className={`p-2 rounded-full transition-colors duration-300 ${
              currentSeason === 'summer' ? 'bg-yellow-400' : 'hover:bg-green-600'
            }`}
          >
            <Sun className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleSeasonChange('autumn')}
            className={`p-2 rounded-full transition-colors duration-300 ${
              currentSeason === 'autumn' ? 'bg-orange-400' : 'hover:bg-green-600'
            }`}
          >
            <Leaf className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleSeasonChange('winter')}
            className={`p-2 rounded-full transition-colors duration-300 ${
              currentSeason === 'winter' ? 'bg-blue-400' : 'hover:bg-green-600'
            }`}
          >
            <Moon className="w-6 h-6" />
          </button>
        </div>
        <div className={`p-6 ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          <div className="flex items-center mb-4">
            {seasonalData[currentSeason].icon}
            <h2 className="text-2xl font-bold text-green-800 ml-2">{seasonalData[currentSeason].title}</h2>
          </div>
          <p className="text-gray-600 mb-6">{seasonalData[currentSeason].description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seasonalData[currentSeason].customs.map((custom, index) => (
              <div key={index} className="bg-cream-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-green-700 mb-2">{custom.name}</h3>
                <p className="text-gray-600">{custom.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-600">
        <p>和菓子の世界は四季折々の美しさと味わいを楽しむことができます。</p>
        <p>季節に合わせた和菓子を味わい、日本の伝統文化を感じてみてはいかがでしょうか。</p>
      </div>
    </div>
  );
};

export default SeasonalCustoms;