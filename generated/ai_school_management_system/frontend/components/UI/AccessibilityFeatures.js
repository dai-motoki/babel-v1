import React, { useState, useEffect } from 'react';
import { Moon, Sun, Type, ZoomIn, ZoomOut, Volume2, Volume1, VolumeX } from 'react-feather';

const AccessibilityFeatures = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('high-contrast', highContrast);
    document.body.style.fontSize = `${fontSize}px`;
  }, [darkMode, fontSize, highContrast]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));
  const toggleHighContrast = () => setHighContrast(!highContrast);
  const toggleTextToSpeech = () => setTextToSpeech(!textToSpeech);
  const handleVolumeChange = (e) => setVolume(parseInt(e.target.value));

  const speak = (text) => {
    if ('speechSynthesis' in window && textToSpeech) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = volume / 100;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">アクセシビリティ設定</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">ダークモード</span>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
          >
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">フォントサイズ</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={decreaseFontSize}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
            >
              <ZoomOut className="text-gray-700 dark:text-gray-300" />
            </button>
            <span className="text-gray-700 dark:text-gray-300">{fontSize}px</span>
            <button
              onClick={increaseFontSize}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
            >
              <ZoomIn className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">ハイコントラスト</span>
          <button
            onClick={toggleHighContrast}
            className={`w-12 h-6 rounded-full ${highContrast ? 'bg-blue-600' : 'bg-gray-400'} transition-colors duration-200 flex items-center ${highContrast ? 'justify-end' : 'justify-start'}`}
          >
            <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">テキスト読み上げ</span>
          <button
            onClick={toggleTextToSpeech}
            className={`w-12 h-6 rounded-full ${textToSpeech ? 'bg-blue-600' : 'bg-gray-400'} transition-colors duration-200 flex items-center ${textToSpeech ? 'justify-end' : 'justify-start'}`}
          >
            <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">音量</span>
          <div className="flex items-center space-x-2">
            <VolumeX className="text-gray-700 dark:text-gray-300" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <Volume2 className="text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => speak("これはテキスト読み上げのテストです。")}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors duration-200"
        >
          テキスト読み上げテスト
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">和風モダンデザイン要素</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-100 dark:bg-red-900 h-20 rounded-lg flex items-center justify-center text-red-800 dark:text-red-200">
            桜
          </div>
          <div className="bg-green-100 dark:bg-green-900 h-20 rounded-lg flex items-center justify-center text-green-800 dark:text-green-200">
            竹
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 h-20 rounded-lg flex items-center justify-center text-blue-800 dark:text-blue-200">
            波
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 h-20 rounded-lg flex items-center justify-center text-yellow-800 dark:text-yellow-200">
            金箔
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityFeatures;