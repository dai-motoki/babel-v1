import React from 'react';
import { motion } from 'framer-motion';

const SushiIcon = ({ type, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  };

  const renderIcon = () => {
    switch (type) {
      case 'maguro':
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={`${sizeClasses[size]} ${className} text-red-600`}
            variants={iconVariants}
            whileHover="hover"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </motion.svg>
        );
      case 'sake':
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={`${sizeClasses[size]} ${className} text-pink-300`}
            variants={iconVariants}
            whileHover="hover"
          >
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </motion.svg>
        );
      case 'tamago':
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={`${sizeClasses[size]} ${className} text-yellow-400`}
            variants={iconVariants}
            whileHover="hover"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </motion.svg>
        );
      case 'ebi':
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={`${sizeClasses[size]} ${className} text-orange-400`}
            variants={iconVariants}
            whileHover="hover"
          >
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
            <path d="M6 12h12v2H6z" />
          </motion.svg>
        );
      case 'unagi':
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={`${sizeClasses[size]} ${className} text-brown-600`}
            variants={iconVariants}
            whileHover="hover"
          >
            <path d="M3 17h18v2H3v-2zm0-7h18v5H3v-5zm0-4h18v2H3V6z" />
          </motion.svg>
        );
      case 'wasabi':
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={`${sizeClasses[size]} ${className} text-green-500`}
            variants={iconVariants}
            whileHover="hover"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </motion.svg>
        );
      default:
        return null;
    }
  };

  return renderIcon();
};

const SushiIconSet = () => {
  const iconTypes = ['maguro', 'sake', 'tamago', 'ebi', 'unagi', 'wasabi'];

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 font-japanese">寿司アイコンセット</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {iconTypes.map((type) => (
          <div key={type} className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-lg mb-2">
              <SushiIcon type={type} size="lg" />
            </div>
            <span className="text-sm font-medium text-gray-700 capitalize">{type}</span>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 font-japanese">使用例</h3>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4 mb-4">
            <SushiIcon type="maguro" size="md" />
            <span className="text-lg font-medium text-gray-800">マグロ握り</span>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <SushiIcon type="sake" size="md" />
            <span className="text-lg font-medium text-gray-800">サーモン握り</span>
          </div>
          <div className="flex items-center space-x-4">
            <SushiIcon type="tamago" size="md" />
            <span className="text-lg font-medium text-gray-800">玉子焼き</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SushiIconSet;