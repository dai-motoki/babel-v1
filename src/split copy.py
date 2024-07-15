# test waaaasaikousaikou
# kdkkkkkkkkkk
# kdkkkkkkkkkk

import os
import subprocess
import datetime

# 現在の日時を取得
current_datetime = datetime.datetime.now().strftime("%Y%m%d%H%M%S")

# ファイル内容を定義
files = {
    "src/components/VersionControl/index.tsx": """
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GitBranch, GitCommit, GitMerge, GitPullRequest, Plus, Search } from 'lucide-react';
import { useVersionControlData } from '../../hooks/useVersionControlData';
import { getDummyData } from '../../constants/dummyData';
import SystemDirectorySelector from './SystemDirectorySelector';
import FileStructure from './FileStructure';
import AIChat from './AIChat';
import GitGraph from './GitGraph';
import CommitList from './CommitList';
import ActionButtons from './ActionButtons';
import { Button, Input } from '../common';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../common/Dialog';

const VersionControl = () => {
  const { t } = useTranslation();
  const { コミット, ブランチ, 選択中のブランチ, set選択中のブランチ } = useVersionControlData();
  const { ダミーディレクトリ構造, ファイル } = useMemo(() => getDummyData(), []);

  const createFileStructureData = useCallback(() => {
    const nodes = [...ダミーディレクトリ構造, ...ファイル];
    const links = [];

    ダミーディレクトリ構造.forEach(dir => {
      dir.children.forEach(childId => {
        links.push({ source: dir.id, target: childId, value: 1 });
      });
    });

    return { nodes, links };
  }, [ダミーディレクトリ構造, ファイル]);

  const ファイル構造データ = useMemo(() => createFileStructureData(), [createFileStructureData]);

  const [選択中ノード, set選択中ノード] = useState(null);
  const [チャット位置, setチャット位置] = useState({ x: 0, y: 0 });
  const [選択されたシステム, set選択されたシステム] = useState('');
  const [directoryOptions, setDirectoryOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateSystemDialogOpen, setIsCreateSystemDialogOpen] = useState(false);
  const [newSystemName, setNewSystemName] = useState('');

  const ノード選択処理 = useCallback((ノード, event) => {
    set選択中ノード(前のノード => 前のノード && 前のノード.id === ノード.id ? null : ノード);
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      setチャット位置({ x: rect.right, y: rect.top });
    }
  }, []);

  const ディレクトリ選択処理 = (選択されたディレクトリ) => {
    console.log('選択されたディレクトリ:', 選択されたディレクトリ);
    set選択されたシステム(選択されたディレクトリ.value);
  };

  useEffect(() => {
    const fetchGeneratedDirs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/generated-dirs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('取得したデータ:', data);
        const options = data.map(dir => ({
          value: dir.name,
          label: dir.name,
          path: dir.path,
          image: `https://picsum.photos/200/300?random=magic${dir.name}`
        }));
        setDirectoryOptions(options);
      } catch (error) {
        console.error('生成されたディレクトリの取得に失敗しました:', error);
      }
    };

    fetchGeneratedDirs();
  }, []);

  const filteredDirectoryOptions = directoryOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateSystem = async () => {
    if (newSystemName.trim() === '') {
      alert(t('システム名を入力してください'));
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/create-system', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newSystemName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('新しいシステムが作成されました:', result);

      setDirectoryOptions(prevOptions => [
        ...prevOptions,
        {
          value: result.name,
          label: result.name,
          path: result.path,
          image: `https://picsum.photos/200/300?random=magic${result.name}`
        }
      ]);

      setNewSystemName('');
      setIsCreateSystemDialogOpen(false);
    } catch (error) {
      console.error('システムの作成に失敗しました:', error);
      alert(t('システムの作成に失敗しました。もう一度お試しください。'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a2a2a] to-[#1e1e1e] text-[#e0e0e0] p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#ffffff] font-sans">{t('システム一覧')}</h2>
        {選択されたシステム && (
          <Button
            onClick={() => set選択されたシステム('')}
            variant="secondary"
            className="px-4 py-2 bg-[#007acc] text-white rounded-lg hover:bg-[#005fa3] transition duration-300"
          >
            {t('ホームに戻る')}
          </Button>
        )}
      </div>
      
      {選択されたシステム ? (
        <>
          <SystemDirectorySelector onSelectDirectory={ディレクトリ選択処理} options={directoryOptions} />
          <div className="relative h-[600px] mb-8">
            <FileStructure 
              ファイル構造データ={ファイル構造データ} 
              onNodeClick={ノード選択処理} 
              選択されたシステム={選択されたシステム}
            />
            {選択中ノード && (
              <AIChat 
                nodes={[選択中ノード]} 
                onClose={() => set選択中ノード(null)}
                position={チャット位置}
              />
            )}
          </div>

          <div className="mb-8">
            <label htmlFor="branch-select" className="block text-lg font-medium text-[#e0e0e0] mb-3 font-sans">
              {t('ブランチ選択')}
            </label>
            <select
              id="branch-select"
              value={選択中のブランチ}
              onChange={(e) => set選択中のブランチ(e.target.value)}
              className="w-full pl-4 pr-10 py-3 text-lg bg-[#3c3c3c] border-2 border-[#007acc] focus:outline-none focus:ring-2 focus:ring-[#007acc] focus:border-[#007acc] rounded-lg font-sans text-[#ffffff] transition duration-300 ease-in-out"
            >
              {ブランチ.map((ブランチ名) => (
                <option key={ブランチ名} value={ブランチ名}>{ブランチ名}</option>
              ))}
            </select>
          </div>

          <GitGraph />

          <CommitList コミット={コミット} />

          <ActionButtons />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-grow mr-4">
              <Input
                type="text"
                placeholder={t('システムを検索...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-lg bg-[#3c3c3c] border-2 border-[#007acc] focus:outline-none focus:ring-2 focus:ring-[#007acc] focus:border-[#007acc] rounded-lg font-sans text-[#ffffff] transition duration-300 ease-in-out"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#007acc]" />
            </div>
            <Dialog open={isCreateSystemDialogOpen} onOpenChange={setIsCreateSystemDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#007acc] to-[#0056b3] text-[#ffffff] rounded-lg hover:from-[#0056b3] hover:to-[#003d82] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#007acc] focus:ring-opacity-50 shadow-lg">
                  <Plus className="mr-2 w-5 h-5" />
                  <span>{t('新規システム作成')}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2a2a2a] text-[#e0e0e0] border-[#007acc]">
                <DialogHeader>
                  <DialogTitle className="text-[#ffffff]">{t('新規システム作成')}</DialogTitle>
                  <DialogDescription className="text-[#b0b0b0]">
                    {t('新しいシステムの名前を入力してください。')}
                  </DialogDescription>
                </DialogHeader>
                <Input
                  type="text"
                  placeholder={t('システム名')}
                  value={newSystemName}
                  onChange={(e) => setNewSystemName(e.target.value)}
                  className="w-full pl-4 pr-4 py-2 text-lg bg-[#3c3c3c] border-2 border-[#007acc] focus:outline-none focus:ring-2 focus:ring-[#007acc] focus:border-[#007acc] rounded-lg font-sans text-[#ffffff] transition duration-300 ease-in-out"
                />
                <DialogFooter>
                  <Button onClick={handleCreateSystem} className="bg-[#007acc] text-[#ffffff] hover:bg-[#005fa3]">
                    {t('作成')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDirectoryOptions.map((システム) => (
              <div 
                key={システム.value} 
                className="bg-gradient-to-r from-[#2d2d2d] to-[#252525] rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 ease-in-out hover:shadow-lg hover:from-[#333333] hover:to-[#2a2a2a]"
                onClick={() => ディレクトリ選択処理(システム)}
              >
                <div className="h-40 overflow-hidden">
                  <img src={システム.image} alt={システム.label} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#ffffff] mb-3">{システム.label}</h3>
                  <p className="text-[#b0b0b0]">{t('パス')}: {システム.path}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(VersionControl);
""",

    "src/components/VersionControl/SystemDirectorySelector.tsx": """
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SystemDirectorySelectorProps {
  onSelectDirectory: (selectedDirectory: { value: string; label: string; path: string }) => void;
  options: Array<{ value: string; label: string; path: string }>;
}

const SystemDirectorySelector: React.FC<SystemDirectorySelectorProps> = ({ onSelectDirectory, options }) => {
  const [selectedDirectory, setSelectedDirectory] = useState("");
  const { t } = useTranslation();

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedDirectory(value);
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      onSelectDirectory(selectedOption);
    }
  };

  return (
    <div className="mb-4">
      <select 
        onChange={handleSelectChange} 
        value={selectedDirectory}
        className="w-full pl-4 pr-10 py-2 text-lg bg-[#3c3c3c] border-2 border-[#007acc] focus:outline-none focus:ring-2 focus:ring-[#007acc] focus:border-[#007acc] rounded-lg font-sans text-[#ffffff] transition duration-300 ease-in-out"
      >
        <option value="">{t('システムディレクトリを選択')}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SystemDirectorySelector;
""",

"src/components/VersionControl/FileStructure.tsx": """
import React from 'react';
import { FileStructure as FileStructureComponent } from './ForceGraphComponents';

const FileStructure = ({ ファイル構造データ, onNodeClick, 選択されたシステム }) => {
  return (
    <FileStructureComponent 
      ファイル構造データ={ファイル構造データ} 
      onNodeClick={onNodeClick} 
      選択されたシステム={選択されたシステム}
    />
  );
};

export default FileStructure;
""",

    "src/components/VersionControl/AIChat.tsx": """
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AIChat = React.memo(({ nodes, onClose, position }) => {
  const { t } = useTranslation();
  const [メッセージ, setメッセージ] = useState('');
  const [チャット履歴, setチャット履歴] = useState([]);
  const [レコメンド, setレコメンド] = useState([
    { id: 1, タイトル: '選択ファイルの解説', 説明: '選択されたファイルの内容を詳しく説明します。' },
    { id: 2, タイトル: 'コード改善提案', 説明: '選択されたファイルのコードに対する改善案を提示します。' },
    { id: 3, タイトル: 'ファイル間の関連性', 説明: '選択されたファイル間の関連性を分析します。' },
  ]);

  const メッセージ送信 = () => {
    if (メッセージ.trim() !== '') {
      setチャット履歴([...チャット履歴, { 送信者: 'ユーザー', 内容: メッセージ }]);
      // AIの応答を生成
      const AI応答 = AI応答生成(メッセージ, nodes);
      setチャット履歴(前の履歴 => [...前の履歴, { 送信者: 'AI', 内容: AI応答 }]);
      setメッセージ('');
    }
  };

  const レコメンド選択 = (id) => {
    const 選択されたレコメンド = レコメンド.find(r => r.id === id);
    if (選択されたレコメンド) {
      const ファイル名リスト = nodes.map(node => node.name).join(', ');
      const ユーザーメッセージ = `${選択されたレコメンド.タイトル}について、${ファイル名リスト}ファイルに関して教えてください。`;
      setチャット履歴([...チャット履歴, { 送信者: 'ユーザー', 内容: ユーザーメッセージ }]);
      // AIの応答を生成
      const AI応答 = AI応答生成(ユーザーメッセージ, nodes);
      setチャット履歴(前の履歴 => [...前の履歴, { 送信者: 'AI', 内容: AI応答 }]);
    }
  };

  // AIの応答を生成する関数
  const AI応答生成 = (ユーザーメッセージ, nodes) => {
    const ファイル名リスト = nodes.map(node => node.name).join(', ');
    const 応答リスト = [
      `${ファイル名リスト}ファイルについて、${ユーザーメッセージ}に関しては次のように考えられます：...`,
      `選択されたファイル（${ファイル名リスト}）の内容を踏まえると、その点については...という方法が効果的です。`,
      `${ファイル名リスト}ファイルの観点から、その課題を解決するには...というアプローチが有効かもしれません。`,
      `選択されたファイル（${ファイル名リスト}）の機能を考慮すると、実装には...というステップを踏むことをお勧めします。`,
      `${ファイル名リスト}ファイルの特性を考えると、その問題に対しては...という観点から考えるのが良いでしょう。`
    ];
    return 応答リスト[Math.floor(Math.random() * 応答リスト.length)];
  };

  return (
    <div className="absolute p-4 bg-gradient-to-br from-[#2a2a2a80] to-[#1e1e1e80] rounded-lg shadow-lg flex flex-col w-80" style={{ top: position.y, left: position.x }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#e0e0e0] font-sans">
          {t('AIチャット')}
        </h3>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-gradient-to-r from-[#007acc] to-[#0056b3] text-[#ffffff] rounded-full hover:from-[#0056b3] hover:to-[#003d82] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#007acc] focus:ring-opacity-50"
        >
          {t('閉じる')}
        </button>
      </div>
      <div className="flex-grow overflow-y-auto mb-4 bg-[#25252580] p-3 rounded-md" style={{maxHeight: '200px'}}>
        {チャット履歴.length === 0 && (
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[#e0e0e0] mb-2">{t('おすすめの操作')}</h4>
            <div className="flex flex-col space-y-2">
              {レコメンド.map((rec) => (
                <button
                  key={rec.id}
                  onClick={() => レコメンド選択(rec.id)}
                  className="p-2 bg-[#3a3a3a80] text-[#e0e0e0] rounded-lg hover:bg-[#4a4a4a80] transition duration-300 text-sm"
                >
                  <span className="font-bold">{rec.タイトル}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {チャット履歴.map((メッセージ, インデックス) => (
          <div key={インデックス} className={`mb-2 ${メッセージ.送信者 === 'ユーザー' ? 'text-right' : 'text-left'}`}>
            <span className="inline-block bg-[#3a3a3a80] text-[#e0e0e0] rounded-lg px-3 py-2 text-sm">
              {メッセージ.内容}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={メッセージ}
          onChange={(e) => setメッセージ(e.target.value)}
          className="flex-grow p-2 bg-[#25252580] text-[#e0e0e0] border border-[#4a4a4a80] rounded-l-md focus:ring-2 focus:ring-[#007acc] transition duration-300 ease-in-out"
          placeholder={t('メッセージを入力...')}
        />
        <button
          onClick={メッセージ送信}
          className="px-4 py-2 bg-gradient-to-r from-[#007acc80] to-[#0056b380] text-[#ffffff] rounded-r-md hover:from-[#0056b3] hover:to-[#003d82] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#007acc] focus:ring-opacity-50"
        >
          {t('送信')}
        </button>
      </div>
    </div>
  );
});

export default AIChat;
""",

    "src/components/VersionControl/GitGraph.tsx": """
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Gitgraph, Orientation } from "@gitgraph/react";
import { withoutAuthor } from '../../utils/gitGraphTemplate';

const GitGraph = React.memo(() => {
  const { t } = useTranslation();

  const initGraph = useCallback((gitgraph) => {
    const main = gitgraph.branch("main");
    main.commit("初期コミット");
    main.commit("別の古いコミット");
    const j1 = main.branch("feature/jira-001");
    j1.commit("UIの実装");
    j1.commit("テストの追加");
    main.merge(j1);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1e1e1e] rounded-lg shadow-lg p-4 mt-8">
      <h3 className="text-xl font-bold mb-4 text-[#e0e0e0] font-sans">{t('Gitコミットグラフ')}</h3>
      <div className="h-[400px] border border-[#4a4a4a] rounded-lg overflow-hidden">
        <Gitgraph
          options={{
            orientation: Orientation.VerticalReverse,
            reverseArrow: true,
            template: withoutAuthor
          }}
        >
          {initGraph}
        </Gitgraph>
      </div>
    </div>
  );
});

export default GitGraph;
""",

    "src/components/VersionControl/CommitList.tsx": """
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GitCommit } from 'lucide-react';

const CommitList = ({ コミット }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-5 text-[#ffffff] font-sans">{t('最近のコミット')}</h3>
      <div className="space-y-4">
        {コミット.map((コミット) => (
          <div key={コミット.id} className="flex items-start p-5 bg-gradient-to-r from-[#2d2d2d] to-[#252525] rounded-lg border-l-4 border-[#007acc] shadow-md transition duration-300 ease-in-out hover:shadow-lg">
            <GitCommit className="text-[#007acc] mr-4 flex-shrink-0 w-6 h-6" />
            <div>
              <p className="font-bold text-lg text-[#ffffff] font-sans mb-1">{コミット.メッセージ}</p>
              <p className="text-sm text-[#b0b0b0] font-sans">
                {t('作成者')} <span className="text-[#007acc]">{コミット.作成者}</span> • {t('日付')} <span className="text-[#007acc]">{コミット.日付}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitList;
""",

    "src/components/VersionControl/ActionButtons.tsx": """
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GitBranch, GitMerge, GitPullRequest } from 'lucide-react';
import { Button } from '../common';

const ActionButtons = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-10 flex justify-between">
      <Button className="flex items-center px-6 py-3 bg-gradient-to-r from-[#007acc] to-[#0056b3] text-[#ffffff] rounded-full hover:from-[#0056b3] hover:to-[#003d82] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#007acc] focus:ring-opacity-50 shadow-lg">
        <GitBranch className="mr-2 w-5 h-5" />
        <span className="text-lg font-medium">{t('新規ブランチ')}</span>
      </Button>
      <Button className="flex items-center px-6 py-3 bg-gradient-to-r from-[#388e3c] to-[#2e7d32] text-[#ffffff] rounded-full hover:from-[#2e7d32] hover:to-[#1b5e20] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#388e3c] focus:ring-opacity-50 shadow-lg">
        <GitMerge className="mr-2 w-5 h-5" />
        <span className="text-lg font-medium">{t('マージ')}</span>
      </Button>
      <Button className="flex items-center px-6 py-3 bg-gradient-to-r from-[#0288d1] to-[#01579b] text-[#ffffff] rounded-full hover:from-[#01579b] hover:to-[#01426a] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0288d1] focus:ring-opacity-50 shadow-lg">
        <GitPullRequest className="mr-2 w-5 h-5" />
        <span className="text-lg font-medium">{t('プルリクエスト')}</span>
      </Button>
    </div>
  );
};

export default ActionButtons;
""",

"src/components/common/Button.tsx": """
import React from 'react';

const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
""",

    "src/components/common/Input.tsx": """
import React from 'react';

const Input = ({ className, ...props }) => (
  <input
    className={`px-3 py-2 border border-gray-300 rounded ${className}`}
    {...props}
  />
);

export default Input;
""",

    "src/components/common/Dialog/index.tsx": """
import React from 'react';

const Dialog = ({ children, open, onOpenChange }) => (
  open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {children}
        <button onClick={() => onOpenChange(false)}>Close</button>
      </div>
    </div>
  ) : null
);

export default Dialog;
""",

    "src/components/common/Dialog/DialogTrigger.tsx": """
import React from 'react';

const DialogTrigger = ({ children, asChild }) => {
  return asChild ? children : <button>{children}</button>;
};

export default DialogTrigger;
""",

    "src/components/common/Dialog/DialogContent.tsx": """
import React from 'react';

const DialogContent = ({ children, className }) => (
  <div className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

export default DialogContent;
""",

    "src/components/common/Dialog/DialogHeader.tsx": """
import React from 'react';

const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;

export default DialogHeader;
""",

    "src/components/common/Dialog/DialogTitle.tsx": """
import React from 'react';

const DialogTitle = ({ children }) => <h2 className="text-xl font-bold">{children}</h2>;

export default DialogTitle;
""",

    "src/components/common/Dialog/DialogDescription.tsx": """
import React from 'react';

const DialogDescription = ({ children }) => <p className="text-gray-600">{children}</p>;

export default DialogDescription;
""",

    "src/components/common/Dialog/DialogFooter.tsx": """
import React from 'react';

const DialogFooter = ({ children }) => <div className="mt-4 flex justify-end">{children}</div>;

export default DialogFooter;
""",

    "src/hooks/useVersionControlData.ts": """
import { useState } from 'react';

export const useVersionControlData = () => {
  const [コミット] = useState([
    { id: 1, メッセージ: '初期コミット', 作成者: 'Alice', 日付: '2023-07-01' },
    { id: 2, メッセージ: 'ログイン機能の追加', 作成者: 'Bob', 日付: '2023-07-02' },
    { id: 3, メッセージ: 'バグ修正', 作成者: 'Charlie', 日付: '2023-07-03' },
  ]);

  const [ブランチ] = useState(['main', 'develop', 'feature/login']);

  const [選択中のブランチ, set選択中のブランチ] = useState('main');

  return { コミット, ブランチ, 選択中のブランチ, set選択中のブランチ };
};
""",

    "src/utils/gitGraphTemplate.ts": """
import { TemplateName } from '@gitgraph/react';

export const withoutAuthor = {
  [TemplateName.Metro]: {
    commit: {
      message: {
        displayAuthor: false,
        displayHash: false,
      },
    },
  },
};
""",

    "src/constants/dummyData.ts": """
export const getDummyData = () => {
  const ダミーディレクトリ構造 = [
    { id: 'root', name: 'プロジェクトルート', children: ['src', 'public', 'tests'] },
    { id: 'src', name: 'src', children: ['components', 'utils', 'styles'] },
    { id: 'components', name: 'components', children: ['Header', 'Footer', 'MainContent'] },
    { id: 'utils', name: 'utils', children: ['helpers', 'api'] },
    { id: 'styles', name: 'styles', children: ['global', 'components'] },
    { id: 'public', name: 'public', children: ['images', 'fonts'] },
    { id: 'tests', name: 'tests', children: ['unit', 'integration'] },
  ];

  const ファイル = [
    { id: 'Header', name: 'Header.tsx' },
    { id: 'Footer', name: 'Footer.tsx' },
    { id: 'MainContent', name: 'MainContent.tsx' },
    { id: 'helpers', name: 'helpers.ts' },
    { id: 'api', name: 'api.ts' },
    { id: 'global', name: 'global.css' },
    { id: 'components', name: 'components.css' },
  ];

  return { ダミーディレクトリ構造, ファイル };
};
"""
}

