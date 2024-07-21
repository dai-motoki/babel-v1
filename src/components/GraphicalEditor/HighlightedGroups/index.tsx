import React from 'react';
import { HighlightedGroup } from '@/types';
import { Network, Plus, Trash } from 'lucide-react';
import Button from '@/components/common/Button';

interface HighlightedGroupsProps {
  highlightedNodeGroups: HighlightedGroup[];
  selectedGroupId: number | null;
  setSelectedGroupId: (id: number | null) => void;
  addNewHighlightGroup: () => void;
  editGroupName: (groupId: number, newName: string) => void;
  toggleGroupHighlight: (groupId: number, isSelected: boolean) => void;
  removeHighlightGroup: (groupId: number) => void;
  highlightNode: (node: any, groupId: number) => void;
}

const HighlightedGroups: React.FC<HighlightedGroupsProps> = ({
  highlightedNodeGroups,
  selectedGroupId,
  setSelectedGroupId,
  addNewHighlightGroup,
  editGroupName,
  toggleGroupHighlight,
  removeHighlightGroup,
  highlightNode
}) => {
  return (
    <div className="bg-[#2a2a2a] bg-opacity-70 rounded p-2 max-w-xs max-h-[50vh] overflow-y-auto absolute top-4 left-4 z-50">
      {/* コンポーネントの内容は変更なし */}
      <div className="flex border-b border-gray-600">
        {highlightedNodeGroups.map((group) => (
          <button
            key={group.id}
            className={`px-3 py-2 ${selectedGroupId === group.id ? 'text-blue-500 border-b-2 border-blue-500' : 'text-[#d4d4d4]'}`}
            onClick={() => setSelectedGroupId(group.id)}
          >
            <Network className="w-4 h-4" />
          </button>
        ))}
        <button
          className="px-3 py-2 text-[#d4d4d4]"
          onClick={addNewHighlightGroup}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {highlightedNodeGroups.map((group) => (
        <div key={group.id} className={`mt-2 ${selectedGroupId === group.id ? '' : 'hidden'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={group.nodes.every((node) => node.isSelected)}
                onChange={(e) => toggleGroupHighlight(group.id, e.target.checked)}
                className="mr-2"
              />
              <input
                type="text"
                value={group.name}
                onChange={(e) => editGroupName(group.id, e.target.value)}
                className="bg-transparent text-[#d4d4d4] text-sm border-b border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            <Button
              onClick={() => removeHighlightGroup(group.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
          <ul className="text-[#d4d4d4] text-sm max-h-40 overflow-y-auto">
            {group.nodes.map((node) => (
              <li key={node.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={node.isSelected}
                  onChange={() => highlightNode(node, group.id)}
                  className="mr-2"
                />
                <span>{node.id || node.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HighlightedGroups;
