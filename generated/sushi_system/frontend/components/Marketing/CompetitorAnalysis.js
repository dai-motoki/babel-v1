import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Map, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const CompetitorAnalysis = () => {
  const [competitors, setCompetitors] = useState([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 競合他社データのモック
    const mockCompetitors = [
      { id: 1, name: '鮨匠 海乃家', rating: 4.8, avgPrice: 12000, popularity: 95, distance: 0.5 },
      { id: 2, name: '江戸前 寿司太郎', rating: 4.5, avgPrice: 10000, popularity: 88, distance: 1.2 },
      { id: 3, name: '板前寿司 匠', rating: 4.7, avgPrice: 15000, popularity: 92, distance: 0.8 },
      { id: 4, name: '回転寿司 海鮮丸', rating: 4.2, avgPrice: 3000, popularity: 78, distance: 1.5 },
      { id: 5, name: '築地 寿司善', rating: 4.6, avgPrice: 13000, popularity: 90, distance: 1.0 },
    ];

    setTimeout(() => {
      setCompetitors(mockCompetitors);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCompetitorSelect = (competitor) => {
    setSelectedCompetitor(competitor);
  };

  const chartData = competitors.map(comp => ({
    name: comp.name,
    評価: comp.rating * 20,
    人気度: comp.popularity,
    平均価格: comp.avgPrice / 1000,
  }));

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 font-yuji">競合分析ダッシュボード</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#003366]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-[#003366] mb-4 font-yuji">競合他社リスト</h2>
            <ul className="space-y-4">
              {competitors.map((comp) => (
                <li
                  key={comp.id}
                  className={`p-4 rounded-md cursor-pointer transition-all duration-300 ${
                    selectedCompetitor === comp ? 'bg-[#003366] text-white' : 'bg-[#E5DCC3] hover:bg-[#003366] hover:text-white'
                  }`}
                  onClick={() => handleCompetitorSelect(comp)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{comp.name}</span>
                    <span className="text-sm">{comp.distance}km</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            {selectedCompetitor ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#003366] mb-4 font-yuji">{selectedCompetitor.name} の詳細分析</h2>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center bg-[#E5DCC3] p-4 rounded-md">
                    <Users className="text-[#003366] mr-4" size={24} />
                    <div>
                      <p className="text-sm text-[#4A2311]">評価</p>
                      <p className="text-xl font-bold text-[#003366]">{selectedCompetitor.rating} / 5.0</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-[#E5DCC3] p-4 rounded-md">
                    <DollarSign className="text-[#003366] mr-4" size={24} />
                    <div>
                      <p className="text-sm text-[#4A2311]">平均価格</p>
                      <p className="text-xl font-bold text-[#003366]">{selectedCompetitor.avgPrice.toLocaleString()}円</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-[#E5DCC3] p-4 rounded-md">
                    <TrendingUp className="text-[#003366] mr-4" size={24} />
                    <div>
                      <p className="text-sm text-[#4A2311]">人気度</p>
                      <p className="text-xl font-bold text-[#003366]">{selectedCompetitor.popularity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-[#E5DCC3] p-4 rounded-md">
                    <Map className="text-[#003366] mr-4" size={24} />
                    <div>
                      <p className="text-sm text-[#4A2311]">距離</p>
                      <p className="text-xl font-bold text-[#003366]">{selectedCompetitor.distance}km</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#E5DCC3] p-4 rounded-md mb-8">
                  <h3 className="text-lg font-semibold text-[#003366] mb-2 font-yuji">戦略提案</h3>
                  <p className="text-[#4A2311]">
                    {selectedCompetitor.name}は{selectedCompetitor.rating >= 4.5 ? '高評価' : '平均的な評価'}を得ています。
                    {selectedCompetitor.avgPrice > 10000
                      ? '高価格帯でのサービス提供が特徴です。品質と独自性を強調することで差別化を図りましょう。'
                      : '比較的手頃な価格設定です。コストパフォーマンスを訴求しつつ、品質向上に努めることで競争力を高められます。'}
                    また、距離が{selectedCompetitor.distance}kmと{selectedCompetitor.distance <= 1 ? '近い' : 'やや離れている'}ため、
                    {selectedCompetitor.distance <= 1 ? '直接的な競合として注視が必要です。' : '地域特性の違いを活かしたマーケティングが有効かもしれません。'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center h-full">
                <p className="text-xl text-[#4A2311]">競合他社を選択してください</p>
              </div>
            )}
          </div>
          <div className="col-span-1 md:col-span-3 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-[#003366] mb-4 font-yuji">競合他社比較チャート</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="評価" fill="#003366" />
                <Bar dataKey="人気度" fill="#FF0000" />
                <Bar dataKey="平均価格" fill="#4A2311" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitorAnalysis;