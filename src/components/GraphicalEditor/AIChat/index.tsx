import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useTranslation } from 'react-i18next';
import { X, Send, Loader2, CheckCircle, ChevronUp, ChevronDown, Copy, MessageSquare, Wrench, StopCircle } from 'lucide-react';
import Button from '@/components/common/Button';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import TaskManager from '../TaskManager';
import Draggable from 'react-draggable';

// AIMessageインターフェースの定義
interface AIMessage {
  type: 'system' | 'user' | 'ai';
  content: string;
  filePath?: string;
  status?: 'pending' | 'completed' | 'stopped';
  isExpanded?: boolean;
  id: string;
}

// AIChatPropsインターフェースの定義
interface AIChatProps {
  nodes: any[];
  onClose: () => void;
}

// Taskインターフェースの定義
interface Task {
  id: string;
  startTime: Date;
  endTime?: Date;
  relatedFiles: string[];
  name: string;
  status: 'pending' | 'completed' | 'stopped';
  fileProgress: { [key: string]: 'pending' | 'completed' | 'stopped' };
  fileContents: { [key: string]: string };
}

// AIChat コンポーネントの定義
const AIChat: React.FC<AIChatProps> = ({ nodes, onClose }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<AIMessage[]>([
    { type: 'system', content: 'ハイライトされたノードに関する質問をどうぞ。以下は質問の例です：', id: 'initial' },
  ]);
  const [input, setInput] = useState('');
  const [pendingRequests, setPendingRequests] = useState<{ [key: string]: AbortController }>({});
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskManager, setShowTaskManager] = useState(true);


  const [storedMessages, setStoredMessages] = useLocalStorage<AIMessage[]>('aiChatMessages', []);
  const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>('aiChatTasks', []);


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
    '目的',
    '依存関係',
    '追加要望: ',
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

    try {
      // APIエンドポイントの選択
      const endpoint = isProcessing ? '/v1/ai-file-ops/multi-ai-process' : '/v1/ai-file-ops/multi-ai-reply';
      
      const controllers = aiMessageIds.map(() => new AbortController());
      setPendingRequests(prev => ({
        ...prev,
        ...Object.fromEntries(aiMessageIds.map((id, index) => [id, controllers[index]]))
      }));

      const responses = await Promise.all(filePaths.map((filePath, index) => 
        axios.post(`http://localhost:8000${endpoint}`, {
          version_control: false,
          file_paths: [filePath],
          change_type: 'smart',
          execution_mode: 'parallel',
          feature_request: input,
        }, { signal: controllers[index].signal })
      ));

      // レスポンス処理
      responses.forEach((response, index) => {
        const result = response.data.result[0];
        const aiMessageId = aiMessageIds[index];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: result.result.generated_text, status: 'completed' }
              : msg
          )
        );

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
      if (axios.isCancel(error)) {
        console.log('リクエストがキャンセルされました');
      } else {
        console.error('AI response error:', error);
        setMessages((prev) => [
          ...prev,
          { type: 'system', content: t('エラーが発生しました。もう一度お試しください。'), id: Date.now().toString() },
        ]);
      }
    } finally {
      // クリーンアップ
      aiMessageIds.forEach(id => {
        setPendingRequests(prev => {
          const newRequests = { ...prev };
          delete newRequests[id];
          return newRequests;
        });
      });
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

  const stopTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: 'stopped', 
            endTime: new Date(),
            fileProgress: Object.fromEntries(
              Object.entries(task.fileProgress).map(([key, value]) => 
                [key, value === 'pending' ? 'stopped' : value]
              )
            )
          } 
        : task
    ));

    // 関連するAIメッセージの状態も更新
    setMessages(prevMessages => prevMessages.map(msg => 
      msg.id.startsWith(taskId) && msg.status === 'pending'
        ? { ...msg, status: 'stopped' }
        : msg
    ));

    // 進行中のリクエストを中止
    Object.entries(pendingRequests).forEach(([key, controller]) => {
      if (key.startsWith(taskId)) {
        controller.abort();
        setPendingRequests(prev => {
          const newRequests = { ...prev };
          delete newRequests[key];
          return newRequests;
        });
      }
    });
  }, [pendingRequests]);

  // 新しい関数: タスクを再開する
  const restartTask = useCallback(async (taskId: string) => {
    // タスクの状態を更新
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: 'pending', 
            fileProgress: Object.fromEntries(
              Object.entries(task.fileProgress).map(([key, value]) => 
                [key, value === 'stopped' ? 'pending' : value]
              )
            )
          } 
        : task
    ));

    // 関連するAIメッセージの状態を更新
    setMessages(prevMessages => prevMessages.map(msg => 
      msg.id.startsWith(taskId) && msg.status === 'stopped'
        ? { ...msg, status: 'pending' }
        : msg
    ));

    // タスクを取得
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // APIを呼び出してタスクを再開
    try {
      const controllers = task.relatedFiles.map(() => new AbortController());
      setPendingRequests(prev => ({
        ...prev,
        ...Object.fromEntries(task.relatedFiles.map((file, index) => [`${taskId}-${file}`, controllers[index]]))
      }));

      const responses = await Promise.all(task.relatedFiles.map((filePath, index) => 
        axios.post('http://localhost:8000/v1/ai-file-ops/multi-ai-reply', {
          version_control: false,
          file_paths: [filePath],
          change_type: 'smart',
          execution_mode: 'parallel',
          feature_request: task.name,
        }, { signal: controllers[index].signal })
      ));

      // レスポンス処理
      responses.forEach((response, index) => {
        const result = response.data.result[0];
        const aiMessageId = `${taskId}-${task.relatedFiles[index]}`;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: result.result.generated_text, status: 'completed' }
              : msg
          )
        );

        // タスクの更新
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  fileProgress: {
                    ...t.fileProgress,
                    [result.file_path]: 'completed',
                  },
                  fileContents: {
                    ...t.fileContents,
                    [result.file_path]: result.result.generated_text,
                  },
                }
              : t
          )
        );
      });

      // タスクの完了
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                status: 'completed',
                endTime: new Date(),
              }
            : t
        )
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('リクエストがキャンセルされました');
      } else {
        console.error('AI response error:', error);
        setMessages((prev) => [
          ...prev,
          { type: 'system', content: t('エラーが発生しました。もう一度お試しください。'), id: Date.now().toString() },
        ]);
      }
    } finally {
      // クリーンアップ
      task.relatedFiles.forEach(file => {
        setPendingRequests(prev => {
          const newRequests = { ...prev };
          delete newRequests[`${taskId}-${file}`];
          return newRequests;
        });
      });
    }
  }, [tasks, setMessages, setTasks, setPendingRequests, t]);

  return (
    <div className="fixed bottom-4 right-4 flex">
      <Draggable bounds="parent">
        <div
          ref={chatBoxRef}
          className="w-96 h-[32rem] bg-gradient-to-br from-[#1e1e1e] to-[#2d2d2d] text-[#d4d4d4] rounded-lg shadow-2xl flex flex-col overflow-hidden border border-[#3c3c3c]"
        >
          <div
            className="flex justify-between items-center p-3 bg-gradient-to-r from-[#2d2d2d] to-[#3c3c3c] text-[#d4d4d4] cursor-move"
          >
            <h3 className="text-sm font-semibold flex items-center">
              <span className="w-2 h-2 bg-[#0e639c] rounded-full mr-2"></span>
              {t('AIチャット')}
            </h3>
            <div className="flex items-center">
              <Button
                onClick={() => setShowTaskManager(!showTaskManager)}
                className="mr-2 text-[#d4d4d4] hover:text-white cursor-pointer transition-colors duration-200"
              >
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
                      ) : message.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <StopCircle className="w-4 h-4 text-red-500" />
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
            {Object.keys(pendingRequests).length > 0 && (
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
          <form onSubmit={(e) => handleSubmit(e, false)} className="p-3 border-t border-[#3c3c3c] flex items-center bg-[#2d2d2d]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('メッセージを入力...')}
              className="flex-grow bg-[#3c3c3c] text-[#d4d4d4] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e639c] transition-all duration-200 mr-2"
            />
            <div className="flex">
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e, false)}
                className="bg-[#3c3c3c] text-[#d4d4d4] rounded-lg px-4 py-2 hover:bg-[#4c4c4c] transition-all duration-200 mr-2"
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e, true)}
                className="bg-[#3c3c3c] text-[#d4d4d4] rounded-lg px-4 py-2 hover:bg-[#4c4c4c] transition-all duration-200"
              >
                <Wrench className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </Draggable>
      {showTaskManager && (
        <div className="ml-4">
          <TaskManager 
            tasks={tasks} 
            onClose={() => setShowTaskManager(false)} 
            onStopTask={stopTask}
            onRestartTask={restartTask}
          />
        </div>
      )}
    </div>
  );
};

export default AIChat;
