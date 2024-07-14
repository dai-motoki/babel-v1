import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Star, Clock, Award } from 'lucide-react';

const techniques = [
  {
    id: 1,
    name: '練り切り',
    description: '白餡や色付きの餡を練って成形する技法。季節の花や風景を表現します。',
    difficulty: 4,
    timeRequired: '2-3時間',
    seasonality: ['春', '夏', '秋', '冬'],
    tools: ['練り棒', '木型', '小刀'],
    steps: [
      '餡を練る',
      '色付けする',
      '形を整える',
      '細部を彫る',
      '仕上げる'
    ]
  },
  {
    id: 2,
    name: '羊羹',
    description: '寒天と砂糖、小豆などを煮詰めて固める伝統的な和菓子。',
    difficulty: 3,
    timeRequired: '4-5時間',
    seasonality: ['夏', '秋'],
    tools: ['鍋', '型', '篩'],
    steps: [
      '材料を煮る',
      '型に流し込む',
      '冷やして固める',
      '切り分ける'
    ]
  },
  {
    id: 3,
    name: '上生菓子',
    description: '季節感を表現した芸術的な和菓子。繊細な技術が必要です。',
    difficulty: 5,
    timeRequired: '3-4時間',
    seasonality: ['春', '夏', '秋', '冬'],
    tools: ['菓子木型', '小刀', '刷毛'],
    steps: [
      'デザインを考案する',
      '餡を調整する',
      '形を作る',
      '色付けする',
      '細部を仕上げる'
    ]
  }
];

const ArtisanTechniques = () => {
  const [expandedTechniqueId, setExpandedTechniqueId] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState('all');

  const toggleTechnique = (id) => {
    setExpandedTechniqueId(expandedTechniqueId === id ? null : id);
  };

  const filteredTechniques = selectedSeason === 'all'
    ? techniques
    : techniques.filter(technique => technique.seasonality.includes(selectedSeason));

  useEffect(() => {
    const seasonBasedOnMonth = () => {
      const month = new Date().getMonth();
      if (month >= 2 && month <= 4) return '春';
      if (month >= 5 && month <= 7) return '夏';
      if (month >= 8 && month <= 10) return '秋';
      return '冬';
    };
    setSelectedSeason(seasonBasedOnMonth());
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#F3EAD3] min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-[#4A2311] mb-8 text-center font-yumin">
        伝統的な和菓子職人の技法
      </h1>

      <div className="mb-6">
        <label htmlFor="season-select" className="block text-[#4A2311] mb-2 font-yumin">季節で絞り込む：</label>
        <select
          id="season-select"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
          className="w-full p-2 border border-[#006400] rounded-md bg-white text-[#4A2311] font-yugoth"
        >
          <option value="all">全ての季節</option>
          <option value="春">春</option>
          <option value="夏">夏</option>
          <option value="秋">秋</option>
          <option value="冬">冬</option>
        </select>
      </div>

      <div className="space-y-6">
        {filteredTechniques.map((technique) => (
          <div key={technique.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="flex justify-between items-center p-4 cursor-pointer bg-[#006400] text-white"
              onClick={() => toggleTechnique(technique.id)}
            >
              <h2 className="text-xl font-bold font-yumin">{technique.name}</h2>
              {expandedTechniqueId === technique.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            {expandedTechniqueId === technique.id && (
              <div className="p-4">
                <p className="text-[#4A2311] mb-4 font-yugoth">{technique.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="text-[#FFB7C5] mr-2" size={20} />
                    <span className="text-[#4A2311] font-yugoth">難易度: {technique.difficulty}/5</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="text-[#006400] mr-2" size={20} />
                    <span className="text-[#4A2311] font-yugoth">所要時間: {technique.timeRequired}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-[#4A2311] mb-2 font-yumin">季節性:</h3>
                  <div className="flex flex-wrap gap-2">
                    {technique.seasonality.map((season) => (
                      <span key={season} className="px-2 py-1 bg-[#FFB7C5] text-white rounded-full text-sm font-yugoth">
                        {season}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-[#4A2311] mb-2 font-yumin">必要な道具:</h3>
                  <ul className="list-disc list-inside text-[#4A2311] font-yugoth">
                    {technique.tools.map((tool, index) => (
                      <li key={index}>{tool}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#4A2311] mb-2 font-yumin">手順:</h3>
                  <ol className="list-decimal list-inside text-[#4A2311] font-yugoth">
                    {technique.steps.map((step, index) => (
                      <li key={index} className="mb-2">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-[#006400] text-white rounded-lg">
        <h3 className="text-xl font-bold mb-4 font-yumin flex items-center">
          <Award className="mr-2" size={24} />
          和菓子職人の心得
        </h3>
        <p className="font-yugoth">
          和菓子作りは単なる技術だけでなく、季節の移ろいや自然の美しさを表現する芸術です。
          素材の選択から仕上げまで、細心の注意を払い、心を込めて作ることが大切です。
          伝統を守りながらも、新しい表現を探求し続けることが、真の和菓子職人の道です。
        </p>
      </div>
    </div>
  );
};

export default ArtisanTechniques;