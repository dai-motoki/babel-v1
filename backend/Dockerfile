# python:3.9 イメージをベースとして使用
FROM python:3.9

# ワーキングディレクトリを /app に設定
WORKDIR /app

# 必要なシステムパッケージをインストール
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential libcairo2-dev libpango1.0-dev libjpeg62-turbo-dev libgif-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# requirements.txt をコピー
COPY ./requirements.txt ./requirements.txt

# 依存関係をインストール
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# アプリケーションのソースコードをコピー
COPY . /app

# ポート 8000 を公開
EXPOSE 8000
