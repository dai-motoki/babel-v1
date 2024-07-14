import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clipboard, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const IngredientTracking = () => {
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    // 模擬的なデータフェッチ
    const fetchIngredients = async () => {
      // APIからデータを取得する代わりに、ハードコードされたデータを使用
      const mockIngredients = [
        { id: 1, name: '抹茶', supplier: '京都茶園', status: 'in-stock', quantity: 5000, unit: 'g', expiryDate: '2023-12-31' },
        { id: 2, name: '白玉粉', supplier: '大阪製粉所', status: 'low-stock', quantity: 2000, unit: 'g', expiryDate: '2023-11-30' },
        { id: 3, name: '小豆', supplier: '北海道豆屋', status: 'out-of-stock', quantity: 0, unit: 'kg', expiryDate: '2024-03-31' },
        { id: 4, name: '砂糖', supplier: '鹿児島製糖', status: 'in-stock', quantity: 10000, unit: 'g', expiryDate: '2024-06-30' },
        { id: 5, name: '桜の葉', supplier: '奈良自然園', status: 'in-stock', quantity: 500, unit: '枚', expiryDate: '2023-10-15' },
      ];
      setIngredients(mockIngredients);
      setFilteredIngredients(mockIngredients);
    };

    fetchIngredients();
  }, []);

  useEffect(() => {
    const filtered = ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus === 'all' || ingredient.status === selectedStatus)
    );
    setFilteredIngredients(filtered);
  }, [searchTerm, selectedStatus, ingredients]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-stock':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'low-stock':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'out-of-stock':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-[#4A2311] font-yumin">和菓子原材料追跡</h1>
      
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="原材料を検索..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 rounded-full border-2 border-[#006400] focus:outline-none focus:border-[#FFB7C5] transition duration-300 bg-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#006400]" />
        </div>
        
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="px-4 py-2 rounded-full border-2 border-[#006400] focus:outline-none focus:border-[#FFB7C5] transition duration-300 bg-white text-[#4A2311]"
        >
          <option value="all">全ての状態</option>
          <option value="in-stock">在庫あり</option>
          <option value="low-stock">在庫少</option>
          <option value="out-of-stock">在庫切れ</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIngredients.map(ingredient => (
          <div key={ingredient.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-2 border-[#006400]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#4A2311] font-yumin">{ingredient.name}</h2>
              {getStatusIcon(ingredient.status)}
            </div>
            <p className="text-[#4A2311] mb-2">
              <span className="font-semibold">仕入れ先:</span> {ingredient.supplier}
            </p>
            <p className="text-[#4A2311] mb-2">
              <span className="font-semibold">数量:</span> {ingredient.quantity} {ingredient.unit}
            </p>
            <p className="text-[#4A2311] mb-4 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-[#006400]" />
              <span className="font-semibold">消費期限:</span> {ingredient.expiryDate}
            </p>
            <button className="w-full bg-[#006400] text-white py-2 rounded-full hover:bg-[#007500] transition duration-300 flex items-center justify-center">
              <Clipboard className="w-4 h-4 mr-2" />
              在庫更新
            </button>
          </div>
        ))}
      </div>

      {filteredIngredients.length === 0 && (
        <div className="text-center text-[#4A2311] mt-8">
          <p className="text-xl font-semibold">該当する原材料が見つかりません。</p>
          <p>検索条件を変更してお試しください。</p>
        </div>
      )}
    </div>
  );
};

export default IngredientTracking;