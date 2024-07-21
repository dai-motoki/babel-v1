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
import subprocess

import logging

logger = logging.getLogger(__name__)

router = APIRouter()

from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from services.file_service import FileService
from models.file import FileModel, FileEdit

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

@router.get("/content/{project_id}/{file_path:path}")
async def get_file_content(project_id: str, file_path: str):
    try:
        content = await file_service.get_file_content(project_id, file_path)
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

@router.post("/save-file")
async def save_file_route(file_content: dict):
    try:
        await file_service.save_file(file_content["project_id"], file_content["file_path"], file_content["content"])
        return {"message": "ファイルが正常に保存されました"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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
    
    
    # ../grimoires/temp/ディレクトリの内容をコピー XXX Grimoires は一旦選べるように、のちに自然言語からマッチングするように。
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
    
    # # exe_front.pyを実行して、Next.jsアプリケーションを作成
    # try:
    #     exe_front_path = os.path.join(home_dir, "babel_generated", name, "controllers", "exe_history", "exe_front.py")
    #     subprocess.run(["python", exe_front_path, "-dir", name], check=True)
    #     logger.info(f"exe_front.pyの実行が完了しました: {name}")
    # except subprocess.CalledProcessError as e:
    #     logger.error(f"exe_front.pyの実行中にエラーが発生しました: {str(e)}")
    #     raise HTTPException(status_code=500, detail="Next.jsアプリケーションの作成に失敗しました")
    
    # logger.info(f"新しいシステム '{name}' を作成しました。パス: {new_dir_path}")
    # return {"message": f"新しいシステム '{name}' の作成に成功しました", "path": new_dir_path}


    # Implement the create_new_system function
    pass