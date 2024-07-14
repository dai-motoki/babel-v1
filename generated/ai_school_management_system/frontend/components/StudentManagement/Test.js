// 必要なモジュールをインポート
import React, { useState } from 'react';
import { ChevronDown, CheckCircle, XCircle, Book } from 'react-feather';

// Testコンポーネントの定義
const Test = () => {
  // 状態変数の定義
  const [activeCategory, setActiveCategory] = useState('プログラミング');
  const [examResults, setExamResults] = useState({});

  // 試験カテゴリー
  const categories = [
    'プログラミング',
    'デザイン',
    'マーケティング',
    'ビジネス',
    'データサイエンス',
    '国語'
  ];

  // 試験問題データ
  const examQuestions = {
    プログラミング: [
      { id: 1, question: 'JavaScriptの基本データ型は何ですか？', options: ['Number', 'String', 'Boolean', 'すべて正解'], correctAnswer: 3 },
      { id: 2, question: 'Reactのステートフックはどれですか？', options: ['useState', 'useEffect', 'useContext', 'useReducer'], correctAnswer: 0 },
      { id: 3, question: 'HTMLの略称は何ですか？', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correctAnswer: 0 },
      { id: 4, question: 'CSSのボックスモデルの構成要素は何ですか？', options: ['マージン、ボーダー、パディング、コンテンツ', 'ヘッダー、フッター、サイドバー、メイン', 'フォント、カラー、サイズ、スタイル', 'ディスプレイ、ポジション、フロート、クリア'], correctAnswer: 0 },
      { id: 5, question: 'GitHubは何のためのプラットフォームですか？', options: ['ソーシャルネットワーキング', 'オンラインショッピング', 'バージョン管理とコラボレーション', 'ビデオストリーミング'], correctAnswer: 2 }
    ],
    デザイン: [
      { id: 1, question: 'UIデザインにおける「アフォーダンス」とは何ですか？', options: ['オブジェクトの見た目から使い方が分かること', 'ユーザーの行動を追跡すること', 'デザインの一貫性', 'カラーパレットの選択'], correctAnswer: 0 },
      { id: 2, question: 'どのカラーモードが印刷物に適していますか？', options: ['RGB', 'CMYK', 'HSL', 'HEX'], correctAnswer: 1 },
      { id: 3, question: 'タイポグラフィーにおける「カーニング」とは何ですか？', options: ['文字の大きさ', '文字間隔の調整', '行間の調整', 'フォントの太さ'], correctAnswer: 1 },
      { id: 4, question: 'レスポンシブデザインの主な目的は何ですか？', options: ['ウェブサイトを美しくする', 'ロード時間を短縮する', '異なるデバイスで適切に表示する', 'SEOを改善する'], correctAnswer: 2 },
      { id: 5, question: 'ゲシュタルト心理学の「近接の法則」とは何を説明していますか？', options: ['似たオブジェクトをグループ化する傾向', '近くにあるオブジェクトをグループ化する傾向', '閉じた形を知覚する傾向', '連続したパターンを知覚する傾向'], correctAnswer: 1 }
    ],
    マーケティング: [
      { id: 1, question: 'SEOの略称は何ですか？', options: ['Search Engine Optimization', 'Social Engagement Opportunity', 'Sales Enhancement Operation', 'Systematic Email Outreach'], correctAnswer: 0 },
      { id: 2, question: 'コンテンツマーケティングの主な目的は何ですか？', options: ['直接的な販売', '顧客との関係構築', 'ブランド認知度の向上', 'すべて正解'], correctAnswer: 3 },
      { id: 3, question: 'CPA（Cost Per Acquisition）とは何を表しますか？', options: ['顧客一人あたりの広告費用', '広告のクリック率', '広告の表示回数', 'ウェブサイトの訪問者数'], correctAnswer: 0 },
      { id: 4, question: 'インフルエンサーマーケティングの主な利点は何ですか？', options: ['低コスト', '高い信頼性', '広範囲のリーチ', 'すべて正解'], correctAnswer: 1 },
      { id: 5, question: 'A/Bテストとは何ですか？', options: ['2つの異なるマーケティング戦略の比較', 'ブランドの認知度調査', '顧客満足度調査', '競合分析'], correctAnswer: 0 }
    ],
    ビジネス: [
      { id: 1, question: 'ROIの略称は何ですか？', options: ['Return On Investment', 'Rate Of Interest', 'Risk Of Inflation', 'Revenue On Income'], correctAnswer: 0 },
      { id: 2, question: 'SWOTの分析で「S」は何を表しますか？', options: ['Strategy', 'Strength', 'Service', 'Sales'], correctAnswer: 1 },
      { id: 3, question: 'リーンスタートアップの主な特徴は何ですか？', options: ['大規模な初期投資', '詳細なビジネスプラン', '迅速な製品開発と顧客フィードバック', '長期的な戦略立案'], correctAnswer: 2 },
      { id: 4, question: 'B2Bビジネスモデルとは何ですか？', options: ['企業対消費者', '企業対企業', '消費者対消費者', '政府対企業'], correctAnswer: 1 },
      { id: 5, question: 'キャッシュフロー計算書の主な目的は何ですか？', options: ['企業の収益性を示す', '企業の資産と負債を示す', '企業の現金の流れを示す', '企業の株主価値を示す'], correctAnswer: 2 }
    ],
    データサイエンス: [
      { id: 1, question: '機械学習の主なタイプは何ですか？', options: ['教師あり学習、教師なし学習、強化学習', '構造化学習、非構造化学習', '線形学習、非線形学習', 'ビッグデータ学習、スモールデータ学習'], correctAnswer: 0 },
      { id: 2, question: 'データの正規化の主な目的は何ですか？', options: ['データの削除', 'データの標準化', 'データの暗号化', 'データの複製'], correctAnswer: 1 },
      { id: 3, question: 'ビッグデータの「3V」とは何を指しますか？', options: ['Variety, Velocity, Volume', 'Value, Visibility, Verification', 'Validity, Virtue, Versatility', 'Vision, Voice, Venture'], correctAnswer: 0 },
      { id: 4, question: 'データマイニングの主な目的は何ですか？', options: ['データの収集', 'データの可視化', 'パターンや関係性の発見', 'データの保存'], correctAnswer: 2 },
      { id: 5, question: 'ディープラーニングは何の一部ですか？', options: ['統計学', '機械学習', 'データベース管理', 'ウェブ開発'], correctAnswer: 1 }
    ],
    国語: [
      { id: 1, question: '「花」の漢字の部首は何ですか？', options: ['艹（くさかんむり）', '木（き）', '水（みず）', '火（ひ）'], correctAnswer: 0 },
      { id: 2, question: '「美しい」の品詞は何ですか？', options: ['名詞', '形容詞', '動詞', '副詞'], correctAnswer: 1 },
      { id: 3, question: '次の文の主語はどれですか？「空に星が輝いている。」', options: ['空', '星', '輝いている', '主語はない'], correctAnswer: 1 },
      { id: 4, question: '「春はあけぼの」で始まる随筆は何ですか？', options: ['徒然草', '方丈記', '枕草子', '源氏物語'], correctAnswer: 2 },
      { id: 5, question: '「明日」の読み方として正しいのは？', options: ['あした', 'あす', 'みょうにち', 'すべて正解'], correctAnswer: 3 }
    ]
  };

  // 回答提出時の処理
  const handleAnswerSubmit = (questionId, answer) => {
    setExamResults((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-indigo-900 border-b-2 border-indigo-500 pb-2">
        クラス分け試験
      </h1>

      <div className="mb-6 flex space-x-2 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md ${
              activeCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-indigo-600 hover:bg-indigo-100'
            } transition duration-300`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-indigo-800 flex items-center">
          <Book className="mr-2" /> {activeCategory}の試験問題
        </h2>
        {examQuestions[activeCategory].map((question) => (
          <div key={question.id} className="mb-6 p-4 border border-gray-200 rounded-md">
            <p className="text-lg font-medium mb-2">{question.question}</p>
            <div className="grid grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className={`p-2 rounded-md text-left ${
                    examResults[question.id] === (index === question.correctAnswer)
                      ? 'bg-green-100 border-green-500'
                      : 'bg-gray-100 border-gray-300'
                  } border hover:bg-indigo-100 transition duration-300`}
                  onClick={() => handleAnswerSubmit(question.id, index === question.correctAnswer)}
                >
                  {option}
                </button>
              ))}
            </div>
            {examResults[question.id] !== undefined && (
              <div className="mt-2">
                {examResults[question.id] ? (
                  <CheckCircle className="text-green-500 inline-block mr-2" size={20} />
                ) : (
                  <XCircle className="text-red-500 inline-block mr-2" size={20} />
                )}
                {examResults[question.id] ? '正解' : '不正解'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// コンポーネントをエクスポート
export default Test;