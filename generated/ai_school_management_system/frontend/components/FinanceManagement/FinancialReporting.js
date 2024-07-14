import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { DollarSign, TrendingUp, PieChart, BarChart2 } from 'react-feather';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const FinancialReporting = () => {
  const [revenueData, setRevenueData] = useState(null);
  const [expenseData, setExpenseData] = useState(null);
  const [profitData, setProfitData] = useState(null);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    // データ取得のためのAPI呼び出しをシミュレート
    fetchRevenueData();
    fetchExpenseData();
    fetchProfitData();
    fetchCourseData();
  }, []);

  const fetchRevenueData = () => {
    // シミュレートされたAPIレスポンス
    const data = {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      datasets: [
        {
          label: '収益',
          data: [1200000, 1500000, 1800000, 2000000, 2200000, 2500000],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
        },
      ],
    };
    setRevenueData(data);
  };

  const fetchExpenseData = () => {
    // シミュレートされたAPIレスポンス
    const data = {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      datasets: [
        {
          label: '支出',
          data: [800000, 900000, 1000000, 1100000, 1200000, 1300000],
          borderColor: '#F44336',
          backgroundColor: 'rgba(244, 67, 54, 0.2)',
        },
      ],
    };
    setExpenseData(data);
  };

  const fetchProfitData = () => {
    // シミュレートされたAPIレスポンス
    const data = {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      datasets: [
        {
          label: '利益',
          data: [400000, 600000, 800000, 900000, 1000000, 1200000],
          backgroundColor: ['#FF9800', '#2196F3', '#9C27B0', '#00BCD4', '#CDDC39', '#795548'],
        },
      ],
    };
    setProfitData(data);
  };

  const fetchCourseData = () => {
    // シミュレートされたAPIレスポンス
    const data = {
      labels: ['AI基礎', 'プログラミング', 'データ分析', 'ウェブ開発', 'モバイルアプリ'],
      datasets: [
        {
          label: 'コース別収益',
          data: [800000, 600000, 500000, 700000, 400000],
          backgroundColor: ['#E91E63', '#3F51B5', '#009688', '#FFC107', '#607D8B'],
        },
      ],
    };
    setCourseData(data);
  };

  // データがロードされるまで待機する
  if (!revenueData || !expenseData || !profitData || !courseData) {
    return <div>データをロード中...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-red-500 pb-2">財務報告</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 text-green-500" />
            収益推移
          </h2>
          <Line data={revenueData} options={{ responsive: true }} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 text-red-500" />
            支出推移
          </h2>
          <Line data={expenseData} options={{ responsive: true }} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <PieChart className="mr-2 text-purple-500" />
            月別利益
          </h2>
          <Doughnut data={profitData} options={{ responsive: true }} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 className="mr-2 text-blue-500" />
            コース別収益
          </h2>
          <Bar data={courseData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-4">財務サマリー</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-800">総収益</h3>
            <p className="text-2xl font-bold text-green-600">¥11,200,000</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-red-800">総支出</h3>
            <p className="text-2xl font-bold text-red-600">¥6,300,000</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800">純利益</h3>
            <p className="text-2xl font-bold text-blue-600">¥4,900,000</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-4">注目ポイント</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-gray-700">前月比で収益が15%増加しました。</li>
          <li className="text-gray-700">AI基礎コースが最も高い収益を上げています。</li>
          <li className="text-gray-700">支出の増加率が収益の増加率を下回っており、効率的な運営が行われています。</li>
          <li className="text-gray-700">新規開講のモバイルアプリコースは順調な滑り出しを見せています。</li>
        </ul>
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>© 2023 生成AI塾. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FinancialReporting;