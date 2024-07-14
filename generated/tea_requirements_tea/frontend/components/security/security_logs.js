import React, { useState, useEffect } from 'react';
import { Table, AlertCircle, Search, AlertTriangle, Info, FileText, Filter, Download, Trash2 } from 'lucide-react';

const SecurityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('全て');
  const [sortColumn, setSortColumn] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    const fetchLogs = async () => {
      // 実際のアプリケーションではAPIからデータを取得します
      const mockLogs = [
        { id: 1, timestamp: '2023-05-01 10:30:00', level: 'INFO', message: 'ユーザーログイン成功', user: 'user123', ip: '192.168.1.1' },
        { id: 2, timestamp: '2023-05-01 11:45:00', level: 'WARNING', message: 'ログイン失敗', user: 'unknown', ip: '10.0.0.1' },
        { id: 3, timestamp: '2023-05-01 14:20:00', level: 'ERROR', message: '不正アクセス試行', user: 'attacker', ip: '1.1.1.1' },
        { id: 4, timestamp: '2023-05-02 09:15:00', level: 'INFO', message: 'システム更新完了', user: 'admin', ip: '192.168.1.100' },
        { id: 5, timestamp: '2023-05-02 16:30:00', level: 'WARNING', message: 'リソース使用量高', user: 'system', ip: 'localhost' },
      ];
      setLogs(mockLogs);
      setFilteredLogs(mockLogs);
    };

    fetchLogs();
  }, []);

  useEffect(() => {
    const filtered = logs.filter(log => 
      (log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
       log.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
       log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
       log.ip.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedLevel === '全て' || log.level === selectedLevel)
    );
    const sorted = filtered.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredLogs(sorted);
  }, [searchTerm, logs, selectedLevel, sortColumn, sortDirection]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLevelFilter = (level) => {
    setSelectedLevel(level);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleExport = () => {
    // CSVエクスポートロジックをここに実装
    console.log('ログをエクスポート');
  };

  const handleDelete = () => {
    // ログ削除ロジックをここに実装
    console.log('選択されたログを削除');
  };

  return (
    <div className="p-4 bg-white text-black">
      <h1 className="text-3xl font-bold mb-6">セキュリティログ</h1>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <Search className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="ログを検索..."
            value={searchTerm}
            onChange={handleSearch}
            className="bg-transparent border-none focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-500" />
          {['全て', 'INFO', 'WARNING', 'ERROR'].map(level => (
            <button
              key={level}
              onClick={() => handleLevelFilter(level)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedLevel === level
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <button
          onClick={handleExport}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          <Download className="mr-2" />
          エクスポート
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          <Trash2 className="mr-2" />
          削除
        </button>
      </div>

      {filteredLogs.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 mr-2" />
            <div>
              <p className="font-bold">ログが見つかりません</p>
              <p>検索条件に一致するセキュリティログはありません。条件を変更してお試しください。</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                {['Timestamp', 'Level', 'Message', 'User', 'IP'].map(column => (
                  <th
                    key={column}
                    className="p-3 text-left cursor-pointer hover:bg-gray-300"
                    onClick={() => handleSort(column.toLowerCase())}
                  >
                    <div className="flex items-center">
                      {column}
                      {sortColumn === column.toLowerCase() && (
                        <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{log.timestamp}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center ${
                      log.level === 'ERROR' ? 'bg-red-200 text-red-800' :
                      log.level === 'WARNING' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {log.level === 'ERROR' && <AlertCircle className="h-4 w-4 mr-1" />}
                      {log.level === 'WARNING' && <AlertTriangle className="h-4 w-4 mr-1" />}
                      {log.level === 'INFO' && <Info className="h-4 w-4 mr-1" />}
                      {log.level}
                    </span>
                  </td>
                  <td className="p-3">{log.message}</td>
                  <td className="p-3">{log.user}</td>
                  <td className="p-3">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 text-gray-600">
        <FileText className="inline mr-2" />
        表示中のログ: {filteredLogs.length} / 全ログ: {logs.length}
      </div>
    </div>
  );
};

export default SecurityLogs;
