import logging
from fastapi import FastAPI, HTTPException, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from anthropic import Anthropic
import os
import google.generativeai as genai
from openai import AsyncOpenAI
from dotenv import load_dotenv
from pydantic import BaseModel
import subprocess
import tempfile
from fastapi.responses import HTMLResponse, JSONResponse
import asyncio
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import logging
import aiofiles
import time
import json

app = FastAPI()
anthropic_client = Anthropic(
    # デフォルトではos.environ.get("ANTHROPIC_API_KEY")を使用します
    # api_key="your_api_key_here"
)

# Google AI の設定
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Geminiモデルの設定
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

# OpenAIクライアントの初期化（非同期クライアントを使用）
openai_client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# ロギングの設定
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# CORSの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# テスト用POSTエンドポイントの追加
@app.post("/hello")
async def hello():
    return {"message": "hello"}

# WebSocket接続を保持するリスト
active_connections = []

@app.websocket("/ws")
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
    
    await asyncio.sleep(0)
    logger.info("フロントエンドへの送信完了")


async def zoltraak_domain_exp(file_name: str):
    logger.info(f"zoltraak_domain_expリクエストを受信: prompt={file_name}")
    try:
        await send_to_frontend("領域展開を開始します")
        command = ["python", "meta/1_domain_exp/domain_exe.py", "-s", file_name]
        
        logger.debug(f"実行するコマンド: {' '.join(command)}")
        
        process = await asyncio.create_subprocess_exec(
            *command,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        
        generated_text = ""
        while True:
            line = await process.stdout.readline()
            if not line:
                break
            decoded_line = line.decode().strip()
            generated_text += decoded_line + "\n"
            await send_to_frontend(decoded_line)
            # フロントエンドにリアルタイムで送信
            await asyncio.gather(*[connection.send_json({
                "type": "zoltraak_output",
                "content": decoded_line
            }) for connection in active_connections])
        
        await process.wait()
        
        if process.returncode == 0:
            logger.info("zoltraak_domain_expでテキスト生成成功")
        else:
            error_message = await process.stderr.read()
            error_message = error_message.decode().strip()
            logger.error(f"zoltraak_domain_expの実行中にエラーが発生: {error_message}")
            generated_text = f"エラーが発生しました: {error_message}"
            await send_to_frontend(generated_text)
        
        await send_to_frontend("領域展開が完了しました")
        
        return generated_text.strip()
    except Exception as e:
        logger.error(f"zoltraak_domain_expでのテキスト生成中に予期せぬエラーが発生: {str(e)}")
        logger.exception("詳細なエラー情報:")
        error_message = f"予期せぬエラーが発生しました: {str(e)}"
        await send_to_frontend(error_message)
        await send_to_frontend("領域展開が完了しました")
        raise

@app.post("/zoltraak_domain_exp")
async def generate_text_zoltraak_domain_exp(prompt: str):
    return {"generated_text": await zoltraak_domain_exp(prompt)}

@app.post("/generate_zoltraak")
async def generate_text_zoltraak(prompt: str):
    logger.info(f"リクエストを受信: prompt={prompt}")
    try:
        command = ["zoltraak", f"\"{prompt}\"", "-r", "../src/components/generated/fileExplorer/src/requirement", 
                   "-cc", "../src/components/generated/requirementsDefinition/metaprompt/dev_obj_local.md"]
        print(f"実行するコマンド: {' '.join(command)}")
        
        process = await asyncio.create_subprocess_exec(
            *command,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        
        generated_text = ""
        while True:
            line = await process.stdout.readline()
            if not line:
                break
            decoded_line = line.decode().strip()
            print(decoded_line)
            generated_text += decoded_line + "\n"
            await send_to_frontend(decoded_line)
            
        await process.wait()
        
        if process.returncode == 0:
            logger.info("Zoltraakでテキスト生成成功")
            logger.info(generated_text)
        else:
            error_message = await process.stderr.read()
            error_message = error_message.decode().strip()
            logger.error(f"Zoltraakコマンドの実行中にエラーが発生: {error_message}")
            generated_text = f"エラーが発生しました: {error_message}"
            await send_to_frontend(generated_text)
        
        return {"generated_text": generated_text.strip()}
    except Exception as e:
        logger.error(f"Zoltraakでのテキスト生成中にエラーが発生: {str(e)}")
        await send_to_frontend(f"エラーが発生しました: {str(e)}")
        raise

# Anthropicクライアントの初期化
anthropic_client = Anthropic()

# Google AI の設定
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Geminiモデルの設定
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



@app.post("/generate_gpt4o")
async def generate_text_gpt4o(prompt: str):
    logger.info(f"GPT-4oリクエストを受信: prompt={prompt}")
    try:
        # OpenAI GPT-4o APIを使用してテキスト生成（非同期処理）
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

class CodeExecution(BaseModel):
    code: str

@app.post("/execute")
async def execute_python(code_execution: CodeExecution):
    code = code_execution.code
    logger.info("受信したコードを取得しました")
    logger.info(f"実行するコード:\n{code}")
    
    # 一時ファイルを作成してPythonコードを書き込む
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as temp_file:
        temp_file.write(code)
        temp_file_path = temp_file.name
        logger.info(f"一時ファイルを作成しました: {temp_file_path}")

    try:
        # サブプロセスでPythonコードを実行（非同期処理）
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
        # 一時ファイルを削除
        os.unlink(temp_file_path)
        logger.info(f"一時ファイルを削除しました: {temp_file_path}")

class FileContent(BaseModel):
    filename: str
    content: str

@app.post("/save_file")
async def save_file(file_content: FileContent):
    logger.info(f"ファイル保存リクエストを受信: {file_content.filename}")
    try:
        async with aiofiles.open(file_content.filename, "w") as f:
            await f.write(file_content.content)
        logger.info(f"ファイルの保存に成功: {file_content.filename}")
        return {"message": "File saved successfully"}
    except Exception as e:
        logger.error(f"ファイルの保存中にエラーが発生: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/load_file")
async def load_file(filename: str):
    logger.info(f"ファイル読み込みリクエストを受信: {filename}")
    try:
        async with aiofiles.open(filename, "r") as f:
            content = await f.read()
        logger.info(f"ファイルの読み込みに成功: {filename}")
        logger.info(f"ファイルの内容:\n{content}")
        # return JSONResponse(content={"content": content})
        return JSONResponse(content=content)
    except FileNotFoundError:
        logger.error(f"ファイルが見つかりません: {filename}")
        raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        logger.error(f"ファイルの読み込み中にエラーが発生: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def read_file_content(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except Exception as e:
        logger.error(f"ファイル読み込み中にエラーが発生しました: {file_path}, エラー: {str(e)}")
        return None

def create_structure(path, base_path):
    structure = []
    for item in os.listdir(path):
        item_path = os.path.join(path, item)
        relative_path = os.path.relpath(item_path, base_path)
        if os.path.isdir(item_path):
            structure.append({
                "name": item,
                "type": "folder",
                "path": relative_path,
                "children": create_structure(item_path, base_path)
            })
        else:
            content = read_file_content(item_path)
            structure.append({
                "name": item,
                "type": "file",
                "path": relative_path,
                "content": content
            })
    return structure

@app.get("/directory_structure")
async def get_directory_structure(path_type: str):
    if path_type == "file_explorer":
        # base_path = "../src/components/generated/fileExplorer"
        base_path = "../src/components/generated/"
    elif path_type == "requirements_definition":
        # base_path = "../src/components/generated/requirementsDefinition"
        base_path = "meta/1_domain_exp"
    elif path_type == "babel":
        base_path = "../src/components/generated/0710_babel"
    else:
        base_path = "../src/components/generated/{}".format(path_type)
        # raise HTTPException(status_code=400, detail="無効なpath_typeです")

    try:
        structure = create_structure(base_path, base_path)
        print(structure)
        logger.info(f"{path_type}のディレクトリ構造を正常に作成しました")
        return {"structure": structure}
    except Exception as e:
        logger.error(f"{path_type}のディレクトリ構造の取得中にエラーが発生しました: {str(e)}")
        raise HTTPException(status_code=500, detail="ディレクトリ構造の取得に失敗しました")

logger.info("アプリケーションが起動しました")



import os

# ... 既存のインポートと設定 ...

def read_file_content(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except Exception as e:
        logger.error(f"ファイル読み込み中にエラーが発生しました: {file_path}, エラー: {str(e)}")
        return None

def create_structure(path, base_path):
    structure = []
    for item in os.listdir(path):
        item_path = os.path.join(path, item)
        relative_path = os.path.relpath(item_path, base_path)
        if os.path.isdir(item_path):
            structure.append({
                "name": item,
                "type": "folder",
                "path": relative_path,
                "children": create_structure(item_path, base_path)
            })
        else:
            content = read_file_content(item_path)
            structure.append({
                "name": item,
                "type": "file",
                "path": relative_path,
                "content": content
            })
    return structure

@app.get("/api/generated-dirs")
async def get_generated_dirs():
    base_path = "../src/components/generated"
    logger.info(f"生成されたディレクトリの取得を開始します。ベースパス: {base_path}")
    try:
        structure = create_structure(base_path, base_path)
        logger.debug(f"ディレクトリ構造を作成しました: {structure}")
        app_dirs = []
        for item in structure:
            if item["type"] == "folder":
                # frontend_path = os.path.join(item["path"], "frontend", "App.js")
                frontend_path = os.path.join(item["path"])
                full_path = os.path.join(base_path, frontend_path)
                logger.debug(f"フロントエンドパスを確認中: {full_path}")
                if os.path.exists(full_path):
                    app_dir = {
                        "name": item["name"],
                        "path": f"./generated/{item['name']}/frontend/App"
                    }
                    app_dirs.append(app_dir)
                    logger.debug(f"アプリディレクトリを追加しました: {app_dir}")
        logger.info(f"生成されたディレクトリを正常に取得しました: {app_dirs}")
        return app_dirs
    except Exception as e:
        logger.error(f"生成されたディレクトリの取得中にエラーが発生しました: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="ディレクトリの取得に失敗しました")



@app.post("/generate_claude")
async def generate_text(prompt: str):
    logger.info(f"リクエストを受信: prompt={prompt}")
    try:
        # Anthropic APIを使用してテキスト生成（非同期処理）
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


@app.post("/generate_gemini")
async def generate_text_gemini(prompt: str):
    logger.info(f"Geminiリクエストを受信: prompt={prompt}")
    try:
        # Gemini APIを使用してテキスト生成（非同期処理）
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


import os
import json
import logging

logger = logging.getLogger(__name__)

@app.post("/create_new_system")
async def create_new_system(name: str):
    logger.info(f"新しいシステムの作成リクエストを受信: {name}")
    
    # ../components/generated/ 直下に新しいディレクトリを作成
    new_dir_path = os.path.join("..", "src", "components", "generated", name)
    os.makedirs(new_dir_path, exist_ok=True)
    
    # 基本的なサブディレクトリを作成
    subdirs = ['exe_history', 'frontend', 'backend', 'middleware', 'docs', 'tests', 'resources', 'database', 'logs', 'locales', 'meta']
    # exe_historyには、実行履歴と、各種ファイルの要約が入る
    for subdir in subdirs:
        subdir_path = os.path.join(new_dir_path, subdir)
        os.makedirs(subdir_path, exist_ok=True)
        
        # サブディレクトリごとにREADMEを作成
        readme_path = os.path.join(subdir_path, "README.md")
        with open(readme_path, "w") as f:
            f.write(f"# {name} - {subdir}\n\n{subdir}ディレクトリの概要と使用方法")
    
    # メインのREADMEファイルを作成
    main_readme_path = os.path.join(new_dir_path, "README.md")
    with open(main_readme_path, "w") as f:
        f.write(f"# {name}\n\nシステム概要と主要機能の説明\n\n## ディレクトリ構造\n\n" + "\n".join(f"- {subdir}" for subdir in subdirs))
    
    # 設定ファイルを作成
    config_path = os.path.join(new_dir_path, "config.json")
    with open(config_path, "w") as f:
        json.dump({"system_name": name, "version": "1.0.0", "supported_languages": ["ja", "en"]}, f, indent=2)
    
    # 依存関係ファイルを作成
    requirements_path = os.path.join(new_dir_path, "requirements.txt")
    with open(requirements_path, "w") as f:
        f.write("# Pythonの依存パッケージをここにリストアップ\ni18n\n")
    
    # 初期化スクリプトを作成
    init_script_path = os.path.join(new_dir_path, "init.py")
    with open(init_script_path, "w") as f:
        f.write("# システムの初期化処理をここに記述\n# i18n設定\nfrom i18n import load_path, set as set_i18n\nload_path.append('./locales')\nset_i18n('locale', 'ja')\n")
    
    # CI/CD設定ファイルを作成
    ci_dir_path = os.path.join(new_dir_path, ".github", "workflows")
    os.makedirs(ci_dir_path, exist_ok=True)
    ci_config_path = os.path.join(ci_dir_path, "main.yml")
    with open(ci_config_path, "w") as f:
        f.write("# GitHub Actionsのワークフロー定義をここに記述\n")
    
    # 環境変数テンプレートファイルを作成
    env_template_path = os.path.join(new_dir_path, ".env.example")
    with open(env_template_path, "w") as f:
        f.write("# 環境変数のテンプレート\nAPI_KEY=your_api_key_here\nDEBUG=False\nDEFAULT_LANGUAGE=ja\n")
    
    # .gitignoreファイルを作成
    gitignore_path = os.path.join(new_dir_path, ".gitignore")
    with open(gitignore_path, "w") as f:
        f.write("# Gitで無視するファイルやディレクトリを指定\n.env\n__pycache__/\n*.pyc\n.vscode/\n")
    
    # LICENSEファイルを作成
    license_path = os.path.join(new_dir_path, "LICENSE")
    with open(license_path, "w") as f:
        f.write("MIT License\n\nCopyright (c) 2024 Your Name\n\n...")
    
    # 多言語サポートのためのロケールファイルを作成
    locales_dir = os.path.join(new_dir_path, "locales")
    for lang in ["ja", "en"]:
        lang_dir = os.path.join(locales_dir, lang)
        os.makedirs(lang_dir, exist_ok=True)
        translation_file = os.path.join(lang_dir, "translation.json")
        with open(translation_file, "w") as f:
            json.dump({
                "welcome": "ようこそ" if lang == "ja" else "Welcome",
                "goodbye": "さようなら" if lang == "ja" else "Goodbye"
            }, f, ensure_ascii=False, indent=2)
    
    logger.info(f"新しいシステム '{name}' を作成しました。パス: {new_dir_path}")
    return {"message": f"新しいシステム '{name}' の作成に成功しました", "path": new_dir_path}

# async def watch_files():
#     files = ['index.html', 'main.py']  # 監視するファイルのリスト
#     base_path = os.path.dirname(os.path.abspath(__file__))  # スクリプトのディレクトリを取得
#     last_modified = {file: os.path.getmtime(os.path.join(base_path, file)) for file in files}
    
#     while True:
#         try:
#             for file in files:
#                 file_path = os.path.join(base_path, file)
#                 current_mtime = os.path.getmtime(file_path)
#                 if current_mtime != last_modified[file]:
#                     last_modified[file] = current_mtime
#                     with open(file_path, 'r') as f:
#                         content = f.read()
#                     logger.info(f"ファイル {file} が変更されました。")
#                     for connection in active_connections:
#                         await connection.send_json({
#                             "file": file,
#                             "content": content
#                         })
#             await asyncio.sleep(1)  # 1秒待機してCPU使用率を抑える
#         except Exception as e:
#             logger.error(f"ファイル監視中にエラーが発生しました: {str(e)}")
#             await asyncio.sleep(5)  # エラー発生時は5秒待機してから再試行



# @app.on_event("startup")
# async def startup_event():
#     logger.info("アプリケーションが起動しました。ファイル監視を開始します。")
#     asyncio.create_task(watch_files())

# Anthropicクライアントの初期化
anthropic_client = Anthropic(
    # デフォルトではos.environ.get("ANTHROPIC_API_KEY")を使用します
    # api_key="your_api_key_here"
)

# Google AI の設定
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Geminiモデルの設定
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

# OpenAIクライアントの初期化（非同期クライアントを使用）
openai_client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


import subprocess