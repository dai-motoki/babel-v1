import tempfile
import os
import asyncio
import logging

logger = logging.getLogger(__name__)

async def execute_python(code: str):
    logger.info("受信したコードを取得しました")
    logger.info(f"実行するコード: {code}")
    
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as temp_file:
        temp_file.write(code)
        temp_file_path = temp_file.name
        logger.info(f"一時ファイルを作成しました: {temp_file_path}")

    try:
        logger.info("サブプロセスでPythonコードを実行します")
        process = await asyncio.create_subprocess_exec(
            'python', temp_file_path,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()
        
        if process.returncode != 0:
            logger.error(f"実行エラーが発生しました: {stderr.decode()}")
            return {"error": stderr.decode(), "output": stdout.decode()}
        
        logger.info("Pythonコードの実行に成功しました")
        return {"output": stdout.decode()}
    except asyncio.TimeoutError:
        logger.error("実行がタイムアウトしました")
        return {"error": "実行がタイムアウトしました", "output": ""}
    finally:
        os.unlink(temp_file_path)
        logger.info(f"一時ファイルを削除しました: {temp_file_path}")

# 追記された内容:
# # ファイル操作ユーティリティ
# ファイル操作ユーティリティ
import os

def get_file_size(file_path: str) -> int:
    return os.path.getsize(file_path)

def ensure_directory_exists(directory: str):
    if not os.path.exists(directory):
        os.makedirs(directory)

def read_file(file_path: str) -> str:
    with open(file_path, 'r') as file:
        return file.read()

def write_file(file_path: str, content: str):
    with open(file_path, 'w') as file:
        file.write(content)

def append_to_file(file_path: str, content: str):
    with open(file_path, 'a') as file:
        file.write(content)
