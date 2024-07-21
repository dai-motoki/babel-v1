import React from 'react';
import { useTranslation } from 'react-i18next';

interface Change {
  fileName: string;
  timestamp: string;
  type: string;
}

interface RecentChangesProps {
  changes: Change[];
}

const RecentChanges: React.FC<RecentChangesProps> = ({ changes }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#2a2a2a] bg-opacity-70 rounded p-2 max-w-xs absolute bottom-4 left-4 z-50">
      <h3 className="text-[#d4d4d4] text-sm font-semibold mb-2">{t('最近の変更')}</h3>
      <ul className="text-[#d4d4d4] text-xs space-y-1">
        {changes.map((change, index) => (
          <li key={index} className="flex justify-between">
            <span>{change.fileName} ({change.type})</span>
            <span>{new Date(change.timestamp).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentChanges;