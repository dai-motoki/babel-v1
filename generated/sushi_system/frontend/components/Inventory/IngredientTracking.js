import React, { useState, useEffect } from 'react';
import { MapPin, Fish, Truck, Calendar, Search, ChevronDown, ChevronUp } from 'lucide-react';

const IngredientTracking = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setIsLoading(true);
        // 模擬的なデータ取得の遅延
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData = [
          { id: 1, name: 'マグロ', origin: '三陸沖', arrivalDate: '2023-06-15', grade: 'A', storageMethod: '冷凍', expirationDate: '2023-06-22', supplier: '海鮮株式会社', shippingMethod: '冷凍車', estimatedArrival: '2023-06-16', route: ['漁港', '加工場', '配送センター', '店舗'] },
          { id: 2, name: 'サーモン', origin: 'ノルウェー', arrivalDate: '2023-06-14', grade: 'B', storageMethod: '冷蔵', expirationDate: '2023-06-20', supplier: 'ノルディック・フィッシュ', shippingMethod: '航空便', estimatedArrival: '2023-06-15', route: ['養殖場', '空港', '配送センター', '店舗'] },
          // 他の原材料データを追加
        ];
        setIngredients(mockData);
      } catch (error) {
        console.error('エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const sortedIngredients = [...ingredients].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredIngredients = sortedIngredients.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(selectedIngredient === ingredient ? null : ingredient);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (ingredients.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-600">データがありません</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-900 font-japanese animate-fade-in">原材料追跡システム</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-slide-up">
        <div className="flex items-center mb-4">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="原材料を検索"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-100 text-indigo-900">
              <th className="p-3 text-left cursor-pointer transition duration-300 hover:bg-indigo-200" onClick={() => handleSort('name')}>
                原材料名
                {sortBy === 'name' && (sortOrder === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
              </th>
              <th className="p-3 text-left cursor-pointer transition duration-300 hover:bg-indigo-200" onClick={() => handleSort('origin')}>
                産地
                {sortBy === 'origin' && (sortOrder === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
              </th>
              <th className="p-3 text-left cursor-pointer transition duration-300 hover:bg-indigo-200" onClick={() => handleSort('arrivalDate')}>
                入荷日
                {sortBy === 'arrivalDate' && (sortOrder === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients.map((ingredient) => (
              <React.Fragment key={ingredient.id}>
                <tr
                  className={`border-b border-gray-200 hover:bg-indigo-50 cursor-pointer transition duration-300 ease-in-out ${
                    selectedIngredient === ingredient ? 'bg-indigo-100' : ''
                  }`}
                  onClick={() => handleIngredientClick(ingredient)}
                >
                  <td className="p-3">
                    <Fish className="inline mr-2 text-indigo-500" />
                    {ingredient.name}
                  </td>
                  <td className="p-3">
                    <MapPin className="inline mr-2 text-indigo-500" />
                    {ingredient.origin}
                  </td>
                  <td className="p-3">
                    <Calendar className="inline mr-2 text-indigo-500" />
                    {ingredient.arrivalDate}
                  </td>
                </tr>
                {selectedIngredient === ingredient && (
                  <tr>
                    <td colSpan="3" className="p-4 bg-indigo-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-indigo-900">詳細情報</h3>
                          <p><span className="font-semibold">品質等級:</span> {ingredient.grade}</p>
                          <p><span className="font-semibold">保存方法:</span> {ingredient.storageMethod}</p>
                          <p><span className="font-semibold">使用期限:</span> {ingredient.expirationDate}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-indigo-900">配送情報</h3>
                          <p><span className="font-semibold">配送業者:</span> {ingredient.supplier}</p>
                          <p><span className="font-semibold">配送方法:</span> {ingredient.shippingMethod}</p>
                          <p><span className="font-semibold">到着予定:</span> {ingredient.estimatedArrival}</p>
                        </div>
                      </div>
                      <div className="mt-4 animate-slide-up">
                        <h3 className="text-lg font-semibold mb-2 text-indigo-900">配送経路</h3>
                        <div className="flex items-center space-x-2">
                          {ingredient.route.map((step, index) => (
                            <React.Fragment key={index}>
                              <div className="bg-indigo-200 rounded-full p-2 animate-pulse">
                                <Truck className="text-indigo-700" />
                              </div>
                              {index < ingredient.route.length - 1 && (
                                <div className="flex-1 h-0.5 bg-indigo-300"></div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        <div className="flex justify-between mt-2">
                          {ingredient.route.map((step, index) => (
                            <div key={index} className="text-sm text-indigo-700">
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngredientTracking;
