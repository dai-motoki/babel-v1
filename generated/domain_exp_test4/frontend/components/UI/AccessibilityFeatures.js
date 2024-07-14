import React, { useState, useEffect } from 'react';
import { Sun, Moon, ZoomIn, ZoomOut } from 'react-feather';

const AccessibilityFeatures = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast, fontSize]);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2);
    }
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={togglePanel}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label="アクセシビリティ設定"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 mt-2 w-64 transition-all duration-300 ease-in-out">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">アクセシビリティ設定</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">高コントラストモード</span>
              <button
                onClick={toggleHighContrast}
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  highContrast ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-600'
                }`}
                aria-label={highContrast ? '高コントラストモードをオフにする' : '高コントラストモードをオンにする'}
              >
                {highContrast ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">文字サイズ調整</span>
                <div className="flex space-x-2">
                  <button
                    onClick={decreaseFontSize}
                    className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="文字サイズを小さくする"
                  >
                    <ZoomOut size={20} />
                  </button>
                  <button
                    onClick={increaseFontSize}
                    className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="文字サイズを大きくする"
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                現在の文字サイズ: {fontSize}px
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setHighContrast(false);
                  setFontSize(16);
                }}
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                設定をリセット
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 和風モダンな装飾要素 */}
      <div className="absolute -top-16 -left-16 w-32 h-32 bg-pink-100 opacity-50 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-indigo-100 opacity-50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
    </div>
  );
};

export default AccessibilityFeatures;