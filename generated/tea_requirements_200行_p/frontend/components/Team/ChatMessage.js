import React, { useState, useEffect, useRef } from 'react';
import { User, Clock, CheckCircle, XCircle, Paperclip, Smile, Send } from 'lucide-react';

const ChatMessage = ({ user, message, timestamp, status, attachments }) => {
  return (
    <div className="flex items-start space-x-3 mb-4">
      <UserAvatar name={user.name} />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-800">{user.name}</span>
          <span className="text-xs text-gray-500">
            <Clock size={12} className="inline mr-1" />
            {formatTimestamp(timestamp)}
          </span>
        </div>
        <div className="mt-1 p-3 bg-green-50 rounded-lg shadow-sm">
          <p className="text-gray-700">{message}</p>
          {attachments && attachments.length > 0 && (
            <AttachmentList attachments={attachments} />
          )}
        </div>
        <MessageStatus status={status} />
      </div>
    </div>
  );
};

const UserAvatar = ({ name }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
      {initials}
    </div>
  );
};

const AttachmentList = ({ attachments }) => {
  return (
    <div className="mt-2 space-y-2">
      {attachments.map((attachment, index) => (
        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
          <Paperclip size={14} />
          <span>{attachment.name}</span>
        </div>
      ))}
    </div>
  );
};

const MessageStatus = ({ status }) => {
  const statusIcons = {
    sent: <CheckCircle size={14} className="text-green-500" />,
    delivered: <CheckCircle size={14} className="text-blue-500" />,
    read: <CheckCircle size={14} className="text-purple-500" />,
    failed: <XCircle size={14} className="text-red-500" />,
  };

  return (
    <div className="mt-1 text-xs text-gray-500 flex items-center space-x-1">
      {statusIcons[status]}
      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </div>
  );
};

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center space-x-2">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力..."
          className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="button"
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
        >
          <Smile size={20} />
        </button>
        <button
          type="submit"
          className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (newMessage) => {
    const message = {
      id: Date.now(),
      user: { name: '現在のユーザー' },
      message: newMessage,
      timestamp: new Date(),
      status: 'sent',
      attachments: [],
    };
    setMessages([...messages, message]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-4 p-3 bg-green-100 rounded-lg">
        <h2 className="text-xl font-semibold text-green-800">抹茶カフェチーム</h2>
      </div>
      <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} {...msg} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
};

export default ChatWindow;