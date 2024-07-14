from fastapi import WebSocket
import logging

logger = logging.getLogger(__name__)

active_connections = []

async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            await websocket.receive_text()
    finally:
        active_connections.remove(websocket)

async def send_to_frontend(message: str):
    logger.info(f"フロントエンドへの送信を開始: {message}")
    for connection in active_connections:
        try:
            await connection.send_json({
                "type": "zoltraak_output",
                "content": message
            })
            logger.debug(f"フロントエンドに送信成功: {message}")
        except Exception as e:
            logger.error(f"フロントエンドへの送信中にエラーが発生: {str(e)}")
    
    logger.info("フロントエンドへの送信完了")