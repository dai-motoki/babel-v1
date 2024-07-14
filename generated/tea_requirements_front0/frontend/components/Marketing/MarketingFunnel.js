import React, { useState, useEffect, useMemo } from 'react';
import { Bar, Radar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, ArcElement } from 'chart.js';
import { FaInstagram, FaTiktok, FaYoutube, FaGlobe, FaLine, FaChartLine, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, ArcElement);

const MarketingFunnel = () => {
  const [animatedData, setAnimatedData] = useState({
    labels: [],
    datasets: [{
      label: 'ユーザー数',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }]
  });

  const [selectedChannels, setSelectedChannels] = useState(['全て']);
  const [radarData, setRadarData] = useState(null);
  const [conversionData, setConversionData] = useState(null);
  const [activeTab, setActiveTab] = useState('funnel');

  const funnelStages = useMemo(() => [
    { stage: '認知', users: { Instagram: 500000, TikTok: 400000, YouTube: 300000, '公式サイト': 200000, LINE: 100000 }, color: '#E1306C', source: 'Instagram', icon: FaInstagram },
    { stage: '興味', users: { Instagram: 300000, TikTok: 250000, YouTube: 200000, '公式サイト': 150000, LINE: 100000 }, color: '#00F2EA', source: 'TikTok', icon: FaTiktok },
    { stage: '検討', users: { Instagram: 200000, TikTok: 180000, YouTube: 170000, '公式サイト': 120000, LINE: 80000 }, color: '#FF0000', source: 'YouTube', icon: FaYoutube },
    { stage: '購入', users: { Instagram: 80000, TikTok: 70000, YouTube: 60000, '公式サイト': 50000, LINE: 40000 }, color: '#4CAF50', source: '公式サイト', icon: FaGlobe },
    { stage: 'リピート', users: { Instagram: 40000, TikTok: 35000, YouTube: 30000, '公式サイト': 25000, LINE: 20000 }, color: '#00B900', source: 'LINE', icon: FaLine }
  ], []);

  const channelDetails = useMemo(() => ({
    Instagram: {
      followers: 2000000,
      engagement: 4.5,
      topPost: 80,
      impressions: 15000000,
      adSpend: 5000000,
      roi: 350,
      conversionRate: 2.5
    },
    TikTok: {
      followers: 1500000,
      engagement: 8.2,
      topVideo: 90,
      views: 25000000,
      adSpend: 3500000,
      roi: 420,
      conversionRate: 3.0
    },
    YouTube: {
      subscribers: 500000,
      engagement: 7.5,
      topVideo: 85,
      views: 10000000,
      adSpend: 2000000,
      roi: 280,
      conversionRate: 1.8
    },
    '公式サイト': {
      visitors: 2000000,
      engagement: 3.5,
      topPost: 15000,
      impressions: 2000000,
      adSpend: 10000000,
      roi: 500,
      conversionRate: 3.5
    },
    LINE: {
      followers: 1000000,
      engagement: 98,
      topPost: 45,
      impressions: 1000000,
      adSpend: 1500000,
      roi: 600,
      conversionRate: 4.0
    }
  }), []);

  useEffect(() => {
    updateChartData();
    updateConversionData();
  }, [selectedChannels, funnelStages, channelDetails]);

  const updateChartData = () => {
    const filteredData = funnelStages.map(stage => {
      if (selectedChannels.includes('全て')) {
        return Object.values(stage.users).reduce((a, b) => a + b, 0);
      } else {
        return selectedChannels.reduce((sum, channel) => sum + (stage.users[channel] || 0), 0);
      }
    });

    setAnimatedData({
      labels: funnelStages.map(stage => stage.stage),
      datasets: [{
        label: 'ユーザー数',
        data: filteredData,
        backgroundColor: funnelStages.map(stage => stage.color),
        borderColor: funnelStages.map(stage => stage.color),
        borderWidth: 1
      }]
    });
  };

  const updateConversionData = () => {
    const conversionRates = Object.entries(channelDetails).map(([channel, details]) => ({
      channel,
      rate: details.conversionRate
    }));

    setConversionData({
      labels: conversionRates.map(item => item.channel),
      datasets: [{
        data: conversionRates.map(item => item.rate),
        backgroundColor: funnelStages.map(stage => stage.color),
        hoverOffset: 4
      }]
    });
  };

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'マーケティングファネル（2023年第4四半期）',
      },
    },
  };

  const handleChannelSelection = (channel) => {
    if (channel === '全て') {
      setSelectedChannels(['全て']);
    } else {
      const newSelection = selectedChannels.includes('全て') 
        ? [channel]
        : selectedChannels.includes(channel)
          ? selectedChannels.filter(c => c !== channel)
          : [...selectedChannels, channel];
      setSelectedChannels(newSelection.length ? newSelection : ['全て']);
    }
  };

  const updateRadarChart = (channel) => {
    const data = channelDetails[channel];
    setRadarData({
      labels: ['フォロワー数', 'エンゲージメント率', 'トップコンテンツ性能', 'インプレッション/視聴回数', '広告支出', 'ROI'],
      datasets: [{
        label: channel,
        data: [
          data.followers / 20000,
          data.engagement,
          data.topPost || data.topVideo,
          data.impressions ? data.impressions / 1000000 : data.views / 1000000,
          data.adSpend / 100000,
          data.roi
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'funnel':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '400px' }}
          >
            <Bar data={animatedData} options={options} />
          </motion.div>
        );
      case 'conversion':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '400px' }}
          >
            <div style={{ width: '48%' }}>
              <Doughnut data={conversionData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                  title: {
                    display: true,
                    text: 'チャネル別コンバージョン率',
                  },
                },
              }} />
            </div>
            <div style={{ width: '48%' }}>
              {radarData && <Radar data={radarData} />}
            </div>
          </motion.div>
        );
      case 'details':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '400px' }}
          >
            {radarData && <Radar data={radarData} />}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f8ff' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px', textAlign: 'center' }}>マーケティングファネル詳細分析</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#4CAF50' }}>チャネル選択</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleChannelSelection('全て')}
            style={{
              padding: '10px 15px',
              margin: '5px',
              backgroundColor: selectedChannels.includes('全て') ? '#4CAF50' : '#fff',
              color: selectedChannels.includes('全て') ? '#fff' : '#333',
              border: '2px solid #4CAF50',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            全て
          </motion.button>
          {funnelStages.map((stage, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChannelSelection(stage.source)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px',
                margin: '5px',
                backgroundColor: selectedChannels.includes(stage.source) ? stage.color : '#fff',
                color: selectedChannels.includes(stage.source) ? '#fff' : '#333',
                border: `2px solid ${stage.color}`,
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <stage.icon style={{ marginRight: '5px' }} /> {stage.source}
            </motion.button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('funnel')}
              style={{
                padding: '10px 20px',
                margin: '0 10px',
                backgroundColor: activeTab === 'funnel' ? '#4CAF50' : '#fff',
                color: activeTab === 'funnel' ? '#fff' : '#333',
                border: '2px solid #4CAF50',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              <FaChartLine style={{ marginRight: '5px' }} /> ファネル分析
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('conversion')}
              style={{
                padding: '10px 20px',
                margin: '0 10px',
                backgroundColor: activeTab === 'conversion' ? '#4CAF50' : '#fff',
                color: activeTab === 'conversion' ? '#fff' : '#333',
                border: '2px solid #4CAF50',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              <FaUsers style={{ marginRight: '5px' }} /> コンバージョン率
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('details')}
              style={{
                padding: '10px 20px',
                margin: '0 10px',
                backgroundColor: activeTab === 'details' ? '#4CAF50' : '#fff',
                color: activeTab === 'details' ? '#fff' : '#333',
                border: '2px solid #4CAF50',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              <FaMoneyBillWave style={{ marginRight: '5px' }} /> チャネル詳細
            </motion.button>
          </div>
          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2 style={{ color: '#4CAF50' }}>チャネル別詳細</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {Object.keys(channelDetails).map((channel, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              style={{
                width: '30%',
                minWidth: '250px',
                margin: '10px',
                padding: '15px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ color: funnelStages.find(stage => stage.source === channel).color }}>{channel}</h3>
              <p>フォロワー数: {(channelDetails[channel].followers || channelDetails[channel].visitors || 0).toLocaleString()}</p>
              <p>エンゲージメント率: {channelDetails[channel].engagement}%</p>
              <p>ROI: {channelDetails[channel].roi}%</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateRadarChart(channel)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 15px',
                  margin: '5px',
                  backgroundColor: '#fff',
                  color: '#333',
                  border: `2px solid ${funnelStages.find(stage => stage.source === channel).color}`,
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {channel}の詳細を表示
              </motion.button>
            </motion.div>
          ))}
          {radarData && (
            <div style={{ marginTop: '20px' }}>
              <Radar data={radarData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketingFunnel;
