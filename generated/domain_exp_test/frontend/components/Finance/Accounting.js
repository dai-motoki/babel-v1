import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, PieChart, ArrowUpDown, Download, Printer } from 'lucide-react';

const Accounting = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [summary, setSummary] = useState({ income: 0, expenses: 0, profit: 0 });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    // 実際のアプリケーションではAPIから取得するデータをシミュレート
    const mockTransactions = [
      { id: 1, date: '2023-05-01', description: '桜餅販売', amount: 50000, type: 'income' },
      { id: 2, date: '2023-05-02', description: '抹茶仕入れ', amount: -20000, type: 'expense' },
      { id: 3, date: '2023-05-03', description: '柏餅販売', amount: 45000, type: 'income' },
      { id: 4, date: '2023-05-04', description: '和三盆仕入れ', amount: -15000, type: 'expense' },
      { id: 5, date: '2023-05-05', description: '水羊羹販売', amount: 30000, type: 'income' },
    ];
    setTransactions(mockTransactions);
    calculateSummary(mockTransactions);
  }, []);

  const calculateSummary = (trans) => {
    const sum = trans.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expenses += Math.abs(transaction.amount);
      }
      return acc;
    }, { income: 0, expenses: 0 });
    sum.profit = sum.income - sum.expenses;
    setSummary(sum);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    // 実際のアプリケーションでは、選択された期間に基づいてデータを再取得
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setTransactions(sortedTransactions);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 font-serif">和風会計台帳</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#006400] mb-4 font-serif">期間選択</h2>
        <div className="flex space-x-4 mb-4">
          {['day', 'week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => handlePeriodChange(period)}
              className={`px-4 py-2 rounded-full ${
                selectedPeriod === period
                  ? 'bg-[#006400] text-white'
                  : 'bg-[#FFB7C5] text-[#4A2311] hover:bg-[#FFD7E5]'
              } transition duration-300 ease-in-out`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-[#4A2311] mb-2 font-serif">収入</h3>
          <p className="text-3xl font-bold text-[#006400]">{formatCurrency(summary.income)}</p>
          <DollarSign className="text-[#006400] mt-2" size={24} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-[#4A2311] mb-2 font-serif">支出</h3>
          <p className="text-3xl font-bold text-[#FF4500]">{formatCurrency(summary.expenses)}</p>
          <DollarSign className="text-[#FF4500] mt-2" size={24} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-[#4A2311] mb-2 font-serif">利益</h3>
          <p className="text-3xl font-bold text-[#006400]">{formatCurrency(summary.profit)}</p>
          <PieChart className="text-[#006400] mt-2" size={24} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#006400] mb-4 font-serif">取引履歴</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#F3EAD3] text-[#4A2311]">
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('date')}>
                  日付 <ArrowUpDown size={16} className="inline" />
                </th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('description')}>
                  説明 <ArrowUpDown size={16} className="inline" />
                </th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('amount')}>
                  金額 <ArrowUpDown size={16} className="inline" />
                </th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('type')}>
                  種類 <ArrowUpDown size={16} className="inline" />
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-[#F3EAD3] hover:bg-[#FFF9E5]">
                  <td className="px-4 py-2">{transaction.date}</td>
                  <td className="px-4 py-2">{transaction.description}</td>
                  <td className={`px-4 py-2 ${transaction.type === 'income' ? 'text-[#006400]' : 'text-[#FF4500]'}`}>
                    {formatCurrency(Math.abs(transaction.amount))}
                  </td>
                  <td className="px-4 py-2">
                    {transaction.type === 'income' ? '収入' : '支出'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button className="bg-[#006400] text-white px-4 py-2 rounded-full hover:bg-[#007500] transition duration-300 ease-in-out flex items-center">
          <Download size={18} className="mr-2" />
          CSVダウンロード
        </button>
        <button className="bg-[#006400] text-white px-4 py-2 rounded-full hover:bg-[#007500] transition duration-300 ease-in-out flex items-center">
          <Printer size={18} className="mr-2" />
          印刷
        </button>
      </div>
    </div>
  );
};

export default Accounting;