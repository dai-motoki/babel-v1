
// data.js

import { useState, useEffect } from 'react';

// データフェッチ関数
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`/api/${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// データ処理関数
export const processData = (rawData) => {
  // ここでデータの加工や整形を行う
  return rawData.map(item => ({
    ...item,
    processedAt: new Date().toISOString()
  }));
};

// カスタムフック: データフェッチと処理を組み合わせる
export const useProcessedData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const rawData = await fetchData(endpoint);
        const processedData = processData(rawData);
        setData(processedData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [endpoint]);

  return { data, loading, error };
};

// KPIデータを取得するカスタムフック
export const useKPIData = () => {
  return useProcessedData('kpi');
};

// 製品カタログデータを取得するカスタムフック
export const useProductCatalog = () => {
  return useProcessedData('products');
};

// セールスデータを取得するカスタムフック
export const useSalesData = () => {
  return useProcessedData('sales');
};

// KPIダッシュボードコンポーネント
export const KPIDashboard = () => {
  const { data, loading, error } = useKPIData();

  if (loading) return <div>Loading KPI data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">KPI Dashboard</h2>
      {data && data.map((kpi, index) => (
        <div key={index} className="mb-2">
          <span className="font-semibold">{kpi.name}: </span>
          <span>{kpi.value}</span>
        </div>
      ))}
    </div>
  );
};

// 製品カタログコンポーネント
export const ProductCatalog = () => {
  const { data, loading, error } = useProductCatalog();

  if (loading) return <div>Loading product catalog...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data && data.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-2 font-semibold">Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

// セールスレポートコンポーネント
export const SalesReport = () => {
  const { data, loading, error } = useSalesData();

  if (loading) return <div>Loading sales data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sales Report</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-left">Product</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((sale, index) => (
            <tr key={index}>
              <td>{sale.date}</td>
              <td>{sale.product}</td>
              <td className="text-right">${sale.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};