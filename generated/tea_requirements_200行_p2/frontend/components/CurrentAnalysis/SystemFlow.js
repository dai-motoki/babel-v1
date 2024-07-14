import React, { useState } from 'react';
import { ArrowRight, Database, Server, Smartphone, Laptop, Cloud } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SystemFlow = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    { id: 1, name: 'ユーザー入力', icon: Smartphone, description: 'ユーザーがアプリケーションを通じてデータを入力します。' },
    { id: 2, name: 'データ処理', icon: Laptop, description: 'クライアントサイドでデータの前処理を行います。' },
    { id: 3, name: 'サーバー送信', icon: ArrowRight, description: 'データをサーバーに送信します。' },
    { id: 4, name: 'バックエンド処理', icon: Server, description: 'サーバーサイドでデータの処理と検証を行います。' },
    { id: 5, name: 'データベース保存', icon: Database, description: '処理されたデータをデータベースに保存します。' },
    { id: 6, name: 'クラウド同期', icon: Cloud, description: 'データをクラウドと同期し、バックアップを作成します。' },
  ];

  const performanceData = [
    { name: '月曜日', 処理速度: 4000, エラー率: 2400, トラフィック: 2400 },
    { name: '火曜日', 処理速度: 3000, エラー率: 1398, トラフィック: 2210 },
    { name: '水曜日', 処理速度: 2000, エラー率: 9800, トラフィック: 2290 },
    { name: '木曜日', 処理速度: 2780, エラー率: 3908, トラフィック: 2000 },
    { name: '金曜日', 処理速度: 1890, エラー率: 4800, トラフィック: 2181 },
    { name: '土曜日', 処理速度: 2390, エラー率: 3800, トラフィック: 2500 },
    { name: '日曜日', 処理速度: 3490, エラー率: 4300, トラフィック: 2100 },
  ];

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-green-800 border-b-2 border-green-500 pb-2">システムフロー</h2>
      
      <div className="mb-8">
        <div className="flex flex-wrap justify-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center mb-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  activeStep === step.id ? 'bg-green-600' : 'bg-green-400'
                } text-white cursor-pointer transition-all duration-300 hover:bg-green-500`}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <step.icon size={24} />
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="mx-2 text-green-600" size={24} />
              )}
            </div>
          ))}
        </div>
        {activeStep && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-2 text-green-700">
              {steps.find(step => step.id === activeStep).name}
            </h3>
            <p className="text-gray-600">
              {steps.find(step => step.id === activeStep).description}
            </p>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-green-800">システムパフォーマンス</h3>
        <div className="bg-white p-4 rounded-lg shadow-inner" style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="処理速度" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="エラー率" stroke="#82ca9d" />
              <Line type="monotone" dataKey="トラフィック" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-green-700">システム負荷</h3>
          <div className="space-y-4">
            {['CPU使用率', 'メモリ使用率', 'ディスク使用率'].map((metric) => (
              <div key={metric} className="flex items-center justify-between">
                <span className="text-gray-600">{metric}</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-green-700">システムステータス</h3>
          <ul className="space-y-2">
            {['データベース接続', 'APIサーバー', 'バックアップシステム', 'セキュリティ監視'].map((item) => (
              <li key={item} className="flex items-center justify-between">
                <span className="text-gray-600">{item}</span>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  正常
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SystemFlow;