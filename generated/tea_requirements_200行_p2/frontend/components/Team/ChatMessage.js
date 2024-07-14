import React, { useState, useEffect, useRef } from 'react';
import { User, Send, Paperclip, Smile, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const ChatMessage = ({ message, currentUser, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    onEdit(message.id, editedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(message.id);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className="flex items-start mb-4 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-shrink-0 mr-3">
        <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
          <User className="text-green-800" size={20} />
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center mb-1">
          <span className="font-semibold text-green-800 mr-2">{message.username}</span>
          <span className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
        </div>
        {isEditing ? (
          <div className="flex items-center">
            <input
              ref={editInputRef}
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="flex-grow mr-2 p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleEdit}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors duration-200"
            >
              保存
            </button>
          </div>
        ) : (
          <p className="text-gray-700">{message.content}</p>
        )}
      </div>
      {isHovered && currentUser === message.username && !isEditing && (
        <div className="flex items-center ml-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-green-600 mr-2 transition-colors duration-200"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-600 transition-colors duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center bg-white border border-green-300 rounded-lg p-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力..."
          className="flex-grow mr-2 p-2 bg-transparent focus:outline-none"
        />
        <button
          type="button"
          className="text-green-600 hover:text-green-800 mr-2 transition-colors duration-200"
        >
          <Paperclip size={20} />
        </button>
        <button
          type="button"
          className="text-green-600 hover:text-green-800 mr-2 transition-colors duration-200"
        >
          <Smile size={20} />
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-200"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState('ユーザー1');

  useEffect(() => {
    // サンプルメッセージを追加
    setMessages([
      { id: 1, username: 'ユーザー1', content: 'こんにちは、新しい抹茶フレーバーはいつ発売されますか？', timestamp: new Date().toISOString() },
      { id: 2, username: 'ユーザー2', content: '来月の初旬に発売予定です！楽しみにしていてください。', timestamp: new Date().toISOString() },
    ]);
  }, []);

  const handleSendMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      username: currentUser,
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleEditMessage = (id, newContent) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, content: newContent } : msg
    ));
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-green-50 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-green-200">
        <h2 className="text-2xl font-semibold text-green-800">抹茶カフェチャット</h2>
        <button className="text-green-600 hover:text-green-800 transition-colors duration-200">
          <MoreVertical size={24} />
        </button>
      </div>
      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            currentUser={currentUser}
            onEdit={handleEditMessage}
            onDelete={handleDeleteMessage}
          />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;