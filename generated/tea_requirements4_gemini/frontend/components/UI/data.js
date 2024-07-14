import React, { useState } from 'react';

// カードコンポーネント
export const Card = ({ children, className, ...props }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`} {...props}>
    {children}
  </div>
);

// カードヘッダーコンポーネント
export const CardHeader = ({ children, className, ...props }) => (
  <div className={`px-6 py-4 border-b ${className}`} {...props}>
    {children}
  </div>
);

// カードボディコンポーネント
export const CardBody = ({ children, className, ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

// カードフッターコンポーネント
export const CardFooter = ({ children, className, ...props }) => (
  <div className={`px-6 py-4 border-t ${className}`} {...props}>
    {children}
  </div>
);

// タイポグラフィコンポーネント
export const Typography = ({ variant, children, className, ...props }) => {
  const variantClasses = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    body: 'text-base',
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

// ボタンコンポーネント
export const Button = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
  const variantClasses = {
    primary: 'bg-blue-500 text-white',
    outline: 'border border-gray-300 text-gray-700',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`rounded ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// 入力フィールドコンポーネント
export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={`border rounded px-3 py-2 w-full ${className}`}
    ref={ref}
    {...props}
  />
));

// ラベルコンポーネント
export const Label = ({ children, className, ...props }) => (
  <label className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>
    {children}
  </label>
);

// セレクトコンポーネント
export const Select = React.forwardRef(({ children, className, ...props }, ref) => (
  <select
    className={`border rounded px-3 py-2 w-full ${className}`}
    ref={ref}
    {...props}
  >
    {children}
  </select>
));

// セレクトコンテンツコンポーネント
export const SelectContent = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

// セレクトアイテムコンポーネント
export const SelectItem = React.forwardRef(({ children, ...props }, ref) => (
  <option ref={ref} {...props}>
    {children}
  </option>
));

// セレクト値コンポーネント
export const SelectValue = React.forwardRef(({ children, ...props }, ref) => (
  <span ref={ref} {...props}>
    {children}
  </span>
));

// useStateフックのエクスポートは不要になりました
