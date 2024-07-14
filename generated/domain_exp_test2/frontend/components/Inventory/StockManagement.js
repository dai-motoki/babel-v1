import React, { useState, useEffect } from 'react';
import { Search, Plus, Minus, Edit, Trash2, ArrowUpDown, ChevronDown } from 'lucide-react';

const StockManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('全て');

  useEffect(() => {
    // 仮のデータを設定
    const mockData = [
      { id: 1, name: '桜餅', category: '春', quantity: 50, unit: '個', reorderPoint: 20 },
      { id: 2, name: '柏餅', category: '春', quantity: 40, unit: '個', reorderPoint: 15 },
      { id: 3, name: '水羊羹', category: '夏', quantity: 30, unit: '本', reorderPoint: 10 },
      { id: 4, name: '栗きんとん', category: '秋', quantity: 60, unit: '個', reorderPoint: 25 },
      { id: 5, name: '雪うさぎ', category: '冬', quantity: 45, unit: '個', reorderPoint: 20 },
    ];
    setInventory(mockData);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleQuantityChange = (id, change) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ));
  };

  const filteredAndSortedInventory = inventory
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => selectedCategory === '全て' || item.category === selectedCategory)
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="bg-cream-100 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-green-800 mb-6">和菓子在庫管理</h2>
      
      <div className="flex flex-wrap mb-6 gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              placeholder="和菓子を検索..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-2.5 text-green-500" size={20} />
          </div>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white"
          >
            <option value="全て">全てのカテゴリー</option>
            <option value="春">春</option>
            <option value="夏">夏</option>
            <option value="秋">秋</option>
            <option value="冬">冬</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-green-100">
            <tr>
              {['名前', 'カテゴリー', '数量', '単位', '再発注点', '操作'].map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(['name', 'category', 'quantity', 'unit', 'reorderPoint'][index])}
                >
                  <div className="flex items-center">
                    {header}
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-green-200">
            {filteredAndSortedInventory.map((item) => (
              <tr key={item.id} className="hover:bg-green-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.reorderPoint}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedInventory.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          該当する和菓子がありません。
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          新しい和菓子を追加
        </button>
      </div>
    </div>
  );
};

export default StockManagement;