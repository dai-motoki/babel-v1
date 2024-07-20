
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Highlighter, Network, Edit } from 'lucide-react';
import Button from '@/components/common/Button';

interface SelectionActionMenuProps {
  selectedNodesInPath: any[];
  handleSelectionAction: (action: string) => void;
}

const SelectionActionMenu: React.FC<SelectionActionMenuProps> = ({
  selectedNodesInPath,
  handleSelectionAction
}) => {
  const { t } = useTranslation();

  if (selectedNodesInPath.length === 0) return null;

  return (
    <div className="absolute bg-[#2a2a2a] rounded shadow-lg p-2 flex flex-col space-y-2" style={{ right: 10, top: 10 }}>
      <Button onClick={() => handleSelectionAction('highlight')} className="text-xs flex items-center">
        <Highlighter className="w-3 h-3 mr-2 text-yellow-200 opacity-50" />
        <span>{t('選択をハイライト')}</span>
      </Button>
      <Button onClick={() => handleSelectionAction('surroundings')} className="text-xs flex items-center">
        <Network className="w-3 h-3 mr-2 text-blue-200 opacity-50" />
        <span>{t('選択の周辺を表示')}</span>
      </Button>
      <Button onClick={() => handleSelectionAction('showEditor')} className="text-xs flex items-center">
        <Edit className="w-3 h-3 mr-2 text-green-200 opacity-50" />
        <span>{t('選択をエディタで開く')}</span>
      </Button>
    </div>
  );
};

export default SelectionActionMenu;
