import React, { useState, useEffect } from 'react';
import { Line, Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import { ArrowUpRight, ArrowDownRight, Activity, Users, Book, Award } from 'react-feather';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend);

const CourseEffectiveness = () => {
  const [courseData, setCourseData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    // 実際のアプリケーションではAPIからデータを取得します
    const fetchData = async () => {
      // APIコールをシミュレート
      setTimeout(() => {
        const mockData = {
          completionRate: 85,
          averageScore: 78,
          studentSatisfaction: 4.2,
          enrollmentGrowth: 15,
          skillImprovementAreas: ['問題解決', 'クリティカルシンキング', 'コミュニケーション', 'プログラミング', 'データ分析'],
          monthlyProgress: [65, 70, 72, 75, 78, 80, 82, 85],
          courseComparison: {
            'AIプログラミング基礎': 82,
            'データサイエンス入門': 75,
            '機械学習応用': 88,
            'ディープラーニング実践': 79
          }
        };
        setCourseData(mockData);
      }, 1000);
    };

    fetchData();
  }, [selectedCourse, timeRange]);

  if (!courseData) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
    </div>;
  }

  const lineChartData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
    datasets: [
      {
        label: '月間進捗',
        data: courseData.monthlyProgress,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const barChartData = {
    labels: Object.keys(courseData.courseComparison),
    datasets: [
      {
        label: 'コース比較',
        data: Object.values(courseData.courseComparison),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const radarChartData = {
    labels: courseData.skillImprovementAreas,
    datasets: [
      {
        label: 'スキル向上度',
        data: [4, 3, 5, 4, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-indigo-500 pb-2">コース効果分析</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="mr-4">
            <Activity className="text-indigo-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">修了率</p>
            <p className="text-2xl font-bold text-gray-800">{courseData.completionRate}%</p>
          </div>
          <div className="ml-auto">
            <ArrowUpRight className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="mr-4">
            <Award className="text-indigo-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">平均スコア</p>
            <p className="text-2xl font-bold text-gray-800">{courseData.averageScore}</p>
          </div>
          <div className="ml-auto">
            <ArrowUpRight className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="mr-4">
            <Users className="text-indigo-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">受講者満足度</p>
            <p className="text-2xl font-bold text-gray-800">{courseData.studentSatisfaction}/5</p>
          </div>
          <div className="ml-auto">
            <ArrowUpRight className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="mr-4">
            <Book className="text-indigo-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">受講者増加率</p>
            <p className="text-2xl font-bold text-gray-800">{courseData.enrollmentGrowth}%</p>
          </div>
          <div className="ml-auto">
            <ArrowDownRight className="text-red-500" size={24} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">月間進捗</h2>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">コース比較</h2>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">スキル向上度</h2>
        <div className="w-full max-w-md mx-auto">
          <Radar data={radarChartData} options={{ responsive: true }} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">分析レポート</h2>
        <p className="text-gray-700 mb-4">
          当コースは全体的に良好な成果を示しています。修了率は85%と高く、受講者の平均スコアも78点と良好です。
          特に「問題解決」と「プログラミング」のスキル向上が顕著であり、これらの分野でのカリキュラムの効果が確認できます。
          一方で、受講者増加率が15%とやや低迷しているため、マーケティング戦略の見直しが必要かもしれません。
        </p>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300">
          詳細レポートを表示
        </button>
      </div>
    </div>
  );
};

export default CourseEffectiveness;