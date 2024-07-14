import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/tailwind.css';
import { IntlProvider } from 'react-intl';
import jaMessages from './locales/ja.json';
import enMessages from './locales/en.json';

const messages = {
  ja: jaMessages,
  en: enMessages,
};

const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider messages={messages[language]} locale={language} defaultLocale="ja">
      <Router>
        <App />
      </Router>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';
import { Sun, Moon, ShoppingCart, User, Menu } from 'lucide-react';

// コンポーネントのインポート
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <div className={`min-h-screen bg-green-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <header className="bg-green-600 dark:bg-green-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            {intl.formatMessage({ id: 'app.title' })}
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-green-200 transition-colors">
              {intl.formatMessage({ id: 'nav.home' })}
            </Link>
            <Link to="/products" className="hover:text-green-200 transition-colors">
              {intl.formatMessage({ id: 'nav.products' })}
            </Link>
            <Link to="/cart" className="hover:text-green-200 transition-colors">
              <ShoppingCart className="inline-block mr-1" size={20} />
              {intl.formatMessage({ id: 'nav.cart' })} ({cartItems.length})
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-green-700 transition-colors">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 rounded-full hover:bg-green-700 transition-colors">
              <User size={20} />
            </button>
            <button className="md:hidden p-2 rounded-full hover:bg-green-700 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <motion.nav
        className={`md:hidden bg-green-500 dark:bg-green-700 ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto py-2">
          <Link to="/" className="block py-2 px-4 text-white hover:bg-green-600 dark:hover:bg-green-800">
            {intl.formatMessage({ id: 'nav.home' })}
          </Link>
          <Link to="/products" className="block py-2 px-4 text-white hover:bg-green-600 dark:hover:bg-green-800">
            {intl.formatMessage({ id: 'nav.products' })}
          </Link>
          <Link to="/cart" className="block py-2 px-4 text-white hover:bg-green-600 dark:hover:bg-green-800">
            <ShoppingCart className="inline-block mr-1" size={20} />
            {intl.formatMessage({ id: 'nav.cart' })} ({cartItems.length})
          </Link>
        </div>
      </motion.nav>

      <main className="container mx-auto mt-8 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList addToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        </Routes>
      </main>

      <footer className="bg-green-600 dark:bg-green-800 text-white mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">{intl.formatMessage({ id: 'footer.about' })}</h3>
              <p>{intl.formatMessage({ id: 'footer.description' })}</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">{intl.formatMessage({ id: 'footer.contact' })}</h3>
              <p>{intl.formatMessage({ id: 'footer.address' })}</p>
              <p>{intl.formatMessage({ id: 'footer.phone' })}</p>
              <p>{intl.formatMessage({ id: 'footer.email' })}</p>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold mb-2">{intl.formatMessage({ id: 'footer.follow' })}</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-200 transition-colors">Twitter</a>
                <a href="#" className="hover:text-green-200 transition-colors">Facebook</a>
                <a href="#" className="hover:text-green-200 transition-colors">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 {intl.formatMessage({ id: 'app.title' })}. {intl.formatMessage({ id: 'footer.rights' })}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Home = () => {
  const intl = useIntl();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">{intl.formatMessage({ id: 'home.welcome' })}</h1>
      <p className="text-xl mb-8">{intl.formatMessage({ id: 'home.description' })}</p>
      <Link to="/products" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
        {intl.formatMessage({ id: 'home.shopNow' })}
      </Link>
    </div>
  );
};

export default App;