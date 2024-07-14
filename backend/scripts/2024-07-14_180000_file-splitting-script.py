import os
import subprocess
import datetime

def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)
        print(f"Created directory: {path}")

def write_file(path, content):
    if os.path.exists(path):
        response = input(f"File {path} already exists. Do you want to overwrite it? (yes/no): ").lower()
        if response != 'yes':
            print(f"Skipping file: {path}")
            return
    
    with open(path, 'w') as file:
        file.write(content)
    print(f"Wrote file: {path}")

def main():
    # Create directory structure
    directories = [
        'src',
        'src/config',
        'src/api',
        'src/services',
        'src/models',
        'src/utils',
        'src/scripts'
    ]
    for directory in directories:
        create_directory(directory)

    # File contents
    files = {
        'src/main.py': '''
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router
from api.websocket import websocket_endpoint
from utils.logging_config import setup_logging

app = FastAPI()

# CORSの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーターの追加
app.include_router(router)

# WebSocketの追加
app.add_websocket_route("/ws", websocket_endpoint)

# ロギングの設定
setup_logging()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
''',

        'src/config/settings.py': '''
import os
from dotenv import load_dotenv

load_dotenv()

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
''',

        'src/api/__init__.py': '',

        'src/api/routes.py': '''
from fastapi import APIRouter, HTTPException
from models.code_execution import CodeExecution
from services.anthropic_service import generate_text_anthropic
from services.gemini_service import generate_text_gemini
from services.openai_service import generate_text_gpt4o
from services.file_service import save_file, load_file, get_directory_structure, get_generated_dirs
from utils.file_operations import execute_python

router = APIRouter()

@router.post("/hello")
async def hello():
    return {"message": "hello"}

@router.post("/generate_claude")
async def generate_text(prompt: str):
    return await generate_text_anthropic(prompt)

@router.post("/generate_gemini")
async def generate_text_gemini_route(prompt: str):
    return await generate_text_gemini(prompt)

@router.post("/generate_gpt4o")
async def generate_text_gpt4o_route(prompt: str):
    return await generate_text_gpt4o(prompt)

@router.post("/execute")
async def execute_python_route(code_execution: CodeExecution):
    return await execute_python(code_execution.code)

@router.post("/save_file")
async def save_file_route(file_content: dict):
    return await save_file(file_content)

@router.get("/load_file")
async def load_file_route(filename: str):
    return await load_file(filename)

@router.get("/directory_structure")
async def get_directory_structure_route(path_type: str):
    return await get_directory_structure(path_type)

@router.get("/api/generated-dirs")
async def get_generated_dirs_route():
    return await get_generated_dirs()

@router.post("/create_new_system")
async def create_new_system_route(name: str):
    # Implement the create_new_system function
    pass
''',

        'src/api/websocket.py': '''
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
''',

        'src/services/__init__.py': '',

        'src/services/anthropic_service.py': '''
from anthropic import Anthropic
import asyncio
import logging

logger = logging.getLogger(__name__)

anthropic_client = Anthropic()

async def generate_text_anthropic(prompt: str):
    logger.info(f"Anthropicリクエストを受信: prompt={prompt}")
    try:
        message = await asyncio.to_thread(
            anthropic_client.messages.create,
            model="claude-3-5-sonnet-20240620",
            max_tokens=4000,
            temperature=1,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        logger.info("Anthropicでテキスト生成成功")
        logger.info(message.content[0].text)
        return {"generated_text": message.content[0].text}
    except Exception as e:
        logger.error(f"Anthropicでのテキスト生成中にエラーが発生: {str(e)}")
        raise
''',

        'src/services/gemini_service.py': '''
import google.generativeai as genai
import asyncio
import logging
from config.settings import GEMINI_API_KEY

logger = logging.getLogger(__name__)

genai.configure(api_key=GEMINI_API_KEY)

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

gemini_model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
)

async def generate_text_gemini(prompt: str):
    logger.info(f"Geminiリクエストを受信: prompt={prompt}")
    try:
        chat = gemini_model.start_chat(history=[])
        response = await asyncio.to_thread(
            chat.send_message,
            prompt + "コードはコードブロックに入れる 例 ```html <h1>Hello, World!</h1> ```"
        )
        logger.info("Geminiでテキスト生成成功")
        logger.info(response.text)
        return {"generated_text": response.text}
    except Exception as e:
        logger.error(f"Geminiでのテキスト生成中にエラーが発生: {str(e)}")
        raise
''',

        'src/services/openai_service.py': '''
from openai import AsyncOpenAI
import logging
from config.settings import OPENAI_API_KEY

logger = logging.getLogger(__name__)

openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)

async def generate_text_gpt4o(prompt: str):
    logger.info(f"GPT-4oリクエストを受信: prompt={prompt}")
    try:
        response = await openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=1,
            max_tokens=4000,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        generated_text = response.choices[0].message.content.strip()
        logger.info("GPT-4oでテキスト生成成功")
        logger.info(generated_text)
        return {"generated_text": generated_text}
    except Exception as e:
        logger.error(f"GPT-4oでのテキスト生成中にエラーが発生: {str(e)}")
        raise
''',

        'src/services/file_service.py': '''
import os
import json
import logging
import aiofiles
from fastapi import HTTPException

logger = logging.getLogger(__name__)

async def save_file(file_content):
    logger.info(f"ファイル保存リクエストを受信: {file_content['filename']}")
    try:
        async with aiofiles.open(file_content['filename'], "w") as f:
            await f.write(file_content['content'])
        logger.info(f"ファイルの保存に成功: {file_content['filename']}")
        return {"message": "File saved successfully"}
    except Exception as e:
        logger.error(f"ファイルの保存中にエラーが発生: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

async def load_file(filename: str):
    logger.info(f"ファイル読み込みリクエストを受信: {filename}")
    try:
        async with aiofiles.open(filename, "r") as f:
            content = await f.read()
        logger.info(f"ファイルの読み込みに成功: {filename}")
        return content
    except FileNotFoundError:
        logger.error(f"ファイルが見つかりません: {filename}")
        raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        logger.error(f"ファイルの読み込み中にエラーが発生: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

async def get_directory_structure(path_type: str):
    # Implement the get_directory_structure function
    pass

async def get_generated_dirs():
    # Implement the get_generated_dirs function
    pass
''',

        'src/models/code_execution.py': '''
from pydantic import BaseModel

class CodeExecution(BaseModel):
    code: str
''',

        'src/utils/__init__.py': '',

        'src/utils/logging_config.py': '''
import logging

def setup_logging():
    logging.basicConfig(level=logging.DEBUG)
    logger = logging.getLogger(__name__)
    return logger
''',

        'src/utils/file_operations.py': '''
import tempfile
import os
import asyncio
import logging

logger = logging.getLogger(__name__)

async def execute_python(code: str):
    logger.info("受信したコードを取得しました")
    logger.info(f"実行するコード:\n{code}")
    
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
''',
    }

    # Write files
    for file_path, content in files.items():
        write_file(file_path, content.strip())

if __name__ == "__main__":
    main()