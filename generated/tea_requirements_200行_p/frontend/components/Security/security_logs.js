import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const SecurityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const logsPerPage = 10;

  useEffect(() => {
    // モックデータの生成
    const mockLogs = Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      message: `セキュリティイベント ${index + 1}`,
      severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
      source: ['firewall', 'ids', 'auth'][Math.floor(Math.random() * 3)],
    }));
    setLogs(mockLogs);
  }, []);

  useEffect(() => {
    const filtered = logs.filter(log => 
      (log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
       log.source.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSeverity === 'all' || log.severity === selectedSeverity)
    );
    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [logs, searchTerm, selectedSeverity]);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="text-green-500" />;
      case 'medium':
        return <AlertTriangle className="text-yellow-500" />;
      case 'high':
        return <Shield className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-green-500 pb-2">セキュリティログ</h1>
      
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="ログを検索..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <select
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
        >
          <option value="all">全ての重要度</option>
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="p-3 text-left">タイムスタンプ</th>
              <th className="p-3 text-left">メッセージ</th>
              <th className="p-3 text-left">重要度</th>
              <th className="p-3 text-left">ソース</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map((log) => (
              <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="p-3 text-sm">
                  <Clock className="inline-block mr-2 text-gray-500" size={16} />
                  {new Date(log.timestamp).toLocaleString('ja-JP')}
                </td>
                <td className="p-3">{log.message}</td>
                <td className="p-3">
                  <span className="flex items-center">
                    {getSeverityIcon(log.severity)}
                    <span className="ml-2 capitalize">{log.severity}</span>
                  </span>
                </td>
                <td className="p-3 capitalize">{log.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLogs.length > logsPerPage && (
        <div className="mt-6 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: Math.ceil(filteredLogs.length / logsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 border border-gray-300 text-sm font-medium ${
                  currentPage === i + 1
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredLogs.length / logsPerPage)}
              className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </nav>
        </div>
      )}

      <div className="mt-6 text-center text-gray-600">
        全 {filteredLogs.length} 件中 {indexOfFirstLog + 1} - {Math.min(indexOfLastLog, filteredLogs.length)} 件を表示
      </div>
    </div>
  );
};

export default SecurityLogs;