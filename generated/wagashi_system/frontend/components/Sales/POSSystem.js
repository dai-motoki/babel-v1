import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X, CreditCard, Printer } from 'lucide-react';

const products = [
  { id: 1, name: '桜餅', price: 250, category: '春' },
  { id: 2, name: '柏餅', price: 200, category: '春' },
  { id: 3, name: '水羊羹', price: 300, category: '夏' },
  { id: 4, name: '栗蒸し羊羹', price: 350, category: '秋' },
  { id: 5, name: '栗きんとん', price: 400, category: '冬' },
  { id: 6, name: '抹茶大福', price: 280, category: '通年' },
  { id: 7, name: 'どら焼き', price: 220, category: '通年' },
  { id: 8, name: '黒糖まんじゅう', price: 180, category: '通年' },
];

const POSSystem = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [activeCategory, setActiveCategory] = useState('全て');

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
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleCheckout = () => {
    alert(`合計金額: ${total}円\nありがとうございました！`);
    setCart([]);
  };

  const filteredProducts = activeCategory === '全て'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F3EAD3] text-[#4A2311]">
      {/* 商品リスト */}
      <div className="md:w-2/3 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 font-yumin">菓匠 鈴乃家 POS システム</h1>
        <div className="mb-4">
          <select
            className="w-full p-2 bg-white border border-[#006400] rounded-md font-yugoth"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            <option value="全て">全ての商品</option>
            <option value="春">春の和菓子</option>
            <option value="夏">夏の和菓子</option>
            <option value="秋">秋の和菓子</option>
            <option value="冬">冬の和菓子</option>
            <option value="通年">通年商品</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => addToCart(product)}
            >
              <div className="text-lg font-semibold mb-2 font-yumin">{product.name}</div>
              <div className="text-[#006400] font-yugoth">{product.price}円</div>
            </div>
          ))}
        </div>
      </div>

      {/* カート */}
      <div className="md:w-1/3 bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center font-yumin">
          <ShoppingCart className="mr-2" />
          お買い物かご
        </h2>
        {cart.length === 0 ? (
          <p className="text-gray-500 font-yugoth">カートは空です</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                <div className="font-yugoth">
                  <div>{item.name}</div>
                  <div className="text-sm text-gray-600">{item.price}円 × {item.quantity}</div>
                </div>
                <div className="flex items-center">
                  <button
                    className="text-[#006400] hover:text-[#007500] transition-colors duration-300"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={20} />
                  </button>
                  <span className="mx-2 font-yugoth">{item.quantity}</span>
                  <button
                    className="text-[#006400] hover:text-[#007500] transition-colors duration-300"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={20} />
                  </button>
                  <button
                    className="ml-4 text-red-500 hover:text-red-700 transition-colors duration-300"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <div className="text-xl font-bold mb-4 font-yumin">合計: {total}円</div>
              <button
                className="w-full bg-[#006400] hover:bg-[#007500] text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center font-yugoth"
                onClick={handleCheckout}
              >
                <CreditCard className="mr-2" />
                会計する
              </button>
              <button
                className="w-full mt-2 border border-[#006400] text-[#006400] hover:bg-[#F3EAD3] font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center font-yugoth"
              >
                <Printer className="mr-2" />
                レシート印刷
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default POSSystem;