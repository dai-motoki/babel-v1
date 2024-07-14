import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, ChevronDown, ChevronUp } from 'lucide-react';

const skillCategories = [
  '製菓技術',
  '材料知識',
  '道具使用',
  '季節感',
  '伝統技法',
  'デザイン',
  '食品衛生',
  'マネジメント'
];

const mockSkillsData = [
  { id: 1, name: '練り切り', category: '製菓技術', level: 5, description: '繊細な手技で美しい和菓子を作る技術' },
  { id: 2, name: '羊羹製造', category: '製菓技術', level: 4, description: '小豆と寒天を使った伝統的な和菓子の製造' },
  { id: 3, name: '抹茶の知識', category: '材料知識', level: 5, description: '高品質な抹茶の選定と使用方法' },
  { id: 4, name: '木型彫刻', category: '道具使用', level: 3, description: '和菓子の型を木で彫る伝統技術' },
  { id: 5, name: '季節の和菓子企画', category: '季節感', level: 4, description: '四季に合わせた和菓子の企画と製造' },
  { id: 6, name: '落雁製造', category: '伝統技法', level: 5, description: '砂糖と米粉を使った伝統的な干菓子の製造' },
  { id: 7, name: '和菓子のデザイン', category: 'デザイン', level: 4, description: '美しく魅力的な和菓子のデザイン能力' },
  { id: 8, name: 'HACCP対応', category: '食品衛生', level: 3, description: '食品安全管理システムの理解と実践' },
  { id: 9, name: '製造工程管理', category: 'マネジメント', level: 4, description: '効率的な和菓子製造ラインの管理' },
  { id: 10, name: '餅つき', category: '製菓技術', level: 5, description: '伝統的な餅つき技術と応用' },
];

const SkillsDatabase = () => {
  const [skills, setSkills] = useState(mockSkillsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const filteredSkills = mockSkillsData.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || skill.category === selectedCategory)
    );

    if (sortConfig.key) {
      filteredSkills.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    setSkills(filteredSkills);
  }, [searchTerm, selectedCategory, sortConfig]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <ChevronDown size={16} className="ml-1 text-gray-400" />;
    }
    return sortConfig.direction === 'ascending' ? (
      <ChevronUp size={16} className="ml-1 text-indigo-600" />
    ) : (
      <ChevronDown size={16} className="ml-1 text-indigo-600" />
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto my-8 p-6 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">和菓子職人スキルデータベース</h2>
      
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="relative mb-4 md:mb-0 md:w-1/2">
          <input
            type="text"
            placeholder="スキルを検索..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        
        <div className="relative md:w-1/3">
          <select
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">全てのカテゴリー</option>
            {skillCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('name')}>
                スキル名 <SortIcon column="name" />
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('category')}>
                カテゴリー <SortIcon column="category" />
              </th>
              <th className="py-3 px-6 text-center cursor-pointer" onClick={() => handleSort('level')}>
                熟練度 <SortIcon column="level" />
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {skills.map((skill) => (
              <tr key={skill.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="font-medium">{skill.name}</div>
                  <div className="text-xs text-gray-500">{skill.description}</div>
                </td>
                <td className="py-3 px-6 text-left">
                  <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-xs">
                    {skill.category}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={index < skill.level ? "text-yellow-400" : "text-gray-300"}
                        fill={index < skill.level ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {skills.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          該当するスキルが見つかりません。
        </div>
      )}
    </div>
  );
};

export default SkillsDatabase;