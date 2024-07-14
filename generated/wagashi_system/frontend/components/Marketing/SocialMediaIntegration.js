import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Share2, ExternalLink, MessageCircle, ThumbsUp, Repeat } from 'lucide-react';

const SocialMediaIntegration = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  useEffect(() => {
    // モックデータを使用してSNSの投稿を取得
    const fetchPosts = async () => {
      // 実際のAPIコールの代わりにモックデータを使用
      const mockPosts = [
        { id: 1, platform: 'twitter', content: '新作の季節の和菓子が出来上がりました！', likes: 15, shares: 5, comments: 3 },
        { id: 2, platform: 'instagram', content: '職人技が光る繊細な和菓子の画像', likes: 50, shares: 10, comments: 8 },
        { id: 3, platform: 'facebook', content: '明日から新しい抹茶スイーツフェアが始まります！', likes: 30, shares: 7, comments: 5 },
        { id: 4, platform: 'linkedin', content: '和菓子作りの伝統と革新について語る記事を投稿しました', likes: 20, shares: 3, comments: 2 },
        { id: 5, platform: 'youtube', content: '和菓子作りの裏側 - 職人の技術と心', views: 1000, likes: 100, comments: 15 },
      ];
      setPosts(mockPosts);
    };

    fetchPosts();
  }, []);

  const filterPosts = (platform) => {
    setSelectedPlatform(platform);
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="text-blue-400" />;
      case 'instagram':
        return <Instagram className="text-pink-500" />;
      case 'facebook':
        return <Facebook className="text-blue-600" />;
      case 'linkedin':
        return <Linkedin className="text-blue-700" />;
      case 'youtube':
        return <Youtube className="text-red-600" />;
      default:
        return null;
    }
  };

  const renderPosts = () => {
    const filteredPosts = selectedPlatform === 'all'
      ? posts
      : posts.filter(post => post.platform === selectedPlatform);

    return filteredPosts.map(post => (
      <div key={post.id} className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
        <div className="flex items-center mb-2">
          {getPlatformIcon(post.platform)}
          <span className="ml-2 text-gray-600 font-medium">{post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}</span>
        </div>
        <p className="text-gray-800 mb-3">{post.content}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <ThumbsUp size={16} className="mr-1" />
            {post.likes}
          </span>
          <span className="flex items-center">
            <MessageCircle size={16} className="mr-1" />
            {post.comments}
          </span>
          <span className="flex items-center">
            <Repeat size={16} className="mr-1" />
            {post.shares}
          </span>
          {post.views && (
            <span className="flex items-center">
              <ExternalLink size={16} className="mr-1" />
              {post.views} views
            </span>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#F3EAD3]">
      <h2 className="text-3xl font-bold mb-6 text-[#4A2311] font-yuji">SNS連携</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-[#006400] font-yuji">プラットフォーム選択</h3>
        <div className="flex flex-wrap gap-2">
          {['all', 'twitter', 'instagram', 'facebook', 'linkedin', 'youtube'].map(platform => (
            <button
              key={platform}
              onClick={() => filterPosts(platform)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedPlatform === platform
                  ? 'bg-[#006400] text-white'
                  : 'bg-white text-[#006400] hover:bg-[#007500] hover:text-white'
              }`}
            >
              {platform === 'all' ? 'すべて' : platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-[#006400] font-yuji">最近の投稿</h3>
        {renderPosts()}
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 text-[#006400] font-yuji">新規投稿</h3>
        <textarea
          className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006400]"
          rows="4"
          placeholder="ここに投稿内容を入力してください..."
        ></textarea>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {[Twitter, Instagram, Facebook, Linkedin, Youtube].map((Icon, index) => (
              <button key={index} className="text-gray-600 hover:text-[#006400] transition-colors duration-200">
                <Icon size={24} />
              </button>
            ))}
          </div>
          <button className="bg-[#006400] text-white px-4 py-2 rounded-md hover:bg-[#007500] transition-colors duration-200 flex items-center">
            <Share2 size={18} className="mr-2" />
            投稿する
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaIntegration;