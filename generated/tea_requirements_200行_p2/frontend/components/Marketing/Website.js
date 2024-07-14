import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Website = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const navigationItems = [
    { id: 'home', label: 'ホーム' },
    { id: 'products', label: '商品' },
    { id: 'about', label: '会社概要' },
    { id: 'contact', label: 'お問い合わせ' },
  ];

  const featuredProducts = [
    { id: 1, name: '抹茶パウダー', price: 1500, image: '/api/placeholder/300/300' },
    { id: 2, name: '抹茶ラテ', price: 500, image: '/api/placeholder/300/300' },
    { id: 3, name: '抹茶スイーツセット', price: 2500, image: '/api/placeholder/300/300' },
  ];

  const salesData = [
    { name: '1月', sales: 4000 },
    { name: '2月', sales: 3000 },
    { name: '3月', sales: 5000 },
    { name: '4月', sales: 4500 },
    { name: '5月', sales: 6000 },
    { name: '6月', sales: 5500 },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderHeader = () => (
    <header className="bg-green-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/api/placeholder/50/50" alt="Logo" className="mr-4" />
          <h1 className="text-2xl font-bold">抹茶カフェ</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="hover:text-green-200 transition duration-300"
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6 cursor-pointer" />
          <ShoppingCart className="w-6 h-6 cursor-pointer" />
          <User className="w-6 h-6 cursor-pointer" />
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );

  const renderMobileMenu = () => (
    <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-green-700 text-white`}>
      <nav className="container mx-auto px-4 py-2">
        {navigationItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block py-2 hover:bg-green-600 transition duration-300"
            onClick={() => {
              setActiveTab(item.id);
              setIsMenuOpen(false);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );

  const renderHeroSection = () => (
    <section className="bg-green-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-green-800">抹茶の世界へようこそ</h2>
        <p className="text-xl mb-8 text-gray-700">最高品質の抹茶製品をお届けします</p>
        <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition duration-300">
          商品を見る
        </button>
      </div>
    </section>
  );

  const renderFeaturedProducts = () => (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8 text-center text-green-800">人気商品</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                <p className="text-gray-600">¥{product.price.toLocaleString()}</p>
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
                  カートに追加
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderAboutSection = () => (
    <section className="bg-green-50 py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8 text-center text-green-800">会社概要</h3>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src="/api/placeholder/600/400" alt="Tea Ceremony" className="rounded-lg shadow-md" />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <p className="text-gray-700 mb-4">
              私たちは、日本の伝統的な抹茶文化を現代に伝える使命を持っています。最高品質の抹茶を提供し、
              お客様に本物の抹茶体験をお届けすることを目指しています。
            </p>
            <p className="text-gray-700 mb-4">
              創業以来、茶畑の選定から製造プロセス、そして最終製品に至るまで、品質にこだわり続けてきました。
              私たちの抹茶は、伝統的な手法と現代の技術を融合させることで、最高の味と香りを実現しています。
            </p>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300">
              詳しく見る
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderSalesChart = () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8 text-center text-green-800">売上トレンド</h3>
        <div className="w-full h-80">
          <ResponsiveContainer>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#4CAF50" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );

  const renderFooter = () => (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">抹茶カフェ</h4>
            <p>最高品質の抹茶製品をお届けします</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">リンク</h4>
            <ul>
              {navigationItems.map((item) => (
                <li key={item.id} className="mb-2">
                  <a href={`#${item.id}`} className="hover:text-green-200 transition duration-300">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">お問い合わせ</h4>
            <p>〒123-4567</p>
            <p>東京都抹茶区緑茶町1-2-3</p>
            <p>電話: 03-1234-5678</p>
            <p>メール: info@matchacafe.com</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 抹茶カフェ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="font-sans">
      {renderHeader()}
      {renderMobileMenu()}
      {activeTab === 'home' && (
        <>
          {renderHeroSection()}
          {renderFeaturedProducts()}
          {renderAboutSection()}
          {renderSalesChart()}
        </>
      )}
      {renderFooter()}
    </div>
  );
};

export default Website;