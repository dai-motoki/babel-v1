
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import Tower from './components/Icons/Tower';
import SaaSCard from './components/SaaSCard';
import SearchBar from './components/SearchBar';
import useSaaSData from './hooks/useSaaSData';
import VersionControl from '../SystemEditor/VersionControl';
import { useRouter } from 'next/navigation';


const SaaSList = () => {
  const router = useRouter();

  const { t } = useTranslation();
  const { saasItems, addSaaSItem } = useSaaSData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全て');
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedSaaS, setSelectedSaaS] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSaaS, setNewSaaS] = useState({ name: '', category: '', description: '', url: '' });

  const filteredItems = saasItems.filter(item =>
    (selectedCategory === '全て' || item.category === selectedCategory) &&
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const renderTowerAnimation = (level) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(level)].map((_, index) => (
          <Tower 
            key={index} 
            size={16} 
            className={`text-indigo-500 transform transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`} 
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>
    );
  };

  const handleSaaSClick = (saas: any) => {
    const encodedSystemName = encodeURIComponent(saas.name);
    const url = `/development/editor?system=${encodedSystemName}`;
    
    // 新しいタブで開く
    window.open(url, '_blank');
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
  };

  const handleInputChange = (e) => {
    setNewSaaS({ ...newSaaS, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSaaSItem(newSaaS);
    setNewSaaS({ name: '', category: '', description: '', url: '' });
    setIsAddingNew(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-indigo-800 flex items-center">
        <Tower className="mr-2 animate-pulse" size={32} />
        {t('saas.list.title')} - システムリスト
      </h2>
      {selectedSaaS ? (
        <div className="mb-6 relative overflow-hidden rounded-lg">
          <img src={selectedSaaS.image} alt={selectedSaaS.name} className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-70"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-2xl font-bold mb-2 animate-fadeIn">{selectedSaaS.name}</h3>
            <p className="text-lg animate-slideUp">{selectedSaaS.description}</p>
          </div>
        </div>
      ) : (
        <div className="mb-6 relative overflow-hidden rounded-lg">
          <img src="https://picsum.photos/800/400" alt="システムアーキテクチャ" className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-70"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-2xl font-bold mb-2 animate-fadeIn">システム バベルの塔</h3>
            <p className="text-lg animate-slideUp">各システムが積み重なり、デジタルの世界に新たなバベルの塔を築き上げています。基盤層から天空層まで、革新的なシステムが私たちのビジネスを高みへと導きます。さあ、共に頂点を目指しましょう！</p>
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-between items-center mb-6 space-y-4 md:space-y-0">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} t={t} />
        <div className="flex space-x-2">
          {['全て', 'インフラストラクチャ層', 'ミドルウェア層', 'サービス層', 'アプリケーション層', 'ユーザーインターフェース層'].map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-indigo-600 hover:bg-indigo-100'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button 
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 flex items-center shadow-lg"
          onClick={handleAddNew}
        >
          <Plus size={20} className="mr-2" />
          {t('saas.list.add')}
        </button>
      </div>
      {isAddingNew && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-indigo-800">新しいシステムを生成</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={newSaaS.name}
              onChange={handleInputChange}
              placeholder="SaaS名"
              className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <select
              name="category"
              value={newSaaS.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">カテゴリーを選択</option>
              {['インフラストラクチャ層', 'ミドルウェア層', 'サービス層', 'アプリケーション層', 'ユーザーインターフェース層'].map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input
              type="text"
              name="description"
              value={newSaaS.description}
              onChange={handleInputChange}
              placeholder="説明"
              className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="url"
              name="url"
              value={newSaaS.url}
              onChange={handleInputChange}
              placeholder="URL (オプション)"
              className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
            >
              追加
            </button>
          </div>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <SaaSCard
            key={item.id}
            item={item}
            onSaaSClick={handleSaaSClick}
            renderTowerAnimation={renderTowerAnimation}
          />
        ))}
      </div>
      {filteredItems.length === 0 && (
        <p className="text-center text-indigo-500 mt-4 animate-bounce">{t('saas.list.noResults')}</p>
      )}
    </div>
  );
};

export default SaaSList;
