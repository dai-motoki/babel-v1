import React, { useState, useEffect } from 'react';
import { FolderOpen, File, Upload, Download, Trash2, RefreshCw } from 'lucide-react';

// ダミーのGoogle Driveデータ
const dummyFiles = [
  { id: '1', name: '数学の宿題.pdf', mimeType: 'application/pdf' },
  { id: '2', name: '英語の課題', mimeType: 'application/vnd.google-apps.folder' },
  { id: '3', name: '理科レポート.docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
];

const GoogleDriveIntegration = () => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // ダミーのログイン関数
  const login = () => {
    setUser({ name: 'ダミーユーザー' });
  };

  useEffect(() => {
    if (user) {
      // ダミーのファイルリストを設定
      setFiles(dummyFiles);
    }
  }, [user]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    // ダミーのアップロード処理
    setTimeout(() => {
      const newFile = {
        id: String(files.length + 1),
        name: file.name,
        mimeType: file.type,
      };
      setFiles([...files, newFile]);
      setIsUploading(false);
    }, 1000);
  };

  const handleFileDownload = (fileId, fileName) => {
    // ダミーのダウンロード処理
    console.log(`ファイル "${fileName}" をダウンロード中...`);
  };

  const handleFileDelete = (fileId) => {
    // ダミーの削除処理
    setFiles(files.filter(file => file.id !== fileId));
  };

  const refreshFileList = () => {
    // ダミーの更新処理
    setFiles([...dummyFiles]);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-600 text-white p-6">
          <h1 className="text-3xl font-semibold">Google Drive 連携</h1>
        </div>
        <div className="p-6">
          {!user ? (
            <button
              onClick={login}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
            >
              Google Drive にログイン
            </button>
          ) : (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center">
                      <Upload className="mr-2" size={20} />
                      ファイルをアップロード
                    </div>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {isUploading && <p className="text-gray-600">アップロード中...</p>}
                </div>
                <button
                  onClick={refreshFileList}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
                >
                  <RefreshCw className="mr-2" size={20} />
                  更新
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">ファイル一覧</h2>
                <ul className="space-y-2">
                  {files.map((file) => (
                    <li
                      key={file.id}
                      className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm hover:shadow-md transition duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        {file.mimeType.includes('folder') ? (
                          <FolderOpen className="text-yellow-500" size={24} />
                        ) : (
                          <File className="text-blue-500" size={24} />
                        )}
                        <span className="text-gray-800">{file.name}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleFileDownload(file.id, file.name)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Download size={20} />
                        </button>
                        <button
                          onClick={() => handleFileDelete(file.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* 和風モダンな装飾 */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-gradient-to-r from-pink-300 to-indigo-300 opacity-50"></div>
      <div className="fixed top-0 right-0 w-32 h-32">
        <div className="w-full h-full bg-white opacity-25 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default GoogleDriveIntegration;