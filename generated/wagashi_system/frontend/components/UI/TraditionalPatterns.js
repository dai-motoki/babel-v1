import React from 'react';
import { Sun, Moon, Cloud, Umbrella, Flower, Leaf, Wind } from 'lucide-react';

const TraditionalPatterns = () => {
  const patterns = [
    { name: '青海波', component: <SeigaihaPattern /> },
    { name: '麻の葉', component: <AsanohaPattern /> },
    { name: '七宝', component: <ShippouPattern /> },
    { name: '矢絣', component: <YagasuriPattern /> },
    { name: '菊菱', component: <KikubishiPattern /> },
    { name: '桜', component: <SakuraPattern /> },
  ];

  return (
    <div className="p-6 bg-cream-100">
      <h2 className="text-3xl font-bold text-green-800 mb-6">伝統的な和柄</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patterns.map((pattern, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold text-green-700 mb-2">{pattern.name}</h3>
            {pattern.component}
          </div>
        ))}
      </div>
    </div>
  );
};

const SeigaihaPattern = () => {
  return (
    <div className="relative h-40 w-full overflow-hidden">
      {[...Array(5)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {[...Array(6)].map((_, colIndex) => (
            <div
              key={colIndex}
              className="w-12 h-12 border-2 border-blue-500 rounded-full -ml-6 -mt-6"
              style={{
                transform: `translate(${colIndex * 24}px, ${rowIndex * 24}px)`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const AsanohaPattern = () => {
  return (
    <div className="relative h-40 w-full overflow-hidden">
      {[...Array(3)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {[...Array(3)].map((_, colIndex) => (
            <div
              key={colIndex}
              className="w-16 h-16 relative"
              style={{
                transform: `translate(${colIndex * 48}px, ${rowIndex * 48}px)`,
              }}
            >
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="absolute w-8 h-8 border-2 border-green-600"
                  style={{
                    transform: `rotate(${index * 60}deg)`,
                    transformOrigin: '100% 100%',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const ShippouPattern = () => {
  return (
    <div className="relative h-40 w-full overflow-hidden">
      {[...Array(3)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {[...Array(3)].map((_, colIndex) => (
            <div
              key={colIndex}
              className="w-16 h-16 relative"
              style={{
                transform: `translate(${colIndex * 48}px, ${rowIndex * 48}px)`,
              }}
            >
              <div className="absolute inset-0 border-2 border-red-500 rounded-full" />
              <div className="absolute inset-0 border-2 border-red-500 rotate-45" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const YagasuriPattern = () => {
  return (
    <div className="relative h-40 w-full overflow-hidden">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="absolute h-full w-4 bg-gray-300 transform -skew-x-45"
          style={{ left: `${index * 24}px` }}
        />
      ))}
    </div>
  );
};

const KikubishiPattern = () => {
  return (
    <div className="relative h-40 w-full overflow-hidden">
      {[...Array(3)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {[...Array(3)].map((_, colIndex) => (
            <div
              key={colIndex}
              className="w-16 h-16 relative"
              style={{
                transform: `translate(${colIndex * 48}px, ${rowIndex * 48}px)`,
              }}
            >
              <div className="absolute inset-0 border-2 border-purple-500 rotate-45" />
              <div className="absolute inset-2 border-2 border-purple-500 rotate-45" />
              <div className="absolute inset-4 border-2 border-purple-500 rotate-45" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const SakuraPattern = () => {
  return (
    <div className="relative h-40 w-full overflow-hidden">
      {[...Array(3)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {[...Array(3)].map((_, colIndex) => (
            <div
              key={colIndex}
              className="w-16 h-16 relative"
              style={{
                transform: `translate(${colIndex * 48}px, ${rowIndex * 48}px)`,
              }}
            >
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="absolute w-4 h-4 bg-pink-300 rounded-full"
                  style={{
                    transform: `rotate(${index * 72}deg) translate(8px, 0)`,
                    transformOrigin: 'center center',
                  }}
                />
              ))}
              <div className="absolute inset-6 bg-yellow-200 rounded-full" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TraditionalPatterns;