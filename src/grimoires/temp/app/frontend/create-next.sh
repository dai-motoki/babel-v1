#!/bin/bash

# プロジェクト名を固定
PROJECT_NAME="frontend-next"
# TypeScriptを使用するかどうかのフラグ（デフォルトはyes）
USE_TYPESCRIPT=${1:-yes}

# TypeScriptフラグを小文字に変換
USE_TYPESCRIPT=$(echo $USE_TYPESCRIPT | tr '[:upper:]' '[:lower:]')

# Vercel CLIがインストールされているか確認
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLIがインストールされていません。インストールします..."
    npm install -g vercel
fi

# 既存のappディレクトリがあれば削除
if [ -d "$PROJECT_NAME" ]; then
    echo "既存の $PROJECT_NAME ディレクトリを削除します..."
    rm -rf "$PROJECT_NAME"
fi

# Next.jsプロジェクトを作成（TypeScriptの選択を自動化、srcディレクトリなし）
if [ "$USE_TYPESCRIPT" = "yes" ]; then
    npx create-next-app@latest $PROJECT_NAME --typescript --eslint --tailwind --app --no-src-dir --import-alias "@/*" --use-app-router
else
    npx create-next-app@latest $PROJECT_NAME --js --eslint --tailwind --app --no-src-dir --import-alias "@/*" --use-app-router
fi

# 注意: --src-dir=falseオプションを--no-src-dirに変更しました。
# これにより、srcディレクトリを使用するかどうかの質問が表示されなくなり、
# 自動的にsrcディレクトリを使用しない設定になります。

# 注意: srcディレクトリを使用しないオプション（--src-dir=false）を追加しました。
# これにより、プロジェクトのルートディレクトリに直接ファイルが配置されます。

# プロジェクトディレクトリに移動
cd $PROJECT_NAME


# ローカルでプロジェクトを立ち上げる
echo "ローカルでプロジェクトを立ち上げます..."

# 依存関係をインストール
echo "依存関係をインストールしています..."
npm install

# 開発サーバーを起動
echo "開発サーバーを起動しています..."
npm run dev

# ブラウザで開くためのURLを表示
echo "プロジェクトが http://localhost:3000 で実行されています。"
echo "ブラウザでこのURLを開いて、アプリケーションを確認してください。"

# 開発サーバーの停止方法を表示
echo "開発サーバーを停止するには、Ctrl+C を押してください。"


# # gitリポジトリを初期化（まだ初期化されていない場合）
# if [ ! -d .git ]; then
#     git init
# fi

# .gitignoreファイルを作成または追記
echo "node_modules" >> .gitignore
echo ".next" >> .gitignore
echo ".env.local" >> .gitignore
echo ".vercel" >> .gitignore

# # 初期コミットを作成
# git add .
# git commit -m "Initial commit"

# echo "Next.jsプロジェクト「$PROJECT_NAME」のセットアップが完了しました。"
# if [ "$USE_TYPESCRIPT" = "yes" ]; then
#     echo "TypeScriptを使用して設定されました。"
# else
#     echo "JavaScriptを使用して設定されました。"
# fi

# # Vercelへのデプロイ
# echo "Vercelへのデプロイを開始します..."
# vercel --confirm

# echo "セットアップとデプロイが完了しました。"
# echo "Vercelのダッシュボードで詳細を確認できます。"