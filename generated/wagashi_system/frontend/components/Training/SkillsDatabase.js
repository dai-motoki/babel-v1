import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Star, Book, Award } from 'lucide-react';

const skillLevels = ['見習い', '中級', '職人', '名人'];
const skillCategories = ['製造技術', '素材知識', '道具使用', '季節感', '創造性'];

const initialSkills = [
  { id: 1, name: '練り切り技術', level: '職人', category: '製造技術' },
  { id: 2, name: '羊羹製造', level: '名人', category: '製造技術' },
  { id: 3, name: '抹茶の知識', level: '中級', category: '素材知識' },
  { id: 4, name: '和三盆の扱い', level: '職人', category: '素材知識' },
  { id: 5, name: '木型の使用', level: '中級', category: '道具使用' },
  { id: 6, name: '季節の和菓子企画', level: '職人', category: '季節感' },
  { id: 7, name: '新作和菓子開発', level: '名人', category: '創造性' },
];

const SkillCard = ({ skill }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-green-700">
    <h3 className="text-lg font-semibold text-green-800 mb-2">{skill.name}</h3>
    <div className="flex items-center mb-2">
      <Star className="text-yellow-500 mr-1" size={16} />
      <span className="text-sm text-gray-600">{skill.level}</span>
    </div>
    <div className="flex items-center">
      <Book className="text-blue-500 mr-1" size={16} />
      <span className="text-sm text-gray-600">{skill.category}</span>
    </div>
  </div>
);

const SkillsDatabase = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    filterSkills();
  }, [searchTerm, selectedLevel, selectedCategory]);

  const filterSkills = () => {
    let filteredSkills = initialSkills;

    if (searchTerm) {
      filteredSkills = filteredSkills.filter(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLevel) {
      filteredSkills = filteredSkills.filter(skill => skill.level === selectedLevel);
    }

    if (selectedCategory) {
      filteredSkills = filteredSkills.filter(skill => skill.category === selectedCategory);
    }

    setSkills(filteredSkills);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-green-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">和菓子職人スキルデータベース</h2>
      
      <div className="mb-6">
        <div className="flex items-center bg-white rounded-lg shadow-md p-2">
          <Search className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            placeholder="スキルを検索..."
            className="w-full bg-transparent outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex mb-6 space-x-4">
        <div className="relative w-1/2">
          <button
            className="w-full bg-white border border-green-700 rounded-lg p-2 flex items-center justify-between text-green-800"
            onClick={() => setIsLevelDropdownOpen(!isLevelDropdownOpen)}
          >
            <span>{selectedLevel || '技能レベル'}</span>
            <ChevronDown size={20} />
          </button>
          {isLevelDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-green-700 rounded-lg shadow-lg">
              {skillLevels.map((level) => (
                <div
                  key={level}
                  className="p-2 hover:bg-green-100 cursor-pointer"
                  onClick={() => {
                    setSelectedLevel(level);
                    setIsLevelDropdownOpen(false);
                  }}
                >
                  {level}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-1/2">
          <button
            className="w-full bg-white border border-green-700 rounded-lg p-2 flex items-center justify-between text-green-800"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          >
            <span>{selectedCategory || 'スキルカテゴリー'}</span>
            <ChevronDown size={20} />
          </button>
          {isCategoryDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-green-700 rounded-lg shadow-lg">
              {skillCategories.map((category) => (
                <div
                  key={category}
                  className="p-2 hover:bg-green-100 cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsCategoryDropdownOpen(false);
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          <Award className="mx-auto text-green-700 mb-2" size={48} />
          <p>該当するスキルが見つかりません。検索条件を変更してください。</p>
        </div>
      )}
    </div>
  );
};

export default SkillsDatabase;