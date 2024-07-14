import React, { useState, useEffect } from 'react';
import { Sun, Moon, Type, ZoomIn, ZoomOut, Eye } from 'lucide-react';

const AccessibilityFeatures = () => {
  const [fontSize, setFontSize] = useState(16);
  const [contrast, setContrast] = useState('normal');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
    document.body.classList.toggle('high-contrast', contrast === 'high');
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }, [fontSize, contrast, theme]);

  const increaseFontSize = () => {
    setFontSize(prevSize => Math.min(prevSize + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => Math.max(prevSize - 2, 12));
  };

  const toggleContrast = () => {
    setContrast(prevContrast => prevContrast === 'normal' ? 'high' : 'normal');
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">アクセシビリティ設定</h2>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 dark:text-gray-300">文字サイズ</span>
        <div className="flex space-x-2">
          <button
            onClick={decreaseFontSize}
            className="p-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors duration-200"
            aria-label="文字サイズを小さくする"
          >
            <ZoomOut size={18} />
          </button>
          <button
            onClick={increaseFontSize}
            className="p-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors duration-200"
            aria-label="文字サイズを大きくする"
          >
            <ZoomIn size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 dark:text-gray-300">コントラスト</span>
        <button
          onClick={toggleContrast}
          className={`p-2 rounded-full transition-colors duration-200 ${
            contrast === 'high'
              ? 'bg-yellow-200 text-yellow-800'
              : 'bg-gray-200 text-gray-800'
          }`}
          aria-label="コントラストを切り替える"
        >
          <Eye size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 dark:text-gray-300">テーマ</span>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-indigo-200 text-indigo-800'
              : 'bg-orange-200 text-orange-800'
          }`}
          aria-label="テーマを切り替える"
        >
          {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={() => {
            setFontSize(16);
            setContrast('normal');
            setTheme('light');
          }}
          className="w-full py-2 px-4 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors duration-200"
        >
          設定をリセット
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>現在の設定:</p>
        <ul className="list-disc list-inside">
          <li>文字サイズ: {fontSize}px</li>
          <li>コントラスト: {contrast === 'high' ? '高' : '通常'}</li>
          <li>テーマ: {theme === 'dark' ? 'ダーク' : 'ライト'}</li>
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">キーボードショートカット</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li><kbd className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Ctrl</kbd> + <kbd className="bg-gray-200 dark:bg-gray-700 px-1 rounded">+</kbd>: 文字サイズを大きく</li>
          <li><kbd className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Ctrl</kbd> + <kbd className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-</kbd>: 文字サイズを小さく</li>
          <li><kbd className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Ctrl</kbd> + <kbd className="bg-gray-200 dark:bg-gray-700 px-1 rounded">J</kbd>: 高コントラストモード切替</li>
          <li><kbd className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Ctrl</kbd> + <kbd className="bg-gray-200 dark:bg-gray-700 px-1 rounded">M</kbd>: ダークモード切替</li>
        </ul>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>このパネルは、和菓子職人の方々や高齢のお客様にも使いやすいように設計されています。必要に応じて設定を調整し、快適にご利用ください。</p>
      </div>
    </div>
  );
};

export default AccessibilityFeatures;