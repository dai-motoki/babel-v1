import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Users, BookOpen, DollarSign, Briefcase, BarChart2, Settings, Video, FileText, Calendar, CreditCard, FileSpreadsheet, Building, MessageSquare, Clipboard, TrendingUp, Zap, Layout, Accessibility, Lock } from 'lucide-react';
import DynamicComponent from './DynamicComponent';

// // 権限ごとのメニュー項目の定義
// const menuItemsByRole = {
//   instructor: [
//     { name: 'コース管理', icon: BookOpen, subItems: [
//       { name: '映像授業', key: 'VideoLessons', icon: Video },
//       { name: '宿題管理', key: 'HomeworkManagement', icon: FileText },
//       { name: 'コーススケジュール', key: 'CourseSchedule', icon: Calendar },
//     ]},
//     { name: '学生管理', icon: Users, subItems: [
//       { name: '学生プロフィール', key: 'StudentProfile', icon: Users },
//       { name: 'クラス分け', key: 'ClassAssignment', icon: Users },
//     ]},
//     { name: '分析', icon: BarChart2, subItems: [
//       { name: '学生パフォーマンス', key: 'StudentPerformance', icon: TrendingUp },
//       { name: 'コース効果', key: 'CourseEffectiveness', icon: BarChart2 },
//     ]},
//   ],
//   student: [
//     { name: 'コース', icon: BookOpen, subItems: [
//       { name: '受講中のコース', key: 'EnrolledCourses', icon: Video },
//       { name: '宿題', key: 'Homework', icon: FileText },
//       { name: 'スケジュール', key: 'MySchedule', icon: Calendar },
//     ]},
//     { name: 'キャリアサポート', icon: Briefcase, subItems: [
//       { name: '企業推薦', key: 'CompanyRecommendation', icon: Building },
//       { name: 'キャリアカウンセリング', key: 'CareerCounseling', icon: MessageSquare },
//       { name: '就職活動追跡', key: 'JobApplicationTracker', icon: Clipboard },
//     ]},
//     { name: '設定', icon: Settings, subItems: [
//       { name: 'プロフィール設定', key: 'ProfileSettings', icon: Users },
//       { name: 'アカウント設定', key: 'AccountSettings', icon: Settings },
//     ]},
//   ],
//   admin: [
//     { name: '学生管理', icon: Users, subItems: [
//       { name: '学生登録', key: 'StudentRegistration', icon: Users },
//       { name: '学生プロフィール', key: 'StudentProfile', icon: Users },
//       { name: 'クラス分け', key: 'ClassAssignment', icon: Users },
//     ]},
//     { name: '財務管理', icon: DollarSign, subItems: [
//       { name: '口座管理', key: 'AccountManagement', icon: CreditCard },
//       { name: '支払い処理', key: 'PaymentProcessing', icon: DollarSign },
//       { name: '財務報告', key: 'FinancialReporting', icon: FileSpreadsheet },
//     ]},
//     { name: '分析', icon: BarChart2, subItems: [
//       { name: '学生パフォーマンス', key: 'StudentPerformance', icon: TrendingUp },
//       { name: 'コース効果', key: 'CourseEffectiveness', icon: BarChart2 },
//       { name: '入学傾向', key: 'EnrollmentTrends', icon: TrendingUp },
//     ]},
//     { name: '設定', icon: Settings, subItems: [
//       { name: 'システム設定', key: 'SystemSettings', icon: Settings },
//       { name: 'ユーザー管理', key: 'UserManagement', icon: Users },
//       { name: 'アクセス権限', key: 'AccessControl', icon: Lock },
//     ]},
//   ],
// };

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [userRole, setUserRole] = useState('student'); // デフォルトは学生として設定
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `生成AI塾 - ${currentPage}`;
  }, [currentPage]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const Header = () => (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={toggleSidebar} className="lg:hidden text-gray-600 focus:outline-none">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <h2 className="text-xl font-semibold text-gray-800">{currentPage}</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="検索..."
              className="py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
          </div>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            <option value="student">受講者</option>
            <option value="instructor">講師</option>
            <option value="admin">管理者</option>
          </select>
        </div>
      </div>
    </header>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Header /> */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <DynamicComponent componentName={activeComponent} />
        </main>
        <footer className="bg-white shadow-md mt-auto">
          <div className="container mx-auto px-4 py-3 text-center text-gray-600">
            © 2023 生成AI塾管理システム. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;


