// hooks.js
import { useState, useEffect } from 'react';

// データ取得用カスタムフック
export const useDataFetching = (initialUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error, setUrl };
};

// 動的コンポーネントローディング用カスタムフック
export const useDynamicComponent = (initialComponentType) => {
  const [componentType, setComponentType] = useState(initialComponentType);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const module = await import(`./components/${componentType}`);
        setComponent(() => module.default);
      } catch (err) {
        console.error('Failed to load component:', err);
        setComponent(null);
      }
    };

    loadComponent();
  }, [componentType]);

  return { component, setComponentType };
};

// KPIデータ処理用カスタムフック
export const useKPIData = (initialData) => {
  const [kpiData, setKPIData] = useState(initialData);

  const processData = (rawData) => {
    // KPIデータの処理ロジックをここに実装
    // 例: 売上の合計を計算する
    const totalRevenue = rawData.reduce((sum, item) => sum + item.revenue, 0);
    return { ...rawData, totalRevenue };
  };

  useEffect(() => {
    if (initialData) {
      const processedData = processData(initialData);
      setKPIData(processedData);
    }
  }, [initialData]);

  return { kpiData, processData };
};

// これらのカスタムフックを使用するコンポーネントの例を以下に示します：

// // App.js
// import React from 'react';
// import { useDataFetching, useDynamicComponent } from './hooks';

// const App = () => {
//   const { data, loading, error } = useDataFetching('/api/initialData');
//   const { component: DynamicComponent, setComponentType } = useDynamicComponent('LandingPage');

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">おちゃのHP v3</h1>
//       {DynamicComponent && <DynamicComponent data={data} />}
//       <button 
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//         onClick={() => setComponentType('ProductCatalog')}
//       >
//         製品カタログを見る
//       </button>
//     </div>
//   );
// };

// export default App;

// // KPIDashboard.js
// import React from 'react';
// import { useKPIData } from '../hooks';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const KPIDashboard = ({ initialData }) => {
//   const { kpiData } = useKPIData(initialData);

//   return (
//     <div className="p-4 bg-white shadow rounded">
//       <h2 className="text-xl font-semibold mb-4">KPIダッシュボード</h2>
//       <div className="mb-4">
//         <p className="font-bold">総売上: ¥{kpiData.totalRevenue.toLocaleString()}</p>
//       </div>
//       <LineChart width={600} height={300} data={kpiData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
//       </LineChart>
//     </div>
//   );
// };

// export default KPIDashboard;

// // // LandingPage.js
// // import React from 'react';

// // const LandingPage = () => {
// //   return (
// //     <div className="text-center">
// //       <h1 className="text-4xl font-bold mb-4">おちゃへようこそ</h1>
// //       <p className="mb-4">最高品質のお茶をお届けします</p>
// //       <img src="/api/placeholder/400/200" alt="お茶の画像" className="mx-auto mb-4" />
// //       <button className="px-4 py-2 bg-green-500 text-white rounded">
// //         商品を見る
// //       </button>
// //     </div>
// //   );
// // };

// // export default LandingPage;
