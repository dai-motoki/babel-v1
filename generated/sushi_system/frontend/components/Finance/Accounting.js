import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, TrendingUp, Clipboard, Filter } from 'lucide-react';

const Accounting = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [salesData, setSalesData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [profitData, setProfitData] = useState([]);

  useEffect(() => {
    // 実際のアプリケーションではAPIからデータを取得します
    const generateMockData = (period) => {
      const data = [];
      const periods = period === 'daily' ? 30 : period === 'weekly' ? 12 : 12;
      for (let i = 0; i < periods; i++) {
        const sales = Math.floor(Math.random() * 50000) + 30000;
        const expenses = Math.floor(Math.random() * 30000) + 20000;
        data.push({
          name: `${period === 'daily' ? '日' : period === 'weekly' ? '週' : '月'} ${i + 1}`,
          売上: sales,
          経費: expenses,
          利益: sales - expenses,
        });
      }
      return data;
    };

    const newData = generateMockData(selectedPeriod);
    setSalesData(newData.map(item => ({ name: item.name, 売上: item.売上 })));
    setExpensesData(newData.map(item => ({ name: item.name, 経費: item.経費 })));
    setProfitData(newData.map(item => ({ name: item.name, 利益: item.利益 })));
  }, [selectedPeriod]);

  const totalSales = salesData.reduce((sum, item) => sum + item.売上, 0);
  const totalExpenses = expensesData.reduce((sum, item) => sum + item.経費, 0);
  const totalProfit = profitData.reduce((sum, item) => sum + item.利益, 0);

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-[#003366] mb-8 font-serif">会計管理</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#4A2311]">期間選択</h2>
          <div className="flex space-x-4">
            {['daily', 'weekly', 'monthly'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-full ${
                  selectedPeriod === period
                    ? 'bg-[#003366] text-white'
                    : 'bg-[#F3EAD3] text-[#003366]'
                } transition-colors duration-300`}
              >
                {period === 'daily' ? '日次' : period === 'weekly' ? '週次' : '月次'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#F3EAD3] p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#4A2311]">総売上</h3>
              <DollarSign className="text-[#003366]" />
            </div>
            <p className="text-3xl font-bold text-[#003366] mt-2">¥{totalSales.toLocaleString()}</p>
          </div>
          <div className="bg-[#F3EAD3] p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#4A2311]">総経費</h3>
              <Clipboard className="text-[#003366]" />
            </div>
            <p className="text-3xl font-bold text-[#003366] mt-2">¥{totalExpenses.toLocaleString()}</p>
          </div>
          <div className="bg-[#F3EAD3] p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#4A2311]">純利益</h3>
              <TrendingUp className="text-[#003366]" />
            </div>
            <p className="text-3xl font-bold text-[#003366] mt-2">¥{totalProfit.toLocaleString()}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-[#4A2311] mb-4">売上推移</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="売上" stroke="#003366" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-[#4A2311] mb-4">経費内訳</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={expensesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="経費" stroke="#FF0000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-[#4A2311] mb-4">利益推移</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="利益" stroke="#4A2311" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-[#4A2311] mb-4">会計レポート</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#003366] text-white">
                <th className="p-3">日付</th>
                <th className="p-3">売上</th>
                <th className="p-3">経費</th>
                <th className="p-3">利益</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-[#F3EAD3]' : 'bg-white'}>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">¥{item.売上.toLocaleString()}</td>
                  <td className="p-3">¥{expensesData[index].経費.toLocaleString()}</td>
                  <td className="p-3">¥{profitData[index].利益.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Accounting;