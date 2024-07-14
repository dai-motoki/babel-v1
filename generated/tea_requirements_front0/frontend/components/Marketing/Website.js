import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pie, Bar, Radar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler);

const Website = () => {
  const [activeSection, setActiveSection] = useState('home');
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
    },
    {
      title: "カスタマイズ可能な3Dダッシュボード",
      description: "プロジェクトの進捗を立体的に可視化。直感的な操作で複雑なデータも瞬時に把握できます。",
      icon: "📊"
    },
    {
      title: "AIによる自動最適化クラウド環境",
      description: "AIが自動的にリソースを最適化し、効率的な開発環境を提供します。",
      icon: "☁️"
    }
  ];

  // 生産性向上データ
  const productivityData = {
    labels: ['コーディング時間', 'バグ修正時間', 'プロジェクト管理時間', 'チーム連携時間', 'デプロイ時間'],
    datasets: [
      {
        label: '従来のツール',
        data: [100, 80, 60, 70, 50],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Zoltraak',
        data: [20, 15, 10, 15, 5],
        backgroundColor: 'rgba(255, 99, 71, 0.2)',
        borderColor: 'rgba(255, 99, 71, 1)',
        borderWidth: 1,
      },
    ],
  };

  // ユーザー満足度データ
  const satisfactionData = {
    labels: ['使いやすさ', '機能の豊富さ', 'パフォーマンス', 'サポート品質', '価格対効果'],
    datasets: [{
      label: 'ユーザー満足度',
      data: [95, 98, 97, 96, 99],
      fill: true,
      backgroundColor: 'rgba(255, 140, 0, 0.2)',
      borderColor: 'rgb(255, 140, 0)',
      pointBackgroundColor: 'rgb(255, 140, 0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 140, 0)'
    }]
  };

  // ROI予測データ
  const roiData = {
    labels: ['1ヶ月後', '3ヶ月後', '6ヶ月後', '1年後', '2年後'],
    datasets: [{
      label: '予測ROI (%)',
      data: [150, 300, 500, 1000, 2000],
      fill: false,
      borderColor: 'rgb(255, 69, 0)',
      tension: 0.1
    }]
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // セクションのレンダリング関数
  const renderSection = (section) => {
    // 各セクションの共通スタイル
    const sectionStyle = {
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(255,140,0,0.1)',
      background: 'linear-gradient(135deg, #fff, #fff8e1)',
      marginBottom: '50px',
    };

    // セクション別のコンテンツ
    const sectionContent = {
      home: (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={sectionStyle}
        >
          <h1 style={{ color: '#FF6F00', fontSize: '4em', marginBottom: '30px', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>Zoltraak エディタ</h1>
          <p style={{ fontSize: '1.8em', color: '#333', marginBottom: '40px', lineHeight: '1.6' }}>
            AIと人間の創造性が融合する、次世代の統合開発環境。<br/>
            コーディングの概念を根本から覆す、革命的なツール。
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,140,0,0.5)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '20px 40px',
              fontSize: '1.5em',
              backgroundColor: '#FF8C00',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setActiveSection('features')}
          >
            未来を体験する
          </motion.button>
        </motion.div>
      ),
      features: (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={sectionStyle}
        >
          <h2 style={{ color: '#FF6F00', fontSize: '3em', borderBottom: '3px solid #FF8C00', paddingBottom: '15px', marginBottom: '40px' }}>革新的機能</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ 
                  padding: '30px', 
                  boxShadow: '0 10px 20px rgba(255,140,0,0.1)', 
                  borderRadius: '15px',
                  background: 'linear-gradient(45deg, #fff, #fff5e6)'
                }}
              >
                <h3 style={{ color: '#FF8C00', marginBottom: '15px', fontSize: '1.8em' }}>{feature.icon} {feature.title}</h3>
                <p style={{ fontSize: '1.2em', lineHeight: '1.6' }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
      productivity: (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={sectionStyle}
        >
          <h2 style={{ color: '#FF6F00', fontSize: '3em', borderBottom: '3px solid #FF8C00', paddingBottom: '15px', marginBottom: '40px' }}>生産性の飛躍的向上</h2>
          <div style={{ height: '500px', marginBottom: '40px' }}>
            <Bar data={productivityData} options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 14
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    font: {
                      size: 14
                    }
                  }
                },
                x: {
                  ticks: {
                    font: {
                      size: 14
                    }
                  }
                }
              }
            }} />
          </div>
          <p style={{ fontSize: '1.3em', lineHeight: '1.8', textAlign: 'justify' }}>
            Zoltraakは、開発プロセスを根本から変革します。AIによる先進的なコード生成と
            リアルタイム協調編集により、コーディング時間を驚異の80%削減。
            革新的なデバッグツールがバグ修正時間を81%短縮し、
            直感的な3Dプロジェクトダッシュボードでプロジェクト管理時間を83%削減。
            さらに、グローバルコラボレーション機能でチーム連携時間を79%短縮し、
            AIによる自動最適化クラウド環境により、デプロイ時間を90%削減します。
            Zoltraakは単なるツールではなく、開発の未来そのものです。
          </p>
        </motion.div>
      ),
      satisfaction: (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={sectionStyle}
        >
          <h2 style={{ color: '#FF6F00', fontSize: '3em', borderBottom: '3px solid #FF8C00', paddingBottom: '15px', marginBottom: '40px' }}>圧倒的なユーザー満足度</h2>
          <div style={{ height: '500px', marginBottom: '40px' }}>
            <Radar data={satisfactionData} options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              scales: {
                r: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    stepSize: 20
                  }
                }
              },
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 14
                    }
                  }
                }
              }
            }} />
          </div>
          <p style={{ fontSize: '1.3em', lineHeight: '1.8', textAlign: 'justify' }}>
            Zoltraakは、開発者の夢を現実にする究極のツールです。
            直感的なUIによる比類なき使いやすさ、AIが織りなす無限の機能、
            想像を超えるパフォーマンス、24時間365日のAIによる至高のサポート、
            そして驚異的な価格対効果により、ユーザーから絶大な支持を獲得。
            Zoltraakは、開発者の可能性を無限に広げる、真の革命的ツールなのです。
          </p>
        </motion.div>
      ),
      roi: (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={sectionStyle}
        >
          <h2 style={{ color: '#FF6F00', fontSize: '3em', borderBottom: '3px solid #FF8C00', paddingBottom: '15px', marginBottom: '40px' }}>驚異的なROI</h2>
          <div style={{ height: '500px', marginBottom: '40px' }}>
            <Line data={roiData} options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 14
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(value) {
                      return value + '%';
                    },
                    font: {
                      size: 14
                    }
                  }
                },
                x: {
                  ticks: {
                    font: {
                      size: 14
                    }
                  }
                }
              }
            }} />
          </div>
          <p style={{ fontSize: '1.3em', lineHeight: '1.8', textAlign: 'justify' }}>
            Zoltraakへの投資は、未来への投資そのものです。
            導入後わずか1ヶ月で150%のROIを実現し、半年後には500%、
            1年後には驚異の1000%、2年後には想像を絶する2000%のROIが期待できます。
            この前例のない投資対効果は、Zoltraakがもたらす生産性の革命的向上と、
            競合他社を圧倒する革新的機能による市場支配力の強化によって実現されます。
            Zoltraakは、あなたのビジネスを次元の違う成功へと導く、唯一無二のツールです。
          </p>
        </motion.div>
      )
    };

    return sectionContent[section] || null;
  };

  return (
    <div style={{ 
      fontFamily: "'Roboto', sans-serif", 
      maxWidth: '1400px', 
      margin: '0 auto', 
      padding: '40px',
      background: 'linear-gradient(135deg, #fff, #fff8e1)',
      minHeight: '100vh'
    }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '60px',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(255,140,0,0.1)',
        background: 'white'
      }}>
        <svg width="250" height="60" viewBox="0 0 250 60">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6F00" />
              <stop offset="100%" stopColor="#FFA000" />
            </linearGradient>
          </defs>
          <text x="10" y="45" fontFamily="'Roboto', sans-serif" fontSize="40" fontWeight="bold" fill="url(#gradient)">
            Zoltraak
          </text>
          <path d="M220 15 L235 30 L220 45" stroke="url(#gradient)" strokeWidth="4" fill="none" />
        </svg>
        <nav>
          {['home', 'features', 'productivity', 'satisfaction', 'roi'].map((section) => (
            <motion.button
              key={section}
              onClick={() => setActiveSection(section)}
              whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(255,140,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                marginLeft: '25px',
                padding: '12px 20px',
                fontSize: '1.1em',
                backgroundColor: activeSection === section ? '#FF8C00' : 'white',
                color: activeSection === section ? 'white' : '#333',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.button>
          ))}
        </nav>
      </header>

      <main>
        <AnimatePresence mode="wait">
          {renderSection(activeSection)}
        </AnimatePresence>
      </main>

      <footer style={{ 
        marginTop: '60px', 
        textAlign: 'center', 
        color: '#666',
        padding: '20px',
        borderTop: '2px solid #FF8C00'
      }}>
        <p style={{ fontSize: '1.2em' }}>© 2023 Zoltraak エディタ. 未来を創造し、限界を超える。</p>
      </footer>
    </div>
  );
};

export default Website;
