import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'products', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="font-sans bg-green-50">
      <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 shadow-md z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-800">抹茶カフェ</div>
          <div className="hidden md:flex space-x-6">
            {['home', 'about', 'products', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-lg ${
                  activeSection === item ? 'text-green-600 font-semibold' : 'text-gray-600'
                } hover:text-green-500 transition duration-300`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden bg-white">
            {['home', 'about', 'products', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-green-100"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        <section id="home" className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('/api/placeholder/1200/800')"}}>
          <div className="text-center text-white bg-black bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">抹茶の世界へようこそ</h1>
            <p className="text-xl md:text-2xl mb-8">伝統と革新が織りなす、至福の一杯</p>
            <button onClick={() => scrollToSection('products')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 flex items-center justify-center mx-auto">
              商品を見る
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </section>

        <section id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-8">私たちについて</h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img src="/api/placeholder/600/400" alt="抹茶製造工程" className="rounded-lg shadow-lg" />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <p className="text-lg text-gray-700 mb-4">
                  私たちは、何世紀にもわたる日本の茶道の伝統を受け継ぎながら、現代的なアプローチで抹茶を提供しています。最高品質の茶葉を使用し、伝統的な製法と最新の技術を融合させることで、唯一無二の抹茶体験をお届けします。
                </p>
                <p className="text-lg text-gray-700">
                  環境に配慮した持続可能な農法、職人技の継承、そして革新的な製品開発。これらすべてが、私たちの抹茶づくりの核心です。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="py-16 bg-green-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-8">商品ラインナップ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "伝統抹茶", description: "濃厚な風味と深い緑色が特徴の本格抹茶" },
                { name: "抹茶ラテ", description: "まろやかなミルクと抹茶のハーモニー" },
                { name: "抹茶スイーツ", description: "抹茶を使用した和洋折衷のデザート" }
              ].map((product, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl">
                  <img src={`/api/placeholder/400/300`} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-green-700 mb-2">{product.name}</h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-8">お問い合わせ</h2>
            <form className="max-w-lg mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">お名前</label>
                <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">メールアドレス</label>
                <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">メッセージ</label>
                <textarea id="message" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required></textarea>
              </div>
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                送信する
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">抹茶カフェ</div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-300 transition duration-300">プライバシーポリシー</a>
              <a href="#" className="hover:text-green-300 transition duration-300">利用規約</a>
              <a href="#" className="hover:text-green-300 transition duration-300">サイトマップ</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            &copy; 2023 抹茶カフェ All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;