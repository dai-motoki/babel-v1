import React, { useState, useEffect } from 'react';
import { Star, Calendar, ChevronDown, ChevronUp, BarChart2, User, Book, Users, Clock, Award, Zap } from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const PerformanceEvaluation = () => {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    // 講師データのフェッチを模擬
    const fetchInstructors = async () => {
      // APIからのデータ取得をシミュレート
      const mockInstructors = [
        { id: 1, name: '山田太郎', subject: 'AI基礎', image: 'https://example.com/yamada.jpg' },
        { id: 2, name: '佐藤花子', subject: '機械学習', image: 'https://example.com/sato.jpg' },
        { id: 3, name: '鈴木一郎', subject: 'ディープラーニング', image: 'https://example.com/suzuki.jpg' },
      ];
      setInstructors(mockInstructors);
    };
    fetchInstructors();
  }, []);

  useEffect(() => {
    if (selectedInstructor) {
      // 評価データのフェッチを模擬
      const fetchEvaluations = async () => {
        // APIからのデータ取得をシミュレート
        const mockEvaluations = [
          { id: 1, rating: 4.5, date: '2023-06-01', comment: '非常にわかりやすい講義でした。' },
          { id: 2, rating: 5, date: '2023-06-15', comment: '実践的な内容で大変勉強になりました。' },
          { id: 3, rating: 4, date: '2023-06-30', comment: '質問への対応が丁寧で良かったです。' },
        ];
        setEvaluations(mockEvaluations);

        // パフォーマンスデータのフェッチを模擬
        const mockPerformanceData = {
          labels: ['教授力', '知識', '学生対応', '時間管理', '革新性', 'モチベーション'],
          datasets: [{
            label: 'パフォーマンス評価',
            data: [4.5, 5, 4.2, 4.8, 4.3, 4.7],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        };
        setPerformanceData(mockPerformanceData);
      };
      fetchEvaluations();
    }
  }, [selectedInstructor]);

  const handleInstructorSelect = (instructor) => {
    setSelectedInstructor(instructor);
    setShowChart(false);
  };

  const calculateAverageRating = () => {
    if (evaluations.length === 0) return 0;
    const sum = evaluations.reduce((acc, evaluation) => acc + evaluation.rating, 0);
    return (sum / evaluations.length).toFixed(1);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-red-500 pb-2">
        講師評価システム
      </h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">講師選択</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className={`p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
                selectedInstructor?.id === instructor.id
                  ? 'bg-red-100 border-2 border-red-500'
                  : 'bg-white hover:bg-red-50'
              }`}
              onClick={() => handleInstructorSelect(instructor)}
            >
              <div className="flex items-center mb-2">
                <img src={instructor.image} alt={instructor.name} className="w-12 h-12 rounded-full mr-4" />
                <span className="font-medium text-gray-800">{instructor.name}</span>
              </div>
              <p className="text-sm text-gray-600">{instructor.subject}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedInstructor && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
            <User className="mr-2" />
            {selectedInstructor.name}の評価
          </h2>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 mr-2" />
            <span className="text-3xl font-bold text-gray-800">{calculateAverageRating()}</span>
            <span className="text-gray-600 ml-2">/ 5.0</span>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
            onClick={() => setShowChart(!showChart)}
          >
            {showChart ? 'グラフを隠す' : 'グラフを表示'}
            {showChart ? <ChevronUp className="inline ml-2" /> : <ChevronDown className="inline ml-2" />}
          </button>
          {showChart && performanceData && (
            <div className="mt-4">
              <Radar data={performanceData} options={{
                scales: {
                  r: {
                    angleLines: {
                      display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 5
                  }
                }
              }} />
            </div>
          )}
        </div>
      )}

      {selectedInstructor && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">評価一覧</h3>
          <div className="space-y-4">
            {evaluations.map((evaluation) => (
              <div key={evaluation.id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`${evaluation.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 flex items-center">
                    <Calendar className="mr-1" size={16} />
                    {evaluation.date}
                  </span>
                </div>
                <p className="text-gray-700">{evaluation.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedInstructor && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Book className="mr-2 text-blue-500" />
              担当コース
            </h3>
            <ul className="list-disc list-inside">
              <li>AI基礎講座</li>
              <li>機械学習入門</li>
              <li>ディープラーニング実践</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="mr-2 text-green-500" />
              学生満足度
            </h3>
            <div className="text-3xl font-bold text-green-600">95%</div>
            <p className="text-sm text-gray-600">過去3ヶ月の平均</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="mr-2 text-purple-500" />
              講義時間
            </h3>
            <div className="text-3xl font-bold text-purple-600">120時間</div>
            <p className="text-sm text-gray-600">今年度累計</p>
          </div>
        </div>
      )}

      {selectedInstructor && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="mr-2 text-yellow-500" />
            受賞歴
          </h3>
          <ul className="list-disc list-inside">
            <li>2023年度 優秀講師賞</li>
            <li>2022年度 イノベーション教育賞</li>
            <li>2021年度 学生支援特別賞</li>
          </ul>
        </div>
      )}

      {selectedInstructor && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2 text-orange-500" />
            改善提案
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>実践的な演習をさらに増やすことで、学生の理解度向上が期待できます。</li>
            <li>最新のAI技術トレンドを取り入れた講義内容の更新が推奨されます。</li>
            <li>オンラインでのインタラクティブな質問対応システムの導入を検討してください。</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PerformanceEvaluation;