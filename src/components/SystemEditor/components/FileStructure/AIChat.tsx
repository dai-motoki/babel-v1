import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Send, Loader2, CheckCircle, ChevronUp, ChevronDown } from 'lucide-react';
import Button from '../common/Button';
import { useDraggable } from '@/hooks/useDraggable';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

// Loader2とCheckCircleコンポーネントをインポートします。
// これらは、処理中の状態と完了状態を視覚的に表現するために使用されます。


interface AIMessage {
  type: 'system' | 'user' | 'ai';
  content: string;
  filePath?: string;
  status?: 'pending' | 'completed';
  isExpanded?: boolean;
}

interface AIChatProps {
  nodes: any[];
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
  const [position, setPosition] = useState({ x: 20, y: 20 });

  const { onMouseDown } = useDraggable(chatBoxRef, setPosition, 5);

  useEffect(() => {
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
      const filePaths = nodes.map((node) => node.id);
      filePaths.forEach((filePath) => {
        setMessages((prev) => [
          ...prev,
          { type: 'ai', content: '', filePath, status: 'pending', isExpanded: false },
        ]);
      });

      const response = await axios.post('http://localhost:8000/v1/ai-file-ops/multi-ai-update', {
        version_control: false,
        file_paths: filePaths,
        change_type: 'smart',
        execution_mode: 'parallel',
        feature_request: input,
      });

      response.data.result.forEach((result: any) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.filePath === result.file_path
              ? { ...msg, content: result.result.generated_text, status: 'completed' }
              : msg
          )
        );
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

  const toggleExpand = (index: number) => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, isExpanded: !msg.isExpanded } : msg))
    );
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
          e.preventDefault();
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
            {message.type === 'ai' && message.filePath && (
              <div className="flex items-center justify-between">
                <span className="font-bold flex-grow">
                  {message.filePath.length > 30
                    ? `...${message.filePath.slice(-30)}`
                    : message.filePath}
                </span>
                <div className="flex items-center">
                  {message.status === 'pending' ? (
                    <Loader2 className="w-5 h-5 animate-spin text-[#0e639c]" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  <Button
                    onClick={() => toggleExpand(index)}
                    className="ml-2 p-1 hover:bg-[#4c4c4c] rounded transition-colors duration-200"
                  >
                    {message.isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#0e639c]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#0e639c]" />
                    )}
                  </Button>
                </div>
              </div>
            )}
            {(message.type !== 'ai' || message.isExpanded) && (
              <div className={`mt-2 ${message.isExpanded ? 'animate-fadeIn' : ''}`}>
                {message.type === 'ai' ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
            )}
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
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default AIChat;