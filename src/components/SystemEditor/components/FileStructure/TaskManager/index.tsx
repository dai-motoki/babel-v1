
import React, { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';
import Button from '@/components/common/Button';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskManagerProps {
  onClose: () => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({ onClose }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTaskTitle, completed: false }]);
      setNewTaskTitle('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="fixed top-20 right-4 w-80 h-96 bg-[#2a2a2a] rounded-lg shadow-lg flex flex-col">
      <div className="flex justify-between items-center p-2 border-b border-gray-600">
        <h3 className="text-[#d4d4d4] font-semibold">タスクマネージャー</h3>
        <Button onClick={onClose} className="text-[#d4d4d4] hover:text-white">
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto p-2">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mr-2"
            />
            <span className={`flex-grow text-[#d4d4d4] ${task.completed ? 'line-through' : ''}`}>
              {task.title}
            </span>
            <Button onClick={() => removeTask(task.id)} className="text-red-500 hover:text-red-700">
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-gray-600 flex">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-grow bg-[#3c3c3c] text-[#d4d4d4] rounded-l px-2 py-1 focus:outline-none"
          placeholder="新しいタスクを入力..."
        />
        <Button
          onClick={addTask}
          className="bg-green-500 text-white rounded-r px-3 py-1"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TaskManager;
