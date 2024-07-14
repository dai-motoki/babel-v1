import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, Check, X } from 'react-feather';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [kpiData, setKpiData] = useState({
    totalDevices: 0,
    activeSaasApps: 0,
    costSavings: 0,
    securityScore: 0,
  });

  const [deviceUsage, setDeviceUsage] = useState({
    labels: [],
    datasets: [],
  });

  const [saasUsage, setSaasUsage] = useState({
    labels: [],
    datasets: [],
  });

  const [recentAlerts, setRecentAlerts] = useState([]);

  useEffect(() => {
    // Simulating API calls
    fetchKPIData();
    fetchDeviceUsageData();
    fetchSaasUsageData();
    fetchRecentAlerts();
  }, []);

  const fetchKPIData = () => {
    // Simulated API response
    setKpiData({
      totalDevices: 1250,
      activeSaasApps: 45,
      costSavings: 75000,
      securityScore: 85,
    });
  };

  const fetchDeviceUsageData = () => {
    setDeviceUsage({
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      datasets: [
        {
          label: 'デバイス使用率',
          data: [65, 70, 80, 81, 85, 87],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  const fetchSaasUsageData = () => {
    setSaasUsage({
      labels: ['Google Workspace', 'Salesforce', 'Slack', 'Zoom', 'Microsoft 365'],
      datasets: [
        {
          label: 'アクティブユーザー数',
          data: [500, 300, 450, 400, 350],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  const fetchRecentAlerts = () => {
    setRecentAlerts([
      { id: 1, type: 'warning', message: '未承認のSaaSアプリケーションが検出されました' },
      { id: 2, type: 'success', message: 'セキュリティポリシーが更新されました' },
      { id: 3, type: 'error', message: 'デバイスのセキュリティパッチが必要です' },
    ]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">ダッシュボード</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard title="総デバイス数" value={kpiData.totalDevices} icon={<DeviceIcon />} trend="up" />
        <KPICard title="アクティブSaaSアプリ" value={kpiData.activeSaasApps} icon={<AppIcon />} trend="up" />
        <KPICard title="コスト削減" value={`¥${kpiData.costSavings.toLocaleString()}`} icon={<SavingsIcon />} trend="up" />
        <KPICard title="セキュリティスコア" value={`${kpiData.securityScore}%`} icon={<SecurityIcon />} trend="down" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">デバイス使用率推移</h2>
          <Line data={deviceUsage} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">SaaSアプリ使用状況</h2>
          <Bar data={saasUsage} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">最近のアラート</h2>
        <ul>
          {recentAlerts.map((alert) => (
            <li key={alert.id} className="flex items-center py-2 border-b border-gray-200 last:border-b-0">
              {alert.type === 'warning' && <AlertTriangle className="text-yellow-500 mr-2" />}
              {alert.type === 'success' && <Check className="text-green-500 mr-2" />}
              {alert.type === 'error' && <X className="text-red-500 mr-2" />}
              <span className="text-gray-700">{alert.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
    <div className="flex flex-col items-end">
      {icon}
      {trend === 'up' && <ArrowUpRight className="text-green-500 mt-2" />}
      {trend === 'down' && <ArrowDownRight className="text-red-500 mt-2" />}
    </div>
  </div>
);

const DeviceIcon = () => (
  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  </div>
);

const AppIcon = () => (
  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  </div>
);

const SavingsIcon = () => (
  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </div>
);

const SecurityIcon = () => (
  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  </div>
);

export default Dashboard;