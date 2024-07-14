import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar, Search, Filter, Clock } from 'react-feather';

const AccessAudit = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  useEffect(() => {
    // 仮のデータを生成
    const generateMockData = () => {
      const actions = ['ログイン', 'ログアウト', 'ファイルアクセス', 'データ変更', '設定変更'];
      const users = ['田中太郎', '鈴木花子', '佐藤次郎', '山田美咲', '伊藤健太'];
      const mockData = [];

      for (let i = 0; i < 50; i++) {
        mockData.push({
          id: i + 1,
          timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
          action: actions[Math.floor(Math.random() * actions.length)],
          user: users[Math.floor(Math.random() * users.length)],
          details: `詳細情報 ${i + 1}`,
        });
      }

      return mockData.sort((a, b) => b.timestamp - a.timestamp);
    };

    const mockData = generateMockData();
    setAuditLogs(mockData);
    setFilteredLogs(mockData);
  }, []);

  useEffect(() => {
    const filtered = auditLogs.filter((log) => {
      const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.details.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = dateFilter ? format(log.timestamp, 'yyyy-MM-dd') === dateFilter : true;
      const matchesAction = actionFilter ? log.action === actionFilter : true;
      return matchesSearch && matchesDate && matchesAction;
    });
    setFilteredLogs(filtered);
  }, [searchTerm, dateFilter, actionFilter, auditLogs]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleDateFilterChange = (e) => setDateFilter(e.target.value);
  const handleActionFilterChange = (e) => setActionFilter(e.target.value);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
          <Clock className="mr-2" />
          アクセス監査ログ
        </h1>

        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                placeholder="検索..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="text-gray-400" size={20} />
            <input
              type="date"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={dateFilter}
              onChange={handleDateFilterChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={20} />
            <select
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={actionFilter}
              onChange={handleActionFilterChange}
            >
              <option value="">全てのアクション</option>
              <option value="ログイン">ログイン</option>
              <option value="ログアウト">ログアウト</option>
              <option value="ファイルアクセス">ファイルアクセス</option>
              <option value="データ変更">データ変更</option>
              <option value="設定変更">設定変更</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="p-3">日時</th>
                <th className="p-3">ユーザー</th>
                <th className="p-3">アクション</th>
                <th className="p-3">詳細</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-3 text-sm text-gray-600">
                    {format(log.timestamp, 'yyyy年MM月dd日 HH:mm:ss', { locale: ja })}
                  </td>
                  <td className="p-3 text-sm text-gray-600">{log.user}</td>
                  <td className="p-3">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log.action === 'ログイン' ? 'bg-green-100 text-green-800' :
                      log.action === 'ログアウト' ? 'bg-red-100 text-red-800' :
                      log.action === 'ファイルアクセス' ? 'bg-blue-100 text-blue-800' :
                      log.action === 'データ変更' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-600">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            該当するログが見つかりません。
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessAudit;