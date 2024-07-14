import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, User, Calendar, Bell, Tool, AlertCircle, UserPlus } from 'react-feather';

const AccountLifecycleManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('ユーザーの取得に失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(selectedUser === user ? null : user);
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    return user.status === filter;
  });

  const TimelineEvent = ({ event }) => {
    const getEventIcon = () => {
      switch (event.type) {
        case 'onboarding': return <User className="text-green-500" />;
        case 'role_change': return <Tool className="text-blue-500" />;
        case 'offboarding': return <Bell className="text-red-500" />;
        case 'security_alert': return <AlertCircle className="text-yellow-500" />;
        default: return <Calendar className="text-gray-500" />;
      }
    };

    return (
      <div className="flex items-start mb-4 animate-fadeIn">
        <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
          {getEventIcon()}
        </div>
        <div className="ml-4 flex-grow">
          <h4 className="text-lg font-semibold text-gray-800">{event.title}</h4>
          <p className="text-sm text-gray-600">{event.description}</p>
          <span className="text-xs text-gray-500">{new Date(event.date).toLocaleString('ja-JP')}</span>
        </div>
      </div>
    );
  };

  const UserCard = ({ user }) => (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
            {user.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          user.status === 'active' ? 'bg-green-100 text-green-800' :
          user.status === 'inactive' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {user.status}
        </span>
      </div>
      <button
        onClick={() => handleUserSelect(user)}
        className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
      >
        詳細を表示
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-indigo-500 pb-2">
        アカウントライフサイクル管理
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="mb-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">全てのユーザー</option>
                <option value="active">アクティブ</option>
                <option value="inactive">非アクティブ</option>
                <option value="pending">保留中</option>
              </select>
            </div>
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
          <div className="col-span-2">
            {selectedUser ? (
              <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-fadeIn">
                <div className="bg-indigo-100 p-6">
                  <h2 className="text-2xl font-bold text-indigo-800">{selectedUser.name}のタイムライン</h2>
                  <p className="text-indigo-600">{selectedUser.email}</p>
                </div>
                <div className="p-6">
                  {selectedUser.timeline.map((event, index) => (
                    <TimelineEvent key={index} event={event} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <UserPlus size={64} className="text-indigo-500" />
                  <h2 className="text-2xl font-bold text-gray-800">ユーザーを選択してください</h2>
                  <p className="text-gray-600">左側のリストからユーザーを選択すると、詳細なタイムラインが表示されます。</p>
                  <button className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300">
                    新規ユーザーを追加
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountLifecycleManagement;