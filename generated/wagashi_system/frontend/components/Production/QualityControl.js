import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Check, X, AlertTriangle, RefreshCcw, Clipboard, ThumbsUp, ThumbsDown } from 'lucide-react';

const QualityControl = () => {
  const [qualityData, setQualityData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inspectionResult, setInspectionResult] = useState(null);

  useEffect(() => {
    // 品質データのモック
    const mockData = [
      { name: '抹茶どら焼き', 外観: 95, 食感: 88, 風味: 92 },
      { name: '桜餅', 外観: 90, 食感: 85, 風味: 94 },
      { name: '柚子羊羹', 外観: 88, 食感: 92, 風味: 90 },
      { name: '栗きんとん', 外観: 93, 食感: 90, 風味: 89 },
      { name: '黒糖まんじゅう', 外観: 87, 食感: 86, 風味: 91 },
    ];
    setQualityData(mockData);
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setInspectionResult(null);
  };

  const handleInspection = () => {
    // 品質検査のシミュレーション
    const result = Math.random() > 0.2 ? '合格' : '要改善';
    setInspectionResult(result);
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-3xl font-bold text-[#4A2311] mb-8">和菓子品質管理</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#006400] mb-4">品質チャート</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={qualityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="外観" fill="#8884d8" />
              <Bar dataKey="食感" fill="#82ca9d" />
              <Bar dataKey="風味" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#006400] mb-4">品質検査</h2>
          <div className="mb-4">
            <label className="block text-[#4A2311] mb-2">商品選択:</label>
            <select
              className="w-full p-2 border border-[#006400] rounded"
              onChange={(e) => handleProductSelect(e.target.value)}
              value={selectedProduct || ''}
            >
              <option value="">選択してください</option>
              {qualityData.map((item) => (
                <option key={item.name} value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          <button
            className="bg-[#006400] text-white px-4 py-2 rounded hover:bg-[#007500] transition-colors"
            onClick={handleInspection}
            disabled={!selectedProduct}
          >
            品質検査を実施
          </button>
          {inspectionResult && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">検査結果:</h3>
              <div className={`p-4 rounded ${inspectionResult === '合格' ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className="flex items-center">
                  {inspectionResult === '合格' ? (
                    <Check className="text-green-500 mr-2" />
                  ) : (
                    <AlertTriangle className="text-red-500 mr-2" />
                  )}
                  {inspectionResult}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#006400] mb-4">品質管理チェックリスト</h2>
        <div className="space-y-4">
          <ChecklistItem title="原材料の鮮度確認" />
          <ChecklistItem title="製造工程の衛生状態" />
          <ChecklistItem title="最終製品の外観検査" />
          <ChecklistItem title="食感テスト" />
          <ChecklistItem title="風味評価" />
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#006400] mb-4">品質改善提案</h2>
        <div className="space-y-4">
          <ImprovementItem
            title="製造環境の温度管理"
            description="和菓子の品質を保つため、製造室の温度を18-22℃に維持することを推奨します。"
          />
          <ImprovementItem
            title="原材料の選定基準の見直し"
            description="より高品質な和菓子を作るため、原材料の選定基準を厳格化し、定期的に見直すことを提案します。"
          />
          <ImprovementItem
            title="職人の技術研修"
            description="伝統的な和菓子作りの技術を継承し、品質を向上させるため、定期的な技術研修の実施を推奨します。"
          />
        </div>
      </div>
    </div>
  );
};

const ChecklistItem = ({ title }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <button
        className={`w-6 h-6 rounded-full flex items-center justify-center ${
          checked ? 'bg-[#006400]' : 'border-2 border-[#006400]'
        }`}
        onClick={() => setChecked(!checked)}
      >
        {checked && <Check className="text-white" size={16} />}
      </button>
      <span className="text-[#4A2311]">{title}</span>
    </div>
  );
};

const ImprovementItem = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-[#006400] rounded p-4">
      <h3 className="text-lg font-semibold text-[#006400] mb-2">{title}</h3>
      <p className={`text-[#4A2311] ${expanded ? '' : 'line-clamp-2'}`}>{description}</p>
      <button
        className="text-[#006400] hover:underline mt-2"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? '閉じる' : '詳細を表示'}
      </button>
    </div>
  );
};

export default QualityControl;