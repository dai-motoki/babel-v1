import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Send, Loader2, CheckCircle, ChevronUp, ChevronDown, Copy } from 'lucide-react';
import Button from '../common/Button';
import { useDraggable } from '@/hooks/useDraggable';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import TaskManager from './TaskManager';

interface AIMessage {
  type: 'system' | 'user' | 'ai';
  content: string;
  filePath?: string;
  status?: 'pending' | 'completed';
  isExpanded?: boolean;
  id: string;
}

interface AIChatProps {
  nodes: any[];
  onClose: () => void;
}

interface Task {
  id: string;
  startTime: Date;
  endTime?: Date;
  relatedFiles: string[];
  name: string;
  status: 'pending' | 'completed';
  fileProgress: { [key: string]: 'pending' | 'completed' };
  fileContents: { [key: string]: string };
}

const AIChat: React.FC<AIChatProps> = ({ nodes, onClose }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<AIMessage[]>([
    { type: 'system', content: 'ハイライトされたノードに関する質問をどうぞ。以下は質問の例です：', id: 'initial' },
  ]);
  const [input, setInput] = useState('');
  const [pendingRequests, setPendingRequests] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskManager, setShowTaskManager] = useState(false);

  const { onMouseDown } = useDraggable(chatBoxRef, setPosition, 5);

  const sampleQuestions = [
    '主な目的は？',
    '依存関係は？',
    '追加要望: ',
    '60 > 100',
    'ファイル分割（現在ディレクトリ）',
    'ファイル分割（ルートディレクトリ）',
    'リファクタリング',

  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessageId = Date.now().toString();
    const userMessage: AIMessage = { type: 'user', content: input, id: userMessageId };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const filePaths = nodes.map((node) => node.id);
    const aiMessageIds: string[] = [];

    // タスクの作成
    const newTask: Task = {
      id: userMessageId,
      startTime: new Date(),
      relatedFiles: filePaths,
      name: input,
      status: 'pending',
      fileProgress: filePaths.reduce((acc, file) => ({ ...acc, [file]: 'pending' }), {}),
      fileContents: {},
    };
    setTasks((prev) => [...prev, newTask]);

    filePaths.forEach((filePath) => {
      const aiMessageId = `${userMessageId}-${filePath}`;
      aiMessageIds.push(aiMessageId);
      setMessages((prev) => [
        ...prev,
        { type: 'ai', content: '', filePath, status: 'pending', isExpanded: false, id: aiMessageId },
      ]);
    });

    setPendingRequests((prev) => [...prev, ...aiMessageIds]);

    try {
      const response = await axios.post('http://localhost:8000/v1/ai-file-ops/multi-ai-update', {
        version_control: false,
        file_paths: filePaths,
        change_type: 'smart',
        execution_mode: 'parallel',
        feature_request: input,
      });

      response.data.result.forEach((result: any) => {
        const aiMessageId = aiMessageIds[filePaths.indexOf(result.file_path)];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: result.result.generated_text, status: 'completed' }
              : msg
          )
        );
        setPendingRequests((prev) => prev.filter((id) => id !== aiMessageId));

        // タスクの更新
        setTasks((prev) =>
          prev.map((task) =>
            task.id === userMessageId
              ? {
                  ...task,
                  fileProgress: {
                    ...task.fileProgress,
                    [result.file_path]: 'completed',
                  },
                  fileContents: {
                    ...task.fileContents,
                    [result.file_path]: result.result.generated_text,
                  },
                }
              : task
          )
        );
      });

      // タスクの完了
      setTasks((prev) =>
        prev.map((task) =>
          task.id === userMessageId
            ? {
                ...task,
                status: 'completed',
                endTime: new Date(),
              }
            : task
        )
      );
    } catch (error) {
      console.error('AI response error:', error);
      setMessages((prev) => [
        ...prev,
        { type: 'system', content: t('エラーが発生しました。もう一度お試しください。'), id: Date.now().toString() },
      ]);
      setPendingRequests((prev) => prev.filter((id) => !aiMessageIds.includes(id)));
    }
  };

  const toggleExpand = (index: number) => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, isExpanded: !msg.isExpanded } : msg))
    );
  };

  const insertSampleQuestion = (question: string) => {
    setInput(question);
  };

  const copyMessageContent = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      // コピー成功時の処理（オプション）
    }).catch(err => {
      console.error('コピーに失敗しました:', err);
    });
  };

  const renderMarkdown = (content: string) => {
    return (
      <ReactMarkdown
        components={{
          table: ({ node, ...props }) => (
            <table className="border-collapse border border-[#4c4c4c] my-2" {...props} />
          ),
          thead: ({ node, ...props }) => <thead className="bg-[#3c3c3c]" {...props} />,
          th: ({ node, ...props }) => (
            <th className="border border-[#4c4c4c] px-2 py-1" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-[#4c4c4c] px-2 py-1" {...props} />
          ),
        }}
        className="prose prose-invert max-w-none"
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <>
      <div
        ref={chatBoxRef}
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        className="w-96 h-[32rem] bg-gradient-to-br from-[#1e1e1e] to-[#2d2d2d] text-[#d4d4d4] rounded-lg shadow-2xl flex flex-col overflow-hidden border border-[#3c3c3c]"
      >
        <div
          className="flex justify-between items-center p-3 bg-gradient-to-r from-[#2d2d2d] to-[#3c3c3c] text-[#d4d4d4] cursor-move"
          onMouseDown={(e) => {
            e.preventDefault();
            onMouseDown(e);
          }}
        >
          <h3 className="text-sm font-semibold flex items-center">
            <span className="w-2 h-2 bg-[#0e639c] rounded-full mr-2"></span>
            {t('AIチャット')}
          </h3>
          <div className="flex items-center">
            {/* タスク管理ボタンを追加 */}
            <Button
              onClick={() => setShowTaskManager(!showTaskManager)}
              className="mr-2 text-[#d4d4d4] hover:text-white cursor-pointer transition-colors duration-200"
            >
              {/* ListTodoアイコンの代わりにテキストを使用 */}
              <span className="text-xs">タスク</span>
            </Button>
            <Button onClick={onClose} className="text-[#d4d4d4] hover:text-white cursor-pointer transition-colors duration-200">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#4c4c4c] scrollbar-track-[#2d2d2d]">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg text-sm ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-[#264f78] to-[#1e3a5f] text-white ml-auto max-w-[75%]'
                  : message.type === 'ai'
                  ? 'bg-gradient-to-r from-[#3c3c3c] to-[#4c4c4c] text-[#d4d4d4] mr-auto max-w-[75%]'
                  : 'bg-gradient-to-r from-[#2d2d2d] to-[#3c3c3c] text-[#d4d4d4] text-center w-full'
              }`}
            >
              {message.type === 'ai' && message.filePath && (
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#4c4c4c]">
                  <span className="font-bold text-xs truncate flex-grow mr-2">
                    {message.filePath.length > 30
                      ? `...${message.filePath.slice(-30)}`
                      : message.filePath}
                  </span>
                  <div className="flex items-center">
                    {message.status === 'pending' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#3b9cff]" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    <Button
                      onClick={() => toggleExpand(index)}
                      className="ml-2 p-1 hover:bg-[#4c4c4c] rounded transition-colors duration-200"
                    >
                      {message.isExpanded ? (
                        <ChevronUp className="w-3 h-3 text-[#3b9cff]" />
                      ) : (
                        <ChevronDown className="w-3 h-3 text-[#3b9cff]" />
                      )}
                    </Button>
                    <Button
                      onClick={() => copyMessageContent(message.content)}
                      className="ml-2 p-1 hover:bg-[#4c4c4c] rounded transition-colors duration-200"
                    >
                      <Copy className="w-3 h-3 text-[#3b9cff]" />
                    </Button>
                  </div>
                </div>
              )}
              {(message.type !== 'ai' || message.isExpanded) && (
                <div className={`mt-2 ${message.isExpanded ? 'animate-fadeIn' : ''} overflow-hidden`}>
                  <div className="break-words">
                    {message.type === 'ai' ? renderMarkdown(message.content) : message.content}
                  </div>
                </div>
              )}
            </div>
          ))}
          {pendingRequests.length > 0 && (
            <div className="text-center">
              <span className="animate-pulse text-xs bg-[#3c3c3c] px-3 py-1 rounded-full">{t('AIが考え中...')}</span>
            </div>
          )}
        </div>
        <div className="p-2 border-t border-[#3c3c3c] bg-[#2d2d2d] flex flex-wrap justify-center">
          {sampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => insertSampleQuestion(question)}
              className="m-1 px-2 py-1 text-xs bg-[#3c3c3c] text-[#d4d4d4] rounded hover:bg-[#4c4c4c] transition-colors duration-200"
            >
              {question}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="p-3 border-t border-[#3c3c3c] flex items-center bg-[#2d2d2d]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('メッセージを入力...')}
            className="flex-grow bg-[#3c3c3c] text-[#d4d4d4] rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e639c] transition-all duration-200"
          />
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-[#0e639c] to-[#1177bb] text-white rounded-r-lg px-4 py-2 hover:from-[#1177bb] hover:to-[#0e639c] transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
      {showTaskManager && (
        <div
          style={{
            position: 'absolute',
            left: `${position.x + 400}px`,
            top: `${position.y}px`,
          }}
        >
          <TaskManager tasks={tasks} onClose={() => setShowTaskManager(false)} />
        </div>
      )}
    </>
  );
};

export default AIChat;