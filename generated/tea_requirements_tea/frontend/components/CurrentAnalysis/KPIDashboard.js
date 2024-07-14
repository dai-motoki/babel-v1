import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Loader2, AlertCircle, TrendingUp, Users, Target, Award, Zap, DollarSign, Globe, Briefcase } from 'lucide-react';

// KPIカードコンポーネント
const KPICard = ({ title, value, unit, icon, color }) => (
  <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 border-${color}-500`}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
      <span className="text-3xl">{icon}</span>
    </div>
    <p className={`text-3xl font-bold text-${color}-600`}>
      {value.toLocaleString()} {unit}
    </p>
  </div>
);

// KPIダッシュボードコンポーネント
const KPIDashboard = () => {
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('marketShare');

  useEffect(() => {
    fetchKPIData();
  }, []);

  // モックKPIデータを生成する関数
  const generateMockKPIData = () => {
    const currentDate = new Date();
    const salesTrend = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        value: Math.floor(Math.random() * 100000) + 50000
      };
    }).reverse();

    const competitorData = [
      { name: '自社', marketShare: 28, customerSatisfaction: 85, productInnovation: 90, brandStrength: 75, revenue: 1200, globalPresence: 65, employeeCount: 5000 },
      { name: '競合A', marketShare: 32, customerSatisfaction: 82, productInnovation: 88, brandStrength: 80, revenue: 1500, globalPresence: 70, employeeCount: 6000 },
      { name: '競合B', marketShare: 25, customerSatisfaction: 78, productInnovation: 85, brandStrength: 70, revenue: 1000, globalPresence: 60, employeeCount: 4500 },
      { name: '競合C', marketShare: 15, customerSatisfaction: 75, productInnovation: 80, brandStrength: 65, revenue: 800, globalPresence: 50, employeeCount: 3000 },
    ];

    return {
      revenue: Math.floor(Math.random() * 10000000) + 5000000,
      customers: Math.floor(Math.random() * 10000) + 5000,
      averageOrderValue: Math.floor(Math.random() * 10000) + 5000,
      repeatRate: Math.floor(Math.random() * 30) + 70,
      salesTrend,
      competitorData
    };
  };

  // KPIデータを取得する関数
  const fetchKPIData = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        const mockData = generateMockKPIData();
        setKpiData(mockData);
        setLoading(false);
      } catch (err) {
        setError('KPIデータの生成に失敗しました。');
        setLoading(false);
      }
    }, 1000); // 1秒のディレイを追加してローディング状態を表示
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
        <p className="ml-4 text-xl font-semibold text-gray-800">データを読み込んでいます...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white border-l-4 border-red-500 text-gray-800 p-6 rounded-md shadow-lg max-w-lg" role="alert">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-8 w-8 mr-4 text-red-500" />
            <h2 className="text-2xl font-bold text-red-700">エラーが発生しました</h2>
          </div>
          <p className="text-lg mb-4">{error}</p>
          <button
            onClick={fetchKPIData}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  // kpiDataがnullの場合、ローディング表示を返す
  if (!kpiData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
        <p className="ml-4 text-xl font-semibold text-gray-800">データを準備中です...</p>
      </div>
    );
  }

  const metrics = [
    { key: 'marketShare', name: '市場シェア', color: '#8884d8', icon: <TrendingUp /> },
    { key: 'customerSatisfaction', name: '顧客満足度', color: '#82ca9d', icon: <Users /> },
    { key: 'productInnovation', name: '製品革新性', color: '#ffc658', icon: <Target /> },
    { key: 'brandStrength', name: 'ブランド力', color: '#ff7300', icon: <Award /> },
    { key: 'revenue', name: '売上高', color: '#0088FE', icon: <DollarSign /> },
    { key: 'globalPresence', name: 'グローバル展開', color: '#00C49F', icon: <Globe /> },
    { key: 'employeeCount', name: '従業員数', color: '#FFBB28', icon: <Briefcase /> },
  ];

  const radarData = kpiData.competitorData.map(competitor => ({
    subject: competitor.name,
    marketShare: competitor.marketShare,
    customerSatisfaction: competitor.customerSatisfaction,
    productInnovation: competitor.productInnovation,
    brandStrength: competitor.brandStrength,
    revenue: competitor.revenue / 15, // スケール調整
    globalPresence: competitor.globalPresence,
    employeeCount: competitor.employeeCount / 50, // スケール調整
  }));

  return (
    <div className="p-8 bg-gray-100 text-gray-800 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-blue-700 border-b-4 border-blue-500 pb-4">KPIダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <KPICard title="売上高" value={kpiData.revenue} unit="円" icon="📈" color="blue" />
        <KPICard title="顧客数" value={kpiData.customers} unit="人" icon="👥" color="green" />
        <KPICard title="平均注文額" value={kpiData.averageOrderValue} unit="円" icon="💰" color="yellow" />
        <KPICard title="リピート率" value={kpiData.repeatRate} unit="%" icon="🔄" color="purple" />
      </div>

      <div className="bg-white p-8 rounded-xl shadow-2xl mb-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">売上トレンド</h2>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={kpiData.salesTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" stroke="#333" tickFormatter={(tick) => new Date(tick).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })} />
            <YAxis stroke="#333" tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
              labelStyle={{ fontWeight: 'bold', color: '#333' }}
              formatter={(value) => [`¥${value.toLocaleString()}`, '売上']}
              labelFormatter={(label) => new Date(label).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="value" name="売上" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-2xl mb-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">競合分析</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">分析指標の選択</h3>
          <div className="flex flex-wrap gap-2">
            {metrics.map((metric) => (
              <button
                key={metric.key}
                onClick={() => setSelectedMetric(metric.key)}
                className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                  selectedMetric === metric.key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {React.cloneElement(metric.icon, { className: 'mr-2 h-4 w-4' })}
                {metric.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">棒グラフ分析</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={kpiData.competitorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', color: 'black' }} />
                <Legend />
                <Bar 
                  dataKey={selectedMetric} 
                  fill={metrics.find(m => m.key === selectedMetric).color} 
                  name={metrics.find(m => m.key === selectedMetric).name} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">レーダーチャート分析</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                {metrics.map((metric) => (
                  <Radar key={metric.key} name={metric.name} dataKey={metric.key} stroke={metric.color} fill={metric.color} fillOpacity={0.6} />
                ))}
                <Legend />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', color: 'black' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-2xl">
        <h3 className="text-2xl font-semibold mb-4">戦略的洞察と行動計画</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <Zap className="h-6 w-6 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold">市場シェアの戦略的拡大</h4>
              <p>現在、競合Aに次ぐ第2位の市場シェアを獲得していますが、さらなる成長の余地があります。以下の戦略を実施しましょう：</p>
              <ul className="list-disc ml-5 mt-2">
                <li>新興市場への積極的な展開と、そこでのローカライズ戦略の強化</li>
                <li>顧客セグメント別のターゲットマーケティングキャンペーンの展開</li>
                <li>競合Aの顧客を引き付けるための差別化戦略の策定と実行</li>
              </ul>
            </div>
          </li>
          <li className="flex items-start">
            <Users className="h-6 w-6 mr-3 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold">顧客満足度の革新的向上</h4>
              <p>業界トップの顧客満足度を誇っていますが、さらなる向上を目指します：</p>
              <ul className="list-disc ml-5 mt-2">
                <li>AI駆動のパーソナライズされたカスタマーエクスペリエンスの導入</li>
                <li>24/7リアルタイムサポートシステムの強化と多言語対応の拡充</li>
                <li>顧客フィードバックを製品開発サイクルに直接統合するプロセスの確立</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default KPIDashboard;
