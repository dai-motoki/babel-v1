// data.js

export const products = [
  {
    id: 1,
    name: "桜餅",
    description: "春の訪れを告げる、桜の葉で包まれた上品な和菓子",
    price: 250,
    image: "/images/sakuramochi.jpg",
    season: "春",
    ingredients: ["道明寺粉", "桜の葉", "こしあん"],
    stock: 50
  },
  {
    id: 2,
    name: "柏餅",
    description: "端午の節句に欠かせない、柏の葉で包まれた縁起物",
    price: 280,
    image: "/images/kashiwamochi.jpg",
    season: "春",
    ingredients: ["上新粉", "柏の葉", "つぶあん"],
    stock: 40
  },
  {
    id: 3,
    name: "水羊羹",
    description: "夏の涼を感じる、透明感のある涼やかな和菓子",
    price: 300,
    image: "/images/mizuyoukan.jpg",
    season: "夏",
    ingredients: ["寒天", "砂糖", "小豆"],
    stock: 60
  },
  {
    id: 4,
    name: "栗きんとん",
    description: "秋の味覚の王様、栗の風味豊かな上品な和菓子",
    price: 350,
    image: "/images/kurikinton.jpg",
    season: "秋",
    ingredients: ["栗", "砂糖"],
    stock: 30
  },
  {
    id: 5,
    name: "雪うさぎ",
    description: "冬の情景を表現した、愛らしい姿の干菓子",
    price: 200,
    image: "/images/yukiusagi.jpg",
    season: "冬",
    ingredients: ["上白糖", "寒梅粉", "食紅"],
    stock: 45
  }
];

export const seasons = ["春", "夏", "秋", "冬"];

export const ingredients = [
  "道明寺粉", "桜の葉", "こしあん", "上新粉", "柏の葉", "つぶあん",
  "寒天", "砂糖", "小豆", "栗", "上白糖", "寒梅粉", "食紅"
];

export const promotions = [
  {
    id: 1,
    title: "春の和菓子祭り",
    description: "桜餅と柏餅を2個ずつセットで10%オフ",
    startDate: "2023-03-01",
    endDate: "2023-04-30"
  },
  {
    id: 2,
    title: "夏の涼菓子フェア",
    description: "水羊羹を3個以上購入で1個プレゼント",
    startDate: "2023-07-01",
    endDate: "2023-08-31"
  },
  {
    id: 3,
    title: "秋の味覚キャンペーン",
    description: "栗きんとんを5個購入で季節の和菓子1個サービス",
    startDate: "2023-09-15",
    endDate: "2023-11-15"
  }
];
// ProductList.js
import React, { useState } from 'react';
import { products, seasons, ingredients } from './data';
import { ChevronDown, Filter, ShoppingCart } from 'lucide-react';

const ProductList = () => {
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [cart, setCart] = useState([]);

  const filteredProducts = products.filter(product => 
    (!selectedSeason || product.season === selectedSeason) &&
    (!selectedIngredient || product.ingredients.includes(selectedIngredient))
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 font-serif">菓匠 鈴乃家の和菓子</h1>
      
      <div className="flex flex-wrap mb-8">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="season">
            季節で絞り込む
          </label>
          <div className="relative">
            <select
              id="season"
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">すべての季節</option>
              {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredient">
            材料で絞り込む
          </label>
          <div className="relative">
            <select
              id="ingredient"
              value={selectedIngredient}
              onChange={(e) => setSelectedIngredient(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">すべての材料</option>
              {ingredients.map(ingredient => (
                <option key={ingredient} value={ingredient}>{ingredient}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">¥{product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                >
                  <ShoppingCart size={20} className="inline-block mr-2" />
                  カートに追加
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 right-0 m-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            <ShoppingCart size={24} className="inline-block mr-2" />
            カート ({cart.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;