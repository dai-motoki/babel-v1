'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { Dna, Cloud, Package, MessageSquare, Home } from 'lucide-react';

export default function Sidebar() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarComponents = {
    'システム開発': [
      { name: 'VersionControl', displayName: '開発エディタ', icon: <Dna size={18} />, isActive: true, path: '/development/editor' },
      { name: 'SaaSList', displayName: 'システムリスト', icon: <Cloud size={18} />, isActive: true, path: '/development/systems' },
      { name: 'PackageList', displayName: 'アーティファクト', icon: <Package size={18} />, isActive: true, path: '/development/artifacts' },
    ],
    'コミュニケーション': [
      { name: 'ChatInterface', displayName: 'チャットインターフェース', icon: <MessageSquare size={18} />, isActive: true, path: '/communication/chat' },
    ],
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleComponentSelect = (path: string) => {
    router.push(path);
  };

  return (
    <nav className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-black text-white shadow-lg overflow-y-auto transition-all duration-300 ease-in-out relative`}>
      <button
        onClick={toggleSidebar}
        className={`absolute top-4 -right-4 w-8 h-16 bg-amber-600 hover:bg-amber-500 transition-colors duration-200 shadow-md z-20 rounded-l-md overflow-hidden`}
      >
        <div className={`absolute inset-0 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-1/2' : 'translate-x-0'}`} style={{transformOrigin: 'left'}}>
          <div className="absolute inset-0 bg-amber-700 border-r-2 border-amber-400"></div>
          <div className="absolute top-1/2 left-1 w-2 h-2 bg-white rounded-full transform -translate-y-1/2"></div>
        </div>
      </button>
      {isSidebarOpen ? (
        <div className="p-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center w-full text-left px-6 py-4 hover:bg-gray-700 transition-colors duration-200 mb-4 rounded-lg shadow-md"
          >
            <Home size={18} />
            <span className="ml-2 text-base font-semibold text-white font-sans">{t('塔の基礎に戻る')}</span>
          </button>
          {Object.entries(sidebarComponents).map(([category, items], index) => (
            <div key={category} className="mb-6 rounded-lg p-4 shadow-md bg-gray-800">
              <h2 className="text-xl font-bold mb-3 text-white font-sans">{t(category)}</h2>
              <ul>
                {items.map((item) => (
                  <li key={item.name} className="mb-2 relative">
                    <button
                      onClick={() => handleComponentSelect(item.path)}
                      className="flex items-center w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      {React.cloneElement(item.icon, { className: "text-amber-400" })}
                      <span className="ml-2 text-white transition-colors duration-200 text-base font-medium font-sans">{t(item.displayName)}</span>
                    </button>
                    <div className={`absolute bottom-1 right-1 w-1 h-1 ${['ChatInterface', 'VersionControl', 'SaaSList', 'PackageList'].includes(item.name) ? 'bg-orange-500' : 'bg-gray-500'} rounded-full`}></div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-4">
          <button
            onClick={() => router.push('/')}
            className="flex justify-center w-full py-4 hover:bg-gray-700 transition-colors duration-200 mb-4 rounded-full shadow-md"
            title={t('塔の基礎に戻る')}
          >
            <Home size={24} className="text-amber-400" />
          </button>
          {Object.entries(sidebarComponents).map(([category, items], index) => (
            <div key={category} className="mb-6 py-2 shadow-md bg-gray-800">
              {items.map((item) => (
                <div key={item.name} className="relative mb-3">
                  <button
                    onClick={() => handleComponentSelect(item.path)}
                    className="flex justify-center w-full py-3 hover:bg-gray-700 transition-colors duration-200 rounded-full"
                    title={t(item.displayName)}
                  >
                    {React.cloneElement(item.icon, { size: 24, className: "text-amber-400" })}
                  </button>
                  <div className={`absolute bottom-0 right-1 w-1 h-1 ${['ChatInterface', 'VersionControl', 'SaaSList', 'PackageList'].includes(item.name) ? 'bg-orange-500' : 'bg-gray-500'} rounded-full`}></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}