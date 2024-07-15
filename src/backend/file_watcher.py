import asyncio
import os
import logging
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from fastapi import FastAPI, WebSocket, HTTPException, Body
from fastapi.websockets import WebSocketDisconnect
from fastapi.responses import JSONResponse

app = FastAPI()

# ロギングの設定
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S')

class FileChangeHandler(FileSystemEventHandler):
    def __init__(self, watched_dirs):
        self.changes = set()
        self.watched_dirs = watched_dirs

    def on_any_event(self, event):
        if event.is_directory:
            return
        # イベントが監視対象のディレクトリ内で発生したかチェック
        if any(event.src_path.startswith(dir) for dir in self.watched_dirs):
            self.changes.add((event.event_type, event.src_path))
            logging.info(f"変更検知: {event.event_type} - {event.src_path}")

# 監視対象のディレクトリを絶対パスで指定
current_dir = os.path.dirname(os.path.abspath(__file__))
generated_dir = os.path.abspath(os.path.join(current_dir, "..", "..", "generated"))
src_dir = os.path.abspath(os.path.join(current_dir, "..", "..", "src"))

watched_dirs = [generated_dir, src_dir]
file_handler = FileChangeHandler(watched_dirs)
observer = Observer()

for dir in watched_dirs:
    observer.schedule(file_handler, path=dir, recursive=True)
observer.start()

connected_clients = set()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
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
    while True:
        if file_handler.changes:
            changes = list(file_handler.changes)
            message = {"changes": [{"type": change[0], "path": change[1]} for change in changes]}
            logging.info(f"変更をブロードキャスト: {message}")
            file_handler.changes.clear()
            for client in connected_clients:
                await client.send_json(message)
        await asyncio.sleep(1)  # 1秒間隔で変更を��ェック

@app.on_event("startup")
async def startup_event():
    logging.info("アプリケーションが起動しました")
    asyncio.create_task(broadcast_changes())

@app.post("/api/save-file")
async def save_file(file_path: str = Body(...), content: str = Body(...)):
    try:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        return JSONResponse(content={"message": "ファイルが正常に保存されました"}, status_code=200)
    except Exception as e:
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
    # - ホストを0.0.0.0に設定することで、ローカルネットワーク��の他のデバイスからもアクセス可能になります。
    # - ポート8001を使用していますが、必要に応じて変更可能です。
    # - --reloadオプションを使用すること、コードの変更時に自動的にサーバーが再起動されます。
