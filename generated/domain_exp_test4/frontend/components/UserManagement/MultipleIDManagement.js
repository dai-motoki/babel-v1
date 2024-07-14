import React, { useState, useEffect } from 'react';
import { Search, User, Key, Shield, AlertCircle } from 'lucide-react';

const MultipleIDManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 仮のユーザーデータを取得
    const fetchUsers = async () => {
      // APIから実際のデータを取得する代わりに、モックデータを使用
      const mockUsers = [
        { id: 1, name: '山田太郎', email: 'yamada@example.com', ids: ['AD001', 'SF002', 'GW003'] },
        { id: 2, name: '佐藤花子', email: 'sato@example.com', ids: ['AD002', 'SF003', 'GW004'] },
        { id: 3, name: '鈴木一郎', email: 'suzuki@example.com', ids: ['AD003', 'SF004', 'GW005'] },
      ];
      setUsers(mockUsers);
    };
    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-red-500 pb-2">
        複数ID管理
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="ユーザーを検索..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <li
                  key={user.id}
                  className={`p-4 cursor-pointer hover:bg-red-50 transition-colors duration-150 ${selectedUser && selectedUser.id === user.id ? 'bg-red-100' : ''}`}
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="flex items-center">
                    <User className="text-gray-500 mr-3" size={24} />
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:w-2/3">
          {selectedUser ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-red-300 pb-2">
                {selectedUser.name}のID関連図
              </h2>
              <div className="mb-6">
                <p className="text-gray-600 mb-2">メールアドレス: {selectedUser.email}</p>
                <p className="text-gray-600">関連ID数: {selectedUser.ids.length}</p>
              </div>
              <div className="relative">
                {/* ID関連図の表示 */}
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="text-white" size={32} />
                    </div>
                    <p className="font-semibold text-gray-800">{selectedUser.name}</p>
                  </div>
                </div>
                {selectedUser.ids.map((id, index) => (
                  <div
                    key={id}
                    className="absolute bg-white rounded-lg shadow-md p-3 flex items-center"
                    style={{
                      top: `${20 + (index * 25)}%`,
                      left: `${10 + (index * 30)}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <Key className="text-red-500 mr-2" size={20} />
                    <span className="font-medium text-gray-700">{id}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">セキュリティ状態</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-100 rounded-lg p-4 flex items-center">
                    <Shield className="text-green-500 mr-3" size={24} />
                    <div>
                      <p className="font-semibold text-green-800">アクセス権限: 正常</p>
                      <p className="text-sm text-green-600">すべてのIDが適切に管理されています</p>
                    </div>
                  </div>
                  <div className="bg-yellow-100 rounded-lg p-4 flex items-center">
                    <AlertCircle className="text-yellow-500 mr-3" size={24} />
                    <div>
                      <p className="font-semibold text-yellow-800">注意: パスワード更新推奨</p>
                      <p className="text-sm text-yellow-600">一部のIDでパスワード更新が必要です</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-64">
              <p className="text-gray-500 text-lg">ユーザーを選択してID関連図を表示</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultipleIDManagement;