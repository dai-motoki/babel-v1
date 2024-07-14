import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChevronDown, ShoppingBag, User } from 'lucide-react';

// スタイルのインポート
import './index.css';

// コンポーネントの定義
const Header = () => (
  <header className="bg-green-800 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">菓匠 鈴乃家</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:text-pink-200">ホーム</a></li>
          <li><a href="/products" className="hover:text-pink-200">商品一覧</a></li>
          <li><a href="/about" className="hover:text-pink-200">店舗情報</a></li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <ShoppingBag className="cursor-pointer" />
        <User className="cursor-pointer" />
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-green-900 text-white p-8 mt-8">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">菓匠 鈴乃家</h3>
        <p>創業1892年 伝統の味を守り続ける老舗和菓子店</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">リンク</h3>
        <ul>
          <li><a href="/privacy" className="hover:text-pink-200">プライバシーポリシー</a></li>
          <li><a href="/terms" className="hover:text-pink-200">利用規約</a></li>
          <li><a href="/contact" className="hover:text-pink-200">お問い合わせ</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">フォローする</h3>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-pink-200">Instagram</a>
          <a href="#" className="hover:text-pink-200">Facebook</a>
          <a href="#" className="hover:text-pink-200">Twitter</a>
        </div>
      </div>
    </div>
  </footer>
);

const ProductCard = ({ name, description, price, image }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-green-800 font-bold">{price}円</span>
        <button className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300">
          カートに追加
        </button>
      </div>
    </div>
  </div>
);

const ProductList = () => {
  const products = [
    { id: 1, name: "桜餅", description: "春の香りを閉じ込めた逸品", price: 250, image: "/images/sakuramochi.jpg" },
    { id: 2, name: "柏餅", description: "端午の節句の定番和菓子", price: 200, image: "/images/kashiwamochi.jpg" },
    { id: 3, name: "水羊羹", description: "夏の涼を感じる一品", price: 300, image: "/images/mizuyoukan.jpg" },
    { id: 4, name: "栗きんとん", description: "秋の味覚をたっぷりと", price: 350, image: "/images/kurikinton.jpg" },
    { id: 5, name: "雪だるま", description: "冬の風物詩をモチーフに", price: 400, image: "/images/yukidaruma.jpg" },
    { id: 6, name: "抹茶大福", description: "濃厚な抹茶の香り", price: 280, image: "/images/matchadaifuku.jpg" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-800">季節の和菓子</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

const Home = () => (
  <div className="bg-cream-100">
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-green-800">菓匠 鈴乃家へようこそ</h2>
      <p className="text-xl text-center mb-12">伝統の技と新しい味の融合を追求する老舗和菓子店</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-green-800">今月のおすすめ</h3>
          <ProductCard
            name="季節の詰め合わせ"
            description="四季折々の味わいを一箱に"
            price={2000}
            image="/images/seasonal-assortment.jpg"
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-green-800">店舗情報</h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="mb-2"><strong>住所:</strong> 〒123-4567 東京都千代田区和菓子町1-2-3</p>
            <p className="mb-2"><strong>営業時間:</strong> 10:00 - 19:00 (水曜定休)</p>
            <p className="mb-2"><strong>電話:</strong> 03-1234-5678</p>
            <p><strong>アクセス:</strong> 和菓子駅から徒歩5分</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const App = () => (
  <Router>
    <div className="flex flex-col min-h-screen bg-cream-100">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products" component={ProductList} />
          {/* 他のルートをここに追加 */}
        </Switch>
      </main>
      <Footer />
    </div>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);