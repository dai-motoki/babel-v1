import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChevronDown, ShoppingBag, User, Menu, X } from 'lucide-react';

// スタイルのインポート
import './index.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [cart, setCart] = React.useState([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-cream-100 text-brown-800 font-sans">
        {/* ヘッダー */}
        <header className="bg-green-800 text-white py-4 px-6 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold font-serif">菓匠 鈴乃家</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="hover:text-pink-300 transition duration-300">ホーム</a>
              <a href="/products" className="hover:text-pink-300 transition duration-300">商品一覧</a>
              <a href="/about" className="hover:text-pink-300 transition duration-300">私たちについて</a>
              <a href="/contact" className="hover:text-pink-300 transition duration-300">お問い合わせ</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button onClick={toggleCart} className="relative">
                <ShoppingBag className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </button>
              <User className="w-6 h-6" />
              <button onClick={toggleMenu} className="md:hidden">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </header>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden bg-green-700 text-white py-4 px-6">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="hover:text-pink-300 transition duration-300">ホーム</a>
              <a href="/products" className="hover:text-pink-300 transition duration-300">商品一覧</a>
              <a href="/about" className="hover:text-pink-300 transition duration-300">私たちについて</a>
              <a href="/contact" className="hover:text-pink-300 transition duration-300">お問い合わせ</a>
            </nav>
          </div>
        )}

        {/* メインコンテンツ */}
        <main className="container mx-auto py-8 px-4">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/products" component={ProductList} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </main>

        {/* フッター */}
        <footer className="bg-green-800 text-white py-8 px-6">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">菓匠 鈴乃家</h3>
              <p>創業100年の伝統と革新が織りなす和菓子の世界</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">リンク</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:text-pink-300 transition duration-300">プライバシーポリシー</a></li>
                <li><a href="/terms" className="hover:text-pink-300 transition duration-300">利用規約</a></li>
                <li><a href="/sitemap" className="hover:text-pink-300 transition duration-300">サイトマップ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">お問い合わせ</h3>
              <p>〒123-4567 東京都千代田区和菓子町1-2-3</p>
              <p>電話: 03-1234-5678</p>
              <p>メール: info@suzunoya.com</p>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-green-700">
            <p>&copy; 2023 菓匠 鈴乃家 All rights reserved.</p>
          </div>
        </footer>

        {/* カートサイドバー */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-lg p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">買い物かご</h2>
                <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              {cart.length === 0 ? (
                <p>カートは空です。</p>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">{item.price}円</p>
                      </div>
                      <button className="text-red-500 hover:text-red-700">削除</button>
                    </div>
                  ))}
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <span>小計:</span>
                      <span>{cart.reduce((total, item) => total + item.price, 0)}円</span>
                    </div>
                    <button className="w-full bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
                      レジへ進む
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

const Home = () => (
  <div className="text-center">
    <h2 className="text-3xl font-semibold mb-6">和菓子の世界へようこそ</h2>
    <p className="mb-8">季節の味わいと伝統の技が織りなす、至高の和菓子をお楽しみください。</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">季節の和菓子</h3>
        <p>四季折々の風情を表現した和菓子をご用意しております。</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">贈り物に最適</h3>
        <p>大切な方への贈り物に、心を込めた和菓子はいかがでしょうか。</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">職人の技</h3>
        <p>熟練の職人が一つ一つ丁寧に仕上げた逸品をお届けします。</p>
      </div>
    </div>
  </div>
);

const ProductList = () => {
  const products = [
    { id: 1, name: "桜餅", price: 250, image: "/images/sakuramochi.jpg" },
    { id: 2, name: "柏餅", price: 230, image: "/images/kashiwamochi.jpg" },
    { id: 3, name: "水羊羹", price: 300, image: "/images/mizuyoukan.jpg" },
    { id: 4, name: "栗きんとん", price: 280, image: "/images/kurikinton.jpg" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">商品一覧</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.price}円</p>
              <button className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
                カートに追加
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const About = () => (
  <div>
    <h2 className="text-3xl font-semibold mb-6">私たちについて</h2>
    <p className="mb-4">菓匠 鈴乃家は、創業100年の歴史を持つ老舗和菓子店です。</p>
    <p className="mb-4">伝統の技と新しい発想を融合させ、季節の味わいを大切にした和菓子づくりに励んでいます。</p>
    <p>私たちの使命は、日本の和菓子文化を守り、次世代に伝えていくことです。</p>
  </div>
);

const Contact = () => (
  <div>
    <h2 className="text-3xl font-semibold mb-6">お問い合わせ</h2>
    <form className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">お名前</label>
        <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded" required />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">メールアドレス</label>
        <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded" required />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block mb-2">メッセージ</label>
        <textarea id="message" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded" required></textarea>
      </div>
      <button type="submit" className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
        送信
      </button>
    </form>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));