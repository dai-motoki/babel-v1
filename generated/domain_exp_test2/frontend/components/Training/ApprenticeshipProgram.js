import React, { useState, useEffect } from 'react';
import { Calendar, Book, Award, Users, ChevronRight, ChevronDown } from 'lucide-react';

const ApprenticeshipProgram = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCourses, setExpandedCourses] = useState([]);

  const courses = [
    {
      id: 1,
      title: '和菓子の基礎',
      duration: '3ヶ月',
      description: '和菓子の歴史、基本的な材料、道具の使い方を学びます。',
      modules: ['和菓子の歴史', '基本材料の知識', '道具の使い方', '基本的な和菓子の作り方'],
    },
    {
      id: 2,
      title: '季節の和菓子',
      duration: '6ヶ月',
      description: '四季折々の和菓子の作り方と、季節感の表現方法を学びます。',
      modules: ['春の和菓子', '夏の和菓子', '秋の和菓子', '冬の和菓子', '季節の表現技法'],
    },
    {
      id: 3,
      title: '高度な技法',
      duration: '1年',
      description: '複雑な和菓子の作り方や、独創的な技法を学びます。',
      modules: ['練り切りの高度な技法', '羊羹の応用', '最新の和菓子技術', 'オリジナル和菓子の開発'],
    },
  ];

  const toggleCourse = (courseId) => {
    setExpandedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  useEffect(() => {
    // 季節に応じて背景色を変更する
    const season = getSeason();
    document.body.className = `bg-${season}-100`;
  }, []);

  const getSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 font-japanese">和菓子職人見習いプログラム</h1>
      
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-semibold ${activeTab === 'overview' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('overview')}
        >
          概要
        </button>
        <button
          className={`px-4 py-2 font-semibold ${activeTab === 'courses' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('courses')}
        >
          コース一覧
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 bg-green-50 p-4 rounded-lg">
            <Calendar className="text-green-600" size={24} />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">プログラム期間</h2>
              <p className="text-gray-600">基礎から高度な技術まで、最長2年間</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-pink-50 p-4 rounded-lg">
            <Book className="text-pink-600" size={24} />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">カリキュラム</h2>
              <p className="text-gray-600">理論と実践を組み合わせた総合的な学習</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-yellow-50 p-4 rounded-lg">
            <Award className="text-yellow-600" size={24} />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">修了証</h2>
              <p className="text-gray-600">プログラム修了後、認定証を授与</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-lg">
            <Users className="text-blue-600" size={24} />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">少人数制</h2>
              <p className="text-gray-600">きめ細やかな指導で確実にスキルアップ</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                onClick={() => toggleCourse(course.id)}
              >
                <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{course.duration}</span>
                  {expandedCourses.includes(course.id) ? (
                    <ChevronDown className="text-gray-600" size={20} />
                  ) : (
                    <ChevronRight className="text-gray-600" size={20} />
                  )}
                </div>
              </div>
              {expandedCourses.includes(course.id) && (
                <div className="p-4 bg-white">
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <h4 className="font-semibold text-gray-800 mb-2">モジュール:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {course.modules.map((module, index) => (
                      <li key={index}>{module}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprenticeshipProgram;