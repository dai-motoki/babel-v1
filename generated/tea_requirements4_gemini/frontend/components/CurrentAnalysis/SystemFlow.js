import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SystemFlow = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const boxVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
        delay: 0.4,
      },
    },
  };

  return (
    <div className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            システムフロー
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            抹茶カフェのウェブサイトにおけるシステムの流れを分かりやすく図解します。
          </p>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={boxVariants}
          className="mt-12 flex flex-col items-center"
        >
          {/* ユーザー */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center relative">
            <img
              src="/api/placeholder/100/100"
              alt="ユーザー"
              className="rounded-full w-24 h-24 object-cover"
            />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              ユーザー
            </h3>
            <motion.div
              variants={arrowVariants}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <svg
                className="w-6 h-6 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l.293.293a1 1 0 001.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          </div>

          {/* ウェブサイト */}
          <motion.div
            variants={arrowVariants}
            className="mt-8 flex items-center"
          >
            <svg
              className="w-6 h-6 text-gray-400 transform rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <div className="bg-green-500 rounded-lg shadow-md p-6 mx-4 flex flex-col items-center">
              <img
                src="/api/placeholder/150/100"
                alt="ウェブサイト"
                className="rounded-md"
              />
              <h3 className="mt-4 text-lg font-medium text-white">
                ウェブサイト
              </h3>
            </div>
            <svg
              className="w-6 h-6 text-gray-400 transform -rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>

          {/* データベース */}
          <motion.div
            variants={arrowVariants}
            className="mt-8 flex flex-col items-center"
          >
            <svg
              className="w-6 h-6 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l.293.293a1 1 0 001.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <div className="bg-white rounded-lg shadow-md p-6 mt-4 flex flex-col items-center">
              <img
                src="/api/placeholder/100/100"
                alt="データベース"
                className="rounded-md"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                データベース
              </h3>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemFlow;
