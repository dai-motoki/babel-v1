import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Star, Book } from 'lucide-react';

const techniques = [
  { id: 1, name: '練り切り', difficulty: 4, season: '春夏秋冬', description: '餡を薄い生地で包み、細工を施す技法。' },
  { id: 2, name: '落雁', difficulty: 3, season: '秋冬', description: '砂糖と米粉を混ぜて型で抜く干菓子。' },
  { id: 3, name: '羊羹', difficulty: 2, season: '夏', description: '小豆餡を寒天で固めた和菓子。' },
  { id: 4, name: '求肥', difficulty: 2, season: '春夏秋冬', description: 'もち米の粉を使った柔らかい生地。' },
  { id: 5, name: '上生菓子', difficulty: 5, season: '春夏秋冬', description: '季節感を表現した芸術的な生菓子。' },
];

const TechniqueLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTechniques, setFilteredTechniques] = useState(techniques);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');

  useEffect(() => {
    const filtered = techniques.filter((technique) => {
      const matchesSearch = technique.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'all' || technique.difficulty === parseInt(selectedDifficulty);
      const matchesSeason = selectedSeason === 'all' || technique.season.includes(selectedSeason);
      return matchesSearch && matchesDifficulty && matchesSeason;
    });
    setFilteredTechniques(filtered);
  }, [searchTerm, selectedDifficulty, selectedSeason]);

  const renderStars = (difficulty) => {
    return Array(5).fill().map((_, index) => (
      <Star key={index} size={16} className={`inline-block ${index < difficulty ? 'text-yellow-500' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="bg-cream-100 min-h-screen p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-green-800 border-b-2 border-green-800 pb-2">和菓子技法ライブラリ</h1>
      
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="技法を検索..."
            className="w-full p-3 pl-10 rounded-lg border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
        </div>
        
        <div className="relative">
          <select
            className="appearance-none bg-white border border-green-600 text-green-800 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">難易度: すべて</option>
            {[1, 2, 3, 4, 5].map((level) => (
              <option key={level} value={level}>難易度: {level}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
        </div>
        
        <div className="relative">
          <select
            className="appearance-none bg-white border border-green-600 text-green-800 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            <option value="all">季節: すべて</option>
            {['春', '夏', '秋', '冬'].map((season) => (
              <option key={season} value={season}>季節: {season}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTechniques.map((technique) => (
          <div key={technique.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-green-200 hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-green-800">{technique.name}</h2>
              <p className="text-gray-600 mb-4">{technique.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-500 mr-2">難易度:</span>
                  {renderStars(technique.difficulty)}
                </div>
                <div className="text-sm font-medium text-green-600">{technique.season}</div>
              </div>
            </div>
            <div className="bg-green-50 px-6 py-4">
              <button className="flex items-center text-green-700 hover:text-green-900 transition-colors duration-200">
                <Book size={18} className="mr-2" />
                詳細を学ぶ
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTechniques.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-lg">該当する技法が見つかりませんでした。</p>
          <p className="mt-2">検索条件を変更してお試しください。</p>
        </div>
      )}
    </div>
  );
};

export default TechniqueLibrary;