
import React, { useState, useEffect } from 'react';

const MockEditor = ({ node, onClose }) => {
  const [position, setPosition] = useState({ x: window.innerWidth * 2/3, y: window.innerHeight / 2 - 250 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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
      <div className="bg-[#1e1e1e] bg-opacity-70 p-4 rounded-lg w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-lg">{node.name}</h2>
          <button onClick={onClose} className="text-white text-sm hover:bg-[#3c3c3c] px-2 py-1 rounded">閉じる</button>
        </div>
        <pre className="flex-grow bg-[#2d2d2d] bg-opacity-30 p-3 rounded text-white text-sm overflow-auto">
          <textarea
            className="w-full h-full bg-transparent resize-none focus:outline-none"
            defaultValue={`// ${node.name} の内容がここに表示されます
// 実際のファイル内容を取得するには、
// バックエンドAPIとの連携が必要です。

// README.md の内容がここに表示されます
// 実際のファイル内容を取得するには、
// バックエンドAPIとの連携が必要です。

// ここにファイルの内容が表示されます。
// 実際のプロジェクトでは、このテキストエリアに
// 選択されたファイルの内容が動的に読み込まれます。

// エディタの機能をさらに拡張する場合は、
// シンタックスハイライトやコード補完などの
// 機能を追加することができます。`}
          />
        </pre>
      </div>
    </div>
  );
};

export default MockEditor;
