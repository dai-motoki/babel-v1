import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Edit, Trash2, Sun, Cloud, Umbrella } from 'lucide-react';

const EventPlanner = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', type: 'promotion' });
  const [weatherForecast, setWeatherForecast] = useState({});

  useEffect(() => {
    // モックデータの読み込み
    const mockEvents = [
      { id: 1, title: '春の特別セット', description: '桜鯛と春野菜の特別セット', date: '2023-04-01', type: 'seasonal' },
      { id: 2, title: 'こどもの日イベント', description: '子供向け寿司体験教室', date: '2023-05-05', type: 'holiday' },
      { id: 3, title: '夏の冷やし寿司フェア', description: '冷やし寿司の特別メニュー', date: '2023-07-15', type: 'promotion' },
    ];
    setEvents(mockEvents);

    // 天気予報のモックデータ
    const mockWeather = {
      '2023-04-01': { icon: <Sun className="text-yellow-500" />, temp: 22 },
      '2023-05-05': { icon: <Cloud className="text-gray-500" />, temp: 20 },
      '2023-07-15': { icon: <Umbrella className="text-blue-500" />, temp: 28 },
    };
    setWeatherForecast(mockWeather);
  }, []);

  const handleDateChange = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + increment);
    setSelectedDate(newDate);
  };

  const handleAddEvent = () => {
    setShowEventForm(true);
    setNewEvent({ ...newEvent, date: selectedDate.toISOString().split('T')[0] });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const eventToAdd = { ...newEvent, id: events.length + 1 };
    setEvents([...events, eventToAdd]);
    setShowEventForm(false);
    setNewEvent({ title: '', description: '', date: '', type: 'promotion' });
  };

  const handleEventDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const getEventTypeStyle = (type) => {
    switch (type) {
      case 'seasonal':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'holiday':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'promotion':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-indigo-900 border-b-2 border-indigo-200 pb-2">回転寿司イベントプランナー</h1>
      
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => handleDateChange(-1)} className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors">
          <ChevronLeft className="text-indigo-700" />
        </button>
        <div className="flex items-center space-x-4">
          <Calendar className="text-indigo-700" />
          <span className="text-xl font-semibold text-indigo-900">{selectedDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <button onClick={() => handleDateChange(1)} className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors">
          <ChevronRight className="text-indigo-700" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-indigo-900">本日のイベント</h2>
          {events.filter(event => event.date === selectedDate.toISOString().split('T')[0]).map(event => (
            <div key={event.id} className={`p-3 mb-3 rounded-lg border-l-4 ${getEventTypeStyle(event.type)} transition-all hover:shadow-md`}>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{event.title}</h3>
                <div className="flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleEventDelete(event.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-sm mt-1">{event.description}</p>
            </div>
          ))}
          <button onClick={handleAddEvent} className="mt-4 flex items-center justify-center w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus size={18} className="mr-2" />
            イベントを追加
          </button>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-indigo-900">天気予報と集客予測</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {weatherForecast[selectedDate.toISOString().split('T')[0]]?.icon || <Sun className="text-yellow-500" />}
              <span className="text-lg font-semibold">{weatherForecast[selectedDate.toISOString().split('T')[0]]?.temp || 25}°C</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-indigo-700">予想来客数</p>
              <p className="text-2xl font-bold text-indigo-900">250人</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-indigo-900">おすすめプロモーション</h3>
            <ul className="list-disc list-inside text-indigo-700">
              <li>季節の特別セット（春の桜鯛）を前面に押し出す</li>
              <li>SNSでの写真投稿キャンペーンを実施</li>
              <li>ファミリー向けの時間限定割引を導入</li>
            </ul>
          </div>
        </div>
      </div>

      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleEventSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-indigo-900">新規イベント追加</h2>
            <input
              type="text"
              placeholder="イベントタイトル"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full p-2 mb-4 border border-indigo-300 rounded"
              required
            />
            <textarea
              placeholder="イベント詳細"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="w-full p-2 mb-4 border border-indigo-300 rounded h-24"
              required
            />
            <select
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              className="w-full p-2 mb-4 border border-indigo-300 rounded"
              required
            >
              <option value="promotion">プロモーション</option>
              <option value="seasonal">季節イベント</option>
              <option value="holiday">祝日イベント</option>
            </select>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={() => setShowEventForm(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                キャンセル
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                追加
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventPlanner;