import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

const EventPlanner = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({ id: null, title: '', description: '', date: '' });

  useEffect(() => {
    // モックデータの読み込み（実際のアプリケーションではAPIから取得）
    const mockEvents = [
      { id: 1, title: '春の和菓子フェア', description: '桜餅や柏餅など、春の季節限定和菓子を販売します。', date: '2023-04-01' },
      { id: 2, title: '夏の涼菓子ワークショップ', description: '涼しげな和菓子作りを体験できるワークショップを開催します。', date: '2023-07-15' },
      { id: 3, title: '秋の月見だんご祭り', description: '十五夜にちなんだ特別な月見だんごを販売します。', date: '2023-09-29' },
      { id: 4, title: '冬の和菓子アートショー', description: '雪をモチーフにした芸術的な和菓子の展示会を行います。', date: '2023-12-10' },
    ];
    setEvents(mockEvents);
  }, []);

  const handleDateChange = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  const handleAddEvent = () => {
    setCurrentEvent({ id: null, title: '', description: '', date: '' });
    setShowEventForm(true);
  };

  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setShowEventForm(true);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleSaveEvent = () => {
    if (currentEvent.id) {
      setEvents(events.map(event => event.id === currentEvent.id ? currentEvent : event));
    } else {
      const newEvent = { ...currentEvent, id: Date.now() };
      setEvents([...events, newEvent]);
    }
    setShowEventForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({ ...currentEvent, [name]: value });
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 font-yuji">和菓子店イベントプランナー</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => handleDateChange(-1)} className="text-[#006400] hover:text-[#007500]">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-2xl font-semibold text-[#4A2311]">
            {selectedDate.toLocaleString('ja-JP', { year: 'numeric', month: 'long' })}
          </h2>
          <button onClick={() => handleDateChange(1)} className="text-[#006400] hover:text-[#007500]">
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {['日', '月', '火', '水', '木', '金', '土'].map(day => (
            <div key={day} className="text-center font-semibold text-[#4A2311]">{day}</div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i - selectedDate.getDay() + 1);
            const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
            const hasEvent = events.some(event => new Date(event.date).toDateString() === date.toDateString());
            
            return (
              <div
                key={i}
                className={`p-2 border rounded-lg ${isCurrentMonth ? 'bg-white' : 'bg-gray-100'} ${hasEvent ? 'border-[#FFB7C5]' : 'border-transparent'}`}
              >
                <span className={`${isCurrentMonth ? 'text-[#4A2311]' : 'text-gray-400'}`}>
                  {date.getDate()}
                </span>
                {hasEvent && <div className="w-2 h-2 bg-[#FFB7C5] rounded-full mx-auto mt-1"></div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#4A2311]">イベント一覧</h3>
          <button
            onClick={handleAddEvent}
            className="bg-[#006400] text-white px-4 py-2 rounded-lg hover:bg-[#007500] transition duration-300"
          >
            <Plus size={20} className="inline-block mr-2" />
            新規イベント
          </button>
        </div>
        
        <ul className="space-y-4">
          {events.map(event => (
            <li key={event.id} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-[#4A2311]">{event.title}</h4>
                  <p className="text-gray-600">{event.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <Calendar size={16} className="inline-block mr-1" />
                    {new Date(event.date).toLocaleDateString('ja-JP')}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="text-[#006400] hover:text-[#007500] mr-2"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-semibold text-[#4A2311] mb-4">
              {currentEvent.id ? 'イベントを編集' : '新規イベント'}
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEvent(); }}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-[#4A2311] mb-2">タイトル</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={currentEvent.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#006400]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-[#4A2311] mb-2">説明</label>
                <textarea
                  id="description"
                  name="description"
                  value={currentEvent.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#006400]"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-6">
                <label htmlFor="date" className="block text-[#4A2311] mb-2">日付</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={currentEvent.date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#006400]"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEventForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition duration-300"
                >
                  <X size={20} className="inline-block mr-2" />
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006400] text-white rounded-lg hover:bg-[#007500] transition duration-300"
                >
                  <Save size={20} className="inline-block mr-2" />
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

export default EventPlanner;