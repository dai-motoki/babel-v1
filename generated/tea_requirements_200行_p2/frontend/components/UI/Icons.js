import React from 'react';
import { 
  Leaf, 
  Sunset, 
  Wind, 
  Droplet, 
  Zap,
  Settings,
  BarChart2,
  Shield,
  Coffee,
  ShoppingBag,
  Users,
  MessageCircle,
  FileText,
  Bell,
  Eye,
  Lock,
  AlertTriangle,
  Check,
  X
} from 'lucide-react';

const IconWrapper = ({ children, className }) => (
  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${className}`}>
    {children}
  </div>
);

export const MathaIcon = ({ className }) => (
  <IconWrapper className={`bg-green-100 ${className}`}>
    <Leaf className="w-5 h-5 text-green-600" />
  </IconWrapper>
);

export const SunsetIcon = ({ className }) => (
  <IconWrapper className={`bg-orange-100 ${className}`}>
    <Sunset className="w-5 h-5 text-orange-600" />
  </IconWrapper>
);

export const WindIcon = ({ className }) => (
  <IconWrapper className={`bg-blue-100 ${className}`}>
    <Wind className="w-5 h-5 text-blue-600" />
  </IconWrapper>
);

export const WaterDropIcon = ({ className }) => (
  <IconWrapper className={`bg-blue-100 ${className}`}>
    <Droplet className="w-5 h-5 text-blue-600" />
  </IconWrapper>
);

export const LightningIcon = ({ className }) => (
  <IconWrapper className={`bg-yellow-100 ${className}`}>
    <Zap className="w-5 h-5 text-yellow-600" />
  </IconWrapper>
);

export const SettingsIcon = ({ className }) => (
  <IconWrapper className={`bg-gray-100 ${className}`}>
    <Settings className="w-5 h-5 text-gray-600" />
  </IconWrapper>
);

export const ChartIcon = ({ className }) => (
  <IconWrapper className={`bg-purple-100 ${className}`}>
    <BarChart2 className="w-5 h-5 text-purple-600" />
  </IconWrapper>
);

export const SecurityIcon = ({ className }) => (
  <IconWrapper className={`bg-red-100 ${className}`}>
    <Shield className="w-5 h-5 text-red-600" />
  </IconWrapper>
);

export const TeaIcon = ({ className }) => (
  <IconWrapper className={`bg-green-100 ${className}`}>
    <Coffee className="w-5 h-5 text-green-600" />
  </IconWrapper>
);

export const ShoppingIcon = ({ className }) => (
  <IconWrapper className={`bg-indigo-100 ${className}`}>
    <ShoppingBag className="w-5 h-5 text-indigo-600" />
  </IconWrapper>
);

export const TeamIcon = ({ className }) => (
  <IconWrapper className={`bg-pink-100 ${className}`}>
    <Users className="w-5 h-5 text-pink-600" />
  </IconWrapper>
);

export const ChatIcon = ({ className }) => (
  <IconWrapper className={`bg-teal-100 ${className}`}>
    <MessageCircle className="w-5 h-5 text-teal-600" />
  </IconWrapper>
);

export const DocumentIcon = ({ className }) => (
  <IconWrapper className={`bg-gray-100 ${className}`}>
    <FileText className="w-5 h-5 text-gray-600" />
  </IconWrapper>
);

export const NotificationIcon = ({ className }) => (
  <IconWrapper className={`bg-red-100 ${className}`}>
    <Bell className="w-5 h-5 text-red-600" />
  </IconWrapper>
);

export const MonitorIcon = ({ className }) => (
  <IconWrapper className={`bg-blue-100 ${className}`}>
    <Eye className="w-5 h-5 text-blue-600" />
  </IconWrapper>
);

export const LockIcon = ({ className }) => (
  <IconWrapper className={`bg-yellow-100 ${className}`}>
    <Lock className="w-5 h-5 text-yellow-600" />
  </IconWrapper>
);

export const WarningIcon = ({ className }) => (
  <IconWrapper className={`bg-orange-100 ${className}`}>
    <AlertTriangle className="w-5 h-5 text-orange-600" />
  </IconWrapper>
);

export const SuccessIcon = ({ className }) => (
  <IconWrapper className={`bg-green-100 ${className}`}>
    <Check className="w-5 h-5 text-green-600" />
  </IconWrapper>
);

export const ErrorIcon = ({ className }) => (
  <IconWrapper className={`bg-red-100 ${className}`}>
    <X className="w-5 h-5 text-red-600" />
  </IconWrapper>
);

// 和風テイストのオリジナルアイコン
export const FanIcon = ({ className }) => (
  <IconWrapper className={`bg-pink-100 ${className}`}>
    <svg className="w-5 h-5 text-pink-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
      <path d="M12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6.9 13.1 6 12 6Z" fill="currentColor"/>
      <path d="M12 14C10.9 14 10 14.9 10 16C10 17.1 10.9 18 12 18C13.1 18 14 17.1 14 16C14 14.9 13.1 14 12 14Z" fill="currentColor"/>
      <path d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10Z" fill="currentColor"/>
      <path d="M18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10Z" fill="currentColor"/>
    </svg>
  </IconWrapper>
);

export const BambooIcon = ({ className }) => (
  <IconWrapper className={`bg-green-100 ${className}`}>
    <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 2V22M12 2V22M17 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 6H12M12 10H17M7 14H12M12 18H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </IconWrapper>
);

export const LanternIcon = ({ className }) => (
  <IconWrapper className={`bg-red-100 ${className}`}>
    <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V4M12 20V22M4 12H2M22 12H20M6 6L4 4M18 18L20 20M6 18L4 20M18 6L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6C9.79086 6 8 7.79086 8 10V14C8 16.2091 9.79086 18 12 18C14.2091 18 16 16.2091 16 14V10C16 7.79086 14.2091 6 12 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </IconWrapper>
);

export const TorilIcon = ({ className }) => (
  <IconWrapper className={`bg-orange-100 ${className}`}>
    <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 22V12H20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 7L12 2L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </IconWrapper>
);

const Icons = {
  MathaIcon,
  SunsetIcon,
  WindIcon,
  WaterDropIcon,
  LightningIcon,
  SettingsIcon,
  ChartIcon,
  SecurityIcon,
  TeaIcon,
  ShoppingIcon,
  TeamIcon,
  ChatIcon,
  DocumentIcon,
  NotificationIcon,
  MonitorIcon,
  LockIcon,
  WarningIcon,
  SuccessIcon,
  ErrorIcon,
  FanIcon,
  BambooIcon,
  LanternIcon,
  TorilIcon,
};

export default Icons;