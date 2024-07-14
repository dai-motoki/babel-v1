// data.js

export const sushiItems = [
  { id: 1, name: '鮪（まぐろ）', price: 300, season: 'all', stock: 50, popularity: 95 },
  { id: 2, name: '鯛（たい）', price: 250, season: 'spring', stock: 30, popularity: 80 },
  { id: 3, name: '鮭（さけ）', price: 200, season: 'autumn', stock: 40, popularity: 85 },
  { id: 4, name: '穴子（あなご）', price: 280, season: 'summer', stock: 25, popularity: 75 },
  { id: 5, name: '海老（えび）', price: 220, season: 'all', stock: 45, popularity: 90 },
  { id: 6, name: 'いくら', price: 350, season: 'autumn', stock: 20, popularity: 88 },
  { id: 7, name: 'ウニ', price: 400, season: 'summer', stock: 15, popularity: 82 },
  { id: 8, name: 'カンパチ', price: 260, season: 'winter', stock: 35, popularity: 78 },
  { id: 9, name: 'ホタテ', price: 240, season: 'winter', stock: 30, popularity: 76 },
  { id: 10, name: 'イカ', price: 180, season: 'all', stock: 55, popularity: 72 },
];

export const seasons = [
  { id: 'spring', name: '春', color: 'bg-pink-200', icon: '🌸' },
  { id: 'summer', name: '夏', color: 'bg-blue-200', icon: '🌊' },
  { id: 'autumn', name: '秋', color: 'bg-orange-200', icon: '🍁' },
  { id: 'winter', name: '冬', color: 'bg-gray-200', icon: '❄️' },
  { id: 'all', name: '通年', color: 'bg-green-200', icon: '🍣' },
];

export const ingredients = [
  { id: 1, name: '米', stock: 100, unit: 'kg' },
  { id: 2, name: '酢', stock: 20, unit: 'L' },
  { id: 3, name: '海苔', stock: 1000, unit: '枚' },
  { id: 4, name: 'わさび', stock: 5, unit: 'kg' },
  { id: 5, name: '醤油', stock: 30, unit: 'L' },
];

export const salesData = [
  { date: '2023-04-01', revenue: 250000, customers: 150 },
  { date: '2023-04-02', revenue: 280000, customers: 170 },
  { date: '2023-04-03', revenue: 220000, customers: 130 },
  { date: '2023-04-04', revenue: 300000, customers: 180 },
  { date: '2023-04-05', revenue: 270000, customers: 160 },
  { date: '2023-04-06', revenue: 310000, customers: 190 },
  { date: '2023-04-07', revenue: 350000, customers: 210 },
];
// SushiDashboard.js
import React, { useState, useEffect } from 'react';
import { sushiItems, seasons, ingredients } from './data';
import { ArrowUpCircle, ArrowDownCircle, DollarSign, Users, Package, RefreshCw } from 'lucide-react';

const SushiDashboard = () => {
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [filteredSushi, setFilteredSushi] = useState(sushiItems);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    setFilteredSushi(
      selectedSeason === 'all'
        ? sushiItems
        : sushiItems.filter((item) => item.season === selectedSeason)
    );
  }, [selectedSeason]);

  useEffect(() => {
    setTotalRevenue(filteredSushi.reduce((sum, item) => sum + item.price * item.stock, 0));
    setTotalCustomers(filteredSushi.reduce((sum, item) => sum + item.popularity, 0));
  }, [filteredSushi]);

  const SeasonButton = ({ season }) => (
    <button
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
        selectedSeason === season.id
          ? `${season.color} text-gray-800`
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
      }`}
      onClick={() => setSelectedSeason(season.id)}
    >
      {season.icon} {season.name}
    </button>
  );

  const SushiCard = ({ sushi }) => (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 transform hover:scale-105">
      <h3 className="text-lg font-semibold mb-2">{sushi.name}</h3>
      <p className="text-gray-600 mb-2">価格: {sushi.price}円</p>
      <p className="text-gray-600 mb-2">在庫: {sushi.stock}個</p>
      <div className="flex items-center">
        <span className="text-yellow-500 mr-1">★</span>
        <span>{sushi.popularity}</span>
      </div>
    </div>
  );

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`bg-white rounded-lg shadow-md p-4 flex items-center ${color}`}>
      <div className="mr-4">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">回転寿司ダッシュボード</h1>
      <div className="mb-8 flex justify-center space-x-4">
        {seasons.map((season) => (
          <SeasonButton key={season.id} season={season} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="総売上"
          value={`${totalRevenue.toLocaleString()}円`}
          icon={DollarSign}
          color="text-green-600"
        />
        <StatCard
          title="総来客数"
          value={totalCustomers}
          icon={Users}
          color="text-blue-600"
        />
        <StatCard
          title="在庫アイテム数"
          value={filteredSushi.length}
          icon={Package}
          color="text-purple-600"
        />
        <StatCard
          title="平均回転率"
          value={`${(totalCustomers / filteredSushi.length).toFixed(1)}回`}
          icon={RefreshCw}
          color="text-orange-600"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSushi.map((sushi) => (
          <SushiCard key={sushi.id} sushi={sushi} />
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">原材料在庫状況</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">材料名</th>
                <th className="text-left py-2">在庫量</th>
                <th className="text-left py-2">状態</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient) => (
                <tr key={ingredient.id} className="border-b last:border-b-0">
                  <td className="py-3">{ingredient.name}</td>
                  <td className="py-3">{ingredient.stock}{ingredient.unit}</td>
                  <td className="py-3">
                    {ingredient.stock > 50 ? (
                      <span className="text-green-500 flex items-center">
                        <ArrowUpCircle size={16} className="mr-1" /> 十分
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center">
                        <ArrowDownCircle size={16} className="mr-1" /> 要補充
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SushiDashboard;