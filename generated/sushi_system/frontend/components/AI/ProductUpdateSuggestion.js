import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Check, RefreshCw } from 'lucide-react';

const ProductUpdateSuggestion = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 商品データのモック
    const mockProducts = [
      { id: 1, name: 'マグロ', currentPopularity: 85, trend: 'up', suggestion: '価格上昇の余地あり', salesData: [65, 70, 80, 85, 90] },
      { id: 2, name: 'サーモン', currentPopularity: 78, trend: 'down', suggestion: '新しい調理法の導入を検討', salesData: [80, 85, 82, 79, 78] },
      { id: 3, name: 'イカ', currentPopularity: 60, trend: 'stable', suggestion: '季節限定商品として提供', salesData: [58, 61, 59, 62, 60] },
      { id: 4, name: 'エビ', currentPopularity: 72, trend: 'up', suggestion: 'サイズバリエーションの拡大', salesData: [65, 68, 70, 71, 72] },
      { id: 5, name: 'ウニ', currentPopularity: 90, trend: 'up', suggestion: '高級ラインの強化', salesData: [75, 80, 85, 88, 90] },
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="inline-block mr-2 text-green-500" />;
      case 'down':
        return <TrendingDown className="inline-block mr-2 text-red-500" />;
      default:
        return <AlertTriangle className="inline-block mr-2 text-yellow-500" />;
    }
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 80) return 'text-green-500';
    if (popularity >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b-4 border-red-500 pb-2 inline-block">
        商品更新提案
      </h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin text-gray-500" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">商品リスト</h2>
            <ul className="space-y-4">
              {products.map((product) => (
                <li
                  key={product.id}
                  className={`cursor-pointer p-4 rounded-md transition-all duration-300 ${
                    selectedProduct && selectedProduct.id === product.id
                      ? 'bg-red-100 shadow-md'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleProductSelect(product)}
                >
                  <span className="font-medium text-lg">{product.name}</span>
                  {getTrendIcon(product.trend)}
                  <span className={`font-bold ${getPopularityColor(product.currentPopularity)}`}>
                    {product.currentPopularity}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 bg-white rounded-lg shadow-lg p-6">
            {selectedProduct ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  {selectedProduct.name}の分析
                </h2>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">現在の人気度</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
                      <div
                        className={`h-4 rounded-full ${
                          selectedProduct.currentPopularity >= 80
                            ? 'bg-green-500'
                            : selectedProduct.currentPopularity >= 60
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${selectedProduct.currentPopularity}%` }}
                      ></div>
                    </div>
                    <span className="text-2xl font-bold">{selectedProduct.currentPopularity}%</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">トレンド</h3>
                  <div className="flex items-center text-2xl">
                    {getTrendIcon(selectedProduct.trend)}
                    <span className="capitalize">{selectedProduct.trend}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">更新提案</h3>
                  <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
                    <Check className="inline-block mr-2 text-blue-500" />
                    <span className="text-lg">{selectedProduct.suggestion}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">売上推移</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={selectedProduct.salesData.map((value, index) => ({ name: `Week ${index + 1}`, value }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-2xl text-gray-500">商品を選択してください</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUpdateSuggestion;