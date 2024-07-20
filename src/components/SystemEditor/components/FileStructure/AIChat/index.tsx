
import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '@/components/common/Button';

interface AIChatProps {
  nodes: any[];
  onClose: () => void;
  showTaskManager: boolean;
  setShowTaskManager: (show: boolean) => void;
}

const AIChat: React.FC<AIChatProps> = ({
  nodes,
  onClose,
  showTaskManager,
  setShowTaskManager
}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, inputMessage]);
      setInputMessage('');
      // ここでAIとの対話処理を実装
    }
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 h-96 bg-[#2a2a2a] rounded-lg shadow-lg flex flex-col">
      <div className="flex justify-between items-center p-2 border-b border-gray-600">
        <h3 className="text-[#d4d4d4] font-semibold">AIチャット</h3>
        <Button onClick={onClose} className="text-[#d4d4d4] hover:text-white">
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto p-2">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 text-[#d4d4d4]">{msg}</div>
        ))}
      </div>
      <div className="p-2 border-t border-gray-600 flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow bg-[#3c3c3c] text-[#d4d4d4] rounded-l px-2 py-1 focus:outline-none"
          placeholder="メッセージを入力..."
        />
        <Button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white rounded-r px-3 py-1"
        >
          送信
        </Button>
      </div>
    </div>
  );
};

export default AIChat;
