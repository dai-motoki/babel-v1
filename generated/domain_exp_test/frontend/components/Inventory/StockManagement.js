import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const StockManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // 仮のデータをセット（実際のアプリケーションではAPIから取得）
    const mockInventory = [
      { id: 1, name: '抹茶どら焼き', category: '和菓子', quantity: 50, unit: '個', expirationDate: '2023-06-30' },
      { id: 2, name: '桜餅', category: '季節限定', quantity: 30, unit: '個', expirationDate: '2023-05-15' },
      { id: 3, name: '羊羹', category: '伝統和菓子', quantity: 20, unit: '本', expirationDate: '2023-08-31' },
      { id: 4, name: '栗きんとん', category: '季節限定', quantity: 40, unit: '個', expirationDate: '2023-10-31' },
      { id: 5, name: '抹茶パウダー', category: '原材料', quantity: 5, unit: 'kg', expirationDate: '2024-03-31' },
      // ... 他の在庫アイテム
    ];
    setInventory(mockInventory);
    setFilteredInventory(mockInventory);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = inventory.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
    setFilteredInventory(filtered);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }

    const sorted = [...filteredInventory].sort((a, b) => {
      if (a[column] < b[column]) return sortDirection === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredInventory(sorted);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-[#4A2311]">和菓子在庫管理</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="商品名や分類で検索..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border border-[#006400] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006400] bg-white text-[#4A2311]"
          />
          <Search className="absolute left-3 top-2.5 text-[#006400]" size={20} />
        </div>
        <button className="bg-[#006400] text-white px-4 py-2 rounded-md hover:bg-[#007500] transition duration-300 flex items-center">
          <Plus size={20} className="mr-2" />
          新規商品追加
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#006400] text-white">
            <tr>
              {['商品名', '分類', '在庫数', '単位', '賞味期限'].map((header, index) => (
                <th key={index} className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort(header)}>
                  <div className="flex items-center">
                    {header}
                    <ArrowUpDown size={16} className="ml-1" />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5D8B7]">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-[#F9F5E8] transition duration-300">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A2311]">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A2311]">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A2311]">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A2311]">{item.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A2311]">{item.expirationDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A2311]">
                  <button className="text-[#006400] hover:text-[#007500] mr-3">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-[#006400] bg-white text-sm font-medium text-[#006400] hover:bg-[#F9F5E8]"
          >
            <span className="sr-only">前のページ</span>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          {Array.from({ length: Math.ceil(filteredInventory.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`relative inline-flex items-center px-4 py-2 border border-[#006400] bg-white text-sm font-medium ${
                currentPage === index + 1 ? 'text-[#006400] bg-[#F9F5E8]' : 'text-[#4A2311] hover:bg-[#F9F5E8]'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredInventory.length / itemsPerPage)}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-[#006400] bg-white text-sm font-medium text-[#006400] hover:bg-[#F9F5E8]"
          >
            <span className="sr-only">次のページ</span>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default StockManagement;