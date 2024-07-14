import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2 } from 'lucide-react';

// モーメントローカライザーの設定
const localizer = momentLocalizer(moment);

const CourseSchedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    description: '',
  });

  useEffect(() => {
    // ダミーデータの読み込み（実際の実装ではAPIから取得）
    const dummyEvents = [
      {
        id: 1,
        title: 'AI基礎講座',
        start: new Date(2024, 6, 1, 10, 0),
        end: new Date(2024, 6, 1, 12, 0),
        description: 'AIの基本概念と応用について学びます。最新のAI技術トレンドも紹介します。',
      },
      {
        id: 2,
        title: 'データ分析演習',
        start: new Date(2024, 6, 3, 14, 0),
        end: new Date(2024, 6, 3, 16, 0),
        description: 'ビッグデータ時代のデータ分析スキルを実践的に学びます。',
      },
      {
        id: 3,
        title: '機械学習入門',
        start: new Date(2024, 6, 5, 9, 0),
        end: new Date(2024, 6, 5, 11, 0),
        description: '機械学習の基礎から最新のアルゴリズムまでを網羅的に学習します。',
      },
      {
        id: 4,
        title: 'ディープラーニング概論',
        start: new Date(2024, 6, 8, 13, 0),
        end: new Date(2024, 6, 8, 15, 0),
        description: 'ディープラーニングの最新理論と実装方法を学びます。',
      },
      {
        id: 5,
        title: 'AIプロジェクト演習',
        start: new Date(2024, 6, 10, 10, 0),
        end: new Date(2024, 6, 10, 13, 0),
        description: '実際の企業課題に基づいたAIプロジェクトを通じて、実践力を養成します。',
      },
      {
        id: 6,
        title: '自然言語処理入門',
        start: new Date(2024, 6, 15, 14, 0),
        end: new Date(2024, 6, 15, 16, 0),
        description: '最新の自然言語処理技術と大規模言語モデルについて学びます。',
      },
      {
        id: 7,
        title: 'コンピュータビジョン概論',
        start: new Date(2024, 6, 17, 9, 0),
        end: new Date(2024, 6, 17, 11, 0),
        description: '画像認識や物体検出の最新技術を学び、実際のアプリケーション開発に挑戦します。',
      },
      {
        id: 8,
        title: 'AIと倫理',
        start: new Date(2024, 6, 22, 10, 0),
        end: new Date(2024, 6, 22, 12, 0),
        description: 'AI技術の発展に伴う倫理的問題と対策について議論します。',
      },
      {
        id: 9,
        title: 'AIビジネス戦略',
        start: new Date(2024, 6, 24, 13, 0),
        end: new Date(2024, 6, 24, 15, 0),
        description: 'AI技術を活用したビジネスモデルの構築と戦略立案を学びます。',
      },
      {
        id: 10,
        title: '最新AI研究動向セミナー',
        start: new Date(2024, 6, 29, 15, 0),
        end: new Date(2024, 6, 29, 17, 0),
        description: 'AI分野の最新研究成果と今後の展望について、第一線の研究者が講演します。',
      },
    ];
    setEvents(dummyEvents);
  }, []);
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCreateEvent = () => {
    setNewEvent({
      title: '',
      start: new Date(),
      end: new Date(),
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      // 既存のイベントを更新
      setEvents(events.map(e => e.id === selectedEvent.id ? { ...e, ...newEvent } : e));
    } else {
      // 新しいイベントを追加
      setEvents([...events, { ...newEvent, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter(e => e.id !== selectedEvent.id));
    handleCloseModal();
  };

  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const goToCurrent = () => {
      toolbar.onNavigate('TODAY');
    };

    return (
      <div className="flex justify-between items-center mb-4 bg-gray-100 p-2 rounded-lg">
        <div className="flex space-x-2">
          <button
            onClick={goToBack}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={goToNext}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          {toolbar.label}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={goToCurrent}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            今日
          </button>
          <button
            onClick={handleCreateEvent}
            className="p-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-indigo-500 pb-2">
        コーススケジュール管理
      </h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
        components={{
          toolbar: CustomToolbar,
        }}
        className="bg-white p-4 rounded-lg shadow-lg"
      />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {selectedEvent ? 'イベントの編集' : '新規イベントの作成'}
            </h2>
            <input
              type="text"
              placeholder="イベントタイトル"
              value={selectedEvent ? selectedEvent.title : newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <input
              type="datetime-local"
              value={moment(selectedEvent ? selectedEvent.start : newEvent.start).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <input
              type="datetime-local"
              value={moment(selectedEvent ? selectedEvent.end : newEvent.end).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="イベントの説明"
              value={selectedEvent ? selectedEvent.description : newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md h-24"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSaveEvent}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                保存
              </button>
              {selectedEvent && (
                <button
                  onClick={handleDeleteEvent}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  削除
                </button>
              )}
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSchedule;