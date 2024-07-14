import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, Users, Book, Award, Clock } from 'lucide-react';

const ApprenticeshipProgram = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const stages = [
    { name: '基礎技術', icon: <Book className="w-6 h-6" />, duration: '6ヶ月' },
    { name: '季節の和菓子', icon: <Calendar className="w-6 h-6" />, duration: '6ヶ月' },
    { name: '高度な技法', icon: <Award className="w-6 h-6" />, duration: '1年' },
    { name: '創作和菓子', icon: <Users className="w-6 h-6" />, duration: '1年' },
  ];

  const courses = [
    {
      id: 1,
      name: '和菓子の基本',
      description: '和菓子の歴史、材料、道具の使い方を学びます。',
      duration: '2週間',
      instructor: '鈴木清一郎',
    },
    {
      id: 2,
      name: '季節の上生菓子',
      description: '四季折々の上生菓子の作り方を学びます。',
      duration: '1ヶ月',
      instructor: '佐藤花子',
    },
    {
      id: 3,
      name: '茶道と和菓子',
      description: '茶道に合わせた和菓子の選び方と作り方を学びます。',
      duration: '3週間',
      instructor: '田中雅子',
    },
    {
      id: 4,
      name: '創作和菓子技法',
      description: '独自の和菓子を創作するための技法を学びます。',
      duration: '2ヶ月',
      instructor: '山田太郎',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage((prevStage) => (prevStage + 1) % stages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center font-serif">
        和菓子職人見習いプログラム
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 font-serif">修行の道のり</h2>
        <div className="flex justify-between items-center mb-8">
          {stages.map((stage, index) => (
            <div
              key={stage.name}
              className={`flex flex-col items-center ${
                index === currentStage ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-white border-2 border-current flex items-center justify-center mb-2">
                {stage.icon}
              </div>
              <span className="text-sm font-medium">{stage.name}</span>
              <span className="text-xs">{stage.duration}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 font-serif">講座一覧</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCourseClick(course)}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">{course.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{selectedCourse.name}</h3>
            <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
            <div className="flex items-center text-gray-500 mb-2">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">{selectedCourse.duration}</span>
            </div>
            <div className="flex items-center text-gray-500 mb-4">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">講師: {selectedCourse.instructor}</span>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
              onClick={() => setShowModal(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-12 text-center">
        <button className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center justify-center mx-auto">
          プログラムに応募する
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ApprenticeshipProgram;