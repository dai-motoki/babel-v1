import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, Instagram, Facebook, Twitter } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EAD3] text-[#4A2311]">
      {/* ヘッダー */}
      <header className="bg-[#006400] text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/api/placeholder/50/50" alt="菓匠 鈴乃家 ロゴ" className="w-12 h-12 mr-4" />
            <h1 className="text-2xl font-bold font-serif">菓匠 鈴乃家</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-[#FFB7C5] transition duration-300">ホーム</a>
            <a href="#" className="hover:text-[#FFB7C5] transition duration-300">商品一覧</a>
            <a href="#" className="hover:text-[#FFB7C5] transition duration-300">店舗情報</a>
            <a href="#" className="hover:text-[#FFB7C5] transition duration-300">お問い合わせ</a>
          </nav>
          <div className="flex items-center space-x-4">
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-[#FFB7C5] transition duration-300" />
            <User className="w-6 h-6 cursor-pointer hover:text-[#FFB7C5] transition duration-300" />
            <button onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#006400] text-white py-4 px-6">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="hover:text-[#FFB7C5] transition duration-300">ホーム</a>
            <a href="#" className="hover:text-[#FFB7C5] transition duration-300">商品一覧</a>
            <a href="#" className="hover:text-[#FFB7C5] transition duration-300">店舗情報</a>
            <a href="#" className="hover:text-[#FFB7C5] transition duration-300">お問い合わせ</a>
          </nav>
        </div>
      )}

      {/* メインコンテンツ */}
      <main className="flex-grow container mx-auto py-8 px-6">
        <section className="mb-12">
          <h2 className="text-3xl font-bold font-serif mb-6">季節の和菓子</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <img src={`/api/placeholder/400/300`} alt={`季節の和菓子 ${item}`} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">桜餅</h3>
                  <p className="text-sm mb-4">春の訪れを告げる、桜の葉の香り豊かな一品。</p>
                  <button className="bg-[#006400] text-white py-2 px-4 rounded hover:bg-[#007500] transition duration-300">
                    詳細を見る
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold font-serif mb-6">職人の技</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <img src="/api/placeholder/800/400" alt="職人の技" className="w-full h-64 object-cover rounded-lg mb-6" />
            <p className="text-lg leading-relaxed">
              当店の和菓子は、代々受け継がれてきた伝統の技と、厳選された素材によって作られています。
              四季折々の味わいを大切にし、一つ一つ丁寧に仕上げております。
              和菓子を通じて、日本の文化と季節の移ろいをお楽しみください。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold font-serif mb-6">お知らせ</h2>
          <ul className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <li className="border-b border-gray-200 pb-4">
              <span className="text-[#006400] font-semibold">2023年4月1日</span>
              <p>春の新作和菓子が登場しました。</p>
            </li>
            <li className="border-b border-gray-200 pb-4">
              <span className="text-[#006400] font-semibold">2023年3月15日</span>
              <p>ひな祭り限定商品の販売は終了いたしました。</p>
            </li>
            <li>
              <span className="text-[#006400] font-semibold">2023年3月1日</span>
              <p>新しい包装紙のデザインが決定しました。</p>
            </li>
          </ul>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-[#006400] text-white py-8 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">菓匠 鈴乃家</h3>
            <p>創業100年の伝統と革新が織りなす和菓子の世界</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">お問い合わせ</h3>
            <p>電話: 03-1234-5678</p>
            <p>メール: info@suzunoie.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">フォローする</h3>
            <div className="flex space-x-4">
              <Instagram className="w-6 h-6 cursor-pointer hover:text-[#FFB7C5] transition duration-300" />
              <Facebook className="w-6 h-6 cursor-pointer hover:text-[#FFB7C5] transition duration-300" />
              <Twitter className="w-6 h-6 cursor-pointer hover:text-[#FFB7C5] transition duration-300" />
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-4 border-t border-[#FFB7C5]">
          <p className="text-center">&copy; 2023 菓匠 鈴乃家 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;