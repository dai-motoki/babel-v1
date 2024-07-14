import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SecurityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // モックデータの生成
    const generateMockLogs = () => {
      const severities = ['low', 'medium', 'high', 'critical'];
      const events = ['ログイン試行', 'ファイルアクセス', '設定変更', 'データベースクエリ'];
      const mockLogs = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
        severity: severities[Math.floor(Math.random() * severities.length)],
        event: events[Math.floor(Math.random() * events.length)],
        details: `詳細情報 ${i + 1}`,
      }));
      setLogs(mockLogs);
      setFilteredLogs(mockLogs);
    };

    generateMockLogs();
  }, []);

  useEffect(() => {
    const filtered = logs.filter(log => 
      (log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
       log.details.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSeverity === 'all' || log.severity === selectedSeverity)
    );
    const sorted = filtered.sort((a, b) => 
      sortOrder === 'desc' ? new Date(b.timestamp) - new Date(a.timestamp) : new Date(a.timestamp) - new Date(b.timestamp)
    );
    setFilteredLogs(sorted);
  }, [logs, searchTerm, selectedSeverity, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSeverityChange = (e) => {
    setSelectedSeverity(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'bg-green-200 text-green-800';
      case 'medium': return 'bg-yellow-200 text-yellow-800';
      case 'high': return 'bg-orange-200 text-orange-800';
      case 'critical': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const chartData = logs.reduce((acc, log) => {
    const date = new Date(log.timestamp).toLocaleDateString();
    const existingEntry = acc.find(item => item.date === date);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-green-500 pb-2">セキュリティログ</h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="ログを検索..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            <Filter size={20} className="mr-2" />
            フィルター
            {showFilters ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2" />}
          </button>
        </div>
        
        {showFilters && (
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <span className="mr-2">深刻度:</span>
                <select
                  value={selectedSeverity}
                  onChange={handleSeverityChange}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">全て</option>
                  <option value="low">低</option>
                  <option value="medium">中</option>
                  <option value="high">高</option>
                  <option value="critical">重大</option>
                </select>
              </label>
              <button
                onClick={toggleSortOrder}
                className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition duration-300"
              >
                <Clock size={20} className="mr-2" />
                {sortOrder === 'desc' ? '新しい順' : '古い順'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">ログ発生頻度</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイムスタンプ</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">深刻度</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">イベント</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {new Date(log.timestamp).toLocaleString('ja-JP')}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                    {log.severity}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{log.event}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-4">
          <AlertCircle className="mx-auto text-gray-400" size={48} />
          <p className="mt-2 text-gray-500">該当するログが見つかりません。</p>
        </div>
      )}
    </div>
  );
};

export default SecurityLogs;