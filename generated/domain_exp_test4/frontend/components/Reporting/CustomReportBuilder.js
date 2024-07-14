import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { X, Plus, Move, FileText } from 'react-feather';

const availableWidgets = [
  { id: 'widget1', title: 'デバイス概要', type: 'chart' },
  { id: 'widget2', title: 'SaaS使用状況', type: 'table' },
  { id: 'widget3', title: 'コスト分析', type: 'chart' },
  { id: 'widget4', title: 'セキュリティアラート', type: 'list' },
];

const CustomReportBuilder = () => {
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [reportTitle, setReportTitle] = useState('新規レポート');

  const onDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const items = Array.from(selectedWidgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedWidgets(items);
  }, [selectedWidgets]);

  const addWidget = (widget) => {
    setSelectedWidgets([...selectedWidgets, { ...widget, key: Date.now() }]);
  };

  const removeWidget = (index) => {
    const newWidgets = [...selectedWidgets];
    newWidgets.splice(index, 1);
    setSelectedWidgets(newWidgets);
  };

  const renderWidgetPreview = (widget) => {
    switch (widget.type) {
      case 'chart':
        return (
          <div className="bg-indigo-100 h-32 flex items-center justify-center rounded-md">
            <span className="text-indigo-600">チャートプレビュー</span>
          </div>
        );
      case 'table':
        return (
          <div className="bg-green-100 h-32 flex items-center justify-center rounded-md">
            <span className="text-green-600">テーブルプレビュー</span>
          </div>
        );
      case 'list':
        return (
          <div className="bg-yellow-100 h-32 flex items-center justify-center rounded-md">
            <span className="text-yellow-600">リストプレビュー</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">カスタムレポートビルダー</h2>
      <div className="flex mb-6">
        <input
          type="text"
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="レポートタイトル"
        />
      </div>
      <div className="flex space-x-4">
        <div className="w-1/3 bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-4 text-gray-700">利用可能なウィジェット</h3>
          <div className="space-y-2">
            {availableWidgets.map((widget) => (
              <div
                key={widget.id}
                className="bg-white p-3 rounded-md shadow-sm cursor-pointer hover:bg-indigo-50 transition duration-150 ease-in-out"
                onClick={() => addWidget(widget)}
              >
                <div className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-indigo-500" />
                  <span>{widget.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="report">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-2/3 bg-gray-100 p-4 rounded-md"
              >
                <h3 className="text-lg font-medium mb-4 text-gray-700">レポートレイアウト</h3>
                {selectedWidgets.length === 0 && (
                  <div className="bg-white p-8 rounded-md text-center text-gray-500">
                    ウィジェットをドラッグ＆ドロップしてレポートを作成
                  </div>
                )}
                {selectedWidgets.map((widget, index) => (
                  <Draggable key={widget.key} draggableId={widget.key.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="bg-white p-4 rounded-md shadow-sm mb-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-700">{widget.title}</h4>
                          <div className="flex space-x-2">
                            <button
                              {...provided.dragHandleProps}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Move className="w-5 h-5 text-gray-500" />
                            </button>
                            <button
                              onClick={() => removeWidget(index)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <X className="w-5 h-5 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        {renderWidgetPreview(widget)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="mt-6 flex justify-end">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          レポート生成
        </button>
      </div>
    </div>
  );
};

export default CustomReportBuilder;