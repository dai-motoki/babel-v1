
# システム生成Babel SaaSプラットフォームの定義

from babel2.def_concept import concept, dir_frontend

# プロジェクトBabelのルートディレクトリ
root_dir = "../src/components/generated/0710_babel/"

# プロジェクトBabelのディレクトリ構造
directories = [
    "components",
    "styles",
    "utils",
    "hooks",
    "context",
    "public/images",
    "public/fonts"
]

# プロジェクトBabelの詳細定義
def_domain = concept + dir_frontend

# 作成するファイルの定義
files = [
    ('frontend', 'App.js', 
     def_domain + """
     App.jsファイルにReactコンポーネントを記載してください。
     左側にコンポーネントのメニューバーを配置しスクロールバーを設置
     中央にコンポーネントのカードを表示するレイアウトを作成
     ヘッダーとフッターも含めてください。
     また、./DynamicComponentを使用して、選択されたコンポーネントを動的に読み込むようにしてください。
     以下の様にDynamicComponentを使用してコンポーネントを動的に読み込みます。
     表示は日本語です。

        const sidebarComponents = {
            'AIマネジメント': [
            { name: 'AILearningStatus', displayName: 'AI学習状況', icon: <Zap size={18} /> },
            { name: 'CloudInfrastructure', displayName: 'クラウドインフラ', icon: <Settings size={18} /> },
            { name: 'ProgressStatus', displayName: '進捗状況', icon: <BarChart2 size={18} /> }
     """
    ),
    ('frontend', 'DynamicComponent.js',
     def_domain + """
     DynamicComponent.jsファイルに動的コンポーネントのロジックを記載してください。以下は例です。
import React from 'react';

const DynamicComponent = ({ componentName }) => {
  // コンポーネントの動的インポート
  let Component;

  switch (componentName) {
    // SaaS・パッケージマネージャー
    case 'SaaSList':
      Component = React.lazy(() => import('./components/SaaSPackageManager/SaaSList'));
      break;
    case 'PackageList':
      Component = React.lazy(() => import('./components/SaaSPackageManager/PackageList'));
      break;

    // 統合開発環境（IDE）
    case 'MonacoEditor':
      Component = React.lazy(() => import('./components/IDE/MonacoEditor'));
      break;
    case 'FileExplorer':
      Component = React.lazy(() => import('./components/IDE/FileExplorer'));
      break;

    // コラボレーションハブ
    case 'ChatInterface':
      Component = React.lazy(() => import('./components/CollaborationHub/ChatInterface'));
      break;
    case 'MarkdownEditor':
      Component = React.lazy(() => import('./components/CollaborationHub/MarkdownEditor'));
      break;

    // プロジェクトダッシュボード
    case 'VersionControl':
      Component = React.lazy(() => import('./components/ProjectDashboard/VersionControl'));
      break;
    case 'TaskBoard':
      Component = React.lazy(() => import('./components/ProjectDashboard/TaskBoard'));
      break;

    default:
      Component = () => <div>コンポーネントが見つかりません</div>;
  }

  return (
    <React.Suspense fallback={<div>読み込み中...</div>}>
      <Component />
    </React.Suspense>
  );
};

export default DynamicComponent;
     """),
# 作成するファイルの定義
    ('frontend/components/CollaborationHub', 'ChatInterface.js', def_domain + """
ChatInterface.jsファイルにSlackクローンのチャットコンポーネントを実装してください。以下の機能を含めてください：
- チャンネルリスト表示（左サイドバー）
- メッセージリスト表示（中央エリア）
- メッセージ入力フォーム（下部）
- ユーザー情報とステータス表示（上部）
- チャンネル検索機能
- メッセージへの絵文字リアクション
- スレッド返信機能
- ファイル添付機能（アイコンのみ）
レイアウトは固定高さを使用し、オーバーフローする部分のみスクロール可能にしてください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/CollaborationHub', 'MarkdownEditor.js', def_domain + """
MarkdownEditor.jsファイルにNotionライクなWikiコンポーネントを実装してください。主な機能：
- 階層構造のページ管理
- ブロックベースの編集システム
- マークダウン記法サポート
- 共同編集機能
- フルテキスト検索
- 外部サービス連携
レスポンシブデザインを採用し、モバイルデバイスでも使いやすいインターフェースにしてください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/ProjectDashboard', 'Dashboard.js', def_domain + """
Dashboard.jsファイルにプロジェクト管理ダッシュボードコンポーネントを実装してください。主な機能：
- プロジェクト概要と進捗状況表示
- タスク管理（追加、編集、削除、ドラッグ＆ドロップ）
- ガントチャート
- チームメンバーのタイムゾーン表示
- リソース管理
- レポートと分析機能
- 通知とリマインダー
Tailwind CSSを使用し、和風モダンなテイストで実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend', 'styles.css', def_domain + """
styles.cssファイルにグローバルスタイルを記載してください。Tailwind CSSを使用し、以下を含めてください：
- レスポンシブデザイン
- ダークモード対応
- カスタムカラーパレット（プライマリ：#4A90E2、セカンダリ：#50E3C2、アクセント：#F5A623）
- 日本語フォント：Noto Sans JP
- 英語フォント：Roboto
- 基本フォントサイズ：16px
"""),
    ('frontend/components/SaaSPackageManager', 'SaaSList.js', def_domain + """
SaaSList.jsファイルにSaaSの一覧表示と管理機能を実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/SaaSPackageManager', 'PackageList.js', def_domain + """
PackageList.jsファイルにパッケージの一覧表示と管理機能を実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/SaaSPackageManager', 'ItemCard.js', def_domain + """
ItemCard.jsファイルに個々のSaaSまたはパッケージの詳細表示カードを実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/IDE', 'MonacoEditor.js', def_domain + """
MonacoEditor.jsファイルにMonaco Editorを使用したコードエディタコンポーネントを実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/IDE', 'FileExplorer.js', def_domain + """
FileExplorer.jsファイルにプロジェクトファイル構造の表示と操作機能を実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/IDE', 'OutputConsole.js', def_domain + """
OutputConsole.jsファイルにコンパイル結果やログの表示機能を実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/CollaborationHub', 'FileSharing.js', def_domain + """
FileSharing.jsファイルにチーム内でのファイル共有機能を実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/ProjectDashboard', 'VersionControl.js', def_domain + """
VersionControl.jsファイルにGitを使用したバージョン管理インターフェースを実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/ProjectDashboard', 'TaskBoard.js', def_domain + """
TaskBoard.jsファイルにカンバンスタイルのタスク管理ボードを実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/ProjectDashboard', 'PriorityVoting.js', def_domain + """
PriorityVoting.jsファイルに機能の優先順位付けのための投票システムを実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/ProjectDashboard', 'ProgressChart.js', def_domain + """
ProgressChart.jsファイルにプロジェクト進捗の可視化チャートを実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/Common', 'Sidebar.js', def_domain + """
Sidebar.jsファイルにアプリケーション全体のナビゲーションサイドバーを実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/Common', 'Header.js', def_domain + """
Header.jsファイルに上部のヘッダーコンポーネントを実装してください。ユーザー情報、通知などを表示してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/components/Common', 'Modal.js', def_domain + """
Modal.jsファイルに再利用可能なモーダルコンポーネントを実装してください。
APIはuseEffectでダミーデータを使用してください。
"""),
    ('frontend/styles', 'global.css', def_domain + """
global.cssファイルにアプリケーション全体のグローバルスタイルを記載してください。
"""),
    ('frontend/styles/components', 'SaaSPackageManager.css', def_domain + """
SaaSPackageManager.cssファイルにSaaS・パッケージマネージャー関連のスタイルを記載してください。
"""),
    ('frontend/styles/components', 'IDE.css', def_domain + """
IDE.cssファイルに統合開発環境（IDE）関連のスタイルを記載してください。
"""),
    ('frontend/styles/components', 'CollaborationHub.css', def_domain + """
CollaborationHub.cssファイルにコラボレーションハブ関連のスタイルを記載してください。
"""),
    ('frontend/styles/components', 'ProjectDashboard.css', def_domain + """
ProjectDashboard.cssファイルにプロジェクトダッシュボード関連のスタイルを記載してください。
"""),
    ('frontend/utils', 'api.js', def_domain + """
api.jsファイルにAPIリクエスト関連のユーティリティ関数を実装してください。
"""),
    ('frontend/utils', 'auth.js', def_domain + """
auth.jsファイルに認証関連のユーティリティ関数を実装してください。
"""),
    ('frontend/utils', 'helpers.js', def_domain + """
helpers.jsファイルに汎用的なヘルパー関数を実装してください。
"""),
]