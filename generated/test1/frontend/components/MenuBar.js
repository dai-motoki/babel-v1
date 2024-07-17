import React, { useState } from 'react';
import { MessageCircle, Book, LayoutDashboard, Globe, LogOut, User } from 'lucide-react';

const MenuBar = ({ onComponentChange, currentUser, onLanguageChange, onLogout }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('日本語');

  const handleComponentClick = (component) => {
    onComponentChange(component);
    setIsSettingsOpen(false);
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    onLanguageChange(language);
    setIsSettingsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsSettingsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-semibold text-white">Babel</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => handleComponentClick('GlobalChat')}
              className="flex items-center text-white hover:text-yellow-200 transition-colors duration-200"
            >
              <MessageCircle className="mr-2" size={20} />
              <span className="hidden md:inline">グローバルチャット</span>
            </button>
            <button
              onClick={() => handleComponentClick('MultilingualWiki')}
              className="flex items-center text-white hover:text-yellow-200 transition-colors duration-200"
            >
              <Book className="mr-2" size={20} />
              <span className="hidden md:inline">多言語Wiki</span>
            </button>
            <button
              onClick={() => handleComponentClick('ProjectDashboard')}
              className="flex items-center text-white hover:text-yellow-200 transition-colors duration-200"
            >
              <LayoutDashboard className="mr-2" size={20} />
              <span className="hidden md:inline">プロジェクト</span>
            </button>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="flex items-center text-white hover:text-yellow-200 transition-colors duration-200"
          >
            <User className="mr-2" size={20} />
            <span className="hidden md:inline">{currentUser?.name || 'ユーザー'}</span>
          </button>
          {isSettingsOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <div className="px-4 py-2 text-sm text-gray-700">
                <Globe className="inline mr-2" size={16} />
                {currentLanguage}
              </div>
              <button
                onClick={() => handleLanguageChange('English')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange('日本語')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                日本語
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <LogOut className="mr-2" size={16} />
                ログアウト
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;