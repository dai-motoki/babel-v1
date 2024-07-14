import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const CulturalCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  const culturalEvents = [
    { date: '2023-01-01', name: '初春の和菓子', description: '新年を祝う縁起物の和菓子' },
    { date: '2023-02-03', name: '節分の豆菓子', description: '厄除けの豆菓子' },
    { date: '2023-03-03', name: '桃の節句', description: 'ひな祭りの菱餅と桃の花の和菓子' },
    { date: '2023-03-21', name: '春分の日', description: '春を祝う桜餅' },
    { date: '2023-04-01', name: '桜の季節', description: '桜をモチーフにした和菓子' },
    { date: '2023-05-05', name: '端午の節句', description: '柏餅と粽' },
    { date: '2023-06-15', name: '葉月の和菓子', description: '新緑をイメージした和菓子' },
    { date: '2023-07-07', name: '七夕', description: '星型の和菓子と水まんじゅう' },
    { date: '2023-08-15', name: 'お盆', description: 'お供え用の和菓子' },
    { date: '2023-09-23', name: '秋分の日', description: '秋の味覚を使った和菓子' },
    { date: '2023-10-01', name: '紅葉の季節', description: '紅葉をモチーフにした和菓子' },
    { date: '2023-11-15', name: '七五三', description: '千歳飴と祝い菓子' },
    { date: '2023-12-22', name: '冬至', description: 'ゆず風味の和菓子' },
    { date: '2023-12-31', name: '大晦日', description: '年越し用の和菓子' },
  ];

  useEffect(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const filteredEvents = culturalEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });
    setEvents(filteredEvents);
  }, [currentDate]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= days; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const hasEvent = events.some(event => new Date(event.date).toDateString() === date.toDateString());

      calendarDays.push(
        <div
          key={day}
          className={`p-2 text-center cursor-pointer transition-all duration-300 ease-in-out
            ${isToday ? 'bg-green-100 text-green-800' : ''}
            ${isSelected ? 'bg-pink-200 text-pink-800' : ''}
            ${hasEvent ? 'border-b-2 border-red-400' : ''}
            hover:bg-gray-100`}
          onClick={() => setSelectedDate(date)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-800">和菓子文化行事カレンダー</h2>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-green-800" />
        </button>
        <h3 className="text-xl font-semibold text-green-800">
          {currentDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
        >
          <ChevronRight className="w-6 h-6 text-green-800" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <div key={day} className="text-center font-medium text-green-800">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-6">
        {renderCalendar()}
      </div>
      <div className="mt-6">
        <h4 className="text-xl font-semibold mb-4 text-green-800">今月の和菓子文化行事</h4>
        {events.length > 0 ? (
          <ul className="space-y-4">
            {events.map((event, index) => (
              <li key={index} className="bg-green-50 p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-medium text-green-800">{formatDate(new Date(event.date))}</span>
                </div>
                <h5 className="text-lg font-semibold mt-2 text-green-900">{event.name}</h5>
                <p className="text-green-700 mt-1">{event.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">今月の行事はありません。</p>
        )}
      </div>
      {selectedDate && (
        <div className="mt-6 p-4 bg-pink-50 rounded-lg shadow">
          <h4 className="text-xl font-semibold mb-2 text-pink-800">選択された日付: {formatDate(selectedDate)}</h4>
          {events.filter(event => new Date(event.date).toDateString() === selectedDate.toDateString()).map((event, index) => (
            <div key={index} className="mt-2">
              <h5 className="text-lg font-medium text-pink-900">{event.name}</h5>
              <p className="text-pink-700">{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CulturalCalendar;