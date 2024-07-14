import { useState, useEffect, useRef } from 'react';
// import { Icons } from '../UI/Icons'; // アイコンコンポーネントをインポート

// ChatMessageコンポーネントをインラインで定義
const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`${
          isUser ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'
        } rounded-lg py-2 px-4 max-w-xs`}
      >
        {message.text}
      </div>
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      setMessages([
        ...messages,
        { id: Date.now(), text: newMessage, sender: 'user' },
      ]);
      setNewMessage('');
    }
  };

  // モックデータとしてメッセージを追加 (一定時間後に自動返信)
  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender !== 'bot'
    ) {
      const timeoutId = setTimeout(() => {
        setMessages([
          ...messages,
          {
            id: Date.now(),
            text: 'こんにちは！メッセージありがとうございます。',
            sender: 'bot',
          },
        ]);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [messages]);

  // 新しいメッセージが追加されたらスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-md overflow-hidden">
      <div className="bg-green-500 text-white font-bold py-2 px-4">
        <span>社内チャット</span>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-4 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            placeholder="メッセージを入力してください"
            value={newMessage}
            onChange={handleInputChange}
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;