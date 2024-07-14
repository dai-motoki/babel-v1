import React from 'react';
import { Moon, Sun, Leaf, Cherry, Coffee, Candy, Gift, Flower, Umbrella, Snowflake } from 'lucide-react';

const WagashiIcon = ({ icon: Icon, label, size = 24, color = 'currentColor', className = '' }) => (
  <div className={`flex flex-col items-center justify-center ${className}`}>
    <Icon size={size} color={color} className="mb-1" />
    <span className="text-xs text-gray-600">{label}</span>
  </div>
);

export const Mochi = ({ size = 24, color = 'currentColor', className = '' }) => (
  <WagashiIcon
    icon={({ size, color }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill={color} />
        <path d="M8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12" stroke="white" strokeWidth="2" />
      </svg>
    )}
    label="餅"
    size={size}
    color={color}
    className={className}
  />
);

export const Dango = ({ size = 24, color = 'currentColor', className = '' }) => (
  <WagashiIcon
    icon={({ size, color }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="6" r="4" fill={color} />
        <circle cx="12" cy="14" r="4" fill={color} />
        <circle cx="12" cy="22" r="4" fill={color} />
        <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="2" />
      </svg>
    )}
    label="団子"
    size={size}
    color={color}
    className={className}
  />
);

export const Taiyaki = ({ size = 24, color = 'currentColor', className = '' }) => (
  <WagashiIcon
    icon={({ size, color }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill={color} />
        <path d="M12 7V17M7 12H17" stroke="white" strokeWidth="2" />
      </svg>
    )}
    label="たい焼き"
    size={size}
    color={color}
    className={className}
  />
);

export const Dorayaki = ({ size = 24, color = 'currentColor', className = '' }) => (
  <WagashiIcon
    icon={({ size, color }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="16" height="4" rx="2" fill={color} />
        <rect x="4" y="14" width="16" height="4" rx="2" fill={color} />
        <rect x="6" y="10" width="12" height="4" fill="#8B4513" />
      </svg>
    )}
    label="どら焼き"
    size={size}
    color={color}
    className={className}
  />
);

export const Daifuku = ({ size = 24, color = 'currentColor', className = '' }) => (
  <WagashiIcon
    icon={({ size, color }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill={color} />
        <circle cx="12" cy="12" r="5" fill="#FF69B4" />
      </svg>
    )}
    label="大福"
    size={size}
    color={color}
    className={className}
  />
);

export const Yokan = ({ size = 24, color = 'currentColor', className = '' }) => (
  <WagashiIcon
    icon={({ size, color }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="16" height="12" rx="2" fill={color} />
        <line x1="4" y1="10" x2="20" y2="10" stroke="white" strokeWidth="1" />
        <line x1="4" y1="14" x2="20" y2="14" stroke="white" strokeWidth="1" />
      </svg>
    )}
    label="羊羹"
    size={size}
    color={color}
    className={className}
  />
);

export const Wagashi = {
  Mochi,
  Dango,
  Taiyaki,
  Dorayaki,
  Daifuku,
  Yokan,
  Matcha: (props) => <WagashiIcon icon={Coffee} label="抹茶" {...props} />,
  Sakura: (props) => <WagashiIcon icon={Cherry} label="桜" {...props} />,
  Momiji: (props) => <WagashiIcon icon={Leaf} label="紅葉" {...props} />,
  Konpeito: (props) => <WagashiIcon icon={Candy} label="金平糖" {...props} />,
  Tsukimi: (props) => <WagashiIcon icon={Moon} label="月見" {...props} />,
  Hanabiramochi: (props) => <WagashiIcon icon={Flower} label="花びら餅" {...props} />,
  Tsuyu: (props) => <WagashiIcon icon={Umbrella} label="梅雨" {...props} />,
  Yukimi: (props) => <WagashiIcon icon={Snowflake} label="雪見" {...props} />,
  Hishimochi: (props) => <WagashiIcon icon={Gift} label="菱餅" {...props} />,
  Hanami: (props) => <WagashiIcon icon={Sun} label="花見" {...props} />,
};

export default Wagashi;