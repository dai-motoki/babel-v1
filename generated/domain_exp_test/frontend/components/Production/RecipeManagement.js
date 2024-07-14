import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    season: '',
    difficulty: 'medium'
  });

  useEffect(() => {
    // モックデータの読み込み（実際のAPIコールに置き換えることができます）
    const mockRecipes = [
      { id: 1, name: '桜餅', ingredients: '道明寺粉, 桜の葉, あんこ', instructions: '1. 道明寺粉を蒸す\n2. あんこを包む\n3. 桜の葉で包む', season: '春', difficulty: 'medium' },
      { id: 2, name: '水羊羹', ingredients: '寒天, 砂糖, 小豆', instructions: '1. 寒天を溶かす\n2. 砂糖と小豆を加える\n3. 型に流し入れて冷やす', season: '夏', difficulty: 'easy' },
      { id: 3, name: '栗きんとん', ingredients: '栗, 砂糖', instructions: '1. 栗を茹でる\n2. 裏ごしする\n3. 砂糖を加えて練る', season: '秋', difficulty: 'hard' },
    ];
    setRecipes(mockRecipes);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(selectedRecipe && selectedRecipe.id === recipe.id ? null : recipe);
  };

  const handleAddRecipe = () => {
    setIsAddingRecipe(true);
  };

  const handleSaveNewRecipe = () => {
    const recipeToAdd = {
      ...newRecipe,
      id: recipes.length + 1
    };
    setRecipes([...recipes, recipeToAdd]);
    setIsAddingRecipe(false);
    setNewRecipe({ name: '', ingredients: '', instructions: '', season: '', difficulty: 'medium' });
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
    setSelectedRecipe(null);
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 font-yumin">和菓子レシピ管理</h1>
      
      <div className="mb-6 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="レシピを検索..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full py-2 px-4 pr-10 rounded-full border-2 border-[#006400] focus:outline-none focus:ring-2 focus:ring-[#FFB7C5] bg-white text-[#4A2311]"
          />
          <Search className="absolute right-3 top-2.5 text-[#006400]" size={20} />
        </div>
        <button
          onClick={handleAddRecipe}
          className="ml-4 bg-[#006400] text-white py-2 px-4 rounded-full hover:bg-[#007500] transition duration-300 flex items-center"
        >
          <Plus size={20} className="mr-2" />
          新規レシピ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="p-4 cursor-pointer flex justify-between items-center"
              onClick={() => handleSelectRecipe(recipe)}
            >
              <h3 className="text-xl font-semibold text-[#4A2311]">{recipe.name}</h3>
              {selectedRecipe && selectedRecipe.id === recipe.id ? (
                <ChevronUp className="text-[#006400]" size={20} />
              ) : (
                <ChevronDown className="text-[#006400]" size={20} />
              )}
            </div>
            {selectedRecipe && selectedRecipe.id === recipe.id && (
              <div className="p-4 border-t border-[#FFB7C5]">
                <p className="mb-2"><strong>材料:</strong> {recipe.ingredients}</p>
                <p className="mb-2"><strong>手順:</strong></p>
                <ol className="list-decimal list-inside mb-2">
                  {recipe.instructions.split('\n').map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
                <p className="mb-2"><strong>季節:</strong> {recipe.season}</p>
                <p className="mb-4"><strong>難易度:</strong> {recipe.difficulty}</p>
                <div className="flex justify-end">
                  <button className="mr-2 text-blue-600 hover:text-blue-800">
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {isAddingRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-[#4A2311]">新規レシピ追加</h2>
            <input
              type="text"
              placeholder="レシピ名"
              value={newRecipe.name}
              onChange={(e) => setNewRecipe({...newRecipe, name: e.target.value})}
              className="w-full mb-4 p-2 border border-[#006400] rounded"
            />
            <textarea
              placeholder="材料"
              value={newRecipe.ingredients}
              onChange={(e) => setNewRecipe({...newRecipe, ingredients: e.target.value})}
              className="w-full mb-4 p-2 border border-[#006400] rounded"
            />
            <textarea
              placeholder="手順"
              value={newRecipe.instructions}
              onChange={(e) => setNewRecipe({...newRecipe, instructions: e.target.value})}
              className="w-full mb-4 p-2 border border-[#006400] rounded"
            />
            <input
              type="text"
              placeholder="季節"
              value={newRecipe.season}
              onChange={(e) => setNewRecipe({...newRecipe, season: e.target.value})}
              className="w-full mb-4 p-2 border border-[#006400] rounded"
            />
            <select
              value={newRecipe.difficulty}
              onChange={(e) => setNewRecipe({...newRecipe, difficulty: e.target.value})}
              className="w-full mb-4 p-2 border border-[#006400] rounded"
            >
              <option value="easy">簡単</option>
              <option value="medium">普通</option>
              <option value="hard">難しい</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddingRecipe(false)}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveNewRecipe}
                className="px-4 py-2 bg-[#006400] text-white rounded hover:bg-[#007500]"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeManagement;