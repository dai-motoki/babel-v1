import React, { useState, useEffect } from 'react';
import { Search, Users, Calendar, Star, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    // モックデータの生成
    const mockCustomers = [
      { id: 1, name: '田中太郎', visits: 15, lastVisit: '2023-05-01', favoriteSushi: 'マグロ', loyaltyPoints: 150 },
      { id: 2, name: '佐藤花子', visits: 8, lastVisit: '2023-04-15', favoriteSushi: 'サーモン', loyaltyPoints: 80 },
      { id: 3, name: '鈴木一郎', visits: 20, lastVisit: '2023-05-10', favoriteSushi: 'ウニ', loyaltyPoints: 200 },
      { id: 4, name: '高橋美香', visits: 5, lastVisit: '2023-03-20', favoriteSushi: 'イクラ', loyaltyPoints: 50 },
      { id: 5, name: '渡辺健太', visits: 12, lastVisit: '2023-04-30', favoriteSushi: 'エビ', loyaltyPoints: 120 },
    ];
    setCustomers(mockCustomers);
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

  const sortedCustomers = [...customers].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredCustomers = sortedCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 font-serif">顧客管理</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <Search className="text-[#003366] mr-2" />
          <input
            type="text"
            placeholder="顧客を検索..."
            className="w-full p-2 border border-[#003366] rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#003366] text-white">
                <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center">
                    <Users className="mr-1" size={16} />
                    名前
                    {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
                <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('visits')}>
                  <div className="flex items-center">
                    <Calendar className="mr-1" size={16} />
                    来店回数
                    {sortColumn === 'visits' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
                <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('lastVisit')}>
                  <div className="flex items-center">
                    最終来店日
                    {sortColumn === 'lastVisit' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
                <th className="p-3 text-left">お気に入り寿司</th>
                <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('loyaltyPoints')}>
                  <div className="flex items-center">
                    <Star className="mr-1" size={16} />
                    ポイント
                    {sortColumn === 'loyaltyPoints' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
                <th className="p-3 text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-[#003366] hover:bg-[#E6F2FF] transition-colors duration-200 cursor-pointer"
                  onClick={() => handleCustomerSelect(customer)}
                >
                  <td className="p-3">{customer.name}</td>
                  <td className="p-3">{customer.visits}</td>
                  <td className="p-3">{customer.lastVisit}</td>
                  <td className="p-3">{customer.favoriteSushi}</td>
                  <td className="p-3">{customer.loyaltyPoints}</td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedCustomer && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-[#4A2311] mb-4 font-serif">{selectedCustomer.name} さんの詳細情報</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">来店回数:</p>
              <p>{selectedCustomer.visits} 回</p>
            </div>
            <div>
              <p className="font-semibold">最終来店日:</p>
              <p>{selectedCustomer.lastVisit}</p>
            </div>
            <div>
              <p className="font-semibold">お気に入り寿司:</p>
              <p>{selectedCustomer.favoriteSushi}</p>
            </div>
            <div>
              <p className="font-semibold">ポイント:</p>
              <p>{selectedCustomer.loyaltyPoints} ポイント</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-[#4A2311] mb-2 font-serif">おすすめ寿司</h3>
            <ul className="list-disc list-inside">
              <li>特上{selectedCustomer.favoriteSushi}</li>
              <li>{selectedCustomer.favoriteSushi}とイクラの軍艦巻き</li>
              <li>季節の彩り{selectedCustomer.favoriteSushi}セット</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;