import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, PlusCircle, Edit2, Trash2 } from 'lucide-react';

const seasons = ['春', '夏', '秋', '冬'];
const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

const initialPlans = [
  { id: 1, name: '桜餅', season: '春', month: '3月', ingredients: '桜葉, 餅米, 小豆', description: '桜の香りが楽しめる春の定番和菓子' },
  { id: 2, name: '水羊羹', season: '夏', month: '7月', ingredients: '寒天, 砂糖, 小豆', description: '涼しげな見た目と喉越しが特徴の夏の和菓子' },
  { id: 3, name: '栗きんとん', season: '秋', month: '9月', ingredients: '栗, 砂糖', description: '秋の味覚を存分に楽しめる贅沢な和菓子' },
  { id: 4, name: '雪うさぎ', season: '冬', month: '12月', ingredients: '白餡, 砂糖, 寒天', description: '真っ白な雪をイメージした冬らしい和菓子' },
];

const SeasonalPlanning = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [selectedSeason, setSelectedSeason] = useState('春');
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [newPlan, setNewPlan] = useState({
    name: '',
    season: '春',
    month: '1月',
    ingredients: '',
    description: '',
  });

  useEffect(() => {
    // ここで API からデータを取得する想定
    // setPlans(fetchedPlans);
  }, []);

  const handleSeasonChange = (direction) => {
    const currentIndex = seasons.indexOf(selectedSeason);
    const newIndex = (currentIndex + direction + seasons.length) % seasons.length;
    setSelectedSeason(seasons[newIndex]);
  };

  const handleAddPlan = () => {
    setShowForm(true);
    setEditingPlan(null);
    setNewPlan({
      name: '',
      season: selectedSeason,
      month: '1月',
      ingredients: '',
      description: '',
    });
  };

  const handleEditPlan = (plan) => {
    setShowForm(true);
    setEditingPlan(plan);
    setNewPlan({ ...plan });
  };

  const handleDeletePlan = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPlan) {
      setPlans(plans.map(plan => plan.id === editingPlan.id ? { ...newPlan, id: plan.id } : plan));
    } else {
      setPlans([...plans, { ...newPlan, id: Date.now() }]);
    }
    setShowForm(false);
    setNewPlan({
      name: '',
      season: selectedSeason,
      month: '1月',
      ingredients: '',
      description: '',
    });
  };

  return (
    <div className="bg-cream-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-green-800">季節の和菓子計画</h1>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => handleSeasonChange(-1)}
          className="bg-green-700 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-green-800">{selectedSeason}</h2>
        <button
          onClick={() => handleSeasonChange(1)}
          className="bg-green-700 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans
          .filter(plan => plan.season === selectedSeason)
          .map(plan => (
            <div key={plan.id} className="bg-white rounded-lg shadow-md p-6 border border-green-200">
              <h3 className="text-xl font-semibold mb-2 text-green-800">{plan.name}</h3>
              <p className="text-gray-600 mb-2"><Calendar className="inline-block mr-2" size={18} />{plan.month}</p>
              <p className="text-gray-700 mb-2"><strong>材料:</strong> {plan.ingredients}</p>
              <p className="text-gray-700 mb-4">{plan.description}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEditPlan(plan)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDeletePlan(plan.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={handleAddPlan}
        className="mt-6 bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors flex items-center"
      >
        <PlusCircle size={18} className="mr-2" />
        新しい和菓子を追加
      </button>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">
              {editingPlan ? '和菓子を編集' : '新しい和菓子を追加'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">名前</label>
                <input
                  type="text"
                  id="name"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="season" className="block text-gray-700 font-semibold mb-2">季節</label>
                <select
                  id="season"
                  value={newPlan.season}
                  onChange={(e) => setNewPlan({ ...newPlan, season: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {seasons.map(season => (
                    <option key={season} value={season}>{season}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="month" className="block text-gray-700 font-semibold mb-2">月</label>
                <select
                  id="month"
                  value={newPlan.month}
                  onChange={(e) => setNewPlan({ ...newPlan, month: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="ingredients" className="block text-gray-700 font-semibold mb-2">材料</label>
                <input
                  type="text"
                  id="ingredients"
                  value={newPlan.ingredients}
                  onChange={(e) => setNewPlan({ ...newPlan, ingredients: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">説明</label>
                <textarea
                  id="description"
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  {editingPlan ? '更新' : '追加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonalPlanning;