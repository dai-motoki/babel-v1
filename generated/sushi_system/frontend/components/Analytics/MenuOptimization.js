import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpDown, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

const MenuOptimization = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // モックデータの生成
    const generateMockData = () => {
      const categories = ['にぎり', '巻物', '刺身', 'サイドメニュー'];
      const items = [
        '鮪', '鮭', '鯛', 'いくら', 'うに', 'えび', 'いか', 'たまご',
        'かっぱ巻き', '鉄火巻き', 'カリフォルニアロール', 'アボカドロール',
        'まぐろ刺身', 'サーモン刺身', 'はまち刺身', '鯛刺身',
        'みそ汁', 'サラダ', 'てんぷら', 'エダマメ'
      ];

      return items.map((item, index) => ({
        id: `item-${index}`,
        name: item,
        category: categories[Math.floor(index / 5)],
        price: Math.floor(Math.random() * 500) + 100,
        popularity: Math.floor(Math.random() * 100),
        profit: Math.floor(Math.random() * 200) + 50,
      }));
    };

    const generateSalesData = () => {
      const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
      return months.map(month => ({
        name: month,
        売上: Math.floor(Math.random() * 1000000) + 500000,
        利益: Math.floor(Math.random() * 500000) + 200000,
      }));
    };

    setMenuItems(generateMockData());
    setSalesData(generateSalesData());
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(menuItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMenuItems(items);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSort = (key) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    const sortedItems = [...menuItems].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[key] - b[key];
      } else {
        return b[key] - a[key];
      }
    });
    setMenuItems(sortedItems);
  };

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-[#4A2311] mb-8 text-center font-yumin">メニュー最適化</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#003366] mb-4 font-yumin">メニュー分析</h2>
          <div className="mb-4">
            <select
              className="w-full p-2 border border-[#003366] rounded-md bg-white text-[#4A2311]"
              onChange={(e) => handleCategoryChange(e.target.value)}
              value={selectedCategory}
            >
              <option value="All">すべてのカテゴリー</option>
              <option value="にぎり">にぎり</option>
              <option value="巻物">巻物</option>
              <option value="刺身">刺身</option>
              <option value="サイドメニュー">サイドメニュー</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#003366] text-white">
                  <th className="p-2 text-left">商品名</th>
                  <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('price')}>
                    価格 <ArrowUpDown size={16} className="inline" />
                  </th>
                  <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('popularity')}>
                    人気度 <ArrowUpDown size={16} className="inline" />
                  </th>
                  <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('profit')}>
                    利益 <ArrowUpDown size={16} className="inline" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-[#F3EAD3]' : 'bg-white'}>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.price}円</td>
                    <td className="p-2">{item.popularity}%</td>
                    <td className="p-2">{item.profit}円</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#003366] mb-4 font-yumin">売上トレンド</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="売上" stroke="#003366" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="利益" stroke="#FF0000" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#003366] mb-4 font-yumin">メニュー順序最適化</h2>
        <p className="text-[#4A2311] mb-4">商品をドラッグ＆ドロップして、メニューの順序を最適化してください。</p>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="menu">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {menuItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-[#F3EAD3] p-4 rounded-md shadow-sm flex justify-between items-center"
                      >
                        <span className="font-medium text-[#4A2311]">{item.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-[#003366]">{item.category}</span>
                          <ChevronUp className="text-[#003366] cursor-pointer" onClick={() => {/* 上に移動 */}} />
                          <ChevronDown className="text-[#003366] cursor-pointer" onClick={() => {/* 下に移動 */}} />
                          <Trash2 className="text-red-500 cursor-pointer" onClick={() => {/* 削除 */}} />
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default MenuOptimization;