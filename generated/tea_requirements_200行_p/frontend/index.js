import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// App.js コンポーネント
import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';

// コンポーネントのインポート（実際のプロジェクトでは個別にインポートします）
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 font-sans">
      {/* ヘッダー */}
      <header className="bg-green-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-wider">抹茶カフェ</Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-green-200 transition duration-300">ホーム</Link>
            <Link to="/products" className="hover:text-green-200 transition duration-300">商品一覧</Link>
            <Link to="/about" className="hover:text-green-200 transition duration-300">会社概要</Link>
            <Link to="/contact" className="hover:text-green-200 transition duration-300">お問い合わせ</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="hover:text-green-200 transition duration-300">
              <ShoppingCart size={24} />
            </Link>
            <Link to="/account" className="hover:text-green-200 transition duration-300">
              <User size={24} />
            </Link>
            <button onClick={toggleMenu} className="md:hidden focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden bg-green-700 py-2">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <Link to="/" className="text-white hover:text-green-200 transition duration-300" onClick={toggleMenu}>ホーム</Link>
              <Link to="/products" className="text-white hover:text-green-200 transition duration-300" onClick={toggleMenu}>商品一覧</Link>
              <Link to="/about" className="text-white hover:text-green-200 transition duration-300" onClick={toggleMenu}>会社概要</Link>
              <Link to="/contact" className="text-white hover:text-green-200 transition duration-300" onClick={toggleMenu}>お問い合わせ</Link>
            </div>
          </div>
        )}
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={ProductList} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </main>

      {/* フッター */}
      <footer className="bg-green-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">抹茶カフェ</h3>
              <p className="text-sm">最高品質の抹茶製品をお届けします。</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">リンク</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-green-200 transition duration-300">会社概要</Link></li>
                <li><Link to="/contact" className="hover:text-green-200 transition duration-300">お問い合わせ</Link></li>
                <li><Link to="/terms" className="hover:text-green-200 transition duration-300">利用規約</Link></li>
                <li><Link to="/privacy" className="hover:text-green-200 transition duration-300">プライバシーポリシー</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">フォローする</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-200 transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-green-200 transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-green-200 transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-green-700 pt-8 text-sm text-center">
            © 2023 抹茶カフェ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// ホームページコンポーネント（例）
const Home = () => {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">抹茶の世界へようこそ</h1>
        <p className="text-xl text-gray-600">最高品質の抹茶製品をお届けします</p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="/api/placeholder/400/300" alt="抹茶ラテ" className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">抹茶ラテ</h3>
            <p className="text-gray-600">濃厚な抹茶の風味と滑らかな口当たり</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="/api/placeholder/400/300" alt="抹茶スイーツ" className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">抹茶スイーツ</h3>
            <p className="text-gray-600">伝統と革新が融合した和洋折衷のデザート</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="/api/placeholder/400/300" alt="抹茶茶碗" className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">茶道用具</h3>
            <p className="text-gray-600">伝統工芸品の茶碗や茶筅をご用意</p>
          </div>
        </div>
      </section>
      <section className="bg-green-100 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-center">抹茶の魅力</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">