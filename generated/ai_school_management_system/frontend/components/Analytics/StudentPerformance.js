import React, { useState, useEffect } from 'react';
import { Line, Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import { ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend);

const StudentPerformance = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // APIコールをシミュレートして学生のパフォーマンスデータを取得
    const fetchData = async () => {
      setLoading(true);
      // 実際のAPIコールに置き換える
      const response = await new Promise(resolve => setTimeout(() => resolve({
        student: { id: 1, name: '山田 花子' },
        scores: [85, 90, 78, 92, 88],
        attendance: 95,
        skillsProgress: [80, 75, 90, 85, 70],
        learningTrend: [70, 75, 80, 85, 90]
      }), 1000));
      setSelectedStudent(response.student);
      setPerformanceData(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  const lineChartData = {
    labels: ['1月', '2月', '3月', '4月', '5月'],
    datasets: [{
      label: '学習進捗',
      data: performanceData?.learningTrend || [],
      borderColor: '#4B0082',
      backgroundColor: 'rgba(75, 0, 130, 0.2)',
    }]
  };

  const barChartData = {
    labels: ['テスト1', 'テスト2', 'テスト3', 'テスト4', 'テスト5'],
    datasets: [{
      label: 'テストスコア',
      data: performanceData?.scores || [],
      backgroundColor: '#8A2BE2',
    }]
  };

  const radarChartData = {
    labels: ['プログラミング', 'デザイン', 'データ分析', 'プレゼンテーション', 'チームワーク'],
    datasets: [{
      label: 'スキル進捗',
      data: performanceData?.skillsProgress || [],
      backgroundColor: 'rgba(138, 43, 226, 0.2)',
      borderColor: '#8A2BE2',
      pointBackgroundColor: '#4B0082',
    }]
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-purple-500 pb-2">学生パフォーマンス分析</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">{selectedStudent?.name}</h2>
          <div className="relative">
            <select className="appearance-none bg-purple-100 border border-purple-300 text-purple-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
              <option>過去30日</option>
              <option>過去3ヶ月</option>
              <option>過去6ヶ月</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">平均スコア</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-purple-800">{Math.round(performanceData?.scores.reduce((a, b) => a + b, 0) / performanceData?.scores.length)}</span>
              <ArrowUp className="h-5 w-5 text-green-500 ml-2" />
              <span className="text-sm text-green-500 ml-1">5%</span>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">出席率</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-purple-800">{performanceData?.attendance}%</span>
              <ArrowDown className="h-5 w-5 text-red-500 ml-2" />
              <span className="text-sm text-red-500 ml-1">2%</span>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">スキル向上度</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-purple-800">{Math.round(performanceData?.skillsProgress.reduce((a, b) => a + b, 0) / performanceData?.skillsProgress.length)}%</span>
              <ArrowUp className="h-5 w-5 text-green-500 ml-2" />
              <span className="text-sm text-green-500 ml-1">8%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">学習進捗</h3>
            <Line data={lineChartData} options={{ responsive: true }} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">テストスコア</h3>
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">スキル進捗</h3>
          <div className="bg-white p-4 rounded-lg shadow">
            <Radar data={radarChartData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">推奨学習パス</h3>
          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <ul className="list-disc list-inside text-purple-700">
              <li>データ構造とアルゴリズムの応用コースを受講する</li>
              <li>UIデザインワークショップに参加する</li>
              <li>チームプロジェクトでリーダーシップを発揮する機会を探す</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">個別フィードバック</h2>
        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <p className="text-purple-700">
            山田さんは全体的に素晴らしい進歩を遂げています。特にプログラミングとデータ分析のスキルが顕著に向上しています。
            今後は、チームワークとプレゼンテーションスキルの向上に焦点を当てることをお勧めします。
            また、出席率が若干低下しているので、この点に注意を払う必要があります。
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentPerformance;