import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, MinusCircle, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const StockManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    // モックデータの読み込み
    const mockInventory = [
      { id: 1, name: '抹茶どら焼き', category: '和菓子', quantity: 50, unit: '個', reorderPoint: 20 },
      { id: 2, name: '桜餅', category: '季節限定', quantity: 30, unit: '個', reorderPoint: 15 },
      { id: 3, name: '羊羹', category: '伝統和菓子', quantity: 40, unit: '本', reorderPoint: 10 },
      { id: 4, name: '柚子大福', category: '和菓子', quantity: 25, unit: '個', reorderPoint: 12 },
      { id: 5, name: '栗きんとん', category: '季節限定', quantity: 35, unit: '個', reorderPoint: 18 },
    ];
    setInventory(mockInventory);
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

  const handleQuantityChange = (id, increment) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + increment } : item
    ));
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
  };

  const handleSave = () => {
    setInventory(inventory.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedInventory = filteredInventory.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8">和菓子在庫管理</h1>
      
      <div className="mb-6 flex items-center">
        <Search className="text-[#4A2311] mr-2" />
        <input
          type="text"
          placeholder="和菓子を検索..."
          value={searchTerm}
          onChange={handleSearch}
          className="bg-white border border-[#006400] rounded-md py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-[#006400]"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#006400] text-white">
              <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('name')}>
                商品名 {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
              </th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('category')}>
                カテゴリ {sortColumn === 'category' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
              </th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('quantity')}>
                在庫数 {sortColumn === 'quantity' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
              </th>
              <th className="py-3 px-4">単位</th>
              <th className="py-3 px-4">発注点</th>
              <th className="py-3 px-4">操作</th>
            </tr>
          </thead>
          <tbody>
            {sortedInventory.map(item => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-[#FFB7C5] transition duration-300">
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4">
                  {editingItem && editingItem.id === item.id ? (
                    <input
                      type="number"
                      value={editingItem.quantity}
                      onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) })}
                      className="w-16 border rounded px-2 py-1"
                    />
                  ) : (
                    <div className="flex items-center">
                      <button onClick={() => handleQuantityChange(item.id, -1)} className="text-[#006400] mr-2">
                        <MinusCircle size={20} />
                      </button>
                      {item.quantity}
                      <button onClick={() => handleQuantityChange(item.id, 1)} className="text-[#006400] ml-2">
                        <PlusCircle size={20} />
                      </button>
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">{item.unit}</td>
                <td className="py-3 px-4">{item.reorderPoint}</td>
                <td className="py-3 px-4">
                  {editingItem && editingItem.id === item.id ? (
                    <button onClick={handleSave} className="text-[#006400] mr-2">
                      保存
                    </button>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item)} className="text-[#006400] mr-2">
                        <Edit size={20} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-500">
                        <Trash2 size={20} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-[#4A2311] mb-4">在庫状況サマリー</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-[#006400] mb-2">総在庫数</h3>
            <p className="text-3xl font-bold">{inventory.reduce((sum, item) => sum + item.quantity, 0)} 個</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-[#006400] mb-2">要発注商品数</h3>
            <p className="text-3xl font-bold">{inventory.filter(item => item.quantity <= item.reorderPoint).length} 品目</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-[#006400] mb-2">カテゴリ数</h3>
            <p className="text-3xl font-bold">{new Set(inventory.map(item => item.category)).size}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;