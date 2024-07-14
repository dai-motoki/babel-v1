import React from 'react';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {isUser ? null : (
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img
            src="https://via.placeholder.com/40"
            alt="user avatar"
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div
        className={`p-3 rounded-lg shadow-md max-w-xs ${
          isUser
            ? 'bg-green-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;