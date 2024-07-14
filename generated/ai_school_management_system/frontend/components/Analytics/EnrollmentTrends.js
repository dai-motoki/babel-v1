import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Calendar, TrendingUp, Users, BookOpen } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const EnrollmentTrends = () => {
  const [enrollmentData, setEnrollmentData] = useState({
    labels: [],
    datasets: [],
  });

  const [coursePopularity, setCoursePopularity] = useState({
    labels: [],
    datasets: [],
  });

  const [ageDistribution, setAgeDistribution] = useState({
    labels: [],
    datasets: [],
  });

  const [educationDistribution, setEducationDistribution] = useState({
    labels: [],
    datasets: [],
  });

  const [selectedTimeFrame, setSelectedTimeFrame] = useState('yearly');
  const [selectedCourse, setSelectedCourse] = useState('all');

  useEffect(() => {
    // 実際のアプリケーションではAPIからデータを取得します
    const fetchData = async () => {
      // ダミーデータ
      const data = {
        yearly: {
          labels: ['2019', '2020', '2021', '2022', '2023'],
          datasets: [
            {
              label: '入学者数',
              data: [120, 150, 180, 210, 250],
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        monthly: {
          labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          datasets: [
            {
              label: '入学者数',
              data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
      };

      setEnrollmentData(data[selectedTimeFrame]);

      const courseData = {
        labels: ['AI基礎', 'プログラミング入門', 'データ分析', 'ウェブ開発', '機械学習'],
        datasets: [
          {
            label: '受講者数',
            data: [300, 250, 200, 180, 150],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
          },
        ],
      };

      setCoursePopularity(courseData);

      const ageData = {
        labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
        datasets: [
          {
            data: [30, 40, 15, 10, 5],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
          },
        ],
      };

      setAgeDistribution(ageData);

      const educationData = {
        labels: ['高校卒', '専門学校卒', '大学卒', '大学院卒', 'その他'],
        datasets: [
          {
            data: [20, 15, 40, 20, 5],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
          },
        ],
      };

      setEducationDistribution(educationData);
    };

    fetchData();
  }, [selectedTimeFrame]);

  const handleTimeFrameChange = (timeFrame) => {
    setSelectedTimeFrame(timeFrame);
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    // 実際のアプリケーションでは、選択されたコースに基づいてデータをフィルタリングします
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-red-500 pb-2">入学傾向分析</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">入学者数推移</h2>
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-full ${selectedTimeFrame === 'yearly' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            onClick={() => handleTimeFrameChange('yearly')}
          >
            年別
          </button>
          <button
            className={`px-4 py-2 rounded-full ${selectedTimeFrame === 'monthly' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            onClick={() => handleTimeFrameChange('monthly')}
          >
            月別
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Line data={enrollmentData} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">コース別人気度</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar data={coursePopularity} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-red-500" />
            最近の入学傾向
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              <span>前年比20%増加</span>
            </li>
            <li className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-500" />
              <span>女性受講者の割合が10%上昇</span>
            </li>
            <li className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-purple-500" />
              <span>AI基礎コースの人気が急上昇</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">地域別入学者数</h3>
          <div className="h-64">
            <Pie data={coursePopularity} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">詳細分析</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="courseSelect" className="block text-sm font-medium text-gray-700">コース選択:</label>
            <select
              id="courseSelect"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              value={selectedCourse}
              onChange={(e) => handleCourseChange(e.target.value)}
            >
              <option value="all">全てのコース</option>
              <option value="ai">AI基礎</option>
              <option value="programming">プログラミング入門</option>
              <option value="data">データ分析</option>
              <option value="web">ウェブ開発</option>
              <option value="ml">機械学習</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">年齢分布</h4>
              <div className="h-40">
                <Doughnut data={ageDistribution} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">学歴分布</h4>
              <div className="h-40">
                <Doughnut data={educationDistribution} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentTrends;