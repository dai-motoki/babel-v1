import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Users, Target, Award, Zap, DollarSign, Globe, Briefcase } from 'lucide-react';

const CompetitiveAnalysis = () => {
  const [selectedMetric, setSelectedMetric] = useState('marketShare');

  // モックデータ（実際のプロジェクトでは、より詳細で正確なデータを使用します）
  const competitorData = [
    { name: '自社', marketShare: 28, customerSatisfaction: 85, productInnovation: 90, brandStrength: 75, revenue: 1200, globalPresence: 65, employeeCount: 5000 },
    { name: '競合A', marketShare: 32, customerSatisfaction: 82, productInnovation: 88, brandStrength: 80, revenue: 1500, globalPresence: 70, employeeCount: 6000 },
    { name: '競合B', marketShare: 25, customerSatisfaction: 78, productInnovation: 85, brandStrength: 70, revenue: 1000, globalPresence: 60, employeeCount: 4500 },
    { name: '競合C', marketShare: 15, customerSatisfaction: 75, productInnovation: 80, brandStrength: 65, revenue: 800, globalPresence: 50, employeeCount: 3000 },
  ];

  const metrics = [
    { key: 'marketShare', name: '市場シェア', color: '#8884d8', icon: <TrendingUp /> },
    { key: 'customerSatisfaction', name: '顧客満足度', color: '#82ca9d', icon: <Users /> },
    { key: 'productInnovation', name: '製品革新性', color: '#ffc658', icon: <Target /> },
    { key: 'brandStrength', name: 'ブランド力', color: '#ff7300', icon: <Award /> },
    { key: 'revenue', name: '売上高', color: '#0088FE', icon: <DollarSign /> },
    { key: 'globalPresence', name: 'グローバル展開', color: '#00C49F', icon: <Globe /> },
    { key: 'employeeCount', name: '従業員数', color: '#FFBB28', icon: <Briefcase /> },
  ];

  const radarData = competitorData.map(competitor => ({
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
    <div className="p-6 bg-white rounded-lg shadow-lg text-black">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">高度競合分析ダッシュボード</h2>
      
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
            <BarChart data={competitorData}>
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

      <div className="mt-8">
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
          <li className="flex items-start">
            <Target className="h-6 w-6 mr-3 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold">製品革新の加速と市場創造</h4>
              <p>業界をリードする製品革新性をさらに強化し、新たな市場を創造します：</p>
              <ul className="list-disc ml-5 mt-2">
                <li>オープンイノベーションプラットフォームの立ち上げと、スタートアップとの戦略的提携</li>
                <li>社内イノベーションラボの設立と、従業員のアイデアを製品化するプロセスの確立</li>
                <li>持続可能性と環境配慮を核とした次世代製品ラインの開発</li>
              </ul>
            </div>
          </li>
          <li className="flex items-start">
            <Award className="h-6 w-6 mr-3 text-purple-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold">ブランド力の戦略的強化</h4>
              <p>競合Aに次ぐブランド力を持っていますが、さらなる強化を図ります：</p>
              <ul className="list-disc ml-5 mt-2">
                <li>社会的責任（CSR）活動の強化と、その効果的な広報戦略の展開</li>
                <li>インフルエンサーマーケティングとユーザー生成コンテンツ（UGC）の戦略的活用</li>
                <li>ブランドストーリーを中心としたエモーショナルマーケティングキャンペーンの展開</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">即時アクションプラン</h3>
        <ol className="list-decimal pl-5 space-y-2 text-blue-700">
          <li>クロスファンクショナルな「イノベーション・タスクフォース」を結成し、週次で革新的アイデアを生成・評価する</li>
          <li>AIを活用したリアルタイム顧客フィードバック分析システムを導入し、製品改善サイクルを短縮する</li>
          <li>グローバル展開を加速するため、主要新興市場ごとにローカライゼーションチームを編成する</li>
          <li>持続可能性をテーマにしたブランドキャンペーンを立ち上げ、社会的責任を前面に押し出す</li>
          <li>従業員エンゲージメントプログラムを刷新し、イノベーションと顧客中心主義の文化を全社的に強化する</li>
        </ol>
      </div>
    </div>
  );
};

export default CompetitiveAnalysis;
