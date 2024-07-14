import React, { useState, useEffect } from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const SocialMediaIntegration = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('twitter');
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [analytics, setAnalytics] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchAnalytics();
  }, [selectedPlatform]);

  const fetchPosts = async () => {
    setIsLoading(true);
    // API呼び出しをシミュレート
    setTimeout(() => {
      const mockPosts = [
        { id: 1, content: '生成AI塾で最新のAI技術を学ぼう！', likes: 15, shares: 5 },
        { id: 2, content: '明日から新しいコースが始まります。お楽しみに！', likes: 20, shares: 8 },
        { id: 3, content: 'AI技術者になるための第一歩。今すぐ申し込みを！', likes: 30, shares: 12 },
      ];
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  };

  const fetchAnalytics = async () => {
    // API呼び出しをシミュレート
    setTimeout(() => {
      const mockAnalytics = {
        followers: 1000,
        engagement: 5.2,
        reachGrowth: 10.5,
      };
      setAnalytics(mockAnalytics);
    }, 1000);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const newPostObj = {
        id: posts.length + 1,
        content: newPost,
        likes: 0,
        shares: 0,
      };
      setPosts([newPostObj, ...posts]);
      setNewPost('');
    }
  };

  const PlatformIcon = ({ platform }) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="w-6 h-6" />;
      case 'facebook':
        return <Facebook className="w-6 h-6" />;
      case 'instagram':
        return <Instagram className="w-6 h-6" />;
      case 'linkedin':
        return <Linkedin className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-indigo-900 border-b-2 border-indigo-200 pb-2">
        SNS連携管理
      </h1>

      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/4 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">プラットフォーム選択</h2>
            <div className="space-y-2">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`flex items-center w-full p-2 rounded-md transition-colors ${
                    selectedPlatform === platform
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <PlatformIcon platform={platform} />
                  <span className="ml-2 capitalize">{platform}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">投稿管理</h2>
            <form onSubmit={handlePostSubmit} className="mb-6">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="新しい投稿を作成..."
                className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
              ></textarea>
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                投稿する
              </button>
            </form>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="border-b border-gray-200 pb-4">
                    <p className="text-gray-800">{post.content}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <span className="mr-4">いいね: {post.likes}</span>
                      <span>シェア: {post.shares}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/4 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">分析</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">フォロワー数</h3>
                <p className="text-2xl font-bold text-indigo-600">{analytics.followers}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">エンゲージメント率</h3>
                <p className="text-2xl font-bold text-indigo-600">{analytics.engagement}%</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">リーチ成長率</h3>
                <p className="text-2xl font-bold text-indigo-600">{analytics.reachGrowth}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-800">キャンペーン予定</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap -mx-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-full md:w-1/3 px-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="w-full h-40 bg-gray-200 rounded-md mb-4"></div>
                  <h3 className="font-semibold text-lg mb-2">キャンペーン {item}</h3>
                  <p className="text-gray-600 text-sm">
                    生成AI塾の魅力を伝える素晴らしいキャンペーンです。
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaIntegration;