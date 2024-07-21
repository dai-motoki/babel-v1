import os
import json
from fastapi import APIRouter, HTTPException
from models.code_execution import CodeExecution
from services.anthropic_service import generate_text_anthropic
from services.gemini_service import generate_text_gemini
from services.openai_service import generate_text_gpt4o
from services.file_service import save_file, load_file, get_directory_structure, get_generated_dirs
from utils.file_operations import execute_python
import shutil

import logging

logger = logging.getLogger(__name__)

router = APIRouter()

from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from services.file_service import FileService
from models.file import FileModel, FileEdit

router = APIRouter(prefix="/api/files", tags=["files"])
file_service = FileService()


router = APIRouter(prefix="/api/files", tags=["files"])
file_service = FileService(upload_dir="../")  # ベースディレクトリを設定

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        result = await file_service.save_file(file)
        return {"filename": result.filename, "size": result.size}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/list")
async def list_files():
    files = await file_service.list_files()
    return {"files": [FileModel(filename=f.filename, size=f.size).dict() for f in files]}

@router.get("/content/{file_path:path}")
async def get_file_content(file_path: str):
    try:
        content = await file_service.get_file_content(file_path)
        return {"filename": file_path, "content": content}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/edit/{filename}")
async def edit_file(filename: str, edit: FileEdit):
    try:
        await file_service.edit_file(filename, edit.line_number, edit.new_content)
        return {"message": f"File {filename} edited successfully"}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/append/{filename}")
async def append_to_file(filename: str, content: str = Query(...)):
    try:
        await file_service.append_to_file(filename, content)
        return {"message": f"Content appended to {filename} successfully"}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")

@router.delete("/delete/{filename}")
async def delete_file(filename: str):
    try:
        await file_service.delete_file(filename)
        return {"message": f"File {filename} deleted successfully"}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")






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
    logger.info(f"ディレクトリ構造の取得リクエストを受信: path_type={path_type}")
    try:
        result = await get_directory_structure(path_type)
        logger.info(f"ディレクトリ構造の取得に成功: path_type={path_type}")
        return result
    except Exception as e:
        logger.error(f"ディレクトリ構造の取得中にエラーが発生: path_type={path_type}, エラー={str(e)}")
        raise HTTPException(status_code=500, detail="ディレクトリ構造の取得に失敗しました")

@router.get("/generated-dirs")
async def get_generated_dirs_route():
    logger.info("生成されたディレクトリの取得を開始します")
    try:
        result = await get_generated_dirs()
        logger.info(f"生成されたディレクトリの取得に成功しました: {result}")
        return result
    except Exception as e:
        logger.error(f"生成されたディレクトリの取得中にエラーが発生しました: {str(e)}")
        raise HTTPException(status_code=500, detail="ディレクトリの取得に失敗しました")

