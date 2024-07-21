import React from 'react';
import { useTranslation } from 'react-i18next';

interface Change {
  fileName: string;
  timestamp: string;
  type: string;
}

interface RecentChangesProps {
  changes: Change[];
  fileHistory: { [key: string]: string[] };
}

const RecentChanges: React.FC<RecentChangesProps> = ({ changes, fileHistory }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#2a2a2a] bg-opacity-70 rounded p-2 w-64 h-48 absolute bottom-4 left-4 z-50 overflow-hidden">
      <h3 className="text-[#d4d4d4] text-sm font-semibold mb-2">{t('最近の変更')}</h3>
      <div className="overflow-y-auto h-36">
        <ul className="text-[#d4d4d4] text-xs space-y-1">
          {changes.map((change, index) => (
            <li key={index} className="flex justify-between">
              <span>{change.fileName} ({change.type})</span>
              <span>{new Date(change.timestamp).toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
        <h4 className="text-[#d4d4d4] text-sm font-semibold mt-4 mb-2">{t('ファイル履歴')}</h4>
        <ul className="text-[#d4d4d4] text-xs space-y-1">
          {Object.entries(fileHistory).map(([fileName, history]) => (
            <li key={fileName}>
              <span>{fileName}: {history.length} {t('バージョン')}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentChanges;