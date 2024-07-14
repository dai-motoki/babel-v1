import React, { useState, useEffect } from 'react';
import { Zap, Settings, BarChart2, ShoppingBag, Calendar, Clipboard, Users, DollarSign, BookOpen } from 'lucide-react';

const seasonalProducts = {
  spring: [
    { id: 1, name: '桜餅', description: '桜の葉の香りが楽しめる春の定番和菓子', price: 250 },
    { id: 2, name: '柏餅', description: '柏の葉で包まれた初夏の風物詩', price: 300 },
    { id: 3, name: '花見団子', description: '三色の団子で春を表現', price: 350 },
  ],
  summer: [
    { id: 4, name: '水羊羹', description: '涼しげな見た目と味わいの夏の和菓子', price: 400 },
    { id: 5, name: '葛切り', description: '喉越しの良い夏の定番デザート', price: 450 },
    { id: 6, name: '金魚すくい', description: '金魚をモチーフにした可愛らしい和菓子', price: 500 },
  ],
  autumn: [
    { id: 7, name: '栗きんとん', description: '栗の風味豊かな秋の代表的和菓子', price: 550 },
    { id: 8, name: '月見団子', description: 'お月見に欠かせない丸い団子', price: 300 },
    { id: 9, name: '紅葉饅頭', description: '紅葉の形をした季節感溢れる和菓子', price: 400 },
  ],
  winter: [
    { id: 10, name: '雪うさぎ', description: '可愛らしい雪うさぎの形の冬の和菓子', price: 450 },
    { id: 11, name: '福梅', description: '新年を祝う縁起の良い和菓子', price: 500 },
    { id: 12, name: '焼き芋大福', description: '冬の味覚を楽しめる人気の和菓子', price: 350 },
  ],
};

const DynamicComponent = ({ componentName }) => {
  const [currentSeason, setCurrentSeason] = useState('spring');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(seasonalProducts[currentSeason]);
  }, [currentSeason]);

  const changeSeason = (season) => {
    setCurrentSeason(season);
  };

  const renderSeasonalProducts = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">季節の和菓子</h2>
      <div className="flex space-x-4 mb-6">
        {['spring', 'summer', 'autumn', 'winter'].map((season) => (
          <button
            key={season}
            onClick={() => changeSeason(season)}
            className={`px-4 py-2 rounded-full ${
              currentSeason === season
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
            } hover:bg-green-500 hover:text-white transition duration-300`}
          >
            {season.charAt(0).toUpperCase() + season.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-green-600 font-bold">¥{product.price}</span>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
                購入
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInventoryManagement = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">在庫管理</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">原材料在庫</h3>
          <p className="text-gray-600">現在の在庫状況を確認できます。</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
            詳細を見る
          </button>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">製品在庫</h3>
          <p className="text-gray-600">完成品の在庫状況を管理します。</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
            在庫確認
          </button>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">発注管理</h3>
          <p className="text-gray-600">原材料の発注を行います。</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
            発注する
          </button>
        </div>
      </div>
    </div>
  );

  const renderSalesAnalytics = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">売上分析</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">月間売上</h3>
          <p className="text-3xl font-bold text-green-600">¥1,234,567</p>
          <p className="text-gray-600 mt-2">前月比 +5.8%</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">人気商品</h3>
          <ol className="list-decimal list-inside">
            <li className="text-gray-600">桜餅</li>
            <li className="text-gray-600">水羊羹</li>
            <li className="text-gray-600">栗きんとん</li>
          </ol>
        </div>
      </div>
    </div>
  );

  switch (componentName) {
    case 'SeasonalProducts':
      return renderSeasonalProducts();
    case 'InventoryManagement':
      return renderInventoryManagement();
    case 'SalesAnalytics':
      return renderSalesAnalytics();
    default:
      return <div>コンポーネントが見つかりません</div>;
  }
};

export default DynamicComponent;