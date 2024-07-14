import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Share2, ArrowRight, Check, X } from 'lucide-react';

const SocialMediaIntegration = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [schedule, setSchedule] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    // モックデータを使用してSNSの投稿を取得
    const mockPosts = [
      { id: 1, platform: 'twitter', content: '新作の抹茶わらび餅が登場しました！', likes: 42, shares: 12 },
      { id: 2, platform: 'instagram', content: '季節の和菓子「桜もち」の作り方動画', likes: 156, shares: 23 },
      { id: 3, platform: 'facebook', content: '今月のおすすめ：柚子香る冬の和菓子セット', likes: 89, shares: 7 },
    ];
    setPosts(mockPosts);
  }, []);

  const handlePlatformSelect = (platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent && selectedPlatforms.length > 0) {
      setIsPosting(true);
      // 投稿処理をシミュレート
      setTimeout(() => {
        setIsPosting(false);
        setNotificationMessage('投稿が完了しました');
        setShowNotification(true);
        setPostContent('');
        setSchedule('');
        setSelectedPlatforms([]);
      }, 2000);
    } else {
      setNotificationMessage('投稿内容とプラットフォームを選択してください');
      setShowNotification(true);
    }
  };

  const platformIcons = {
    facebook: <Facebook className="w-6 h-6" />,
    twitter: <Twitter className="w-6 h-6" />,
    instagram: <Instagram className="w-6 h-6" />,
    youtube: <Youtube className="w-6 h-6" />,
  };

  return (
    <div className="bg-[#F3EAD3] min-h-screen p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-[#4A2311]">SNS連携管理</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#006400]">新規投稿</h2>
        <form onSubmit={handlePostSubmit}>
          <div className="mb-4">
            <label htmlFor="post-content" className="block text-[#4A2311] mb-2">投稿内容</label>
            <textarea
              id="post-content"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full p-2 border border-[#006400] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006400]"
              rows="4"
              placeholder="和菓子の魅力を伝える投稿を書いてください"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-[#4A2311] mb-2">投稿先プラットフォーム</label>
            <div className="flex space-x-4">
              {Object.entries(platformIcons).map(([platform, icon]) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => handlePlatformSelect(platform)}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    selectedPlatforms.includes(platform)
                      ? 'bg-[#006400] text-white'
                      : 'bg-gray-200 text-[#4A2311] hover:bg-gray-300'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="schedule" className="block text-[#4A2311] mb-2">投稿スケジュール（オプション）</label>
            <input
              type="datetime-local"
              id="schedule"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full p-2 border border-[#006400] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006400]"
            />
          </div>

          <button
            type="submit"
            disabled={isPosting}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-200 ${
              isPosting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#006400] hover:bg-[#007500]'
            }`}
          >
            {isPosting ? '投稿中...' : '投稿する'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#006400]">最近の投稿</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-2">
                {platformIcons[post.platform]}
                <span className="ml-2 text-[#4A2311] font-medium">{post.platform}</span>
              </div>
              <p className="text-[#4A2311] mb-2">{post.content}</p>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-4">いいね: {post.likes}</span>
                <span>シェア: {post.shares}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-white border border-[#006400] rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-center">
            {notificationMessage.includes('完了') ? (
              <Check className="w-6 h-6 text-green-500 mr-2" />
            ) : (
              <X className="w-6 h-6 text-red-500 mr-2" />
            )}
            <p className="text-[#4A2311]">{notificationMessage}</p>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialMediaIntegration;