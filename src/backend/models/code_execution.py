from pydantic import BaseModel

class CodeExecution(BaseModel):
    code: str