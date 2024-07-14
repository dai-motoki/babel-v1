import React, { useState, useEffect } from 'react';
import { Search, Edit, Save, Trash2, ChevronRight, ChevronDown } from 'lucide-react';

const WikiPage = ({ title, content, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {isExpanded ? <ChevronDown className="text-gray-600" /> : <ChevronRight className="text-gray-600" />}
      </div>
      {isExpanded && (
        <div className="mt-4">
          <p className="text-gray-700">{content}</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
              <Edit size={18} />
            </button>
            <button onClick={onDelete} className="text-red-600 hover:text-red-800">
              <Trash2 size={18} />
            </button>
          </div>
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
        placeholder="タイトル"
      />
      <textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        className="w-full h-40 mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="内容"
      />
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onSave(editTitle, editContent)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
        >
          <Save size={18} className="inline-block mr-2" />
          保存
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};

const WikiSystem = () => {
  const [pages, setPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPage, setEditingPage] = useState(null);

  useEffect(() => {
    // モックデータの読み込み
    const mockPages = [
      { id: 1, title: '抹茶の歴史', content: '抹茶は12世紀頃から日本で飲まれるようになりました...' },
      { id: 2, title: '茶道の作法', content: '茶道には「和敬清寂」という精神があります...' },
      { id: 3, title: '抹茶の効能', content: '抹茶には豊富なカテキンが含まれており、抗酸化作用があります...' },
    ];
    setPages(mockPages);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (page) => {
    setEditingPage(page);
  };

  const handleSave = (title, content) => {
    if (editingPage) {
      setPages(pages.map(p => p.id === editingPage.id ? { ...p, title, content } : p));
    } else {
      setPages([...pages, { id: Date.now(), title, content }]);
    }
    setEditingPage(null);
  };

  const handleDelete = (pageId) => {
    setPages(pages.filter(p => p.id !== pageId));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-8">抹茶カフェ内部Wiki</h1>
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="検索..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 pl-10 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Search className="absolute left-3 top-3 text-gray-400" />
      </div>
      <button
        onClick={() => setEditingPage({ title: '', content: '' })}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
      >
        新規ページ作成
      </button>
      {editingPage && (
        <WikiEditor
          title={editingPage.title}
          content={editingPage.content}
          onSave={handleSave}
          onCancel={() => setEditingPage(null)}
        />
      )}
      <div className="space-y-4">
        {filteredPages.map(page => (
          <WikiPage
            key={page.id}
            title={page.title}
            content={page.content}
            onEdit={() => handleEdit(page)}
            onDelete={() => handleDelete(page.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default WikiSystem;