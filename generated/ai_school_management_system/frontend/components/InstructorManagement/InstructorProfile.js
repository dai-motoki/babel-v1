import React, { useState, useEffect } from 'react';
import { Pencil, Save, X, Star, Calendar, Book, Users, Award } from 'lucide-react';

const InstructorProfile = () => {
  const [instructor, setInstructor] = useState({
    id: 1,
    name: '山田 太郎',
    email: 'yamada@aischool.jp',
    specialization: 'AIエンジニアリング',
    experience: 10,
    rating: 4.8,
    courses: ['AI基礎', 'マシンラーニング実践', 'ディープラーニング応用'],
    bio: 'AIエンジニアとして10年以上の経験を持つ。大手IT企業でのプロジェクトリーダー経験も豊富。',
    achievements: ['AI学会最優秀論文賞', 'テックカンファレンス基調講演'],
    profileImage: '/images/yamada.jpg'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedInstructor, setEditedInstructor] = useState({...instructor});

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setInstructor(editedInstructor);
    setIsEditing(false);
    // ここでAPIを呼び出して、サーバーに変更を保存する処理を追加
  };

  const handleCancel = () => {
    setEditedInstructor({...instructor});
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInstructor(prev => ({...prev, [name]: value}));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <h1 className="text-3xl font-semibold mb-2">講師プロフィール</h1>
          <p className="text-indigo-100">AIスクールの優秀な講師陣</p>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">講師画像</span>
              </div>
            </div>
            <div className="w-full md:w-2/3 px-3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{instructor.name}</h2>
                {!isEditing ? (
                  <button onClick={handleEdit} className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full flex items-center transition duration-300">
                    <Pencil size={18} className="mr-2" />
                    編集
                  </button>
                ) : (
                  <div>
                    <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full flex items-center transition duration-300 mr-2">
                      <Save size={18} className="mr-2" />
                      保存
                    </button>
                    <button onClick={handleCancel} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full flex items-center transition duration-300">
                      <X size={18} className="mr-2" />
                      キャンセル
                    </button>
                  </div>
                )}
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedInstructor.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
              ) : (
                <p className="text-gray-600 mb-4">{instructor.email}</p>
              )}
              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 mr-1" />
                <span className="text-gray-700 font-semibold">{instructor.rating}</span>
                <span className="text-gray-500 ml-2">/ 5.0</span>
              </div>
              <div className="flex items-center text-gray-700 mb-2">
                <Calendar className="mr-2" />
                <span>{instructor.experience}年の経験</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Book className="mr-2" />
                <span>{instructor.specialization}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">経歴</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={editedInstructor.bio}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
              />
            ) : (
              <p className="text-gray-600">{instructor.bio}</p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">担当コース</h3>
            <div className="flex flex-wrap">
              {instructor.courses.map((course, index) => (
                <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2">
                  {course}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">実績</h3>
            <ul className="list-disc list-inside text-gray-600">
              {instructor.achievements.map((achievement, index) => (
                <li key={index} className="mb-2">{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;