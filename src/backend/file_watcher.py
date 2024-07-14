import asyncio
import os
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from fastapi import FastAPI, WebSocket
from fastapi.websockets import WebSocketDisconnect

app = FastAPI()

class FileChangeHandler(FileSystemEventHandler):
    def __init__(self):
        self.changes = set()

    def on_any_event(self, event):
        if event.is_directory:
            return
        self.changes.add((event.event_type, event.src_path))

file_handler = FileChangeHandler()
observer = Observer()
observer.schedule(file_handler, path="../generated/", recursive=True)
observer.start()

connected_clients = set()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.add(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        connected_clients.remove(websocket)

async def broadcast_changes():
    while True:
        if file_handler.changes:
            changes = list(file_handler.changes)
            message = {"changes": [{"type": change[0], "path": change[1]} for change in changes]}
            # print(message)
            file_handler.changes.clear()
            for client in connected_clients:
                await client.send_json(message)
        await asyncio.sleep(1)  # 1秒間隔で変更をチェック

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(broadcast_changes())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)