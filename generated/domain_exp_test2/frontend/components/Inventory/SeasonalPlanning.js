import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

const seasons = ['春', '夏', '秋', '冬'];
const initialWagashi = [
  { id: 1, name: '桜餅', season: '春', ingredients: ['道明寺粉', '桜の葉'], description: '桜の香りが楽しめる春の定番和菓子' },
  { id: 2, name: '水饅頭', season: '夏', ingredients: ['小麦粉', '砂糖', '水'], description: '涼しげな見た目と口当たりが特徴の夏向け和菓子' },
  { id: 3, name: '栗きんとん', season: '秋', ingredients: ['栗', '砂糖'], description: '秋の味覚である栗を使った贅沢な和菓子' },
  { id: 4, name: '雪うさぎ', season: '冬', ingredients: ['白あん', '砂糖'], description: '真っ白な見た目が冬にぴったりの和菓子' },
];

const SeasonalPlanning = () => {
  const [selectedSeason, setSelectedSeason] = useState('春');
  const [wagashiList, setWagashiList] = useState(initialWagashi);
  const [newWagashi, setNewWagashi] = useState({ name: '', ingredients: '', description: '' });
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    document.title = `${selectedSeason}の和菓子計画`;
  }, [selectedSeason]);

  const handleSeasonChange = (direction) => {
    const currentIndex = seasons.indexOf(selectedSeason);
    const newIndex = (currentIndex + direction + seasons.length) % seasons.length;
    setSelectedSeason(seasons[newIndex]);
  };

  const handleAddNewWagashi = () => {
    if (newWagashi.name && newWagashi.ingredients && newWagashi.description) {
      setWagashiList([
        ...wagashiList,
        {
          id: wagashiList.length + 1,
          ...newWagashi,
          season: selectedSeason,
          ingredients: newWagashi.ingredients.split(',').map(item => item.trim()),
        },
      ]);
      setNewWagashi({ name: '', ingredients: '', description: '' });
      setIsAddingNew(false);
    }
  };

  const handleDeleteWagashi = (id) => {
    setWagashiList(wagashiList.filter(wagashi => wagashi.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#F3EAD3] min-h-screen">
      <h1 className="text-3xl font-bold text-[#4A2311] mb-8 text-center font-yuji-syuku">季節の和菓子計画</h1>

      <div className="flex items-center justify-center mb-8">
        <button
          onClick={() => handleSeasonChange(-1)}
          className="p-2 rounded-full bg-[#006400] text-white hover:bg-[#007500] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="mx-4 text-2xl font-semibold text-[#4A2311] flex items-center">
          <Calendar className="mr-2" size={24} />
          <span>{selectedSeason}</span>
        </div>
        <button
          onClick={() => handleSeasonChange(1)}
          className="p-2 rounded-full bg-[#006400] text-white hover:bg-[#007500] transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {wagashiList
          .filter(wagashi => wagashi.season === selectedSeason)
          .map(wagashi => (
            <div key={wagashi.id} className="bg-white p-6 rounded-lg shadow-md relative">
              <h3 className="text-xl font-semibold text-[#4A2311] mb-2">{wagashi.name}</h3>
              <p className="text-[#4A2311] mb-2">
                <strong>材料:</strong> {wagashi.ingredients.join(', ')}
              </p>
              <p className="text-[#4A2311]">{wagashi.description}</p>
              <button
                onClick={() => handleDeleteWagashi(wagashi.id)}
                className="absolute top-2 right-2 text-[#FF4500] hover:text-[#FF6347] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ))}
      </div>

      {isAddingNew ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold text-[#4A2311] mb-4">新しい和菓子を追加</h3>
          <input
            type="text"
            placeholder="和菓子の名前"
            value={newWagashi.name}
            onChange={(e) => setNewWagashi({ ...newWagashi, name: e.target.value })}
            className="w-full mb-4 p-2 border border-[#4A2311] rounded"
          />
          <input
            type="text"
            placeholder="材料（カンマ区切り）"
            value={newWagashi.ingredients}
            onChange={(e) => setNewWagashi({ ...newWagashi, ingredients: e.target.value })}
            className="w-full mb-4 p-2 border border-[#4A2311] rounded"
          />
          <textarea
            placeholder="説明"
            value={newWagashi.description}
            onChange={(e) => setNewWagashi({ ...newWagashi, description: e.target.value })}
            className="w-full mb-4 p-2 border border-[#4A2311] rounded"
            rows="3"
          ></textarea>
          <div className="flex justify-end">
            <button
              onClick={handleAddNewWagashi}
              className="px-4 py-2 bg-[#006400] text-white rounded hover:bg-[#007500] transition-colors mr-2"
            >
              追加
            </button>
            <button
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 bg-[#FF4500] text-white rounded hover:bg-[#FF6347] transition-colors"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingNew(true)}
          className="w-full py-3 bg-[#006400] text-white rounded-lg flex items-center justify-center hover:bg-[#007500] transition-colors"
        >
          <Plus size={24} className="mr-2" />
          新しい和菓子を追加
        </button>
      )}
    </div>
  );
};

export default SeasonalPlanning;