from fastapi import WebSocket
import logging

# ロガーの設定を変更して、全てのログレベルを出力するようにします
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# コンソールハンドラを追加して、全てのログを出力します
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

active_connections = []

async def websocket_endpoint(websocket: WebSocket):
    logger.info("WebSocket接続を受け入れます")
    await websocket.accept()
    active_connections.append(websocket)
    logger.info(f"アクティブな接続数: {len(active_connections)}")
    try:
        while True:
            message = await websocket.receive_text()
            logger.debug(f"受信したメッセージ: {message}")
    except Exception as e:
        logger.error(f"WebSocket接続中にエラーが発生: {str(e)}", exc_info=True)
    finally:
        active_connections.remove(websocket)
        logger.info(f"WebSocket接続が閉じられました。残りの接続数: {len(active_connections)}")

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
            logger.error(f"フロントエンドへの送信中にエラーが発生: {str(e)}", exc_info=True)
    
    logger.info(f"フロントエンドへの送信完了。送信先の接続数: {len(active_connections)}")