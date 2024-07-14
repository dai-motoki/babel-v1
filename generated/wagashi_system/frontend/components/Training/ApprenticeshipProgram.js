import React, { useState } from 'react';
import { Scroll, BookOpen, Award, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

const ApprenticeshipProgram = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const programs = [
    {
      id: 1,
      title: '基礎技術習得',
      duration: '6ヶ月',
      description: '和菓子の基本的な製法や材料の扱い方を学びます。',
      skills: ['餡こ作り', '生地こね', '型抜き', '蒸し方'],
      icon: <Scroll className="w-6 h-6 text-green-700" />
    },
    {
      id: 2,
      title: '季節の和菓子製作',
      duration: '1年',
      description: '四季折々の和菓子の製作技術を習得します。',
      skills: ['桜餅', '柏餅', '水羊羹', '栗きんとん'],
      icon: <BookOpen className="w-6 h-6 text-green-700" />
    },
    {
      id: 3,
      title: '高度技術習得',
      duration: '2年',
      description: '複雑な和菓子の製作技術や伝統的な技法を学びます。',
      skills: ['練り切り', '上生菓子', '干菓子', '落雁'],
      icon: <Award className="w-6 h-6 text-green-700" />
    }
  ];

  return (
    <div className="bg-cream-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center font-yumin">
        和菓子職人見習いプログラム
      </h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-700 mb-6 font-yugoth">
          伝統ある和菓子の技を次世代に継承するための見習いプログラムです。経験豊富な職人の指導のもと、
          基礎から高度な技術まで段階的に学ぶことができます。
        </p>
        <div className="space-y-4">
          {programs.map((program) => (
            <div key={program.id} className="border border-green-200 rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer bg-green-50 hover:bg-green-100 transition-colors duration-200"
                onClick={() => toggleSection(program.id)}
              >
                <div className="flex items-center space-x-4">
                  {program.icon}
                  <h2 className="text-xl font-semibold text-green-800 font-yumin">{program.title}</h2>
                </div>
                {expandedSection === program.id ? (
                  <ChevronUp className="w-5 h-5 text-green-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-green-700" />
                )}
              </div>
              {expandedSection === program.id && (
                <div className="p-4 bg-white">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-green-700 mr-2" />
                    <p className="text-gray-600 font-yugoth">期間: {program.duration}</p>
                  </div>
                  <p className="text-gray-700 mb-4 font-yugoth">{program.description}</p>
                  <h3 className="text-lg font-semibold text-green-700 mb-2 font-yumin">習得スキル:</h3>
                  <ul className="list-disc list-inside text-gray-700 font-yugoth">
                    {program.skills.map((skill, index) => (
                      <li key={index} className="mb-1">{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 bg-green-50 rounded-lg p-6 border border-green-200">
          <h2 className="text-2xl font-bold text-green-800 mb-4 font-yumin">応募方法</h2>
          <p className="text-gray-700 mb-4 font-yugoth">
            見習いプログラムへの参加をご希望の方は、以下の情報を記入の上、お申し込みください。
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-green-700 font-semibold mb-2 font-yumin">
                お名前
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="山田 太郎"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-green-700 font-semibold mb-2 font-yumin">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label htmlFor="motivation" className="block text-green-700 font-semibold mb-2 font-yumin">
                志望動機
              </label>
              <textarea
                id="motivation"
                rows="4"
                className="w-full px-4 py-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="和菓子職人を目指す理由や抱負をお書きください"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-700 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 transition-colors duration-200 font-yumin"
            >
              応募する
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApprenticeshipProgram;