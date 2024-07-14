import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const SecurityEvent = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [expandedEvent, setExpandedEvent] = useState(null);

  useEffect(() => {
    // モックデータの生成
    const mockEvents = [
      { id: 1, type: 'warning', title: '不審なログイン試行', description: 'IPアドレス 192.168.1.100 から複数回の失敗したログイン試行がありました。', timestamp: new Date(2023, 5, 15, 14, 30) },
      { id: 2, type: 'critical', title: 'ファイアウォール侵入検知', description: 'ポート 8080 への不正なアクセス試行を検知しました。', timestamp: new Date(2023, 5, 15, 15, 45) },
      { id: 3, type: 'info', title: 'システムアップデート完了', description: 'セキュリティパッチの適用が正常に完了しました。', timestamp: new Date(2023, 5, 15, 16, 20) },
      { id: 4, type: 'warning', title: 'データベース接続エラー', description: '主要データベースへの接続が一時的に失われました。', timestamp: new Date(2023, 5, 15, 17, 10) },
      { id: 5, type: 'critical', title: 'DDoS攻撃検知', description: 'Webサーバーに対する大規模なDDoS攻撃を検知しました。', timestamp: new Date(2023, 5, 15, 18, 5) },
    ];
    setEvents(mockEvents);
  }, []);

  const getEventIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'critical':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'info':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      default:
        return <Shield className="w-6 h-6 text-gray-500" />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-100 border-yellow-300';
      case 'critical':
        return 'bg-red-100 border-red-300';
      case 'info':
        return 'bg-green-100 border-green-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.type === filter;
  });

  const toggleEventExpansion = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">セキュリティイベント</h2>
      
      <div className="mb-4">
        <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
          フィルター:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="all">すべて</option>
          <option value="warning">警告</option>
          <option value="critical">重大</option>
          <option value="info">情報</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className={`border ${getEventColor(event.type)} rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-lg`}
          >
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleEventExpansion(event.id)}>
              <div className="flex items-center space-x-3">
                {getEventIcon(event.type)}
                <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {event.timestamp.toLocaleString('ja-JP', { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
                {expandedEvent === event.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
            {expandedEvent === event.id && (
              <div className="mt-4 text-gray-700">
                <p>{event.description}</p>
                <div className="mt-2 flex justify-end space-x-2">
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
                    対応済みとしてマーク
                  </button>
                  <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-300">
                    詳細を表示
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <p className="text-center text-gray-500 mt-4">イベントが見つかりません。</p>
      )}

      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">セキュリティステータス</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-green-700">システムは安全です</span>
          </div>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
            詳細レポート
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">最近のアクティビティ</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>システムスキャンが完了しました（2時間前）</li>
          <li>ファイアウォールルールが更新されました（5時間前）</li>
          <li>新しいユーザーアカウントが作成されました（1日前）</li>
        </ul>
      </div>

      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 shadow-md">
          すべてのセキュリティログを表示
        </button>
      </div>
    </div>
  );
};

export default SecurityEvent;