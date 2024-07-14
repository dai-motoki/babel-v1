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
    staffAssigned: '',
  });

  const seasons = ['春', '夏', '秋', '冬'];

  useEffect(() => {
    // モックデータの読み込み（実際の実装ではAPIから取得）
    const mockSchedules = [
      { id: 1, date: '2023-05-01', product: '桜餅', quantity: 100, staffAssigned: '鈴木' },
      { id: 2, date: '2023-05-02', product: '柏餅', quantity: 80, staffAssigned: '田中' },
      { id: 3, date: '2023-05-03', product: '水羊羹', quantity: 120, staffAssigned: '佐藤' },
    ];
    setSchedules(mockSchedules);
  }, []);

  const getCurrentSeason = () => {
    const month = currentDate.getMonth();
    if (month >= 2 && month <= 4) return '春';
    if (month >= 5 && month <= 7) return '夏';
    if (month >= 8 && month <= 10) return '秋';
    return '冬';
  };

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
      staffAssigned: '',
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
      staffAssigned: schedule.staffAssigned,
    });
    setShowModal(true);
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSchedule) {
      setSchedules(schedules.map(schedule => 
        schedule.id === selectedSchedule.id ? { ...formData, id: schedule.id } : schedule
      ));
    } else {
      setSchedules([...schedules, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-700 text-white p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">和菓子生産スケジュール</h2>
          <div className="flex items-center space-x-4">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-green-600 rounded">
              <ChevronLeft size={24} />
            </button>
            <span className="text-xl font-medium">
              {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
            </span>
            <button onClick={handleNextMonth} className="p-2 hover:bg-green-600 rounded">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Calendar size={24} className="text-green-700" />
              <span className="text-lg font-medium text-gray-700">現在の季節: {getCurrentSeason()}</span>
            </div>
            <button
              onClick={handleAddSchedule}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300 flex items-center"
            >
              <Plus size={18} className="mr-2" />
              新規スケジュール
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-100">
                  <th className="border p-2 text-left">日付</th>
                  <th className="border p-2 text-left">商品</th>
                  <th className="border p-2 text-left">数量</th>
                  <th className="border p-2 text-left">担当者</th>
                  <th className="border p-2 text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="border p-2">{schedule.date}</td>
                    <td className="border p-2">{schedule.product}</td>
                    <td className="border p-2">{schedule.quantity}</td>
                    <td className="border p-2">{schedule.staffAssigned}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleEditSchedule(schedule)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              {selectedSchedule ? 'スケジュール編集' : '新規スケジュール追加'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                  日付
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product">
                  商品名
                </label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                  数量
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="staffAssigned">
                  担当者
                </label>
                <input
                  type="text"
                  id="staffAssigned"
                  name="staffAssigned"
                  value={formData.staffAssigned}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  キャンセル
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