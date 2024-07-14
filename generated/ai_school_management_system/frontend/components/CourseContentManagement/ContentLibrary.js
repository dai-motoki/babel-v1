import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BookOpen, FileText, Video, RefreshCw, ChevronRight, ArrowRight, CheckCircle, Clock, AlertTriangle, Plus, X } from 'lucide-react';

// 以下のコメントは、変更内容を説明しています：
// TrendingDownとArrowRightをインポートリストに追加しました。
// これにより、ESLintエラーが解決されます。
// TrendingDownは下降トレンドを表示するアイコンとして使用される可能性があります。
// ArrowRightは右向きの矢印アイコンとして使用される可能性があります。

const ContentLibrary = () => {
  // 新しい状態とトグル関数を追加
  const [openSections, setOpenSections] = useState({});
  const [selectedSection, setSelectedSection] = useState(null);

  const toggleSectionContent = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const openSectionPage = (index) => {
    setSelectedSection(index);
  };

  // 状態管理のためのフックを定義
  const [trendData, setTrendData] = useState([]);
  const [generatedLectures, setGeneratedLectures] = useState([]);
  const [generatedCurriculum, setGeneratedCurriculum] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStatus, setProgressStatus] = useState({
    trends: 'pending',
    lectures: 'pending',
    curriculum: 'pending',
    content: 'pending'
  });

  // トレンドデータを取得するためのエフェクト
  useEffect(() => {
    fetchTrendData();
  }, []);

  // トレンドデータを取得する関数
  const fetchTrendData = async () => {
    setProgressStatus(prev => ({ ...prev, trends: 'loading' }));
    // 実際のAPIコールに置き換える
    const dummyTrendData = [
      { id: 1, topic: '生成AIを活用した製品開発', popularity: [85, 90, 95], date: '2024-05-01' },
      { id: 2, topic: 'AIによる顧客サービス最適化', popularity: [80, 84, 88], date: '2024-06-01' },
      { id: 3, topic: 'ビジネスプロセス自動化におけるAI活用', popularity: [75, 78, 82], date: '2024-07-01' },
    ];
    setTimeout(() => {
      setTrendData(dummyTrendData);
      setProgressStatus(prev => ({ ...prev, trends: 'completed' }));
    }, 1000);
  };

  // 講義案を生成する関数
  const generateLectures = async () => {
    setIsGenerating(true);
    setProgressStatus(prev => ({ ...prev, lectures: 'loading' }));
    // 実際のAI生成プロセスに置き換える
    const dummyLectures = [
      { id: 1, title: '生成AIを活用した新規事業創出戦略', duration: '90分', content: '', testDifficulty: 'medium', includeVideo: false },
      { id: 2, title: 'AIチャットボットによる顧客対応革新', duration: '120分', content: '', testDifficulty: 'medium', includeVideo: false },
      { id: 3, title: 'ビジネスプロセスにおけるAI導入事例研究', duration: '60分', content: '', testDifficulty: 'medium', includeVideo: false },
    ];
    setTimeout(() => {
      setGeneratedLectures(dummyLectures);
      setIsGenerating(false);
      setProgressStatus(prev => ({ ...prev, lectures: 'completed' }));
    }, 2000);
  };

  // カリキュラムを生成する関数
  const generateCurriculum = async () => {
    setIsGenerating(true);
    setProgressStatus(prev => ({ ...prev, curriculum: 'loading' }));
    // 実際のAI生成プロセスに置き換える
    const dummyCurriculum = {
      title: 'ビジネスにおける生成AI活用戦略',
      duration: '4週間',
      modules: [
        { title: '第1週: 生成AIの基礎と事業応用', lectures: ['生成AIの概要', 'ビジネスモデル革新事例', '倫理的考察'] },
        { title: '第2週: 顧客体験向上のためのAI活用', lectures: ['AIチャットボットの設計', 'パーソナライゼーション戦略', '顧客データ分析'] },
        { title: '第3週: ビジネスプロセス最適化とAI', lectures: ['業務自動化の可能性', 'AIによる意思決定支援', 'データドリブン経営'] },
        { title: '第4週: AI導入プロジェクト管理', lectures: ['ROI分析', '組織変革マネジメント', '実装計画立案'] },
      ],
    };
    setTimeout(() => {
      setGeneratedCurriculum(dummyCurriculum);
      setIsGenerating(false);
      setProgressStatus(prev => ({ ...prev, curriculum: 'completed' }));
    }, 2000);
  };

  // 講義内容を生成する関数
  const generateContent = async () => {
    setIsGenerating(true);
    setProgressStatus(prev => ({ ...prev, content: 'loading' }));
    // 実際のAI生成プロセスに置き換える
    const dummyContent = {
      title: '生成AIを活用した新規事業創出戦略',
      pageCount: 250,
      difficulty: '中級',
      sections: [
        { 
          title: '1. 生成AIの基本概念と可能性', 
          content: '生成AIの定義、種類、最新動向について解説します。機械学習の基礎から、深層学習、強化学習まで幅広く取り扱います。また、GPT、DALL-E、Stable Diffusionなどの最新モデルの特徴と応用例を紹介します。',
          videos: [
            { title: '生成AIの基礎講座', thumbnail: 'https://picsum.photos/seed/ai_basics/200/150' },
            { title: '最新AI技術動向', thumbnail: 'https://picsum.photos/seed/ai_trends/200/150' }
          ],
          questions: [
            '生成AIと従来のAIの違いは何ですか？',
            'GPT-3の主な特徴を3つ挙げてください。',
            '生成AIがビジネスに与える影響について説明してください。'
          ]
        },
        { 
          title: '2. ビジネスモデルの再構築', 
          content: '生成AIによる既存ビジネスの変革と新規事業の創出方法を探ります。AIを活用した新しい収益モデル、顧客体験の向上、業務効率化などについて具体例を交えて解説します。',
          videos: [
            { title: 'AI時代のビジネスモデル革新', thumbnail: 'https://picsum.photos/seed/ai_business/200/150' },
            { title: '成功企業に学ぶAI活用戦略', thumbnail: 'https://picsum.photos/seed/ai_success/200/150' }
          ],
          questions: [
            'AIによって最も変革が期待される業界を3つ挙げ、その理由を説明してください。',
            '既存ビジネスにAIを導入する際の課題と解決策を議論してください。',
            'AI活用による新規事業のアイデアを1つ提案し、その実現可能性を評価してください。'
          ]
        },
        { 
          title: '3. 市場分析とニーズ発見', 
          content: 'AIを活用した市場調査と潜在ニーズの発見手法を学びます。ビッグデータ分析、感情分析、トレンド予測などのAI技術を用いた先進的なマーケティング手法を紹介します。',
          videos: [
            { title: 'AI駆動型マーケットリサーチ', thumbnail: 'https://picsum.photos/seed/ai_market/200/150' },
            { title: '未来のニーズを予測するAI', thumbnail: 'https://picsum.photos/seed/ai_needs/200/150' }
          ],
          questions: [
            'AIを用いた市場分析の利点と限界について説明してください。',
            '感情分析がマーケティングにどのように活用できるか、具体例を挙げて説明してください。',
            'AIによるトレンド予測の精度を向上させるために必要な要素は何ですか？'
          ]
        },
        { 
          title: '4. プロトタイピングと実証実験', 
          content: '生成AIを用いた迅速なプロトタイプ開発と検証方法を紹介します。アジャイル開発手法とAIの組み合わせ、A/Bテスティング、ユーザーフィードバックの収集と分析について詳しく解説します。',
          videos: [
            { title: 'AIによる高速プロトタイピング', thumbnail: 'https://picsum.photos/seed/ai_prototype/200/150' },
            { title: 'データ駆動型の実証実験手法', thumbnail: 'https://picsum.photos/seed/ai_experiment/200/150' }
          ],
          questions: [
            'AIを活用したプロトタイピングの利点を3つ挙げてください。',
            'A/Bテスティングにおいて、AIがどのように活用できるか説明してください。',
            'ユーザーフィードバックの自動分析において、どのようなAI技術が有効ですか？'
          ]
        },
        { 
          title: '5. スケールアップと持続可能性', 
          content: 'AI事業の拡大戦略と長期的な競争優位性の確保について議論します。スケーラビリティ、データ戦略、エコシステム構築、倫理的考慮事項など、AI事業の持続的成長に必要な要素を包括的に取り上げます。',
          videos: [
            { title: 'AI事業のスケールアップ戦略', thumbnail: 'https://picsum.photos/seed/ai_scale/200/150' },
            { title: 'AIと持続可能なビジネス', thumbnail: 'https://picsum.photos/seed/ai_sustainable/200/150' }
          ],
          questions: [
            'AI事業をスケールアップする際の主な課題と対策を説明してください。',
            'AI企業が長期的な競争優位性を維持するために必要な要素は何ですか？',
            'AI事業における倫理的配慮事項について、具体例を挙げて議論してください。'
          ]
        },
        { 
          title: '6. AI人材の育成と組織文化の変革', 
          content: 'AI時代に求められる人材像と、それを育成するための教育プログラムについて解説します。また、AI導入に伴う組織文化の変革、チェンジマネジメントの手法についても詳しく取り上げます。',
          videos: [
            { title: 'AI時代の人材育成戦略', thumbnail: 'https://picsum.photos/seed/ai_talent/200/150' },
            { title: 'データドリブン組織への変革', thumbnail: 'https://picsum.photos/seed/ai_organization/200/150' }
          ],
          questions: [
            'AI時代に求められるスキルセットについて説明してください。',
            'AI人材を育成するための効果的な教育プログラムを提案してください。',
            'AI導入に伴う組織文化の変革において、リーダーシップの役割について議論してください。'
          ]
        },
        { 
          title: '7. AIの法的・倫理的課題と対応策', 
          content: 'AI利用に関する法規制、知的財産権、プライバシー保護などの法的課題について解説します。また、AIの公平性、説明可能性、透明性などの倫理的課題とその対応策についても詳しく取り上げます。',
          videos: [
            { title: 'AI時代の法と倫理', thumbnail: 'https://picsum.photos/seed/ai_ethics/200/150' },
            { title: '責任あるAI開発のガイドライン', thumbnail: 'https://picsum.photos/seed/ai_guidelines/200/150' }
          ],
          questions: [
            'AI利用に関する主な法的課題を3つ挙げ、その対応策を説明してください。',
            'AIの公平性を確保するために、どのような方法が考えられますか？',
            'AI開発における説明可能性の重要性について、具体例を挙げて議論してください。'
          ]
        },
      ],
    };
    setTimeout(() => {
      setGeneratedContent(dummyContent);
      setIsGenerating(false);
      setProgressStatus(prev => ({ ...prev, content: 'completed' }));
    }, 2000);
  };
  // ステータスアイコンをレンダリングする関数
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-gray-400" size={18} />;
      case 'loading':
        return <RefreshCw className="text-blue-500 animate-spin" size={18} />;
      case 'completed':
        return <CheckCircle className="text-green-500" size={18} />;
      default:
        return <AlertTriangle className="text-yellow-500" size={18} />;
    }
  };
  // プロジェクト管理のための状態
  const [activeProjects, setActiveProjects] = useState([
    {
      id: 1,
      name: 'AI講義コンテンツ生成',
      progressStatus: {
        trends: 'pending',
        lectures: 'pending',
        curriculum: 'pending',
        content: 'pending'
      }
    }
  ]);
  const [nextProjectId, setNextProjectId] = useState(2);
  const [activeTab, setActiveTab] = useState(1);

  // 新しいプロジェクトを追加する関数
  const addNewProject = () => {
    const newProject = {
      id: nextProjectId,
      name: `新規講義 ${nextProjectId}`,
      progressStatus: {
        trends: 'pending',
        lectures: 'pending',
        curriculum: 'pending',
        content: 'pending'
      }
    };
    setActiveProjects([...activeProjects, newProject]);
    setNextProjectId(nextProjectId + 1);
    setActiveTab(nextProjectId);
  };

  // プロジェクトを閉じる関数
  const closeProject = (projectId) => {
    setActiveProjects(activeProjects.filter(project => project.id !== projectId));
    if (activeTab === projectId) {
      setActiveTab(activeProjects[0].id);
    }
  };


  const updateLecture = (index, field, value) => {
    setGeneratedLectures(prevLectures => {
      const updatedLectures = [...prevLectures];
      updatedLectures[index] = {
        ...updatedLectures[index],
        [field]: value
      };
      return updatedLectures;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      {/* ヘッダー */}
      <h1 className="text-3xl font-bold mb-8 text-indigo-900 border-b-2 border-indigo-200 pb-2">
        講義生成
      </h1>

      {/* プロジェクトタブ */}
      <div className="mb-4 flex items-center">
        {activeProjects.map(project => (
          <button
            key={project.id}
            onClick={() => setActiveTab(project.id)}
            className={`mr-2 px-4 py-2 rounded-t-lg ${activeTab === project.id ? 'bg-white text-indigo-600 font-semibold' : 'bg-gray-200 text-gray-600'}`}
          >
            {project.name}
          </button>
        ))}
        <button
          onClick={addNewProject}
          className="px-4 py-2 bg-indigo-500 text-white rounded-t-lg hover:bg-indigo-600 transition duration-300 flex items-center"
        >
          <Plus className="mr-2" size={18} />
          新規講義
        </button>
      </div>

      {/* プロジェクトコンテンツ */}
      {activeProjects.map(project => (
        <div key={project.id} className={`bg-white rounded-lg shadow-md p-6 ${activeTab === project.id ? 'block' : 'hidden'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-indigo-700">{project.name}</h2>
            <button
              onClick={() => closeProject(project.id)}
              className="text-gray-500 hover:text-red-500 transition duration-300"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex justify-center items-center space-x-8 mb-12">
            <div className="flex flex-col items-center group">
              <TrendingUp size={48} className={`${project.progressStatus.trends === 'completed' ? 'text-green-500' : 'text-gray-400'} transition-all duration-300 transform group-hover:scale-110`} />
              <span className="text-lg mt-2 font-semibold">トレンド</span>
            </div>
            <ChevronRight size={32} className="text-indigo-500" />
            <div className="flex flex-col items-center group">
              <FileText size={48} className={`${project.progressStatus.curriculum === 'completed' ? 'text-green-500' : 'text-gray-400'} transition-all duration-300 transform group-hover:scale-110`} />
              <span className="text-lg mt-2 font-semibold">カリキュラム</span>
            </div>
            <ChevronRight size={32} className="text-indigo-500" />
            <div className="flex flex-col items-center group">
              <BookOpen size={48} className={`${project.progressStatus.lectures === 'completed' ? 'text-green-500' : 'text-gray-400'} transition-all duration-300 transform group-hover:scale-110`} />
              <span className="text-lg mt-2 font-semibold">講義案</span>
            </div>
            <ChevronRight size={32} className="text-indigo-500" />
            <div className="flex flex-col items-center group">
              <Video size={48} className={`${project.progressStatus.content === 'completed' ? 'text-green-500' : 'text-gray-400'} transition-all duration-300 transform group-hover:scale-110`} />
              <span className="text-lg mt-2 font-semibold">講義内容</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">


            <div className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden">
              <h2 className="text-xl font-bold mb-6 flex items-center text-indigo-700">
                <TrendingUp className="mr-3" size={24} />
                最新トレンド
                {renderStatusIcon(progressStatus.trends)}
              </h2>
              <div className="space-y-6 relative z-10">
                {trendData.map((trend, index) => (
                  <div key={trend.id} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:from-indigo-100 hover:to-purple-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-base">{index + 1}</span>
                        </div>
                        <div>
                          <span className="text-xs text-purple-500 font-semibold">{new Date(trend.date).toLocaleDateString('ja-JP')}</span>
                          <h3 className="text-base font-semibold text-indigo-700">{trend.topic}</h3>
                        </div>
                      </div>
                      {trend.popularity[2] > trend.popularity[0] ? (
                        <TrendingUp className="text-green-500" size={20} />
                      ) : trend.popularity[2] < trend.popularity[0] ? (
                        <TrendingDown className="text-red-500" size={20} />
                      ) : (
                        <ArrowRight className="text-yellow-500" size={20} />
                      )}
                    </div>
                    <div className="relative pt-1">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-semibold inline-block text-purple-600">
                          3ヶ月前: {trend.popularity[0]}%
                        </span>
                        <span className="text-xs font-semibold inline-block text-indigo-600">
                          2ヶ月前: {trend.popularity[1]}%
                        </span>
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          現在: {trend.popularity[2]}%
                        </span>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${trend.popularity[0]}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                        <div style={{ width: `${trend.popularity[1] - trend.popularity[0]}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
                        <div style={{ width: `${trend.popularity[2] - trend.popularity[1]}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={fetchTrendData}
                className="mt-6 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
              >
                <RefreshCw className="mr-2 animate-spin" size={16} />
                トレンド更新
              </button>
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-50 transform rotate-45"></div>
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-gradient-to-tl from-indigo-200 to-purple-200 rounded-full opacity-50 transform rotate-45"></div>
            </div>



            <div className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
                <FileText className="mr-2" />
                カリキュラム生成
                {renderStatusIcon(progressStatus.curriculum)}
              </h2>
              <button
                onClick={generateCurriculum}
                className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300 flex items-center transform hover:scale-105"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <RefreshCw className="mr-2 animate-spin" size={18} />
                ) : (
                  <ChevronRight className="mr-2" size={18} />
                )}
                カリキュラムを生成
              </button>
              {generatedCurriculum && (
                <div className="animate-fadeIn">
                  <h3 className="font-semibold text-lg mb-2 text-indigo-600">{generatedCurriculum.title}</h3>
                  <p className="text-sm text-indigo-400 mb-4">期間: {generatedCurriculum.duration}</p>
                  <ul className="space-y-4">
                    {generatedCurriculum.modules.map((module, index) => (
                      <li key={index} className="bg-indigo-50 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                        <p className="font-medium text-indigo-700 mb-2">{module.title}</p>
                        <ul className="list-none pl-4 text-sm text-gray-600 space-y-2">
                          {module.lectures.map((lecture, lectureIndex) => (
                            <li key={lectureIndex} className="flex items-center">
                              <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                              <span className="hover:text-indigo-600 transition-colors duration-200">{lecture}</span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-100 rounded-full opacity-50 transform rotate-45"></div>
            </div>


          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:scale-105">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-100 rounded-full opacity-50 transform rotate-45"></div>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
                <BookOpen className="mr-2 animate-pulse" />
                講義案エディタ
                {renderStatusIcon(progressStatus.lectures)}
              </h2>
              <button
                onClick={generateLectures}
                className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300 flex items-center transform hover:scale-105"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <RefreshCw className="mr-2 animate-spin" size={18} />
                ) : (
                  <ChevronRight className="mr-2 animate-bounce" size={18} />
                )}
                講義案を生成
              </button>
              {generatedLectures.length > 0 && (
                <div className="space-y-4 animate-fadeIn">
                  {generatedLectures.map((lecture, index) => (
                    <div key={lecture.id} className="bg-indigo-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                      <h3 className="font-medium text-indigo-700 mb-2">{lecture.title}</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="col-span-2">
                          <span className="font-semibold">講義の目次：</span>
                          <textarea
                            className="w-full mt-1 p-2 border rounded"
                            value={lecture.content}
                            onChange={(e) => updateLecture(index, 'content', e.target.value)}
                            rows={5}
                            placeholder="1. はじめに&#10;2. 主要な概念&#10;3. 実践的な応用&#10;4. まとめと今後の展望"
                          />
                        </div>
                        <div>
                          <span className="font-semibold">テスト難易度：</span>
                          <select
                            className="w-full mt-1 p-2 border rounded"
                            value={lecture.testDifficulty}
                            onChange={(e) => updateLecture(index, 'testDifficulty', e.target.value)}
                          >
                            <option value="easy">簡単</option>
                            <option value="medium">普通</option>
                            <option value="hard">難しい</option>
                          </select>
                        </div>
                        <div>
                          <span className="font-semibold">動画：</span>
                          <input
                            type="checkbox"
                            checked={lecture.includeVideo}
                            onChange={(e) => updateLecture(index, 'includeVideo', e.target.checked)}
                            className="ml-2"
                          />
                        </div>
                        <div>
                          <span className="font-semibold">所要時間：</span>
                          <input
                            type="text"
                            className="w-full mt-1 p-2 border rounded"
                            value={lecture.duration}
                            onChange={(e) => updateLecture(index, 'duration', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
                <BookOpen className="mr-2 animate-pulse" />
                講義内容生成
                {renderStatusIcon(progressStatus.content)}
              </h2>
              <button
                onClick={generateContent}
                className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300 flex items-center transform hover:scale-105"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <RefreshCw className="mr-2 animate-spin" size={18} />
                ) : (
                  <ChevronRight className="mr-2 animate-bounce" size={18} />
                )}
                講義内容を生成
              </button>
              {generatedContent && (
                <div className="mt-4 space-y-4">
                  <div className="flex items-center space-x-4">
                    <img src={`https://picsum.photos/seed/${generatedContent.title}/100/150`} alt="書籍表紙" className="w-24 h-36 object-cover rounded-lg shadow-md" />
                    <div>
                      <h3 className="font-semibold text-lg">{generatedContent.title}</h3>
                      <p className="text-sm text-gray-600">著者: AI講師</p>
                      <p className="text-sm text-gray-600">出版: AIアカデミー出版</p>
                      <p className="text-sm text-gray-600">ページ数: {generatedContent.pageCount}</p>
                      <p className="text-sm text-gray-600">難易度: {generatedContent.difficulty}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-indigo-700 text-xl mb-3">目次</h4>
                    <ul className="space-y-3">
                      {generatedContent.sections && generatedContent.sections.map((section, index) => (
                        <li key={index} className="bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-lg p-3 transition-all duration-300 hover:shadow-md hover:from-indigo-200 hover:to-indigo-300">
                          <button
                            onClick={() => openSectionPage(index)}
                            className="w-full text-left hover:text-indigo-600 transition-colors duration-200 flex items-center justify-between"
                          >
                            <span className="font-medium text-indigo-800">{section.title}</span>
                            <ChevronRight size={20} className="text-indigo-500" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {selectedSection !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-3/4 h-3/4 overflow-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">{generatedContent.sections[selectedSection].title}</h3>
                      <button onClick={() => setSelectedSection(null)} className="text-gray-500 hover:text-red-500">
                        <X size={24} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-700">{generatedContent.sections[selectedSection].content}</p>
                      <div>
                        <h5 className="font-medium text-indigo-600 mb-2">関連動画</h5>
                        <div className="grid grid-cols-2 gap-4">
                          {generatedContent.sections[selectedSection].videos && generatedContent.sections[selectedSection].videos.map((video, vIndex) => (
                            <div key={vIndex} className="relative group">
                              <img src={video.thumbnail} alt={`動画サムネイル${vIndex + 1}`} className="w-full h-auto rounded-md" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                <Video className="text-white" size={32} />
                              </div>
                              <p className="mt-1 text-sm text-gray-600">{video.title}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-indigo-600 mb-2">テスト問題</h5>
                        <ul className="list-decimal list-inside space-y-2">
                          {generatedContent.sections[selectedSection].questions && generatedContent.sections[selectedSection].questions.map((question, qIndex) => (
                            <li key={qIndex} className="text-sm">{question}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-100 rounded-full opacity-50 transform rotate-45"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default ContentLibrary;

