import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Plus, Edit2, Trash2, Search, Download } from 'react-feather';

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAccount, setNewAccount] = useState({ name: '', number: '', balance: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // 仮のデータをフェッチする
    const fetchAccounts = async () => {
      // APIからデータを取得する代わりに、仮のデータを使用
      const mockAccounts = [
        { id: 1, name: '山田太郎', number: '1234567890', balance: 100000 },
        { id: 2, name: '鈴木花子', number: '0987654321', balance: 250000 },
        { id: 3, name: '佐藤次郎', number: '1122334455', balance: 75000 },
      ];
      setAccounts(mockAccounts);
    };
    fetchAccounts();
  }, []);

  const handleAddAccount = (e) => {
    e.preventDefault();
    const id = accounts.length + 1;
    setAccounts([...accounts, { ...newAccount, id }]);
    setNewAccount({ name: '', number: '', balance: '' });
    setShowAddForm(false);
  };

  const handleDeleteAccount = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const handleEditAccount = (id) => {
    // 編集機能の実装（モーダルを開くなど）
    console.log(`Editing account ${id}`);
  };

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.number.includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-red-500 pb-2">口座管理</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="口座を検索..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Plus size={20} className="inline-block mr-2" />
          新規口座追加
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddAccount} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">新規口座追加</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="口座名義"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={newAccount.name}
              onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="口座番号"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={newAccount.number}
              onChange={(e) => setNewAccount({ ...newAccount, number: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="残高"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={newAccount.balance}
              onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
              required
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mr-2 transition duration-300 ease-in-out"
            >
              追加
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            >
              キャンセル
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">口座名義</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">口座番号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">残高</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAccounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {showPassword ? account.number : '••••••' + account.number.slice(-4)}
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">¥{account.balance.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditAccount(account.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteAccount(account.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Download size={20} className="inline-block mr-2" />
          口座情報をエクスポート
        </button>
      </div>

      {/* 仮の画像ボックス */}
      <div className="mt-8 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
        <span className="text-gray-500 text-lg">口座情報グラフ（仮）</span>
      </div>
    </div>
  );
};

export default AccountManagement;