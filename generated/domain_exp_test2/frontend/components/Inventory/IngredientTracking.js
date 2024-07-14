import React, { useState, useEffect } from 'react';
import { Search, Calendar, BarChart2, Leaf, AlertTriangle } from 'lucide-react';

const IngredientTracking = () => {
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');

  useEffect(() => {
    // 実際のAPIコールの代わりにモックデータを使用
    const mockIngredients = [
      { id: 1, name: '抹茶', stock: 50, unit: 'g', season: 'all', origin: '京都', lastOrdered: '2023-05-01' },
      { id: 2, name: '小豆', stock: 2000, unit: 'g', season: 'autumn', origin: '北海道', lastOrdered: '2023-04-15' },
      { id: 3, name: '桜の葉', stock: 100, unit: '枚', season: 'spring', origin: '東京', lastOrdered: '2023-03-20' },
      { id: 4, name: '柚子', stock: 30, unit: '個', season: 'winter', origin: '高知', lastOrdered: '2023-02-10' },
      { id: 5, name: '栗', stock: 500, unit: 'g', season: 'autumn', origin: '愛媛', lastOrdered: '2023-09-01' },
    ];
    setIngredients(mockIngredients);
    setFilteredIngredients(mockIngredients);
  }, []);

  useEffect(() => {
    const filtered = ingredients.filter(ingredient => 
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSeason === 'all' || ingredient.season === selectedSeason)
    );
    setFilteredIngredients(filtered);
  }, [searchTerm, selectedSeason, ingredients]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSeasonChange = (e) => {
    setSelectedSeason(e.target.value);
  };

  const getStockStatus = (stock) => {
    if (stock > 1000) return 'text-green-600';
    if (stock > 500) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 font-serif">原材料追跡システム</h1>
      
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="材料を検索..."
            className="pl-10 pr-4 py-2 rounded-full border-2 border-[#006400] focus:outline-none focus:border-[#007500]"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-[#4A2311]" size={20} />
        </div>
        
        <select
          className="px-4 py-2 rounded-full border-2 border-[#006400] bg-white focus:outline-none focus:border-[#007500]"
          value={selectedSeason}
          onChange={handleSeasonChange}
        >
          <option value="all">全季節</option>
          <option value="spring">春</option>
          <option value="summer">夏</option>
          <option value="autumn">秋</option>
          <option value="winter">冬</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIngredients.map(ingredient => (
          <div key={ingredient.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-[#4A2311] mb-4">{ingredient.name}</h2>
            <div className="space-y-2">
              <p className="flex items-center">
                <BarChart2 className="mr-2 text-[#006400]" size={18} />
                <span className={`font-semibold ${getStockStatus(ingredient.stock)}`}>
                  在庫: {ingredient.stock} {ingredient.unit}
                </span>
              </p>
              <p className="flex items-center">
                <Leaf className="mr-2 text-[#006400]" size={18} />
                原産地: {ingredient.origin}
              </p>
              <p className="flex items-center">
                <Calendar className="mr-2 text-[#006400]" size={18} />
                最終入荷日: {ingredient.lastOrdered}
              </p>
              {ingredient.stock < 100 && (
                <p className="flex items-center text-red-600">
                  <AlertTriangle className="mr-2" size={18} />
                  在庫が少なくなっています
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredIngredients.length === 0 && (
        <div className="text-center text-[#4A2311] mt-8">
          <p className="text-xl">該当する材料が見つかりません。</p>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-[#4A2311] mb-4 font-serif">季節ごとの使用状況</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['spring', 'summer', 'autumn', 'winter'].map(season => (
              <div key={season} className="text-center">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
                  season === 'spring' ? 'bg-pink-200' :
                  season === 'summer' ? 'bg-green-200' :
                  season === 'autumn' ? 'bg-orange-200' : 'bg-blue-200'
                }`}>
                  <span className="text-3xl font-bold text-[#4A2311]">
                    {filteredIngredients.filter(i => i.season === season).length}
                  </span>
                </div>
                <p className="mt-2 text-[#4A2311] capitalize">{season}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-[#4A2311]">
        <p>© 2023 和菓子原材料追跡システム - 菓匠 鈴乃家</p>
      </footer>
    </div>
  );
};

export default IngredientTracking;