
import React from 'react';
import { useTranslation } from 'react-i18next';

const RecentChanges = ({ changes }) => {
  const { t } = useTranslation();

  return (
    <div className="p-3 text-[#d4d4d4] overflow-y-auto">
      <h3 className="text-md font-medium mb-2">{t('最近の変更')}:</h3>
      <ul className="list-disc list-inside">
        {changes.slice(0, 10).map((change, index) => (
          <li key={index} className="text-sm mb-1">
            {t(change.type)}: {change.path}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentChanges;
