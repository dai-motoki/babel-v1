import React, { useState, useEffect } from 'react';
import { Line, Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Filler, Tooltip, Legend } from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaExclamationTriangle, FaLock, FaUserSecret, FaNetworkWired } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Filler, Tooltip, Legend);

const SecurityLogs = () => {
  const [activeTab, setActiveTab] = useState('ログ分析');
  const [animatedData, setAnimatedData] = useState({
    logAnalysis: {
      labels: [],
      datasets: [{
        label: 'セキュリティイベント数',
        data: [],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      }]
    },
    threatDistribution: {
      labels: [],
      datasets: [{
        label: '脅威の種類別分布',
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      }]
    },
    securityScore: {
      labels: ['ネットワークセキュリティ', 'アプリケーションセキュリティ', 'データセキュリティ', '物理セキュリティ', 'ユーザー教育'],
      datasets: [{
        label: 'セキュリティスコア',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    }
  });

  const securityEvents = [
    { type: '不正アクセス試行', count: 1250, icon: FaExclamationTriangle, color: '#FF6384' },
    { type: 'マルウェア検出', count: 450, icon: FaShieldAlt, color: '#36A2EB' },
    { type: 'データ漏洩', count: 75, icon: FaLock, color: '#FFCE56' },
    { type: '内部脅威', count: 200, icon: FaUserSecret, color: '#4BC0C0' },
    { type: 'ネットワーク異常', count: 800, icon: FaNetworkWired, color: '#9966FF' }
  ];

  useEffect(() => {
    const generateRandomData = (count, max) => Array.from({ length: count }, () => Math.floor(Math.random() * max));

    const timer = setTimeout(() => {
      setAnimatedData({
        logAnalysis: {
          labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
          datasets: [{
            label: 'セキュリティイベント数',
            data: generateRandomData(30, 100),
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            fill: true,
          }]
        },
        threatDistribution: {
          labels: securityEvents.map(event => event.type),
          datasets: [{
            label: '脅威の種類別分布',
            data: securityEvents.map(event => event.count),
            backgroundColor: securityEvents.map(event => event.color),
          }]
        },
        securityScore: {
          labels: ['ネットワークセキュリティ', 'アプリケーションセキュリティ', 'データセキュリティ', '物理セキュリティ', 'ユーザー教育'],
          datasets: [{
            label: 'セキュリティスコア',
            data: generateRandomData(5, 10),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          }]
        }
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const securityInsights = [
    "過去30日間で最も多く検出された脅威は不正アクセス試行であり、ファイアウォールとIDS/IPSの強化が推奨されます。",
    "マルウェア検出数が前月比20%増加しており、エンドポイントセキュリティの見直しが必要です。",
    "内部脅威の検出数が増加傾向にあり、従業員教育とアクセス権限の見直しが急務です。",
    "データ漏洩インシデントは減少していますが、引き続き暗号化とデータアクセス監視の強化が重要です。",
    "ネットワーク異常の検出パターンから、新たな種類のサイバー攻撃の可能性が示唆されています。詳細な調査を推奨します。"
  ];

  const renderChart = () => {
    switch(activeTab) {
      case 'ログ分析':
        return <Line data={animatedData.logAnalysis} options={{responsive: true, maintainAspectRatio: false}} />;
      case '脅威分布':
        return <Bar data={animatedData.threatDistribution} options={{responsive: true, maintainAspectRatio: false}} />;
      case 'セキュリティスコア':
        return <Radar data={animatedData.securityScore} options={{responsive: true, maintainAspectRatio: false}} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px', textAlign: 'center' }}
      >
        セキュリティログ分析ダッシュボード
      </motion.h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ width: '65%', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        >
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            {['ログ分析', '脅威分布', 'セキュリティスコア'].map(tab => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 15px',
                  marginRight: '10px',
                  backgroundColor: activeTab === tab ? '#4CAF50' : '#f0f0f0',
                  color: activeTab === tab ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode='wait'>
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{ height: '400px' }}
            >
              {renderChart()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ width: '30%' }}
        >
          <h2 style={{ color: '#4CAF50', textAlign: 'center' }}>セキュリティイベントサマリー</h2>
          {securityEvents.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ 
                marginBottom: '15px', 
                backgroundColor: 'white', 
                padding: '15px', 
                borderRadius: '10px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <event.icon size={24} color={event.color} style={{ marginRight: '10px' }} />
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{event.type}</h3>
                  <p style={{ margin: '0', color: '#666' }}>検出数: {event.count}</p>
                </div>
              </div>
              <motion.div 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: event.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {Math.round(event.count / securityEvents.reduce((acc, curr) => acc + curr.count, 0) * 100)}%
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
      >
        <h2 style={{ color: '#4CAF50', textAlign: 'center' }}>セキュリティ洞察</h2>
        <ul style={{ paddingLeft: '20px' }}>
          {securityInsights.map((insight, index) => (
            <motion.li 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ marginBottom: '10px', color: '#333' }}
            >
              {insight}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default SecurityLogs;
