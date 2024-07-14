import React, { useState, useEffect } from 'react';
import { Sun, Moon, Type, ZoomIn, ZoomOut } from 'lucide-react';

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
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">アクセシビリティ設定</h2>
      
      <div className="flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-300">文字サイズ</span>
        <div className="flex space-x-2">
          <button
            onClick={decreaseFontSize}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition duration-300"
            aria-label="文字サイズを小さくする"
          >
            <ZoomOut size={20} />
          </button>
          <button
            onClick={increaseFontSize}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition duration-300"
            aria-label="文字サイズを大きくする"
          >
            <ZoomIn size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-300">コントラスト</span>
        <button
          onClick={toggleContrast}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300 ${
            contrast === 'high'
              ? 'bg-yellow-500 text-gray-900'
              : 'bg-gray-200 text-gray-700'
          }`}
          aria-label="コントラストを切り替える"
        >
          <Type size={20} />
          <span>{contrast === 'high' ? '高' : '標準'}</span>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-300">テーマ</span>
        <button
          onClick={toggleTheme}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300 ${
            theme === 'dark'
              ? 'bg-gray-700 text-white'
              : 'bg-yellow-400 text-gray-900'
          }`}
          aria-label="テーマを切り替える"
        >
          {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          <span>{theme === 'dark' ? 'ダーク' : 'ライト'}</span>
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">その他の設定</h3>
        <ul className="space-y-2">
          <li>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="form-checkbox text-green-500 h-5 w-5" />
              <span className="text-gray-700 dark:text-gray-300">画像の代替テキストを表示</span>
            </label>
          </li>
          <li>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="form-checkbox text-green-500 h-5 w-5" />
              <span className="text-gray-700 dark:text-gray-300">アニメーションを減らす</span>
            </label>
          </li>
          <li>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="form-checkbox text-green-500 h-5 w-5" />
              <span className="text-gray-700 dark:text-gray-300">キーボードナビゲーションを強化</span>
            </label>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
          設定を保存
        </button>
      </div>
    </div>
  );
};

export default AccessibilityFeatures;