import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pie, Bar, Radar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler);

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Zoltraakの革新的な機能
  const features = [
    {
      title: "AIによる超高速コード生成",
      description: "最先端のAIがあなたの意図を理解し、瞬時に高品質なコードを生成します。",
      icon: "🚀"
    },
    {
      title: "リアルタイムグローバル協調編集",
      description: "世界中のチームメンバーと同時にコードを編集。距離を超えた真のコラボレーションを実現します。",
      icon: "🌍"
    },
    {
      title: "AIパワード統合デバッグツール",
      description: "AIがバグを予測し、自動修正案を提示。デバッグ時間を劇的に短縮します。",
      icon: "🔧"
    }
  ];

  // 生産性向上データ
  const productivityData = {
    labels: ['コーディング時間', 'バグ修正時間', 'プロジェクト管理時間'],
    datasets: [
      {
        label: '従来のツール',
        data: [100, 80, 60],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Zoltraak',
        data: [20, 15, 10],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#4CAF50', fontSize: '3em', marginBottom: '20px' }}>Zoltraak エディタだよ</h1>
        <p style={{ fontSize: '1.5em', color: '#666', marginBottom: '30px' }}>
          革新的AIが融合した次世代統合開発環境
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '15px 30px',
            fontSize: '1.2em',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          今すぐ試す
        </motion.button>
      </header>

      <main>
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px', marginBottom: '30px' }}>革新的な機能</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {features.map((feature, index) => (
              <div key={index} style={{ width: '30%', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
                <h3 style={{ color: '#4CAF50', marginBottom: '10px' }}>{feature.icon} {feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px', marginBottom: '30px' }}>生産性の飛躍的向上</h2>
          <div style={{ height: '400px', marginBottom: '30px' }}>
            <Bar data={productivityData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </section>

        <section style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>今すぐZoltraakを体験しよう</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '15px 30px',
              fontSize: '1.2em',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            無料トライアルを開始
          </motion.button>
        </section>
      </main>

      <footer style={{ textAlign: 'center', color: '#666' }}>
        <p>© 2023 Zoltraak エディタだよ. 未来を創造する。</p>
      </footer>
    </div>
  );
};

export default LandingPage;
