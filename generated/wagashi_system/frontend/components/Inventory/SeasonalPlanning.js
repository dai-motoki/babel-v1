import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, PlusCircle, Edit2, Trash2 } from 'lucide-react';

const seasons = [
  { id: 'spring', name: '春', color: 'bg-pink-200', textColor: 'text-pink-800' },
  { id: 'summer', name: '夏', color: 'bg-blue-200', textColor: 'text-blue-800' },
  { id: 'autumn', name: '秋', color: 'bg-orange-200', textColor: 'text-orange-800' },
  { id: 'winter', name: '冬', color: 'bg-indigo-200', textColor: 'text-indigo-800' },
];

const initialWagashi = [
  { id: 1, name: '桜餅', season: 'spring', description: '桜の葉で包んだ春の定番和菓子' },
  { id: 2, name: '水羊羹', season: 'summer', description: '涼しげな夏の和菓子' },
  { id: 3, name: '栗きんとん', season: 'autumn', description: '秋の味覚を楽しむ和菓子' },
  { id: 4, name: '雪うさぎ', season: 'winter', description: '冬の雪をイメージした和菓子' },
];

const SeasonalPlanning = () => {
  const [selectedSeason, setSelectedSeason] = useState('spring');
  const [wagashi, setWagashi] = useState(initialWagashi);
  const [newWagashi, setNewWagashi] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // ここで API からデータを取得する想定
  }, []);

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
  };

  const handleAddWagashi = () => {
    if (newWagashi.name && newWagashi.description) {
      setWagashi([
        ...wagashi,
        {
          id: wagashi.length + 1,
          ...newWagashi,
          season: selectedSeason,
        },
      ]);
      setNewWagashi({ name: '', description: '' });
    }
  };

  const handleEditWagashi = (id) => {
    setEditingId(id);
    const wagashiToEdit = wagashi.find((w) => w.id === id);
    setNewWagashi({ name: wagashiToEdit.name, description: wagashiToEdit.description });
  };

  const handleUpdateWagashi = () => {
    setWagashi(
      wagashi.map((w) =>
        w.id === editingId
          ? { ...w, name: newWagashi.name, description: newWagashi.description }
          : w
      )
    );
    setEditingId(null);
    setNewWagashi({ name: '', description: '' });
  };

  const handleDeleteWagashi = (id) => {
    setWagashi(wagashi.filter((w) => w.id !== id));
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 font-serif">季節の和菓子計画</h1>

      <div className="mb-8 flex space-x-4">
        {seasons.map((season) => (
          <button
            key={season.id}
            onClick={() => handleSeasonChange(season.id)}
            className={`${
              selectedSeason === season.id ? season.color : 'bg-white'
            } ${
              season.textColor
            } px-6 py-3 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006400]`}
          >
            {season.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#4A2311] mb-4 font-serif flex items-center">
            <Calendar className="mr-2" />
            {seasons.find((s) => s.id === selectedSeason).name}の和菓子一覧
          </h2>
          <ul className="space-y-4">
            {wagashi
              .filter((w) => w.season === selectedSeason)
              .map((w) => (
                <li
                  key={w.id}
                  className="bg-[#F3EAD3] rounded-lg p-4 shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[#4A2311]">{w.name}</h3>
                    <p className="text-sm text-gray-600">{w.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditWagashi(w.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteWagashi(w.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#4A2311] mb-4 font-serif flex items-center">
            <PlusCircle className="mr-2" />
            {editingId ? '和菓子を編集' : '新しい和菓子を追加'}
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label htmlFor="wagashi-name" className="block text-sm font-medium text-gray-700">
                和菓子名
              </label>
              <input
                type="text"
                id="wagashi-name"
                value={newWagashi.name}
                onChange={(e) => setNewWagashi({ ...newWagashi, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#006400] focus:border-[#006400]"
              />
            </div>
            <div>
              <label htmlFor="wagashi-description" className="block text-sm font-medium text-gray-700">
                説明
              </label>
              <textarea
                id="wagashi-description"
                value={newWagashi.description}
                onChange={(e) => setNewWagashi({ ...newWagashi, description: e.target.value })}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#006400] focus:border-[#006400]"
              ></textarea>
            </div>
            <button
              onClick={editingId ? handleUpdateWagashi : handleAddWagashi}
              className="w-full bg-[#006400] text-white py-2 px-4 rounded-md hover:bg-[#007500] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006400]"
            >
              {editingId ? '更新' : '追加'}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-[#4A2311] mb-4 font-serif">年間和菓子カレンダー</h2>
        <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
          <div className="flex space-x-4 min-w-max">
            {seasons.map((season) => (
              <div key={season.id} className={`${season.color} rounded-lg p-4 w-64`}>
                <h3 className={`text-xl font-bold ${season.textColor} mb-2`}>{season.name}</h3>
                <ul className="space-y-2">
                  {wagashi
                    .filter((w) => w.season === season.id)
                    .map((w) => (
                      <li key={w.id} className="bg-white rounded p-2 shadow-sm">
                        <span className="font-semibold">{w.name}</span>
                        <p className="text-xs text-gray-600">{w.description}</p>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalPlanning;