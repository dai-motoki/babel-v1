import React from 'react';

const Website = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-noto">
      <header className="bg-green-700 py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <a href="/" className="text-white font-bold text-xl">
            抹茶カフェ
          </a>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#about" className="text-white hover:text-green-300">
                  抹茶について
                </a>
              </li>
              <li>
                <a href="#menu" className="text-white hover:text-green-300">
                  メニュー
                </a>
              </li>
              <li>
                <a href="#shop" className="text-white hover:text-green-300">
                  店舗情報
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section id="hero" className="bg-green-500 py-16 rounded-lg shadow-lg">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              至福の一杯をあなたに
            </h1>
            <p className="text-lg mb-8">
              厳選された抹茶を使用した、こだわりのドリンクやスイーツをお楽しみください。
            </p>
            <a
              href="#menu"
              className="bg-white text-green-700 font-bold py-2 px-4 rounded-full hover:bg-green-100"
            >
              メニューを見る
            </a>
          </div>
        </section>

        <section id="about" className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              抹茶について
            </h2>
            <p className="text-gray-700 mb-8">
              抹茶は、緑茶の一種で、茶葉を蒸して乾燥させた後、石臼で挽いて粉末状にしたものです。
              鮮やかな緑色と、渋みと旨みのバランスがとれた風味が特徴です。
            </p>
          </div>
        </section>

        <section id="menu" className="py-16 bg-gray-100 rounded-lg shadow-lg">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              メニュー
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 商品カードコンポーネントをここに配置 */}
            </div>
          </div>
        </section>

        <section id="shop" className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              店舗情報
            </h2>
            <p className="text-gray-700 mb-8">
              {/* 店舗情報 */}
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-green-700 py-4 text-center text-white">
        <p>
          &copy; {new Date().getFullYear()} 抹茶カフェ. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Website;
