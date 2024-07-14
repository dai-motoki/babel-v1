import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ChevronDown, Menu, X, Users, BookOpen, DollarSign, Briefcase, BarChart2, Settings, Video, FileText, Calendar, CreditCard, FileSpreadsheet, Building, MessageSquare, Clipboard, TrendingUp, Zap, Layout, Accessibility, Mail, CreditCard as PaymentIcon, UserCheck, Edit3, BarChart, Share2, TrendingUp as MarketTrend, DollarSign as SalesDollar, Users as LeadIcon, FileText as QuotationIcon, Library, GitBranch, ThumbsUp, Link, User, UserPlus } from 'lucide-react';

const componentMap = {
  // 学生管理
  StudentRegistration: lazy(() => import('./components/StudentManagement/StudentRegistration')),
  StudentProfile: lazy(() => import('./components/StudentManagement/StudentProfile')),
  ClassAssignment: lazy(() => import('./components/StudentManagement/ClassAssignment')),
  Test: lazy(() => import('./components/StudentManagement/Test')),
  
  // コース管理
  VideoLessons: lazy(() => import('./components/CourseManagement/VideoLessons')),
  HomeworkManagement: lazy(() => import('./components/CourseManagement/HomeworkManagement')),
  CourseSchedule: lazy(() => import('./components/CourseManagement/CourseSchedule')),
  
  // 財務管理
  AccountManagement: lazy(() => import('./components/FinanceManagement/AccountManagement')),
  PaymentProcessing: lazy(() => import('./components/FinanceManagement/PaymentProcessing')),
  FinancialReporting: lazy(() => import('./components/FinanceManagement/FinancialReporting')),
  
  // キャリアサポート
  CompanyRecommendation: lazy(() => import('./components/CareerSupport/CompanyRecommendation')),
  CareerCounseling: lazy(() => import('./components/CareerSupport/CareerCounseling')),
  JobApplicationTracker: lazy(() => import('./components/CareerSupport/JobApplicationTracker')),
  
  // 分析
  StudentPerformance: lazy(() => import('./components/Analytics/StudentPerformance')),
  CourseEffectiveness: lazy(() => import('./components/Analytics/CourseEffectiveness')),
  EnrollmentTrends: lazy(() => import('./components/Analytics/EnrollmentTrends')),
  
  // UI
  AIThemeIcons: lazy(() => import('./components/UI/AIThemeIcons')),
  ResponsiveLayout: lazy(() => import('./components/UI/ResponsiveLayout')),
  AccessibilityFeatures: lazy(() => import('./components/UI/AccessibilityFeatures')),
  
  // 統合
  GoogleDriveIntegration: lazy(() => import('./components/Integrations/GoogleDriveIntegration')),
  EmailSystem: lazy(() => import('./components/Integrations/EmailSystem')),
  PaymentGateway: lazy(() => import('./components/Integrations/PaymentGateway')),
  
  // 講師管理
  InstructorProfile: lazy(() => import('./components/InstructorManagement/InstructorProfile')),
  LessonPlanner: lazy(() => import('./components/InstructorManagement/LessonPlanner')),
  PerformanceEvaluation: lazy(() => import('./components/InstructorManagement/PerformanceEvaluation')),
  
  // マーケティング管理
  CampaignPlanner: lazy(() => import('./components/MarketingManagement/CampaignPlanner')),
  SocialMediaIntegration: lazy(() => import('./components/MarketingManagement/SocialMediaIntegration')),
  MarketAnalysis: lazy(() => import('./components/MarketingManagement/MarketAnalysis')),
  
  // 販売管理
  SalesDashboard: lazy(() => import('./components/SalesManagement/SalesDashboard')),
  LeadManagement: lazy(() => import('./components/SalesManagement/LeadManagement')),
  QuotationGenerator: lazy(() => import('./components/SalesManagement/QuotationGenerator')),
  
  // コースコンテンツ管理
  ContentLibrary: lazy(() => import('./components/CourseContentManagement/ContentLibrary')),
  VersionControl: lazy(() => import('./components/CourseContentManagement/VersionControl')),
  ContentRecommendation: lazy(() => import('./components/CourseContentManagement/ContentRecommendation')),
};

