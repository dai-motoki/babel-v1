import React from 'react';
import { Home, ShoppingBag, Info, Phone, Menu, Leaf, Cup, Star } from 'lucide-react';

const Header = () => (
  <header className="bg-green-100 text-green-800 p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <Leaf className="h-8 w-8 text-green-600 mr-2" />
        <h1 className="text-3xl font-bold font-japanese">茶道楽</h1>
      </div>
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="flex items-center hover:text-green-600 transition-colors duration-200">
          <Home className="h-5 w-5 mr-1" />
          <span>ホーム</span>
        </a>
        <a href="#" className="flex items-center hover:text-green-600 transition-colors duration-200">
          <ShoppingBag className="h-5 w-5 mr-1" />
          <span>商品一覧</span>
        </a>
        <a href="#" className="flex items-center hover:text-green-600 transition-colors duration-200">
          <Info className="h-5 w-5 mr-1" />
          <span>お知らせ</span>
        </a>
        <a href="#" className="flex items-center hover:text-green-600 transition-colors duration-200">
          <Phone className="h-5 w-5 mr-1" />
          <span>お問い合わせ</span>
        </a>
      </nav>
      <button className="md:hidden bg-green-600 text-white rounded-full p-2 hover:bg-green-700 transition-colors duration-200">
        <Menu className="h-6 w-6" />
      </button>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-green-100 text-green-800 p-8 mt-16">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4">茶道楽について</h3>
        <p className="text-sm">最高級の日本茶を全国にお届けします。伝統と革新が織りなす、至高のお茶体験をご堪能ください。</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">お問い合わせ</h3>
        <p className="text-sm">電話: 0120-XXX-XXX</p>
        <p className="text-sm">メール: info@chadouraku.jp</p>
        <p className="text-sm">営業時間: 平日 9:00-18:00</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">フォローする</h3>
        <div className="flex space-x-4">
          <a href="#" className="text-green-600 hover:text-green-800">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="#" className="text-green-600 hover:text-green-800">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </a>
          <a href="#" className="text-green-600 hover:text-green-800">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
          </a>
        </div>
      </div>
    </div>
    <div className="border-t border-green-200 mt-8 pt-8 text-center">
      <p>&copy; 2023 茶道楽. All rights reserved.</p>
    </div>
  </footer>
);

const HeroSection = () => (
  <section className="bg-gradient-to-r from-green-50 to-green-100 py-24">
    <div className="container mx-auto text-center">
      <h2 className="text-5xl font-bold mb-6 text-green-800 font-japanese">日本の至高の茶葉、あなたの元へ</h2>
      <p className="text-xl mb-10 text-green-700">伝統と革新が織りなす、唯一無二のお茶体験をお届けします</p>
      <button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
        <ShoppingBag className="inline-block mr-2 h-5 w-5" />
        商品を探す
      </button>
    </div>
  </section>
);

const FeaturedProducts = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-green-800 font-japanese">厳選おすすめ商品</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { name: "極上玉露", description: "最高級の茶葉を使用した、まろやかで深い味わいの逸品", price: "5,000" },
          { name: "有機煎茶", description: "自然の恵みをそのままに、爽やかな香りと旨みが特徴", price: "3,500" },
          { name: "特選抹茶", description: "茶道にも使用される、濃厚で風味豊かな一品", price: "4,500" }
        ].map((item, index) => (
          <div key={index} className="bg-green-50 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
            <img src={`/images/tea-${index + 1}.jpg`} alt={item.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-2xl mb-3 text-green-800">{item.name}</h3>
              <p className="text-green-700 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">¥{item.price}</span>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors duration-200">
                  カートに追加
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TestimonialSection = () => (
  <section className="py-24 bg-green-50">
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-green-800 font-japanese">お客様の声</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { name: "田中さくら", comment: "毎日の一杯が特別なひとときに。香りと味わいに癒されています。", rating: 5 },
          { name: "佐藤健太", comment: "贈り物として購入しましたが、先方にとても喜んでいただけました。", rating: 5 },
          { name: "鈴木美咲", comment: "品質の高さに感動。日本茶の奥深さを再発見できました。", rating: 4 }
        ].map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-green-700 mb-4">"{testimonial.comment}"</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-green-800">{testimonial.name}</span>
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Website = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProducts />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Website;