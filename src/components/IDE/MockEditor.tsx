import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchFileContent, saveFileContent } from '@/utils/api';
import * as monaco from 'monaco-editor';
import { initVimMode } from 'monaco-vim';

// Monacoエディタのオプション
const editorOptions = {
  theme: 'vs-dark', // ダークテーマを使用
  fontSize: 12, // フォントサイズを12pxに設定
  minimap: { enabled: true }, // ミニマップを有効化
  scrollBeyondLastLine: true, // 最後の行を超えてスクロール可能
  automaticLayout: true, // エディタのサイズ変更時に自動的にレイアウトを調整
  lineNumbers: true, // 行番号を表示
  folding: true, // コードの折りたたみ機能を有効化
  renderIndentGuides: true, // インデントガイドを表示
  renderLineHighlight: 'all', // 現在の行をハイライト表示
  selectOnLineNumbers: true, // 行番号クリックで行全体を選択
  wordWrap: 'on', // 長い行を折り返し表示
  contextmenu: true, // コンテキストメニューを有効化
  mouseWheelZoom: true, // マウスホイールでのズームを有効化
  cursorBlinking: 'blink', // カーソルの点滅を有効化
  cursorSmoothCaretAnimation: true, // カーソル移動時のスムーズなアニメーションを有効化
  smoothScrolling: true, // スムーズスクロールを有効化
  dragAndDrop: true, // ドラッグ＆ドロップ機能を有効化
  formatOnPaste: true, // ペースト時に自動フォーマットを適用
  formatOnType: true, // 入力時に自動フォーマットを適用
  suggestOnTriggerCharacters: true, // トリガー文字入力時に候補を表示
  quickSuggestions: true, // クイックサジェスト機能を有効化
  acceptSuggestionOnEnter: 'on', // Enterキーで候補を受け入れる
  tabCompletion: 'on', // タブ補完を有効化
  snippetSuggestions: 'inline', // スニペット候補をインラインで表示
  codeLens: true, // コードレンズ機能を有効化
  lightbulb: { enabled: true }, // 電球アイコンによるクイックフィックスを有効化
  parameterHints: { enabled: true }, // パラメータヒントを有効化
  links: true, // リンクの検出と表示を有効化
  colorDecorators: true, // カラーデコレータを有効化
  bracketPairColorization: { enabled: true }, // 括弧のペアをカラー表示
  autoClosingBrackets: 'always', // 括弧の自動閉じを常に有効化
  autoClosingQuotes: 'always', // クォートの自動閉じを常に有効化
  autoSurround: 'languageDefined', // 言語定義に基づく自動サラウンドを有効化
  find: { addExtraSpaceOnTop: true }, // 検索ウィジェットの上に余白を追加
  hover: { enabled: true }, // ホバー情報の表示を有効化
  inlayHints: { enabled: true }, // インラインヒントを有効化
  occurrencesHighlight: true, // 同じシンボルの出現箇所をハイライト
  overviewRulerLanes: 3, // オーバービュールーラーのレーン数を3に設定
  renderWhitespace: 'all', // すべての空白文字を表示
  rulers: [80, 120], // 80文字と120文字の位置にルーラーを表示
  showFoldingControls: 'always', // 折りたたみコントロールを常に表示
  suggest: { showWords: true }, // 単語の候補表示を有効化
};

