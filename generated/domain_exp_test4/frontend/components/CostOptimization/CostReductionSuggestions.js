import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check, X, AlertTriangle } from 'react-feather';

const CostReductionSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('savingsDesc');

  useEffect(() => {
    // 実際のアプリケーションではAPIからデータを取得します
    const fetchSuggestions = async () => {
      // モックデータ
      const mockSuggestions = [
        { id: 1, category: 'license', title: '未使用ライセンスの削減', savings: 5000, difficulty: 'easy', implemented: false },
        { id: 2, category: 'cloud', title: 'クラウドリソースの最適化', savings: 8000, difficulty: 'medium', implemented: false },
        { id: 3, category: 'subscription', title: '重複サブスクリプションの統合', savings: 3000, difficulty: 'hard', implemented: false },
        { id: 4, category: 'hardware', title: '古いハードウェアの更新', savings: 2000, difficulty: 'medium', implemented: true },
        { id: 5, category: 'license', title: 'ボリュームライセンスへの移行', savings: 6000, difficulty: 'easy', implemented: false },
      ];
      setSuggestions(mockSuggestions);
    };

    fetchSuggestions();
  }, []);

  const filteredSuggestions = suggestions
    .filter(suggestion => selectedCategory === 'all' || suggestion.category === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === 'savingsDesc') return b.savings - a.savings;
      if (sortOrder === 'savingsAsc') return a.savings - b.savings;
      if (sortOrder === 'difficultyAsc') return a.difficulty.localeCompare(b.difficulty);
      if (sortOrder === 'difficultyDesc') return b.difficulty.localeCompare(a.difficulty);
      return 0;
    });

  const toggleImplementation = (id) => {
    setSuggestions(suggestions.map(suggestion =>
      suggestion.id === id ? { ...suggestion, implemented: !suggestion.implemented } : suggestion
    ));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-indigo-500 pb-2">コスト削減提案</h2>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <select
            className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">全てのカテゴリー</option>
            <option value="license">ライセンス</option>
            <option value="cloud">クラウド</option>
            <option value="subscription">サブスクリプション</option>
            <option value="hardware">ハードウェア</option>
          </select>

          <select
            className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="savingsDesc">節約額 (高→低)</option>
            <option value="savingsAsc">節約額 (低→高)</option>
            <option value="difficultyAsc">難易度 (易→難)</option>
            <option value="difficultyDesc">難易度 (難→易)</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          {filteredSuggestions.length} 件の提案
        </div>
      </div>

      <ul className="space-y-4">
        {filteredSuggestions.map(suggestion => (
          <li key={suggestion.id} className="bg-gray-50 rounded-lg p-4 shadow-sm transition duration-300 ease-in-out hover:shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">{suggestion.title}</h3>
              <span className="text-2xl font-bold text-indigo-600">¥{suggestion.savings.toLocaleString()}</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(suggestion.difficulty)}`}>
                {suggestion.difficulty === 'easy' ? '簡単' : suggestion.difficulty === 'medium' ? '中程度' : '困難'}
              </span>
              <span className="text-sm text-gray-600">{suggestion.category}</span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => toggleImplementation(suggestion.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out ${
                  suggestion.implemented
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-indigo-500 text-white hover:bg-indigo-600'
                }`}
              >
                {suggestion.implemented ? (
                  <><Check size={16} className="inline mr-1" /> 実装済み</>
                ) : (
                  '実装する'
                )}
              </button>
              {!suggestion.implemented && (
                <span className="text-sm text-gray-500 flex items-center">
                  <AlertTriangle size={16} className="mr-1" /> 未実装
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">総節約可能額</h3>
        <div className="bg-indigo-100 rounded-lg p-4">
          <span className="text-3xl font-bold text-indigo-800">
            ¥{filteredSuggestions.reduce((sum, suggestion) => sum + suggestion.savings, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CostReductionSuggestions;