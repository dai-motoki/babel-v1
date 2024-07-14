import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, ChevronDown, ChevronUp } from 'lucide-react';

const skillCategories = [
  '製菓技術',
  '材料知識',
  '道具の扱い',
  '季節感',
  '伝統文化',
  'デザイン',
  '衛生管理',
];

const initialSkills = [
  { id: 1, name: '練り切り', category: '製菓技術', level: 5, description: '複雑な形状の和菓子を作る技術' },
  { id: 2, name: '羊羹製造', category: '製菓技術', level: 4, description: '滑らかで美しい羊羹を作る技術' },
  { id: 3, name: '抹茶の知識', category: '材料知識', level: 5, description: '抹茶の品質や特性に関する深い理解' },
  { id: 4, name: '和三盆の扱い', category: '材料知識', level: 4, description: '高級砂糖の特性を活かした使用法' },
  { id: 5, name: '木型の使用', category: '道具の扱い', level: 3, description: '伝統的な木型を使った和菓子成形' },
  { id: 6, name: '季節の和菓子', category: '季節感', level: 5, description: '四季に合わせた和菓子のデザインと味付け' },
  { id: 7, name: '茶道の知識', category: '伝統文化', level: 4, description: '茶道に合わせた和菓子の選定と提供' },
  { id: 8, name: '和菓子のデザイン', category: 'デザイン', level: 5, description: '美しく魅力的な和菓子のデザイン能力' },
  { id: 9, name: '衛生管理', category: '衛生管理', level: 5, description: '食品安全に関する高度な知識と実践' },
  { id: 10, name: '餅つき', category: '製菓技術', level: 3, description: '伝統的な餅つき技術' },
];

const SkillsDatabase = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const filteredSkills = initialSkills.filter(skill =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || skill.category === selectedCategory)
    );

    const sortedSkills = [...filteredSkills].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSkills(sortedSkills);
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
      return null;
    }
    return sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 font-serif">和菓子職人スキルデータベース</h1>
      
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="スキルを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border-2 border-[#006400] rounded-full bg-white text-[#4A2311] focus:outline-none focus:ring-2 focus:ring-[#006400] focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#006400]" size={20} />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border-2 border-[#006400] rounded-full bg-white text-[#4A2311] focus:outline-none focus:ring-2 focus:ring-[#006400] focus:border-transparent"
        >
          <option value="">全てのカテゴリー</option>
          {skillCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#006400] text-white">
              <th className="px-6 py-3 text-left text-sm font-medium cursor-pointer" onClick={() => handleSort('name')}>
                スキル名 <SortIcon column="name" />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium cursor-pointer" onClick={() => handleSort('category')}>
                カテゴリー <SortIcon column="category" />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium cursor-pointer" onClick={() => handleSort('level')}>
                レベル <SortIcon column="level" />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                説明
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5D6C1]">
            {skills.map((skill) => (
              <tr key={skill.id} className="hover:bg-[#F3EAD3] transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#4A2311]">{skill.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A2311]">{skill.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A2311]">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        fill={index < skill.level ? "#FFB7C5" : "none"}
                        stroke={index < skill.level ? "#FFB7C5" : "#4A2311"}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#4A2311]">{skill.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center text-[#4A2311] text-sm">
        <p>総スキル数: {skills.length}</p>
        <p>最高レベルのスキル: {skills.filter(skill => skill.level === 5).length}</p>
      </div>
    </div>
  );
};

export default SkillsDatabase;