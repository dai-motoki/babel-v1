import React from 'react';
import { useTranslation } from 'react-i18next';
import { Highlighter, Network, Edit, MessageCircle, Copy, Trash, X } from 'lucide-react';
import Button from '@/components/common/Button';

interface NodeContextMenuProps {
  clickedNode: any;
  menuPosition: { x: number; y: number };
  isSelectionMode: boolean;
  highlightNode: (node: any, groupId: number) => void;
  getNodeSurroundings: (node: any) => void;
  showEditor: (node: any) => void;
  highlightedNodeGroups: any[];
  setClickedNode: (node: any | null) => void;
}

const NodeContextMenu: React.FC<NodeContextMenuProps> = ({
  clickedNode,
  menuPosition,
  isSelectionMode,
  highlightNode,
  getNodeSurroundings,
  showEditor,
  highlightedNodeGroups,
  setClickedNode
}) => {
  const { t } = useTranslation();

  if (isSelectionMode || !clickedNode) return null;

  return (
    <div className="absolute bg-[#2a2a2a] rounded shadow-lg p-2 flex flex-col space-y-2" style={{ left: menuPosition.x, top: menuPosition.y, transform: 'translate(-50%, -100%)' }}>
      {/* 閉じるボタンを追加 */}
      <Button onClick={() => setClickedNode(null)} className="absolute top-1 right-1 text-xs flex items-center">
        <X className="w-3 h-3 text-gray-400" />
      </Button>
      <Button onClick={() => { highlightNode(clickedNode, highlightedNodeGroups[highlightedNodeGroups.length - 1].id); setClickedNode(null); }} className="text-xs flex items-center">
        <Highlighter className="w-3 h-3 mr-2 text-yellow-200 opacity-50" />
        <span>{t('ハイライト')}</span>
      </Button>
      <Button onClick={() => { getNodeSurroundings(clickedNode); setClickedNode(null); }} className="text-xs flex items-center">
        <Network className="w-3 h-3 mr-2 text-blue-200 opacity-50" />
        <span>{t('周辺取得')}</span>
      </Button>
      <Button onClick={() => { showEditor(clickedNode); setClickedNode(null); }} className="text-xs flex items-center">
        <Edit className="w-3 h-3 mr-2 text-green-200 opacity-50" />
        <span>{t('エディタ表示')}</span>
      </Button>
      <Button onClick={() => { console.log('会話ボタンがクリックされました'); setClickedNode(null); }} className="text-xs flex items-center">
        <MessageCircle className="w-3 h-3 mr-2 text-red-200 opacity-50" />
        <span>{t('会話する')}</span>
      </Button>
      <Button onClick={() => { console.log('コピーボタンがクリックされました'); setClickedNode(null); }} className="text-xs flex items-center">
        <Copy className="w-3 h-3 mr-2 text-purple-200 opacity-50" />
        <span>{t('コピー')}</span>
      </Button>
      <Button onClick={() => { console.log('削除ボタンがクリックされました'); setClickedNode(null); }} className="text-xs flex items-center">
        <Trash className="w-3 h-3 mr-2 text-red-500 opacity-50" />
        <span>{t('削除')}</span>
      </Button>
    </div>
  );
};

export default NodeContextMenu;
