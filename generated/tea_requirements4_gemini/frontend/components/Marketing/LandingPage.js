import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-green-50 min-h-screen font-noto">
      <header className="py-6 px-8 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">
          抹茶カフェ
        </h1>
        <nav>
          <ul className="flex space-x-6 md:space-x-10">
            <li>
              <a
                href="#about"
                className="text-green-800 hover:text-green-600"
              >
                抹茶について
              </a>
            </li>
            <li>
              <a
                href="#menu"
                className="text-green-800 hover:text-green-600"
              >
                メニュー
              </a>
            </li>
            <li>
              <a
                href="#location"
                className="text-green-800 hover:text-green-600"
              >
                店舗情報
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="bg-green-100 py-12 md:py-24 lg:py-32 px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6">
            本場の味を、<br />
            あなたの街で。
          </h2>
          <p className="text-lg md:text-xl text-green-700 mb-8">
            厳選された国産抹茶を使用した、<br />
            本格的な抹茶スイーツとドリンクをお楽しみください。
          </p>
          <a
            href="#menu"
            className="bg-green-800 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300"
          >
            メニューを見る
          </a>
        </div>
      </section>

      <section id="about" className="py-12 md:py-24 lg:py-32 px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-green-800 mb-6 text-center">
            抹茶について
          </h3>
          <p className="text-gray-700 mb-4">
            抹茶は、日本の伝統的な茶道で使用される緑茶の一種です。
            茶葉を蒸してから乾燥させ、石臼で挽いて粉末状にしたものです。
            抹茶は、その鮮やかな緑色と独特の風味で知られています。
          </p>
          <p className="text-gray-700">
            抹茶には、カフェイン、テアニン、抗酸化物質などの栄養素が豊富に含まれています。
            これらの栄養素は、集中力やリラックス効果を高めるのに役立ちます。
            また、抹茶は免疫システムをサポートし、老化を遅らせる効果も期待されています。
          </p>
        </div>
      </section>

      {/* メニューセクション */}
      <section
        id="menu"
        className="bg-green-50 py-12 md:py-24 lg:py-32 px-8 md:px-16 lg:px-24 xl:px-32"
      >
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-green-800 mb-6 text-center">
            メニュー
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* メニューアイテム */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="/matcha-latte.jpg"
                alt="抹茶ラテ"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-bold text-green-800 mb-2">
                  抹茶ラテ
                </h4>
                <p className="text-gray-700 mb-4">
                  濃厚な抹茶の風味と、まろやかなミルクのハーモニーをお楽しみください。
                </p>
                <p className="text-green-800 font-bold">¥500</p>
              </div>
            </div>
            {/* その他のメニューアイテム */}
          </div>
        </div>
      </section>

      {/* 店舗情報セクション */}
      <section
        id="location"
        className="py-12 md:py-24 lg:py-32 px-8 md:px-16 lg:px-24 xl:px-32"
      >
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-green-800 mb-6 text-center">
            店舗情報
          </h3>
          <p className="text-gray-700 mb-4">
            東京都〇〇区〇〇 1-1-1
            <br />
            営業時間: 10:00 - 20:00
            <br />
            定休日: 火曜日
          </p>
          {/* Googleマップ埋め込みなど */}
        </div>
      </section>

      <footer className="bg-green-800 py-6 px-8 md:px-16 lg:px-24 xl:px-32 text-center text-white">
        <p>© 2023 抹茶カフェ</p>
      </footer>
    </div>
  );
};

export default LandingPage;