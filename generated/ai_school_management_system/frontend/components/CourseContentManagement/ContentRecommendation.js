import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Film, Code, Briefcase, Star, ChevronRight } from 'lucide-react';

const ContentRecommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'すべて', icon: <Star className="w-6 h-6" /> },
    { id: 'business', name: 'ビジネス', icon: <Briefcase className="w-6 h-6" /> },
    { id: 'creative', name: 'クリエイター', icon: <Film className="w-6 h-6" /> },
    { id: 'engineering', name: 'エンジニア', icon: <Code className="w-6 h-6" /> },
  ];

  useEffect(() => {
    fetchRecommendations();
  }, [selectedCategory]);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    // API呼び出しをシミュレート
    setTimeout(() => {
      const mockData = [
        { id: 1, title: 'AIビジネス戦略', category: 'business', type: 'course', rating: 4.8 },
        { id: 2, title: 'クリエイティブAI入門', category: 'creative', type: 'video', rating: 4.5 },
        { id: 3, title: '機械学習アルゴリズム', category: 'engineering', type: 'book', rating: 4.9 },
        { id: 4, title: 'データ分析と意思決定', category: 'business', type: 'course', rating: 4.6 },
        { id: 5, title: 'AIアートの作り方', category: 'creative', type: 'video', rating: 4.7 },
        { id: 6, title: 'ディープラーニング実践', category: 'engineering', type: 'book', rating: 4.8 },
      ];
      
      const filteredData = selectedCategory === 'all' 
        ? mockData 
        : mockData.filter(item => item.category === selectedCategory);
      
      setRecommendations(filteredData);
      setIsLoading(false);
    }, 1000);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'course':
        return <Book className="w-6 h-6 text-indigo-600" />;
      case 'video':
        return <Film className="w-6 h-6 text-red-600" />;
      case 'book':
        return <Book className="w-6 h-6 text-green-600" />;
      default:
        return <Star className="w-6 h-6 text-yellow-600" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-indigo-500 pb-2">
        AI生成コンテンツ推薦
      </h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">カテゴリー選択</h3>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              } transition duration-300 ease-in-out`}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="h-48 bg-gray-200 relative">
                {/* https://picsum.photos/seed/を使用して画像を表示 */}
                <img
                  src={`https://picsum.photos/seed/${item.id}/400/300`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    {getIcon(item.type)}
                    <span className="ml-2 text-sm">{item.type}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out"
                  >
                    詳細を見る
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && recommendations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">このカテゴリーにはまだコンテンツがありません。</p>
        </div>
      )}
    </div>
  );
};

export default ContentRecommendation;