import React, { useState } from 'react';
import {
  CalendarIcon,
  CheckCircleIcon,
  AlertTriangleIcon, // ExclamationTriangleIconの代わりにAlertTriangleIconを使用
  AlertCircleIcon,
} from 'lucide-react';

const auditItems = [
  {
    id: 1,
    category: 'アカウント管理',
    description: 'パスワードの複雑性要件を満たしているか',
    status: '合格',
    lastChecked: '2023-12-18',
  },
  {
    id: 2,
    category: 'アクセス制御',
    description: '不要なアクセス権限が付与されていないか',
    status: '要注意',
    lastChecked: '2023-12-15',
  },
  {
    id: 3,
    category: '脆弱性管理',
    description: '最新のセキュリティパッチが適用されているか',
    status: '合格',
    lastChecked: '2023-12-18',
  },
  {
    id: 4,
    category: 'ログ管理',
    description: '重要なイベントが適切に記録されているか',
    status: '不合格',
    lastChecked: '2023-12-10',
  },
];

const statusColors = {
  合格: 'text-green-500',
  要注意: 'text-yellow-500',
  不合格: 'text-red-500',
};

const statusIcons = {
  合格: CheckCircleIcon,
  要注意: AlertCircleIcon,
  不合格: AlertTriangleIcon, // ExclamationTriangleIconの代わりにAlertTriangleIconを使用
};

export default function SecurityAudit() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = auditItems.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        セキュリティ監査
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="検索..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">カテゴリ</th>
            <th className="px-4 py-2 text-left">項目</th>
            <th className="px-4 py-2 text-center">ステータス</th>
            <th className="px-4 py-2 text-center">最終チェック日</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2">{item.description}</td>
              <td className="px-4 py-2 text-center">
                <span className={`${statusColors[item.status]} inline-flex items-center`}>
                  {React.createElement(statusIcons[item.status], { className: "mr-1" })}
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-2 text-center">
                <CalendarIcon className="mr-1 inline-block" />
                {item.lastChecked}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}