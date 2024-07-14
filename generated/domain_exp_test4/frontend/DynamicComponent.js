import React, { Suspense } from 'react';
import { motion } from 'framer-motion';

const componentMap = {
  // デバイス管理
  DeviceInventory: React.lazy(() => import('./components/DeviceManagement/DeviceInventory')),
  DeviceLifecycle: React.lazy(() => import('./components/DeviceManagement/DeviceLifecycle')),
  HardwareSoftwareInfo: React.lazy(() => import('./components/DeviceManagement/HardwareSoftwareInfo')),
  AutomaticDeviceDetection: React.lazy(() => import('./components/DeviceManagement/AutomaticDeviceDetection')),

  // SaaS管理
  SaaSInventory: React.lazy(() => import('./components/SaaSManagement/SaaSInventory')),
  UsageAnalytics: React.lazy(() => import('./components/SaaSManagement/UsageAnalytics')),
  ShadowITDetection: React.lazy(() => import('./components/SaaSManagement/ShadowITDetection')),
  AccountLifecycleManagement: React.lazy(() => import('./components/SaaSManagement/AccountLifecycleManagement')),

  // ユーザー管理
  EmployeeDirectory: React.lazy(() => import('./components/UserManagement/EmployeeDirectory')),
  AccessControl: React.lazy(() => import('./components/UserManagement/AccessControl')),
  OnboardingOffboarding: React.lazy(() => import('./components/UserManagement/OnboardingOffboarding')),
  MultipleIDManagement: React.lazy(() => import('./components/UserManagement/MultipleIDManagement')),

  // コスト最適化
  LicenseUsageAnalysis: React.lazy(() => import('./components/CostOptimization/LicenseUsageAnalysis')),
  UnusedAccountDetection: React.lazy(() => import('./components/CostOptimization/UnusedAccountDetection')),
  CostReductionSuggestions: React.lazy(() => import('./components/CostOptimization/CostReductionSuggestions')),
  BudgetManagement: React.lazy(() => import('./components/CostOptimization/BudgetManagement')),

  // セキュリティ管理
  SecurityPolicyEnforcement: React.lazy(() => import('./components/SecurityManagement/SecurityPolicyEnforcement')),
  AccessAudit: React.lazy(() => import('./components/SecurityManagement/AccessAudit')),
  ThreatDetection: React.lazy(() => import('./components/SecurityManagement/ThreatDetection')),
  ComplianceReporting: React.lazy(() => import('./components/SecurityManagement/ComplianceReporting')),

  // レポーティング
  CustomReportBuilder: React.lazy(() => import('./components/Reporting/CustomReportBuilder')),
  AssetManagementReport: React.lazy(() => import('./components/Reporting/AssetManagementReport')),
  UsageAnalysisReport: React.lazy(() => import('./components/Reporting/UsageAnalysisReport')),
  SecurityComplianceReport: React.lazy(() => import('./components/Reporting/SecurityComplianceReport')),

  // UI
  Dashboard: React.lazy(() => import('./components/UI/Dashboard')),
  NavigationMenu: React.lazy(() => import('./components/UI/NavigationMenu')),
  DataVisualization: React.lazy(() => import('./components/UI/DataVisualization')),
  AccessibilityFeatures: React.lazy(() => import('./components/UI/AccessibilityFeatures')),
};

const DynamicComponent = ({ componentName, props = {} }) => {
  const Component = componentMap[componentName];

  if (!Component) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        コンポーネント "{componentName}" が見つかりません。
      </div>
    );
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      }
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{componentName}</h2>
          <Component {...props} />
        </div>
      </motion.div>
    </Suspense>
  );
};

export default DynamicComponent;