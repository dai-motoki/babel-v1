import React, { useState, useEffect } from 'react';
import { ArrowRight, Book, Briefcase, Calendar, ChevronDown, MessageSquare, User } from 'lucide-react';

const CareerCounseling = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [counselingHistory, setCounselingHistory] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // APIコールのシミュレーション
    fetchCounselingHistory();
    fetchUpcomingSessions();
    fetchResources();
  }, []);

  const fetchCounselingHistory = () => {
    // シミュレートされたAPIコール
    const history = [
      { id: 1, date: '2023-05-15', topic: 'キャリアパス計画' },
      { id: 2, date: '2023-06-02', topic: '履歴書作成' },
      { id: 3, date: '2023-06-20', topic: '面接テクニック' },
    ];
    setCounselingHistory(history);
  };

  const fetchUpcomingSessions = () => {
    // シミュレートされたAPIコール
    const sessions = [
      { id: 1, date: '2023-07-10', time: '14:00', counselor: '田中 優希' },
      { id: 2, date: '2023-07-25', time: '10:30', counselor: '鈴木 花' },
    ];
    setUpcomingSessions(sessions);
  };

  const fetchResources = () => {
    // シミュレートされたAPIコール
    const resourceList = [
      { id: 1, title: 'AI業界のキャリアトレンド2023', type: 'PDF' },
      { id: 2, title: '面接準備ガイド', type: 'ビデオ' },
      { id: 3, title: 'IT業界でのネットワーキング', type: '記事' },
    ];
    setResources(resourceList);
  };

  const careerPaths = [
    { id: 1, name: 'AIエンジニア', description: 'AIソリューションの開発と実装' },
    { id: 2, name: 'データサイエンティスト', description: '複雑なデータの分析と解釈' },
    { id: 3, name: '機械学習スペシャリスト', description: '機械学習モデルの設計と開発' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-indigo-900 border-b-2 border-indigo-500 pb-2">キャリアカウンセリング</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-800">キャリアパス選択</h2>
          <div className="space-y-4">
            {careerPaths.map((path) => (
              <div
                key={path.id}
                className={`p-4 border rounded-md cursor-pointer transition-all duration-300 ${
                  selectedPath === path.id
                    ? 'bg-indigo-100 border-indigo-500'
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
                onClick={() => setSelectedPath(path.id)}
              >
                <h3 className="text-lg font-medium text-indigo-700">{path.name}</h3>
                <p className="text-gray-600 mt-1">{path.description}</p>
              </div>
            ))}
          </div>
          <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center">
            詳細を見る
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-800">カウンセリング履歴</h2>
          <div className="space-y-4">
            {counselingHistory.map((session) => (
              <div key={session.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="text-indigo-600 font-medium">{session.topic}</p>
                  <p className="text-sm text-gray-500">{session.date}</p>
                </div>
                <button className="text-indigo-500 hover:text-indigo-700">
                  <MessageSquare className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-800">次回のセッション</h2>
          {upcomingSessions.map((session) => (
            <div key={session.id} className="mb-4 p-4 border border-indigo-200 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-indigo-700">{session.date}</p>
                  <p className="text-gray-600">{session.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-indigo-600">{session.counselor}</p>
                  <button className="mt-2 text-sm text-white bg-indigo-500 px-3 py-1 rounded-full hover:bg-indigo-600 transition-colors duration-300">
                    予約変更
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-800">キャリアリソース</h2>
          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  {resource.type === 'PDF' && <Book className="h-5 w-5 text-red-500 mr-2" />}
                  {resource.type === 'ビデオ' && <Calendar className="h-5 w-5 text-green-500 mr-2" />}
                  {resource.type === '記事' && <Briefcase className="h-5 w-5 text-blue-500 mr-2" />}
                  <span className="text-gray-700">{resource.title}</span>
                </div>
                <button className="text-indigo-500 hover:text-indigo-700">閲覧</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-800">AI キャリアアドバイザー</h2>
        <div className="border-2 border-indigo-200 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
              AI
            </div>
            <div>
              <h3 className="text-lg font-medium text-indigo-700">AIアシスタント</h3>
              <p className="text-sm text-gray-500">24時間対応可能</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            キャリアに関する質問や悩みがありましたら、いつでもお気軽にご相談ください。
            AIが最適なアドバイスを提供いたします。
          </p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center">
            AIに相談する
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerCounseling;