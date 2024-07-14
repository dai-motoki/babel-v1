import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react';

const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

const CULTURAL_EVENTS = [
  { date: '1-1', name: '正月', wagashi: '鏡餅' },
  { date: '1-7', name: '人日の節句', wagashi: '七草餅' },
  { date: '2-3', name: '節分', wagashi: '福豆' },
  { date: '3-3', name: '雛祭り', wagashi: 'ひなあられ' },
  { date: '3-14', name: 'ホワイトデー', wagashi: '和チョコ' },
  { date: '4-1', name: '花見', wagashi: '桜餅' },
  { date: '5-5', name: '端午の節句', wagashi: '柏餅' },
  { date: '7-7', name: '七夕', wagashi: '星形の落雁' },
  { date: '8-15', name: 'お盆', wagashi: '水羊羹' },
  { date: '9-9', name: '重陽の節句', wagashi: '菊花糖' },
  { date: '10-31', name: 'ハロウィン', wagashi: 'かぼちゃ饅頭' },
  { date: '11-15', name: '七五三', wagashi: '千歳飴' },
  { date: '12-25', name: 'クリスマス', wagashi: '雪饅頭' },
  { date: '12-31', name: '大晦日', wagashi: '年越し蕎麦' },
];

const CulturalCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${month + 1}-${day}`;
      const event = CULTURAL_EVENTS.find(e => e.date === date);
      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 transition-colors duration-300 ${
            event ? 'bg-green-50 hover:bg-green-100 cursor-pointer' : 'bg-white'
          }`}
          onClick={() => event && setSelectedEvent(event)}
        >
          <div className="font-semibold">{day}</div>
          {event && (
            <div className="text-xs text-green-700 mt-1">
              {event.name}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-800 text-center">和菓子文化カレンダー</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="flex items-center text-green-700 hover:text-green-900 transition-colors duration-300"
        >
          <ChevronLeft size={24} />
          前月
        </button>
        <div className="text-xl font-semibold text-green-800">
          {currentDate.getFullYear()}年 {MONTHS[currentDate.getMonth()]}
        </div>
        <button
          onClick={handleNextMonth}
          className="flex items-center text-green-700 hover:text-green-900 transition-colors duration-300"
        >
          次月
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <div key={day} className="text-center font-semibold text-green-700">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
      {selectedEvent && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-xl font-semibold text-green-800 mb-2">{selectedEvent.name}</h3>
          <p className="text-green-700">
            <span className="font-semibold">関連和菓子:</span> {selectedEvent.wagashi}
          </p>
          <button
            onClick={() => setSelectedEvent(null)}
            className="mt-2 text-green-600 hover:text-green-800 transition-colors duration-300"
          >
            閉じる
          </button>
        </div>
      )}
      <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
        <Calendar size={18} className="mr-2" />
        <span>カレンダー上の緑色の日付をクリックすると、詳細が表示されます。</span>
      </div>
    </div>
  );
};

export default CulturalCalendar;