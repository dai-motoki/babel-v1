import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Calendar, DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const COLORS = ['#8E354A', '#F596AA', '#E16B8C', '#8E4B2B', '#D05A6E'];

const Budgeting = () => {
  const [budget, setBudget] = useState({
    total: 1000000,
    categories: {
      ingredients: 400000,
      labor: 300000,
      utilities: 100000,
      marketing: 150000,
      miscellaneous: 50000,
    },
  });

  const [expenses, setExpenses] = useState({
    ingredients: 380000,
    labor: 290000,
    utilities: 95000,
    marketing: 140000,
    miscellaneous: 45000,
  });

  const [selectedMonth, setSelectedMonth] = useState('4');

  const monthlyData = [
    { name: '1月', 予算: 900000, 支出: 850000 },
    { name: '2月', 予算: 950000, 支出: 920000 },
    { name: '3月', 予算: 1000000, 支出: 980000 },
    { name: '4月', 予算: 1000000, 支出: 950000 },
    { name: '5月', 予算: 1050000, 支出: 0 },
    { name: '6月', 予算: 1100000, 支出: 0 },
  ];

  const pieChartData = Object.entries(budget.categories).map(([category, value]) => ({
    name: category,
    value: value,
  }));

  const totalExpenses = Object.values(expenses).reduce((acc, curr) => acc + curr, 0);
  const remainingBudget = budget.total - totalExpenses;

  useEffect(() => {
    // 月が変更されたときの処理（実際のアプリケーションではAPIリクエストなどを行う）
    console.log(`Selected month: ${selectedMonth}`);
  }, [selectedMonth]);

  const handleBudgetChange = (category, value) => {
    setBudget(prevBudget => ({
      ...prevBudget,
      categories: {
        ...prevBudget.categories,
        [category]: Number(value),
      },
    }));
  };

  const handleExpenseChange = (category, value) => {
    setExpenses(prevExpenses => ({
      ...prevExpenses,
      [category]: Number(value),
    }));
  };

  return (
    <div className="p-6 bg-[#F3EAD3] min-h-screen">
      <h1 className="text-3xl font-bold text-[#4A2311] mb-8">和菓子店 予算管理</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#4A2311] mb-4 flex items-center">
            <Calendar className="mr-2" /> 月次予算概要
          </h2>
          <div className="mb-4">
            <label htmlFor="month" className="block text-sm font-medium text-[#4A2311] mb-1">月を選択:</label>
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full p-2 border border-[#4A2311] rounded-md bg-[#F3EAD3] text-[#4A2311]"
            >
              {monthlyData.map((data, index) => (
                <option key={index} value={index + 1}>{data.name}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="予算" fill="#8E354A" />
              <Bar dataKey="支出" fill="#D05A6E" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#4A2311] mb-4 flex items-center">
            <DollarSign className="mr-2" /> 予算配分
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4">
            {pieChartData.map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#4A2311] capitalize">{entry.name}</span>
                <span className="text-sm text-[#4A2311]">{`${((entry.value / budget.total) * 100).toFixed(1)}%`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#4A2311] mb-4 flex items-center">
          <TrendingUp className="mr-2" /> 予算と支出の詳細
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-[#4A2311]">
            <thead className="text-xs uppercase bg-[#F3EAD3]">
              <tr>
                <th className="px-6 py-3">カテゴリ</th>
                <th className="px-6 py-3">予算</th>
                <th className="px-6 py-3">支出</th>
                <th className="px-6 py-3">残額</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(budget.categories).map(([category, budgetAmount]) => (
                <tr key={category} className="border-b">
                  <td className="px-6 py-4 font-medium capitalize">{category}</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={budgetAmount}
                      onChange={(e) => handleBudgetChange(category, e.target.value)}
                      className="w-full p-1 border border-[#4A2311] rounded-md bg-[#F3EAD3] text-[#4A2311]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={expenses[category]}
                      onChange={(e) => handleExpenseChange(category, e.target.value)}
                      className="w-full p-1 border border-[#4A2311] rounded-md bg-[#F3EAD3] text-[#4A2311]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    {budgetAmount - expenses[category]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#4A2311] mb-4 flex items-center">
          <TrendingDown className="mr-2" /> 予算サマリー
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F3EAD3] p-4 rounded-lg">
            <h3 className="text-lg font-medium text-[#4A2311] mb-2">総予算</h3>
            <p className="text-2xl font-bold text-[#8E354A]">{budget.total.toLocaleString()}円</p>
          </div>
          <div className="bg-[#F3EAD3] p-4 rounded-lg">
            <h3 className="text-lg font-medium text-[#4A2311] mb-2">総支出</h3>
            <p className="text-2xl font-bold text-[#D05A6E]">{totalExpenses.toLocaleString()}円</p>
          </div>
          <div className="bg-[#F3EAD3] p-4 rounded-lg">
            <h3 className="text-lg font-medium text-[#4A2311] mb-2">残額</h3>
            <p className="text-2xl font-bold text-[#8E4B2B]">{remainingBudget.toLocaleString()}円</p>
          </div>
        </div>
      </div>

      {remainingBudget < 0 && (
        <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
          <div className="flex items-center">
            <AlertCircle className="mr-2" />
            <p className="font-bold">警告</p>
          </div>
          <p>予算を超過しています。支出を見直してください。</p>
        </div>
      )}
    </div>
  );
};

export default Budgeting;