# ファイル分割関数
def split_files(files):
    for file_path, content in files.items():
        dir_path = os.path.dirname(file_path)
        if not os.path.exists(dir_path):
            os.makedirs(dir_path)
        
        if os.path.exists(file_path):
            print(f"警告: {file_path} は既に存在します。")
            user_input = input("上書きしますか？ (yes/no): ").lower()
            if user_input != 'yes':
                print(f"{file_path} をスキップします。")
                continue

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"{file_path} を作成しました。")

# メイン処理
if __name__ == "__main__":
    script_name = f"{current_datetime}_file-splitting-script.py"
    
    # スクリプト自体を保存
    with open(script_name, 'w', encoding='utf-8') as f:
        f.write(f'''
import os
import subprocess
import datetime

current_datetime = "{current_datetime}"

files = {files}

def split_files(files):
    for file_path, content in files.items():
        dir_path = os.path.dirname(file_path)
        if not os.path.exists(dir_path):
            os.makedirs(dir_path)
        
        if os.path.exists(file_path):
            print(f"警告: {{file_path}} は既に存在します。")
            user_input = input("上書きしますか？ (yes/no): ").lower()
            if user_input != 'yes':
                print(f"{{file_path}} をスキップします。")
                continue

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"{{file_path}} を作成しました。")

if __name__ == "__main__":
    split_files(files)
''')

    print(f"{script_name} を作成しました。")
    print("ファイル分割を開始します...")
    
    # サブプロセスでスクリプトを実行
    subprocess.run(["python", script_name])