import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X, CreditCard, Printer } from 'lucide-react';

const products = [
  { id: 1, name: '抹茶どら焼き', price: 250, category: '和菓子' },
  { id: 2, name: '桜餅', price: 180, category: '季節限定' },
  { id: 3, name: '栗きんとん', price: 300, category: '和菓子' },
  { id: 4, name: 'わらび餅', price: 220, category: '和菓子' },
  { id: 5, name: '柏餅', price: 200, category: '季節限定' },
  { id: 6, name: '羊羹', price: 350, category: '和菓子' },
  { id: 7, name: '大福', price: 180, category: '和菓子' },
  { id: 8, name: '水羊羹', price: 280, category: '季節限定' },
  { id: 9, name: '柚子もなか', price: 230, category: '和菓子' },
  { id: 10, name: '栗蒸し羊羹', price: 400, category: '季節限定' },
];

const POSSystem = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全て');

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '全て' || product.category === selectedCategory)
  );

  const handleCheckout = () => {
    alert(`合計金額: ${total}円\nお買い上げありがとうございます。`);
    clearCart();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F3EAD3] text-[#4A2311]">
      {/* 商品一覧 */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 font-yumin">商品一覧</h2>
        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            placeholder="商品検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-[#006400] rounded-md flex-grow"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-[#006400] rounded-md bg-white"
          >
            <option value="全て">全てのカテゴリー</option>
            <option value="和菓子">和菓子</option>
            <option value="季節限定">季節限定</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-yumin font-bold mb-2">{product.name}</h3>
              <p className="text-lg mb-2">{product.price}円</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-[#006400] text-white py-2 rounded-md hover:bg-[#007500] transition-colors duration-300"
              >
                追加
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* カートと会計 */}
      <div className="w-full md:w-1/3 bg-white p-4 shadow-lg overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 font-yumin flex items-center">
          <ShoppingCart className="mr-2" />
          お買い物かご
        </h2>
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-2 p-2 bg-[#F3EAD3] rounded-md">
            <span className="font-yumin">{item.name}</span>
            <div className="flex items-center">
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-[#006400] hover:text-[#007500] mr-2"
              >
                <Minus size={20} />
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => addToCart(item)}
                className="text-[#006400] hover:text-[#007500] ml-2"
              >
                <Plus size={20} />
              </button>
              <span className="ml-4">{item.price * item.quantity}円</span>
            </div>
          </div>
        ))}
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold font-yumin">合計</span>
            <span className="text-xl font-bold">{total}円</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-[#006400] text-white py-3 rounded-md hover:bg-[#007500] transition-colors duration-300 flex items-center justify-center"
            disabled={cart.length === 0}
          >
            <CreditCard className="mr-2" />
            お会計
          </button>
          <button
            onClick={clearCart}
            className="w-full mt-2 bg-[#FFB7C5] text-[#4A2311] py-3 rounded-md hover:bg-[#FFC1CF] transition-colors duration-300 flex items-center justify-center"
            disabled={cart.length === 0}
          >
            <X className="mr-2" />
            かごを空にする
          </button>
          <button
            onClick={() => alert('レシートを印刷しました。')}
            className="w-full mt-2 bg-gray-200 text-[#4A2311] py-3 rounded-md hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center"
            disabled={cart.length === 0}
          >
            <Printer className="mr-2" />
            レシート印刷
          </button>
        </div>
      </div>
    </div>
  );
};

export default POSSystem;