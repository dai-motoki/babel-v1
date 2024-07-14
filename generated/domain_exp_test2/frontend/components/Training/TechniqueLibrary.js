import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Star } from 'lucide-react';

const techniques = [
  {
    id: 1,
    name: '練り切り',
    difficulty: 4,
    season: '四季',
    description: '白あんや色付きのあんこを薄く延ばし、中に餡を包んで様々な形に成形する技法。',
    steps: [
      '白餡や色付きの餡を準備する',
      '餡を薄く延ばす',
      '中に餡を包む',
      '様々な形に成形する',
      '仕上げに艶出しをする'
    ]
  },
  {
    id: 2,
    name: '上生菓子',
    difficulty: 5,
    season: '四季',
    description: '季節の風物詩を表現した芸術的な和菓子。繊細な技術と創造性が必要。',
    steps: [
      '季節のテーマを決める',
      '材料を準備する（餡、寒天、色素など）',
      '形を作る（型抜き、手作りなど）',
      '色付けや細部の装飾を行う',
      '冷蔵して固める'
    ]
  },
  {
    id: 3,
    name: '羊羹',
    difficulty: 3,
    season: '夏',
    description: '小豆や寒天を使った棹状の和菓子。夏の定番品。',
    steps: [
      '小豆を煮る',
      '砂糖と寒天を加える',
      '型に流し入れる',
      '冷やして固める',
      '適度な大きさに切る'
    ]
  },
  {
    id: 4,
    name: '大福',
    difficulty: 2,
    season: '四季',
    description: '柔らかい餅で餡を包んだ和菓子。様々な味のバリエーションがある。',
    steps: [
      '餅米を蒸す',
      '餅をつく',
      '餡を丸める',
      '餅で餡を包む',
      '粉をまぶす'
    ]
  },
  {
    id: 5,
    name: '落雁',
    difficulty: 3,
    season: '秋',
    description: '砂糖と米粉を主原料とした乾菓子。木型で模様をつける。',
    steps: [
      '材料を混ぜる（砂糖、米粉など）',
      '型に詰める',
      '型から外す',
      '乾燥させる'
    ]
  }
];

const TechniqueLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTechniques, setFilteredTechniques] = useState(techniques);
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedTechnique, setExpandedTechnique] = useState(null);

  useEffect(() => {
    const filtered = techniques.filter(technique =>
      technique.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      technique.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTechniques(filtered);
  }, [searchTerm]);

  const handleSort = () => {
    const sorted = [...filteredTechniques].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.difficulty - b.difficulty;
      } else {
        return b.difficulty - a.difficulty;
      }
    });
    setFilteredTechniques(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const toggleExpand = (id) => {
    setExpandedTechnique(expandedTechnique === id ? null : id);
  };

  return (
    <div className="bg-yellow-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 font-serif">和菓子技法ライブラリ</h1>
      <div className="mb-6 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="技法を検索..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        <button
          onClick={handleSort}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
        >
          難易度順 {sortOrder === 'asc' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTechniques.map((technique) => (
          <div key={technique.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{technique.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{technique.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-700">難易度: {technique.difficulty}</span>
                <span className="text-sm font-medium text-gray-700">季節: {technique.season}</span>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => toggleExpand(technique.id)}
                  className="text-green-600 hover:text-green-700 transition duration-300 flex items-center"
                >
                  {expandedTechnique === technique.id ? '閉じる' : '手順を見る'}
                  {expandedTechnique === technique.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className="flex">
                  {[...Array(technique.difficulty)].map((_, index) => (
                    <Star key={index} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            {expandedTechnique === technique.id && (
              <div className="px-6 pb-6">
                <h3 className="font-semibold mb-2 text-gray-800">製造手順:</h3>
                <ol className="list-decimal list-inside text-sm text-gray-700">
                  {technique.steps.map((step, index) => (
                    <li key={index} className="mb-1">{step}</li>
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

export default TechniqueLibrary;