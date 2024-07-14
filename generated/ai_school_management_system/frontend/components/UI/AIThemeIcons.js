import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Cpu, 
  Database, 
  Network, 
  Zap,
  Code,
  PenTool,
  Briefcase,
  BookOpen,
  Users,
  TrendingUp,
  MessageCircle
} from 'lucide-react';

const iconComponents = {
  Brain,
  Cpu,
  Database,
  Network,
  Zap,
  Code,
  PenTool,
  Briefcase,
  BookOpen,
  Users,
  TrendingUp,
  MessageCircle
};

const AIThemeIcon = ({ name, size = 24, color = 'currentColor', className = '' }) => {
  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    return <div className="w-6 h-6 bg-gray-200 rounded-full"></div>;
  }

  return <IconComponent size={size} color={color} className={className} />;
};

const AIThemeIcons = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const iconNames = Object.keys(iconComponents);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon(iconNames[Math.floor(Math.random() * iconNames.length)]);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 to-pink-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 font-japanese">AIテーマアイコン</h2>
      <motion.div 
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {iconNames.map((name) => (
          <motion.div 
            key={name}
            className={`flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-all duration-300 ${
              activeIcon === name ? 'ring-2 ring-indigo-500' : ''
            }`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="mb-2">
              <AIThemeIcon 
                name={name} 
                size={32} 
                color={activeIcon === name ? '#6366F1' : '#4B5563'}
                className={`transition-all duration-300 ${isAnimating && activeIcon === name ? 'animate-pulse' : ''}`}
              />
            </div>
            <span className="text-sm text-gray-600 font-japanese">{name}</span>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 font-japanese">アイコン使用例</h3>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <AIThemeIcon name="Brain" size={24} color="#6366F1" className="mr-2" />
            <span className="text-lg font-semibold text-gray-800 font-japanese">AI学習</span>
          </div>
          <div className="flex items-center mb-4">
            <AIThemeIcon name="BookOpen" size={24} color="#8B5CF6" className="mr-2" />
            <span className="text-lg font-semibold text-gray-800 font-japanese">オンライン講座</span>
          </div>
          <div className="flex items-center">
            <AIThemeIcon name="TrendingUp" size={24} color="#EC4899" className="mr-2" />
            <span className="text-lg font-semibold text-gray-800 font-japanese">パフォーマンス分析</span>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 font-japanese">カスタムアイコン</h3>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex space-x-4">
            <CustomIcon icon="ai" />
            <CustomIcon icon="robot" />
            <CustomIcon icon="chip" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomIcon = ({ icon }) => {
  const iconPaths = {
    ai: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z",
    robot: "M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h2a2 2 0 0 1 2 2v2h1a3 3 0 0 1 3 3v7h-2v-7a1 1 0 0 0-1-1h-1v2a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-2H6a1 1 0 0 0-1 1v7H3v-7a3 3 0 0 1 3-3h1V9a2 2 0 0 1 2-2h2V5.72c-.6-.34-1-.98-1-1.72a2 2 0 0 1 2-2zm3 10H9v2h6v-2z",
    chip: "M9 2v2H7v2H5v2H3v8h2v2h2v2h2v2h8v-2h2v-2h2v-2h2V8h-2V6h-2V4h-2V2H9zm0 2h6v2h2v2h2v6h-2v2h-2v2H9v-2H7v-2H5V8h2V6h2V4zm3 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
  };

  return (
    <div className="flex flex-col items-center">
      <svg 
        viewBox="0 0 24 24" 
        className="w-12 h-12 text-indigo-600 mb-2"
        fill="currentColor"
      >
        <path d={iconPaths[icon]} />
      </svg>
      <span className="text-sm text-gray-600 font-japanese">{icon}</span>
    </div>
  );
};

export default AIThemeIcons;