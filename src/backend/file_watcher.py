import asyncio
import os
import logging
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from fastapi import FastAPI, WebSocket, HTTPException, Body
from fastapi.websockets import WebSocketDisconnect
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可（本番環境では適切に制限してください）
    allow_credentials=True,
    allow_methods=["*"],  # すべてのメソッドを許可
    allow_headers=["*"],  # すべてのヘッダーを許可
)

# ロギングの設定
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S')

# グローバル変数としてconnected_clientsを定義
connected_clients = set()
file_handler = None

class FileChangeHandler(FileSystemEventHandler):
    def __init__(self, watched_dirs):
        logging.info("FileChangeHandlerが初期化されました")
        self.changes = set()
        self.watched_dirs = watched_dirs

    def on_any_event(self, event):
        logging.debug(f"イベント検知: {event.event_type} - {event.src_path}")
        if any(event.src_path.startswith(dir) for dir in self.watched_dirs):
            self.changes.add((event.event_type, event.src_path))
            logging.info(f"変更検知: {event.event_type} - {event.src_path}")
        else:
            logging.debug(f"監視対象外のパス: {event.src_path}")

def setup_file_watcher():
    global file_handler
    home_dir = os.path.expanduser("~")
    babel_generated_dir = os.path.join(home_dir, "babel_generated")

    watched_dirs = [babel_generated_dir]
    logging.info(f"監視対象ディレクトリ: {watched_dirs}")
    file_handler = FileChangeHandler(watched_dirs)
    observer = Observer()

    for dir in watched_dirs:
        observer.schedule(file_handler, path=dir, recursive=True)
        logging.debug(f"ディレクトリを監視に追加: {dir}")
    observer.start()
    logging.info("ファイル監視を開始しました")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    global connected_clients
    await websocket.accept()
    connected_clients.add(websocket)
    logging.info(f"新しいWebSocket接続: {websocket.client}")
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        connected_clients.remove(websocket)
        logging.info(f"WebSocket接続が切断されました: {websocket.client}")

async def broadcast_changes():
    logging.info("変更ブロードキャストタスクを開始しました")
    while True:
        if file_handler.changes:
            changes = list(file_handler.changes)
            message = {"changes": [{"type": change[0], "path": change[1]} for change in changes]}
            logging.info(f"変更をブロードキャスト: {message}")
            file_handler.changes.clear()
            for client in connected_clients:
                await client.send_json(message)
                logging.debug(f"クライアントに変更を送信: {client.client}")
        await asyncio.sleep(1)  # 1秒間隔で変更をチェック

@app.on_event("startup")
async def startup_event():
    logging.info("アプリケーションが起動しました")
    setup_file_watcher()
    asyncio.create_task(broadcast_changes())

@app.post("/api/save-file")
async def save_file(file_path: str = Body(...), content: str = Body(...)):
    logging.info(f"ファイル保存リクエスト: {file_path}")
    try:
        # 1つ上の階層をベースにしてファイルパスを構築
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        full_path = os.path.join(base_dir, file_path)
        logging.debug(f"保存先フルパス: {full_path}")
        
        # ファイルが指定されたディレクトリ内にあることを確認
        if not os.path.abspath(full_path).startswith(base_dir):
            logging.warning(f"無効なファイルパス: {full_path}")
            raise HTTPException(status_code=400, detail="無効なファイルパスです")
        
        # ディレクトリが存在しない場合は作成
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        logging.debug(f"ディレクトリを作成: {os.path.dirname(full_path)}")
        
        with open(full_path, 'w', encoding='utf-8') as file:
            file.write(content)
        logging.info(f"ファイルを保存しました: {full_path}")
        return JSONResponse(content={"message": "ファイルが正常に保存されました"}, status_code=200)
    except Exception as e:
        logging.error(f"ファイルの保存中にエラーが発生しました: {str(e)}")
        raise HTTPException(status_code=500, detail=f"ファイルの保存中にエラーが発生しました: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    logging.info("サーバーを起動しています...")
    uvicorn.run(app, host="0.0.0.0", port=8001, reload=True)

    # このスクリプトをコマンドラインで実行する方法：
    # 1. ターミナルを開き、このファイルがあるディレクトリに移動します。
    # 2. 以下のコマンドを実行します：
    #    uvicorn file_watcher:app --host 0.0.0.0 --port 8001 --reload
    #
    # 注意事項：
    # - uvicornがインストールされていることを確認してください。
    # - ホストを0.0.0.0に設定することで、ローカルネットワーク内の他のデバイスからもアクセス可能になります。
    # - ポート8001を使用していますが、必要に応じて変更可能です。
    # - --reloadオプションを使用することで、コードの変更時に自動的にサーバーが再起動されます。
