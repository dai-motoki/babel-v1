import React, { useState, useEffect } from 'react';
import { AlertCircle, Shield, Clock, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

const SecurityEvent = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedEvent, setExpandedEvent] = useState(null);

  useEffect(() => {
    // モックデータの生成
    const mockEvents = [
      { id: 1, type: '不正アクセス', severity: 'high', timestamp: '2023-05-15 10:30:00', description: 'サーバーへの不正アクセスが検出されました。' },
      { id: 2, type: 'マルウェア検出', severity: 'medium', timestamp: '2023-05-15 11:45:00', description: 'エンドポイントでマルウェアが検出されました。' },
      { id: 3, type: 'ファイアウォール警告', severity: 'low', timestamp: '2023-05-15 12:15:00', description: 'ファイアウォールで異常なトラフィックが検出されました。' },
      { id: 4, type: 'データ漏洩', severity: 'high', timestamp: '2023-05-15 14:00:00', description: '機密データの外部送信が検出されました。' },
      { id: 5, type: 'パスワード攻撃', severity: 'medium', timestamp: '2023-05-15 15:30:00', description: 'アカウントに対する複数の失敗したログイン試行が検出されました。' },
    ];
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  useEffect(() => {
    const filtered = events.filter(event => 
      event.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterSeverity === 'all' || event.severity === filterSeverity)
    );
    const sorted = filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.timestamp) - new Date(b.timestamp);
      } else {
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });
    setFilteredEvents(sorted);
  }, [searchTerm, filterSeverity, sortOrder, events]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterSeverity(e.target.value);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const toggleEventExpansion = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-800 text-white p-6">
          <h2 className="text-2xl font-semibold mb-2">セキュリティイベント</h2>
          <p className="text-green-200">システムのセキュリティイベントを監視・管理します</p>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div className="relative mb-4 md:mb-0 md:w-1/2">
              <input
                type="text"
                placeholder="イベントを検索..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={filterSeverity}
                  onChange={handleFilterChange}
                >
                  <option value="all">全ての重要度</option>
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>
                <Filter className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" size={20} />
              </div>
              <button
                className="flex items-center space-x-1 text-green-800 hover:text-green-600"
                onClick={handleSortChange}
              >
                <Clock size={20} />
                <span>{sortOrder === 'asc' ? '古い順' : '新しい順'}</span>
                {sortOrder === 'asc' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-md overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleEventExpansion(event.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(event.severity)}`}></div>
                    <div>
                      <h3 className="font-semibold text-lg">{event.type}</h3>
                      <p className="text-sm text-gray-500">{event.timestamp}</p>
                    </div>
                  </div>
                  {expandedEvent === event.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                {expandedEvent === event.id && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{event.description}</p>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        対応
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        無視
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 p-6 mt-8 rounded-b-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-green-800">
              <Shield size={24} />
              <span className="font-semibold">システムステータス: 正常</span>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              詳細レポート
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityEvent;