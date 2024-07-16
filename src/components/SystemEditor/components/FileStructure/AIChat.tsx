import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Send } from 'lucide-react';
import Button from '../common/Button';
import { useDraggable } from '@/hooks/useDraggable';

// 型定義を追加
interface AIMessage {
  type: 'system' | 'user' | 'ai';
  content: string;
}

interface AIChatProps {
  nodes: any[]; // nodesの型は適切に定義してください
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ nodes, onClose }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<AIMessage[]>([
    { type: 'system', content: 'ハイライトされたノードに関する質問をどうぞ。' },
    { type: 'user', content: 'このプロジェクトの構造について教えてください。' },
    { type: 'ai', content: 'このプロジェクトは主にReactを使用したフロントエンド構造になっています。src/componentsディレクトリには様々なReactコンポーネントが含まれており、その中にSystemEditorという大きなコンポーネントがあります。' },
    { type: 'user', content: 'SystemEditorの主な機能は何ですか？' },
    { type: 'ai', content: 'SystemEditorは、プロジェクトのファイル構造を視覚化し、編集するための主要なコンポーネントです。ForceGraphを使用してファイル間の関係を表示し、ファイルの内容を編集するためのエディタも含んでいます。' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // ドラッグ可能な機能を追加
  const { position, onMouseDown } = useDraggable(chatBoxRef);

  useEffect(() => {
    // チャットが更新されたら一番下までスクロール
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: AIMessage = { type: 'user', content: input };
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
  const fetchAIResponse = async (input: string, nodes: any[]): Promise<string> => {
    // ダミーの非同期処理
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `これはダミーの応答です。入力: "${input}"。ノード数: ${nodes.length}`;
  };

  return (
    <div 
      ref={chatBoxRef}
      style={{
        position: 'absolute',
        right: '20px',
        top: '20px',
        cursor: 'move',
      }}
      className="w-80 h-96 bg-[#1e1e1e] bg-opacity-90 text-[#d4d4d4] rounded-lg shadow-lg flex flex-col overflow-hidden"
    >
      <div 
        className="flex justify-between items-center p-2 bg-[#2d2d2d] text-[#d4d4d4]"
        onMouseDown={onMouseDown}
      >
        <h3 className="text-sm font-medium">{t('AIチャット')}</h3>
        <Button onClick={onClose} className="text-[#d4d4d4] hover:text-white">
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-2 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-md text-xs ${
              message.type === 'user'
                ? 'bg-[#264f78] text-white ml-auto max-w-[70%]'
                : message.type === 'ai'
                ? 'bg-[#3c3c3c] text-[#d4d4d4] mr-auto max-w-[70%]'
                : 'bg-[#2d2d2d] text-[#d4d4d4] text-center w-full'
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="text-center">
            <span className="animate-pulse text-xs">{t('AIが考え中...')}</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-2 border-t border-[#3c3c3c] flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('メッセージを入力...')}
          className="flex-grow bg-[#3c3c3c] text-[#d4d4d4] rounded-l px-2 py-1 text-xs focus:outline-none"
          disabled={isLoading}
        />
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-[#0e639c] text-white rounded-r px-3 py-1 hover:bg-[#1177bb] text-xs"
        >
          <Send className="w-3 h-3" />
        </Button>
      </form>
    </div>
  );
};

export default AIChat;