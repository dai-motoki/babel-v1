import React from 'react';
import { Sun, Moon, Cloud, Droplet, Wind } from 'lucide-react';

const TraditionalPatterns = () => {
  const patterns = [
    { name: '青海波', component: <SeigaihaPattern /> },
    { name: '麻の葉', component: <AsanohaPattern /> },
    { name: '七宝', component: <ShippouPattern /> },
    { name: '市松', component: <IchimatsuPattern /> },
    { name: '矢絣', component: <YagasuriPattern /> },
    { name: '鱗', component: <UrokoPattern /> },
    { name: '菊菱', component: <KikubishiPattern /> },
    { name: '雷文', component: <RaimonPattern /> },
  ];

  return (
    <div className="p-8 bg-amber-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">伝統的な和柄</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {patterns.map((pattern, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-40 flex items-center justify-center">
              {pattern.component}
            </div>
            <div className="p-4 bg-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">{pattern.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <SeasonalPatterns />
    </div>
  );
};

const SeigaihaPattern = () => (
  <div className="w-full h-full bg-blue-100 relative overflow-hidden">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="absolute w-16 h-16 border-4 border-blue-500 rounded-full"
           style={{
             left: `${i * 20}%`,
             bottom: `-${8 + (i % 2) * 8}px`,
             transform: 'scale(1.5)',
           }}
      />
    ))}
  </div>
);

const AsanohaPattern = () => (
  <div className="w-full h-full bg-green-50 flex items-center justify-center">
    <div className="w-32 h-32 relative">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="absolute w-16 h-16 border-2 border-green-500"
             style={{
               top: '50%',
               left: '50%',
               transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
             }}
        />
      ))}
    </div>
  </div>
);

const ShippouPattern = () => (
  <div className="w-full h-full bg-red-50 flex items-center justify-center">
    <div className="grid grid-cols-3 gap-1">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="w-8 h-8 rounded-full border-2 border-red-500" />
      ))}
    </div>
  </div>
);

const IchimatsuPattern = () => (
  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
    <div className="grid grid-cols-8 gap-0">
      {[...Array(64)].map((_, i) => (
        <div key={i} className={`w-4 h-4 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-800'}`} />
      ))}
    </div>
  </div>
);

const YagasuriPattern = () => (
  <div className="w-full h-full bg-indigo-50 flex items-center justify-center">
    <div className="w-32 h-32 relative overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute w-full h-1 bg-indigo-500 transform -rotate-45"
             style={{ top: `${i * 8}px`, left: `-${i * 8}px` }}
        />
      ))}
    </div>
  </div>
);

const UrokoPattern = () => (
  <div className="w-full h-full bg-teal-50 flex items-center justify-center">
    <div className="grid grid-cols-4 gap-1">
      {[...Array(16)].map((_, i) => (
        <div key={i} className="w-6 h-6 border-b-2 border-r-2 border-teal-500 rounded-br-full" />
      ))}
    </div>
  </div>
);

const KikubishiPattern = () => (
  <div className="w-full h-full bg-yellow-50 flex items-center justify-center">
    <div className="w-32 h-32 relative">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute w-16 h-16 border-2 border-yellow-500"
             style={{
               top: '50%',
               left: '50%',
               transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
             }}
        />
      ))}
    </div>
  </div>
);

const RaimonPattern = () => (
  <div className="w-full h-full bg-purple-50 flex items-center justify-center">
    <div className="w-32 h-32 relative">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="absolute w-16 h-16 border-4 border-purple-500"
             style={{
               top: '50%',
               left: '50%',
               transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
             }}
        />
      ))}
    </div>
  </div>
);

const SeasonalPatterns = () => {
  const seasons = [
    { name: '春', icon: <Sun className="w-8 h-8 text-pink-500" />, color: 'bg-pink-100' },
    { name: '夏', icon: <Droplet className="w-8 h-8 text-blue-500" />, color: 'bg-blue-100' },
    { name: '秋', icon: <Moon className="w-8 h-8 text-orange-500" />, color: 'bg-orange-100' },
    { name: '冬', icon: <Cloud className="w-8 h-8 text-gray-500" />, color: 'bg-gray-100' },
  ];

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">季節の模様</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {seasons.map((season, index) => (
          <div key={index} className={`${season.color} rounded-lg shadow-md p-6`}>
            <div className="flex items-center justify-center mb-4">
              {season.icon}
            </div>
            <h4 className="text-xl font-semibold text-center text-gray-800">{season.name}</h4>
            <SeasonalPattern season={season.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

const SeasonalPattern = ({ season }) => {
  switch (season) {
    case '春':
      return (
        <div className="w-full h-24 bg-pink-200 relative overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute w-6 h-6"
                 style={{
                   top: `${Math.random() * 100}%`,
                   left: `${Math.random() * 100}%`,
                   transform: 'rotate(45deg)',
                 }}
            >
              <div className="w-3 h-3 bg-pink-400 rounded-full" />
              <div className="w-3 h-3 bg-pink-400 rounded-full absolute top-3 left-0" />
              <div className="w-3 h-3 bg-pink-400 rounded-full absolute top-0 left-3" />
              <div className="w-3 h-3 bg-pink-400 rounded-full absolute top-3 left-3" />
            </div>
          ))}
        </div>
      );
    case '夏':
      return (
        <div className="w-full h-24 bg-blue-200 relative overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute w-8 h-1 bg-blue-400 rounded-full"
                 style={{
                   top: `${Math.random() * 100}%`,
                   left: `${Math.random() * 100}%`,
                   transform: `rotate(${Math.random() * 360}deg)`,
                 }}
            />
          ))}
        </div>
      );
    case '秋':
      return (
        <div className="w-full h-24 bg-orange-200 relative overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute w-8 h-8"
                 style={{
                   top: `${Math.random() * 100}%`,
                   left: `${Math.random() * 100}%`,
                   transform: 'rotate(45deg)',
                 }}
            >
              <div className="w-4 h-4 bg-orange-400 rounded-tl-full" />
              <div className="w-4 h-4 bg-orange-400 rounded-tr-full absolute top-0 right-0" />
              <div className="w-4 h-4 bg-orange-400 rounded-bl-full absolute bottom-0 left-0" />
              <div className="w-4 h-4 bg-orange-400 rounded-br-full absolute bottom-0 right-0" />
            </div>
          ))}
        </div>
      );
    case '冬':
      return (
        <div className="w-full h-24 bg-gray-200 relative overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute w-6 h-6"
                 style={{
                   top: `${Math.random() * 100}%`,
                   left: `${Math.random() * 100}%`,
                 }}
            >
              {[...Array(6)].map((_, j) => (
                <div key={j} className="absolute w-1 h-4 bg-gray-400"
                     style={{
                       top: '50%',
                       left: '50%',
                       transform: `translate(-50%, -50%) rotate(${j * 30}deg)`,
                     }}
                />
              ))}
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default TraditionalPatterns;