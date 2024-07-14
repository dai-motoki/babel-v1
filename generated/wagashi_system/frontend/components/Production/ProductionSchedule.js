import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Edit2, Trash2 } from 'lucide-react';

const ProductionSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    date: '',
    notes: '',
  });

  useEffect(() => {
    // 本来はAPIからデータを取得しますが、ここではモックデータを使用します
    const mockSchedules = [
      { id: 1, product: '桜餅', quantity: 100, date: '2023-05-01', notes: '桜の葉の準備を忘れずに' },
      { id: 2, product: '柏餅', quantity: 150, date: '2023-05-03', notes: '柏の葉の品質確認が必要' },
      { id: 3, product: '水羊羹', quantity: 80, date: '2023-05-10', notes: '寒天の仕入れを確認' },
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
    setFormData({ product: '', quantity: '', date: '', notes: '' });
    setShowModal(true);
  };

  const handleEditSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setFormData(schedule);
    setShowModal(true);
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSchedule) {
      setSchedules(schedules.map(schedule => 
        schedule.id === selectedSchedule.id ? { ...schedule, ...formData } : schedule
      ));
    } else {
      setSchedules([...schedules, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          week.push(<td key={`empty-${j}`} className="p-2"></td>);
        } else if (day > daysInMonth) {
          break;
        } else {
          const currentDay = new Date(year, month, day);
          const schedulesForDay = schedules.filter(s => new Date(s.date).toDateString() === currentDay.toDateString());
          week.push(
            <td key={day} className="p-2 border border-gray-200">
              <div className="text-sm font-medium">{day}</div>
              {schedulesForDay.map(schedule => (
                <div key={schedule.id} className="mt-1 p-1 bg-green-100 text-green-800 text-xs rounded">
                  {schedule.product} ({schedule.quantity})
                </div>
              ))}
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
      if (day > daysInMonth) break;
    }

    return calendar;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">和菓子生産スケジュール</h2>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
        <div className="text-xl font-medium">
          {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
        </div>
        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronRight size={24} />
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['日', '月', '火', '水', '木', '金', '土'].map(day => (
              <th key={day} className="p-2 border border-gray-200 bg-gray-100">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderCalendar()}
        </tbody>
      </table>
      <button
        onClick={handleAddSchedule}
        className="mt-4 flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        <Plus size={18} className="mr-2" />
        新規スケジュール追加
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              {selectedSchedule ? 'スケジュール編集' : '新規スケジュール'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">製品名</label>
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">数量</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">日付</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">備考</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows="3"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                >
                  保存
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