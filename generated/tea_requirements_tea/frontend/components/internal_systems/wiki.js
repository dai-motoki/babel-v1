import React, { useState, useEffect } from 'react';
import { Search, Edit, Save, List, AlertCircle, BookOpen, PlusCircle, Trash2 } from 'lucide-react';

const Wiki = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: '', content: '' });

  useEffect(() => {
    // 実際の実装では、APIからデータを取得します
    const fetchArticles = async () => {
      try {
        // モックデータ
        const mockArticles = [
          { id: 1, title: 'お茶の歴史', content: 'お茶の起源は古く...', lastUpdated: '2023-06-01' },
          { id: 2, title: '緑茶の効能', content: '緑茶には多くの健康効果があります...', lastUpdated: '2023-06-15' },
          { id: 3, title: '茶道の作法', content: '茶道には以下の基本的な作法があります...', lastUpdated: '2023-06-30' },
        ];
        setArticles(mockArticles);
      } catch (error) {
        console.error('記事の取得に失敗しました:', error);
        // エラーメッセージを表示するなどのエラーハンドリングを行う
      }
    };
    fetchArticles();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // 実際の実装では、APIを使用して変更を保存します
    setIsEditing(false);
    // 成功メッセージを表示
    alert('記事が正常に保存されました。');
  };

  const handleCreate = () => {
    setIsCreating(true);
    setSelectedArticle(null);
    setIsEditing(false);
  };

  const handleSaveNew = () => {
    // 実際の実装では、APIを使用して新しい記事を保存します
    const newId = articles.length + 1;
    const createdArticle = { ...newArticle, id: newId, lastUpdated: new Date().toISOString().split('T')[0] };
    setArticles([...articles, createdArticle]);
    setSelectedArticle(createdArticle);
    setIsCreating(false);
    setNewArticle({ title: '', content: '' });
    alert('新しい記事が正常に作成されました。');
  };

  const handleDelete = () => {
    if (window.confirm('本当にこの記事を削除しますか？')) {
      // 実際の実装では、APIを使用して記事を削除します
      const updatedArticles = articles.filter(article => article.id !== selectedArticle.id);
      setArticles(updatedArticles);
      setSelectedArticle(null);
      alert('記事が正常に削除されました。');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-indigo-800">内部Wikiシステム</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="記事を検索..."
          className="flex-grow p-2 border rounded-l text-gray-800"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="bg-indigo-600 text-white p-2 rounded-r hover:bg-indigo-700 transition duration-300">
          <Search size={20} />
        </button>
      </div>
      <div className="flex bg-white rounded-lg shadow-lg">
        <div className="w-1/3 p-4 border-r">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">記事一覧</h2>
            <button onClick={handleCreate} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300">
              <PlusCircle size={20} />
            </button>
          </div>
          <ul className="space-y-2">
            {filteredArticles.map(article => (
              <li
                key={article.id}
                className={`cursor-pointer hover:bg-gray-100 p-2 rounded transition duration-300 ${selectedArticle && selectedArticle.id === article.id ? 'bg-indigo-100' : ''}`}
                onClick={() => handleSelectArticle(article)}
              >
                <div className="flex items-center">
                  <BookOpen size={16} className="mr-2 text-indigo-600" />
                  <span className="text-gray-800">{article.title}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">最終更新: {article.lastUpdated}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 p-4">
          {selectedArticle ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">{selectedArticle.title}</h2>
                <div className="space-x-2">
                  {isEditing ? (
                    <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300">
                      <Save size={20} />
                    </button>
                  ) : (
                    <>
                      <button onClick={handleEdit} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-300">
                        <Edit size={20} />
                      </button>
                      <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300">
                        <Trash2 size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              {isEditing ? (
                <textarea
                  className="w-full h-64 p-2 border rounded text-gray-800"
                  value={selectedArticle.content}
                  onChange={(e) => setSelectedArticle({...selectedArticle, content: e.target.value})}
                />
              ) : (
                <div className="prose max-w-none text-gray-800">
                  <p>{selectedArticle.content}</p>
                </div>
              )}
            </div>
          ) : isCreating ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">新しい記事を作成</h2>
              <input
                type="text"
                placeholder="タイトル"
                className="w-full p-2 mb-4 border rounded text-gray-800"
                value={newArticle.title}
                onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
              />
              <textarea
                placeholder="内容"
                className="w-full h-64 p-2 mb-4 border rounded text-gray-800"
                value={newArticle.content}
                onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
              />
              <button onClick={handleSaveNew} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300">
                記事を作成
              </button>
            </div>
          ) : (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded" role="alert">
              <div className="flex">
                <div className="py-1"><AlertCircle className="h-6 w-6 text-yellow-500 mr-4" /></div>
                <div>
                  <p className="font-bold">記事が選択されていません</p>
                  <p className="text-sm">左側の一覧から記事を選択するか、新しい記事を作成してください。</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wiki;