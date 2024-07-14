import React, { useState, useEffect } from 'react';
import { Search, Edit, Save, Clock, Globe, Link } from 'lucide-react';

const MultilingualWiki = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('ja');

  useEffect(() => {
    // Fetch articles from API
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    // Simulated API call
    const response = await fetch('/api/articles');
    const data = await response.json();
    setArticles(data);
  };

  const handleArticleSelect = (article) => {
    setSelectedArticle(article);
    setEditMode(false);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    // Simulated API call to save changes
    await fetch(`/api/articles/${selectedArticle.id}`, {
      method: 'PUT',
      body: JSON.stringify(selectedArticle),
    });
    setEditMode(false);
    fetchArticles();
  };

  const handleContentChange = (e) => {
    setSelectedArticle({ ...selectedArticle, content: e.target.value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const translateContent = (content) => {
    // Simulated translation function
    return `Translated to ${currentLanguage}: ${content}`;
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">多言語Wiki</h1>
      <div className="flex mb-4">
        <div className="w-1/3 pr-4">
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="記事を検索..."
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
          <ul className="bg-white shadow-md rounded-md overflow-hidden">
            {filteredArticles.map((article) => (
              <li
                key={article.id}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                onClick={() => handleArticleSelect(article)}
              >
                {article.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 bg-white p-6 rounded-md shadow-md">
          {selectedArticle ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{selectedArticle.title}</h2>
                <div className="flex space-x-2">
                  <button
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleEditToggle}
                  >
                    <Edit size={20} />
                  </button>
                  {editMode && (
                    <button
                      className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={handleSave}
                    >
                      <Save size={20} />
                    </button>
                  )}
                </div>
              </div>
              {editMode ? (
                <textarea
                  className="w-full h-64 p-2 border border-gray-300 rounded-md"
                  value={selectedArticle.content}
                  onChange={handleContentChange}
                />
              ) : (
                <div className="prose max-w-none">
                  {translateContent(selectedArticle.content)}
                </div>
              )}
              <div className="mt-4 text-sm text-gray-600">
                <Clock size={16} className="inline mr-1" />
                最終更新: {new Date(selectedArticle.lastModified).toLocaleString()}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <Globe size={16} className="inline mr-1" />
                言語: {currentLanguage}
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">関連記事</h3>
                <ul className="list-disc list-inside">
                  {selectedArticle.relatedArticles?.map((related) => (
                    <li key={related.id} className="mb-1">
                      <Link size={16} className="inline mr-1" />
                      <a href="#" className="text-blue-500 hover:underline">
                        {related.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p className="text-gray-600">記事を選択してください</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultilingualWiki;