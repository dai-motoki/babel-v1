# ファイル関連のデータモデル
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

