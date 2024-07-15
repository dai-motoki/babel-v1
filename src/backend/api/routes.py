import os
import json
from fastapi import APIRouter, HTTPException
from models.code_execution import CodeExecution
from services.anthropic_service import generate_text_anthropic
from services.gemini_service import generate_text_gemini
from services.openai_service import generate_text_gpt4o
from services.file_service import save_file, load_file, get_directory_structure, get_generated_dirs
from utils.file_operations import execute_python

import logging

logger = logging.getLogger(__name__)

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
    
    # ../components/generated/ 直下に新しいディレクトリを作成
    new_dir_path = os.path.join("..", "..", "generated", name)
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


    # Implement the create_new_system function
    pass

# 追記された内容:
# # FastAPIのルーター設定
# # 依存: fastapi
# from fastapi import APIRouter
# 
# router = APIRouter()
# 

# 追記された内容:
# # FastAPIのルーター設定
# # 依存: fastapi
# from fastapi import APIRouter
# 
# router = APIRouter()
# 

# 追記された内容:
# # FastAPIのルーター設定
# # 依存: fastapi
# from fastapi import APIRouter
# 
# router = APIRouter()
# 

# # 追記された内容:
# # FastAPIのルーター設定
# from fastapi import APIRouter
# from .file_operations import router as file_router

# router = APIRouter()
# router.include_router(file_router, prefix="/files", tags=["files"])


# # 追記された内容:
# # FastAPIのルーター設定
# from fastapi import APIRouter
# from .file_operations import router as file_router

# router = APIRouter()
# router.include_router(file_router, prefix="/files", tags=["files"])


# # 追記された内容:
# # FastAPIのルーター設定
# from fastapi import APIRouter
# from .file_operations import router as file_router

# router = APIRouter()
# router.include_router(file_router, prefix="/files", tags=["files"])
