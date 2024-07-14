import React, { useState, useEffect } from 'react';
import { Twitter, Facebook, Instagram, Youtube, Linkedin, Share2 } from 'lucide-react';

const SocialMediaIntegration = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // 実際のAPIコールの代わりにモックデータを使用
    const mockPosts = [
      { id: 1, platform: 'twitter', content: '新作の季節の和菓子が出来上がりました！#和菓子 #季節の味', likes: 120, shares: 45 },
      { id: 2, platform: 'facebook', content: '伝統の技と新しい味の融合。ぜひ店頭でお試しください。', likes: 89, shares: 23 },
      { id: 3, platform: 'instagram', content: '四季を感じる和菓子の世界へようこそ。', likes: 256, shares: 78 },
      { id: 4, platform: 'youtube', content: '和菓子作りの裏側、職人の技をご覧ください。', views: 1500, likes: 200 },
      { id: 5, platform: 'linkedin', content: '老舗和菓子店が挑む、伝統と革新の融合。', connections: 150, engagements: 67 },
    ];
    setPosts(mockPosts);
  }, []);

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };

  const filteredPosts = selectedPlatform === 'all'
    ? posts
    : posts.filter(post => post.platform === selectedPlatform);

  const handleShare = (url) => {
    setShareUrl(url);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const PlatformIcon = ({ platform }) => {
    switch (platform) {
      case 'twitter': return <Twitter className="w-6 h-6 text-blue-400" />;
      case 'facebook': return <Facebook className="w-6 h-6 text-blue-600" />;
      case 'instagram': return <Instagram className="w-6 h-6 text-pink-500" />;
      case 'youtube': return <Youtube className="w-6 h-6 text-red-600" />;
      case 'linkedin': return <Linkedin className="w-6 h-6 text-blue-700" />;
      default: return null;
    }
  };

  return (
    <div className="bg-cream-100 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-green-800 mb-6">SNS連携</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-green-700 mb-3">プラットフォーム選択</h3>
        <div className="flex space-x-4">
          {['all', 'twitter', 'facebook', 'instagram', 'youtube', 'linkedin'].map((platform) => (
            <button
              key={platform}
              onClick={() => handlePlatformChange(platform)}
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                selectedPlatform === platform
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-green-600 hover:bg-green-100'
              }`}
            >
              {platform === 'all' ? '全て' : <PlatformIcon platform={platform} />}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm border border-green-200">
            <div className="flex items-center mb-3">
              <PlatformIcon platform={post.platform} />
              <span className="ml-2 text-green-700 font-medium capitalize">{post.platform}</span>
            </div>
            <p className="text-gray-800 mb-3">{post.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex space-x-4">
                {post.likes && <span>いいね: {post.likes}</span>}
                {post.shares && <span>シェア: {post.shares}</span>}
                {post.views && <span>視聴回数: {post.views}</span>}
                {post.connections && <span>コネクション: {post.connections}</span>}
                {post.engagements && <span>エンゲージメント: {post.engagements}</span>}
              </div>
              <button
                onClick={() => handleShare(`https://example.com/share/${post.id}`)}
                className="flex items-center text-green-600 hover:text-green-700 transition-colors duration-200"
              >
                <Share2 className="w-4 h-4 mr-1" />
                シェア
              </button>
            </div>
          </div>
        ))}
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-xl font-semibold text-green-800 mb-4">投稿をシェア</h3>
            <p className="text-gray-700 mb-4">以下のURLをコピーしてシェアしてください：</p>
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="w-full p-2 border border-green-300 rounded mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={closeShareModal}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaIntegration;