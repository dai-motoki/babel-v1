// import React, { useState, useEffect } from 'react';
// // import { AppSelector } from '../../../AppSelector';

// const App = () => {
//   const [apps, setApps] = useState([]);

//   useEffect(() => {
//     // アプリ一覧を取得する関数
//     const fetchApps = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/files/generated-dirs');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setApps(data);
//       } catch (error) {
//         console.error('アプリ一覧の取得に失敗しました:', error);
//       }
//     };

//     fetchApps();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">アプリケーション</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {apps.map((app) => (
//           <div key={app.name} className="bg-white shadow-md rounded-lg p-4">
//             <h2 className="text-xl font-semibold mb-2">{app.name}</h2>
//             {/* <p className="text-gray-600 mb-4">{app.path}</p> */}
//             {/* <AppSelector onSelectApp={() => {}} /> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;