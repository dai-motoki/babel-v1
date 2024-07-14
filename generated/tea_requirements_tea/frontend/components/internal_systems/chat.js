import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader, XCircle } from 'lucide-react';

const ChatSystem = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        setIsLoading(true);
        // 実際のAPIコールをシミュレート
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockHistory = [
          { id: 1, sender: 'user', content: 'こんにちは' },
          { id: 2, sender: 'bot', content: 'いらっしゃいませ。どのようなご用件でしょうか？' },
        ];
        setMessages(mockHistory);
      } catch (err) {
        setError('チャット履歴の取得に失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage = { id: Date.now(), sender: 'user', content: inputMessage };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');

    try {
      setIsLoading(true);
      // 実際のAPIコールをシミュレート
      await new Promise(resolve => setTimeout(resolve, 1500));
      const botResponse = { id: Date.now() + 1, sender: 'bot', content: '承知いたしました。ご質問の内容について詳しく調査し、最適な回答をご用意いたします。少々お待ちください。' };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (err) {
      setError('メッセージの送信に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h2 className="text-2xl font-bold">内部チャットシステム</h2>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
                {message.sender === 'user' ? <User className="w-6 h-6 text-blue-600" /> : <Bot className="w-6 h-6 text-green-600" />}
              </div>
              <div className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-50 text-blue-900' : 'bg-green-50 text-green-900'}`}>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <Loader className="w-6 h-6 text-blue-500 animate-spin" />
            <p className="ml-2 text-blue-600">メッセージを処理しています...</p>
          </div>
        )}
        {error && (
          <div className="flex items-center p-4 bg-red-100 rounded-lg">
            <XCircle className="w-6 h-6 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="メッセージを入力..."
            rows="2"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || inputMessage.trim() === ''}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;