import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Monitor,
  Users,
  DollarSign,
  Shield,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'react-feather';

const MenuItem = ({ icon: Icon, label, to, isCollapsed }) => (
  <Link
    to={to}
    className="flex items-center p-3 mb-2 text-gray-700 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
  >
    <Icon size={20} className="text-indigo-600" />
    {!isCollapsed && (
      <span className="ml-3 text-sm font-medium">{label}</span>
    )}
  </Link>
);

const NavigationMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { icon: Home, label: 'ダッシュボード', to: '/' },
    { icon: Monitor, label: 'デバイス管理', to: '/devices' },
    { icon: Users, label: 'ユーザー管理', to: '/users' },
    { icon: DollarSign, label: 'コスト最適化', to: '/cost' },
    { icon: Shield, label: 'セキュリティ', to: '/security' },
    { icon: BarChart2, label: 'レポート', to: '/reports' },
    { icon: Settings, label: '設定', to: '/settings' },
  ];

  return (
    <nav
      className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-semibold">職</span>
            </div>
            <h1 className="ml-2 text-xl font-bold text-gray-800">
              デジタル職人
            </h1>
          </div>
        )}
        <button
          onClick={toggleCollapse}
          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isCollapsed ? (
            <ChevronRight size={20} className="text-gray-600" />
          ) : (
            <ChevronLeft size={20} className="text-gray-600" />
          )}
        </button>
      </div>
      <div className="flex-grow overflow-y-auto py-4 px-3">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            to={item.to}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">山田 太郎</p>
              <p className="text-xs text-gray-500">管理者</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationMenu;