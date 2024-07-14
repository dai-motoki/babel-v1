import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Calendar, Clock, Book, Video, Edit, Save, Trash2 } from 'react-feather';

const LessonPlanner = () => {
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({
    title: '',
    duration: 60,
    type: 'lecture',
    content: '',
  });

  useEffect(() => {
    // 仮のデータ取得
    const fetchLessons = async () => {
      // APIからデータを取得する代わりに、仮のデータを使用
      const dummyLessons = [
        { id: '1', title: 'AI基礎', duration: 90, type: 'lecture', content: 'AI基礎の概要' },
        { id: '2', title: '機械学習演習', duration: 120, type: 'practical', content: 'Pythonを使った機械学習' },
      ];
      setLessons(dummyLessons);
    };
    fetchLessons();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(lessons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setLessons(items);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLesson({ ...newLesson, [name]: value });
  };

  const addLesson = () => {
    const lesson = { ...newLesson, id: Date.now().toString() };
    setLessons([...lessons, lesson]);
    setNewLesson({ title: '', duration: 60, type: 'lecture', content: '' });
  };

  const deleteLesson = (id) => {
    setLessons(lessons.filter(lesson => lesson.id !== id));
  };

  const LessonCard = ({ lesson, index }) => (
    <Draggable draggableId={lesson.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white shadow-md rounded-lg p-4 mb-4 border-l-4 border-indigo-500 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{lesson.title}</h3>
            <button onClick={() => deleteLesson(lesson.id)} className="text-red-500 hover:text-red-700">
              <Trash2 size={18} />
            </button>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Clock size={14} className="mr-1" />
            <span>{lesson.duration}分</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            {lesson.type === 'lecture' ? <Book size={14} className="mr-1" /> : <Video size={14} className="mr-1" />}
            <span>{lesson.type === 'lecture' ? '講義' : '実践'}</span>
          </div>
          <p className="text-sm text-gray-700">{lesson.content}</p>
        </div>
      )}
    </Draggable>
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">授業計画ツール</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="lessons">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {lessons.map((lesson, index) => (
                    <LessonCard key={lesson.id} lesson={lesson} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">新規授業追加</h2>
          <form onSubmit={(e) => { e.preventDefault(); addLesson(); }} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">タイトル</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newLesson.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">時間 (分)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={newLesson.duration}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">タイプ</label>
              <select
                id="type"
                name="type"
                value={newLesson.type}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="lecture">講義</option>
                <option value="practical">実践</option>
              </select>
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">内容</label>
              <textarea
                id="content"
                name="content"
                value={newLesson.content}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              授業を追加
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LessonPlanner;