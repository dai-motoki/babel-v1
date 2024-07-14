import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ShoppingCart, User, Search } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="font-sans text-gray-800">
      {/* ヘッダー */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/api/placeholder/50/50" alt="抹茶カフェ ロゴ" className="h-12 w-12 mr-2" />
            <h1 className="text-2xl font-bold text-green-800">抹茶カフェ</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-green-700 hover:text-green-500 transition-colors duration-300">ホーム</a>
            <a href="#" className="text-green-700 hover:text-green-500 transition-colors duration-300">メニュー</a>
            <a href="#" className="text-green-700 hover:text-green-500 transition-colors duration-300">店舗情報</a>
            <a href="#" className="text-green-700 hover:text-green-500 transition-colors duration-300">お問い合わせ</a>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Search className="text-green-700 hover:text-green-500 cursor-pointer" />
            <ShoppingCart className="text-green-700 hover:text-green-500 cursor-pointer" />
            <User className="text-green-700 hover:text-green-500 cursor-pointer" />
          </div>
          <button onClick={toggleMenu} className="md:hidden text-green-700">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-end">
              <button onClick={toggleMenu} className="text-green-700">
                <X size={24} />
              </button>
            </div>
            <nav className="mt-8 space-y-6">
              <a href="#" className="block text-xl text-green-700 hover:text-green-500 transition-colors duration-300">ホーム</a>
              <a href="#" className="block text-xl text-green-700 hover:text-green-500 transition-colors duration-300">メニュー</a>
              <a href="#" className="block text-xl text-green-700 hover:text-green-500 transition-colors duration-300">店舗情報</a>
              <a href="#" className="block text-xl text-green-700 hover:text-green-500 transition-colors duration-300">お問い合わせ</a>
            </nav>
          </div>
        </div>
      )}

      {/* メインコンテンツ */}
      <main>
        {/* ヒーローセクション */}
        <section className="relative h-screen flex items-center justify-center bg-green-50">
          <img src="/api/placeholder/1920/1080" alt="抹茶の背景" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-center text-white">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">至高の抹茶体験</h2>
            <p className="text-xl md:text-2xl mb-8">伝統と革新が織りなす、新しい抹茶の世界へ</p>
            <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
              メニューを見る
            </button>
          </div>
        </section>

        {/* 特徴セクション */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 text-green-800">抹茶カフェの特徴</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <img src="/api/placeholder/48/48" alt="高品質" className="h-12 w-12" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-green-700">最高級の抹茶</h4>
                <p className="text-gray-600">厳選された茶葉から作られた、最高品質の抹茶をご提供します。</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <img src="/api/placeholder/48/48" alt="職人技" className="h-12 w-12" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-green-700">熟練の技術</h4>
                <p className="text-gray-600">経験豊富な職人が、一杯一杯丁寧に抹茶を点てます。</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <img src="/api/placeholder/48/48" alt="和モダン" className="h-12 w-12" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-green-700">和モダンな空間</h4>
                <p className="text-gray-600">伝統的な要素と現代的なデザインが融合した、居心地の良い空間です。</p>
              </div>
            </div>
          </div>
        </section>

        {/* おすすめメニュー */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 text-green-800">人気メニュー</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={`/api/placeholder/400/300`} alt={`メニュー${item}`} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-2 text-green-700">抹茶ラテ</h4>
                    <p className="text-gray-600 mb-4">濃厚な抹茶と滑らかなミルクのハーモニーをお楽しみください。</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-green-600">¥580</span>
                      <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center">
                        注文する
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* お知らせ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 text-green-800">お知らせ</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-500 mr-4">2023.06.{item}</span>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">お知らせ</span>
                  </div>
                  <h4 className="text-lg font-semibold text-green-700 mb-2">夏季限定メニューが登場しました！</h4>
                  <p className="text-gray-600">清涼感あふれる抹茶スイーツや、冷たい抹茶ドリンクなど、暑い季節にぴったりの商品をご用意しました。</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">抹茶カフェ</h5>
              <p className="text-sm">最高級の抹茶と和モダンな空間で、至福のひとときをお過ごしください。</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">リンク</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-300 transition-colors duration-300">ホーム</a></li>
                <li><a href="#" className="hover:text-green-300 transition-colors duration-300">メニュー</a></li>
                <li><a href="#" className="hover:text-green-300 transition-colors duration-300">店舗情報</a></li>
                <li><a href="#" className="hover:text-green-300 transition-colors duration-300">お問い合わせ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">営業時間</h5>
              <p className="text-sm">平日: 10:00 - 21:00</p>
              <p className="text-sm">土日祝: 9:00 - 22:00</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">お問い合わせ</h5>
              <p className="text-sm">電話: 03-1234-5678</p>
              <p className="text-sm">メール: info@matchacafe.jp</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-700 text-center">
            <p className="text-sm">&copy; 2023 抹茶カフェ All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;