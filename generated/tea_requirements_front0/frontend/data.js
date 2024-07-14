// プロジェクト概要データの定義
export const projectOverview = [
  {
    name: "チャット",
    items: [
      { name: "チャットメッセージ", component: "ChatMessage" }
    ]
  },
  {
    name: "現状分析",
    items: [
      { name: "競合動向", component: "CompetitiveAnalysis" },
      { name: "売上・収益推移", component: "SalesRevenueTrend" },
      { name: "KPIダッシュボード", component: "KPIDashboard" },
      { name: "システムフロー", component: "SystemFlow" },
      { name: "データフロー", component: "DataFlow" }
    ]
  },
  {
    name: "マーケティング",
    items: [
      { name: "マーケティングファネル", component: "MarketingFunnel" },
      { name: "ランディングページ", component: "LandingPage" },
      { name: "Webサイト", component: "Website" }
    ]
  },
  {
    name: "アプリケーション",
    items: [
      { name: "本番環境", component: "Production" },
      { name: "ステージング環境", component: "Staging" },
      { name: "開発環境", component: "Development" }
    ]
  },
  {
    name: "AI管理",
    items: [
      { name: "進捗状況", component: "ProgressStatus" },
      { name: "AI学習状況", component: "AILearningStatus" },
      { name: "クラウドインフラ構成", component: "CloudInfrastructure" }
    ]
  },
  {
    name: "セキュリティ",
    items: [
      { name: "セキュリティログ", component: "SecurityLogs" },
      { name: "セキュリティアッドイット", component: "SecurityAudit" },
      { name: "セキュリティエンフォレンス", component: "SecurityEnforcement" },
      { name: "セキュリティモニタリング", component: "SecurityMonitor" }
    ]
  }
];
// 上記のコードは、プロジェクト概要データを定義しています。
// 各セクションには名前と項目のリストがあり、
// 各項目にはコンポーネント名が割り当てられています。
// これにより、動的にコンポーネントを表示できるようになります。

