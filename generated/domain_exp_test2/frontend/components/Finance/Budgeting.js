import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Calendar, DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const COLORS = ['#006400', '#FFB7C5', '#4A2311', '#F3EAD3'];

const initialBudgetData = [
  { name: '原材料費', value: 300000, type: '支出' },
  { name: '人件費', value: 500000, type: '支出' },
  { name: '設備費', value: 200000, type: '支出' },
  { name: '広告宣伝費', value: 100000, type: '支出' },
  { name: '売上', value: 1500000, type: '収入' },
];

const monthlyData = [
  { name: '1月', 収入: 1200000, 支出: 900000 },
  { name: '2月', 収入: 1300000, 支出: 950000 },
  { name: '3月', 収入: 1500000, 支出: 1100000 },
  { name: '4月', 収入: 1400000, 支出: 1000000 },
  { name: '5月', 収入: 1600000, 支出: 1200000 },
  { name: '6月', 収入: 1800000, 支出: 1300000 },
];

const Budgeting = () => {
  const [budgetData, setBudgetData] = useState(initialBudgetData);
  const [selectedMonth, setSelectedMonth] = useState('6月');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const totalExpense = budgetData.filter(item => item.type === '支出').reduce((acc, item) => acc + item.value, 0);
    const totalIncome = budgetData.find(item => item.type === '収入')?.value || 0;
    if (totalExpense > totalIncome * 0.8) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [budgetData]);

  const handleBudgetChange = (index, newValue) => {
    const updatedBudgetData = [...budgetData];
    updatedBudgetData[index].value = Number(newValue);
    setBudgetData(updatedBudgetData);
  };

  const totalIncome = budgetData.find(item => item.type === '収入')?.value || 0;
  const totalExpense = budgetData.filter(item => item.type === '支出').reduce((acc, item) => acc + item.value, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="p-6 bg-[#F3EAD3] min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-[#4A2311] mb-8">和菓子店予算管理</h1>
      
      {showAlert && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <div className="flex items-center">
            <AlertCircle className="mr-2" />
            <p>支出が収入の80%を超えています。予算を見直してください。</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-[#006400] mb-4">予算内訳</h2>
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetData.filter(item => item.type === '支出')}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {budgetData.filter(item => item.type === '支出').map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {budgetData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-[#4A2311]">{item.name}</span>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => handleBudgetChange(index, e.target.value)}
                  className="w-32 px-2 py-1 border border-[#006400] rounded focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-[#006400] mb-4">月次推移</h2>
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="収入" fill="#006400" />
                <Bar dataKey="支出" fill="#FFB7C5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4">
            {monthlyData.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedMonth(item.name)}
                className={`px-3 py-1 rounded ${
                  selectedMonth === item.name ? 'bg-[#006400] text-white' : 'bg-[#F3EAD3] text-[#4A2311]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-[#006400] mb-4">予算サマリー</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F3EAD3] p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-[#4A2311]">総収入</span>
              <DollarSign className="text-[#006400]" />
            </div>
            <p className="text-2xl font-bold text-[#006400]">¥{totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-[#F3EAD3] p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-[#4A2311]">総支出</span>
              <Calendar className="text-[#FFB7C5]" />
            </div>
            <p className="text-2xl font-bold text-[#FFB7C5]">¥{totalExpense.toLocaleString()}</p>
          </div>
          <div className="bg-[#F3EAD3] p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-[#4A2311]">収支バランス</span>
              {balance >= 0 ? <TrendingUp className="text-[#006400]" /> : <TrendingDown className="text-[#FFB7C5]" />}
            </div>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-[#006400]' : 'text-[#FFB7C5]'}`}>
              ¥{balance.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budgeting;