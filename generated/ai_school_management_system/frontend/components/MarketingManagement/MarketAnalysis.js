import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from 'chart.js';
import { TrendingUp, Users, DollarSign, PieChart } from 'react-feather';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement);

const MarketAnalysis = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      // API呼び出しをシミュレート
      const response = await new Promise(resolve => setTimeout(() => resolve({
        revenue: 1000000,
        userGrowth: 25,
        marketShare: 15,
        competitorData: [
          { name: '競合A', share: 30 },
          { name: '競合B', share: 25 },
          { name: '自社', share: 15 },
          { name: 'その他', share: 30 },
        ],
        monthlyRevenue: [
          { month: '1月', revenue: 80000 },
          { month: '2月', revenue: 90000 },
          { month: '3月', revenue: 100000 },
          { month: '4月', revenue: 95000 },
          { month: '5月', revenue: 110000 },
          { month: '6月', revenue: 120000 },
        ],
      }), 1000));

      setMarketData(response);
      setLoading(false);
    } catch (err) {
      setError('データの取得に失敗しました');
      setLoading(false);
    }
  };

  const revenueChartData = {
    labels: marketData?.monthlyRevenue.map(item => item.month) || [],
    datasets: [
      {
        label: '月間売上',
        data: marketData?.monthlyRevenue.map(item => item.revenue) || [],
        borderColor: '#4B0082',
        backgroundColor: 'rgba(75, 0, 130, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const marketShareChartData = {
    labels: marketData?.competitorData.map(item => item.name) || [],
    datasets: [
      {
        data: marketData?.competitorData.map(item => item.share) || [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  if (loading) return <div className="flex justify-center items-center h-screen bg-gray-100">読み込み中...</div>;
  if (error) return <div className="flex justify-center items-center h-screen bg-gray-100 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-indigo-900 border-b-2 border-indigo-200 pb-2">市場分析ダッシュボード</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <DollarSign className="text-green-500 mr-4" size={24} />
          <div>
            <p className="text-sm text-gray-600">総売上</p>
            <p className="text-2xl font-bold text-indigo-900">{marketData.revenue.toLocaleString()}円</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <Users className="text-blue-500 mr-4" size={24} />
          <div>
            <p className="text-sm text-gray-600">ユーザー成長率</p>
            <p className="text-2xl font-bold text-indigo-900">{marketData.userGrowth}%</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <PieChart className="text-purple-500 mr-4" size={24} />
          <div>
            <p className="text-sm text-gray-600">市場シェア</p>
            <p className="text-2xl font-bold text-indigo-900">{marketData.marketShare}%</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <TrendingUp className="text-red-500 mr-4" size={24} />
          <div>
            <p className="text-sm text-gray-600">成長率</p>
            <p className="text-2xl font-bold text-indigo-900">12%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-indigo-900">月間売上推移</h2>
          <Line data={revenueChartData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: '月間売上推移',
              },
            },
          }} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-indigo-900">市場シェア分析</h2>
          <Doughnut data={marketShareChartData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
              title: {
                display: true,
                text: '市場シェア分析',
              },
            },
          }} />
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-900">競合分析</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-indigo-100">
                <th className="p-3">競合名</th>
                <th className="p-3">シェア</th>
                <th className="p-3">強み</th>
                <th className="p-3">弱み</th>
              </tr>
            </thead>
            <tbody>
              {marketData.competitorData.map((competitor, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-3">{competitor.name}</td>
                  <td className="p-3">{competitor.share}%</td>
                  <td className="p-3">{index === 2 ? 'AI技術' : '価格競争力'}</td>
                  <td className="p-3">{index === 2 ? 'ブランド認知度' : 'サービスの質'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;