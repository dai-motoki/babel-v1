import google.generativeai as genai
import asyncio
import logging
from config.settings import GEMINI_API_KEY

logger = logging.getLogger(__name__)

genai.configure(api_key=GEMINI_API_KEY)

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

gemini_model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
)

async def generate_text_gemini(prompt: str):
    logger.info(f"Geminiリクエストを受信: prompt={prompt}")
    try:
        chat = gemini_model.start_chat(history=[])
        response = await asyncio.to_thread(
            chat.send_message,
            prompt + "コードはコードブロックに入れる 例 ```html <h1>Hello, World!</h1> ```"
        )
        logger.info("Geminiでテキスト生成成功")
        logger.info(response.text)
        return {"generated_text": response.text}
    except Exception as e:
        logger.error(f"Geminiでのテキスト生成中にエラーが発生: {str(e)}")
        raise