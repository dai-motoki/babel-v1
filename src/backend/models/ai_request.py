from pydantic import BaseModel
from typing import List

class AIBaseRequest(BaseModel):
    version_control: bool = False

class AIAnalyzeRequest(AIBaseRequest):
    file_path: str
    analysis_depth: str = "standard"

class AIUpdateRequest(AIBaseRequest):
    file_path: str
    change_type: str = "smart"
    feature_request: str  # 機能追加要望を格納するフィールドを追加

class AIRewriteRequest(AIBaseRequest):
    file_path: str
    rewrite_style: str = "balanced"

class AIAppendRequest(AIBaseRequest):
    file_path: str
    append_location: str = "end"

class AIDependenciesRequest(AIBaseRequest):
    file_paths: List[str]
    analysis_scope: str = "direct"

class MultiAIBaseRequest(AIBaseRequest):
    file_paths: List[str]
    execution_mode: str = "parallel"

class MultiAIAnalyzeRequest(MultiAIBaseRequest):
    analysis_depth: str = "standard"

class MultiAIUpdateRequest(MultiAIBaseRequest):
    change_type: str = "smart"
    feature_request: str  # 機能追加要望を格納するフィールドを追加

class MultiAIRewriteRequest(MultiAIBaseRequest):
    rewrite_style: str = "balanced"

class MultiAIAppendRequest(MultiAIBaseRequest):
    append_location: str = "end"

class MultiAIDependenciesRequest(MultiAIBaseRequest):
    analysis_scope: str = "direct"