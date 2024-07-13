
# プロジェクト バベル

>[!WARNING]
>プロジェクト バベルは実験的なプロジェクトです。フロントエンドモックのみでバックエンドは未完成のものも多くあります。
>これらはブランチごとに管理する予定です。

## 🚀 クイックスタート

### 🐳 Docker を使用した環境構築

1. リポジトリをクローンします：
   ```bash
   git clone https://github.com/dai-motoki/babel-v1.git
   cd babel-v1
   ```

2. 環境変数を設定します：
   ```bash
   cp .env.example .env
   # .envファイルを編集し、必要なAPI鍵を設定します
   ```

3. Docker Compose でサービスを起動します：
   ```bash
   docker-compose up --build
   ```

4. ブラウザで以下のURLにアクセスします：
   - フロントエンド: http://localhost:3001
   - バックエンドAPI: http://localhost:8000

### 🖥️ ローカル環境での開発

#### フロントエンド (Next.js)

1. プロジェクトのルートディレクトリに移動します。

2. 依存関係をインストールします：
   ```bash
   npm install
   ```

3. 開発サーバーを起動します：
   ```bash
   npm run dev
   ```

4. ブラウザで `http://localhost:3001` を開いてアプリケーションを確認します。

#### バックエンド (FastAPI)

1. `backend` ディレクトリに移動します：
   ```bash
   cd backend
   ```

2. 仮想環境を作成し、アクティベートします（オプション）：
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linuxの場合
   # または
   venv\Scripts\activate  # Windowsの場合
   ```

3. 依存関係をインストールします：
   ```bash
   pip install -r requirements.txt
   ```

4. バックエンドサーバーを起動します：
   ```bash
   uvicorn app:app --reload --port 8000
   ```

5. 別のターミナルでファイルウォッチャーを起動します：
   ```bash
   python file_watcher.py
   ```

## 🛠️ 開発者向け情報

- フロントエンドのAPIエンドポイントは環境変数 `NEXT_PUBLIC_BACKEND_URL` で動的に設定できます。
- バックエンドの依存関係は `backend/requirements.txt` に記載されています。
- Node.jsの依存関係のバージョンは `package.json` で固定されています。

## 🔑 環境変数

プロジェクトルートの `.env` ファイルに以下の環境変数を設定してください：

```
GEMINI_API_KEY=AIxxxxx
OPENAI_API_KEY=sk-xxxxx
```

## 📝 注意事項

>[!WARNING]
>実際の環境設定や依存関係は、プロジェクトの具体的な構成によって異なる場合があります。必要に応じて、プロジェクトの設定ファイルを確認してください。