@router.post("/create_new_system")
async def create_new_system(name: str):
    logger.info(f"新しいシステムの作成リクエストを受信: {name}")
    
    # ホームディレクトリにbabel_generatedディレクトリを作成
    home_dir = os.path.expanduser("~")
    new_dir_path = os.path.join(home_dir, "babel_generated", name)
    os.makedirs(new_dir_path, exist_ok=True)
    logger.info(f"新しいシステムディレクトリを作成しました: {new_dir_path}")
    
    # # 基本的なサブディレクトリを作成
    # subdirs = ['exe_history', 'frontend', 'backend', 'middleware', 'docs', 'tests', 'resources', 'database', 'logs', 'locales', 'meta']
    # # exe_historyには、実行履歴と、各種ファイルの要約が入る
    # for subdir in subdirs:
    #     subdir_path = os.path.join(new_dir_path, subdir)
    #     os.makedirs(subdir_path, exist_ok=True)
        
    #     # サブディレクトリごとにREADMEを作成
    #     readme_path = os.path.join(subdir_path, "README.md")
    #     with open(readme_path, "w") as f:
    #         f.write(f"# {name} - {subdir}\n\n{subdir}ディレクトリの概要と使用方法")
    
    # # メインのREADMEファイルを作成
    # main_readme_path = os.path.join(new_dir_path, "README.md")
    # with open(main_readme_path, "w") as f:
    #     f.write(f"# {name}\n\nシステム概要と主要機能の説明\n\n## ディレクトリ構造\n\n" + "\n".join(f"- {subdir}" for subdir in subdirs))
    
    # ../grimoires/temp/ディレクトリの内容をコピー XXX Grimoires は一旦選べるように、のちに変更できるように。
    temp_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'grimoires', 'temp')
    if os.path.exists(temp_dir):
        for item in os.listdir(temp_dir):
            s = os.path.join(temp_dir, item)
            d = os.path.join(new_dir_path, item)
            if os.path.isdir(s):
                shutil.copytree(s, d, dirs_exist_ok=True)
            else:
                shutil.copy2(s, d)
        logger.info(f"../grimoires/temp/の内容を '{new_dir_path}' にコピーしました")
    else:
        logger.warning("../grimoires/temp/ディレクトリが見つかりません")
    
    # # 設定ファイルを作成
    # config_path = os.path.join(new_dir_path, "config.json")
    # with open(config_path, "w") as f:
    #     json.dump({"system_name": name, "version": "1.0.0", "supported_languages": ["ja", "en"]}, f, indent=2)
    
    # # 依存関係ファイルを作成
    # requirements_path = os.path.join(new_dir_path, "requirements.txt")
    # with open(requirements_path, "w") as f:
    #     f.write("# Pythonの依存パッケージをここにリストアップ\ni18n\n")
    
    # # 初期化スクリプトを作成
    # init_script_path = os.path.join(new_dir_path, "init.py")
    # with open(init_script_path, "w") as f:
    #     f.write("# システムの初期化処理をここに記述\n# i18n設定\nfrom i18n import load_path, set as set_i18n\nload_path.append('./locales')\nset_i18n('locale', 'ja')\n")
    
    # # CI/CD設定ファイルを作成
    # ci_dir_path = os.path.join(new_dir_path, ".github", "workflows")
    # os.makedirs(ci_dir_path, exist_ok=True)
    # ci_config_path = os.path.join(ci_dir_path, "main.yml")
    # with open(ci_config_path, "w") as f:
    #     f.write("# GitHub Actionsのワークフロー定義をここに記述\n")
    
    # # 環境変数テンプレートファイルを作成
    # env_template_path = os.path.join(new_dir_path, ".env.example")
    # with open(env_template_path, "w") as f:
    #     f.write("# 環境変数のテンプレート\nAPI_KEY=your_api_key_here\nDEBUG=False\nDEFAULT_LANGUAGE=ja\n")
    
    # # .gitignoreファイルを作成
    # gitignore_path = os.path.join(new_dir_path, ".gitignore")
    # with open(gitignore_path, "w") as f:
    #     f.write("# Gitで無視するファイルやディレクトリを指定\n.env\n__pycache__/\n*.pyc\n.vscode/\n")
    
    # # LICENSEファイルを作成
    # license_path = os.path.join(new_dir_path, "LICENSE")
    # with open(license_path, "w") as f:
    #     f.write("MIT License\n\nCopyright (c) 2024 Your Name\n\n...")
    
    # # 多言語サポートのためのロケールファイルを作成
    # locales_dir = os.path.join(new_dir_path, "locales")
    # for lang in ["ja", "en"]:
    #     lang_dir = os.path.join(locales_dir, lang)
    #     os.makedirs(lang_dir, exist_ok=True)
    #     translation_file = os.path.join(lang_dir, "translation.json")
    #     with open(translation_file, "w") as f:
    #         json.dump({
    #             "welcome": "ようこそ" if lang == "ja" else "Welcome",
    #             "goodbye": "さようなら" if lang == "ja" else "Goodbye"
    #         }, f, ensure_ascii=False, indent=2)
    
    logger.info(f"新しいシステム '{name}' を作成しました。パス: {new_dir_path}")
    return {"message": f"新しいシステム '{name}' の作成に成功しました", "path": new_dir_path}


    # Implement the create_new_system function
    pass
