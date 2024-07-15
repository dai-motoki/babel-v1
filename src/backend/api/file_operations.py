# ファイル操作のAPIエンドポイント
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


# 追記された内容:
# ファイル操作のAPIエンドポイント
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


# 追記された内容:
# ファイル操作のAPIエンドポイント
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
