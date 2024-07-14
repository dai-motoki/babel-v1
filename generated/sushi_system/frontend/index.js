import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ShoppingCart, User, BarChart2, Package, Clipboard, Calendar } from 'lucide-react';

// コンポーネントのインポート（実際のプロジェクトでは個別にインポートします）
import { DynamicComponent } from './DynamicComponent';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSeason, setCurrentSeason] = useState('春');
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    const season = ['春', '夏', '秋', '冬'][Math.floor((new Date().getMonth() / 12 * 4)) % 4];
    setCurrentSeason(season);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const seasonalClass = {
    '春': 'bg-pink-50 text-pink-900',
    '夏': 'bg-blue-50 text-blue-900',
    '秋': 'bg-orange-50 text-orange-900',
    '冬': 'bg-indigo-50 text-indigo-900'
  }[currentSeason];

  return (
    <Router>
      <div className={`font-sans min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
        <header className={`${seasonalClass} shadow-md`}>
          <nav className="container mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                <Link to="/" className="flex items-center">
                  <motion.img
                    src="/sushi-logo.svg"
                    alt="鮨匠 海乃家"
                    className="h-12 w-12 mr-2"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  />
                  鮨匠 海乃家
                </Link>
              </div>
              <div className="hidden md:flex space-x-4">
                <Link to="/menu" className="hover:text-gray-300 transition-colors">メニュー</Link>
                <Link to="/reservation" className="hover:text-gray-300 transition-colors">予約</Link>
                <Link to="/about" className="hover:text-gray-300 transition-colors">店舗情報</Link>
              </div>
              <div className="flex items-center">
                <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                <Link to="/cart" className="ml-4 relative">
                  <ShoppingCart size={24} />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </Link>
                <button onClick={toggleMenu} className="ml-4 md:hidden">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </nav>
        </header>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white shadow-lg rounded-b-lg"
            >
              <nav className="container mx-auto px-6 py-3">
                <Link to="/menu" className="block py-2 hover:bg-gray-100 transition-colors">メニュー</Link>
                <Link to="/reservation" className="block py-2 hover:bg-gray-100 transition-colors">予約</Link>
                <Link to="/about" className="block py-2 hover:bg-gray-100 transition-colors">店舗情報</Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="container mx-auto px-6 py-8">
          <Switch>
            <Route exact path="/">
              <Home currentSeason={currentSeason} />
            </Route>
            <Route path="/menu">
              <Menu />
            </Route>
            <Route path="/reservation">
              <Reservation />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
          </Switch>
        </main>

        <footer className={`${seasonalClass} mt-12`}>
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <p>&copy; 2023 鮨匠 海乃家 All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

const Home = ({ currentSeason }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">鮨匠 海乃家へようこそ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img src="/seasonal-sushi.jpg" alt="季節の寿司" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">季節の特選寿司</h2>
            <p className="text-gray-600 mb-4">今が旬の{currentSeason}の味覚をお楽しみください。</p>
            <Link to="/menu" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              メニューを見る
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img src="/sushi-chef.jpg" alt="寿司職人" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">熟練の職人技</h2>
            <p className="text-gray-600 mb-4">伝統と革新が融合した極上の寿司をご堪能ください。</p>
            <Link to="/about" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              店舗情報
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">本日のおすすめ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">