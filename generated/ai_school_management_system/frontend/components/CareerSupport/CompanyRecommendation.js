import React, { useState, useEffect } from 'react';
import { FiSearch, FiStar, FiBookmark, FiArrowRight } from 'react-icons/fi';

const CompanyRecommendation = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    // 仮のデータ取得
    const fetchCompanies = async () => {
      // APIからデータを取得する代わりに、仮のデータを使用
      const mockCompanies = [
        { id: 1, name: '和風テクノロジー株式会社', industry: 'IT', size: '大企業', rating: 4.5, description: '伝統と革新を融合したAIソリューションを提供' },
        { id: 2, name: '桜花エレクトロニクス', industry: '電機', size: '中小企業', rating: 4.2, description: '日本の美意識を取り入れた家電製品の開発' },
        { id: 3, name: '禅スタイルデザイン', industry: 'デザイン', size: 'スタートアップ', rating: 4.8, description: 'ミニマリズムを追求したUX/UIデザイン' },
        { id: 4, name: '匠ロボティクス', industry: '製造', size: '中小企業', rating: 4.3, description: '職人技とロボット技術の融合' },
        { id: 5, name: '和心ソフトウェア', industry: 'IT', size: '大企業', rating: 4.6, description: '日本の文化に根ざしたソフトウェア開発' },
      ];
      setCompanies(mockCompanies);
      setFilteredCompanies(mockCompanies);
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const results = companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedIndustry === '' || company.industry === selectedIndustry) &&
      (selectedSize === '' || company.size === selectedSize)
    );
    setFilteredCompanies(results);
  }, [searchTerm, selectedIndustry, selectedSize, companies]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleIndustryChange = (e) => {
    setSelectedIndustry(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-red-500 pb-2">企業推薦システム</h1>
      
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="企業名で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={selectedIndustry}
              onChange={handleIndustryChange}
            >
              <option value="">業界を選択</option>
              <option value="IT">IT</option>
              <option value="電機">電機</option>
              <option value="デザイン">デザイン</option>
              <option value="製造">製造</option>
            </select>
          </div>
          <div className="w-full md:w-1/3 px-2">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={selectedSize}
              onChange={handleSizeChange}
            >
              <option value="">企業規模を選択</option>
              <option value="大企業">大企業</option>
              <option value="中小企業">中小企業</option>
              <option value="スタートアップ">スタートアップ</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <img src={`https://picsum.photos/seed/${company.id}/400/300`} alt={company.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{company.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{company.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{company.industry}</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{company.size}</span>
              </div>
              <div className="flex items-center mb-4">
                <FiStar className="text-yellow-400 mr-1" />
                <span className="text-gray-700">{company.rating.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <button className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-300">
                  <FiBookmark className="mr-1" />
                  保存
                </button>
                <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300">
                  詳細を見る
                  <FiArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">該当する企業が見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
};

export default CompanyRecommendation;