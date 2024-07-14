import React, { useState, useEffect } from 'react';
import { FolderOpen, Upload, Download, Check, X, AlertTriangle, Plus, Edit, Trash2, Clock } from 'lucide-react';
import { Calendar as LucideCalendar } from 'lucide-react';

// react-calendarのインポートを削除し、代わりにカスタムカレンダーコンポーネントを使用します

// Google Driveフックの代わりにダミーの関数を使用
const useDummyDrive = () => {
  const uploadFile = async (file, folderId) => {
    // ダミーのアップロード処理
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const downloadFile = async (fileId, fileName) => {
    // ダミーのダウンロード処理
    console.log(`ファイル ${fileName} をダウンロード中...`);
  };

  const listFiles = async () => {
    // ダミーのファイルリスト
    return [
      { id: '1', name: 'ChatGPTを活用したレポート作成', modifiedTime: new Date().toISOString(), dueDate: '2024-07-15', description: 'ChatGPTを使用して、AIの倫理的影響についてのレポートを作成する', status: '未提出' },
      { id: '2', name: 'AIによる画像生成の実践', modifiedTime: new Date().toISOString(), dueDate: '2024-07-20', description: 'Stable DiffusionやMidjourneyを使用して、AIアートを作成し、その過程と結果を分析する', status: '提出済み' },
      { id: '3', name: '機械学習モデルの評価', modifiedTime: new Date().toISOString(), dueDate: '2024-07-25', description: 'Hugging Faceのモデルを使用して、テキスト分類タスクを実行し、その性能を評価する', status: '採点済み' },
    ];
  };

  return { uploadFile, downloadFile, listFiles };
};

// シンプルなカスタムカレンダーコンポーネント
const SimpleCalendar = ({ value, onChange, tileContent }) => {
  const daysInMonth = new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(value.getFullYear(), value.getMonth(), 1).getDay();

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(value.getFullYear(), value.getMonth(), i);
      days.push(
        <div key={i} className="p-2 border text-center relative">
          {i}
          {tileContent({ date, view: 'month' })}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {['日', '月', '火', '水', '木', '金', '土'].map(day => (
        <div key={day} className="p-2 text-center font-bold">{day}</div>
      ))}
      {Array(firstDayOfMonth).fill(null).map((_, index) => (
        <div key={`empty-${index}`} className="p-2 border"></div>
      ))}
      {renderDays()}
    </div>
  );
};

const HomeworkManagement = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHomework, setNewHomework] = useState({ name: '', dueDate: '', description: '' });
  const [calendarDate, setCalendarDate] = useState(new Date());
  const { uploadFile, downloadFile, listFiles } = useDummyDrive();

  useEffect(() => {
    fetchHomeworks();
  }, []);

  const fetchHomeworks = async () => {
    try {
      const files = await listFiles();
      setHomeworks(files);
    } catch (error) {
      console.error('宿題の取得中にエラーが発生しました:', error);
    }
  };

  const handleHomeworkSelect = (homework) => {
    setSelectedHomework(homework);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadStatus('uploading');
    try {
      await uploadFile(file, selectedHomework.id);
      setUploadStatus('success');
      fetchHomeworks();
    } catch (error) {
      console.error('ファイルのアップロード中にエラーが発生しました:', error);
      setUploadStatus('error');
    }
  };

  const handleFileDownload = async () => {
    if (!selectedHomework) return;

    try {
      await downloadFile(selectedHomework.id, selectedHomework.name);
    } catch (error) {
      console.error('ファイルのダウンロード中にエラーが発生しました:', error);
    }
  };

  const handleCreateHomework = () => {
    setIsModalOpen(true);
  };

  const handleSaveHomework = () => {
    const newId = String(homeworks.length + 1);
    const createdHomework = { ...newHomework, id: newId, modifiedTime: new Date().toISOString(), status: '未提出' };
    setHomeworks([...homeworks, createdHomework]);
    setIsModalOpen(false);
    setNewHomework({ name: '', dueDate: '', description: '' });
  };

  const handleDeleteHomework = (id) => {
    setHomeworks(homeworks.filter(homework => homework.id !== id));
    if (selectedHomework && selectedHomework.id === id) {
      setSelectedHomework(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-indigo-900 border-b-2 border-indigo-200 pb-2">
        宿題管理
      </h1>
      
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/3 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-indigo-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-indigo-800">宿題一覧</h2>
              <button
                onClick={handleCreateHomework}
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <ul className="space-y-2">
              {homeworks.map((homework) => (
                <li
                  key={homework.id}
                  className={`cursor-pointer p-2 rounded-md transition-colors duration-200 ${
                    selectedHomework && selectedHomework.id === homework.id
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleHomeworkSelect(homework)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FolderOpen className="mr-2 h-5 w-5 text-indigo-600" />
                      <span>{homework.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-sm mr-2 ${
                        homework.status === '未提出' ? 'text-red-500' :
                        homework.status === '提出済み' ? 'text-yellow-500' :
                        'text-green-500'
                      }`}>
                        {homework.status}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteHomework(homework.id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    <LucideCalendar className="inline-block mr-1 h-4 w-4" />
                    提出期限: {homework.dueDate}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-indigo-100">
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">カレンダー</h2>
            <SimpleCalendar
              value={calendarDate}
              onChange={setCalendarDate}
              tileContent={({ date, view }) => {
                if (view === 'month') {
                  const homeworksForDate = homeworks.filter(
                    (homework) => new Date(homework.dueDate).toDateString() === date.toDateString()
                  );
                  if (homeworksForDate.length > 0) {
                    return (
                      <div className="relative">
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-red-500 rounded-full group">
                          <div className="hidden group-hover:block absolute bottom-full right-0 bg-white border border-gray-200 p-2 rounded shadow-md text-xs whitespace-nowrap">
                            {homeworksForDate.map(hw => hw.name).join(', ')}
                          </div>
                        </div>
                      </div>
                    );
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="w-full md:w-2/3 px-4">
          <div className="bg-white rounded-lg shadow-md p-6 border border-indigo-100">
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">宿題詳細</h2>
            {selectedHomework ? (
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-indigo-700">{selectedHomework.name}</h3>
                  <p className="text-gray-600">最終更新: {new Date(selectedHomework.modifiedTime).toLocaleString()}</p>
                  <p className="text-gray-600 flex items-center mt-2">
                    <LucideCalendar className="mr-2 h-4 w-4" />
                    提出期限: {selectedHomework.dueDate}
                  </p>
                  <p className="text-gray-600 mt-2">{selectedHomework.description}</p>
                </div>

                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={handleFileDownload}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    ダウンロード
                  </button>
                  <label className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 cursor-pointer">
                    <Upload className="mr-2 h-5 w-5" />
                    アップロード
                    <input type="file" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>

                {uploadStatus && (
                  <div className={`mt-4 p-3 rounded-md ${
                    uploadStatus === 'uploading' ? 'bg-yellow-100 text-yellow-800' :
                    uploadStatus === 'success' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {uploadStatus === 'uploading' && (
                      <div className="flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5" />
                        <span>アップロード中...</span>
                      </div>
                    )}
                    {uploadStatus === 'success' && (
                      <div className="flex items-center">
                        <Check className="mr-2 h-5 w-5" />
                        <span>アップロード成功！</span>
                      </div>
                    )}
                    {uploadStatus === 'error' && (
                      <div className="flex items-center">
                        <X className="mr-2 h-5 w-5" />
                        <span>アップロード失敗。再試行してください。</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-8">
                  <h4 className="text-lg font-medium text-indigo-700 mb-2">プレビュー</h4>
                  <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                    {/* ここに実際のプレビューを表示するロジックを追加 */}
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                      プレビューが利用可能な場合、ここに表示されます
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">宿題を選択してください</p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">新しい宿題を作成</h2>
            <input
              type="text"
              placeholder="宿題名"
              className="w-full mb-4 p-2 border rounded"
              value={newHomework.name}
              onChange={(e) => setNewHomework({...newHomework, name: e.target.value})}
            />
            <input
              type="date"
              className="w-full mb-4 p-2 border rounded"
              value={newHomework.dueDate}
              onChange={(e) => setNewHomework({...newHomework, dueDate: e.target.value})}
            />
            <textarea
              placeholder="説明"
              className="w-full mb-4 p-2 border rounded"
              value={newHomework.description}
              onChange={(e) => setNewHomework({...newHomework, description: e.target.value})}
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveHomework}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeworkManagement;