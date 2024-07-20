
import React from 'react';

const Button = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-md bg-[#4a4a4a] text-white hover:bg-[#5a5a5a] transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
