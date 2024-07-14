import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, ChevronRight, ChevronDown, Plus, Save } from 'lucide-react';

const WikiPage = ({ title, content, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer bg-green-50 hover:bg-green-100 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center">
          <button
            className="mr-2 text-gray-600 hover:text-green-600"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit size={18} />
          </button>
          <button
            className="mr-2 text-gray-600 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 size={18} />
          </button>
          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 bg-white">
          <p className="text-gray-700 leading-relaxed">{content}</p>
        </div>
      )}
    </div>
  );
};

const WikiEditor = ({ title, content, onSave, onCancel }) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="ページタイトル"
      />
      <textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        className="w-full h-40 mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="ページ内容"
      />
      <div className="flex justify-end">
        <button
          onClick={() => onSave(editTitle, editContent)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 mr-2"
        >
          <Save size={18} className="inline-block mr-1" />
          保存
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};

const Wiki = () => {
  const [pages, setPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPage, setEditingPage] = useState(null);

  useEffect(() => {
    // モックデータの読み込み
    const mockPages = [
      { id: 1, title: '抹茶の歴史', content: '抹茶は12世紀の日本で発祥し、禅宗の僧侶たちによって広められました。...' },
      { id: 2, title: '抹茶の製法', content: '高品質な抹茶は、茶葉を摘み取る前に約20日間日光を遮ります。...' },
      { id: 3, title: '抹茶の効能', content: '抹茶には豊富なカテキンが含まれており、抗酸化作用や代謝促進効果があります。...' },
    ];
    setPages(mockPages);
  }, []);

  const handleAddPage = () => {
    setEditingPage({ id: Date.now(), title: '', content: '' });
  };

  const handleEditPage = (page) => {
    setEditingPage(page);
  };

  const handleSavePage = (title, content) => {
    if (editingPage.id) {
      setPages(pages.map(p => p.id === editingPage.id ? { ...p, title, content } : p));
    } else {
      setPages([...pages, { id: Date.now(), title, content }]);
    }
    setEditingPage(null);
  };

  const handleDeletePage = (pageId) => {
    setPages(pages.filter(p => p.id !== pageId));
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-green-500 pb-2">
        抹茶カフェ 内部Wiki
      </h1>
      <div className="mb-6 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button
          onClick={handleAddPage}
          className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          <Plus size={18} className="inline-block mr-1" />
          新規ページ
        </button>
      </div>
      {editingPage && (
        <WikiEditor
          title={editingPage.title}
          content={editingPage.content}
          onSave={handleSavePage}
          onCancel={() => setEditingPage(null)}
        />
      )}
      {filteredPages.map(page => (
        <WikiPage
          key={page.id}
          title={page.title}
          content={page.content}
          onEdit={() => handleEditPage(page)}
          onDelete={() => handleDeletePage(page.id)}
        />
      ))}
    </div>
  );
};

export default Wiki;