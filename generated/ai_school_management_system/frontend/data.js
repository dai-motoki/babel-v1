// data.js

export const students = [
  {
    id: 1,
    name: "山田太郎",
    age: 22,
    course: "AIエンジニアリング",
    grade: "A",
    email: "yamada@example.com",
    profileImage: "/images/student1.jpg"
  },
  {
    id: 2,
    name: "佐藤花子",
    age: 20,
    course: "AIビジネス戦略",
    grade: "B+",
    email: "sato@example.com",
    profileImage: "/images/student2.jpg"
  },
  // ... 他の学生データ
];

export const courses = [
  {
    id: 1,
    name: "AIエンジニアリング基礎",
    instructor: "鈴木一郎",
    duration: "12週間",
    level: "初級",
    description: "AIの基本概念から実践的なプログラミングまでを学びます。",
    image: "/images/course1.jpg"
  },
  {
    id: 2,
    name: "機械学習アルゴリズム応用",
    instructor: "田中二郎",
    duration: "10週間",
    level: "中級",
    description: "様々な機械学習アルゴリズムの応用と実装を学びます。",
    image: "/images/course2.jpg"
  },
  // ... 他のコースデータ
];

export const instructors = [
  {
    id: 1,
    name: "鈴木一郎",
    specialization: "AIエンジニアリング",
    experience: "10年",
    email: "suzuki@example.com",
    profileImage: "/images/instructor1.jpg"
  },
  {
    id: 2,
    name: "田中二郎",
    specialization: "機械学習",
    experience: "8年",
    email: "tanaka@example.com",
    profileImage: "/images/instructor2.jpg"
  },
  // ... 他の講師データ
];

export const events = [
  {
    id: 1,
    title: "AI技術セミナー",
    date: "2023-06-15",
    location: "東京AIホール",
    description: "最新のAI技術トレンドについて学ぶセミナー"
  },
  {
    id: 2,
    title: "機械学習ワークショップ",
    date: "2023-07-01",
    location: "大阪テックセンター",
    description: "実践的な機械学習プロジェクトを体験するワークショップ"
  },
  // ... 他のイベントデータ
];
// components/Dashboard.js

import React, { useState } from 'react';
import { students, courses, instructors, events } from '../data';
import { ChevronDown, Users, BookOpen, UserCheck, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('students');

  const tabs = [
    { id: 'students', name: '学生', icon: Users },
    { id: 'courses', name: 'コース', icon: BookOpen },
    { id: 'instructors', name: '講師', icon: UserCheck },
    { id: 'events', name: 'イベント', icon: Calendar },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
              <div key={student.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.course}</p>
                <p className="text-sm text-gray-600">成績: {student.grade}</p>
              </div>
            ))}
          </div>
        );
      case 'courses':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                <p className="text-sm text-gray-600">講師: {course.instructor}</p>
                <p className="text-sm text-gray-600">期間: {course.duration}</p>
              </div>
            ))}
          </div>
        );
      case 'instructors':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-800">{instructor.name}</h3>
                <p className="text-sm text-gray-600">{instructor.specialization}</p>
                <p className="text-sm text-gray-600">経験: {instructor.experience}</p>
              </div>
            ))}
          </div>
        );
      case 'events':
        return (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600">日付: {event.date}</p>
                <p className="text-sm text-gray-600">場所: {event.location}</p>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">生成AI塾 ダッシュボード</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center px-6 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </div>
          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;