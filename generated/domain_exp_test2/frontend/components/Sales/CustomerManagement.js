import React, { useState, useEffect } from 'react';
import { Search, Filter, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // モックデータの生成
    const mockCustomers = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      name: `顧客${index + 1}`,
      email: `customer${index + 1}@example.com`,
      phone: `090-1234-${String(index + 1).padStart(4, '0')}`,
      preferences: ['抹茶', '羊羹', '大福'][index % 3],
      lastVisit: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString('ja-JP'),
    }));
    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
  }, []);

  useEffect(() => {
    const results = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );
    setFilteredCustomers(results);
    setCurrentPage(1);
  }, [searchTerm, customers]);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setCustomers(customers.map(c => c.id === selectedCustomer.id ? selectedCustomer : c));
    setIsEditing(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 font-yumin">顧客管理</h1>
      
      <div className="mb-6 flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="顧客を検索..."
            className="w-full py-3 px-4 pr-10 rounded-full bg-white border border-[#006400] focus:outline-none focus:ring-2 focus:ring-[#006400] text-[#4A2311]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#006400]" />
        </div>
        <button className="ml-4 bg-[#006400] text-white py-3 px-6 rounded-full flex items-center hover:bg-[#007500] transition duration-300">
          <Filter className="mr-2" />
          絞り込み
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#006400] text-white">
            <tr>
              <th className="py-3 px-4 text-left">氏名</th>
              <th className="py-3 px-4 text-left">メールアドレス</th>
              <th className="py-3 px-4 text-left">電話番号</th>
              <th className="py-3 px-4 text-left">好みの和菓子</th>
              <th className="py-3 px-4 text-left">最終来店日</th>
              <th className="py-3 px-4 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-200 hover:bg-[#F3EAD3] transition duration-300">
                <td className="py-3 px-4">{customer.name}</td>
                <td className="py-3 px-4">{customer.email}</td>
                <td className="py-3 px-4">{customer.phone}</td>
                <td className="py-3 px-4">{customer.preferences}</td>
                <td className="py-3 px-4">{customer.lastVisit}</td>
                <td className="py-3 px-4">
                  <button onClick={() => handleEdit(customer)} className="text-blue-600 hover:text-blue-800 mr-2">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(customer.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <nav className="flex items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 p-2 rounded-full bg-[#006400] text-white disabled:opacity-50"
          >
            <ChevronLeft size={24} />
          </button>
          {Array.from({ length: Math.ceil(filteredCustomers.length / customersPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-4 py-2 rounded-full ${
                currentPage === index + 1 ? 'bg-[#006400] text-white' : 'bg-white text-[#006400] border border-[#006400]'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredCustomers.length / customersPerPage)}
            className="ml-2 p-2 rounded-full bg-[#006400] text-white disabled:opacity-50"
          >
            <ChevronRight size={24} />
          </button>
        </nav>
      </div>

      {isEditing && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#4A2311] mb-6">顧客情報の編集</h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-[#4A2311] mb-2">氏名</label>
                <input
                  type="text"
                  value={selectedCustomer.name}
                  onChange={(e) => setSelectedCustomer({...selectedCustomer, name: e.target.value})}
                  className="w-full p-2 border border-[#006400] rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#4A2311] mb-2">メールアドレス</label>
                <input
                  type="email"
                  value={selectedCustomer.email}
                  onChange={(e) => setSelectedCustomer({...selectedCustomer, email: e.target.value})}
                  className="w-full p-2 border border-[#006400] rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#4A2311] mb-2">電話番号</label>
                <input
                  type="tel"
                  value={selectedCustomer.phone}
                  onChange={(e) => setSelectedCustomer({...selectedCustomer, phone: e.target.value})}
                  className="w-full p-2 border border-[#006400] rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setIsEditing(false)} className="mr-4 text-[#4A2311]">キャンセル</button>
                <button type="submit" className="bg-[#006400] text-white py-2 px-4 rounded-md hover:bg-[#007500]">保存</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;