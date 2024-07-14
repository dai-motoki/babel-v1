import React, { useState, useEffect } from 'react';
import { Search, Calendar, Truck, Package, Info } from 'lucide-react';

const IngredientTracking = () => {
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    // 実際のアプリケーションではAPIから取得します
    const fetchIngredients = async () => {
      const mockIngredients = [
        { id: 1, name: '抹茶', supplier: '京都茶舗', lastDelivery: '2023-05-15', stock: 5000, unit: 'g' },
        { id: 2, name: '白玉粉', supplier: '岐阜製粉所', lastDelivery: '2023-05-10', stock: 10000, unit: 'g' },
        { id: 3, name: '小豆', supplier: '北海道豆屋', lastDelivery: '2023-05-05', stock: 15000, unit: 'g' },
        { id: 4, name: '砂糖', supplier: '沖縄製糖', lastDelivery: '2023-05-01', stock: 20000, unit: 'g' },
        { id: 5, name: '寒天', supplier: '伊勢寒天店', lastDelivery: '2023-04-28', stock: 2000, unit: 'g' },
      ];
      setIngredients(mockIngredients);
      setFilteredIngredients(mockIngredients);
    };
    fetchIngredients();
  }, []);

  useEffect(() => {
    const results = ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIngredients(results);
  }, [searchTerm, ingredients]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const closeModal = () => {
    setSelectedIngredient(null);
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#4A2311] mb-8 font-yumin">和菓子原材料追跡</h1>
      
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="原材料を検索..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-4 pl-12 rounded-lg bg-white border border-[#006400] focus:outline-none focus:ring-2 focus:ring-[#006400] text-[#4A2311] font-yugoth"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#006400]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIngredients.map(ingredient => (
          <div
            key={ingredient.id}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={() => handleIngredientSelect(ingredient)}
          >
            <h2 className="text-xl font-bold text-[#006400] mb-4 font-yumin">{ingredient.name}</h2>
            <div className="flex items-center mb-2">
              <Truck className="mr-2 text-[#006400]" size={18} />
              <p className="text-[#4A2311] font-yugoth">{ingredient.supplier}</p>
            </div>
            <div className="flex items-center mb-2">
              <Calendar className="mr-2 text-[#006400]" size={18} />
              <p className="text-[#4A2311] font-yugoth">最終入荷: {ingredient.lastDelivery}</p>
            </div>
            <div className="flex items-center">
              <Package className="mr-2 text-[#006400]" size={18} />
              <p className="text-[#4A2311] font-yugoth">在庫: {ingredient.stock}{ingredient.unit}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedIngredient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-[#006400] mb-4 font-yumin">{selectedIngredient.name}</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#4A2311] mb-2 font-yumin">仕入れ先情報</h3>
              <p className="text-[#4A2311] font-yugoth">{selectedIngredient.supplier}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#4A2311] mb-2 font-yumin">最終入荷日</h3>
              <p className="text-[#4A2311] font-yugoth">{selectedIngredient.lastDelivery}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#4A2311] mb-2 font-yumin">現在の在庫</h3>
              <p className="text-[#4A2311] font-yugoth">{selectedIngredient.stock}{selectedIngredient.unit}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#4A2311] mb-2 font-yumin">品質管理情報</h3>
              <p className="text-[#4A2311] font-yugoth">
                最高品質の原材料を使用しています。定期的な品質チェックを行い、
                常に最高の状態を保っています。
              </p>
            </div>
            <button
              onClick={closeModal}
              className="bg-[#006400] text-white font-bold py-2 px-4 rounded hover:bg-[#007500] transition duration-300 w-full"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      <div className="mt-12 bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-[#006400] mb-4 font-yumin">原材料管理のヒント</h2>
        <ul className="list-disc list-inside text-[#4A2311] font-yugoth">
          <li className="mb-2">定期的に在庫を確認し、必要に応じて発注を行いましょう。</li>
          <li className="mb-2">季節の変わり目には、使用頻度の高い原材料の在庫を増やすことをおすすめします。</li>
          <li className="mb-2">品質管理を徹底し、最高の和菓子作りに努めましょう。</li>
          <li>地元の信頼できる仕入れ先との良好な関係を維持することが大切です。</li>
        </ul>
      </div>

      <footer className="mt-12 text-center text-[#4A2311] font-yugoth">
        <p>© 2023 菓匠 鈴乃家 原材料管理システム</p>
      </footer>
    </div>
  );
};

export default IngredientTracking;