from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from models.ai_request import (
    AIAnalyzeRequest, AIUpdateRequest, AIRewriteRequest, AIAppendRequest, AIDependenciesRequest,
    MultiAIAnalyzeRequest, MultiAIUpdateRequest, MultiAIRewriteRequest, MultiAIAppendRequest, MultiAIDependenciesRequest
)
from services.ai_service import (
    ai_analyze, ai_update, ai_rewrite, ai_append, ai_analyze_dependencies,
    multi_ai_analyze, multi_ai_update, multi_ai_rewrite, multi_ai_append, multi_ai_analyze_dependencies
)
from utils.version_control import version_control

router = APIRouter()

@router.post("/ai-analyze", response_model=Dict[str, Any])
async def analyze_file(request: AIAnalyzeRequest):
    try:
        result = await ai_analyze(request.file_path, request.version_control, request.analysis_depth)
        return {"message": "File analyzed successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multi-ai-analyze", response_model=Dict[str, Any])
async def multi_analyze_files(request: MultiAIAnalyzeRequest):
    try:
        result = await multi_ai_analyze(request.file_paths, request.version_control, request.analysis_depth, request.execution_mode)
        return {"message": "Files analyzed successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai-update", response_model=Dict[str, Any])
async def update_file(request: AIUpdateRequest):
    try:
        result = await ai_update(request.file_path, request.version_control, request.change_type)
        return {"message": "File updated successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multi-ai-update", response_model=Dict[str, Any])
async def multi_update_files(request: MultiAIUpdateRequest):
    try:
        result = await multi_ai_update(request.file_paths, request.version_control, request.change_type, request.execution_mode)
        return {"message": "Files updated successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai-rewrite", response_model=Dict[str, Any])
async def rewrite_file(request: AIRewriteRequest):
    try:
        result = await ai_rewrite(request.file_path, request.version_control, request.rewrite_style)
        return {"message": "File rewritten successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multi-ai-rewrite", response_model=Dict[str, Any])
async def multi_rewrite_files(request: MultiAIRewriteRequest):
    try:
        result = await multi_ai_rewrite(request.file_paths, request.version_control, request.rewrite_style, request.execution_mode)
        return {"message": "Files rewritten successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai-append", response_model=Dict[str, Any])
async def append_to_file(request: AIAppendRequest):
    try:
        result = await ai_append(request.file_path, request.version_control, request.append_location)
        return {"message": "Content appended successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multi-ai-append", response_model=Dict[str, Any])
async def multi_append_to_files(request: MultiAIAppendRequest):
    try:
        result = await multi_ai_append(request.file_paths, request.version_control, request.append_location, request.execution_mode)
        return {"message": "Content appended to files successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai-dependencies", response_model=Dict[str, Any])
async def analyze_dependencies(request: AIDependenciesRequest):
    try:
        result = await ai_analyze_dependencies(request.file_paths, request.version_control, request.analysis_scope)
        return {"message": "Dependencies analyzed successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multi-ai-dependencies", response_model=Dict[str, Any])
async def multi_analyze_dependencies(request: MultiAIDependenciesRequest):
    try:
        result = await multi_ai_analyze_dependencies(request.file_paths, request.version_control, request.analysis_scope, request.execution_mode)
        return {"message": "Dependencies analyzed successfully for multiple files", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))