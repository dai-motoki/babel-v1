import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Star } from 'lucide-react';

const techniques = [
  { id: 1, name: '練り切り', difficulty: 4, season: '春夏秋冬', description: '餡を包む生地を練って作る技法。' },
  { id: 2, name: '落雁', difficulty: 3, season: '秋冬', description: '砂糖と米粉を混ぜて型で抜く技法。' },
  { id: 3, name: '羊羹', difficulty: 2, season: '夏秋', description: '小豆餡や寒天を使って作る棹状の和菓子。' },
  { id: 4, name: '上生菓子', difficulty: 5, season: '春夏秋冬', description: '季節の素材を使った芸術的な生菓子。' },
  { id: 5, name: '茶巾絞り', difficulty: 3, season: '春夏', description: '餡を布巾で絞って形作る技法。' },
  { id: 6, name: '外郎', difficulty: 4, season: '夏', description: '葛粉を使った透明感のある和菓子。' },
  { id: 7, name: '求肥', difficulty: 2, season: '春夏秋冬', description: 'もち粉を蒸して作る柔らかい生地。' },
  { id: 8, name: '金平糖', difficulty: 5, season: '春夏秋冬', description: '何層にも砂糖をまぶして作る宝石のような菓子。' },
];

const TechniqueLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTechniques, setFilteredTechniques] = useState(techniques);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  useEffect(() => {
    const results = techniques.filter(technique =>
      technique.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTechniques(results);
  }, [searchTerm]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedTechniques = [...filteredTechniques].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setFilteredTechniques(sortedTechniques);
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    }
    return null;
  };

  const renderDifficultyStars = (difficulty) => {
    return Array(5).fill().map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < difficulty ? 'text-yellow-500 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="bg-cream-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-800 font-japanese">和菓子技法ライブラリ</h2>
      
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="技法を検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Search className="absolute left-3 top-3 text-green-500" size={20} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('name')}>
                技法名 {renderSortIcon('name')}
              </th>
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('difficulty')}>
                難易度 {renderSortIcon('difficulty')}
              </th>
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('season')}>
                季節 {renderSortIcon('season')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTechniques.map((technique) => (
              <tr
                key={technique.id}
                className="border-b border-green-200 hover:bg-green-50 cursor-pointer"
                onClick={() => setSelectedTechnique(technique)}
              >
                <td className="p-3">{technique.name}</td>
                <td className="p-3 flex">{renderDifficultyStars(technique.difficulty)}</td>
                <td className="p-3">{technique.season}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTechnique && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-green-200">
          <h3 className="text-2xl font-bold mb-4 text-green-800">{selectedTechnique.name}</h3>
          <p className="mb-4 text-gray-700">{selectedTechnique.description}</p>
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">難易度:</span>
            {renderDifficultyStars(selectedTechnique.difficulty)}
          </div>
          <p className="mt-2 text-gray-600">季節: {selectedTechnique.season}</p>
          <button
            onClick={() => setSelectedTechnique(null)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            閉じる
          </button>
        </div>
      )}
    </div>
  );
};

export default TechniqueLibrary;