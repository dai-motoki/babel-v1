import React, { lazy, Suspense } from 'react';

const DynamicComponent = ({ componentName }) => {
  const components = {
    // AIマネジメント
    'AILearningStatus': lazy(() => import('./components/AIManagement/AILearningStatus')),
    'CloudInfrastructure': lazy(() => import('./components/AIManagement/CloudInfrastructure')),
    'ProgressStatus': lazy(() => import('./components/AIManagement/ProgressStatus')),
    
    // アプリケーション
    'Development': lazy(() => import('./components/Application/Development')),
    'Production': lazy(() => import('./components/Application/Production')),
    // 'Staging': lazy(() => import('./components/Application/Staging')),
    
    // 現状分析
    // 'CompetitiveAnalysis': lazy(() => import('./components/CurrentAnalysis/CompetitiveAnalysis')),
    'DataFlow': lazy(() => import('./components/CurrentAnalysis/DataFlow')),
    'KPIDashboard': lazy(() => import('./components/CurrentAnalysis/KPIDashboard')),
    // 'SalesRevenueTrend': lazy(() => import('./components/CurrentAnalysis/SalesRevenueTrend')),
    // 'SystemFlow': lazy(() => import('./components/CurrentAnalysis/SystemFlow')),
    
    // マーケティング
    'LandingPage': lazy(() => import('./components/Marketing/LandingPage')),
    // 'MarketingFunnel': lazy(() => import('./components/Marketing/MarketingFunnel')),
    'Website': lazy(() => import('./components/Marketing/Website')),
    
    // チーム
    'ChatMessage': lazy(() => import('./components/Team/ChatMessage')),
    
    // 社内システム
    'chat': lazy(() => import('./components/internal_systems/chat')),
    'monitoring': lazy(() => import('./components/internal_systems/monitoring')),
    'wiki': lazy(() => import('./components/internal_systems/wiki')),
    
    // セキュリティ
    'security_audit': lazy(() => import('./components/security/security_audit')),
    // 'security_enforcement': lazy(() => import('./components/security/security_enforcement')),
    'security_logs': lazy(() => import('./components/security/security_logs')),
    // 'security_monitor' コンポーネントが見つからないためコメントアウトしました
    // 'security_monitor': lazy(() => import('./components/security/security_monitor')),
  };

  const Component = components[componentName];

  return (
    <Suspense fallback={<div className="p-4 text-center">読み込み中...</div>}>
      {Component ? <Component /> : <div className="p-4 text-center text-red-600">コンポーネントが見つかりません</div>}
    </Suspense>
  );
};

export default DynamicComponent;