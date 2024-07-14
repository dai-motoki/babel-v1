import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressStatus = () => {
  const [activeTab, setActiveTab] = useState('タスク進捗');
  const [animatedData, setAnimatedData] = useState({
    taskProgress: {
      labels: [],
      datasets: [{
        label: '完了タスク',
        data: [],
        backgroundColor: '#4BC0C0',
      }, {
        label: '残タスク',
        data: [],
        backgroundColor: '#FF6384',
      }]
    },
    timelineProgress: {
      labels: [],
      datasets: [{
        label: '計画',
        data: [],
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }, {
        label: '実績',
        data: [],
        borderColor: '#FFCE56',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      }]
    }
  });

  const projects = [
    { name: "プロジェクトA", completedTasks: 30, totalTasks: 50, plannedProgress: 70, actualProgress: 60 },
    { name: "プロジェクトB", completedTasks: 45, totalTasks: 60, plannedProgress: 80, actualProgress: 75 },
    { name: "プロジェクトC", completedTasks: 20, totalTasks: 40, plannedProgress: 60, actualProgress: 50 },
    { name: "プロジェクトD", completedTasks: 35, totalTasks: 45, plannedProgress: 90, actualProgress: 78 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData({
        taskProgress: {
          labels: projects.map(p => p.name),
          datasets: [{
            label: '完了タスク',
            data: projects.map(p => p.completedTasks),
            backgroundColor: '#4BC0C0',
          }, {
            label: '残タスク',
            data: projects.map(p => p.totalTasks - p.completedTasks),
            backgroundColor: '#FF6384',
          }]
        },
        timelineProgress: {
          labels: projects.map(p => p.name),
          datasets: [{
            label: '計画',
            data: projects.map(p => p.plannedProgress),
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          }, {
            label: '実績',
            data: projects.map(p => p.actualProgress),
            borderColor: '#FFCE56',
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
          }]
        }
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const renderChart = () => {
    switch(activeTab) {
      case 'タスク進捗':
        return <Bar data={animatedData.taskProgress} options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { stacked: true },
            y: { stacked: true }
          }
        }} />;
      case 'タイムライン進捗':
        return <Line data={animatedData.timelineProgress} options={{
          responsive: true,
          maintainAspectRatio: false,
        }} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>プロジェクト進捗状況</h1>
      <div style={{ marginBottom: '20px' }}>
        {['タスク進捗', 'タイムライン進捗'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 15px',
              marginRight: '10px',
              backgroundColor: activeTab === tab ? '#4CAF50' : '#f0f0f0',
              color: activeTab === tab ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ height: '400px' }}>
        {renderChart()}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ color: '#4CAF50' }}>プロジェクト概要</h2>
        {projects.map((project, index) => (
          <div key={index} style={{ marginBottom: '15px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{project.name}</h3>
            <p style={{ margin: '5px 0' }}><strong>タスク進捗:</strong> {project.completedTasks}/{project.totalTasks} ({Math.round(project.completedTasks/project.totalTasks*100)}%)</p>
            <p style={{ margin: '5px 0' }}><strong>タイムライン進捗:</strong> 計画 {project.plannedProgress}% / 実績 {project.actualProgress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStatus;
