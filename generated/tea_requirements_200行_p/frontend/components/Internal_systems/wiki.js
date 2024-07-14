import React, { useState, useEffect } from 'react';
import { Search, Edit, Save, Trash, ChevronRight } from 'lucide-react';

const WikiPage = ({ title, content, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      {isEditing ? (
        <textarea
          className="w-full h-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <div className="prose max-w-none">{content}</div>
      )}
      <div className="mt-4 flex justify-end space-x-2">
        {isEditing ? (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
            onClick={() => {
              onEdit(editedContent);
              setIsEditing(false);
            }}
          >
            <Save size={18} className="inline mr-2" />
            保存
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            onClick={() => setIsEditing(true)}
          >
            <Edit size={18} className="inline mr-2" />
            編集
          </button>
        )}
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
          onClick={onDelete}
        >
          <Trash size={18} className="inline mr-2" />
          削除
        </button>
      </div>
    </div>
  );
};

const WikiNavigation = ({ pages, onSelectPage }) => {
  return (
    <nav className="bg-green-50 p-4 rounded-lg shadow-inner">
      <h3 className="text-lg font-semibold mb-2 text-green-800">ページ一覧</h3>
      <ul>
        {pages.map((page) => (
          <li key={page.id} className="mb-2">
            <button
              className="text-green-700 hover:text-green-900 transition duration-300 flex items-center"
              onClick={() => onSelectPage(page.id)}
            >
              <ChevronRight size={16} className="mr-2" />
              {page.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Wiki = () => {
  const [pages, setPages] = useState([
    { id: 1, title: '抹茶の歴史', content: '抹茶は12世紀の日本で...' },
    { id: 2, title: '抹茶の効能', content: '抹茶には多くの健康効果があり...' },
    { id: 3, title: '抹茶の淹れ方', content: '最高の抹茶を淹れるには...' },
  ]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      setSelectedPage(pages[0]);
    }
  }, [pages, selectedPage]);

  const handleEdit = (newContent) => {
    setPages(
      pages.map((page) =>
        page.id === selectedPage.id ? { ...page, content: newContent } : page
      )
    );
    setSelectedPage({ ...selectedPage, content: newContent });
  };

  const handleDelete = () => {
    setPages(pages.filter((page) => page.id !== selectedPage.id));
    setSelectedPage(null);
  };

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-800 text-center">抹茶カフェ内部Wiki</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="ページを検索..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          <WikiNavigation pages={filteredPages} onSelectPage={(id) => setSelectedPage(pages.find((page) => page.id === id))} />
        </div>
        <div className="md:w-3/4">
          {selectedPage ? (
            <WikiPage
              title={selectedPage.title}
              content={selectedPage.content}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center text-gray-600">ページを選択してください</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wiki;