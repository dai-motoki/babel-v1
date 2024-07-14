import React from 'react';
import { Coffee, Leaf, ShoppingBag, ArrowRight, Star, Gift } from 'lucide-react';

// ヘッダーコンポーネント
const Header = () => (
  <header className="bg-green-800 text-black p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-3xl font-bold font-japanese">茶道楽</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:text-green-600 transition duration-300 ease-in-out">ホーム</a></li>
          <li><a href="#" className="hover:text-green-600 transition duration-300 ease-in-out">商品一覧</a></li>
          <li><a href="#" className="hover:text-green-600 transition duration-300 ease-in-out">お茶の世界</a></li>
          <li><a href="#" className="hover:text-green-600 transition duration-300 ease-in-out">お問い合わせ</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

// ヒーローセクションコンポーネント
const HeroSection = () => (
  <section className="bg-gradient-to-r from-green-100 to-green-200 py-24">
    <div className="container mx-auto text-center">
      <h2 className="text-5xl font-bold mb-6 text-green-800 font-japanese">一期一会の茶の世界へ</h2>
      <p className="text-2xl mb-10 text-green-700">最高級の茶葉が織りなす、心癒される至福のひととき</p>
      <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-auto">
        茶の世界を探索 <ArrowRight className="ml-2" />
      </button>
    </div>
  </section>
);

// 特徴セクションコンポーネント
const FeatureSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto">
      <h3 className="text-3xl font-bold text-center mb-16 text-green-800">茶道楽の誇り</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <FeatureCard
          icon={<Leaf className="w-16 h-16 text-green-600" />}
          title="最高級の茶葉"
          description="日本全国の名産地から厳選された、最高品質の茶葉のみを使用。一葉一葉に込められた匠の技と自然の恵みをお楽しみください。"
        />
        <FeatureCard
          icon={<Coffee className="w-16 h-16 text-green-600" />}
          title="伝統と革新の融合"
          description="何世紀にも渡り受け継がれてきた伝統的な製法と、最新の技術を融合。時代に合わせた新しい茶の味わいを追求しています。"
        />
        <FeatureCard
          icon={<Gift className="w-16 h-16 text-green-600" />}
          title="贈り物にも最適"
          description="美しい包装と細やかな心遣いで、大切な方への贈り物として最適。特別な瞬間を演出する、心のこもった一品をお届けします。"
        />
      </div>
    </div>
  </section>
);

// 特徴カードコンポーネント
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-green-50 p-8 rounded-xl shadow-lg text-center transition duration-300 ease-in-out transform hover:scale-105">
    <div className="flex justify-center mb-6">{icon}</div>
    <h4 className="text-2xl font-semibold mb-4 text-green-800">{title}</h4>
    <p className="text-green-700">{description}</p>
  </div>
);

// フッターコンポーネント
const Footer = () => (
  <footer className="bg-green-800 text-white py-12">
    <div className="container mx-auto text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h5 className="font-bold mb-4">会社情報</h5>
          <ul>
            <li><a href="#" className="hover:text-green-300">会社概要</a></li>
            <li><a href="#" className="hover:text-green-300">ミッション</a></li>
            <li><a href="#" className="hover:text-green-300">採用情報</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-4">お客様サポート</h5>
          <ul>
            <li><a href="#" className="hover:text-green-300">お問い合わせ</a></li>
            <li><a href="#" className="hover:text-green-300">返品・交換</a></li>
            <li><a href="#" className="hover:text-green-300">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-4">フォローする</h5>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-2xl hover:text-green-300"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-2xl hover:text-green-300"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-2xl hover:text-green-300"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <p>&copy; 2023 茶道楽. All rights reserved.</p>
    </div>
  </footer>
);

// メインのランディングページコンポーネント
const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;