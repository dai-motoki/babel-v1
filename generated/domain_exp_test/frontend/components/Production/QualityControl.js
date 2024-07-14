import React, { useState, useEffect } from 'react';
import { Check, X, AlertTriangle, ThumbsUp, Clipboard, BarChart2, RefreshCcw } from 'lucide-react';

const QualityControl = () => {
  const [qualityChecks, setQualityChecks] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [checkResult, setCheckResult] = useState(null);

  const products = ['抹茶大福', '桜餅', '栗きんとん', '羊羹'];

  const qualityCheckItems = [
    { id: 1, name: '外観', criteria: '形が整っており、表面に傷がないこと' },
    { id: 2, name: '色合い', criteria: '季節や原材料に適した色調であること' },
    { id: 3, name: '香り', criteria: '原材料本来の香りがほのかに感じられること' },
    { id: 4, name: '食感', criteria: '適度な弾力と滑らかさがあること' },
    { id: 5, name: '味', criteria: '甘さと風味のバランスが取れていること' },
  ];

  useEffect(() => {
    setQualityChecks(qualityCheckItems.map(item => ({ ...item, status: null })));
  }, [selectedProduct]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCheckResult(null);
  };

  const handleCheckToggle = (id) => {
    setQualityChecks(prevChecks =>
      prevChecks.map(check =>
        check.id === id ? { ...check, status: check.status === 'pass' ? 'fail' : 'pass' } : check
      )
    );
  };

  const handleSubmit = () => {
    const allChecked = qualityChecks.every(check => check.status !== null);
    const allPassed = qualityChecks.every(check => check.status === 'pass');
    setCheckResult(allChecked ? (allPassed ? 'pass' : 'fail') : 'incomplete');
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return <Check className="text-green-500" />;
      case 'fail':
        return <X className="text-red-500" />;
      default:
        return <AlertTriangle className="text-yellow-500" />;
    }
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 font-serif">和菓子品質管理</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#006400] mb-4 font-serif">商品選択</h2>
        <div className="flex flex-wrap gap-4">
          {products.map(product => (
            <button
              key={product}
              onClick={() => handleProductSelect(product)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedProduct === product
                  ? 'bg-[#006400] text-white'
                  : 'bg-[#F3EAD3] text-[#4A2311] hover:bg-[#FFB7C5]'
              }`}
            >
              {product}
            </button>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#006400] mb-4 font-serif">品質チェックリスト: {selectedProduct}</h2>
          <ul className="space-y-4">
            {qualityChecks.map(check => (
              <li key={check.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
                <div>
                  <h3 className="font-medium text-[#4A2311]">{check.name}</h3>
                  <p className="text-sm text-gray-600">{check.criteria}</p>
                </div>
                <button
                  onClick={() => handleCheckToggle(check.id)}
                  className={`p-2 rounded-full transition-colors ${
                    check.status === 'pass'
                      ? 'bg-green-100'
                      : check.status === 'fail'
                      ? 'bg-red-100'
                      : 'bg-gray-100'
                  }`}
                >
                  {renderStatusIcon(check.status)}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmit}
            className="mt-6 bg-[#006400] text-white px-6 py-2 rounded-full hover:bg-[#007500] transition-colors"
          >
            品質チェック完了
          </button>
        </div>
      )}

      {checkResult && (
        <div className={`bg-white rounded-lg shadow-md p-6 ${
          checkResult === 'pass' ? 'border-green-500' : 'border-red-500'
        } border-2`}>
          <h2 className="text-2xl font-semibold mb-4 font-serif">チェック結果</h2>
          {checkResult === 'pass' && (
            <div className="flex items-center text-green-500">
              <ThumbsUp className="mr-2" />
              <span>全ての項目をクリアしました。高品質な和菓子です。</span>
            </div>
          )}
          {checkResult === 'fail' && (
            <div className="flex items-center text-red-500">
              <AlertTriangle className="mr-2" />
              <span>一部の項目が基準を満たしていません。再確認が必要です。</span>
            </div>
          )}
          {checkResult === 'incomplete' && (
            <div className="flex items-center text-yellow-500">
              <AlertTriangle className="mr-2" />
              <span>全ての項目をチェックしてください。</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#006400] mb-4 font-serif">品質管理ダッシュボード</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F3EAD3] p-4 rounded-lg">
            <h3 className="font-medium text-[#4A2311] mb-2">今日の合格率</h3>
            <div className="flex items-center">
              <BarChart2 className="text-[#006400] mr-2" />
              <span className="text-2xl font-bold text-[#006400]">95%</span>
            </div>
          </div>
          <div className="bg-[#F3EAD3] p-4 rounded-lg">
            <h3 className="font-medium text-[#4A2311] mb-2">チェック済み商品数</h3>
            <div className="flex items-center">
              <Clipboard className="text-[#006400] mr-2" />
              <span className="text-2xl font-bold text-[#006400]">128</span>
            </div>
          </div>
          <div className="bg-[#F3EAD3] p-4 rounded-lg">
            <h3 className="font-medium text-[#4A2311] mb-2">最後の更新</h3>
            <div className="flex items-center">
              <RefreshCcw className="text-[#006400] mr-2" />
              <span className="text-sm text-[#4A2311]">2023/06/15 14:30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityControl;