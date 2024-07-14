import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, Search, ChevronDown } from 'lucide-react';

const Website = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { id: 'home', label: 'ホーム' },
    { id: 'products', label: '商品一覧' },
    { id: 'about', label: '私たちについて' },
    { id: 'contact', label: 'お問い合わせ' },
  ];

  const products = [
    { id: 1, name: '抹茶', price: 1200, image: '/api/placeholder/300/300' },
    { id: 2, name: '煎茶', price: 800, image: '/api/placeholder/300/300' },
    { id: 3, name: '玄米茶', price: 600, image: '/api/placeholder/300/300' },
    { id: 4, name: 'ほうじ茶', price: 700, image: '/api/placeholder/300/300' },
  ];

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-green-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/api/placeholder/50/50" alt="Logo" className="h-10 w-10 mr-2" />
            <h1 className="text-2xl font-bold">抹茶カフェ</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === item.id ? 'bg-green-700' : 'hover:bg-green-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-green-200">
              <Search size={24} />
            </button>
            <button className="text-white hover:text-green-200">
              <ShoppingCart size={24} />
            </button>
            <button className="text-white hover:text-green-200">
              <User size={24} />
            </button>
            <button className="md:hidden text-white" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-700 text-white">
          <div className="container mx-auto px-4 py-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-green-600"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">おいしいお茶で心和むひととき</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <img src="/api/placeholder/800/400" alt="Featured Tea" className="w-full h-64 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">今月のおすすめ：特選抹茶</h3>
              <p className="text-gray-600 mb-4">
                厳選された茶葉から作られた特選抹茶。濃厚な味わいと香りをお楽しみください。
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
                詳細を見る
              </button>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">商品一覧</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2">¥{product.price.toLocaleString()}</p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 w-full">
                      カートに追加
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">私たちについて</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <img src="/api/placeholder/800/400" alt="Tea Plantation" className="w-full h-64 object-cover rounded-md mb-4" />
              <p className="text-gray-600 mb-4">
                抹茶カフェは、日本の伝統的なお茶文化を現代に伝える使命を持って設立されました。私たちは最高品質の茶葉を使用し、
                伝統的な製法と現代の技術を融合させて、最高のお茶体験をお届けしています。
              </p>
              <p className="text-gray-600">
                環境に配慮した持続可能な農法で栽培された茶葉のみを使用し、生産者との直接取引を通じて、公平な取引を実現しています。
                お客様に至高のお茶をお楽しみいただくと同時に、日本のお茶文化の素晴らしさを世界中に広めていくことが私たちの願いです。
              </p>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">お問い合わせ</h2>
            <form className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  お名前
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="山田 太郎"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="example@example.com"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                  メッセージ
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="お問い合わせ内容をご記入ください"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                送信する
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">抹茶カフェ</h3>
              <p className="text-sm">最高品質のお茶をお届けします</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">お問い合わせ</h3>
              <p className="text-sm">電話: 03-1234-5678</p>
              <p className="text-sm">メール: info@matchacafe.com</p>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-2">フォローする</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-green-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-green-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44c0-.796-.645-1.44-1.441-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm">© 2023 抹茶カフェ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Website;