import React from 'react';
import { MessageCircle, ListTodo, Eye } from 'lucide-react';

const FloatingButtons = ({ setShowAIChat, setShowTaskManager, setShowPreview }) => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
      <button
        onClick={() => setShowAIChat(true)}
        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
      >
        <MessageCircle size={24} />
      </button>
      <button
        onClick={() => setShowTaskManager(true)}
        className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200"
      >
        <ListTodo size={24} />
      </button>
      <button
        onClick={() => setShowPreview(prev => !prev)}
        className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-200"
      >
        <Eye size={24} />
      </button>
    </div>
  );
};

export default FloatingButtons;
