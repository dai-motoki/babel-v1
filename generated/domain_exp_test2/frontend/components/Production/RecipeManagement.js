import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全て');
  const [showForm, setShowForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ name: '', category: '', ingredients: '', instructions: '' });
  const [expandedRecipe, setExpandedRecipe] = useState(null);

  const categories = ['全て', '和菓子', '抹茶', '季節限定', '伝統菓子'];

  useEffect(() => {
    // モックデータの読み込み
    const mockRecipes = [
      { id: 1, name: '桜餅', category: '季節限定', ingredients: '道明寺粉, 桜の葉, あんこ', instructions: '1. 道明寺粉を蒸す\n2. あんこを包む\n3. 桜の葉で包む' },
      { id: 2, name: '抹茶羊羹', category: '抹茶', ingredients: '小豆, 砂糖, 寒天, 抹茶', instructions: '1. 小豆を煮る\n2. 寒天を溶かす\n3. 抹茶を加えて型に流し込む' },
      { id: 3, name: '柏餅', category: '伝統菓子', ingredients: 'うるち米粉, 柏の葉, こしあん', instructions: '1. 米粉を蒸す\n2. あんこを包む\n3. 柏の葉で包む' },
    ];
    setRecipes(mockRecipes);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddRecipe = () => {
    setRecipes([...recipes, { ...newRecipe, id: recipes.length + 1 }]);
    setNewRecipe({ name: '', category: '', ingredients: '', instructions: '' });
    setShowForm(false);
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  const handleExpandRecipe = (id) => {
    setExpandedRecipe(expandedRecipe === id ? null : id);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '全て' || recipe.category === selectedCategory)
  );

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-[#4A2311] font-yumin">和菓子レシピ管理</h1>
      
      <div className="mb-8 flex flex-wrap items-center">
        <div className="relative mr-4 mb-4">
          <input
            type="text"
            placeholder="レシピを検索"
            className="pl-10 pr-4 py-2 rounded-full bg-white border border-[#006400] focus:outline-none focus:ring-2 focus:ring-[#006400]"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-[#006400]" size={20} />
        </div>
        
        <div className="flex flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              className={`mr-2 mb-2 px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-[#006400] text-white'
                  : 'bg-white text-[#006400] border border-[#006400]'
              } hover:bg-[#007500] hover:text-white transition duration-300`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-[#4A2311] font-yumin">{recipe.name}</h2>
              <p className="text-[#006400] mb-4">{recipe.category}</p>
              <div className="flex justify-between items-center">
                <button
                  className="text-[#006400] hover:text-[#007500] transition duration-300"
                  onClick={() => handleExpandRecipe(recipe.id)}
                >
                  {expandedRecipe === recipe.id ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </button>
                <button
                  className="text-red-500 hover:text-red-700 transition duration-300"
                  onClick={() => handleDeleteRecipe(recipe.id)}
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
            {expandedRecipe === recipe.id && (
              <div className="px-6 pb-6">
                <h3 className="font-bold mb-2 text-[#4A2311]">材料:</h3>
                <p className="mb-4">{recipe.ingredients}</p>
                <h3 className="font-bold mb-2 text-[#4A2311]">作り方:</h3>
                <p className="whitespace-pre-line">{recipe.instructions}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {!showForm && (
        <button
          className="fixed bottom-8 right-8 bg-[#006400] text-white rounded-full p-4 shadow-lg hover:bg-[#007500] transition duration-300"
          onClick={() => setShowForm(true)}
        >
          <Plus size={24} />
        </button>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-[#4A2311] font-yumin">新しいレシピを追加</h2>
            <input
              type="text"
              placeholder="レシピ名"
              className="w-full mb-4 p-2 border border-[#006400] rounded"
              value={newRecipe.name}
              onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            />
            <select
              className="w-full mb-4 p-2 border border-[#006400] rounded"
              value={newRecipe.category}
              onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
            >
              <option value="">カテゴリーを選択</option>
              {categories.filter(c => c !== '全て').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <textarea
              placeholder="材料"
              className="w-full mb-4 p-2 border border-[#006400] rounded"
              value={newRecipe.ingredients}
              onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
            />
            <textarea
              placeholder="作り方"
              className="w-full mb-4 p-2 border border-[#006400] rounded"
              value={newRecipe.instructions}
              onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
            />
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300"
                onClick={() => setShowForm(false)}
              >
                キャンセル
              </button>
              <button
                className="px-4 py-2 bg-[#006400] text-white rounded hover:bg-[#007500] transition duration-300"
                onClick={handleAddRecipe}
              >
                追加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeManagement;