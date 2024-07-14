import React, { useState, useEffect } from 'react';
import { Search, ArrowUpDown, MoreHorizontal } from 'lucide-react';

const UnusedAccountDetection = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    // API呼び出しの代わりにモックデータを使用
    const mockData = [
      { id: 1, name: '山田太郎', email: 'taro@example.com', lastLogin: '2023-01-15', department: '営業部' },
      { id: 2, name: '佐藤花子', email: 'hanako@example.com', lastLogin: '2023-03-20', department: '人事部' },
      { id: 3, name: '鈴木一郎', email: 'ichiro@example.com', lastLogin: '2022-12-01', department: '技術部' },
      { id: 4, name: '田中美咲', email: 'misaki@example.com', lastLogin: '2023-02-28', department: '経理部' },
      { id: 5, name: '高橋健太', email: 'kenta@example.com', lastLogin: '2022-11-10', department: '営業部' },
    ];
    setAccounts(mockData);
    setFilteredAccounts(mockData);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = accounts.filter(account =>
      Object.values(account).some(value => 
        value.toString().toLowerCase().includes(term)
      )
    );
    setFilteredAccounts(filtered);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }

    const sorted = [...filteredAccounts].sort((a, b) => {
      if (a[column] < b[column]) return sortDirection === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredAccounts(sorted);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">未使用アカウント検出</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="検索..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {['名前', 'メールアドレス', '最終ログイン', '部署'].map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(Object.keys(accounts[0])[index + 1])}
                >
                  <div className="flex items-center">
                    {header}
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                アクション
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAccounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {account.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {account.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {account.lastLogin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {account.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-700">
          全 {accounts.length} 件中 {filteredAccounts.length} 件表示
        </p>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            前へ
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            次へ
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnusedAccountDetection;