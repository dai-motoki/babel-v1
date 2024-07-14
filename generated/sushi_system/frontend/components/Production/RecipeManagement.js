import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, ChevronDown, ChevronUp, Save, X } from 'lucide-react';

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: [], steps: [] });

  useEffect(() => {
    // モックデータの読み込み
    const mockRecipes = [
      { id: 1, name: '握り寿司（マグロ）', ingredients: ['マグロ', '酢飯', 'わさび'], steps: ['1. 酢飯を握る', '2. わさびを塗る', '3. マグロを乗せる'] },
      { id: 2, name: '巻き寿司（カッパ巻き）', ingredients: ['きゅうり', '酢飯', '海苔'], steps: ['1. 海苔を広げる', '2. 酢飯を乗せる', '3. きゅうりを置く', '4. 巻く'] },
      { id: 3, name: 'にぎり寿司（サーモン）', ingredients: ['サーモン', '酢飯', 'わさび'], steps: ['1. 酢飯を握る', '2. わさびを塗る', '3. サーモンを乗せる'] },
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
    setSelectedRecipe(recipe);
    setIsEditing(false);
  };

  const handleEditRecipe = () => {
    setIsEditing(true);
  };

  const handleSaveRecipe = () => {
    if (selectedRecipe) {
      setRecipes(recipes.map(r => r.id === selectedRecipe.id ? selectedRecipe : r));
    } else {
      setRecipes([...recipes, { ...newRecipe, id: recipes.length + 1 }]);
    }
    setIsEditing(false);
    setSelectedRecipe(null);
    setNewRecipe({ name: '', ingredients: [], steps: [] });
  };

  const handleDeleteRecipe = () => {
    setRecipes(recipes.filter(r => r.id !== selectedRecipe.id));
    setSelectedRecipe(null);
  };

  const handleAddNewRecipe = () => {
    setSelectedRecipe(null);
    setIsEditing(true);
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 font-serif">寿司レシピ管理</h1>
      <div className="flex space-x-8">
        <div className="w-1/3 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4 bg-[#003366] rounded-full p-2">
            <Search className="text-white mr-2" />
            <input
              type="text"
              placeholder="レシピを検索"
              className="bg-transparent text-white placeholder-white outline-none w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button
            onClick={handleAddNewRecipe}
            className="w-full bg-[#FF0000] text-white py-2 rounded-full mb-4 flex items-center justify-center hover:bg-[#E60000] transition duration-300"
          >
            <Plus className="mr-2" /> 新しいレシピを追加
          </button>
          <div className="space-y-2">
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                onClick={() => handleSelectRecipe(recipe)}
                className={`p-3 rounded-lg cursor-pointer transition duration-300 ${
                  selectedRecipe && selectedRecipe.id === recipe.id
                    ? 'bg-[#003366] text-white'
                    : 'bg-[#F3EAD3] text-[#4A2311] hover:bg-[#E6D8B5]'
                }`}
              >
                {recipe.name}
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 bg-white rounded-lg shadow-lg p-6">
          {selectedRecipe || isEditing ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#4A2311] font-serif">
                  {isEditing ? (selectedRecipe ? '編集中：' : '新規レシピ：') : ''}
                  {isEditing ? (
                    <input
                      type="text"
                      value={selectedRecipe ? selectedRecipe.name : newRecipe.name}
                      onChange={(e) => selectedRecipe ? setSelectedRecipe({...selectedRecipe, name: e.target.value}) : setNewRecipe({...newRecipe, name: e.target.value})}
                      className="border-b-2 border-[#003366] focus:outline-none"
                    />
                  ) : (
                    selectedRecipe && selectedRecipe.name
                  )}
                </h2>
                <div className="space-x-2">
                  {!isEditing && (
                    <>
                      <button onClick={handleEditRecipe} className="bg-[#003366] text-white p-2 rounded-full hover:bg-[#004080] transition duration-300">
                        <Edit2 size={20} />
                      </button>
                      <button onClick={handleDeleteRecipe} className="bg-[#FF0000] text-white p-2 rounded-full hover:bg-[#E60000] transition duration-300">
                        <Trash2 size={20} />
                      </button>
                    </>
                  )}
                  {isEditing && (
                    <>
                      <button onClick={handleSaveRecipe} className="bg-[#003366] text-white p-2 rounded-full hover:bg-[#004080] transition duration-300">
                        <Save size={20} />
                      </button>
                      <button onClick={() => setIsEditing(false)} className="bg-[#FF0000] text-white p-2 rounded-full hover:bg-[#E60000] transition duration-300">
                        <X size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#4A2311] mb-2 font-serif">材料</h3>
                {isEditing ? (
                  <div>
                    {(selectedRecipe ? selectedRecipe.ingredients : newRecipe.ingredients).map((ingredient, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) => {
                            const newIngredients = [...(selectedRecipe ? selectedRecipe.ingredients : newRecipe.ingredients)];
                            newIngredients[index] = e.target.value;
                            selectedRecipe
                              ? setSelectedRecipe({...selectedRecipe, ingredients: newIngredients})
                              : setNewRecipe({...newRecipe, ingredients: newIngredients});
                          }}
                          className="border-b border-[#003366] focus:outline-none mr-2"
                        />
                        <button
                          onClick={() => {
                            const newIngredients = (selectedRecipe ? selectedRecipe.ingredients : newRecipe.ingredients).filter((_, i) => i !== index);
                            selectedRecipe
                              ? setSelectedRecipe({...selectedRecipe, ingredients: newIngredients})
                              : setNewRecipe({...newRecipe, ingredients: newIngredients});
                          }}
                          className="text-[#FF0000]"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newIngredients = [...(selectedRecipe ? selectedRecipe.ingredients : newRecipe.ingredients), ''];
                        selectedRecipe
                          ? setSelectedRecipe({...selectedRecipe, ingredients: newIngredients})
                          : setNewRecipe({...newRecipe, ingredients: newIngredients});
                      }}
                      className="text-[#003366] hover:text-[#004080]"
                    >
                      <Plus size={16} /> 材料を追加
                    </button>
                  </div>
                ) : (
                  <ul className="list-disc list-inside">
                    {selectedRecipe && selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-[#4A2311]">{ingredient}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#4A2311] mb-2 font-serif">手順</h3>
                {isEditing ? (
                  <div>
                    {(selectedRecipe ? selectedRecipe.steps : newRecipe.steps).map((step, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={step}
                          onChange={(e) => {
                            const newSteps = [...(selectedRecipe ? selectedRecipe.steps : newRecipe.steps)];
                            newSteps[index] = e.target.value;
                            selectedRecipe
                              ? setSelectedRecipe({...selectedRecipe, steps: newSteps})
                              : setNewRecipe({...newRecipe, steps: newSteps});
                          }}
                          className="border-b border-[#003366] focus:outline-none mr-2 w-full"
                        />
                        <button
                          onClick={() => {
                            const newSteps = (selectedRecipe ? selectedRecipe.steps : newRecipe.steps).filter((_, i) => i !== index);
                            selectedRecipe
                              ? setSelectedRecipe({...selectedRecipe, steps: newSteps})
                              : setNewRecipe({...newRecipe, steps: newSteps});
                          }}
                          className="text-[#FF0000]"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newSteps = [...(selectedRecipe ? selectedRecipe.steps : newRecipe.steps), ''];
                        selectedRecipe
                          ? setSelectedRecipe({...selectedRecipe, steps: newSteps})
                          : setNewRecipe({...newRecipe, steps: newSteps});
                      }}
                      className="text-[#003366] hover:text-[#004080]"
                    >
                      <Plus size={16} /> 手順を追加
                    </button>
                  </div>
                ) : (
                  <ol className="list-decimal list-inside">
                    {selectedRecipe && selectedRecipe.steps.map((step, index) => (
                      <li key={index} className="text-[#4A2311] mb-2">{step}</li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-[#4A2311]">
              レシピを選択するか、新しいレシピを追加してください。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeManagement;