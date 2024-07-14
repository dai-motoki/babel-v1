import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Fish, ShoppingCart, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';

const StockManagement = () => {
  const [stockData, setStockData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 在庫データのモック
    const mockData = [
      { id: 1, name: 'マグロ', stock: 50, unit: '貫', category: '魚', status: 'normal' },
      { id: 2, name: 'サーモン', stock: 40, unit: '貫', category: '魚', status: 'low' },
      { id: 3, name: 'イカ', stock: 30, unit: '杯', category: '魚介', status: 'normal' },
      { id: 4, name: 'エビ', stock: 25, unit: '尾', category: '魚介', status: 'critical' },
      { id: 5, name: 'タマゴ', stock: 60, unit: '個', category: '他', status: 'normal' },
      { id: 6, name: 'アナゴ', stock: 20, unit: '尾', category: '魚', status: 'low' },
      { id: 7, name: 'イクラ', stock: 15, unit: '皿', category: '魚卵', status: 'critical' },
      { id: 8, name: 'ウニ', stock: 10, unit: '皿', category: '魚介', status: 'low' },
    ];

    setStockData(mockData);
    setFilteredData(mockData);
    setIsLoading(false);
  }, []);

  const handleFilter = (category) => {
    setFilter(category);
    if (category === 'all') {
      setFilteredData(stockData);
    } else {
      setFilteredData(stockData.filter(item => item.category === category));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-500';
      case 'low': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const refreshData = () => {
    setIsLoading(true);
    // 実際のAPIコールをシミュレート
    setTimeout(() => {
      const updatedData = stockData.map(item => ({
        ...item,
        stock: Math.floor(Math.random() * 100)
      }));
      setStockData(updatedData);
      setFilteredData(updatedData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-indigo-800 border-b-2 border-indigo-200 pb-2">
          寿司ネタ在庫管理
        </h1>

        <div className="mb-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => handleFilter('all')}
              className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} transition duration-300 ease-in-out transform hover:scale-105`}
            >
              全て
            </button>
            <button
              onClick={() => handleFilter('魚')}
              className={`px-4 py-2 rounded-full ${filter === '魚' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} transition duration-300 ease-in-out transform hover:scale-105`}
            >
              魚類
            </button>
            <button
              onClick={() => handleFilter('魚介')}
              className={`px-4 py-2 rounded-full ${filter === '魚介' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} transition duration-300 ease-in-out transform hover:scale-105`}
            >
              魚介類
            </button>
            <button
              onClick={() => handleFilter('魚卵')}
              className={`px-4 py-2 rounded-full ${filter === '魚卵' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} transition duration-300 ease-in-out transform hover:scale-105`}
            >
              魚卵
            </button>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <RefreshCw className="mr-2" size={18} />
            更新
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {filteredData.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-6 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                    <Fish className="text-indigo-500" size={24} />
                  </div>
                  <p className="text-3xl font-bold mb-2 text-indigo-600">
                    {item.stock} <span className="text-sm text-gray-500">{item.unit}</span>
                  </p>
                  <p className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                    {item.status === 'normal' && '在庫十分'}
                    {item.status === 'low' && '在庫少なめ'}
                    {item.status === 'critical' && '要補充'}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">在庫推移</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stock" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        <div className="mt-8 bg-indigo-100 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-800">在庫アラート</h2>
          <ul className="space-y-2">
            {filteredData.filter(item => item.status === 'critical').map(item => (
              <li key={item.id} className="flex items-center text-red-600">
                <AlertTriangle className="mr-2" size={18} />
                <span>{item.name}の在庫が危険水準です。至急補充してください。</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;