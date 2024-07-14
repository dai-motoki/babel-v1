import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Edit2, Trash2 } from 'lucide-react';

const ProductionSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    product: '',
    quantity: '',
    assignedStaff: '',
  });

  const seasons = ['春', '夏', '秋', '冬'];
  const currentSeason = seasons[Math.floor(((currentDate.getMonth() + 1) % 12) / 3)];

  useEffect(() => {
    // モックデータの読み込み（実際のアプリケーションではAPIから取得）
    const mockSchedules = [
      { id: 1, date: '2023-05-01', product: '桜餅', quantity: 100, assignedStaff: '鈴木' },
      { id: 2, date: '2023-05-02', product: '柏餅', quantity: 150, assignedStaff: '田中' },
      { id: 3, date: '2023-05-03', product: '水羊羹', quantity: 80, assignedStaff: '佐藤' },
    ];
    setSchedules(mockSchedules);
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddSchedule = () => {
    setSelectedSchedule(null);
    setFormData({
      id: '',
      date: currentDate.toISOString().split('T')[0],
      product: '',
      quantity: '',
      assignedStaff: '',
    });
    setShowModal(true);
  };

  const handleEditSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setFormData({
      id: schedule.id,
      date: schedule.date,
      product: schedule.product,
      quantity: schedule.quantity,
      assignedStaff: schedule.assignedStaff,
    });
    setShowModal(true);
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSchedule) {
      // 編集モード
      setSchedules(schedules.map(schedule =>
        schedule.id === selectedSchedule.id ? { ...formData } : schedule
      ));
    } else {
      // 新規追加モード
      setSchedules([...schedules, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const calendarDays = [];
    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const daySchedules = schedules.filter(schedule => schedule.date === date);

      calendarDays.push(
        <div key={day} className="p-2 border border-gray-200 min-h-[100px] bg-white hover:bg-green-50 transition-colors">
          <div className="font-semibold mb-1">{day}</div>
          {daySchedules.map(schedule => (
            <div key={schedule.id} className="text-xs p-1 bg-green-100 rounded mb-1">
              <div>{schedule.product}</div>
              <div>数量: {schedule.quantity}</div>
              <div>担当: {schedule.assignedStaff}</div>
              <div className="flex justify-end mt-1">
                <button onClick={() => handleEditSchedule(schedule)} className="mr-1 text-blue-600 hover:text-blue-800">
                  <Edit2 size={12} />
                </button>
                <button onClick={() => handleDeleteSchedule(schedule.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="bg-cream-100 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-green-800 border-b-2 border-green-800 pb-2">生産スケジュール</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button onClick={handlePrevMonth} className="mr-2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h3 className="text-xl font-semibold">{currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月</h3>
          <button onClick={handleNextMonth} className="ml-2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex items-center">
          <span className="mr-4 text-lg font-medium text-green-700">{currentSeason}の季節</span>
          <button onClick={handleAddSchedule} className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            <Plus size={18} className="mr-2" />
            スケジュール追加
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <div key={day} className="text-center font-semibold p-2 bg-green-100 text-green-800">{day}</div>
        ))}
        {renderCalendar()}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{selectedSchedule ? 'スケジュール編集' : 'スケジュール追加'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">日付</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">製品名</label>
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">数量</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">担当者</label>
                <input
                  type="text"
                  name="assignedStaff"
                  value={formData.assignedStaff}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
                  キャンセル
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  {selectedSchedule ? '更新' : '追加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionSchedule;