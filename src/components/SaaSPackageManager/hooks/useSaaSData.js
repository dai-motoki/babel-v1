
import { useState, useEffect } from 'react';
import fetchThumbnail from '../utils/thumbnailFetcher';

const fetchSaaSItems = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/files/generated-dirs');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('取得したデータ:', data);
    return data.map((dir, index) => ({
      id: index + 1,
      name: dir.name,
      category: 'インフラストラクチャ層', // カテゴリーはデフォルト値を設定
      status: 'アクティブ',
      level: Math.floor(Math.random() * 5) + 1,
      description: `${dir.name}の説明`, // 説明はデフォルト値を設定
      image: `https://picsum.photos/400/300?random=magic${dir.name}`,
      url: dir.path
    }));
  } catch (error) {
    console.error('生成されたディレクトリの取得に失敗しました:', error);
    return []; // エラー時は空の配列を返す
  }
};

const useSaaSData = () => {
  const [saasItems, setSaasItems] = useState([]);

  useEffect(() => {
    const loadSaaSItems = async () => {
      const items = await fetchSaaSItems();
      setSaasItems(items);
    };
    loadSaaSItems();
  }, []);

  useEffect(() => {
    const updateShareArtifactsThumbnail = async () => {
      const thumbnail = await fetchThumbnail('https://www.share-artifacts.com/');
      if (thumbnail) {
        setSaasItems(prevItems => 
          prevItems.map(item => 
            item.id === 1 ? { ...item, image: thumbnail } : item
          )
        );
      }
    };

    updateShareArtifactsThumbnail();
  }, []);

  const addSaaSItem = (newItem) => {
    setSaasItems(prevItems => [
      ...prevItems,
      {
        ...newItem,
        id: prevItems.length + 1,
        image: `https://picsum.photos/400/300?random=${prevItems.length + 1}`,
        status: 'アクティブ',
        level: Math.floor(Math.random() * 5) + 1
      }
    ]);
  };

  return { saasItems, setSaasItems, addSaaSItem };
};

export default useSaaSData;
