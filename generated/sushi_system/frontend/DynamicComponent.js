import React from 'react';

const DynamicComponent = ({ componentName }) => {
  // コンポーネントの動的インポート
  let Component;

  switch (componentName) {
    // AI管理
    case 'OceanCurrentPrediction':
      Component = React.lazy(() => import('./components/AI/OceanCurrentPrediction'));
      break;
    case 'WeatherDataAnalysis':
      Component = React.lazy(() => import('./components/AI/WeatherDataAnalysis'));
      break;
    case 'DailyMenuRecommendation':
      Component = React.lazy(() => import('./components/AI/DailyMenuRecommendation'));
      break;
    case 'ProductUpdateSuggestion':
      Component = React.lazy(() => import('./components/AI/ProductUpdateSuggestion'));
      break;

    // 分析
    case 'FishCatchPrediction':
      Component = React.lazy(() => import('./components/Analytics/FishCatchPrediction'));
      break;
    case 'ConveyorBeltOptimization':
      Component = React.lazy(() => import('./components/Analytics/ConveyorBeltOptimization'));
      break;
    case 'PopularItemTrends':
      Component = React.lazy(() => import('./components/Analytics/PopularItemTrends'));
      break;
    case 'MenuOptimization':
      Component = React.lazy(() => import('./components/Analytics/MenuOptimization'));
      break;

    // UI
    case 'SushiIcons':
      Component = React.lazy(() => import('./components/UI/SushiIcons'));
      break;
    case 'SeasonalTheme':
      Component = React.lazy(() => import('./components/UI/SeasonalTheme'));
      break;
    case 'TraditionalPatterns':
      Component = React.lazy(() => import('./components/UI/TraditionalPatterns'));
      break;
    case 'AccessibilityFeatures':
      Component = React.lazy(() => import('./components/UI/AccessibilityFeatures'));
      break;

    // マーケティング
    case 'CompetitorAnalysis':
      Component = React.lazy(() => import('./components/Marketing/CompetitorAnalysis'));
      break;
    case 'SocialMediaIntegration':
      Component = React.lazy(() => import('./components/Marketing/SocialMediaIntegration'));
      break;
    case 'EventPlanner':
      Component = React.lazy(() => import('./components/Marketing/EventPlanner'));
      break;

    // 販売
    case 'POSSystem':
      Component = React.lazy(() => import('./components/Sales/POSSystem'));
      break;
    case 'CustomerManagement':
      Component = React.lazy(() => import('./components/Sales/CustomerManagement'));
      break;
    case 'LoyaltyProgram':
      Component = React.lazy(() => import('./components/Sales/LoyaltyProgram'));
      break;
    case 'SalesAnalytics':
      Component = React.lazy(() => import('./components/Sales/SalesAnalytics'));
      break;

    // 製造
    case 'QualityControl':
      Component = React.lazy(() => import('./components/Production/QualityControl'));
      break;
    case 'RecipeManagement':
      Component = React.lazy(() => import('./components/Production/RecipeManagement'));
      break;
    case 'ProductionSchedule':
      Component = React.lazy(() => import('./components/Production/ProductionSchedule'));
      break;

    // 在庫管理
    case 'StockManagement':
      Component = React.lazy(() => import('./components/Inventory/StockManagement'));
      break;
    case 'IngredientTracking':
      Component = React.lazy(() => import('./components/Inventory/IngredientTracking'));
      break;
    case 'SeasonalPlanning':
      Component = React.lazy(() => import('./components/Inventory/SeasonalPlanning'));
      break;

    // 財務
    case 'Accounting':
      Component = React.lazy(() => import('./components/Finance/Accounting'));
      break;
    case 'Budgeting':
      Component = React.lazy(() => import('./components/Finance/Budgeting'));
      break;
    case 'FinancialReporting':
      Component = React.lazy(() => import('./components/Finance/FinancialReporting'));
      break;

    default:
      Component = () => <div>コンポーネントが見つかりません</div>;
  }

  return (
    <React.Suspense fallback={<div>読み込み中...</div>}>
      <Component />
    </React.Suspense>
  );
};

export default DynamicComponent;
