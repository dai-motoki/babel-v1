import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile, Search, Settings, Bell } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('現在のユーザー');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // 初期メッセージをセット
    setMessages([
      { id: 1, user: '田中', message: 'こんにちは！新しい抹茶ラテのレシピについて話し合いましょう。', timestamp: '10:00' },
      { id: 2, user: '佐藤', message: 'はい、良いアイデアがあります。抹茶の量を少し増やして、ほんのり甘さを加えるのはどうでしょうか？', timestamp: '10:05' },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        user: currentUser,
        message: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-green-50">
      <header className="bg-green-800 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">抹茶カフェ チャット</h1>
          <div className="flex space-x-4">
            <button className="hover:bg-green-700 p-2 rounded-full">
              <Search size={20} />
            </button>
            <button className="hover:bg-green-700 p-2 rounded-full">
              <Bell size={20} />
            </button>
            <button className="hover:bg-green-700 p-2 rounded-full">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${
              msg.user === currentUser ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.user === currentUser
                  ? 'bg-green-200 text-green-900'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p className="font-semibold">{msg.user}</p>
              <p>{msg.message}</p>
              <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <footer className="bg-white border-t border-green-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <button
            type="button"
            className="text-green-600 hover:text-green-800 mr-2"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="メッセージを入力..."
            className="flex-1 border border-green-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            className="text-green-600 hover:text-green-800 mx-2"
          >
            <Smile size={20} />
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700 transition duration-200"
          >
            <Send size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Chat;