const DynamicComponent = () => {
  const [activeComponent, setActiveComponent] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('student'); // デフォルトは学生として設定

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 権限ごとのメニュー項目の定義
  const menuItemsByRole = {
    instructor: [
      { name: 'コース管理', icon: BookOpen, subItems: [
        { name: '映像授業', key: 'VideoLessons', icon: Video },
        { name: '宿題管理', key: 'HomeworkManagement', icon: FileText },
        { name: 'コーススケジュール', key: 'CourseSchedule', icon: Calendar },
      ]},
      { name: 'コースコンテンツ管理', icon: BookOpen, subItems: [
        { name: 'コンテンツ生成', key: 'ContentLibrary', icon: Library },
        { name: 'バージョン管理', key: 'VersionControl', icon: GitBranch },
      ]},
      { name: '学生管理', icon: Users, subItems: [
        { name: '学生プロフィール', key: 'StudentProfile', icon: User },
        { name: 'クラス分け', key: 'ClassAssignment', icon: Users },
        { name: 'テスト', key: 'Test', icon: Users },
      ]},
      { name: '講師管理', icon: UserCheck, subItems: [
        { name: '講師プロフィール', key: 'InstructorProfile', icon: User },
        { name: '授業計画', key: 'LessonPlanner', icon: Edit3 },
      ]},
      { name: '分析', icon: BarChart2, subItems: [
        { name: '学生パフォーマンス', key: 'StudentPerformance', icon: TrendingUp },
        { name: 'コース効果', key: 'CourseEffectiveness', icon: BarChart2 },
      ]},
    ],
    student: [
      { name: 'コース管理', icon: BookOpen, subItems: [
        { name: '映像授業', key: 'VideoLessons', icon: Video },
        { name: '宿題管理', key: 'HomeworkManagement', icon: FileText },
        { name: 'コーススケジュール', key: 'CourseSchedule', icon: Calendar },
        { name: 'コンテンツ推薦', key: 'ContentRecommendation', icon: ThumbsUp },
        { name: 'テスト', key: 'Test', icon: Users },
      ]},
      // { name: 'コース', icon: BookOpen, subItems: [
      //   { name: '受講中のコース', key: 'EnrolledCourses', icon: Video },
      //   { name: '宿題', key: 'Homework', icon: FileText },
      //   { name: 'スケジュール', key: 'MySchedule', icon: Calendar },
      // ]},
      { name: 'キャリアサポート', icon: Briefcase, subItems: [
        { name: '企業推薦', key: 'CompanyRecommendation', icon: Building },
        { name: 'キャリアカウンセリング', key: 'CareerCounseling', icon: MessageSquare },
        { name: '就職活動追跡', key: 'JobApplicationTracker', icon: Clipboard },
      ]},
      { name: '設定', icon: Settings, subItems: [
        { name: 'プロフィール設定', key: 'ProfileSettings', icon: User },
        { name: 'アカウント設定', key: 'AccountSettings', icon: Settings },
      ]},
    ],
    admin: [
      { name: '学生管理', icon: Users, subItems: [
        { name: '学生登録', key: 'StudentRegistration', icon: UserPlus },
        { name: '学生プロフィール', key: 'StudentProfile', icon: User },
        { name: 'クラス分け', key: 'ClassAssignment', icon: Users },
        { name: 'テスト', key: 'Test', icon: Users },
      ]},
      { name: '講師管理', icon: UserCheck, subItems: [
        { name: '講師プロフィール', key: 'InstructorProfile', icon: User },
        { name: '授業計画', key: 'LessonPlanner', icon: Edit3 },
        { name: '講師評価', key: 'PerformanceEvaluation', icon: BarChart },
      ]},
      { name: '分析', icon: BarChart2, subItems: [
        { name: '学生パフォーマンス', key: 'StudentPerformance', icon: TrendingUp },
        { name: 'コース効果', key: 'CourseEffectiveness', icon: BarChart2 },
        { name: '入学傾向', key: 'EnrollmentTrends', icon: TrendingUp },
      ]},
      { name: '財務管理', icon: DollarSign, subItems: [
        { name: '口座管理', key: 'AccountManagement', icon: CreditCard },
        { name: '支払い処理', key: 'PaymentProcessing', icon: DollarSign },
        { name: '財務報告', key: 'FinancialReporting', icon: FileSpreadsheet },
      ]},
      { name: 'マーケティング管理', icon: TrendingUp, subItems: [
        { name: 'キャンペーン計画', key: 'CampaignPlanner', icon: Calendar },
        { name: 'SNS連携', key: 'SocialMediaIntegration', icon: Share2 },
        { name: '市場分析', key: 'MarketAnalysis', icon: MarketTrend },
      ]},
      { name: '販売管理', icon: SalesDollar, subItems: [
        { name: '販売ダッシュボード', key: 'SalesDashboard', icon: BarChart2 },
        { name: 'リード管理', key: 'LeadManagement', icon: LeadIcon },
        { name: '見積書生成', key: 'QuotationGenerator', icon: QuotationIcon },
      ]},
      { name: 'システム設定', icon: Settings, subItems: [
        { name: 'AIテーマアイコン', key: 'AIThemeIcons', icon: Zap },
        { name: 'レスポンシブレイアウト', key: 'ResponsiveLayout', icon: Layout },
        { name: 'アクセシビリティ機能', key: 'AccessibilityFeatures', icon: Accessibility },
      ]},
      { name: '統合', icon: Link, subItems: [
        { name: 'Google Drive連携', key: 'GoogleDriveIntegration', icon: Link },
        { name: 'メールシステム', key: 'EmailSystem', icon: Mail },
        { name: '決済ゲートウェイ', key: 'PaymentGateway', icon: PaymentIcon },
      ]},
    ],
  };

  const ActiveComponentToRender = componentMap[activeComponent];

  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (itemName) => {
    setExpandedItems(prev => ({ ...prev, [itemName]: !prev[itemName] }));
  };

  return (
    <div className="flex h-screen bg-[#E7E7FF] relative overflow-hidden">
      {/* 水玉模様の背景 */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-4 h-4 bg-indigo-200 rounded-full"></div>
        <div className="absolute top-10 left-10 w-6 h-6 bg-indigo-200 rounded-full"></div>
        <div className="absolute top-20 left-20 w-3 h-3 bg-indigo-200 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-5 h-5 bg-indigo-200 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-7 h-7 bg-indigo-200 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-indigo-200 rounded-full"></div>
      </div>

      <aside className={`bg-white text-gray-800 w-80 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-300 ease-in-out overflow-y-auto shadow-lg z-20`}>
        <nav>
          <div className="flex items-center justify-between mb-6 px-4 sticky top-0 bg-white z-10 py-4 rounded-lg">
            <span className="text-2xl font-bold text-indigo-800">生成AI塾</span>
            <button onClick={toggleMenu} className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors duration-200">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-6">
            <div className="px-4 py-2">
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full bg-white text-gray-800 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
              >
                <option value="student">受講者</option>
                <option value="instructor">講師</option>
                <option value="admin">管理者</option>
              </select>
            </div>
            {menuItemsByRole[userRole].map((item) => (
              <div key={item.name} className="mb-4">
                <div 
                  onClick={() => toggleExpand(item.name)}
                  className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-indigo-50 rounded-lg cursor-pointer transition-all duration-200 ease-in-out"
                >
                  <div className="flex items-center">
                    {item.icon && <item.icon size={20} className="mr-3 text-indigo-500" />}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-400 transform transition-transform duration-200 ${expandedItems[item.name] ? 'rotate-180' : ''}`} 
                  />
                </div>
                <div className={`mt-2 ml-4 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${expandedItems[item.name] ? 'max-h-96' : 'max-h-0'}`}>
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem.key}
                      href="#"
                      className={`block py-2 px-4 rounded-md transition duration-200 ${
                        activeComponent === subItem.key ? 'bg-red-100 text-red-600' : 'hover:bg-indigo-50'
                      }`}
                      onClick={() => setActiveComponent(subItem.key)}
                    >
                      <div className="flex items-center space-x-2">
                        {subItem.icon && <subItem.icon size={16} className="text-gray-400" />}
                        <span className="text-sm">{subItem.name}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#E7E7FF] relative z-10">
          <div className="container mx-auto px-6 py-8">
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            }>
              {ActiveComponentToRender && <ActiveComponentToRender />}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};
export default DynamicComponent;
