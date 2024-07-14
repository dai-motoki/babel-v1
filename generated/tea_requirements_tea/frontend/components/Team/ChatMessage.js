import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, Hash, ChevronDown, Search, Settings, Paperclip, Smile, Send, Edit2, Trash2, AtSign, MessageSquare } from 'lucide-react';

const ChatMessage = () => {
  const [channels, setChannels] = useState({
    general: [
      { id: 1, user: 'Alice', content: 'みなさん、おはようございます！今日も頑張りましょう。', time: '09:00 AM', reactions: { '👍': 2, '😊': 1 }, replies: [] },
      { id: 2, user: 'Bob', content: 'おはようございます。今日の会議の時間を確認できますか？', time: '09:05 AM', reactions: { '👀': 1 }, replies: [] },
    ],
    random: [
      { id: 1, user: 'Charlie', content: '昨日見た映画がとても面白かったです！おすすめです。', time: '10:30 AM', reactions: { '🎬': 3, '👏': 2 }, replies: [] },
      { id: 2, user: 'David', content: 'へー、何という映画でしたか？', time: '10:35 AM', reactions: { '🤔': 1 }, replies: [] },
    ],
    project_a: [
      { id: 1, user: 'Eve', content: 'プロジェクトAの進捗報告です。予定通り進んでいます。', time: '11:00 AM', reactions: { '🚀': 4, '👍': 2 }, replies: [] },
      { id: 2, user: 'Frank', content: '素晴らしいですね。何か問題はありませんでしたか？', time: '11:05 AM', reactions: { '🤝': 1 }, replies: [] },
    ],
  });
  
  const [activeChannel, setActiveChannel] = useState('general');
  const [inputMessage, setInputMessage] = useState('');
  const [editingMessage, setEditingMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [threadInputMessage, setThreadInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const emojis = ['👍', '😊', '🎉', '🤔', '❤️', '👏', '🔥', '🚀'];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [channels[activeChannel]]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeChannel, activeThread]);

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        user: 'You',
        content: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: {},
        replies: []
      };
      setChannels(prevChannels => ({
        ...prevChannels,
        [activeChannel]: [...prevChannels[activeChannel], newMessage]
      }));
      setInputMessage('');
      addNotification(`新しいメッセージを ${activeChannel} に送信しました`);
    }
  }, [inputMessage, activeChannel]);

  const handleSendThreadReply = useCallback((e) => {
    e.preventDefault();
    if (threadInputMessage.trim() !== '' && activeThread) {
      const newReply = {
        id: Date.now(),
        user: 'You',
        content: threadInputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChannels(prevChannels => ({
        ...prevChannels,
        [activeChannel]: prevChannels[activeChannel].map(msg =>
          msg.id === activeThread
            ? { ...msg, replies: [...msg.replies, newReply] }
            : msg
        )
      }));
      setThreadInputMessage('');
      addNotification('スレッドに返信しました');
    }
  }, [threadInputMessage, activeThread, activeChannel]);

  const handleEditMessage = useCallback((messageId, newContent) => {
    setChannels(prevChannels => ({
      ...prevChannels,
      [activeChannel]: prevChannels[activeChannel].map(msg =>
        msg.id === messageId ? { ...msg, content: newContent } : msg
      )
    }));
    setEditingMessage(null);
    addNotification('メッセージを編集しました');
  }, [activeChannel]);

  const handleDeleteMessage = useCallback((messageId) => {
    setChannels(prevChannels => ({
      ...prevChannels,
      [activeChannel]: prevChannels[activeChannel].filter(msg => msg.id !== messageId)
    }));
    setActiveThread(null);
    addNotification('メッセージを削除しました');
  }, [activeChannel]);

  const handleReaction = useCallback((messageId, emoji) => {
    setChannels(prevChannels => ({
      ...prevChannels,
      [activeChannel]: prevChannels[activeChannel].map(msg =>
        msg.id === messageId
          ? { ...msg, reactions: { ...msg.reactions, [emoji]: (msg.reactions[emoji] || 0) + 1 } }
          : msg
      )
    }));
  }, [activeChannel]);

  const handleChannelClick = useCallback((channel) => {
    setActiveChannel(channel);
    setActiveThread(null);
    addNotification(`${channel} チャンネルに切り替えました`);
  }, []);

  const handleThreadClick = useCallback((messageId) => {
    setActiveThread(prevThread => prevThread === messageId ? null : messageId);
  }, []);

  const addNotification = useCallback((message) => {
    setNotifications(prev => [...prev, { id: Date.now(), message }]);
    setTimeout(() => setNotifications(prev => prev.slice(1)), 3000);
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (activeThread) {
        handleSendThreadReply(e);
      } else {
        handleSendMessage(e);
      }
    }
  }, [handleSendMessage, handleSendThreadReply, activeThread]);

  const renderMessage = useCallback((message, isReply = false) => (
    <div key={message.id} className={`mb-4 ${isReply ? 'ml-8' : ''}`}>
      <div className="flex items-center mb-1">
        <span className="font-semibold mr-2">{message.user}</span>
        <span className="text-xs text-gray-500">{message.time}</span>
      </div>
      {editingMessage === message.id ? (
        <form onSubmit={(e) => { e.preventDefault(); handleEditMessage(message.id, e.target.editContent.value); }}>
          <input name="editContent" defaultValue={message.content} className="w-full border rounded p-2" />
          <button type="submit" className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">保存</button>
        </form>
      ) : (
        <>
          <p className="text-gray-800">{message.content}</p>
          <div className="flex mt-2">
            {Object.entries(message.reactions || {}).map(([emoji, count]) => (
              <span key={emoji} className="mr-2 bg-gray-100 px-2 py-1 rounded-full text-sm">{emoji} {count}</span>
            ))}
          </div>
          <div className="flex mt-2">
            {!isReply && (
              <button onClick={() => handleThreadClick(message.id)} className="mr-2 text-gray-500 hover:text-blue-500">
                <MessageSquare size={16} />
              </button>
            )}
            <button onClick={() => setEditingMessage(message.id)} className="mr-2 text-gray-500 hover:text-blue-500">
              <Edit2 size={16} />
            </button>
            <button onClick={() => handleDeleteMessage(message.id)} className="mr-2 text-gray-500 hover:text-red-500">
              <Trash2 size={16} />
            </button>
            <button onClick={() => setShowEmojiPicker(message.id)} className="text-gray-500 hover:text-yellow-500">
              <Smile size={16} />
            </button>
          </div>
          {showEmojiPicker === message.id && (
            <div className="mt-2 bg-white border rounded p-2 flex">
              {emojis.map(emoji => (
                <button key={emoji} onClick={() => { handleReaction(message.id, emoji); setShowEmojiPicker(false); }} className="mr-2">
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  ), [editingMessage, showEmojiPicker, handleEditMessage, handleDeleteMessage, handleReaction, handleThreadClick]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* サイドバー */}
      <div className="w-64 bg-indigo-800 text-white p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-6 cursor-pointer hover:bg-indigo-700 p-2 rounded">
          <h1 className="text-xl font-bold">Workspace</h1>
          <ChevronDown size={20} />
        </div>
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2">チャンネル</h2>
          <ul>
            {Object.keys(channels).map(channel => (
              <li key={channel} onClick={() => handleChannelClick(channel)} className={`flex items-center mb-2 cursor-pointer hover:bg-indigo-700 p-2 rounded ${activeChannel === channel ? 'bg-indigo-700' : ''}`}>
                <Hash size={18} className="mr-2" /> {channel}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold mb-2">ダイレクトメッセージ</h2>
          <ul>
            <li className="flex items-center mb-2 cursor-pointer hover:bg-indigo-700 p-2 rounded">
              <MessageCircle size={18} className="mr-2" /> Alice
            </li>
            <li className="flex items-center cursor-pointer hover:bg-indigo-700 p-2 rounded">
              <MessageCircle size={18} className="mr-2" /> Bob
            </li>
          </ul>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ヘッダー */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Hash size={24} className="text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold">{activeChannel}</h2>
          </div>
          <div className="flex items-center">
            <Search className="text-gray-500 mr-4 cursor-pointer hover:text-indigo-600" />
            <Settings className="text-gray-500 cursor-pointer hover:text-indigo-600" />
          </div>
        </header>

        {/* メッセージエリアとメッセージ入力エリアを含むコンテナ */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* メッセージエリア */}
          <div className="flex-1 overflow-y-auto p-4 bg-white">
            {activeThread ? (
              <>
                {renderMessage(channels[activeChannel].find(msg => msg.id === activeThread))}
                <div className="ml-8">
                  <h3 className="text-lg font-semibold mb-2">返信</h3>
                  {channels[activeChannel].find(msg => msg.id === activeThread).replies.map(reply => renderMessage(reply, true))}
                </div>
              </>
            ) : (
              channels[activeChannel].map(message => renderMessage(message))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* メッセージ入力エリア */}
          <form onSubmit={activeThread ? handleSendThreadReply : handleSendMessage} className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder={activeThread ? "スレッドに返信..." : "メッセージを入力..."}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={activeThread ? threadInputMessage : inputMessage}
                onChange={(e) => activeThread ? setThreadInputMessage(e.target.value) : setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                ref={inputRef}
              />
              <button type="button" className="ml-2 text-gray-500 hover:text-indigo-600">
                <Paperclip size={20} />
              </button>
              <button type="button" className="ml-2 text-gray-500 hover:text-indigo-600">
                <AtSign size={20} />
              </button>
              <button type="submit" className="ml-2 bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600">
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 通知 */}
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map(notification => (
          <div key={notification.id} className="bg-indigo-500 text-white px-4 py-2 rounded shadow-lg">
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessage;
