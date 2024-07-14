import React, { useState, useEffect } from 'react';
import { Mail, Send, Inbox, Trash2, Star, AlertCircle, Search, Plus, X } from 'lucide-react';

const EmailSystem = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composing, setComposing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFolder, setCurrentFolder] = useState('inbox');

  useEffect(() => {
    // メールデータをフェッチする模擬的な関数
    const fetchEmails = async () => {
      const mockEmails = [
        { id: 1, from: 'sender1@example.com', subject: '新しい授業について', body: '来週から新しい授業が始まります。', folder: 'inbox', starred: false },
        { id: 2, from: 'sender2@example.com', subject: '宿題の提出期限', body: '宿題の提出期限は今週金曜日です。', folder: 'inbox', starred: true },
        { id: 3, from: 'sender3@example.com', subject: 'イベントのお知らせ', body: '来月、AIに関する特別講座を開催します。', folder: 'inbox', starred: false },
      ];
      setEmails(mockEmails);
    };
    fetchEmails();
  }, []);

  const filteredEmails = emails.filter(email => 
    email.folder === currentFolder &&
    (email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
     email.from.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const Sidebar2 = () => (
    <div className="w-64 bg-gray-100 p-4 border-r border-gray-200">
      <button
        onClick={() => setComposing(true)}
        className="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 mb-4 flex items-center justify-center"
      >
        <Plus size={20} className="mr-2" />
        新規作成
      </button>
      <nav>
        <ul>
          <li>
            <button
              onClick={() => setCurrentFolder('inbox')}
              className={`flex items-center w-full p-2 rounded-lg ${currentFolder === 'inbox' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-200'}`}
            >
              <Inbox size={20} className="mr-2" />
              受信トレイ
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentFolder('sent')}
              className={`flex items-center w-full p-2 rounded-lg ${currentFolder === 'sent' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-200'}`}
            >
              <Send size={20} className="mr-2" />
              送信済み
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentFolder('starred')}
              className={`flex items-center w-full p-2 rounded-lg ${currentFolder === 'starred' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-200'}`}
            >
              <Star size={20} className="mr-2" />
              スター付き
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentFolder('trash')}
              className={`flex items-center w-full p-2 rounded-lg ${currentFolder === 'trash' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-200'}`}
            >
              <Trash2 size={20} className="mr-2" />
              ゴミ箱
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );

  const EmailList = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="メールを検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            onClick={() => setSelectedEmail(email)}
            className="cursor-pointer p-3 border-b border-gray-200 hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{email.from}</span>
              {email.starred && <Star size={16} className="text-yellow-400" />}
            </div>
            <div className="text-sm text-gray-600">{email.subject}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const EmailDetail = ({ email }) => (
    <div className="flex-1 p-6 bg-white overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">{email.subject}</h2>
      <div className="mb-4">
        <span className="font-semibold">From:</span> {email.from}
      </div>
      <div className="border-t border-gray-200 pt-4">
        <p>{email.body}</p>
      </div>
    </div>
  );

  const ComposeEmail = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">新規メール作成</h2>
          <button onClick={() => setComposing(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">宛先:</label>
            <input type="email" id="to" name="to" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">件名:</label>
            <input type="text" id="subject" name="subject" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">本文:</label>
            <textarea id="body" name="body" rows="6" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-indigo-600 text-white rounded-lg py-2 px-4 hover:bg-indigo-700">
              送信
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar2 />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-2xl font-semibold text-gray-800">メールシステム</h1>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <EmailList />
          {selectedEmail && <EmailDetail email={selectedEmail} />}
        </div>
      </div>
      {composing && <ComposeEmail />}
    </div>
  );
};

export default EmailSystem;