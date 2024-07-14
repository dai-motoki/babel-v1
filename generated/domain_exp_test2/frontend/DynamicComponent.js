import React from 'react';
import { Zap, Settings, BarChart2, Package, Clipboard, Calendar, ShoppingCart, Users, Gift, TrendingUp, FileText, PieChart, BookOpen, Award, Archive, Feather } from 'lucide-react';

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
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-4xl font-bold text-gray-300 mb-4">
            <Feather className="w-24 h-24" />
          </div>
          <p className="text-xl text-gray-600">コンポーネントが見つかりません</p>
        </div>
      );
  }

  return (
    <React.Suspense fallback={<LoadingComponent />}>
      <Component />
    </React.Suspense>
  );
};

const LoadingComponent = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
  </div>
);

export const getComponentIcon = (componentName) => {
  switch (componentName) {
    case 'StockManagement':
      return <Package className="w-6 h-6 text-green-600" />;
    case 'IngredientTracking':
      return <Clipboard className="w-6 h-6 text-green-600" />;
    case 'SeasonalPlanning':
      return <Calendar className="w-6 h-6 text-green-600" />;
    case 'RecipeManagement':
      return <FileText className="w-6 h-6 text-blue-600" />;
    case 'QualityControl':
      return <Award className="w-6 h-6 text-blue-600" />;
    case 'ProductionSchedule':
      return <Calendar className="w-6 h-6 text-blue-600" />;
    case 'POSSystem':
      return <ShoppingCart className="w-6 h-6 text-red-600" />;
    case 'CustomerManagement':
      return <Users className="w-6 h-6 text-red-600" />;
    case 'LoyaltyProgram':
      return <Gift className="w-6 h-6 text-red-600" />;
    case 'SalesAnalytics':
      return <TrendingUp className="w-6 h-6 text-red-600" />;
    case 'Accounting':
      return <FileText className="w-6 h-6 text-purple-600" />;
    case 'Budgeting':
      return <PieChart className="w-6 h-6 text-purple-600" />;
    case 'FinancialReporting':
      return <BarChart2 className="w-6 h-6 text-purple-600" />;
    case 'CulturalCalendar':
      return <Calendar className="w-6 h-6 text-yellow-600" />;
    case 'ArtisanTechniques':
      return <Feather className="w-6 h-6 text-yellow-600" />;
    case 'HistoricalArchive':
      return <Archive className="w-6 h-6 text-yellow-600" />;
    case 'SeasonalCustoms':
      return <BookOpen className="w-6 h-6 text-yellow-600" />;
    default:
      return <Zap className="w-6 h-6 text-gray-600" />;
  }
};

export default DynamicComponent;