import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X, CreditCard, Printer } from 'lucide-react';

const products = [
  { id: 1, name: '桜餅', price: 250, category: '季節の和菓子' },
  { id: 2, name: '抹茶どら焼き', price: 300, category: '定番和菓子' },
  { id: 3, name: '柚子羊羹', price: 400, category: '季節の和菓子' },
  { id: 4, name: '栗きんとん', price: 350, category: '季節の和菓子' },
  { id: 5, name: '黒糖まんじゅう', price: 200, category: '定番和菓子' },
  { id: 6, name: '抹茶大福', price: 280, category: '定番和菓子' },
  { id: 7, name: '柏餅', price: 230, category: '季節の和菓子' },
  { id: 8, name: '芋ようかん', price: 320, category: '定番和菓子' },
  { id: 9, name: '紫陽花餅', price: 270, category: '季節の和菓子' },
  { id: 10, name: '栗蒸し羊羹', price: 450, category: '季節の和菓子' },
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '全て' || product.category === selectedCategory)
  );

  const handleCheckout = () => {
    console.log('注文内容:', cart);
    console.log('合計金額:', total);
    alert('ご注文ありがとうございます。合計金額: ' + total + '円');
    setCart([]);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F3EAD3] text-[#4A2311]">
      {/* 商品一覧 */}
      <div className="md:w-2/3 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 font-yuji">菓匠 鈴乃家 POSシステム</h1>
        <div className="mb-4 flex flex-col md:flex-row md:items-center">
          <input
            type="text"
            placeholder="商品を検索..."
            className="p-2 border border-[#006400] rounded-md mb-2 md:mb-0 md:mr-4 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border border-[#006400] rounded-md bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="全て">全てのカテゴリー</option>
            <option value="季節の和菓子">季節の和菓子</option>
            <option value="定番和菓子">定番和菓子</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer" onClick={() => addToCart(product)}>
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-[#006400]">{product.price}円</p>
              <p className="text-sm text-gray-600">{product.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* カート */}
      <div className="md:w-1/3 bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <ShoppingCart className="mr-2" /> 注文内容
        </h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">カートは空です</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.price}円 × {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-[#006400] hover:text-[#007500]">
                    <Minus size={20} />
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[#006400] hover:text-[#007500]">
                    <Plus size={20} />
                  </button>
                  <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-500 hover:text-red-700">
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-xl font-bold">合計: {total}円</p>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-[#006400] hover:bg-[#007500] text-white font-bold py-2 px-4 rounded-full w-full flex items-center justify-center"
            >
              <CreditCard className="mr-2" /> 会計する
            </button>
            <button className="mt-2 border border-[#006400] text-[#006400] hover:bg-[#F3EAD3] font-bold py-2 px-4 rounded-full w-full flex items-center justify-center">
              <Printer className="mr-2" /> レシート印刷
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default POSSystem;