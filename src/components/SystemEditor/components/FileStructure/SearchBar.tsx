
import React from 'react';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ onSearch }) => {
  const { t } = useTranslation();

  return (
    <input
      type="text"
      onChange={(e) => onSearch(e.target.value)}
      placeholder={t('Search file name')}
      className="px-3 py-1 text-sm rounded-md bg-[#2a2a2a] text-[#d4d4d4] border border-[#3c3c3c] focus:outline-none focus:border-[#6c6c6c]"
    />
  );
};

export default SearchBar;
