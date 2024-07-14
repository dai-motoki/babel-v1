// data.js

export const products = [
  {
    id: 1,
    name: "桜餅",
    description: "春の訪れを告げる、桜の葉で包まれた上品な甘さの餅菓子",
    price: 250,
    image: "/api/placeholder/300/200",
    season: "春",
    ingredients: ["道明寺粉", "桜の葉", "こし餡"],
    stock: 50
  },
  {
    id: 2,
    name: "柏餅",
    description: "端午の節句に欠かせない、柏の葉で包まれた風味豊かな餅菓子",
    price: 300,
    image: "/api/placeholder/300/200",
    season: "春",
    ingredients: ["上新粉", "柏の葉", "粒餡"],
    stock: 40
  },
  {
    id: 3,
    name: "水羊羹",
    description: "夏の涼を感じる、なめらかな口当たりの上品な羊羹",
    price: 400,
    image: "/api/placeholder/300/200",
    season: "夏",
    ingredients: ["小豆", "寒天", "砂糖"],
    stock: 30
  },
  {
    id: 4,
    name: "栗きんとん",
    description: "秋の味覚の王様、栗の風味が豊かな上品な甘さの和菓子",
    price: 350,
    image: "/api/placeholder/300/200",
    season: "秋",
    ingredients: ["栗", "砂糖"],
    stock: 25
  },
  {
    id: 5,
    name: "雪うさぎ",
    description: "冬の情景を表現した、可愛らしい見た目の干菓子",
    price: 200,
    image: "/api/placeholder/300/200",
    season: "冬",
    ingredients: ["上用粉", "砂糖", "水飴"],
    stock: 60
  }
];

export const seasons = ["春", "夏", "秋", "冬"];

export const ingredients = [
  "道明寺粉", "桜の葉", "こし餡", "上新粉", "柏の葉", "粒餡",
  "小豆", "寒天", "砂糖", "栗", "上用粉", "水飴"
];

export const shopInfo = {
  name: "菓匠 鈴乃家",
  address: "東京都千代田区神田神保町1-1-1",
  phone: "03-1234-5678",
  openingHours: "10:00 - 18:00",
  closedDays: "水曜日",
  established: 1950
};
// ProductList.js
import React, { useState } from 'react';
import { products, seasons, ingredients } from './data';
import { X, Filter, ChevronDown } from 'lucide-react';

const ProductList = () => {
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = products.filter(product => 
    (!selectedSeason || product.season === selectedSeason) &&
    (!selectedIngredient || product.ingredients.includes(selectedIngredient))
  );

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">和菓子コレクション</h1>
      
      <div className="mb-8">
        <button
          onClick={toggleFilter}
          className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-300"
        >
          <Filter size={18} className="mr-2" />
          フィルター
          <ChevronDown size={18} className="ml-2" />
        </button>

        {isFilterOpen && (
          <div className="mt-4 p-4 bg-white rounded-md shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">季節</label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">すべての季節</option>
                {seasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">材料</label>
              <select
                value={selectedIngredient}
                onChange={(e) => setSelectedIngredient(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">すべての材料</option>
                {ingredients.map(ingredient => (
                  <option key={ingredient} value={ingredient}>{ingredient}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-700">{product.price}円</span>
                <span className="text-sm text-gray-500">{product.season}</span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">材料:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map(ingredient => (
                    <span key={ingredient} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">該当する商品がありません。</p>
      )}
    </div>
  );
};

export default ProductList;