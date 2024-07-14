import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, Book, Calendar, DollarSign, BarChart2 } from 'lucide-react';

const ResponsiveLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('dashboard');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { name: 'ダッシュボード', icon: <BarChart2 />, section: 'dashboard' },
    { name: '学生管理', icon: <User />, section: 'students' },
    { name: 'コース管理', icon: <Book />, section: 'courses' },
    { name: 'スケジュール', icon: <Calendar />, section: 'schedule' },
    { name: '財務', icon: <DollarSign />, section: 'finance' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* サイドバー（デスクトップ） */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex items-center h-16 px-4 bg-indigo-700">
            <span className="text-2xl font-semibold text-white">生成AI塾</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto bg-indigo-800">
            <nav className="flex-1 px-2 py-4">
              {menuItems.map((item) => (
                <a
                  key={item.section}
                  href={`#${item.section}`}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    currentSection === item.section
                      ? 'bg-indigo-900 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600'
                  }`}
                  onClick={() => setCurrentSection(item.section)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* モバイルメニュー */}
      <div className="md:hidden">
        <div className="fixed inset-0 z-40 flex">
          <div
            className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={toggleMobileMenu}
          ></div>

          <div
            className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-800 transition ease-in-out duration-300 transform ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">メニューを閉じる</span>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center px-4">
              <span className="text-2xl font-semibold text-white">生成AI塾</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.section}
                  href={`#${item.section}`}
                  className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    currentSection === item.section
                      ? 'bg-indigo-900 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600'
                  }`}
                  onClick={() => {
                    setCurrentSection(item.section);
                    toggleMobileMenu();
                  }}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold text-gray-900">
                {menuItems.find((item) => item.section === currentSection)?.name}
              </h1>
              <button
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">メニューを開く</span>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* コンテンツエリア */}
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                {children}
              </div>
            </div>
          </div>
        </main>

        {/* フッター */}
        <footer className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © 2023 生成AI塾. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ResponsiveLayout;