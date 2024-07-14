import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Smile, Search, Info } from 'lucide-react';

const GlobalChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;
    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString(),
      translated: false,
    };
    setMessages([...messages, newMessage]);
    setInputMessage('');
    // Here you would typically send the message to a backend service
    translateMessage(newMessage);
  };

  const translateMessage = (message) => {
    // Simulating translation API call
    setTimeout(() => {
      const translatedMessage = {
        ...message,
        text: `Translated: ${message.text}`,
        translated: true,
      };
      setMessages(messages.map(msg => msg.id === message.id ? translatedMessage : msg));
    }, 1000);
  };

  const addEmoji = (emoji) => {
    setInputMessage(inputMessage + emoji);
  };

  const searchMessages = () => {
    // Implement message search functionality here
  };

  const showCulturalContext = (message) => {
    // Implement cultural context display here
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-semibold text-gray-800">Global Chat</h1>
      </div>
      <div className="flex-grow overflow-hidden">
        <div ref={chatContainerRef} className="h-full overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex flex-col bg-white rounded-lg shadow p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">{message.sender}</span>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
              <p className="text-gray-800">{message.text}</p>
              {message.translated && (
                <div className="mt-2 text-sm text-gray-600 italic">
                  Original message was translated
                </div>
              )}
              <button
                onClick={() => showCulturalContext(message)}
                className="self-end mt-2 text-blue-500 hover:text-blue-600"
              >
                <Info size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow mr-2 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={searchMessages}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            <Search size={20} />
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow mr-2 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => setShowEmojis(!showEmojis)}
            className="mr-2 text-gray-500 hover:text-gray-700"
          >
            <Smile size={24} />
          </button>
          <button
            onClick={sendMessage}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            <Send size={20} />
          </button>
        </div>
        {showEmojis && (
          <div className="mt-2 p-2 bg-white border border-gray-200 rounded-md">
            {['😊', '😂', '🎉', '👍', '❤️'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => addEmoji(emoji)}
                className="mr-2 text-2xl hover:bg-gray-100 rounded"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalChat;