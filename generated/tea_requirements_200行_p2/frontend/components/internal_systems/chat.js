import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile, Search, MoreVertical, User } from 'lucide-react';

const ChatMessage = ({ message, isOwnMessage }) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-3 ${isOwnMessage ? 'bg-green-100' : 'bg-gray-100'}`}>
        <p className="text-sm text-gray-800">{message.content}</p>
        <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
      </div>
    </div>
  );
};

const ChatSidebar = ({ conversations, activeConversation, setActiveConversation }) => {
  return (
    <div className="w-1/4 bg-green-50 p-4 border-r border-green-200">
      <div className="mb-4">
        <input
          type="text"
          placeholder="会話を検索"
          className="w-full p-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className={`flex items-center p-3 rounded-lg cursor-pointer ${
            activeConversation === conv.id ? 'bg-green-200' : 'hover:bg-green-100'
          }`}
          onClick={() => setActiveConversation(conv.id)}
        >
          <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center mr-3">
            <User size={20} className="text-green-700" />
          </div>
          <div>
            <h3 className="font-semibold text-green-800">{conv.name}</h3>
            <p className="text-sm text-green-600 truncate">{conv.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ChatHeader = ({ activeConversation }) => {
  return (
    <div className="bg-white border-b border-green-200 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center mr-3">
          <User size={20} className="text-green-700" />
        </div>
        <h2 className="text-xl font-semibold text-green-800">{activeConversation.name}</h2>
      </div>
      <div className="flex items-center space-x-4">
        <Search size={20} className="text-green-600 cursor-pointer" />
        <MoreVertical size={20} className="text-green-600 cursor-pointer" />
      </div>
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
    <form onSubmit={handleSubmit} className="bg-white border-t border-green-200 p-4">
      <div className="flex items-center">
        <button type="button" className="mr-2">
          <Paperclip size={20} className="text-green-600" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力..."
          className="flex-grow p-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button type="button" className="mx-2">
          <Smile size={20} className="text-green-600" />
        </button>
        <button type="submit" className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600">
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

const ChatComponent = () => {
  const [conversations, setConversations] = useState([
    { id: 1, name: '抹茶チーム', lastMessage: '新商品の企画について' },
    { id: 2, name: 'マーケティング部門', lastMessage: '来月のキャンペーン案' },
    { id: 3, name: '顧客サポート', lastMessage: 'お問い合わせ対応の件' },
  ]);
  const [activeConversation, setActiveConversation] = useState(1);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // 実際のアプリケーションでは、APIからメッセージを取得する
    const dummyMessages = [
      { id: 1, content: '新しい抹茶フレーバーの開発はどうですか？', timestamp: '10:00', sender: 'other' },
      { id: 2, content: 'とても良いアイデアですね。具体的な案はありますか？', timestamp: '10:05', sender: 'self' },
      { id: 3, content: '抹茶とホワイトチョコレートの組み合わせはどうでしょうか。', timestamp: '10:10', sender: 'other' },
    ];
    setMessages(dummyMessages);
  }, [activeConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'self',
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex h-screen bg-green-50">
      <ChatSidebar
        conversations={conversations}
        activeConversation={activeConversation}
        setActiveConversation={setActiveConversation}
      />
      <div className="flex-grow flex flex-col">
        <ChatHeader activeConversation={conversations.find((conv) => conv.id === activeConversation)} />
        <div className="flex-grow overflow-y-auto p-4 bg-white">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} isOwnMessage={message.sender === 'self'} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatComponent;