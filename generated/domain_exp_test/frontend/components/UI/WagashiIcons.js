import React from 'react';
import { Star, Heart, Gift, Coffee, Sun, Moon, Leaf, Flower, Umbrella, Snowflake } from 'lucide-react';

const WagashiIcon = ({ icon: Icon, color = 'currentColor', size = 24, className = '' }) => (
  <Icon color={color} size={size} className={`inline-block ${className}`} />
);

export const Dango = ({ color = 'currentColor', size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <circle cx="12" cy="6" r="4" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="18" r="4" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

export const Mochi = ({ color = 'currentColor', size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
  </svg>
);

export const Taiyaki = ({ color = 'currentColor', size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

export const Matcha = ({ color = 'currentColor', size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

export const Sakura = ({ color = 'currentColor', size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2L9.17 8.17 2 9.17 7.17 14.83 6 22 12 18.17 18 22 16.83 14.83 22 9.17 14.83 8.17 12 2z" />
  </svg>
);

const WagashiIcons = {
  Dango,
  Mochi,
  Taiyaki,
  Matcha,
  Sakura,
  Star: (props) => <WagashiIcon icon={Star} {...props} />,
  Heart: (props) => <WagashiIcon icon={Heart} {...props} />,
  Gift: (props) => <WagashiIcon icon={Gift} {...props} />,
  Coffee: (props) => <WagashiIcon icon={Coffee} {...props} />,
  Sun: (props) => <WagashiIcon icon={Sun} {...props} />,
  Moon: (props) => <WagashiIcon icon={Moon} {...props} />,
  Leaf: (props) => <WagashiIcon icon={Leaf} {...props} />,
  Flower: (props) => <WagashiIcon icon={Flower} {...props} />,
  Umbrella: (props) => <WagashiIcon icon={Umbrella} {...props} />,
  Snowflake: (props) => <WagashiIcon icon={Snowflake} {...props} />,
};

export const WagashiIconExample = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">和菓子アイコンセット</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Object.entries(WagashiIcons).map(([name, Icon]) => (
          <div key={name} className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-red-50 rounded-full mb-2">
              <Icon color="#8B4513" size={32} className="transform hover:scale-110 transition-transform duration-200" />
            </div>
            <span className="text-sm text-gray-600">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WagashiIcons;