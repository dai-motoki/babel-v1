import React, { useState, useEffect } from 'react';
import { Sun, Moon, Type, Eye, VolumeX, Volume2, Minimize, Maximize } from 'lucide-react';

const AccessibilityFeatures = () => {
  const [fontSize, setFontSize] = useState(16);
  const [contrast, setContrast] = useState('normal');
  const [focusMode, setFocusMode] = useState(false);
  const [readAloud, setReadAloud] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
    document.body.className = contrast;
    document.body.classList.toggle('focus-mode', focusMode);
  }, [fontSize, contrast, focusMode]);

  const togglePanel = () => setIsOpen(!isOpen);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));

  const toggleContrast = () => {
    setContrast(prev => prev === 'normal' ? 'high-contrast' : 'normal');
  };

  const toggleFocusMode = () => setFocusMode(prev => !prev);

  const toggleReadAloud = () => {
    setReadAloud(prev => !prev);
    if (!readAloud) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("読み上げ機能がオンになりました"));
    } else {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={togglePanel}
        className="bg-indigo-700 text-white p-3 rounded-full shadow-lg hover:bg-indigo-800 transition-colors duration-300"
        aria-label="アクセシビリティ設定を開く"
      >
        <Eye size={24} />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-72 transition-all duration-300 ease-in-out transform scale-100 opacity-100">
          <h2 className="text-xl font-semibold mb-4 text-indigo-800">アクセシビリティ設定</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">文字サイズ</label>
              <div className="flex items-center justify-between">
                <button
                  onClick={decreaseFontSize}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
                  aria-label="文字サイズを小さくする"
                >
                  <Type size={18} />
                  <span className="ml-1">-</span>
                </button>
                <span className="mx-2 font-semibold">{fontSize}px</span>
                <button
                  onClick={increaseFontSize}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
                  aria-label="文字サイズを大きくする"
                >
                  <Type size={18} />
                  <span className="ml-1">+</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">コントラスト</label>
              <button
                onClick={toggleContrast}
                className={`w-full py-2 px-4 rounded ${
                  contrast === 'high-contrast'
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-200 text-gray-800'
                } hover:bg-gray-300 transition-colors duration-300`}
                aria-label="コントラストを切り替える"
              >
                {contrast === 'high-contrast' ? <Sun size={18} /> : <Moon size={18} />}
                <span className="ml-2">
                  {contrast === 'high-contrast' ? 'ハイコントラスト' : '通常コントラスト'}
                </span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">フォーカスモード</label>
              <button
                onClick={toggleFocusMode}
                className={`w-full py-2 px-4 rounded ${
                  focusMode ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
                } hover:bg-gray-300 transition-colors duration-300`}
                aria-label="フォーカスモードを切り替える"
              >
                {focusMode ? <Minimize size={18} /> : <Maximize size={18} />}
                <span className="ml-2">{focusMode ? 'オン' : 'オフ'}</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">読み上げ機能</label>
              <button
                onClick={toggleReadAloud}
                className={`w-full py-2 px-4 rounded ${
                  readAloud ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                } hover:bg-gray-300 transition-colors duration-300`}
                aria-label="読み上げ機能を切り替える"
              >
                {readAloud ? <Volume2 size={18} /> : <VolumeX size={18} />}
                <span className="ml-2">{readAloud ? 'オン' : 'オフ'}</span>
              </button>
            </div>
          </div>

          <button
            onClick={togglePanel}
            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300"
            aria-label="アクセシビリティ設定を閉じる"
          >
            閉じる
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityFeatures;