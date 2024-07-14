import React from 'react';
import { 
  Cherry, 
  Leaf, 
  Sun, 
  Snowflake, 
  Coffee, 
  Utensils, 
  ShoppingBag, 
  Heart, 
  Gift, 
  Calendar
} from 'lucide-react';

const WagashiIcon = ({ icon: Icon, label, color = 'text-deep-green', size = 24 }) => (
  <div className="flex flex-col items-center justify-center p-2 transition-all duration-300 ease-in-out transform hover:scale-110">
    <Icon size={size} className={`${color} mb-1`} />
    <span className="text-xs text-tea-brown font-yumin">{label}</span>
  </div>
);

const Dango = ({ size = 24, color = 'text-deep-green' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={color}
  >
    <circle cx="12" cy="6" r="4" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="18" r="4" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

const Mochi = ({ size = 24, color = 'text-deep-green' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={color}
  >
    <ellipse cx="12" cy="12" rx="10" ry="8" />
    <path d="M7 12s2.5 2 5 2 5-2 5-2" />
  </svg>
);

const Taiyaki = ({ size = 24, color = 'text-deep-green' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={color}
  >
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
    <path d="M9 7s1.5 1 3 1 3-1 3-1" />
  </svg>
);

const Dorayaki = ({ size = 24, color = 'text-deep-green' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={color}
  >
    <circle cx="12" cy="7" r="5" />
    <circle cx="12" cy="17" r="5" />
    <line x1="6" y1="12" x2="18" y2="12" />
  </svg>
);

const WagashiIcons = () => {
  return (
    <div className="bg-washi p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-yumin font-bold text-tea-brown mb-6">和菓子アイコンセット</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <WagashiIcon icon={Cherry} label="桜餅" color="text-sakura" />
        <WagashiIcon icon={Leaf} label="柏餅" color="text-matcha" />
        <WagashiIcon icon={Sun} label="日乃出" color="text-amber-500" />
        <WagashiIcon icon={Snowflake} label="雪餅" color="text-sky-300" />
        <WagashiIcon icon={Coffee} label="ようかん" color="text-yokan" />
        <WagashiIcon icon={Utensils} label="茶道具" color="text-deep-green" />
        <WagashiIcon icon={ShoppingBag} label="買い物" color="text-tea-brown" />
        <WagashiIcon icon={Heart} label="ハート" color="text-sakura" />
        <WagashiIcon icon={Gift} label="贈り物" color="text-deep-green" />
        <WagashiIcon icon={Calendar} label="歳時記" color="text-tea-brown" />
        <WagashiIcon icon={Dango} label="団子" color="text-matcha" />
        <WagashiIcon icon={Mochi} label="大福" color="text-sakura" />
        <WagashiIcon icon={Taiyaki} label="たい焼き" color="text-amber-500" />
        <WagashiIcon icon={Dorayaki} label="どら焼き" color="text-yokan" />
      </div>
    </div>
  );
};

const SeasonalWagashiIcons = () => {
  const seasons = [
    { name: '春', icon: Cherry, color: 'text-sakura', items: ['桜餅', '道明寺'] },
    { name: '夏', icon: Sun, color: 'text-amber-500', items: ['水ようかん', '葛切り'] },
    { name: '秋', icon: Leaf, color: 'text-matcha', items: ['栗きんとん', '月見団子'] },
    { name: '冬', icon: Snowflake, color: 'text-sky-300', items: ['雪餅', '福梅'] },
  ];

  return (
    <div className="bg-washi p-8 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-yumin font-bold text-tea-brown mb-6">季節の和菓子</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {seasons.map((season) => (
          <div key={season.name} className="bg-white bg-opacity-50 p-4 rounded-md shadow-sm">
            <div className="flex items-center mb-3">
              <season.icon className={`${season.color} mr-2`} size={24} />
              <h3 className="text-lg font-yumin font-semibold text-tea-brown">{season.name}</h3>
            </div>
            <ul className="list-disc list-inside text-sm text-tea-brown">
              {season.items.map((item) => (
                <li key={item} className="mb-1">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const WagashiIconsDemo = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <WagashiIcons />
      <SeasonalWagashiIcons />
    </div>
  );
};

export default WagashiIconsDemo;