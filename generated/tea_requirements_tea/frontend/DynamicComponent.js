import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// 各コンポーネントのインポート
import AILearningStatus from './components/AIManagement/AILearningStatus';
import CloudInfrastructure from './components/AIManagement/CloudInfrastructure';
import ProgressStatus from './components/AIManagement/ProgressStatus';
import Development from './components/Application/Development';
import Production from './components/Application/Production';
import Staging from './components/Application/Staging';
import CompetitiveAnalysis from './components/CurrentAnalysis/CompetitiveAnalysis';
import DataFlow from './components/CurrentAnalysis/DataFlow';
import KPIDashboard from './components/CurrentAnalysis/KPIDashboard';
import SalesRevenueTrend from './components/CurrentAnalysis/SalesRevenueTrend';
import SystemFlow from './components/CurrentAnalysis/SystemFlow';
import LandingPage from './components/Marketing/LandingPage';
import MarketingFunnel from './components/Marketing/MarketingFunnel';
import Website from './components/Marketing/Website';
import ChatMessage from './components/Team/ChatMessage';

const componentMap = {
  AILearningStatus,
  CloudInfrastructure,
  ProgressStatus,
  Development,
  Production,
  Staging,
  CompetitiveAnalysis,
  DataFlow,
  KPIDashboard,
  SalesRevenueTrend,
  SystemFlow,
  LandingPage,
  MarketingFunnel,
  Website,
  ChatMessage,
};

const DynamicComponent = ({ componentType, ...props }) => {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        setLoading(true);
        const SelectedComponent = componentMap[componentType];
        if (!SelectedComponent) {
          throw new Error(`コンポーネント ${componentType} が見つかりません`);
        }
        setComponent(() => SelectedComponent);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadComponent();
  }, [componentType]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded-md">
        エラー: {error}
      </div>
    );
  }

  if (!Component) {
    return null;
  }

  return <Component {...props} />;
};

export default DynamicComponent;
