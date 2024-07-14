import React, { useState, useEffect } from 'react';
import { Sun, Moon, Type, ZoomIn, ZoomOut, Contrast } from 'lucide-react';

const AccessibilityFeatures = () => {
  const [fontSize, setFontSize] = useState(16);
  const [contrast, setContrast] = useState('normal');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
    document.body.className = `${contrast} ${theme}`;
  }, [fontSize, contrast, theme]);

  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(prevSize => prevSize + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(prevSize => prevSize - 2);
    }
  };

  const toggleContrast = () => {
    setContrast(prevContrast => prevContrast === 'normal' ? 'high-contrast' : 'normal');
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">アクセシビリティ設定</h2>
      
      <div className="space-y-4">
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
              contrast === 'high-contrast' 
                ? 'bg-yellow-200 text-yellow-800' 
                : 'bg-gray-200 text-gray-800'
            }`}
            aria-label="コントラストを切り替える"
          >
            <Contrast size={18} />
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
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-200">現在の設定</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300">
          <li>文字サイズ: {fontSize}px</li>
          <li>コントラスト: {contrast === 'normal' ? '通常' : '高'}</li>
          <li>テーマ: {theme === 'light' ? '明るい' : '暗い'}</li>
        </ul>
      </div>

      <div className="mt-6">
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

      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-200">ショートカット</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li><kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded">+</kbd> 文字を大きく</li>
          <li><kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded">-</kbd> 文字を小さく</li>
          <li><kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded">Alt</kbd> + <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded">C</kbd> コントラスト切替</li>
          <li><kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded">Alt</kbd> + <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded">T</kbd> テーマ切替</li>
        </ul>
      </div>

      <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        <p>このアクセシビリティ機能は、すべてのユーザーが快適にサイトを利用できるよう設計されています。ご不明な点がございましたら、お気軽にお問い合わせください。</p>
      </div>
    </div>
  );
};

export default AccessibilityFeatures;