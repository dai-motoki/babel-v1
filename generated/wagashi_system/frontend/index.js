import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

// ヘッダーコンポーネント
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-green-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold font-serif">菓匠 鈴乃家</h1>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-pink-200 transition duration-300">ホーム</Link>
          <Link to="/products" className="hover:text-pink-200 transition duration-300">商品一覧</Link>
          <Link to="/about" className="hover:text-pink-200 transition duration-300">店舗情報</Link>
          <Link to="/contact" className="hover:text-pink-200 transition duration-300">お問い合わせ</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="hover:text-pink-200 transition duration-300">
            <ShoppingCart size={24} />
          </Link>
          <Link to="/account" className="hover:text-pink-200 transition duration-300">
            <User size={24} />
          </Link>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <nav className="flex flex-col space-y-2">
            <Link to="/" className="hover:text-pink-200 transition duration-300">ホーム</Link>
            <Link to="/products" className="hover:text-pink-200 transition duration-300">商品一覧</Link>
            <Link to="/about" className="hover:text-pink-200 transition duration-300">店舗情報</Link>
            <Link to="/contact" className="hover:text-pink-200 transition duration-300">お問い合わせ</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

// フッターコンポーネント
const Footer = () => {
  return (
    <footer className="bg-green-800 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">菓匠 鈴乃家</h3>
          <p>創業100年の伝統と革新が織りなす和菓子の世界</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">リンク</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-pink-200 transition duration-300">会社概要</Link></li>
            <li><Link to="/privacy" className="hover:text-pink-200 transition duration-300">プライバシーポリシー</Link></li>
            <li><Link to="/terms" className="hover:text-pink-200 transition duration-300">利用規約</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">お問い合わせ</h3>
          <p>〒123-4567 東京都千代田区和菓子町1-2-3</p>
          <p>TEL: 03-1234-5678</p>
          <p>Email: info@suzunoya.com</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2023 菓匠 鈴乃家 All rights reserved.</p>
      </div>
    </footer>
  );
};

// 商品カードコンポーネント
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-green-800 font-bold">{product.price}円</p>
        <button className="mt-4 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
          カートに追加
        </button>
      </div>
    </div>
  );
};

// 商品一覧ページコンポーネント
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 商品データのフェッチを模倣
    setTimeout(() => {
      setProducts([
        { id: 1, name: "桜餅", description: "春の香りいっぱいの桜餅", price: 250, image: "/api/placeholder/400/300" },
        { id: 2, name: "柏餅", description: "端午の節句に欠かせない柏餅", price: 300, image: "/api/placeholder/400/300" },
        { id: 3, name: "水羊羹", description: "夏にぴったりの涼やかな水羊羹", price: 350, image: "/api/placeholder/400/300" },
        { id: 4, name: "栗きんとん", description: "秋の味覚たっぷりの栗きんとん", price: 400, image: "/api/placeholder/400/300" },
        { id: 5, name: "雪平", description: "冬の情景を表現した上品な雪平", price: 450, image: "/api/placeholder/400/300" },
        { id: 6, name: "抹茶大福", description: "濃厚な抹茶の風味が楽しめる大福", price: 300, image: "/api/placeholder/400/300" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="text-center py-8">読み込み中...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold text-green-800 mb-8">商品一覧</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// メインアプリケーションコンポーネント
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-yellow-50">
        <Header />
        <main className="flex-grow">
          <Switch>
            <Route exact path="/">
              <div className="container mx-auto py-8">
                <h2 className="text-4xl font-semibold text-green-800 mb-8">和菓子の世界へようこそ</h2>
                <p className="text-lg mb-4">菓匠 鈴乃家は、100年の伝統と革新を重ねて、最高級の和菓子をお届けしています。</p>
                <Link to="/products" className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300">
                  商品を見る
                </Link>
              </div>
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/about">
              <div className="container mx-auto py-8">
                <h2 className="text-3xl font-semibold text-green-800 mb-8">店舗情報</h2>
                <p className="text-lg mb-4">菓匠 鈴乃家は、1923年の創業以来、伝統的な和菓子作りの技術を守りながら、新しい味と形に挑戦し続けています。</p>
              </div>
            </Route>
            <Route path="/contact">
              <div className="container mx-auto py-8">
                <h2 className="text-3xl font-semibold text-green-800 mb-8">お問い合わせ</h2>
                <p className="text-lg mb-4">ご質問やご意見がございましたら、お気軽にお問い合わせください。</p>
              </div>
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));