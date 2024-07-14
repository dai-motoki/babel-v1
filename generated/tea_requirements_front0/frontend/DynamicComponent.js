import React from 'react';
import CompetitiveAnalysis from './components/CurrentAnalysis/CompetitiveAnalysis.js';
import SalesRevenueTrend from './components/CurrentAnalysis/SalesRevenueTrend.js';
import KPIDashboard from './components/CurrentAnalysis/KPIDashboard.js';
import SystemFlow from './components/CurrentAnalysis/SystemFlow.js';
import DataFlow from './components/CurrentAnalysis/DataFlow.js';
import MarketingFunnel from './components/Marketing/MarketingFunnel.js';
import LandingPage from './components/Marketing/LandingPage.js';
import Website from './components/Marketing/Website.js';
import Production from './components/Application/Production.js';
import Staging from './components/Application/Staging.js';
import Development from './components/Application/Development.js';
import ProgressStatus from './components/AIManagement/ProgressStatus.js';
import AILearningStatus from './components/AIManagement/AILearningStatus.js';
import CloudInfrastructure from './components/AIManagement/CloudInfrastructure.js';

import SecurityAudit from './components/security/security_audit.js';
import SecurityEnforcement from './components/security/security_enforcement.js';
import SecurityLogs from './components/security/security_logs.js';
import SecurityMonitor from './components/security/security_monitor.js';

import ChatMessage from './components/Team/ChatMessage.js';

// コンポーネントマップの定義
const componentMap = {
  CompetitiveAnalysis,
  SalesRevenueTrend,
  KPIDashboard,
  SystemFlow,
  DataFlow,
  MarketingFunnel,
  LandingPage,
  Website,
  Production,
  Staging,
  Development,
  ProgressStatus,
  AILearningStatus,
  CloudInfrastructure,
  SecurityAudit,
  SecurityEnforcement,
  SecurityLogs,
  SecurityMonitor,
  ChatMessage
};

// 動的コンポーネントの関数
function DynamicComponent({ component }) {
  // コンポーネント名が文字列であることを確認
  if (typeof component !== 'string') {
    return <div>無効なコンポーネント名です</div>;
  }

  const Component = componentMap[component];
  
  // コンポーネントが存在し、関数または클래스であることを確認
  if (Component && (typeof Component === 'function' || Component instanceof React.Component)) {
    return <Component />;
  } else {
    return <div>コンポーネントが見つかりません: {component}</div>;
  }
}

export default DynamicComponent;

