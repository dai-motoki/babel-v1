import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Edit2, Trash2 } from 'lucide-react';

const EventPlanner = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [editingEventId, setEditingEventId] = useState(null);

  useEffect(() => {
    // モックデータを使用してイベントを初期化
    const mockEvents = [
      { id: 1, title: '春の和菓子フェア', description: '桜餅や草餅など、春の風味を楽しむイベント', date: new Date(2023, 3, 5) },
      { id: 2, title: '夏の涼菓子展', description: '水まんじゅうや葛切りなど、涼を感じる和菓子の展示販売', date: new Date(2023, 6, 15) },
      { id: 3, title: '秋の味覚祭', description: '栗きんとんや柿菓子など、秋の味覚を楽しむイベント', date: new Date(2023, 9, 10) },
      { id: 4, title: '冬の和菓子教室', description: '雪見だんごや求肥雪のお菓子作り体験', date: new Date(2023, 11, 8) },
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
    setShowEventForm(true);
    setEditingEventId(null);
    setEventTitle('');
    setEventDescription('');
  };

  const handleEditEvent = (event) => {
    setShowEventForm(true);
    setEditingEventId(event.id);
    setEventTitle(event.title);
    setEventDescription(event.description);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (editingEventId) {
      setEvents(events.map(event => 
        event.id === editingEventId 
          ? { ...event, title: eventTitle, description: eventDescription }
          : event
      ));
    } else {
      const newEvent = {
        id: Date.now(),
        title: eventTitle,
        description: eventDescription,
        date: selectedDate
      };
      setEvents([...events, newEvent]);
    }
    setShowEventForm(false);
    setEventTitle('');
    setEventDescription('');
    setEditingEventId(null);
  };

  const renderCalendar = () => {
    const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const dateFormat = new Intl.DateTimeFormat('ja-JP', { month: 'long', year: 'numeric' });
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        const dayEvents = events.filter(event => 
          event.date.getDate() === cloneDay.getDate() &&
          event.date.getMonth() === cloneDay.getMonth() &&
          event.date.getFullYear() === cloneDay.getFullYear()
        );
        days.push(
          <div
            key={day}
            className={`p-2 border border-gray-200 ${
              cloneDay.getMonth() !== selectedDate.getMonth() ? 'bg-gray-100 text-gray-400' : ''
            } ${cloneDay.toDateString() === selectedDate.toDateString() ? 'bg-green-100' : ''}`}
            onClick={() => handleDateClick(cloneDay)}
          >
            <div className="text-sm font-semibold">{cloneDay.getDate()}</div>
            {dayEvents.map(event => (
              <div key={event.id} className="text-xs mt-1 truncate text-green-700">{event.title}</div>
            ))}
          </div>
        );
        day.setDate(day.getDate() + 1);
      }
    }

    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="text-green-700 hover:text-green-900">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold text-green-800">{dateFormat.format(selectedDate)}</h2>
          <button onClick={handleNextMonth} className="text-green-700 hover:text-green-900">
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['日', '月', '火', '水', '木', '金', '土'].map(day => (
            <div key={day} className="text-center font-medium text-green-800">{day}</div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const renderEventList = () => {
    const dayEvents = events.filter(event => 
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear()
    );

    return (
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-green-800 mb-4">イベント一覧</h3>
        {dayEvents.length === 0 ? (
          <p className="text-gray-500">予定されているイベントはありません。</p>
        ) : (
          <ul className="space-y-4">
            {dayEvents.map(event => (
              <li key={event.id} className="border-b border-gray-200 pb-2">
                <h4 className="font-medium text-green-700">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.description}</p>
                <div className="mt-2 flex space-x-2">
                  <button onClick={() => handleEditEvent(event)} className="text-blue-600 hover:text-blue-800">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDeleteEvent(event.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleAddEvent}
          className="mt-4 flex items-center text-green-700 hover:text-green-900"
        >
          <Plus size={20} className="mr-1" />
          新規イベントを追加
        </button>
      </div>
    );
  };

  const renderEventForm = () => {
    if (!showEventForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            {editingEventId ? 'イベントを編集' : '新規イベントを追加'}
          </h3>
          <form onSubmit={handleSubmitEvent}>
            <div className="mb-4">
              <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700 mb-1">
                イベント名
              </label>
              <input
                type="text"
                id="eventTitle"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700 mb-1">
                イベント詳細
              </label>
              <textarea
                id="eventDescription"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowEventForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">和菓子店イベントプランナー</h1>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-2/3">
          {renderCalendar()}
        </div>
        <div className="md:w-1/3 mt-8 md:mt-0">
          {renderEventList()}
        </div>
      </div>
      {renderEventForm()}
    </div>
  );
};

export default EventPlanner;