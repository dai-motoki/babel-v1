# node:18-alpine イメージをベースとして使用
FROM node:18-alpine AS build

# ワーキングディレクトリを /app に設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# ビルドを実行
RUN npm run build ; exit 0

# 実行用のイメージとして node:18-alpine を使用
FROM node:18-alpine

# ワーキングディレクトリを /app に設定
WORKDIR /app

# ビルドした成果物をコピー
COPY --from=build /app/.next ./
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./

# 依存関係をインストール
RUN npm install

# ポート 3001 を公開
EXPOSE 3001
