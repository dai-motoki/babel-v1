import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全て');
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    category: '',
    ingredients: '',
    instructions: '',
    season: '',
  });

  useEffect(() => {
    // モックデータの読み込み（実際のAPIコールに置き換えることができます）
    const mockRecipes = [
      { id: 1, name: '桜餅', category: '和菓子', ingredients: '桜の葉、道明寺粉、こしあん', instructions: '1. 道明寺粉を蒸す\n2. こしあんを包む\n3. 桜の葉で包む', season: '春' },
      { id: 2, name: '柏餅', category: '和菓子', ingredients: '柏の葉、上新粉、こしあん', instructions: '1. 上新粉で生地を作る\n2. こしあんを包む\n3. 柏の葉で包む', season: '春' },
      { id: 3, name: '水羊羹', category: '和菓子', ingredients: '寒天、砂糖、小豆', instructions: '1. 寒天を煮溶かす\n2. 砂糖と小豆を加える\n3. 型に流し入れて冷やす', season: '夏' },
    ];
    setRecipes(mockRecipes);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRecipe) {
      setRecipes(recipes.map(recipe => recipe.id === editingRecipe.id ? { ...newRecipe, id: editingRecipe.id } : recipe));
      setEditingRecipe(null);
    } else {
      setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
    }
    setNewRecipe({ name: '', category: '', ingredients: '', instructions: '', season: '' });
    setShowForm(false);
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setNewRecipe(recipe);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '全て' || recipe.category === selectedCategory)
  );

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8">和菓子レシピ管理</h1>

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
        <select
          className="mr-4 mb-4 px-4 py-2 rounded-full bg-white border border-[#006400] focus:outline-none focus:ring-2 focus:ring-[#006400]"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="全て">全てのカテゴリー</option>
          <option value="和菓子">和菓子</option>
          <option value="茶菓子">茶菓子</option>
          <option value="季節の菓子">季節の菓子</option>
        </select>
        <button
          className="mb-4 px-4 py-2 bg-[#006400] text-white rounded-full hover:bg-[#007500] transition duration-300 flex items-center"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={20} className="mr-2" />
          新しいレシピ
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#4A2311] mb-4">{editingRecipe ? 'レシピを編集' : '新しいレシピを追加'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="レシピ名"
              value={newRecipe.name}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-md border border-[#006400] focus:outline-none focus:ring-2 focus:ring-[#006400]"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="カテゴリー"
              value={newRecipe.category}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-md border border-[#006400] focus:outline-none focus:ring-2 focus:ring-[#006400]"
              required
            />
            <input
              type="text"
              name="ingredients"
              placeholder="材料"
              value={newRecipe.ingredients}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-md border border-[#006400] focus:outline-none focus:ring-2 focus:ring-[#006400]"
              required
            />
            <input
              type="text"
              name="season"
              placeholder="季節"
              value={newRecipe.season}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-md border border-[#006400] focus:outline-none focus:ring-2 focus:ring-[#006400]"
            />
          </div>
          <textarea
            name="instructions"
            placeholder="作り方"
            value={newRecipe.instructions}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-4 rounded-md border border-[#006400] focus:outline-none focus:ring-2 focus:ring-[#006400]"
            rows="4"
            required
          ></textarea>
          <button type="submit" className="mt-4 px-6 py-2 bg-[#006400] text-white rounded-full hover:bg-[#007500] transition duration-300">
            {editingRecipe ? '更新' : '追加'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#4A2311] mb-2">{recipe.name}</h3>
              <p className="text-sm text-[#4A2311] mb-2">カテゴリー: {recipe.category}</p>
              <p className="text-sm text-[#4A2311] mb-2">季節: {recipe.season}</p>
              <details className="mt-4">
                <summary className="cursor-pointer text-[#006400] font-semibold flex items-center">
                  詳細を見る
                  <ChevronDown size={20} className="ml-2" />
                </summary>
                <div className="mt-2 text-[#4A2311]">
                  <p className="font-semibold">材料:</p>
                  <p>{recipe.ingredients}</p>
                  <p className="font-semibold mt-2">作り方:</p>
                  <p>{recipe.instructions}</p>
                </div>
              </details>
            </div>
            <div className="bg-[#F3EAD3] px-6 py-3 flex justify-end">
              <button
                onClick={() => handleEdit(recipe)}
                className="mr-2 text-[#006400] hover:text-[#007500]"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => handleDelete(recipe.id)}
                className="text-[#FF4500] hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeManagement;