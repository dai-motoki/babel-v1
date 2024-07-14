import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, Printer, Trash2, Plus, Minus } from 'lucide-react';

const POSSystem = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const menuItems = [
    { id: 1, name: 'マグロ', price: 300, category: 'Nigiri' },
    { id: 2, name: 'サーモン', price: 250, category: 'Nigiri' },
    { id: 3, name: 'エビ', price: 200, category: 'Nigiri' },
    { id: 4, name: 'イカ', price: 180, category: 'Nigiri' },
    { id: 5, name: 'カリフォルニアロール', price: 400, category: 'Maki' },
    { id: 6, name: 'スパイシーツナロール', price: 450, category: 'Maki' },
    { id: 7, name: 'アボカドロール', price: 350, category: 'Maki' },
    { id: 8, name: 'みそ汁', price: 150, category: 'Side' },
    { id: 9, name: 'お茶', price: 100, category: 'Drink' },
    { id: 10, name: 'ビール', price: 500, category: 'Drink' },
  ];

  useEffect(() => {
    calculateTotal();
  }, [orders]);

  const addToOrder = (item) => {
    const existingItem = orders.find((order) => order.id === item.id);
    if (existingItem) {
      setOrders(
        orders.map((order) =>
          order.id === item.id ? { ...order, quantity: order.quantity + 1 } : order
        )
      );
    } else {
      setOrders([...orders, { ...item, quantity: 1 }]);
    }
  };

  const removeFromOrder = (item) => {
    const updatedOrders = orders.map((order) =>
      order.id === item.id ? { ...order, quantity: order.quantity - 1 } : order
    );
    setOrders(updatedOrders.filter((order) => order.quantity > 0));
  };

  const calculateTotal = () => {
    const newTotal = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  const clearOrder = () => {
    setOrders([]);
  };

  const handlePayment = () => {
    alert(`合計金額: ${total}円\nお支払いが完了しました。ありがとうございます！`);
    clearOrder();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="md:w-2/3 p-6 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">回転寿司 POSシステム</h2>
        <div className="mb-6">
          <button
            onClick={() => setActiveCategory('All')}
            className={`mr-2 mb-2 px-4 py-2 rounded-full ${
              activeCategory === 'All' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
            }`}
          >
            全て
          </button>
          {['Nigiri', 'Maki', 'Side', 'Drink'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`mr-2 mb-2 px-4 py-2 rounded-full ${
                activeCategory === category ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuItems
            .filter((item) => activeCategory === 'All' || item.category === activeCategory)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => addToOrder(item)}
              >
                <div className="w-12 h-12 mb-2 text-indigo-600">🍣</div>
                <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                <p className="text-gray-600">{item.price}円</p>
              </div>
            ))}
        </div>
      </div>
      <div className="md:w-1/3 bg-white p-6 shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-indigo-800">注文内容</h3>
        <div className="mb-4 h-96 overflow-y-auto">
          {orders.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded">
              <span className="font-semibold">{item.name}</span>
              <div className="flex items-center">
                <button
                  onClick={() => removeFromOrder(item)}
                  className="text-red-500 hover:text-red-700 mr-2"
                >
                  <Minus size={18} />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => addToOrder(item)}
                  className="text-green-500 hover:text-green-700 ml-2"
                >
                  <Plus size={18} />
                </button>
                <span className="ml-4">{item.price * item.quantity}円</span>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">合計:</span>
            <span className="text-xl font-bold">{total}円</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePayment}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            >
              <CreditCard className="inline-block mr-2" />
              支払い
            </button>
            <button
              onClick={clearOrder}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
            >
              <Trash2 className="inline-block mr-2" />
              クリア
            </button>
          </div>
          <button
            onClick={handlePrint}
            className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            <Printer className="inline-block mr-2" />
            レシート印刷
          </button>
        </div>
      </div>
    </div>
  );
};

export default POSSystem;