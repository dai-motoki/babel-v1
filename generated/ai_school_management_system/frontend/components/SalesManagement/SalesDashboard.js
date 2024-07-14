import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { FiBarChart2, FiPieChart, FiTrendingUp, FiCalendar } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const SalesDashboard = () => {
  const [salesData, setSalesData] = useState({
    daily: [],
    monthly: [],
    yearly: [],
    courseTypes: [],
  });

  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  useEffect(() => {
    // Simulated API call to fetch sales data
    const fetchSalesData = async () => {
      // In a real application, this would be an API call
      const response = await new Promise(resolve => setTimeout(() => resolve({
        daily: [150, 220, 180, 240, 200, 250, 190],
        monthly: [5000, 6000, 5500, 7000, 6500, 7500, 8000],
        yearly: [80000, 95000, 110000, 125000],
        courseTypes: [
          { name: 'ビジネス', sales: 45000 },
          { name: 'クリエイター', sales: 35000 },
          { name: 'エンジニア', sales: 50000 },
        ],
      }), 1000));
      setSalesData(response);
    };

    fetchSalesData();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '売上推移',
      },
    },
  };

  const barChartData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    datasets: [
      {
        label: '月間売上',
        data: salesData.monthly,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const lineChartData = {
    labels: ['2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: '年間売上',
        data: salesData.yearly,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const pieChartData = {
    labels: salesData.courseTypes.map(course => course.name),
    datasets: [
      {
        data: salesData.courseTypes.map(course => course.sales),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">販売ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiBarChart2 className="mr-2" />
            総売上
          </h2>
          <p className="text-3xl font-bold text-indigo-600">¥1,250,000</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiPieChart className="mr-2" />
            新規顧客
          </h2>
          <p className="text-3xl font-bold text-green-600">128</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiTrendingUp className="mr-2" />
            成長率
          </h2>
          <p className="text-3xl font-bold text-blue-600">15.8%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiCalendar className="mr-2" />
            期間
          </h2>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="daily">日次</option>
            <option value="monthly">月次</option>
            <option value="yearly">年次</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">月間売上推移</h2>
          <Bar options={chartOptions} data={barChartData} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">年間売上推移</h2>
          <Line options={chartOptions} data={lineChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">コース別売上比率</h2>
          <Pie data={pieChartData} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">売上トップ5コース</h2>
          <ul className="space-y-4">
            {['AIビジネス戦略', 'データサイエンス基礎', 'クリエイティブAI活用', 'AIプログラミング入門', 'AI倫理と社会'].map((course, index) => (
              <li key={index} className="flex items-center justify-between border-b pb-2">
                <span className="text-lg">{course}</span>
                <span className="text-lg font-semibold text-indigo-600">¥{(Math.random() * 100000).toFixed(0)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;