import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingBag, Activity } from 'lucide-react';

const KPICard = ({ title, value, trend, icon: Icon }) => {
  const trendColor = trend > 0 ? 'text-green-500' : 'text-red-500';
  const TrendIcon = trend > 0 ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <Icon className="text-green-600" size={24} />
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-2">{value}</div>
      <div className={`flex items-center ${trendColor}`}>
        <TrendIcon size={16} className="mr-1" />
        <span className="text-sm">{Math.abs(trend)}%</span>
      </div>
    </div>
  );
};

const ChartCard = ({ title, data, dataKey, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#888888" />
          <YAxis stroke="#888888" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
            }}
          />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={color} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const KPIDashboard = () => {
  const [kpiData, setKpiData] = useState({
    revenue: { value: 0, trend: 0 },
    customers: { value: 0, trend: 0 },
    orders: { value: 0, trend: 0 },
    avgOrderValue: { value: 0, trend: 0 },
  });

  const [chartData, setChartData] = useState({
    revenue: [],
    customers: [],
  });

  useEffect(() => {
    // Simulate API call to fetch KPI data
    const fetchKPIData = () => {
      setKpiData({
        revenue: { value: '¥15,234,567', trend: 12.5 },
        customers: { value: '2,345', trend: 5.2 },
        orders: { value: '1,234', trend: -2.3 },
        avgOrderValue: { value: '¥12,345', trend: 3.7 },
      });
    };

    // Simulate API call to fetch chart data
    const fetchChartData = () => {
      const revenueData = [
        { name: '1月', value: 10000000 },
        { name: '2月', value: 12000000 },
        { name: '3月', value: 15000000 },
        { name: '4月', value: 13000000 },
        { name: '5月', value: 16000000 },
        { name: '6月', value: 15234567 },
      ];

      const customersData = [
        { name: '1月', value: 2000 },
        { name: '2月', value: 2100 },
        { name: '3月', value: 2200 },
        { name: '4月', value: 2250 },
        { name: '5月', value: 2300 },
        { name: '6月', value: 2345 },
      ];

      setChartData({
        revenue: revenueData,
        customers: customersData,
      });
    };

    fetchKPIData();
    fetchChartData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">KPIダッシュボード</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="売上高"
          value={kpiData.revenue.value}
          trend={kpiData.revenue.trend}
          icon={DollarSign}
        />
        <KPICard
          title="顧客数"
          value={kpiData.customers.value}
          trend={kpiData.customers.trend}
          icon={Users}
        />
        <KPICard
          title="注文数"
          value={kpiData.orders.value}
          trend={kpiData.orders.trend}
          icon={ShoppingBag}
        />
        <KPICard
          title="平均注文額"
          value={kpiData.avgOrderValue.value}
          trend={kpiData.avgOrderValue.trend}
          icon={Activity}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="月間売上推移"
          data={chartData.revenue}
          dataKey="value"
          color="#4CAF50"
        />
        <ChartCard
          title="月間顧客数推移"
          data={chartData.customers}
          dataKey="value"
          color="#2196F3"
        />
      </div>
    </div>
  );
};

export default KPIDashboard;