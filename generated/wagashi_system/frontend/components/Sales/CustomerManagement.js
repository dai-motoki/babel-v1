import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, UserPlus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // モックデータの作成
    const mockCustomers = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `顧客 ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: `090-1234-${5678 + i}`,
      lastVisit: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
      totalPurchases: Math.floor(Math.random() * 100000),
    }));
    setCustomers(mockCustomers);
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8">顧客管理</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Search className="text-[#006400] mr-2" />
          <input
            type="text"
            placeholder="顧客を検索..."
            className="w-full p-2 border border-[#006400] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006400]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <button className="flex items-center bg-[#006400] text-white px-4 py-2 rounded-md hover:bg-[#007500] transition-colors">
            <Filter className="mr-2" />
            フィルター
          </button>
          <button className="flex items-center bg-[#FFB7C5] text-[#4A2311] px-4 py-2 rounded-md hover:bg-[#FFA5B5] transition-colors">
            <UserPlus className="mr-2" />
            新規顧客追加
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#006400] text-white">
            <tr>
              <th className="p-3 text-left">名前</th>
              <th className="p-3 text-left">メール</th>
              <th className="p-3 text-left">電話番号</th>
              <th className="p-3 text-left">最終来店日</th>
              <th className="p-3 text-left">総購入額</th>
              <th className="p-3 text-left">アクション</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-200 hover:bg-[#F3EAD3] transition-colors">
                <td className="p-3">{customer.name}</td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.phone}</td>
                <td className="p-3">{customer.lastVisit}</td>
                <td className="p-3">¥{customer.totalPurchases.toLocaleString()}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleCustomerSelect(customer)}
                    className="text-[#006400] hover:text-[#007500] mr-2"
                  >
                    <Edit size={20} />
                  </button>
                  <button className="text-red-500 hover:text-red-600">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        <nav className="flex items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 p-2 bg-[#006400] text-white rounded-md disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          {Array.from({ length: Math.ceil(filteredCustomers.length / customersPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === index + 1 ? 'bg-[#006400] text-white' : 'bg-white text-[#006400] border border-[#006400]'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredCustomers.length / customersPerPage)}
            className="ml-2 p-2 bg-[#006400] text-white rounded-md disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </nav>
      </div>
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold text-[#4A2311] mb-4">顧客詳細</h2>
            <div className="mb-4">
              <p><strong>名前:</strong> {selectedCustomer.name}</p>
              <p><strong>メール:</strong> {selectedCustomer.email}</p>
              <p><strong>電話番号:</strong> {selectedCustomer.phone}</p>
              <p><strong>最終来店日:</strong> {selectedCustomer.lastVisit}</p>
              <p><strong>総購入額:</strong> ¥{selectedCustomer.totalPurchases.toLocaleString()}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-[#006400] text-white px-4 py-2 rounded-md hover:bg-[#007500] transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;