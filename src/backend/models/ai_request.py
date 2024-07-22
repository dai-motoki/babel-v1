from pydantic import BaseModel
from typing import List

class AIBaseRequest(BaseModel):
    version_control: bool = False

class AIAnalyzeRequest(AIBaseRequest):
    project_id: str
    file_path: str
    analysis_depth: str = "standard"

class AIUpdateRequest(AIBaseRequest):
    project_id: str
    file_path: str
    change_type: str = "smart"
    feature_request: str  # 機能追加要望を格納するフィールドを追加

class AIRewriteRequest(AIBaseRequest):
    project_id: str
    file_path: str
    rewrite_style: str = "balanced"

class AIAppendRequest(AIBaseRequest):
    project_id: str
    file_path: str
    append_location: str = "end"

class AIDependenciesRequest(AIBaseRequest):
    project_id: str
    file_paths: List[str]
    analysis_scope: str = "direct"

class MultiAIBaseRequest(AIBaseRequest):
    file_paths: List[str]
    execution_mode: str = "parallel"

class MultiAIAnalyzeRequest(MultiAIBaseRequest):
    project_id: str
    analysis_depth: str = "standard"

class MultiAIUpdateRequest(MultiAIBaseRequest):
    project_id: str
    change_type: str = "smart"
    feature_request: str  # 機能追加要望を格納するフィールドを追加

class MultiAIRewriteRequest(MultiAIBaseRequest):
    project_id: str
    rewrite_style: str = "balanced"

class MultiAIAppendRequest(MultiAIBaseRequest):
    project_id: str
    append_location: str = "end"

class MultiAIDependenciesRequest(MultiAIBaseRequest):
    project_id: str
    analysis_scope: str = "direct"