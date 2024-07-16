from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router
from api.websocket import websocket_endpoint
from utils.logging_config import setup_logging
from api import ai_operations

app = FastAPI(
    title="AI File Operations API",
    description="API for AI-powered file operations",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# CORSの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーターの追加
app.include_router(router)
app.include_router(ai_operations.router, prefix="/v1/ai-file-ops", tags=["AI Operations"])

# WebSocketの追加
app.add_websocket_route("/ws", websocket_endpoint)

# ルートエンドポイントの追加
@app.get("/")
async def root():
    return {"message": "Welcome to AI File Operations API"}

# ロギングの設定
setup_logging()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)