import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Send } from 'lucide-react';
import Button from '../common/Button';
import { useDraggable } from '@/hooks/useDraggable';
import axios from 'axios';

// 型定義を追加
interface AIMessage {
  type: 'system' | 'user' | 'ai';
  content: string;
  filePath?: string; // ファイルパスを追加
}

interface AIChatProps {
  nodes: any[]; // nodesの型は適切に定義してください
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ nodes, onClose }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<AIMessage[]>([
    { type: 'system', content: 'ハイライトされたノードに関する質問をどうぞ。' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // positionステートを追加
  const [position, setPosition] = useState({ x: 20, y: 20 });

  // useDraggableフックを修正
  const { onMouseDown } = useDraggable(chatBoxRef, setPosition, 5); // 5ピクセルの閾値を追加

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
      const response = await axios.post('http://localhost:8000/v1/ai-file-ops/multi-ai-update', {
        version_control: false,
        file_paths: nodes.map((node) => node.id),
        change_type: 'smart',
        execution_mode: 'parallel',
        feature_request: input,
      });

      // レスポンスの各生成テキストを別々のAIメッセージとして追加
      response.data.result.forEach((result: any) => {
        setMessages((prev) => [...prev, { 
          type: 'ai', 
          content: result.result.generated_text,
          filePath: result.file_path
        }]);
      });
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

  return (
    <div 
      ref={chatBoxRef}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      className="w-80 h-96 bg-[#1e1e1e] bg-opacity-90 text-[#d4d4d4] rounded-lg shadow-lg flex flex-col overflow-hidden"
    >
      <div 
        className="flex justify-between items-center p-2 bg-[#2d2d2d] text-[#d4d4d4] cursor-move"
        onMouseDown={(e) => {
          e.preventDefault(); // デフォルトの動作を防止
          onMouseDown(e);
        }}
      >
        <h3 className="text-sm font-medium">{t('AIチャット')}</h3>
        <Button onClick={onClose} className="text-[#d4d4d4] hover:text-white cursor-pointer">
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
            {message.filePath && (
              <div className="text-[10px] mt-1 text-gray-400">
                {message.filePath}
              </div>
            )}
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