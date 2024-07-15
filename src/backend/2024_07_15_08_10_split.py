import os
import subprocess

def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)
        print(f"ディレクトリを作成しました: {path}")

def create_or_append_file(file_path, content):
    if os.path.exists(file_path):
        print(f"警告: ファイル {file_path} は既に存在します。")
        user_input = input("このファイルに内容を追記しますか？ (y/n): ").lower()
        if user_input == 'y':
            with open(file_path, 'a') as file:
                file.write("\n\n# 追記された内容:\n")
                file.write(content)
            print(f"ファイルに内容を追記しました: {file_path}")
        else:
            print(f"ファイル {file_path} の更新をスキップしました。")
    else:
        with open(file_path, 'w') as file:
            file.write(content)
        print(f"新しいファイルを作成しました: {file_path}")

def create_backend_structure():
    structure = {
        'api': {
            '__init__.py': '# APIモジュールの初期化ファイル\n',
            'routes.py': '# FastAPIのルーター設定\nfrom fastapi import APIRouter\nfrom .file_operations import router as file_router\n\nrouter = APIRouter()\nrouter.include_router(file_router, prefix="/files", tags=["files"])\n',
            'websocket.py': '# WebSocketハンドラー\nfrom fastapi import WebSocket\n',
            '[UPDATED]file_operations.py': '''# ファイル操作のAPIエンドポイント
from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from services.file_service import FileService
from models.file import FileModel, FileContent, FileEdit

router = APIRouter()
file_service = FileService()

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

@router.get("/content/{filename}")
async def get_file_content(filename: str):
    try:
        content = await file_service.get_file_content(filename)
        return FileContent(filename=filename, content=content)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")

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
'''
        },
        'services': {
            '__init__.py': '# サービスモジュールの初期化ファイル\n',
            'ai_services.py': '# AI関連のサービスロジック\ndef dummy_ai_service():\n    pass\n',
            'code_execution.py': '# コード実行サービス\ndef dummy_code_execution():\n    pass\n',
            '[UPDATED]file_service.py': '''# ファイル操作サービス
import os
from fastapi import UploadFile
from models.file import FileModel
from utils.file_operations import get_file_size, ensure_directory_exists, read_file, write_file, append_to_file

class FileService:
    def __init__(self, upload_dir="uploads"):
        self.upload_dir = upload_dir
        ensure_directory_exists(self.upload_dir)

    async def save_file(self, file: UploadFile) -> FileModel:
        file_path = os.path.join(self.upload_dir, file.filename)
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        size = get_file_size(file_path)
        return FileModel(filename=file.filename, size=size)

    async def list_files(self) -> list[FileModel]:
        files = []
        for filename in os.listdir(self.upload_dir):
            file_path = os.path.join(self.upload_dir, filename)
            size = get_file_size(file_path)
            files.append(FileModel(filename=filename, size=size))
        return files

    async def get_file_content(self, filename: str) -> str:
        file_path = os.path.join(self.upload_dir, filename)
        return read_file(file_path)

    async def edit_file(self, filename: str, line_number: int, new_content: str):
        file_path = os.path.join(self.upload_dir, filename)
        content = read_file(file_path).splitlines()
        if line_number < 1 or line_number > len(content):
            raise ValueError("Invalid line number")
        content[line_number - 1] = new_content
        write_file(file_path, "\n".join(content))

    async def append_to_file(self, filename: str, content: str):
        file_path = os.path.join(self.upload_dir, filename)
        append_to_file(file_path, content)

    async def delete_file(self, filename: str):
        file_path = os.path.join(self.upload_dir, filename)
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File {filename} not found")
        os.remove(file_path)
'''
        },
        'models': {
            '__init__.py': '# モデルモジュールの初期化ファイル\n',
            '[UPDATED]file.py': '''# ファイル関連のデータモデル
from pydantic import BaseModel

class FileModel(BaseModel):
    filename: str
    size: int

class FileContent(BaseModel):
    filename: str
    content: str

class FileEdit(BaseModel):
    line_number: int
    new_content: str
'''
        },
        'utils': {
            '__init__.py': '# ユーティリティモジュールの初期化ファイル\n',
            '[UPDATED]file_operations.py': '''# ファイル操作ユーティリティ
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
''',
            'git_operations.py': '# Git操作ユーティリティ\ndef dummy_git_util():\n    pass\n',
            'logging_config.py': '# ロギング設定\nimport logging\n\nlogging.basicConfig(level=logging.INFO)\n',
            'security.py': '# セキュリティ関連ユーティリティ\ndef dummy_security_util():\n    pass\n'
        },
        'config': {
            '__init__.py': '# 設定モジュールの初期化ファイル\n',
            'settings.py': '# アプリケーション全体の設定\nAPI_VERSION = "v1"\n',
            'ai_config.py': '# AI機能の設定\nAI_MODEL = "gpt-3.5-turbo"\n'
        },
        'scripts': {
            'file_watcher.py': '# ファイル変更監視スクリプト\ndef dummy_file_watcher():\n    pass\n',
            'db_migration.py': '# データベースマイグレーションスクリプト\ndef dummy_db_migration():\n    pass\n'
        },
        'tests': {
            '__init__.py': '# テストモジュールの初期化ファイル\n',
            '[UPDATED]test_file_operations.py': '''# ファイル操作のテスト
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_upload_file():
    files = {"file": ("test.txt", b"Test content", "text/plain")}
    response = client.post("/files/upload", files=files)
    assert response.status_code == 200
    assert "filename" in response.json()
    assert "size" in response.json()

def test_list_files():
    response = client.get("/files/list")
    assert response.status_code == 200
    assert "files" in response.json()

def test_get_file_content():
    # First, upload a file
    files = {"file": ("test_content.txt", b"Test content", "text/plain")}
    upload_response = client.post("/files/upload", files=files)
    assert upload_response.status_code == 200

    # Then, get its content
    content_response = client.get("/files/content/test_content.txt")
    assert content_response.status_code == 200
    assert content_response.json()["content"] == "Test content"

def test_edit_file():
    # First, upload a file
    files = {"file": ("test_edit.txt", b"Line 1\nLine 2\nLine 3", "text/plain")}
    upload_response = client.post("/files/upload", files=files)
    assert upload_response.status_code == 200

    # Then, edit it
    edit_response = client.put("/files/edit/test_edit.txt", json={"line_number": 2, "new_content": "Edited Line 2"})
    assert edit_response.status_code == 200

    # Verify the edit
    content_response = client.get("/files/content/test_edit.txt")
    assert content_response.status_code == 200
    assert content_response.json()["content"] == "Line 1\nEdited Line 2\nLine 3"

def test_append_to_file():
    # First, upload a file
    files = {"file": ("test_append.txt", b"Initial content", "text/plain")}
    upload_response = client.post("/files/upload", files=files)
    assert upload_response.status_code == 200

    # Then, append to it
    append_response = client.post("/files/append/test_append.txt?content=Appended content")
    assert append_response.status_code == 200

    # Verify the append
    content_response = client.get("/files/content/test_append.txt")
    assert content_response.status_code == 200
    assert content_response.json()["content"] == "Initial contentAppended content"

def test_delete_file():
    # First, upload a file
    files = {"file": ("test_delete.txt", b"Test delete content", "text/plain")}
    upload_response = client.post("/files/upload", files=files)
    assert upload_response.status_code == 200

    # Then, delete it
    delete_response = client.delete("/files/delete/test_delete.txt")
    assert delete_response.status_code == 200
    assert delete_response.json()["message"] == "File test_delete.txt deleted successfully"

    # Try to get content of the deleted file (should fail)
    content_response = client.get("/files/content/test_delete.txt")
    assert content_response.status_code == 404
'''
        },
        'docs': {
            'api_reference.md': '# API リファレンス\n\nこのドキュメントにはプロジェクトのAPI参照が含まれています。\n',
            'user_guide.md': '# ユーザーガイド\n\nこのドキュメントはプロジェクトのユーザー向けガイドです。\n',
            'ai_guidelines.md': '# AI ガイドライン\n\nこのドキュメントはプロジェクトでのAI機能の使用ガイドラインを概説しています。\n'
        }
    }

    for directory, files in structure.items():
        create_directory(directory)
        for file_name, content in files.items():
            create_or_append_file(os.path.join(directory, file_name), content)

    create_or_append_file('main.py', '''# メインアプリケーションエントリーポイント
from fastapi import FastAPI
from api.routes import router as api_router

app = FastAPI()

app.include_router(api_router, prefix="/api")
''')
    create_or_append_file('requirements.txt', '''# プロジェクトの依存関係
fastapi
uvicorn
python-multipart
pytest
httpx
''')
    create_or_append_file('.gitignore', '''# Gitが無視するファイルの設定
*.pyc
__pycache__
.venv
uploads/
''')

