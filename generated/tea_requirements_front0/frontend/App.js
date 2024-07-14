import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./hooks";
import { projectOverview } from "./data";
import { FiSun, FiMoon } from "./components/Icons";
import DynamicComponent from "./DynamicComponent";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, toggleTheme] = useTheme();
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedChart, setSelectedChart] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const showChart = (chart) => {
    setSelectedChart(chart);
  };

  const renderSidebar = () => (
    <motion.div
      initial="closed"
      animate="open"
      variants={sidebarVariants}
      transition={{ duration: 0.5 }}
      style={{
        width: '250px',
        background: isDarkMode ? '#2D2D2D' : '#FFFFFF',
        color: isDarkMode ? '#FFFFFF' : '#000000',
        padding: '20px',
        overflowY: 'auto',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 style={{ borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>アプリケーション</h2>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {projectOverview.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3
              style={{ 
                cursor: 'pointer', 
                color: expandedSections[index] ? '#4CAF50' : 'inherit',
                marginBottom: '5px'
              }}
              onClick={() => toggleSection(index)}
            >
              {expandedSections[index] ? '▼' : '▶'} {section.name}
            </h3>
            <AnimatePresence>
              {expandedSections[index] && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ 
                    listStyleType: 'none', 
                    paddingLeft: '20px',
                    margin: '0',
                    borderLeft: '1px solid #4CAF50'
                  }}
                >
                  {section.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.05 }}
                      style={{ 
                        marginBottom: '5px',
                        position: 'relative',
                        cursor: 'pointer'
                      }}
                      onClick={() => showChart(item.component)}
                    >
                      <span style={{
                        position: 'absolute',
                        left: '-10px',
                        top: '50%',
                        width: '10px',
                        height: '1px',
                        background: '#4CAF50'
                      }}></span>
                      {item.name}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={toggleTheme}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: isDarkMode ? '#FFFFFF' : '#333333',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: '20px',
        }}
      >
        {isDarkMode ? <FiSun /> : <FiMoon />}
      </motion.button>
    </motion.div>
  );

  return (
    <div style={{
      display: 'flex',
      height: '94vh',
      background: isDarkMode ? '#1E1E1E' : '#F5F5F5',
      color: isDarkMode ? '#FFFFFF' : '#000000',
      transition: 'all 0.3s ease',
    }}>
      {renderSidebar()}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, width: '100%', overflow: 'auto' }}>
          {selectedChart ? <DynamicComponent component={selectedChart} /> : (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%',
              fontSize: '2rem',
              color: isDarkMode ? '#FFFFFF' : '#000000',
            }}>
              こんにちは、世界！
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