// カスタムテーマの定義
monaco.editor.defineTheme('chic-blue', {
  base: 'vs-dark',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#00204010', // より透明な濃紺色 (アルファ値を10%に変更)
    'editor.foreground': '#E0E0E060', // テキストの色をさらに透明に
    'editor.lineHighlightBackground': '#ffffff03', // 行ハイライトの透明度をさらに上げる
    'editorCursor.foreground': '#A0A0A030', // カーソルの色をさらに透明に
    'editorLineNumber.foreground': '#60606030', // 行番号の色をさらに透明に
    'editorIndentGuide.background': '#ffffff08', // インデントガイドをさらに透明に
    'editor.selectionBackground': '#4A4A7F15', // 選択範囲の背景をさらに透明に
    'editor.selectionHighlightBackground': '#4A4A7F08', // 選択範囲のハイライトをさらに透明に
    'editorWidget.background': '#00204008', // ウィジェットの背景をさらに透明に
    'editorHoverWidget.background': '#00204008', // ホバーウィジェットの背景をさらに透明に
  }
});
const MockEditor = ({ node, onClose, onFileChange, projectId }) => {
  const [position, setPosition] = useState({ x: window.innerWidth * 2/3, y: window.innerHeight / 2 - 250 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [fileContent, setFileContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVimMode, setIsVimMode] = useState(true);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const vimModeRef = useRef(null);
  const statusBarRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: Math.max(0, Math.min(e.clientX - dragStart.x, window.innerWidth - 600)),
        y: Math.max(0, Math.min(e.clientY - dragStart.y, window.innerHeight - 500))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const loadFileContent = async () => {
      console.log('ファイル内容の読み込みを開始します');
      try {
        setIsLoading(true);
        console.log(`ファイルパス: ${node.id}, プロジェクトID: ${projectId}`);
        const content = await fetchFileContent(projectId, node.id);
        console.log('ファイル内容を取得しました');
        setFileContent(content);
        if (editorRef.current) {
          editorRef.current.setValue(content);
        }
      } catch (err) {
        console.error('ファイル内容の読み込み中にエラーが発生しました:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
        console.log('ファイル内容の読み込みが完了しました');
      }
    };

    loadFileContent();
  }, [node.id, projectId]);

  useEffect(() => {
    if (!isLoading && !error && containerRef.current) {
      if (!editorRef.current) {
        // Monacoエディタの初期化
        editorRef.current = monaco.editor.create(containerRef.current, {
          ...editorOptions,
          value: fileContent,
          language: getLanguageFromFileName(node.name),
          theme: 'chic-blue', // カスタムテーマを適用
        });

        // シンタックスハイライトを適用
        monaco.editor.setTheme('chic-blue');

        // Vimモードの初期化
        if (isVimMode) {
          vimModeRef.current = initVimMode(editorRef.current, statusBarRef.current);
        }

        // Control + [ でノーマルモードに入る
        editorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.BracketLeft, () => {
          if (isVimMode && vimModeRef.current) {
            vimModeRef.current.dispose();
            vimModeRef.current = initVimMode(editorRef.current, statusBarRef.current);
          }
        });

        editorRef.current.onDidChangeModelContent(() => {
          handleEditorChange(editorRef.current.getValue());
        });
      } else {
        // エディタが既に存在する場合、ファイルの内容と言語を更新
        editorRef.current.setValue(fileContent);
        const model = editorRef.current.getModel();
        if (model) {
          monaco.editor.setModelLanguage(model, getLanguageFromFileName(node.name));
        }
      }
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
      if (vimModeRef.current) {
        vimModeRef.current.dispose();
      }
    };
  }, [isLoading, error, fileContent, node.name, isVimMode]);

  const handleEditorChange = useCallback((value) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      setIsSaving(true);
      try {
        await saveFileContent(projectId, node.id, value);
        onFileChange({ changes: [{ type: 'modified', path: node.id }] });
      } catch (error) {
        console.error('ファイルの保存中にエラーが発生しました:', error);
      } finally {
        setIsSaving(false);
      }
    }, 1000); // 1秒後に保存
  }, [node.id, projectId, onFileChange]);

  // ファイル名から言語を推測する関数
  const getLanguageFromFileName = (fileName: string): string => {
    // ファイル名から拡張子を取得し、小文字に変換
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    
    // 拡張子と言語のマッピング
    const languageMap: { [key: string]: string } = {
      'js': 'javascript',
      'ts': 'typescript',
      'py': 'python',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'jsx': 'javascript',
      'tsx': 'typescript',
      'md': 'markdown',
      'yml': 'yaml',
      'yaml': 'yaml',
      'sh': 'shell',
      'bash': 'shell',
      'sql': 'sql',
      'php': 'php',
      'java': 'java',
      'c': 'c',
      'cpp': 'cpp',
      'cs': 'csharp',
      'go': 'go',
      'rb': 'ruby',
      'rs': 'rust',
      'swift': 'swift',
      'kt': 'kotlin',
      'scala': 'scala',
      'dart': 'dart',
    };
    
    // マッピングに存在する場合はその言語を返し、存在しない場合は'plaintext'を返す
    return languageMap[extension] || 'plaintext';
  };

  const toggleVimMode = () => {
    setIsVimMode((prevMode) => {
      if (prevMode) {
        if (vimModeRef.current) {
          vimModeRef.current.dispose();
          vimModeRef.current = null;
        }
      } else {
        if (editorRef.current) {
          vimModeRef.current = initVimMode(editorRef.current, statusBarRef.current);
        }
      }
      return !prevMode;
    });
  };

  return (
    <div 
      className="fixed bg-black bg-opacity-30 flex items-center justify-center z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: '600px',
        height: '500px',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="bg-[#00204080] bg-opacity-70 p-4 rounded-lg w-full h-full flex flex-col backdrop-blur-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-lg">{node.name}</h2>
          <div className="flex items-center">
            <button 
              onClick={toggleVimMode} 
              className={`text-white text-xs mr-2 px-1.5 py-0.5 rounded-sm border border-blue-400 transition-colors duration-200 ${isVimMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-800 hover:bg-blue-700'}`}
            >
              {isVimMode ? 'Vim: ON' : 'Vim: OFF'}
            </button>
            <button onClick={onClose} className="text-white text-sm hover:bg-[#3c3c3c] px-2 py-1 rounded">
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">閉じる</span>
            </button>
            {isSaving && <span className="text-white text-xs mr-2">保存中...</span>}
          </div>
        </div>
        {isLoading ? (
          <p className="text-white">ファイル内容を読み込み中...</p>
        ) : error ? (
          <p className="text-red-500">エラー: {error}</p>
        ) : (
          <>
            <div ref={containerRef} className="flex-grow" />
            <div ref={statusBarRef} className="text-white text-sm mt-2" />
          </>
        )}
      </div>
    </div>
  );
};

export default MockEditor;