if __name__ == '__main__':
    create_backend_structure()
    print("バックエンド構造の作成/更新が完了しました。")

# スクリプトをsubprocessで実行
subprocess.run(['python', __file__], check=True)

# ... (前のコードは省略) ...

"""
実行方法:
1. このスクリプトを適切なディレクトリに配置します。
2. コマンドラインで以下のコマンドを実行します：
   python file_splitting_script.py
3. ファイルが既に存在する場合、追記するかどうかを尋ねられます。'y'で追記、'n'でスキップします。

注意事項:
- このスクリプトは、存在しないファイルとディレクトリを作成します。
- 既存のファイルに対しては、追記するかどうかをユーザーに確認します（y/n）。
- 追記する場合、新しい内容はファイルの最後に追加されます。
- ファイル操作関連の機能が充実しています。特に api/file_operations.py, services/file_service.py, models/file.py, utils/file_operations.py が強化されています。
- テストファイル（tests/test_file_operations.py）も更新され、ファイル操作の基本的なテストケースが含まれています。
- 実際のプロジェクトで使用する前に、セキュリティやエラーハンドリングなどの追加の実装が必要な場合があります。
- このスクリプトを実行後、`pip install -r requirements.txt` を実行して必要な依存関係をインストールしてください。
- 'uploads/' ディレクトリが自動的に作成され、アップロードされたファイルはここに保存されます。
- .gitignore ファイルには 'uploads/' ディレクトリが含まれているため、アップロードされたファイルは Git 管理下に置かれません。

セキュリティに関する注意:
- このスクリプトは、ファイルの読み書きを行うため、適切なアクセス権限を持つディレクトリで実行してください。
- 実際の運用環境では、ファイルの種類やサイズ、ユーザーの権限などに基づいて適切な制限を設けることを強く推奨します。
- アップロードされたファイルの内容を検証し、悪意のあるコードや不適切なコンテンツをフィルタリングする機能を追加することを検討してください。

拡張の提案:
- データベースとの連携: ファイルのメタデータをデータベースに保存することで、より効率的な検索や管理が可能になります。
- ユーザー認証: 各ファイル操作にユーザー認証を追加し、アクセス制御を実装することができます。
- ファイルバージョニング: 各編集操作でファイルの新しいバージョンを作成し、変更履歴を追跡する機能を追加できます。
- 非同期処理: 大きなファイルの処理やバッチ操作のために、非同期タスクキューを実装することを検討してください。

このスクリプトは、基本的なファイル操作機能を提供するバックエンド構造を作成します。実際のプロジェクトのニーズに合わせて、適宜カスタマイズや拡張を行ってください。
"""