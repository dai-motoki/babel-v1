import React, { lazy, Suspense } from 'react';
import { AlertTriangle, Loader } from 'lucide-react';

// 動的にインポートするコンポーネントの定義
const componentMap = {
  AIManagement: {
    AILearningStatus: lazy(() => import('./components/AIManagement/AILearningStatus')),
    CloudInfrastructure: lazy(() => import('./components/AIManagement/CloudInfrastructure')),
    ProgressStatus: lazy(() => import('./components/AIManagement/ProgressStatus')),
  },
  Application: {
    Development: lazy(() => import('./components/Application/Development')),
    Production: lazy(() => import('./components/Application/Production')),
    Staging: lazy(() => import('./components/Application/Staging')),
  },
  CurrentAnalysis: {
    CompetitiveAnalysis: lazy(() => import('./components/CurrentAnalysis/CompetitiveAnalysis')),
    DataFlow: lazy(() => import('./components/CurrentAnalysis/DataFlow')),
    KPIDashboard: lazy(() => import('./components/CurrentAnalysis/KPIDashboard')),
    SalesRevenueTrend: lazy(() => import('./components/CurrentAnalysis/SalesRevenueTrend')),
    SystemFlow: lazy(() => import('./components/CurrentAnalysis/SystemFlow')),
  },
  Marketing: {
    LandingPage: lazy(() => import('./components/Marketing/LandingPage')),
    MarketingFunnel: lazy(() => import('./components/Marketing/MarketingFunnel')),
    Website: lazy(() => import('./components/Marketing/Website')),
  },
  Team: {
    ChatMessage: lazy(() => import('./components/Team/ChatMessage')),
  },
  InternalSystems: {
    Chat: lazy(() => import('./components/InternalSystems/Chat')),
    Monitoring: lazy(() => import('./components/InternalSystems/Monitoring')),
    Wiki: lazy(() => import('./components/InternalSystems/Wiki')),
  },
  Security: {
    SecurityAudit: lazy(() => import('./components/Security/SecurityAudit')),
    SecurityEnforcement: lazy(() => import('./components/Security/SecurityEnforcement')),
    SecurityLogs: lazy(() => import('./components/Security/SecurityLogs')),
    SecurityMonitor: lazy(() => import('./components/Security/SecurityMonitor')),
  },
};

const DynamicComponent = ({ category, componentName }) => {
  const Component = componentMap[category]?.[componentName];

  if (!Component) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-600 flex items-center">
          <AlertTriangle className="mr-2" />
          <span>コンポーネントが見つかりません</span>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <Loader className="animate-spin text-green-700" size={48} />
  </div>
);

export const DynamicComponentWrapper = ({ category, componentName }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4">
      <h2 className="text-2xl font-bold mb-4 text-green-800 border-b border-green-200 pb-2">
        {componentName}
      </h2>
      <div className="min-h-[400px]">
        <DynamicComponent category={category} componentName={componentName} />
      </div>
    </div>
  );
};

export default DynamicComponentWrapper;

// 以下は各コンポーネントのサンプル実装です

const AILearningStatus = () => (
  <div className="space-y-4">
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-2">学習進捗</h3>
      <div className="w-full bg-green-200 rounded-full h-2.5">
        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
      </div>
      <p className="text-sm text-green-700 mt-2">70% 完了</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-green-700">データセットサイズ</h4>
        <p className="text-2xl font-bold text-green-800">1,234,567</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-green-700">学習時間</h4>
        <p className="text-2xl font-bold text-green-800">72時間</p>
      </div>
    </div>
  </div>
);

const CloudInfrastructure = () => (
  <div className="space-y-4">
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-2">リソース使用状況</h3>
      <div className="flex justify-between items-center">
        <span className="text-sm text-green-700">CPU</span>
        <div className="w-3/4 bg-green-200 rounded-full h-2.5">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <span className="text-sm text-green-700">60%</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-green-700">メモリ</span>
        <div className="w-3/4 bg-green-200 rounded-full h-2.5">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
        </div>
        <span className="text-sm text-green-700">80%</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-green-700">アクティブインスタンス</h4>
        <p className="text-2xl font-bold text-green-800">12</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-green-700">ストレージ使用量</h4>
        <p className="text-2xl font-bold text-green-800">1.2 TB</p>
      </div>
    </div>
  </div>
);

const ProgressStatus = () => (
  <div className="space-y-4">
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-2">プロジェクト進捗</h3>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-green-700">計画</span>
          <div className="w-3/4 bg-green-200 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <span className="text-sm text-green-700">完了</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-green-700">設計</span>
          <div className="w-3/4 bg-green-200 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
          </div>
          <span className="text-sm text-green-700">80%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-green-700">開発</span>
          <div className="w-3/4 bg-green-200 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <span className="text-sm text-green-700">60%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-green-700">テスト</span>
          <div className="w-3/4 bg-green-200 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
          </div>
          <span className="text-sm text-green-700">40%</span>
        </div>
      </div>
    </div>
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="text-md font-medium text-green-700 mb-2">次のマイルストーン</h4>
      <p className="text-lg font-semibold text-green-800">ベータ版リリース</p>
      <p className="text-sm text-green-600">予定日: 2023年8月15日</p>
    </div>
  </div>
);

// 他のコンポーネントも同様に実装します...
