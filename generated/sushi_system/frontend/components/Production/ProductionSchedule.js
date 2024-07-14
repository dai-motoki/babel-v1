import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Minus, Check, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProductionSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const sushiTypes = [
    { id: 1, name: 'マグロ', color: 'bg-red-500' },
    { id: 2, name: 'サーモン', color: 'bg-orange-300' },
    { id: 3, name: 'エビ', color: 'bg-pink-300' },
    { id: 4, name: 'イカ', color: 'bg-gray-200' },
    { id: 5, name: 'タコ', color: 'bg-purple-300' },
  ];

  useEffect(() => {
    // 仮のスケジュールデータを生成
    const generateScheduleData = () => {
      const data = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        data.push({
          date: date.toISOString().split('T')[0],
          マグロ: Math.floor(Math.random() * 100) + 50,
          サーモン: Math.floor(Math.random() * 80) + 40,
          エビ: Math.floor(Math.random() * 60) + 30,
          イカ: Math.floor(Math.random() * 40) + 20,
          タコ: Math.floor(Math.random() * 30) + 10,
        });
      }
      setScheduleData(data);
    };

    generateScheduleData();
  }, [currentDate]);

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleQuantityChange = (change) => {
    if (selectedItem) {
      const updatedScheduleData = scheduleData.map(day => ({
        ...day,
        [selectedItem.name]: Math.max(0, day[selectedItem.name] + change)
      }));
      setScheduleData(updatedScheduleData);
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 font-serif">寿司生産スケジュール</h1>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button onClick={handlePrevWeek} className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <span className="text-xl font-medium text-gray-700">
            {currentDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <button onClick={handleNextWeek} className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar size={24} className="text-gray-600" />
          <span className="text-gray-600">週間表示</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={scheduleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {sushiTypes.map(type => (
              <Line
                key={type.id}
                type="monotone"
                dataKey={type.name}
                stroke={type.color.replace('bg-', '#').replace('-500', '').replace('-300', '').replace('-200', '')}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sushiTypes.map(type => (
          <div
            key={type.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => handleItemClick(type)}
          >
            <div className={`w-16 h-16 rounded-full ${type.color} mb-4 mx-auto`}></div>
            <h3 className="text-xl font-semibold text-center mb-2">{type.name}</h3>
            <p className="text-gray-600 text-center">
              今週の生産量: {scheduleData.reduce((sum, day) => sum + day[type.name], 0)}個
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedItem.name}の生産調整</h2>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => handleQuantityChange(-10)}
                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <Minus size={24} />
              </button>
              <span className="text-xl font-medium">
                {scheduleData.reduce((sum, day) => sum + day[selectedItem.name], 0)}個
              </span>
              <button
                onClick={() => handleQuantityChange(10)}
                className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                <Plus size={24} />
              </button>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                確定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionSchedule;