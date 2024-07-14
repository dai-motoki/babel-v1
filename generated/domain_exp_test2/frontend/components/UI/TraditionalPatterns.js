import React from 'react';
import { Sun, Moon, Cloud, Droplet, Leaf } from 'lucide-react';

const TraditionalPatterns = () => {
  const patterns = [
    { name: '麻の葉', component: AsanohaPattern },
    { name: '青海波', component: SeigaihaPattern },
    { name: '七宝', component: ShippouPattern },
    { name: '矢絣', component: YagasuriPattern },
    { name: '菊菱', component: KikubishiPattern },
  ];

  return (
    <div className="p-8 bg-cream-100">
      <h2 className="text-3xl font-bold text-green-800 mb-6">伝統的な和柄</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {patterns.map((pattern, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-green-700 mb-2">{pattern.name}</h3>
              <pattern.component />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AsanohaPattern = () => {
  return (
    <div className="relative w-full h-64 bg-green-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 relative">
          {[0, 60, 120, 180, 240, 300].map((rotation, index) => (
            <div
              key={index}
              className="absolute w-16 h-16 border-2 border-green-600"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SeigaihaPattern = () => {
  const circles = Array(25).fill(null);

  return (
    <div className="relative w-full h-64 bg-blue-50 overflow-hidden">
      {circles.map((_, index) => (
        <div
          key={index}
          className="absolute w-16 h-16 border-2 border-blue-400 rounded-full"
          style={{
            top: `${Math.floor(index / 5) * 25}%`,
            left: `${(index % 5) * 25}%`,
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      ))}
    </div>
  );
};

const ShippouPattern = () => {
  return (
    <div className="relative w-full h-64 bg-purple-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-2">
          {Array(16).fill(null).map((_, index) => (
            <div
              key={index}
              className="w-12 h-12 border-2 border-purple-400 rounded-full flex items-center justify-center"
            >
              <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const YagasuriPattern = () => {
  return (
    <div className="relative w-full h-64 bg-gray-50 overflow-hidden">
      {Array(10).fill(null).map((_, index) => (
        <div
          key={index}
          className="absolute w-full h-8 bg-gray-300 transform -skew-y-12"
          style={{ top: `${index * 20}%` }}
        ></div>
      ))}
    </div>
  );
};

const KikubishiPattern = () => {
  return (
    <div className="relative w-full h-64 bg-yellow-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 relative">
          {[0, 45, 90, 135].map((rotation, index) => (
            <div
              key={index}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className="w-full h-full border-4 border-yellow-400 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SeasonalPatternSelector = () => {
  const seasons = [
    { name: '春', icon: <Leaf className="w-6 h-6 text-pink-400" /> },
    { name: '夏', icon: <Sun className="w-6 h-6 text-yellow-400" /> },
    { name: '秋', icon: <Leaf className="w-6 h-6 text-orange-400" /> },
    { name: '冬', icon: <Droplet className="w-6 h-6 text-blue-400" /> },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-green-700 mb-4">季節に応じた和柄</h3>
      <div className="flex space-x-4">
        {seasons.map((season, index) => (
          <button
            key={index}
            className="flex items-center justify-center px-4 py-2 bg-white border border-green-300 rounded-md shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {season.icon}
            <span className="ml-2 text-green-800">{season.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const CustomPatternCreator = () => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-green-700 mb-4">オリジナル和柄作成</h3>
      <div className="grid grid-cols-3 gap-4">
        <input
          type="color"
          className="w-full h-12 rounded-md cursor-pointer"
          defaultValue="#4A2311"
        />
        <select className="w-full h-12 px-3 py-2 bg-white border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option>模様を選択</option>
          <option>麻の葉</option>
          <option>青海波</option>
          <option>七宝</option>
          <option>矢絣</option>
          <option>菊菱</option>
        </select>
        <button className="w-full h-12 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
          作成
        </button>
      </div>
    </div>
  );
};

export default TraditionalPatterns;