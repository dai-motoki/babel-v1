import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Send } from 'lucide-react';
import Button from '../common/Button';

const AIChat = ({ nodes, onClose }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // 初期メッセージを設定
    setMessages([
      {
        type: 'system',
        content: t('ハイライトされたノードに関する質問をどうぞ。'),
      },
    ]);
  }, [t]);

  useEffect(() => {
    // チャットが更新されたら一番下までスクロール
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // ここでAI APIを呼び出す
      const aiResponse = await fetchAIResponse(input, nodes);
      setMessages((prev) => [...prev, { type: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error('AI response error:', error);
      setMessages((prev) => [
        ...prev,
        { type: 'system', content: t('エラーが発生しました。もう一度お試しください。') },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // この関数は実際のAI APIに置き換える必要があります
  const fetchAIResponse = async (input, nodes) => {
    // ダミーの非同期処理
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `これはダミーの応答です。入力: "${input}"。ノード数: ${nodes.length}`;
  };

  return (
    <div className="fixed bottom-0 right-0 w-96 h-128 bg-[#2a2a2a] text-[#d4d4d4] rounded-tl-lg shadow-lg flex flex-col">
      <div className="flex justify-between items-center p-3 border-b border-[#3c3c3c]">
        <h3 className="text-lg font-medium">{t('AIチャット')}</h3>
        <Button onClick={onClose} className="text-[#d4d4d4] hover:text-white">
          <X className="w-5 h-5" />
        </Button>
      </div>
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              message.type === 'user'
                ? 'bg-[#3c3c3c] ml-auto'
                : message.type === 'ai'
                ? 'bg-[#4a4a4a]'
                : 'bg-[#2a2a2a] text-center'
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="text-center">
            <span className="animate-pulse">{t('AIが考え中...')}</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-3 border-t border-[#3c3c3c] flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('メッセージを入力...')}
          className="flex-grow bg-[#3c3c3c] text-[#d4d4d4] rounded-l px-3 py-2 focus:outline-none"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white rounded-r px-4 py-2 hover:bg-blue-600"
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default AIChat;