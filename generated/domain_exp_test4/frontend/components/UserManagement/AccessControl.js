import React, { useState, useEffect } from 'react';
import { Search, Filter, Edit, Save, X } from 'lucide-react';

const AccessControl = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // APIからデータを取得する代わりに、モックデータを使用
    const mockUsers = [
      { id: 1, name: '山田太郎', role: '管理者' },
      { id: 2, name: '佐藤花子', role: '一般ユーザー' },
      { id: 3, name: '鈴木一郎', role: 'マネージャー' },
    ];
    const mockRoles = ['管理者', 'マネージャー', '一般ユーザー'];
    const mockPermissions = ['ユーザー管理', 'レポート作成', 'データ編集', 'システム設定'];

    setUsers(mockUsers);
    setRoles(mockRoles);
    setPermissions(mockPermissions);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePermission = (userId, permission) => {
    if (!editMode) return;
    // 実際のアプリケーションでは、ここでAPIを呼び出して権限を更新する
    console.log(`Toggle permission ${permission} for user ${userId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-700 text-white p-6">
          <h1 className="text-3xl font-semibold">アクセス制御管理</h1>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="ユーザー検索..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button
              className={`px-4 py-2 rounded-full ${
                editMode ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-500 hover:bg-indigo-600'
              } text-white transition duration-300 ease-in-out`}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? '保存' : '編集'}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">ユーザー名</th>
                  <th className="p-3 text-left">役割</th>
                  {permissions.map((permission) => (
                    <th key={permission} className="p-3 text-center">
                      {permission}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.role}</td>
                    {permissions.map((permission) => (
                      <td key={`${user.id}-${permission}`} className="p-3 text-center">
                        <button
                          className={`w-6 h-6 rounded-full ${
                            editMode ? 'cursor-pointer' : 'cursor-not-allowed'
                          } ${
                            Math.random() > 0.5 ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                          onClick={() => togglePermission(user.id, permission)}
                          disabled={!editMode}
                        ></button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 和風モダンな装飾要素 */}
      <div className="fixed bottom-0 right-0 p-8 pointer-events-none">
        <div className="w-32 h-32 bg-pink-200 rounded-full opacity-50"></div>
      </div>
      <div className="fixed top-0 left-0 p-8 pointer-events-none">
        <div className="w-24 h-24 bg-indigo-200 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default AccessControl;