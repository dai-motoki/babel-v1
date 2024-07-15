import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

// APIクライアントの作成
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// レスポンスインターセプター
apiClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    // 認証エラー時の処理
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

// GET リクエスト
export const get = async (url, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};

// POST リクエスト
export const post = async (url, data = {}) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    console.error('POST request failed:', error);
    throw error;
  }
};

// PUT リクエスト
export const put = async (url, data = {}) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};

// DELETE リクエスト
export const del = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};

// SaaS一覧を取得
export const fetchSaaSList = () => get('/saas');

// パッケージ一覧を取得
export const fetchPackageList = () => get('/packages');

// プロジェクト情報を取得
export const fetchProjectInfo = (projectId) => get(`/projects/${projectId}`);

// タスクを作成
export const createTask = (projectId, taskData) => post(`/projects/${projectId}/tasks`, taskData);

// ファイルをアップロード
export const uploadFile = (projectId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return post(`/projects/${projectId}/files`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// チャットメッセージを送信
export const sendChatMessage = (projectId, message) => post(`/projects/${projectId}/chat`, { message });

// ディレクトリ構造を取得
export const fetchDirectoryStructure = async (pathType) => {
  try {
    const response = await fetch(`http://localhost:8000/api/files/directory_structure?path_type=${pathType}`);
    if (!response.ok) {
      throw new Error('ディレクトリ構造の取得に失敗しました');
    }
    return await response.json();
  } catch (error) {
    console.error('ディレクトリ構造の取得中にエラーが発生しました:', error);
    throw error;
  }
};

// ファイルの内容を取得
export const fetchFileContent = async (filePath) => {
  try {
    const response = await fetch(`http://localhost:8000/api/files/content/${encodeURIComponent(filePath)}`, {
      headers: {
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('ファイルの内容を取得できませんでした');
    }

    const data = await response.json();
    console.log(data);
    return data.content;
  } catch (error) {
    console.error('ファイルの内容の取得中にエラーが発生しました:', error);
    throw error;
  }
};

// WebSocketを使用してファイル変更を監視する関数
export const watchFileChanges = (callback) => {
  // WebSocketの接続を確立
  const ws = new WebSocket('ws://localhost:8001/ws');
  
  // メッセージを受信したときの処理
  ws.onmessage = (event) => {
    // 受信したデータをJSONとしてパース
    const data = JSON.parse(event.data);
    // コールバック関数を呼び出し、変更内容を渡す
    callback(data.changes);
  };

  // エラーが発生したときの処理
  ws.onerror = (error) => {
    console.error('WebSocket接続エラー:', error);
  };

  // クリーンアップ関数を返す
  return () => {
    // WebSocket接続を閉じる
    ws.close();
  };
};

export default {
  get,
  post,
  put,
  del,
  fetchSaaSList,
  fetchPackageList,
  fetchProjectInfo,
  createTask,
  uploadFile,
  sendChatMessage,
  fetchDirectoryStructure,
  fetchFileContent,
  watchFileChanges
};