import React, { useState, useEffect } from 'react';
import { Twitter, Instagram, Facebook, Share2, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react';

const SocialMediaIntegration = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // モックデータの読み込み
    const mockPosts = [
      { id: 1, content: '今日の特選ネタ：大トロ！', platforms: ['twitter', 'instagram'], likes: 120, shares: 45 },
      { id: 2, content: '季節の握り盛り合わせ、好評発売中！', platforms: ['facebook', 'instagram'], likes: 89, shares: 23 },
      { id: 3, content: '職人技が光る江戸前寿司、ぜひご賞味ください。', platforms: ['twitter', 'facebook'], likes: 156, shares: 67 },
    ];
    setPosts(mockPosts);
  }, []);

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
    setError('');
  };

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() === '') {
      setError('投稿内容を入力してください。');
      return;
    }
    if (selectedPlatforms.length === 0) {
      setError('少なくとも1つのプラットフォームを選択してください。');
      return;
    }
    const newPostObj = {
      id: posts.length + 1,
      content: newPost,
      platforms: selectedPlatforms,
      likes: 0,
      shares: 0,
    };
    setPosts([newPostObj, ...posts]);
    setNewPost('');
    setSelectedPlatforms([]);
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'twitter': return <Twitter className="w-5 h-5 text-blue-400" />;
      case 'instagram': return <Instagram className="w-5 h-5 text-pink-500" />;
      case 'facebook': return <Facebook className="w-5 h-5 text-blue-600" />;
      default: return null;
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 font-japanese">SNS連携管理</h1>
      
      <form onSubmit={handleSubmit} className="mb-12 bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
        <textarea
          value={newPost}
          onChange={handlePostChange}
          placeholder="新しい投稿を入力してください..."
          className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-32 font-japanese"
        />
        <div className="flex flex-wrap mb-4">
          {['twitter', 'instagram', 'facebook'].map(platform => (
            <button
              key={platform}
              type="button"
              onClick={() => handlePlatformToggle(platform)}
              className={`mr-2 mb-2 px-4 py-2 rounded-full font-semibold text-sm ${
                selectedPlatforms.includes(platform)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              } transition-colors duration-300`}
            >
              {getPlatformIcon(platform)}
              <span className="ml-2">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
            </button>
          ))}
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          投稿する
        </button>
      </form>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
            <p className="text-gray-800 mb-4 font-japanese">{post.content}</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {post.platforms.map(platform => (
                  <span key={platform} className="text-sm text-gray-500">
                    {getPlatformIcon(platform)}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" /> {post.likes}
                </span>
                <span className="flex items-center">
                  <Share2 className="w-4 h-4 mr-1" /> {post.shares}
                </span>
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4 font-japanese">プレビュー</h2>
            <div className="mb-4 p-4 border border-gray-200 rounded-md">
              <p className="font-japanese">{newPost}</p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300"
              >
                閉じる
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
              >
                投稿する
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsPreviewOpen(true)}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center"
      >
        <Eye className="w-6 h-6 mr-2" />
        プレビュー
      </button>
    </div>
  );
};

export default SocialMediaIntegration;