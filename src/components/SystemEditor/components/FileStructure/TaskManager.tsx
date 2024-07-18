// TaskManager.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronDown, ChevronRight, Clock, CheckCircle, Copy, ChevronUp, Trash } from 'lucide-react';
import Button from '../common/Button';

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

interface TaskManagerProps {
  tasks: Task[];
  onClose: () => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({ tasks, onClose, onDeleteTask }) => {
  const { t } = useTranslation();
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
  const [expandedFiles, setExpandedFiles] = useState<{ [key: string]: boolean }>({});
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const toggleTask = (taskId: string) => {
    setExpandedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const toggleFile = (taskId: string, filePath: string) => {
    setExpandedFiles(prev => ({
      ...prev,
      [`${taskId}-${filePath}`]: !prev[`${taskId}-${filePath}`]
    }));
  };

  const copyFileContent = (taskId: string, filePath: string, content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedFile(`${taskId}-${filePath}`);
      setTimeout(() => setCopiedFile(null), 2000); // 2秒後にリセット
    }).catch(err => {
      console.error('コピーに失敗しました:', err);
    });
  };

  // ファイルパスを省略する関数
  const truncateFilePath = (filePath: string, maxLength: number) => {
    if (filePath.length <= maxLength) return filePath;
    const start = filePath.slice(0, maxLength / 2 - 3);
    const end = filePath.slice(-maxLength / 2 + 3);
    return `${start}...${end}`;
  };

  return (
    <div className="w-96 h-[32rem] bg-gradient-to-br from-[#1e1e1e] to-[#2d2d2d] text-[#d4d4d4] rounded-lg shadow-2xl flex flex-col overflow-hidden border border-[#3c3c3c]">
      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#2d2d2d] to-[#3c3c3c] text-[#d4d4d4]">
        <h3 className="text-sm font-semibold flex items-center">
          <span className="w-2 h-2 bg-[#0e639c] rounded-full mr-2"></span>
          {t('タスク管理')}
        </h3>
        <Button onClick={onClose} className="text-[#d4d4d4] hover:text-white cursor-pointer transition-colors duration-200">
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#4c4c4c] scrollbar-track-[#2d2d2d]">
        {tasks.map((task) => (
          <div key={task.id} className="bg-[#3c3c3c] rounded-lg p-3 text-sm">
            <div className="flex items-center justify-between">
              <div 
                className="flex items-center cursor-pointer flex-grow" 
                onClick={() => toggleTask(task.id)}
              >
                {expandedTasks.includes(task.id) ? (
                  <ChevronDown className="w-4 h-4 mr-2" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-2" />
                )}
                <span className="font-bold">{t('タスク')} #{task.id}</span>
                <span className="ml-auto mr-2">
                  {task.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-yellow-500" />
                  )}
                </span>
              </div>
              <Button
                onClick={() => onDeleteTask(task.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            {expandedTasks.includes(task.id) && (
              <div className="mt-2 pl-6">
                <div>{t('開始時間')}: {task.startTime.toLocaleString()}</div>
                <div>{t('終了時間')}: {task.endTime ? task.endTime.toLocaleString() : t('進行中')}</div>
                <div>{t('タスク名')}: {task.name}</div>
                <div>{t('状態')}: {task.status === 'completed' ? t('完了') : t('進行中')}</div>
                <div className="mt-2">
                  <div className="font-bold mb-1">{t('関連ファイル')}:</div>
                  {task.relatedFiles.map((file) => (
                    <div key={file} className="mb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center cursor-pointer" onClick={() => toggleFile(task.id, file)}>
                          {expandedFiles[`${task.id}-${file}`] ? (
                            <ChevronUp className="w-4 h-4 mr-2 text-[#3b9cff]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 mr-2 text-[#3b9cff]" />
                          )}
                          <span
                            className="truncate hover:text-[#3b9cff]"
                            title={file}
                          >
                            {truncateFilePath(file, 30)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {task.fileProgress[file] === 'completed' ? (
                            <CheckCircle className="w-4 h-4 text-green-500 ml-2 flex-shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-500 ml-2 flex-shrink-0" />
                          )}
                          <Button
                            onClick={() => copyFileContent(task.id, file, task.fileContents[file])}
                            className={`ml-2 p-1 hover:bg-[#4c4c4c] rounded transition-colors duration-200 ${
                              copiedFile === `${task.id}-${file}` ? 'bg-[#4c4c4c]' : ''
                            }`}
                          >
                            <Copy className={`w-3 h-3 ${
                              copiedFile === `${task.id}-${file}` ? 'text-[#ffffff]' : 'text-[#3b9cff]'
                            }`} />
                          </Button>
                        </div>
                      </div>
                      {expandedFiles[`${task.id}-${file}`] && (
                        <div className="mt-2 bg-[#2d2d2d] p-2 rounded-md overflow-x-auto">
                          <pre className="text-xs whitespace-pre-wrap">
                            {task.fileContents[file]}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;