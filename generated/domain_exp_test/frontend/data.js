// data.js

export const products = [
  {
    id: 1,
    name: "桜餅",
    description: "春の訪れを告げる、桜の葉で包まれた上品な味わい",
    price: 250,
    image: "/api/placeholder/300/300",
    season: "春",
    ingredients: ["道明寺粉", "桜の葉", "こしあん"],
    stock: 50
  },
  {
    id: 2,
    name: "柏餅",
    description: "端午の節句に欠かせない、柏の葉で包まれた縁起物",
    price: 280,
    image: "/api/placeholder/300/300",
    season: "春",
    ingredients: ["上新粉", "柏の葉", "つぶあん"],
    stock: 40
  },
  {
    id: 3,
    name: "水まんじゅう",
    description: "夏の涼を感じる、透明感のある涼しげな和菓子",
    price: 220,
    image: "/api/placeholder/300/300",
    season: "夏",
    ingredients: ["寒天", "砂糖", "みつ"],
    stock: 60
  },
  {
    id: 4,
    name: "栗きんとん",
    description: "秋の味覚の王様、栗の風味豊かな上品な甘さ",
    price: 300,
    image: "/api/placeholder/300/300",
    season: "秋",
    ingredients: ["栗", "砂糖"],
    stock: 30
  },
  {
    id: 5,
    name: "雪うさぎ",
    description: "冬の情景を表現した、愛らしい姿の干菓子",
    price: 180,
    image: "/api/placeholder/300/300",
    season: "冬",
    ingredients: ["上白糖", "寒梅粉", "食紅"],
    stock: 45
  }
];

export const seasons = ["春", "夏", "秋", "冬"];

export const ingredients = [
  "道明寺粉", "桜の葉", "こしあん", "上新粉", "柏の葉", "つぶあん",
  "寒天", "砂糖", "みつ", "栗", "上白糖", "寒梅粉", "食紅"
];
// ProductList.js
import React, { useState, useEffect } from 'react';
import { products, seasons, ingredients } from './data';
import { ChevronDown, X } from 'lucide-react';

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);
  const [isIngredientDropdownOpen, setIsIngredientDropdownOpen] = useState(false);

  useEffect(() => {
    let result = products;
    if (selectedSeason) {
      result = result.filter(product => product.season === selectedSeason);
    }
    if (selectedIngredient) {
      result = result.filter(product => product.ingredients.includes(selectedIngredient));
    }
    setFilteredProducts(result);
  }, [selectedSeason, selectedIngredient]);

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
    setIsSeasonDropdownOpen(false);
  };

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIsIngredientDropdownOpen(false);
  };

  const clearFilters = () => {
    setSelectedSeason('');
    setSelectedIngredient('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-green-800">和菓子コレクション</h1>
      
      <div className="flex flex-wrap mb-8">
        <div className="relative mr-4 mb-4">
          <button
            onClick={() => setIsSeasonDropdownOpen(!isSeasonDropdownOpen)}
            className="bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center"
          >
            {selectedSeason || '季節で絞り込み'}
            <ChevronDown size={20} className="ml-2" />
          </button>
          {isSeasonDropdownOpen && (
            <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
              {seasons.map(season => (
                <button
                  key={season}
                  onClick={() => handleSeasonSelect(season)}
                  className="block w-full text-left px-4 py-2 hover:bg-green-100"
                >
                  {season}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="relative mr-4 mb-4">
          <button
            onClick={() => setIsIngredientDropdownOpen(!isIngredientDropdownOpen)}
            className="bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center"
          >
            {selectedIngredient || '原材料で絞り込み'}
            <ChevronDown size={20} className="ml-2" />
          </button>
          {isIngredientDropdownOpen && (
            <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
              {ingredients.map(ingredient => (
                <button
                  key={ingredient}
                  onClick={() => handleIngredientSelect(ingredient)}
                  className="block w-full text-left px-4 py-2 hover:bg-green-100"
                >
                  {ingredient}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {(selectedSeason || selectedIngredient) && (
          <button
            onClick={clearFilters}
            className="bg-red-100 text-red-800 px-4 py-2 rounded-md flex items-center"
          >
            フィルターをクリア
            <X size={20} className="ml-2" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-green-800">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-700">{product.price}円</span>
                <span className="text-sm text-gray-500">{product.season}</span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">原材料:</h3>
                <div className="flex flex-wrap">
                  {product.ingredients.map(ingredient => (
                    <span key={ingredient} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-2 mb-2">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300">
                カートに追加
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;