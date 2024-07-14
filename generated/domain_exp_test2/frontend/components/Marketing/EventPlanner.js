import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Edit, Trash2, X } from 'lucide-react';

const EventPlanner = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [eventForm, setEventForm] = useState({ title: '', description: '', date: '' });
  const [editingEventId, setEditingEventId] = useState(null);

  useEffect(() => {
    // モックデータの読み込み（実際のアプリケーションではAPIから取得）
    const mockEvents = [
      { id: 1, title: '春の和菓子フェア', description: '桜餅や草餅など、春の味覚を楽しむイベント', date: '2023-04-01' },
      { id: 2, title: '夏の涼菓子展', description: '水まんじゅうや葛切りなど、涼を感じる和菓子の展示販売', date: '2023-07-15' },
      { id: 3, title: '秋の和菓子作り体験', description: '栗きんとんや柿の葉寿司を作る体験イベント', date: '2023-10-10' },
      { id: 4, title: '冬の和菓子と抹茶の会', description: '冬の和菓子と抹茶を楽しむ茶会', date: '2023-12-23' },
    ];
    setEvents(mockEvents);
  }, []);

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    setShowModal(true);
    setEventForm({ title: '', description: '', date: selectedDate.toISOString().split('T')[0] });
    setEditingEventId(null);
  };

  const handleEditEvent = (event) => {
    setShowModal(true);
    setEventForm({ ...event, date: event.date });
    setEditingEventId(event.id);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (editingEventId) {
      setEvents(events.map(event => event.id === editingEventId ? { ...eventForm, id: editingEventId } : event));
    } else {
      setEvents([...events, { ...eventForm, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const renderCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const calendarDays = [];
    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const hasEvent = events.some(event => new Date(event.date).toDateString() === currentDate.toDateString());

      calendarDays.push(
        <div
          key={day}
          className={`p-2 border border-gray-200 cursor-pointer transition-colors duration-200
            ${isToday ? 'bg-green-100' : ''}
            ${hasEvent ? 'bg-pink-100' : ''}
            hover:bg-green-50`}
          onClick={() => handleDateClick(currentDate)}
        >
          <span className={`${isToday ? 'font-bold' : ''}`}>{day}</span>
          {hasEvent && <div className="w-2 h-2 bg-pink-400 rounded-full mx-auto mt-1"></div>}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-green-800 mb-6">和菓子店イベント計画</h2>
      
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
        <h3 className="text-xl font-semibold text-gray-700">
          {selectedDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })}
        </h3>
        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-6">
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <div key={day} className="text-center font-medium text-gray-600">{day}</div>
        ))}
        {renderCalendar()}
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">イベント一覧</h4>
        <ul className="space-y-2">
          {events.map(event => (
            <li key={event.id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow">
              <div>
                <span className="font-medium text-green-700">{event.title}</span>
                <span className="text-sm text-gray-500 ml-2">({event.date})</span>
              </div>
              <div>
                <button onClick={() => handleEditEvent(event)} className="text-blue-500 hover:text-blue-700 mr-2">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDeleteEvent(event.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleAddEvent}
        className="flex items-center justify-center w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
      >
        <Plus size={20} className="mr-2" />
        新規イベントを追加
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingEventId ? 'イベントを編集' : '新規イベントを追加'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmitEvent}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  イベント名
                </label>
                <input
                  type="text"
                  id="title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  説明
                </label>
                <textarea
                  id="description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  日付
                </label>
                <input
                  type="date"
                  id="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                {editingEventId ? '更新' : '追加'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPlanner;