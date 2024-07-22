
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MousePointer, Box, Play, Text } from 'lucide-react';
import Button from '@/components/common/Button';
import SearchBar from '../SearchBar';

// ControlPanelPropsインターフェースの定義
interface ControlPanelProps {
  onSearch: (query: string) => void;
  showAll: () => void;
  showFileNames: boolean;
  setShowFileNames: (show: boolean) => void;
  isSelectionMode: boolean;
  toggleSelectionMode: () => void;
  is3D: boolean;
  toggle2D3D: () => void;
  // executeFile: () => void;
}

// ControlPanelコンポーネントの定義
const ControlPanel: React.FC<ControlPanelProps> = ({
  onSearch,
  showAll,
  showFileNames,
  setShowFileNames,
  isSelectionMode,
  toggleSelectionMode,
  is3D,
  toggle2D3D,
  executeFile
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-end p-3">
      <div className="flex space-x-2">
        <SearchBar onSearch={onSearch} />
        <Button onClick={showAll}>{t('全て表示')}</Button>


        <Button onClick={() => setShowFileNames(!showFileNames)}>
          <Text className="w-4 h-4" />
        </Button>

        {/* <Button onClick={() => setShowFileNames(!showFileNames)}>
          {showFileNames ? t('ファイル名を非表示') : t('ファイル名を表示')}
        </Button> */}


        <Button onClick={toggleSelectionMode} className={isSelectionMode ? 'bg-blue-500' : ''}>
          <MousePointer className="w-4 h-4 mr-2" />
          {isSelectionMode ? t('選択モード: ON') : t('選択モード: OFF')}
        </Button>

        <Button onClick={toggle2D3D} aria-label={is3D ? "2Dビューに切り替え" : "3Dビューに切り替え"}>
          <Box className="w-4 h-4 mr-2" />
          {is3D ? "2D" : "3D"}
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
