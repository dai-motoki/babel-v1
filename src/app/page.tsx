'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Sidebar from '@/components/common/Sidebar';
import { Dna, Cloud, Package, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

// 以下のコードは、Next.jsのApp Routerを使用するために必要なインポートと設定を行っています。
// 'use client'ディレクティブは、このコンポーネントがクライアントサイドでレンダリングされることを示します。
// Reactと関連するフックをインポートし、必要なコンポーネントとアイコンも読み込んでいます。
// useRouterフックは、App Router用のnext/navigationからインポートするように変更しました。
// これにより、新しいルーティングシステムと互換性のある方法でナビゲーションを処理できます。

export default function HomePage() {
  const { t } = useTranslation();
  const router = useRouter();

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

  // カードクリック時の処理を更新
  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-gray-200 font-serif">
      <div className="flex flex-col h-screen">
        <header className="bg-transparent flex-grow flex items-center justify-center relative py-16">
          <div className="absolute inset-0 bg-cover bg-center opacity-70">
            <Image src="/images/starry-babel-tower.jpg" alt="Starry Babel Tower" layout="fill" objectFit="cover" />
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-7xl font-extrabold mb-8 animate-fade-in-down" style={{fontFamily: 'Cinzel, serif'}}>
              <div className="flex items-center justify-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-200 text-7xl font-extrabold mr-4">
                  バベル
                </span>
              </div>
            </h1>
            <p className="text-3xl font-light mb-16 animate-fade-in-up text-amber-100" style={{fontFamily: 'Noto Serif JP, serif'}}>
              言語を超え、文化をつなぐ。新たな世界の創造へ。
            </p>
            <div className="flex justify-center space-x-8 animate-fade-in">
              <a href="https://github.com/dai-motoki/babel-v1" target="_blank" rel="noopener noreferrer" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-xl inline-block" style={{fontFamily: 'Noto Sans JP, sans-serif'}}>
                塔を建設する
              </a>
              <button className="bg-transparent border-2 border-amber-400 hover:bg-amber-400 hover:text-gray-900 text-amber-400 font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-xl" style={{fontFamily: 'Noto Sans JP, sans-serif'}}>
                青写真を見る
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto px-4 py-8">
          <div className="space-y-16 max-w-7xl mx-auto">
            {Object.entries(sidebarComponents).map(([category, items]) => (
              <div key={category} className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-8 text-center text-amber-300" style={{fontFamily: 'Noto Serif JP, serif'}}>{t(category)}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((item) => (
                    <div 
                      key={item.name} 
                      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 relative"
                      onClick={() => handleCardClick(item.path)}
                    >
                      <div className="flex items-center mb-6">
                        <div className="bg-amber-500 p-4 rounded-full mr-4">
                          {item.icon}
                        </div>
                        <h3 className="text-2xl font-semibold text-amber-300" style={{fontFamily: 'Noto Sans JP, sans-serif'}}>{t(item.displayName)}</h3>
                      </div>
                      <p className="text-amber-100 mb-6" style={{fontFamily: 'Noto Sans JP, sans-serif'}}>
                        {t(`${item.name}Description`)}
                      </p>
                      <button className="text-amber-400 hover:text-amber-300 transition-colors duration-200" style={{fontFamily: 'Noto Sans JP, sans-serif'}}>
                        詳細を見る →
                      </button>
                      <div className={`absolute bottom-1 right-1 w-1 h-1 ${['ChatInterface', 'VersionControl', 'SaaSList', 'PackageList'].includes(item.name) ? 'bg-orange-500' : 'bg-gray-500'} rounded-full`}></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        <footer className="bg-gray-900 text-amber-100 p-8 text-center">
          <p className="text-sm mb-2">&copy; 2024 プロジェクト バベル</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-amber-300 hover:text-amber-100 transition-colors duration-200">プライバシーポリシー</a>
            <a href="#" className="text-amber-300 hover:text-amber-100 transition-colors duration-200">利用規約</a>
            <a href="#" className="text-amber-300 hover:text-amber-100 transition-colors duration-200">お問い合わせ</a>
          </div>
        </footer>
      </div>
    </div>
  );
}