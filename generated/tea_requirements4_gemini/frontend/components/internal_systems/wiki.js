import React, { useState } from 'react';
import { Search } from 'lucide-react';

const sampleWikiData = [
  {
    id: 1,
    title: '抹茶の歴史',
    content: '抹茶は、鎌倉時代に栄西禅師が中国から持ち帰ったのが始まりとされています。...',
    category: '抹茶',
  },
  {
    id: 2,
    title: '抹茶の淹れ方',
    content: '茶筅を使って抹茶を点てる方法をご紹介します。...',
    category: '抹茶',
  },
  {
    id: 3,
    title: '抹茶のお菓子',
    content: '抹茶を使った様々なお菓子のレシピをご紹介します。...',
    category: 'お菓子',
  },
  {
    id: 4,
    title: '抹茶の健康効果',
    content: '抹茶には、抗酸化作用やリラックス効果など、様々な健康効果があります。...',
    category: '抹茶',
  },
];

const Wiki = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredWikiData = sampleWikiData.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    return titleMatch && categoryMatch;
  });

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        社内Wiki
      </h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="検索..."
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div>
          <select
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="all">すべて</option>
            <option value="抹茶">抹茶</option>
            <option value="お菓子">お菓子</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWikiData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transform transition duration-300 ease-in-out"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {item.title}
            </h2>
            <p className="text-gray-600">
              {item.content.substring(0, 100)}...
            </p>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
              続きを読む
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wiki;