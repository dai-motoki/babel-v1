import React, { useState, useEffect, useRef } from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useTranslation } from 'react-i18next';
import { X, Send, Loader2, CheckCircle, ChevronUp, ChevronDown, Copy, MessageSquare, Wrench, MessageCircle, ListTodo } from 'lucide-react';
import Button from '../common/Button';
import { useDraggable } from '@/hooks/useDraggable';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import TaskManager from './TaskManager';

// AIMessageインターフェースの定義
interface AIMessage {
  type: 'system' | 'user' | 'ai';
  content: string;
  filePath?: string;
  status?: 'pending' | 'completed';
  isExpanded?: boolean;
  id: string;
}

// AIChatPropsインターフェースの定義
interface AIChatProps {
  nodes: any[];
  onClose: () => void;
  showTaskManager: boolean;
  setShowTaskManager: (show: boolean) => void;
}

// Taskインターフェースの定義
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

// AIChat コンポーネントの定義
const AIChat: React.FC<AIChatProps> = ({ nodes, onClose, showTaskManager, setShowTaskManager }) => {
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
  const [showAIChat, setShowAIChat] = useState(false);

  
  const [storedMessages, setStoredMessages] = useLocalStorage<AIMessage[]>('aiChatMessages', []);
  const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>('aiChatTasks', []);


  const { onMouseDown } = useDraggable(chatBoxRef, setPosition, 5);

  
  useEffect(() => {
    setMessages(storedMessages);
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    setStoredMessages(messages);
  }, [messages]);

  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks]);


  // サンプル質問の配列
  const sampleQuestions = [
    '主な目的は？',
    '依存関係は？',
    '追加要望: ',
    'すべてのコードを書く',
    '60 > 100',
    'ファイル分割（現在ディレクトリ）',
    'ファイル分割（ルートディレクトリ）',
    'リファクタリング',
  ];

  // チャットコンテナのスクロール処理
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // メッセージ送信処理
  const handleSubmit = async (e: React.FormEvent, isProcessing: boolean = false) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessageId = Date.now().toString();
    const userMessage: AIMessage = { type: 'user', content: input, id: userMessageId };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const filePaths = nodes.map((node) => node.id);
    const aiMessageIds: string[] = [];

    // 新しいタスクの作成
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

    // AIメッセージの作成
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
      // APIエンドポイントの選択
      const endpoint = isProcessing ? '/v1/ai-file-ops/multi-ai-process' : '/v1/ai-file-ops/multi-ai-reply';
      const response = await axios.post(`http://localhost:8000${endpoint}`, {
        version_control: false,
        file_paths: filePaths,
        change_type: 'smart',
        execution_mode: 'parallel',
        feature_request: input,
      });

      // レスポンス処理
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

  // メッセージの展開/折りたたみ処理
  const toggleExpand = (index: number) => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, isExpanded: !msg.isExpanded } : msg))
    );
  };

  // サンプル質問の挿入
  const insertSampleQuestion = (question: string) => {
    setInput(question);
  };

  // メッセージ内容のコピー
  const copyMessageContent = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      // コピー成功時の処理（オプション）
    }).catch(err => {
      console.error('コピーに失敗しました:', err);
    });
  };

  // Markdownのレンダリング
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
          position: 'fixed',
          right: '20px',
          bottom: '80px',
        }}
        className="w-96 h-[32rem] bg-gradient-to-br from-[#1e1e1e] to-[#2d2d2d] text-[#d4d4d4] rounded-lg shadow-2xl flex flex-col overflow-hidden border border-[#3c3c3c]"
      >
        {/* AIチャットの内容（変更なし） */}
      </div>

      {showTaskManager && (
        <div
          style={{
            position: 'fixed',
            right: '420px',
            bottom: '80px',
          }}
        >
          <TaskManager tasks={tasks} onClose={() => setShowTaskManager(false)} />
        </div>
      )}
    </>
  );
};

export default AIChat;