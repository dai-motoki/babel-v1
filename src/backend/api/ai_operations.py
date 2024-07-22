from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from models.ai_request import (
    AIAnalyzeRequest, AIUpdateRequest, AIRewriteRequest, AIAppendRequest, AIDependenciesRequest,
    MultiAIAnalyzeRequest, MultiAIUpdateRequest, MultiAIRewriteRequest, MultiAIAppendRequest, MultiAIDependenciesRequest
)
from services.ai_service import (
    ai_analyze, ai_reply, ai_rewrite, ai_append, ai_analyze_dependencies,
    multi_ai_analyze, multi_ai_reply, multi_ai_rewrite, multi_ai_append, multi_ai_analyze_dependencies, ai_process, multi_ai_process
)
from utils.version_control import version_control
from utils.file_utils import get_file_path

router = APIRouter()

@router.post("/ai-analyze", response_model=Dict[str, Any])
async def analyze_file(request: AIAnalyzeRequest):
    try:
        file_path = get_file_path(request.project_id, request.file_path, "")
        result = await ai_analyze(file_path, request.version_control, request.analysis_depth)
        return {"message": "ファイルが正常に分析されました", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multi-ai-analyze", response_model=Dict[str, Any])
async def multi_analyze_files(request: MultiAIAnalyzeRequest):
    try:
        file_paths = [get_file_path(request.project_id, file_path, "") for file_path in request.file_paths]
        result = await multi_ai_analyze(file_paths, request.version_control, request.analysis_depth, request.execution_mode)
        return {"message": "ファイルが正常に分析されました", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai-reply", response_model=Dict[str, Any])
async def update_file(request: AIUpdateRequest):
    try:
        file_path = get_file_path(request.project_id, request.file_path, "")
        result = await ai_reply(file_path, request.version_control, request.change_type, request.feature_request)
        return {"message": "ファイルが正常に更新されました", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multi-ai-reply", response_model=Dict[str, Any])
async def multi_update_files(request: MultiAIUpdateRequest):
    try:
        file_paths = [get_file_path(request.project_id, file_path, "") for file_path in request.file_paths]
        result = await multi_ai_reply(file_paths, request.version_control, request.change_type, request.execution_mode, request.feature_request)
        return {"message": "複数のファイルが正常に更新されました", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai-process", response_model=Dict[str, Any])
async def update_file(request: AIUpdateRequest):
    try:
        file_path = get_file_path(request.project_id, request.file_path, "")
        result = await ai_process(file_path, request.version_control, request.change_type, request.feature_request)
        return {"message": "ファイルが正常に更新されました", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multi-ai-process", response_model=Dict[str, Any])
async def multi_update_files(request: MultiAIUpdateRequest):
    try:
        file_paths = [get_file_path(request.project_id, file_path, "") for file_path in request.file_paths]
        result = await multi_ai_process(file_paths, request.version_control, request.change_type, request.execution_mode, request.feature_request)
        return {"message": "複数のファイルが正常に更新されました", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai-rewrite", response_model=Dict[str, Any])
async def rewrite_file(request: AIRewriteRequest):
    try:
        file_path = get_file_path(request.project_id, request.file_path, "")
        result = await ai_rewrite(file_path, request.version_control, request.rewrite_style)
        return {"message": "ファイルが正常に書き直されました", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multi-ai-rewrite", response_model=Dict[str, Any])
async def multi_rewrite_files(request: MultiAIRewriteRequest):
    try:
        file_paths = [get_file_path(request.project_id, file_path, "") for file_path in request.file_paths]
        result = await multi_ai_rewrite(file_paths, request.version_control, request.rewrite_style, request.execution_mode)
        return {"message": "複数のファイルが正常に書き直されました", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai-append", response_model=Dict[str, Any])
async def append_to_file(request: AIAppendRequest):
    try:
        file_path = get_file_path(request.project_id, request.file_path, "")
        result = await ai_append(file_path, request.version_control, request.append_location)
        return {"message": "コンテンツが正常に追加されました", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multi-ai-append", response_model=Dict[str, Any])
async def multi_append_to_files(request: MultiAIAppendRequest):
    try:
        file_paths = [get_file_path(request.project_id, file_path, "") for file_path in request.file_paths]
        result = await multi_ai_append(file_paths, request.version_control, request.append_location, request.execution_mode)
        return {"message": "複数のファイルにコンテンツが正常に追加されました", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai-dependencies", response_model=Dict[str, Any])
async def analyze_dependencies(request: AIDependenciesRequest):
    try:
        file_paths = [get_file_path(request.project_id, file_path, "") for file_path in request.file_paths]
        result = await ai_analyze_dependencies(file_paths, request.version_control, request.analysis_scope)
        return {"message": "依存関係が正常に分析されました", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multi-ai-dependencies", response_model=Dict[str, Any])
async def multi_analyze_dependencies(request: MultiAIDependenciesRequest):
    try:
        file_paths = [get_file_path(request.project_id, file_path, "") for file_path in request.file_paths]
        result = await multi_ai_analyze_dependencies(file_paths, request.version_control, request.analysis_scope, request.execution_mode)
        return {"message": "複数のファイルの依存関係が正常に分析されました", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))