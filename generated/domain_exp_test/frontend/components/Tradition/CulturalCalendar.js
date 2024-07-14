import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react';

const CulturalCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 実際のアプリケーションではAPIから取得するが、ここではモックデータを使用
    const mockEvents = [
      { date: '2023-05-05', name: '端午の節句', wagashi: '柏餅' },
      { date: '2023-07-07', name: '七夕', wagashi: '星形の落雁' },
      { date: '2023-09-15', name: '十五夜', wagashi: '月見団子' },
      { date: '2023-12-31', name: '大晦日', wagashi: '鏡餅' },
      { date: '2024-01-01', name: '元旦', wagashi: '花びら餅' },
      { date: '2024-02-03', name: '節分', wagashi: '福豆' },
      { date: '2024-03-03', name: 'ひな祭り', wagashi: '菱餅' },
      { date: '2024-04-01', name: '花見', wagashi: '桜餅' },
    ];
    setEvents(mockEvents);
  }, []);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = date.toISOString().split('T')[0];
      const event = events.find(e => e.date === dateString);

      days.push(
        <div key={day} className="p-2 border border-gray-200 relative">
          <span className={`text-lg ${event ? 'font-bold text-green-800' : ''}`}>{day}</span>
          {event && (
            <div className="mt-1">
              <p className="text-xs text-indigo-700">{event.name}</p>
              <p className="text-xs text-red-600">{event.wagashi}</p>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-cream-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">和菓子文化行事カレンダー</h2>
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 bg-green-700 text-white rounded-full hover:bg-green-600 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h3 className="text-2xl font-semibold text-green-900">
          {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
        </h3>
        <button onClick={nextMonth} className="p-2 bg-green-700 text-white rounded-full hover:bg-green-600 transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <div key={day} className="text-center font-medium text-green-800 p-2 bg-green-100 rounded">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 bg-white p-4 rounded-lg shadow-inner">
        {renderCalendar()}
      </div>
      <div className="mt-6 bg-green-50 p-4 rounded-lg">
        <h4 className="text-xl font-semibold text-green-800 mb-2 flex items-center">
          <Calendar className="mr-2" size={24} />
          今月の和菓子文化行事
        </h4>
        <ul className="space-y-2">
          {events
            .filter(event => {
              const eventDate = new Date(event.date);
              return eventDate.getMonth() === currentDate.getMonth() && eventDate.getFullYear() === currentDate.getFullYear();
            })
            .map((event, index) => (
              <li key={index} className="flex items-start">
                <Info className="mr-2 text-indigo-600 flex-shrink-0" size={20} />
                <div>
                  <span className="font-medium text-indigo-800">{event.date.split('-')[2]}日: {event.name}</span>
                  <span className="ml-2 text-red-700">- {event.wagashi}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CulturalCalendar;