import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile, User } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [users, setUsers] = useState(['Alice', 'Bob', 'Charlie', 'David']);
  const messagesEndRef = useRef(null);

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
        id: Date.now(),
        text: inputMessage,
        sender: 'You',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      setTimeout(() => {
        const botReply = {
          id: Date.now() + 1,
          text: 'Thank you for your message. How can I assist you further?',
          sender: 'Bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-green-50">
      <div className="bg-green-800 text-white p-4">
        <h1 className="text-2xl font-semibold">内部チャットシステム</h1>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 bg-green-100 p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-green-800">ユーザー一覧</h2>
          <ul>
            {users.map((user, index) => (
              <li
                key={index}
                className="flex items-center mb-2 p-2 hover:bg-green-200 rounded-md transition duration-200"
              >
                <User size={24} className="mr-2 text-green-700" />
                <span className="text-green-900">{user}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 flex flex-col bg-white">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.sender === 'You' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === 'You'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                </div>
                <p className="text-xs mt-1 text-gray-500">{message.sender}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-4 bg-green-50">
            <div className="flex items-center">
              <button
                type="button"
                className="p-2 rounded-full text-green-600 hover:bg-green-100 transition duration-200"
              >
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="メッセージを入力..."
                className="flex-1 ml-2 p-2 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                className="p-2 ml-2 rounded-full text-green-600 hover:bg-green-100 transition duration-200"
              >
                <Smile size={20} />
              </button>
              <button
                type="submit"
                className="p-2 ml-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition duration-200"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;