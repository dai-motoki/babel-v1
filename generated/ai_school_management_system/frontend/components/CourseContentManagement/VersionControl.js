import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Clock, Eye, FileText, Search } from 'lucide-react';

const VersionControl = () => {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    // 仮のバージョンデータを生成
    const dummyVersions = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      version: `v1.${i + 1}`,
      date: new Date(2023, 0, 1 + i).toISOString(),
      author: `作成者 ${i + 1}`,
      description: `バージョン ${i + 1} の説明文です。`,
    }));
    setVersions(dummyVersions);
  }, []);

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredVersions = versions
    .filter((v) =>
      v.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-red-500 pb-2">
        コンテンツバージョン管理
      </h1>

      <div className="mb-6 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="バージョンを検索..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" />
        </div>
        <button
          onClick={handleSort}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 flex items-center"
        >
          <ArrowUpDown className="mr-2" />
          {sortOrder === 'asc' ? '古い順' : '新しい順'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVersions.map((version) => (
          <div
            key={version.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-red-700">{version.version}</h2>
            <p className="text-sm text-gray-600 mb-2 flex items-center">
              <Clock className="mr-2" size={16} />
              {new Date(version.date).toLocaleDateString('ja-JP')}
            </p>
            <p className="text-sm text-gray-600 mb-4">{version.author}</p>
            <p className="text-gray-700 mb-4">{version.description}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setSelectedVersion(version)}
                className="text-red-500 hover:text-red-700 transition duration-300 flex items-center"
              >
                <Eye className="mr-1" size={18} />
                詳細を見る
              </button>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <FileText className="text-gray-600" size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedVersion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-red-700">{selectedVersion.version}</h2>
            <p className="text-sm text-gray-600 mb-2">
              作成日: {new Date(selectedVersion.date).toLocaleDateString('ja-JP')}
            </p>
            <p className="text-sm text-gray-600 mb-4">作成者: {selectedVersion.author}</p>
            <p className="text-gray-700 mb-6">{selectedVersion.description}</p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">変更内容</h3>
              <ul className="list-disc list-inside">
                <li>機能A: パフォーマンスの改善</li>
                <li>機能B: 新しいUIの実装</li>
                <li>バグ修正: クラッシュの問題を解決</li>
              </ul>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setSelectedVersion(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
              >
                閉じる
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                このバージョンを復元
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionControl;