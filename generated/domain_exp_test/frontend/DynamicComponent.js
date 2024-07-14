import React from 'react';
import { Zap, Settings, BarChart2, ShoppingCart, Users, Gift, TrendingUp, Palette, Sun, Calendar, BookOpen, DollarSign, Feather } from 'lucide-react';

const DynamicComponent = ({ componentName }) => {
  let Component;

  switch (componentName) {
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

    // 製造
    case 'RecipeManagement':
      Component = React.lazy(() => import('./components/Production/RecipeManagement'));
      break;
    case 'QualityControl':
      Component = React.lazy(() => import('./components/Production/QualityControl'));
      break;
    case 'ProductionSchedule':
      Component = React.lazy(() => import('./components/Production/ProductionSchedule'));
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

    // UI
    case 'WagashiIcons':
      Component = React.lazy(() => import('./components/UI/WagashiIcons'));
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
    case 'EventPlanner':
      Component = React.lazy(() => import('./components/Marketing/EventPlanner'));
      break;
    case 'SocialMediaIntegration':
      Component = React.lazy(() => import('./components/Marketing/SocialMediaIntegration'));
      break;
    case 'SeasonalPromotions':
      Component = React.lazy(() => import('./components/Marketing/SeasonalPromotions'));
      break;

    // トレーニング
    case 'ApprenticeshipProgram':
      Component = React.lazy(() => import('./components/Training/ApprenticeshipProgram'));
      break;
    case 'SkillsDatabase':
      Component = React.lazy(() => import('./components/Training/SkillsDatabase'));
      break;
    case 'TechniqueLibrary':
      Component = React.lazy(() => import('./components/Training/TechniqueLibrary'));
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

    // 伝統
    case 'CulturalCalendar':
      Component = React.lazy(() => import('./components/Tradition/CulturalCalendar'));
      break;
    case 'ArtisanTechniques':
      Component = React.lazy(() => import('./components/Tradition/ArtisanTechniques'));
      break;
    case 'HistoricalArchive':
      Component = React.lazy(() => import('./components/Tradition/HistoricalArchive'));
      break;
    case 'SeasonalCustoms':
      Component = React.lazy(() => import('./components/Tradition/SeasonalCustoms'));
      break;

    default:
      Component = () => (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-4xl mb-4 text-gray-400">
              <Zap className="inline-block mr-2" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">コンポーネントが見つかりません</h2>
            <p className="text-gray-500">指定されたコンポーネントは存在しないか、読み込めません。</p>
          </div>
        </div>
      );
  }

  return (
    <React.Suspense fallback={
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <p className="text-lg text-gray-600">読み込み中...</p>
        </div>
      </div>
    }>
      <div className="p-6 bg-amber-50 rounded-lg shadow-md">
        <Component />
      </div>
    </React.Suspense>
  );
};

export default DynamicComponent;