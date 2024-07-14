import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TraditionalPatterns = () => {
  const [selectedPattern, setSelectedPattern] = useState('seigaiha');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedPattern]);

  const patternVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const renderPattern = () => {
    switch (selectedPattern) {
      case 'seigaiha':
        return <SeigaihaPattern />;
      case 'asanoha':
        return <AsanohaPattern />;
      case 'shippou':
        return <ShippouPattern />;
      case 'kikkou':
        return <KikkouPattern />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-900">伝統的な和柄パターン</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['seigaiha', 'asanoha', 'shippou', 'kikkou'].map((pattern) => (
          <button
            key={pattern}
            onClick={() => setSelectedPattern(pattern)}
            className={`px-4 py-2 rounded-full text-lg font-semibold transition-colors duration-300 ${
              selectedPattern === pattern
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-indigo-600 hover:bg-indigo-100'
            }`}
          >
            {patternNames[pattern]}
          </button>
        ))}
      </div>
      <motion.div
        variants={patternVariants}
        initial="hidden"
        animate={isAnimating ? 'hidden' : 'visible'}
        className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {renderPattern()}
      </motion.div>
    </div>
  );
};

const patternNames = {
  seigaiha: '青海波',
  asanoha: '麻の葉',
  shippou: '七宝',
  kikkou: '亀甲',
};

const SeigaihaPattern = () => (
  <div className="p-8 bg-blue-50">
    <div className="grid grid-cols-6 gap-4">
      {[...Array(36)].map((_, index) => (
        <motion.div
          key={index}
          className="w-16 h-16 bg-blue-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.02, duration: 0.5 }}
        />
      ))}
    </div>
  </div>
);

const AsanohaPattern = () => (
  <div className="p-8 bg-green-50">
    <div className="grid grid-cols-4 gap-4">
      {[...Array(16)].map((_, index) => (
        <motion.div
          key={index}
          className="w-24 h-24 relative"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: index * 0.05, duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-green-500 transform rotate-0" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          <div className="absolute inset-0 bg-green-600 transform rotate-60" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          <div className="absolute inset-0 bg-green-700 transform rotate-120" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
        </motion.div>
      ))}
    </div>
  </div>
);

const ShippouPattern = () => (
  <div className="p-8 bg-purple-50">
    <div className="grid grid-cols-5 gap-4">
      {[...Array(25)].map((_, index) => (
        <motion.div
          key={index}
          className="w-20 h-20 relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.03, duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-purple-500 rounded-full" />
          <div className="absolute inset-0 bg-purple-300 transform rotate-45" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
        </motion.div>
      ))}
    </div>
  </div>
);

const KikkouPattern = () => (
  <div className="p-8 bg-yellow-50">
    <div className="grid grid-cols-6 gap-1">
      {[...Array(36)].map((_, index) => (
        <motion.div
          key={index}
          className="w-16 h-16 bg-yellow-500"
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ delay: index * 0.02, duration: 0.5 }}
          style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
        />
      ))}
    </div>
  </div>
);

export default TraditionalPatterns;