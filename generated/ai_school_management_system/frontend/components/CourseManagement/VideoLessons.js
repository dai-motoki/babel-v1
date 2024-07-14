import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, User, Download, Share2, ThumbsUp, MessageCircle, Bookmark, Settings, HelpCircle, ChevronDown } from 'lucide-react';

const VideoLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [quality, setQuality] = useState('720p');

  useEffect(() => {
    const fetchLessons = async () => {
      // APIからのデータ取得をシミュレート
      const dummyData = [
        { id: 1, title: "AI入門：未来を創る技術", description: "AIの基礎と応用、そして社会への影響を学びます", duration: 45, instructor: "山田太郎", views: 1200, likes: 350 },
        { id: 2, title: "機械学習マスタークラス", description: "データサイエンスの核心、機械学習の全貌を解き明かす", duration: 60, instructor: "佐藤花子", views: 980, likes: 280 },
        { id: 3, title: "ディープラーニングの神髄", description: "ニューラルネットワークの深淵に迫る", duration: 75, instructor: "鈴木一郎", views: 1500, likes: 420 },
        { id: 4, title: "自然言語処理の最前線", description: "言語AIの最新トレンドと実践テクニック", duration: 55, instructor: "高橋美咲", views: 850, likes: 230 },
        { id: 5, title: "コンピュータビジョンの世界", description: "画像認識AIの理論と応用", duration: 65, instructor: "田中健太", views: 1100, likes: 310 },
      ];
      setLessons(dummyData);
      if (dummyData.length > 0) {
        setCurrentLesson(dummyData[0]);
      }
    };
    fetchLessons();
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
  };


  // ChevronDownコンポーネントを作成
  const ChevronDown = ({ size = 24, color = 'currentColor' }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  // 使用例：
  // <ChevronDown size={20} color="#333" />

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b-2 border-red-500 pb-2">AIアカデミー：映像授業ポータル</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {currentLesson && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-900 aspect-w-16 aspect-h-9 relative">
                <img
                  src={`https://picsum.photos/seed/${currentLesson.id}/1280/720`}
                  alt={currentLesson.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {quality}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">{currentLesson.title}</h2>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-blue-500"><Share2 size={20} /></button>
                    <button className="text-gray-500 hover:text-red-500"><ThumbsUp size={20} /></button>
                    <button className="text-gray-500 hover:text-yellow-500"><Bookmark size={20} /></button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{currentLesson.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button onClick={handlePlayPause} className="bg-red-500 hover:bg-red-600 text-white rounded-full p-3">
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <button className="text-gray-500 hover:text-gray-600">
                      <SkipBack size={24} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-600">
                      <SkipForward size={24} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    {volume > 0 ? <Volume2 size={24} /> : <VolumeX size={24} />}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24"
                    />
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-sm text-gray-500 mr-2">{formatTime(currentTime)}</span>
                  <div className="flex-grow bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">{formatTime(duration)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button onClick={() => setShowTranscript(!showTranscript)} className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">
                      字幕
                    </button>
                    <button onClick={() => setShowNotes(!showNotes)} className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">
                      ノート
                    </button>
                    <div className="relative">
                      <button className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded flex items-center">
                        <span className="mr-1">速度: {playbackSpeed}x</span>
                        <ChevronDown size={16} />
                      </button>
                      <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-1">
                        {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
                          <button
                            key={speed}
                            onClick={() => handleSpeedChange(speed)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="relative">
                      <button className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded flex items-center">
                        <span className="mr-1">画質: {quality}</span>
                        <ChevronDown size={16} />
                      </button>
                      <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-1">
                        {['360p', '480p', '720p', '1080p'].map((q) => (
                          <button
                            key={q}
                            onClick={() => handleQualityChange(q)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-gray-600">
                      <Download size={20} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-600">
                      <Settings size={20} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-600">
                      <HelpCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showTranscript && (
            <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-2">字幕</h3>
              <p className="text-gray-600">ここに字幕のテキストが表示されます...</p>
            </div>
          )}
          {showNotes && (
            <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-2">ノート</h3>
              <textarea className="w-full h-32 p-2 border rounded" placeholder="ここにノートを取ることができます..."></textarea>
            </div>
          )}
        </div>
        
        <div className="lg:w-1/3">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">授業一覧</h3>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
                  onClick={() => setCurrentLesson(lesson)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/seed/${lesson.id}/160/160`} alt={lesson.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{lesson.title}</p>
                      <p className="text-xs text-gray-500 truncate">{lesson.description}</p>
                      <div className="flex items-center mt-1">
                        <User size={12} className="text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{lesson.instructor}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-xs text-gray-500">{lesson.views} 視聴</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <ThumbsUp size={12} className="text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{lesson.likes}</span>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {lesson.duration}分
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLessons;