import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, ChevronDown, ChevronUp, Plus } from 'lucide-react';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // モックデータの読み込み
    const mockCustomers = [
      { id: 1, name: '鈴木 花子', email: 'hanako@example.com', loyaltyPoints: 150, lastVisit: '2023-05-15' },
      { id: 2, name: '田中 太郎', email: 'taro@example.com', loyaltyPoints: 80, lastVisit: '2023-06-02' },
      { id: 3, name: '佐藤 美咲', email: 'misaki@example.com', loyaltyPoints: 220, lastVisit: '2023-05-28' },
      { id: 4, name: '山田 健太', email: 'kenta@example.com', loyaltyPoints: 50, lastVisit: '2023-06-10' },
      { id: 5, name: '伊藤 由美', email: 'yumi@example.com', loyaltyPoints: 180, lastVisit: '2023-05-20' },
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

  const filteredCustomers = sortedCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    // ここで顧客データの保存処理を行う（実際のAPIコールは省略）
    const updatedCustomers = customers.map((c) =>
      c.id === selectedCustomer.id ? selectedCustomer : c
    );
    setCustomers(updatedCustomers);
    handleCloseModal();
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-[#4A2311] font-yumin">顧客管理</h1>
      <div className="mb-6 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="顧客を検索..."
            className="pl-10 pr-4 py-2 rounded-full border border-[#006400] focus:outline-none focus:ring-2 focus:ring-[#006400] bg-white text-[#4A2311]"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-[#006400]" size={20} />
        </div>
        <button
          className="bg-[#006400] text-white px-4 py-2 rounded-full hover:bg-[#007500] transition duration-300 flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} className="mr-2" />
          新規顧客追加
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#006400] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium cursor-pointer" onClick={() => handleSort('name')}>
                顧客名
                {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp size={16} className="inline ml-1" /> : <ChevronDown size={16} className="inline ml-1" />)}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium cursor-pointer" onClick={() => handleSort('email')}>
                メールアドレス
                {sortColumn === 'email' && (sortDirection === 'asc' ? <ChevronUp size={16} className="inline ml-1" /> : <ChevronDown size={16} className="inline ml-1" />)}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium cursor-pointer" onClick={() => handleSort('loyaltyPoints')}>
                ポイント
                {sortColumn === 'loyaltyPoints' && (sortDirection === 'asc' ? <ChevronUp size={16} className="inline ml-1" /> : <ChevronDown size={16} className="inline ml-1" />)}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium cursor-pointer" onClick={() => handleSort('lastVisit')}>
                最終来店日
                {sortColumn === 'lastVisit' && (sortDirection === 'asc' ? <ChevronUp size={16} className="inline ml-1" /> : <ChevronDown size={16} className="inline ml-1" />)}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-[#F3EAD3] transition duration-300">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A2311]">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A2311]">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A2311]">{customer.loyaltyPoints}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A2311]">{customer.lastVisit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-[#006400] hover:text-[#007500] mr-4"
                    onClick={() => handleEdit(customer)}
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(customer.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-[#4A2311]">
              {selectedCustomer ? '顧客情報編集' : '新規顧客追加'}
            </h2>
            <form onSubmit={handleSaveCustomer}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-[#4A2311] mb-1">
                  顧客名
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-[#006400] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  value={selectedCustomer?.name || ''}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#4A2311] mb-1">
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-[#006400] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  value={selectedCustomer?.email || ''}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="loyaltyPoints" className="block text-sm font-medium text-[#4A2311] mb-1">
                  ポイント
                </label>
                <input
                  type="number"
                  id="loyaltyPoints"
                  className="w-full px-3 py-2 border border-[#006400] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  value={selectedCustomer?.loyaltyPoints || ''}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, loyaltyPoints: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="lastVisit" className="block text-sm font-medium text-[#4A2311] mb-1">
                  最終来店日
                </label>
                <input
                  type="date"
                  id="lastVisit"
                  className="w-full px-3 py-2 border border-[#006400] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  value={selectedCustomer?.lastVisit || ''}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, lastVisit: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 px-4 py-2 text-[#006400] border border-[#006400] rounded-md hover:bg-[#F3EAD3] transition duration-300"
                  onClick={handleCloseModal}
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006400] text-white rounded-md hover:bg-[#007500] transition duration-300"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;