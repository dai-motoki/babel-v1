
import React from 'react';
import { MessageCircle, ListTodo } from 'lucide-react';
import Button from '@/components/common/Button';

interface FloatingButtonsProps {
  setShowAIChat: (show: boolean) => void;
  setShowTaskManager: (show: boolean) => void;
  showAIChat: boolean;
  showTaskManager: boolean;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  setShowAIChat,
  setShowTaskManager,
  showAIChat,
  showTaskManager
}) => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
      <Button
        onClick={() => setShowAIChat(!showAIChat)}
        className="bg-[#3c3c3c] text-[#d4d4d4] rounded-full p-2 hover:bg-[#4c4c4c] transition-all duration-200"
        aria-label="AIチャットを表示/非表示"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      <Button
        onClick={() => setShowTaskManager(!showTaskManager)}
        className="bg-[#3c3c3c] text-[#d4d4d4] rounded-full p-2 hover:bg-[#4c4c4c] transition-all duration-200"
        aria-label="タスクマネージャーを表示/非表示"
      >
        <ListTodo className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default FloatingButtons;
