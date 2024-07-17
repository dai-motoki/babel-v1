// TaskManager.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import Button from '../common/Button';

interface Task {
  id: string;
  startTime: Date;
  endTime?: Date;
  relatedFiles: string[];
  name: string;
  status: 'pending' | 'completed';
  fileProgress: { [key: string]: 'pending' | 'completed' };
}

interface TaskManagerProps {
  tasks: Task[];
  onClose: () => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({ tasks, onClose }) => {
  const { t } = useTranslation();

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
            <div className="font-bold mb-2">{t('タスク')} #{task.id}</div>
            <div>{t('開始時間')}: {task.startTime.toLocaleString()}</div>
            <div>{t('終了時間')}: {task.endTime ? task.endTime.toLocaleString() : t('進行中')}</div>
            <div>{t('タスク名')}: {task.name}</div>
            <div>{t('状態')}: {task.status === 'completed' ? t('完了') : t('進行中')}</div>
            <div className="mt-2">
              <div className="font-bold mb-1">{t('関連ファイル')}:</div>
              {task.relatedFiles.map((file) => (
                <div key={file} className="flex justify-between items-center">
                  <span>{file}</span>
                  <span className={task.fileProgress[file] === 'completed' ? 'text-green-500' : 'text-yellow-500'}>
                    {task.fileProgress[file] === 'completed' ? t('完了') : t('進行中')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;