
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Change } from '@/types';

interface RecentChangesProps {
  changes: Change[];
}

const RecentChanges: React.FC<RecentChangesProps> = ({ changes }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#2a2a2a] bg-opacity-70 rounded p-2 max-w-xs">
      <h3 className="text-[#d4d4d4] text-sm font-semibold mb-2">{t('最近の変更')}</h3>
      <ul className="text-[#d4d4d4] text-xs space-y-1">
        {changes.slice(0, 5).map((change, index) => (
          <li key={index} className="flex justify-between">
            <span>{change.fileName}</span>
            <span>{new Date(change.timestamp).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentChanges;
