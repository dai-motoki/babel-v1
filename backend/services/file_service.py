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
    if path_type == "file_explorer":
        base_path = "../src/components/generated/"
    elif path_type == "requirements_definition":
        base_path = "meta/1_domain_exp"
    elif path_type == "babel":
        base_paths = ["../src", "../backend", "../Dockerfile", "../docker-compose.yml", "../README.md"]
    else:
        base_path = "../generated/{}".format(path_type)

    try:
        if path_type == "babel":
            structure = []
            for base_path in base_paths:
                if os.path.isfile(base_path):
                    # ファイルの場合、直接構造を作成
                    content = read_file_content(base_path)
                    structure.append({
                        "name": os.path.basename(base_path),
                        "type": "file",
                        "path": base_path,
                        "content": content
                    })
                else:
                    # ディレクトリの場合、既存の関数を使用
                    structure.extend(create_structure_excluding_generated(base_path))
        else:
            structure = create_structure(base_path, base_path)
        logger.info(f"{path_type}のディレクトリ構造を正常に作成しました")
        return {"structure": structure}
    except Exception as e:
        logger.error(f"{path_type}のディレクトリ構造の取得中にエラーが発生しました: {str(e)}")
        raise HTTPException(status_code=500, detail="ディレクトリ構造の取得に失敗しました")

logger.info("アプリケーションが起動しました")

def create_structure_excluding_generated(path):
    structure = []
    gitignore_patterns = read_gitignore(path)
    for item in os.listdir(path):
        if item == "generated" or item == ".git" or should_ignore(item, gitignore_patterns):
            continue
        item_path = os.path.join(path, item)
        if os.path.isdir(item_path):
            structure.append({
                "name": item,
                "type": "folder",
                "path": item,
                "children": create_structure(item_path, path)
            })
        else:
            content = read_file_content(item_path)
            structure.append({
                "name": item,
                "type": "file",
                "path": item,
                "content": content
            })
    return structure

def create_structure(path, base_path):
    structure = []
    gitignore_patterns = read_gitignore(base_path)
    for item in os.listdir(path):
        if should_ignore(item, gitignore_patterns):
            continue
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

def read_gitignore(path):
    gitignore_path = os.path.join(path, '.gitignore')
    if os.path.exists(gitignore_path):
        with open(gitignore_path, 'r') as f:
            return [line.strip() for line in f if line.strip() and not line.startswith('#')]
    return []

import fnmatch

def should_ignore(item, gitignore_patterns):
    return any(fnmatch.fnmatch(item, pattern) for pattern in gitignore_patterns)

def read_file_content(file_path):
    try:
        # バイナリファイルや特殊なファイルを無視する
        if os.path.splitext(file_path)[1] in ['.gz', '.woff2', '.ico']:
            return None
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except UnicodeDecodeError:
        logger.warning(f"ファイルの読み込みをスキップしました（エンコーディングエラー）: {file_path}")
        return None
    except Exception as e:
        logger.error(f"ファイル読み込み中にエラーが発生しました: {file_path}, エラー: {str(e)}")
        return None


# @app.get("/api/generated-dirs")
# async def get_generated_dirs():
#     base_path = "../generated"
#     logger.info(f"生成されたディレクトリの取得を開始します。ベースパス: {base_path}")
#     try:
#         structure = create_structure(base_path, base_path)
#         logger.debug(f"ディレクトリ構造を作成しました: {structure}")
#         app_dirs = []
#         for item in structure:
#             if item["type"] == "folder":
#                 # frontend_path = os.path.join(item["path"], "frontend", "App.js")
#                 frontend_path = os.path.join(item["path"])
#                 full_path = os.path.join(base_path, frontend_path)
#                 logger.debug(f"フロントエンドパスを確認中: {full_path}")
#                 if os.path.exists(full_path):
#                     app_dir = {
#                         "name": item["name"],
#                         "path": f"./generated/{item['name']}/frontend/App"
#                     }
#                     app_dirs.append(app_dir)
#                     logger.debug(f"アプリディレクトリを追加しました: {app_dir}")
#         logger.info(f"生成されたディレクトリを正常に取得しました: {app_dirs}")
#         return app_dirs
#     except Exception as e:
#         logger.error(f"生成されたディレクトリの取得中にエラーが発生しました: {str(e)}", exc_info=True)
#         raise HTTPException(status_code=500, detail="ディレクトリの取得に失敗しました")

    # pass

async def get_generated_dirs():
    base_path = "../generated"
    logger.info(f"生成されたディレクトリの取得を開始します。ベースパス: {base_path}")
    try:
        logger.debug(f"ディレクトリ構造の作成を開始します。")
        structure = create_structure(base_path, base_path)
        logger.debug(f"ディレクトリ構造を作成しました: {structure}")
        
        app_dirs = []
        logger.debug(f"アプリディレクトリの検索を開始します。")
        for item in structure:
            logger.debug(f"項目を処理中: {item['name']}")
            if item["type"] == "folder":
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
                else:
                    logger.debug(f"フロントエンドパスが存在しません: {full_path}")
        
        logger.info(f"生成されたディレクトリを正常に取得しました。総数: {len(app_dirs)}")
        logger.debug(f"取得されたアプリディレクトリの詳細: {app_dirs}")
        return app_dirs
    except Exception as e:
        logger.error(f"生成されたディレクトリの取得中にエラーが発生しました: {str(e)}", exc_info=True)
        logger.debug(f"エラーの詳細情報: {e.__class__.__name__}")
        raise HTTPException(status_code=500, detail="ディレクトリの取得に失敗しました")
