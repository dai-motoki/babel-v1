import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star, Clock, Book } from 'lucide-react';

const techniques = [
  {
    id: 1,
    name: '練り切り',
    description: '白餡や色餡を練って形作る技法。季節の花や風物詩を表現します。',
    difficulty: 4,
    time: 60,
    season: '四季',
    steps: [
      '餡を練る',
      '色付けする',
      '形を整える',
      '細部を仕上げる'
    ]
  },
  {
    id: 2,
    name: '羊羹作り',
    description: '小豆餡と寒天を煮詰めて作る伝統的な和菓子。',
    difficulty: 3,
    time: 120,
    season: '夏',
    steps: [
      '材料を混ぜる',
      '煮詰める',
      '型に流し入れる',
      '冷やし固める'
    ]
  },
  {
    id: 3,
    name: '落雁作り',
    description: '砂糖と米粉を混ぜて型で成形する干菓子。',
    difficulty: 2,
    time: 45,
    season: '秋',
    steps: [
      '材料を混ぜる',
      '型に詰める',
      '型から外す',
      '乾燥させる'
    ]
  },
  {
    id: 4,
    name: '大福作り',
    description: '餅で餡を包んだ柔らかな和菓子。',
    difficulty: 3,
    time: 90,
    season: '春',
    steps: [
      '餅を作る',
      '餡を丸める',
      '餅で餡を包む',
      '仕上げる'
    ]
  },
  {
    id: 5,
    name: '和菓子の飾り切り',
    description: '季節の花や風物詩を表現する繊細な技法。',
    difficulty: 5,
    time: 30,
    season: '四季',
    steps: [
      'デザインを考える',
      '道具を準備する',
      '細工を施す',
      '仕上げる'
    ]
  }
];

const ArtisanTechniques = () => {
  const [expandedTechnique, setExpandedTechnique] = useState(null);

  const toggleExpand = (id) => {
    setExpandedTechnique(expandedTechnique === id ? null : id);
  };

  const renderDifficulty = (level) => {
    return Array(5).fill().map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`inline-block ${index < level ? 'text-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 font-serif">伝統的な和菓子職人の技法</h1>
      <div className="grid gap-6">
        {techniques.map((technique) => (
          <div
            key={technique.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out"
          >
            <div
              className="p-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleExpand(technique.id)}
            >
              <h2 className="text-2xl font-semibold text-[#006400]">{technique.name}</h2>
              {expandedTechnique === technique.id ? (
                <ChevronUp className="text-[#006400]" />
              ) : (
                <ChevronDown className="text-[#006400]" />
              )}
            </div>
            {expandedTechnique === technique.id && (
              <div className="px-6 pb-6">
                <p className="text-[#4A2311] mb-4">{technique.description}</p>
                <div className="flex items-center mb-4">
                  <span className="font-semibold mr-2">難易度:</span>
                  {renderDifficulty(technique.difficulty)}
                </div>
                <div className="flex items-center mb-4">
                  <Clock className="mr-2 text-[#006400]" />
                  <span>所要時間: 約{technique.time}分</span>
                </div>
                <div className="flex items-center mb-4">
                  <Book className="mr-2 text-[#006400]" />
                  <span>季節: {technique.season}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">手順:</h3>
                <ol className="list-decimal list-inside">
                  {technique.steps.map((step, index) => (
                    <li key={index} className="mb-2">{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtisanTechniques;