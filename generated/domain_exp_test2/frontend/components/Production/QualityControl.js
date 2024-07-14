import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, BarChart2, Thermometer, Droplet, Scale, Clock } from 'lucide-react';

const QualityControl = () => {
  const [qualityChecks, setQualityChecks] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [newCheck, setNewCheck] = useState({
    product: '',
    temperature: '',
    humidity: '',
    weight: '',
    appearance: '',
    taste: '',
    texture: '',
  });

  useEffect(() => {
    // モックデータの読み込み（実際のアプリケーションではAPIから取得）
    const mockData = [
      { id: 1, product: '抹茶どら焼き', temperature: 22, humidity: 50, weight: 75, appearance: '良好', taste: '優秀', texture: '適切' },
      { id: 2, product: '桜もち', temperature: 20, humidity: 55, weight: 45, appearance: '良好', taste: '良好', texture: '適切' },
      { id: 3, product: '栗きんとん', temperature: 21, humidity: 52, weight: 60, appearance: '要改善', taste: '良好', texture: '適切' },
    ];
    setQualityChecks(mockData);
  }, []);

  const handleInputChange = (e) => {
    setNewCheck({ ...newCheck, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = qualityChecks.length + 1;
    setQualityChecks([...qualityChecks, { id: newId, ...newCheck }]);
    setNewCheck({
      product: '',
      temperature: '',
      humidity: '',
      weight: '',
      appearance: '',
      taste: '',
      texture: '',
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case '優秀':
        return <CheckCircle className="text-green-500" />;
      case '良好':
        return <CheckCircle className="text-blue-500" />;
      case '適切':
        return <CheckCircle className="text-yellow-500" />;
      case '要改善':
        return <AlertTriangle className="text-orange-500" />;
      default:
        return <XCircle className="text-red-500" />;
    }
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-[#4A2311] font-yumin">和菓子品質管理</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#006400] font-yumin">新規品質チェック</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-[#4A2311]">商品名</label>
              <input
                type="text"
                id="product"
                name="product"
                value={newCheck.product}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006400] focus:ring focus:ring-[#006400] focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="temperature" className="block text-sm font-medium text-[#4A2311]">温度 (°C)</label>
              <input
                type="number"
                id="temperature"
                name="temperature"
                value={newCheck.temperature}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006400] focus:ring focus:ring-[#006400] focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="humidity" className="block text-sm font-medium text-[#4A2311]">湿度 (%)</label>
              <input
                type="number"
                id="humidity"
                name="humidity"
                value={newCheck.humidity}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006400] focus:ring focus:ring-[#006400] focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-[#4A2311]">重量 (g)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={newCheck.weight}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006400] focus:ring focus:ring-[#006400] focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="appearance" className="block text-sm font-medium text-[#4A2311]">外観</label>
              <select
                id="appearance"
                name="appearance"
                value={newCheck.appearance}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006400] focus:ring focus:ring-[#006400] focus:ring-opacity-50"
                required
              >
                <option value="">選択してください</option>
                <option value="優秀">優秀</option>
                <option value="良好">良好</option>
                <option value="適切">適切</option>
                <option value="要改善">要改善</option>
              </select>
            </div>
            <div>
              <label htmlFor="taste" className="block text-sm font-medium text-[#4A2311]">味</label>
              <select
                id="taste"
                name="taste"
                value={newCheck.taste}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006400] focus:ring focus:ring-[#006400] focus:ring-opacity-50"
                required
              >
                <option value="">選択してください</option>
                <option value="優秀">優秀</option>
                <option value="良好">良好</option>
                <option value="適切">適切</option>
                <option value="要改善">要改善</option>
              </select>
            </div>
            <div>
              <label htmlFor="texture" className="block text-sm font-medium text-[#4A2311]">食感</label>
              <select
                id="texture"
                name="texture"
                value={newCheck.texture}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006400] focus:ring focus:ring-[#006400] focus:ring-opacity-50"
                required
              >
                <option value="">選択してください</option>
                <option value="優秀">優秀</option>
                <option value="良好">良好</option>
                <option value="適切">適切</option>
                <option value="要改善">要改善</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#006400] text-white py-2 px-4 rounded-md hover:bg-[#007500] transition duration-300"
            >
              品質チェックを追加
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#006400] font-yumin">品質チェック履歴</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#F3EAD3] text-[#4A2311]">
                <th className="px-4 py-2">商品名</th>
                <th className="px-4 py-2">温度</th>
                <th className="px-4 py-2">湿度</th>
                <th className="px-4 py-2">重量</th>
                <th className="px-4 py-2">外観</th>
                <th className="px-4 py-2">味</th>
                <th className="px-4 py-2">食感</th>
              </tr>
            </thead>
            <tbody>
              {qualityChecks.map((check) => (
                <tr key={check.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{check.product}</td>
                  <td className="px-4 py-2 flex items-center">
                    <Thermometer className="mr-2 text-[#006400]" size={16} />
                    {check.temperature}°C
                  </td>
                  <td className="px-4 py-2 flex items-center">
                    <Droplet className="mr-2 text-[#006400]" size={16} />
                    {check.humidity}%
                  </td>
                  <td className="px-4 py-2 flex items-center">
                    <Scale className="mr-2 text-[#006400]" size={16} />
                    {check.weight}g
                  </td>
                  <td className="px-4 py-2 flex items-center">
                    {getStatusIcon(check.appearance)}
                    <span className="ml-2">{check.appearance}</span>
                  </td>
                  <td className="px-4 py-2 flex items-center">
                    {getStatusIcon(check.taste)}
                    <span className="ml-2">{check.taste}</span>
                  </td>
                  <td className="px-4 py-2 flex items-center">
                    {getStatusIcon(check.texture)}
                    <span className="ml-2">{check.texture}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QualityControl;